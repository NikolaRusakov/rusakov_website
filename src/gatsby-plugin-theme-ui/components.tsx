/** @jsx jsx */
import { jsx, Card, Button, Grid, Box, Flex } from 'theme-ui';
import Codeblock from './codeblock';
import { Section } from '../components/section';
import { SectionExperienceHOC } from '../components/section-experience/sectionExperience';
import SkillSection from '../components/section-skill/skillSection';
import LinkedInSkillSection from '../components/section-skill/linkedinSkillSection';
import PortfolioSection from "../components/section-portfolio";

export default {
  // pre: props => props.children,
  Card: Card,
  Button: Button,
  Section: Section,
  Grid: Grid,
  Box: Box,
  Flex: Flex,
  code: Codeblock,
  SkillSection: SkillSection,
  PortfolioSection: PortfolioSection,
  LinkedInSkillSection: LinkedInSkillSection,
  // @ts-ignore
  blockquote: ({ children }) => (
    <blockquote sx={{ backgroundColor: 'highlight', color: 'text' }}>
      {children}
    </blockquote>
  ),
  ExperienceSection: SectionExperienceHOC,
};
