import { CompanySections } from '../../../types/gatsby-graphql';
import i18next from 'i18next';
import data from '../../data/linkedin';
import { useStaticQuery, graphql } from 'gatsby';

export const useExperienceList = (sectionName: string) => {
  const locale = i18next.language;
  const {
    companySections,
  }: {
    companySections: CompanySections;
  } = useStaticQuery(graphql`
    query CompanySectionsList {
      companySections {
        skills {
          locale
          data {
            shortKey
            sections {
              section
              tags {
                name
                key
                count
                heading
                tags {
                  name
                  key
                  count
                  heading
                }
              }
            }
          }
        }
      }
    }
  `);

  const localizedSections = data.experience.map(({ header, body }) => {
    const tmpCompanyKey = header?.experience?.company
      ?.split(' ')[0]
      .toLocaleLowerCase();

    const companySection = companySections?.skills
      ?.filter(skill => skill?.locale == locale)[0]
      ?.data?.filter(section => section?.shortKey == tmpCompanyKey)[0];
    if (companySection?.sections != null) {
      return {
        shortKey: companySection.shortKey,
        sections: companySection.sections,
      };
    }
    return;
  });
  const filteredSections = localizedSections?.find(section => {
    return section?.shortKey == sectionName;
  });
  console.log(filteredSections);
  return filteredSections;
};
