import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared design-system primitives for the mediamap.kg redesign.
 * Palette: navy #0b2545, gold #e8b84b, deep gold #b8871f, cream #f7f4ec,
 * lineLight #ece7da, ink #14181a, slateBody #6e7979. Font: Inter + JetBrains Mono.
 */

import EditableText from '../CMS/EditableText';

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p
    className={`font-mono text-[12px] uppercase tracking-[0.72px] text-goldDeep ${className}`}
  >
    {typeof children === 'string' ? (
      <EditableText textKey="eyebrow" value={children} />
    ) : (
      children
    )}
  </p>
);

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Show the "← Главная" breadcrumb bar above the hero. */
  breadcrumb?: boolean;
  /** Optional content rendered on the right of the hero (e.g. an aside). */
  aside?: React.ReactNode;
}

// Cream hero band matching the Figma "Категории нарушений" screen.
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  breadcrumb = false,
  aside,
}) => (
  <div className="bg-cream font-inter">
    {breadcrumb && (
      <div className="border-b border-lineLight">
        <div className="mx-auto max-w-[1792px] px-6 py-[11px] lg:px-16">
          <Link to="/" className="text-[13px] font-semibold text-navy hover:underline">
            <EditableText textKey="hero.breadcrumb" value="← Главная" />
          </Link>
        </div>
      </div>
    )}
    <div className="mx-auto max-w-[1792px] px-6 py-14 lg:px-16">
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-[720px]">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-[34px] font-extrabold leading-tight text-navy md:text-[44px]">
            {typeof title === 'string' ? (
              <EditableText textKey="hero.title" value={title} />
            ) : (
              title
            )}
          </h1>
          {subtitle && (
            <p className="mt-4 text-[17px] leading-[27.2px] text-[#4b5556]">
              {typeof subtitle === 'string' ? (
                <EditableText textKey="hero.subtitle" value={subtitle} />
              ) : (
                subtitle
              )}
            </p>
          )}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </div>
  </div>
);

// Standard page content wrapper (matches hero horizontal rhythm).
export const PageSection: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`mx-auto max-w-[1792px] px-6 py-16 lg:px-16 font-inter ${className}`}>
    {children}
  </div>
);

// White bordered card.
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`rounded-[16px] border border-lineLight bg-white ${className}`}>{children}</div>
);

// Round cream icon badge (holds a glyph or lucide icon).
export const IconPill: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-creamPill text-[20px] text-navy ${className}`}
  >
    {children}
  </span>
);

// Button style helpers (compose with your own element).
export const btnGold =
  'inline-flex items-center justify-center gap-2 rounded-[12px] bg-gold px-6 py-3 text-[15px] font-extrabold text-navy transition-opacity hover:opacity-90 disabled:opacity-60';

export const btnNavy =
  'inline-flex items-center justify-center gap-2 rounded-[12px] bg-navy px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-navyCard disabled:opacity-60';

export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-[12px] border border-lineLight bg-white px-6 py-3 text-[15px] font-semibold text-navy transition-colors hover:bg-cream';

export const inputBase =
  'w-full rounded-[10px] border border-lineLight bg-white px-4 py-3 text-[15px] text-navy placeholder:text-[#757575] outline-none focus:border-gold transition-colors';

export const fieldLabel =
  'block mb-2 text-[12px] font-semibold uppercase tracking-[0.48px] text-slateBody';
