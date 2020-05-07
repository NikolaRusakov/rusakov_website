/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';

export interface PortfolioCardArguments {
  body: JSX.Element;
}

export interface PortfolioCardProps {
  variant?: {
    card?: 'vertical' | 'horizontal';
    image?: 'vertical' | 'horizontal';
  };
  title?: string;
  platform?: string;
  image?: JSX.Element;
  children: (args: PortfolioCardArguments) => JSX.Element;
}
const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  platform,
  image,
  variant = {
    card: 'horizontal',
    image: 'horizontal',
  },
  children,
  ...etc
}) => {
  return children({
    body: (
      <article
        sx={{
          display: 'flex',
          flexDirection: variant.card === 'horizontal' ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        {...etc}>
        {platform && (
          <span
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              m: 1,
              mixBlendMode: 'screen',
              opacity: '0.4',
              textShadow: '-1px -1px 9px #006D95',
              fontWeight: 'bolder',
            }}>
            [ {platform} ]
          </span>
        )}
        {variant?.image === 'vertical' && image && image}
        <Flex
          sx={{
            flexDirection: variant?.image === 'horizontal' ? 'row' : 'column',
          }}>
          {variant?.image === 'horizontal' && image && image}
          {title && <h3>{title}</h3>}
        </Flex>
      </article>
    ),
  });
};
export default PortfolioCard;
