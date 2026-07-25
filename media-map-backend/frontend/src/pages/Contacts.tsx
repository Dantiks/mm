import React from 'react';
import { Mail, Phone, Send, MessageCircle, ArrowRight } from 'lucide-react';
import { PageHero, PageSection, IconPill } from '../components/UI/DesignKit';

const Contacts = () => {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="контакты"
        title="Свяжитесь с нами"
        subtitle="Если у вас есть вопросы или предложения, напишите нам через каналы, указанные ниже. Мы всегда готовы к сотрудничеству."
      />

      <PageSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <a
            href="https://t.me/+H3IwsY4KVcJjYjUy"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-[16px] border border-lineLight bg-white p-8 transition-colors hover:bg-cream"
          >
            <IconPill className="!h-14 !w-14">
              <Send className="h-6 w-6" />
            </IconPill>
            <h3 className="mt-6 text-[20px] font-extrabold text-ink">Telegram</h3>
            <p className="mt-2 flex-grow text-[14px] leading-[22px] text-slateBody">
              Нажмите на ссылку, чтобы быстро связаться с нами и присоединиться к группе.
            </p>
            <span className="mt-6 flex items-center gap-2 text-[14px] font-bold text-goldDeep">
              Присоединиться
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <div className="group flex flex-col rounded-[16px] border border-lineLight bg-white p-8 transition-colors hover:bg-cream">
            <IconPill className="!h-14 !w-14">
              <Mail className="h-6 w-6" />
            </IconPill>
            <h3 className="mt-6 text-[20px] font-extrabold text-ink">Электронная почта</h3>
            <p className="mt-2 flex-grow text-[14px] leading-[22px] text-slateBody">
              Пишите нам по официальным вопросам и вопросам сотрудничества.
            </p>
            <span className="mt-6 select-all text-[14px] font-bold text-navy">
              media.map.kg@gmail.com
            </span>
          </div>

          <div className="group flex flex-col rounded-[16px] border border-lineLight bg-white p-8 transition-colors hover:bg-cream">
            <IconPill className="!h-14 !w-14">
              <Phone className="h-6 w-6" />
            </IconPill>
            <h3 className="mt-6 text-[20px] font-extrabold text-ink">Телефон</h3>
            <p className="mt-2 flex-grow text-[14px] leading-[22px] text-slateBody">
              Мы доступны для звонков в рабочее время.
            </p>
            <span className="mt-6 text-[18px] font-bold text-goldDeep">+996 550 786186</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-[24px] bg-navy p-8 md:flex-row md:p-12">
          <div className="text-center md:text-left">
            <h4 className="text-[24px] font-extrabold text-white">Нужна техническая поддержка?</h4>
            <p className="mt-2 text-[15px] text-mutedNavy">
              Если у вас возникли трудности при использовании карты, напишите нам.
            </p>
          </div>
          <a
            href="https://t.me/+H3IwsY4KVcJjYjUy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-[12px] bg-gold px-8 py-4 text-[15px] font-extrabold text-navy transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Написать через Telegram
          </a>
        </div>
      </PageSection>
    </div>
  );
};

export default Contacts;
