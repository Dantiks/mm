import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'О проекте', to: '/about' },
  { label: 'Ресурсы', to: '/useful' },
  { label: 'Категории нарушений', to: '/categories' },
  { label: 'Контакты', to: '/contacts' },
];

const socials = [
  { label: 'TG', href: 'https://t.me/' },
  { label: 'IG', href: 'https://instagram.com/' },
  { label: 'FB', href: 'https://facebook.com/' },
  { label: 'YT', href: 'https://youtube.com/' },
];

const Footer = () => {
  return (
    <footer className="bg-navy font-inter text-white">
      <div className="mx-auto max-w-[1792px] px-6 lg:px-16">
        <div className="flex flex-col gap-6 border-b border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[14px] text-[#c7cdd6] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 font-mono text-[9px] font-bold text-white transition-colors hover:border-white/70"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-6 text-[12px] text-[#8590a0] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MediaMap.kg. Материалы публикуются в рамках инициативы медиаграмотности КР.</p>
          <p>
            При поддержке:{' '}
            <a
              href="https://www.eeas.europa.eu/delegations/kyrgyz-republic_ru"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Европейский Союз
            </a>{' '}
            ·{' '}
            <a
              href="https://mediaconsult.kg/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              МедиаКонсалт
            </a>{' '}
            ·{' '}
            <a
              href="https://internews.kg/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Internews
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
