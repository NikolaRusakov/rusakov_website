import React from 'react';
import Codeblock from './codeblock';
import { Card, Button } from 'theme-ui';
import { Section } from '../components/section';

export default {
  pre: props => props.children,
  Card: Card,
  Button: Button,
  Section: Section,
  code: Codeblock,
};
