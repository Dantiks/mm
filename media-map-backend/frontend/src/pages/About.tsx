import React from 'react';
import { PageHero, PageSection } from '../components/UI/DesignKit';

const linkClass = 'font-semibold text-goldDeep hover:underline';

const About = () => {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="о проекте"
        title="О проекте"
        subtitle="mediamap.kg — интерактивная карта, отражающая распространение языка вражды, цифрового мошенничества и дезинформации в интернет-пространстве Кыргызстана."
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
              Пользователи интернета в Кыргызстане могут отправлять сообщения о случаях дезинформации,
              языка вражды или цифрового мошенничества, с которыми они столкнулись в цифровом пространстве.
              Команда проекта рассматривает эти данные, оценивает их и предоставляет пользователям
              соответствующие разъяснения и рекомендации по мерам противодействия нарушениям закона.
            </p>
            <p>
              Интерактивная онлайн-карта{' '}
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
              основана.
            </p>
            <p>
              Карта обновляется в режиме реального времени: пользователи могут отмечать конкретные
              случаи нарушений закона и географические регионы, где они произошли. Кроме того,
              публикуя свои сообщения, пользователи вносят вклад в борьбу с дезинформацией,
              языком вражды и цифровым мошенничеством.
            </p>
            <p>
              Информация о нарушениях позволяет пользователям повысить осведомлённость о видах
              правонарушений, их последствиях и способах противодействия им. Это также помогает
              повысить уровень медийной, информационной и цифровой грамотности граждан.
            </p>
            <p>
              Эта карта создана в рамках регионального проекта{' '}
              <a
                href="https://internews.kg/ru/proekt-caravan/"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                «Повышение устойчивости аудитории через реальные истории (CARAVAN)»
              </a>
              . Проект реализуется организацией{' '}
              <a href="https://internews.kg/" target="_blank" rel="noreferrer" className={linkClass}>
                Internews
              </a>{' '}
              при финансовой поддержке Европейского Союза. Партнёром проекта в Кыргызстане выступает
              Ассоциация общественных СМИ Кыргызстана (АОСМИК),{' '}
              <a href="https://mediaconsult.kg" target="_blank" rel="noreferrer" className={linkClass}>
                Фонд «МедиаКонсалт»
              </a>{' '}
              и{' '}
              <a
                href="https://www.facebook.com/Checkitkg"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                СheckIt.kg
              </a>
              , с которыми ведётся сотрудничество в рамках проекта.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default About;
