/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import HiddenCheckbox from './hiddenCheckbox';
import { Global } from '@emotion/core';

export const CheckboxContainer: React.FC = ({ children }) => (
  <Styled.div
    sx={{
      display: 'flex',
      maxWidth: '25%',
      position: 'relative',
      justifyContent: 'space-around',
      verticalAlign: 'middle',
      boxShadow: theme =>
        `0 0 3px 0 grey inset, 0 0 3px 0 ${theme.colors.primary}`,
    }}>
    {children}
  </Styled.div>
);

export const Slider: React.FC = props => (
  <Styled.div
    {...props}
    sx={{
      transition: 'all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      position: 'absolute',
      bg: theme => theme.colors.primary,
      borderRadius: '50%',
      width: theme => `${theme.fontSizes[1]}px`,
      height: theme => `${theme.fontSizes[1]}px`,
      boxShadow: theme =>
        `0 0 4px 0 ${theme.colors.primary} inset, 0 0 2px 0 ${theme.colors.secondary}`,
    }}
  />
);

const Checkbox: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <React.Fragment>
    <Global
      styles={theme => ({
        '.hiddenBox:checked + div .slider': {
          transition: 'all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
          boxShadow: `0 0 4px 0 ${theme.colors.secondary} inset, 0 0 2px 0 ${theme.colors.primary}`,
          backgroundColor: `${theme.colors.secondary}`,
          transform: `translateY(calc(${theme.fontSizes[2] * 2}px))`,
        },
      })}
    />
    <HiddenCheckbox className="hiddenBox" type="checkbox" onClick={onClick} />
    <Styled.div
      sx={{
        width: theme => `${theme.fontSizes[1]}px`,
        height: '100%',
        position: 'relative',
        borderRadius: '999px',
        boxShadow: theme =>
          `0 0 3px 0 ${theme.colors.primary} inset, 0 0 3px 0 ${theme.colors.secondary}`,
      }}>
      <Slider className="slider" />
    </Styled.div>
  </React.Fragment>
);
export default Checkbox;
