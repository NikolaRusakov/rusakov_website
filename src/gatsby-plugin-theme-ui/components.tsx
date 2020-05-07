/** @jsx jsx */
import {
  jsx,
  Card,
  Button,
  Grid,
  Box,
  Flex,
  Badge,
  Container,
  Message,
} from 'theme-ui';
import Codeblock from './codeblock';
import { Section } from '../components/section';
import { SectionExperienceHOC } from '../components/section-experience/sectionExperience';
import SkillSection from '../components/section-skill/skillSection';
import LinkedInSkillSection from '../components/section-skill/linkedinSkillSection';
import PortfolioSection from '../components/section-portfolio';
import ResumeHero from '../components/resume/resumeHero';
import ExperienceList from '../components/section-experience/experienceList';

export default {
  // pre: props => props.children,
  Card: Card,
  Button: Button,
  Section: Section,
  Grid: Grid,
  Box: Box,
  Flex: Flex,
  code: Codeblock,
  Message: Message,
  SkillSection: SkillSection,
  PortfolioSection: PortfolioSection,
  ResumeHero: ResumeHero,
  LinkedInSkillSection: LinkedInSkillSection,
  Container: Container,
  TechStackList: ExperienceList,
  Badge: Badge,
  // @ts-ignore
  blockquote: ({ children }) => (
    <blockquote sx={{ backgroundColor: 'highlight', color: 'text' }}>
      {children}
    </blockquote>
  ),
  ExperienceSection: SectionExperienceHOC,
};
