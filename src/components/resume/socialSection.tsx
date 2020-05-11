/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';

import { ReactComponent as Github } from '../../../static/svg/github.svg';
import { ReactComponent as LinkedIn } from '../../../static/svg/linkedin.svg';
import { ReactComponent as Twitter } from '../../../static/svg/twitter.svg';
import { ReactComponent as StackBlitz } from '../../../static/svg/stackblitz.svg';

import { useThemeUI } from 'theme-ui';
import about from '../../data/local/about.json';

const SocialSection: React.FC<{ styles?: {} }> = ({ styles = {} }) => {
  const { theme: themeSet } = useThemeUI();
  const socialIcon = (icon: string) => {
    switch (icon) {
      case 'github':
        return <Github width={24} height={24} fill={themeSet?.colors?.primary} />;
        break;
      case 'linkedin':
        return <LinkedIn width={24} height={24} />;
        break;
      case 'twitter':
        return <Twitter width={24} height={24} fill={themeSet?.colors?.text} />;
        break;
      case 'stackblitz':
        return (
          <StackBlitz width={24} height={24} fill={themeSet?.colors?.text} />
        );
      default:
        <> </>;
        return <> </>;
    }
  };

  return (
    <React.Fragment>
      {about.basics.profiles.map(({ network, url, username }) => (
        <Flex sx={{ width: '100%', ...styles }}>
          <a
            href={url}
            sx={{
              textAlign: 'center',
              my: 1,
              flexDirection: ['column', 'row', 'row'],
              alignItems: ['center', null, null],
              justifyContent: 'flex-start',
              display: 'grid',
              gridTemplateColumns: 'minmax(36px, auto) 1fr',
              position: 'relative',
            }}>
            {socialIcon(network.toLowerCase())}
          </a>
        </Flex>
      ))}
    </React.Fragment>
  );
};
export default SocialSection;
