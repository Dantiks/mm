import React from 'react';
import { PageHero, PageSection } from '../components/UI/DesignKit';

const linkClass = 'font-semibold text-goldDeep hover:underline';

const About = () => {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="о проекте"
        title="Долбоор жөнүндө"
        subtitle="mediamap.kg — Кыргызстандын интернет мейкиндигинде кастык тили, санариптик алдамчылык жана жалган маалыматтардын таралышын чагылдырган интерактивдүү карта."
      />

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
            <p>
              Кыргызстандык интернет колдонуучулар санариптик мейкиндикте туш болгон жалган маалымат,
              жек көрүүчүлүк сөздөр же санариптик алдамчылык учурлары жөнүндө билдирүү жөнөтө алышат.
              Долбоордун командасы бул маалыматтарды карап чыгып, баа берип, колдонуучуларга тиешелүү
              түшүндүрмөлөрдү жана мыйзам бузууларга каршы чара көрүү боюнча кеңештерди берет.
            </p>
            <p>
              Интерактивдүү онлайн карта{' '}
              <a href="https://leafletjs.com/" target="_blank" rel="noreferrer" className={linkClass}>
                Leaflet
              </a>{' '}
              | ©{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                OpenStreetMap
              </a>{' '}
              негизделди.
            </p>
            <p>
              Карта реалдуу убакытта жаңыланып турат, колдонуучулар мыйзам бузуулар орун алган
              конкреттүү учурларды жана географиялык аймактарды көрсөтө алышат. Ошондой эле,
              колдонуучулар өз билдирүүлөрүн бөлүшүү аркылуу жалган маалыматка, жек көрүүчүлүк
              сөздөргө жана санариптик алдамчылыкка каршы күрөшкө салым кошо алышат.
            </p>
            <p>
              Укук бузуулар тууралуу маалыматтар колдонуучуларга укук бузуулардын түрлөрү, алардын
              кесепеттери жана аларга каршы күрөшүү ыкмалары жөнүндө маалымдуулугун жогорулатууга
              мүмкүнчүлүк берет. Бул жарандардын медиа, маалыматтык жана санариптик сабаттуулук
              деңгээлин көтөрүүгө да жардам берет.
            </p>
            <p>
              Бул карта{' '}
              <a
                href="https://internews.kg/ru/proekt-caravan/"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                «Анык окуялар аркылуу аудиториянын туруктуулугун жогорулатуу (CARAVAN)»
              </a>{' '}
              аттуу аймактык долбоордун алкагында түзүлдү. Долбоорду{' '}
              <a href="https://internews.kg/" target="_blank" rel="noreferrer" className={linkClass}>
                Internews
              </a>{' '}
              уюму Европалык Союздун каржылоосу менен ишке ашырууда. Кыргызстанда долбоордун өнөктөшү —
              Кыргызстандын Жамааттык ЖМКлар Ассоциациясы (ЖММК),{' '}
              <a href="https://mediaconsult.kg" target="_blank" rel="noreferrer" className={linkClass}>
                МедиаКонсалт фонду
              </a>{' '}
              жана{' '}
              <a
                href="https://www.facebook.com/Checkitkg"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                СheckIt.kg
              </a>{' '}
              долбоору менен кызматташтыкта иш алып барууда.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default About;
