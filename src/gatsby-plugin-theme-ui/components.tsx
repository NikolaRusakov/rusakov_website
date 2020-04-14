/** @jsx jsx */
import { jsx, Card, Button } from 'theme-ui';
import Codeblock from './codeblock';
import { Section } from '../components/section';
import { SectionExperienceHOC } from '../components/section-experience/sectionExperience';

export default {
  // pre: props => props.children,
  Card: Card,
  Button: Button,
  Section: Section,
  code: Codeblock,
  // @ts-ignore
  blockquote: ({ children }) => (
    <blockquote sx={{ backgroundColor: 'highlight', color: 'text' }}>
      {children}
    </blockquote>
  ),
  ExperienceSection: SectionExperienceHOC,
};
