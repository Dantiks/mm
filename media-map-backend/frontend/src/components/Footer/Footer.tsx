import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import footerContent from '../../i18n/pages/footer';
import { TelegramIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from '../Common/SocialIcons';

import EditableText from '../CMS/EditableText';

const socials = [
  { label: 'Telegram', href: 'https://t.me/mediamap_kg', icon: <TelegramIcon className="h-4 w-4" /> },
  { label: 'Instagram', href: 'https://instagram.com/mediamap_kg', icon: <InstagramIcon className="h-4 w-4" /> },
  { label: 'Facebook', href: 'https://facebook.com/mediamapkg', icon: <FacebookIcon className="h-4 w-4" /> },
  { label: 'YouTube', href: 'https://youtube.com/@mediamapkg', icon: <YoutubeIcon className="h-4 w-4" /> },
];

const Footer = () => {
  const { language } = useLanguage();
  const c = footerContent[language];

  const navLinks = [
    { key: 'footer.about', label: c.navLinks.about, to: '/about' },
    { key: 'footer.resources', label: c.navLinks.resources, to: '/useful' },
    { key: 'footer.categories', label: c.navLinks.categories, to: '/categories' },
    { key: 'footer.contacts', label: c.navLinks.contacts, to: '/contacts' },
  ];

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
                <EditableText textKey={link.key} value={link.label} />
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gold hover:text-navy hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-[#8590a0]">
            <EditableText textKey="footer.copyright" value={c.copyright} />
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://mediaconsult.kg/"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 items-center rounded-md bg-white px-3 transition-opacity hover:opacity-90"
            >
              <img src="/media-consult-logo.png" alt="МедиаКонсалт" className="h-5 w-auto object-contain" />
            </a>
            <span className="flex h-9 items-center rounded-md bg-white px-3">
              <img src="/assoc-logo.png" alt="Ассоциация Общинных СМИ" className="h-6 w-auto object-contain" />
            </span>
            <span className="flex h-9 items-center rounded-md bg-white px-3">
              <img src="/eu-horiz-logo.png" alt="Европейский Союз" className="h-6 w-auto object-contain" />
            </span>
            <span className="flex h-9 items-center rounded-md bg-white px-3">
              <img src="/internews-2-logo.jpg" alt="Internews" className="h-6 w-auto object-contain" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
