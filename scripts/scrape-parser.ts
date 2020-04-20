import * as E from 'fp-ts/lib/Either';
import merge from 'deepmerge';
import { pipe } from 'fp-ts/lib/pipeable';

import * as fs from 'fs';
import i18n from '../config/i18n.js';
import { toKeyFormat } from '../src/utils/transform';
import { isTagEntity, LocalCompanies, TagEntity } from './scrape-types';

const scrape = Object.keys(i18n).map(async lang => {
  const { education, positions, skills } = await import(
    `../src/data/scrape/scrape.${lang}.json`
  );
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
    // @ts-ignore
    skills: skills.topSkills.skills.map(({ name, count }) => ({
      key: toKeyFormat(name),
      name,
      count,
    })),
    entities: skills.topSkills.skills.reduce(
      // @ts-ignore
      (acc, { name, count }) => ({
        ...acc,
        [toKeyFormat(name)]: {
          key: toKeyFormat(name),
          name,
          count,
        },
      }),
      {},
    ),
  };
  const transOtherSkills = {
    sections: skills.otherSkills.sections,
    // @ts-ignore
    skills: skills.otherSkills.skills.map(({ skill, heading }) =>
      // @ts-ignore
      skill.map(({ name, count }) => ({
        key: toKeyFormat(name),
        heading,
        name,
        count,
      })),
    ),
    entities: {
      ...skills.otherSkills.skills
        .map(
          // @ts-ignore
          ({ skill, heading }) =>
            // @ts-ignore
            skill.map(({ name, count }) => ({
              key: toKeyFormat(name),
              heading,
              name,
              count,
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
  const localCompanies = await import('../src/data/local/companies.local.json');
  const { default: tagsMapper } = await import(
    '../src/data/local/tags.local.json'
  );

  const mapToTagEntity = (
    tag: string,
    tagsKeyMapper: [string[], { key: string; name: string }[]],
  ) =>
    tagsKeyMapper[0].includes(tag)
      ? tagsKeyMapper[1][tagsKeyMapper[0].indexOf(tag)]
      : tag;

  const companies = LocalCompanies.decode(localCompanies.default);

  const mergeWithScraped = (
    tag: TagEntity,
    scrapedTags: [string[], TagEntity[]],
  ): TagEntity => {
    scrapedTags[0].includes(tag.key);
    return scrapedTags[0].includes(tag.key)
      ? merge(tag, scrapedTags[1][scrapedTags[0].indexOf(tag.key)])
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

            return isTagEntity(mapped)
              ? mergeWithScraped(mapped, [scrapedKeyTags, scrapedValueTags])
              : mapped;
          };

          return Array.isArray(tagEntity)
            ? tagEntity.map(tag => mapAndMergeTags(tag))
            : mapAndMergeTags(tagEntity);
        });
        return { section, tags: mappers };
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
