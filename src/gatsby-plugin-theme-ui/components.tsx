import Codeblock from './codeblock';
import { Card, Button } from 'theme-ui';
import { Section } from '../components/section';
import { SectionExperienceHOC } from '../components/section-experience/sectionExperience';

export default {
  // pre: props => props.children,
  Card: Card,
  Button: Button,
  Section: Section,
  code: Codeblock,
  ExperienceSection: SectionExperienceHOC,
};
