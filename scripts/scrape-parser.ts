import merge from 'deepmerge';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { sortBy } from 'fp-ts/lib/Array';
import { ord, ordNumber } from 'fp-ts/lib/Ord';

import * as fs from 'fs';
import i18n from '../config/i18n.js';
import { toKeyFormat } from '../src/utils/transform';
import {
  isTagEntity,
  LocalCompanies,
  TagEntity,
  TagEntityCompare,
} from './scrape-types';

const scrape = Object.keys(i18n).map(async lang => {
  const { education, positions, skills } = await import(
    `../src/data/scrape/scrape.${lang}.json`
  );

  const { default: tagsMapper } = await import(
    '../src/data/local/tags.local.json'
  );

  const mapNameToAbbreviation = (name: string): string | undefined => {
    const key = toKeyFormat(name);
    // @ts-ignore
    return key in tagsMapper ? tagsMapper[key]['abbr'] : undefined;
  };

  const transPositions = positions.experience.reduce(
    // @ts-ignore
    (acc, cur) => ({
      ...acc,
      [cur.company.split(' ')[0].toLowerCase()]: {
        ...cur,
        key: toKeyFormat(cur.company.replace(cur.employment ?? '', '')),
        shortKey: cur.company.split(' ')[0].toLocaleLowerCase(),
        company: cur.company.replace(cur.employment ?? '', ''),
        shortCompany: cur.company.split(' ')[0],
      },
    }),
    {},
  );

  const transTopSkills = {
    sections: [skills.topSkills.heading],
    // @ts-ignore
    skills: skills.topSkills.skills.map(({ name, count, color }) => ({
      key: toKeyFormat(name),
      heading: skills.topSkills.heading,
      name,
      count,
      abbr: mapNameToAbbreviation(name),
      color,
    })),
    entities: skills.topSkills.skills.reduce(
      // @ts-ignore
      (acc, { name, count, color }) => ({
        ...acc,
        [toKeyFormat(name)]: {
          key: toKeyFormat(name),
          name,
          count,
          abbr: toKeyFormat(name),
          color,
        },
      }),
      {},
    ),
  };
  const transOtherSkills = {
    sections: skills.otherSkills.sections,
    // @ts-ignore
    skills: skills.otherSkills.skills.map<TagEntity>(({ skill, heading }) => {
      const formattedSkills: TagEntityCompare[] = (skill as TagEntity[]).map<
        TagEntityCompare
      >(({ name, count, color }) => ({
        key: toKeyFormat(name),
        heading,
        name,
        abbr: mapNameToAbbreviation(name),
        count: count != null ? Number(count) : 0 ?? 0,
        color,
      }));

      const byCount = ord.contramap(ordNumber, (p: TagEntityCompare) => {
        return p.count;
      });
      const sortByCount = sortBy([byCount]);

      return sortByCount(formattedSkills)
        .map<TagEntity>(sortedSkill => ({
          ...sortedSkill,
          count: sortedSkill.count.toLocaleString(),
        }))
        .reverse();
    }),
    entities: {
      ...skills.otherSkills.skills
        .map(
          // @ts-ignore
          ({ skill, heading }) =>
            // @ts-ignore
            skill.map(({ name, count, color }) => ({
              key: toKeyFormat(name),
              heading,
              name,
              count,
              color,
            })),
        )
        .flat()
        // @ts-ignore
        .reduce((acc, skill) => ({ ...acc, [skill.key]: { ...skill } }), {}),
    },
  };

  const parsedScrape = {
    positions: transPositions,
    skills: {
      topSkills: transTopSkills,
      otherSkills: transOtherSkills,
    },
    education: education.data,
    tagEntities: {
      ...transTopSkills.entities,
      ...transOtherSkills.entities,
    },
  };

  fs.writeFile(
    `src/data/scrape/parsed-scrape.${lang}.json`,
    JSON.stringify(parsedScrape),
    e => {
      if (e) throw e;
    },
  );

  fs.writeFile(
    `src/data/generated/parsed-skills.${lang}.json`,
    JSON.stringify({
      topSkills: {
        sections: transTopSkills.sections,
        skills: transTopSkills.skills,
      },
      otherSkills: {
        sections: transOtherSkills.sections,
        skills: transOtherSkills.skills.flat(),
      },
    }),
    e => {
      if (e) throw e;
    },
  );

  const localCompanies = await import('../src/data/local/companies.local.json');

  const mapToTagEntity = (
    tag: string,
    tagsKeyMapper: [string[], { key: string; name: string; color?: string }[]],
  ) =>
    tagsKeyMapper[0].includes(tag)
      ? tagsKeyMapper[1][tagsKeyMapper[0].indexOf(tag)]
      : tag;

  const companies = LocalCompanies.decode(localCompanies.default);

  const mergeWithScraped = (
    tag: TagEntity,
    scrapedTags: [string[], TagEntity[]],
  ): TagEntity => {
    return scrapedTags[0].includes(tag.key)
      ? merge(scrapedTags[1][scrapedTags[0].indexOf(tag.key)], tag)
      : tag;
  };

  const patchWithScrapedTags = (scraped: Record<string, TagEntity>) => (
    local: LocalCompanies,
  ) => {
    const tagsKeyMapper = Object.keys(tagsMapper);
    const tagsValueMapper = Object.values(tagsMapper);

    const scrapedKeyTags = Object.keys(scraped);
    const scrapedValueTags = Object.values(scraped);

    return local.map(({ shortKey, sections }) => ({
      shortKey,
      sections: sections.map(({ section, tags }) => {
        const mappers = tags.map(tagEntity => {
          const mapAndMergeTags = (tag: string) => {
            const mapped = mapToTagEntity(tag, [
              tagsKeyMapper,
              tagsValueMapper,
            ]);

            const returnEntity = isTagEntity(mapped)
              ? mergeWithScraped(mapped, [scrapedKeyTags, scrapedValueTags])
              : null;
            return returnEntity;
          };

          return Array.isArray(tagEntity)
            ? tagEntity.map(tag => mapAndMergeTags(tag)).filter(i => i != null)
            : mapAndMergeTags(tagEntity);
        });
        return { section, tags: mappers.filter(i => i != null) };
      }),
    }));
  };

  pipe(
    companies,
    E.fold(
      //TODO create fields validation and report with Reporter

      // @ts-ignore
      e => e,
      // @ts-ignore
      u => {
        const patchedTags = patchWithScrapedTags(
          parsedScrape.tagEntities as Record<string, TagEntity>,
        )(u);
        fs.writeFile(
          `src/data/generated/parsed-tags.${lang}.json`,
          JSON.stringify(patchedTags),
          e => {
            if (e) throw e;
          },
        );
        return patchedTags;
      },
    ),
  );
});

export default scrape;
