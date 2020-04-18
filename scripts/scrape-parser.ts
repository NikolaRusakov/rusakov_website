import * as fs from 'fs';
import i18n from '../config/i18n.js';
import { toKeyFormat } from '../src/utils/transform';
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
  const parsedScrape = JSON.stringify({
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
  });

  // @ts-ignore
  fs.writeFile(
    `src/data/scrape/parsed-scrape.${lang}.json`,
    parsedScrape,
    e => {
      if (e) throw e;
    },
  );
});

export default scrape;
