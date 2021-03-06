import { CompanySections, Maybe } from '../../../types/gatsby-graphql';
import i18next from 'i18next';
import { graphql, useStaticQuery } from 'gatsby';
import { exists } from '../../utils/utils';

export const useCompanySections = ():
  | {
      companySections: Maybe<CompanySections>;
    }
  | undefined => {
  const data: {
    companySections: Maybe<CompanySections>;
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
                color
                tags {
                  name
                  key
                  count
                  heading
                  color
                }
              }
            }
          }
        }
      }
    }
  `);
  if (exists(data)) return data;
  return undefined;
};

export const useExperienceList = (sectionName?: string) => {
  const locale = i18next.language;
  const companySections = useCompanySections();
  const companySection = companySections?.companySections?.skills
    ?.filter(skill => skill?.locale == locale.split('-')[0])[0]
    ?.data?.filter(section => {
      return section?.shortKey == sectionName;
    })[0];

  if (companySection?.sections != null) {
    return {
      shortKey: companySection.shortKey,
      sections: companySection.sections,
    };
  }
  return undefined;
};
