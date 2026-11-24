import clsx from 'clsx';
import type { ComponentProps } from 'react';
import portfolioLogo from '../../assets/portfolio-logo.webp';
import portfolioLogo2x from '../../assets/portfolio-logo@2x.webp';

interface PortfolioLogoProps extends ComponentProps<'img'> {
  alt: string;
}

export function PortfolioLogo({ alt, className, ...img }: Readonly<PortfolioLogoProps>) {
  return (
    <img
      src={portfolioLogo}
      srcSet={`${portfolioLogo} 1x, ${portfolioLogo2x} 2x`}
      alt={alt}
      className={clsx('aspect-logo', className)}
      {...img}
    />
  );
}
