import { SectionHeaderProps } from '../components/section-header/sectionHeader';
import { SectionBodyProps } from '../components/section-body/sectionBody';
import { TagEntity } from '../components/section-experience/sectionExperience';

const data: {
  experience: {
    header: SectionHeaderProps;
    body: SectionBodyProps<TagEntity[]>;
  }[];
} = {
  experience: [
    {
      header: {
        experience: {
          employedDuration: 'Dates Employed Feb 2019 – Present',
          duration: '1 yr 3 mos',
          company: 'FlowUp Full-time',
          employment: 'Full-time',
          companyLogo:
            'https://media-exp1.licdn.com/dms/image/C560BAQE7e-hDDBtsWQ/company-logo_100_100/0?e=1594252800&v=beta&t=-seyyQEA_aICq3KHhwZLMeXgORZU7vcXmvtYVXYRbn8',
          position: 'Frontend Engineer',
          location: 'Location Brno',
        },
        externalProps: { badges: ['FE', 'BE', 'SLS'] },
      },
      body: {
        children: {
          tags: new Array(7).fill({
            name: 'Typescript',
            abbr: 'TS',
            slug: 'typescript',
          }),
          projects: [
            { name: 'Veronica Inside', abbr: 'VI', slug: 'veronicaInside' },
            {
              name: 'Hart Van Nederland',
              abbr: 'HVN',
              slug: 'hartVanNederland',
            },
          ],
        },
      },
    },
    {
      header: {
        experience: {
          employedDuration: 'Dates Employed Aug 2018 – Jan 2019',
          duration: '6 mos',
          company: 'Sprint Innovations Full-time',
          employment: 'Full-time',
          companyLogo:
            'https://media-exp1.licdn.com/dms/image/C4E0BAQGacPkigH-l8A/company-logo_100_100/0?e=1594252800&v=beta&t=z5szgLbVg1I1S1Ewhtwt0eejvELw7hqXEu2-whbFV10',
          position: 'Frontend Developer',
          location: 'Location District Brno-City, Czech Republic',
        },
        externalProps: { badges: ['FE', 'DevOps'] },
      },
      body: {
        children: {
          tags: new Array(7).fill({
            name: 'Typescript',
            abbr: 'TS',
            slug: 'typescript',
          }),
          projects: [
            { name: 'Veronica Inside', abbr: 'VI', slug: 'veronicaInside' },
            {
              name: 'Hart Van Nederland',
              abbr: 'HVN',
              slug: 'hartVanNederland',
            },
          ],
        },
      },
    },
    {
      header: {
        experience: {
          employedDuration: 'Dates Employed Jan 2018 – Jul 2018',
          duration: '7 mos',
          company: 'MARBES CONSULTING s.r.o.',
          companyLogo:
            'https://media-exp1.licdn.com/dms/image/C560BAQGmERye2lTt9Q/company-logo_100_100/0?e=1594252800&v=beta&t=ikWGpPNLxj2meB_d_A-ug6Mi9AD9ow03nEFzrJ0AyLw',
          position: 'Full-stack Developer',
          location: 'Location Plzeň-město, Plzeňský, Česká republika',
        },
        externalProps: { badges: ['FE', 'BE'] },
      },
      body: {
        children: {
          tags: new Array(7).fill({
            name: 'Typescript',
            abbr: 'TS',
            slug: 'typescript',
          }),
          projects: [
            { name: 'Veronica Inside', abbr: 'VI', slug: 'veronicaInside' },
            {
              name: 'Hart Van Nederland',
              abbr: 'HVN',
              slug: 'hartVanNederland',
            },
          ],
        },
      },
    },
    {
      header: {
        experience: {
          employedDuration: 'Dates Employed Sep 2017 – Jan 2018',
          duration: '5 mos',
          company: 'FutureTek Solutions Ltd. Full-time',
          employment: 'Full-time',
          companyLogo:
            'https://media-exp1.licdn.com/dms/image/C560BAQEeZdp3-MUVBg/company-logo_100_100/0?e=1594252800&v=beta&t=Sptj6GEkztqWX_l9iMm3Dk8XYNkaF_LsyNxDsq2brKk',
          position: 'Full-stack Developer',
          location: 'Location Okres Plzeň-město, Česká republika',
          details: 'Iternship',
        },
        externalProps: { badges: ['FE', 'BE', 'DevOps'] },
      },
      body: {
        children: {
          tags: [],
          // tags: new Array(7).fill({
          //   name: 'Typescript',
          //   abbr: 'TS',
          //   slug: 'typescript',
          // }),
          projects: [
            { name: 'Veronica Inside', abbr: 'VI', slug: 'veronicaInside' },
            {
              name: 'Hart Van Nederland',
              abbr: 'HVN',
              slug: 'hartVanNederland',
            },
          ],
        },
      },
    },
  ],
};

export default data;
