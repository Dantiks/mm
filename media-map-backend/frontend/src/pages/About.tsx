import React from 'react';
import { PageHero, PageSection } from '../components/UI/DesignKit';
import { useLanguage } from '../i18n/LanguageContext';
import aboutContent from '../i18n/pages/about';

const linkClass = 'font-semibold text-goldDeep hover:underline';

const About = () => {
  const { language } = useLanguage();
  const c = aboutContent[language];

  return (
    <div className="bg-white">
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <PageSection className="!py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[16px] border border-lineLight bg-cream p-8">
            <img
              src="https://i.imgur.com/WbQnbas.png"
              alt="MediaMap.kg"
              className="mx-auto w-full max-w-[420px]"
            />
          </div>

          <div className="space-y-4 text-[16px] leading-[26px] text-slateBody">
            <p>{c.paragraph1}</p>
            <p>
              {c.paragraph2.beforeLeaflet}{' '}
              <a href="https://leafletjs.com/" target="_blank" rel="noreferrer" className={linkClass}>
                Leaflet
              </a>{' '}
              {c.paragraph2.betweenLeafletAndOsm}{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                OpenStreetMap
              </a>{' '}
              {c.paragraph2.afterOsm}
            </p>
            <p>{c.paragraph3}</p>
            <p>{c.paragraph4}</p>
            <p>
              {c.paragraph5.beforeCaravan}{' '}
              <a
                href="https://internews.kg/ru/proekt-caravan/"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                {c.paragraph5.caravanTitle}
              </a>{' '}
              {c.paragraph5.betweenCaravanAndInternews}{' '}
              <a href="https://internews.kg/" target="_blank" rel="noreferrer" className={linkClass}>
                Internews
              </a>{' '}
              {c.paragraph5.betweenInternewsAndMediaConsult}{' '}
              <a href="https://mediaconsult.kg" target="_blank" rel="noreferrer" className={linkClass}>
                Фонд «МедиаКонсалт»
              </a>{' '}
              {c.paragraph5.betweenMediaConsultAndCheckIt}{' '}
              <a
                href="https://www.facebook.com/Checkitkg"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                СheckIt.kg
              </a>
              {c.paragraph5.afterCheckIt}
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default About;
