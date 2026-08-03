import React, { useState } from 'react';
import { Mail, Send, MessageCircle, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PageHero, PageSection, IconPill } from '../components/UI/DesignKit';
import { useLanguage } from '../i18n/LanguageContext';
import contactsContent from '../i18n/pages/contacts';

const Contacts = () => {
  const { t, language } = useLanguage();
  const c = contactsContent[language];
  const ct = t.contacts;

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReportErrorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorMessage.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSenderName('');
      setSenderEmail('');
      setErrorMessage('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-white font-inter min-h-screen">
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <PageSection>
        {/* Карточки контактов */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <a
            href="https://t.me/mediamap_kg"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border-2 border-lineLight bg-white p-8 transition-all hover:border-red-500/40 hover:shadow-lg"
          >
            <IconPill className="!h-14 !w-14 bg-red-50 text-red-600 border border-red-100">
              <Send className="h-6 w-6 text-red-600" />
            </IconPill>
            <h3 className="mt-6 text-[20px] font-black text-navy">{c.telegram.title}</h3>
            <p className="mt-2 flex-grow text-[14px] leading-[22px] text-slateBody">
              {c.telegram.description}
            </p>
            <span className="mt-6 flex items-center gap-2 text-[14px] font-extrabold text-red-600">
              {c.telegram.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <div className="group flex flex-col rounded-2xl border-2 border-lineLight bg-white p-8 transition-all hover:border-red-500/40 hover:shadow-lg">
            <IconPill className="!h-14 !w-14 bg-red-50 text-red-600 border border-red-100">
              <Mail className="h-6 w-6 text-red-600" />
            </IconPill>
            <h3 className="mt-6 text-[20px] font-black text-navy">{c.email.title}</h3>
            <p className="mt-2 flex-grow text-[14px] leading-[22px] text-slateBody">
              {c.email.description}
            </p>
            <span className="mt-6 select-all text-[14px] font-extrabold text-navy">
              media.map.kg@gmail.com
            </span>
          </div>

          <a
            href="https://wa.me/996550786186"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border-2 border-lineLight bg-white p-8 transition-all hover:border-emerald-500/40 hover:shadow-lg"
          >
            <IconPill className="!h-14 !w-14 bg-emerald-50 text-emerald-600 border border-emerald-100">
              <MessageCircle className="h-6 w-6 text-emerald-600" />
            </IconPill>
            <h3 className="mt-6 text-[20px] font-black text-navy">WhatsApp</h3>
            <p className="mt-2 flex-grow text-[14px] leading-[22px] text-slateBody">
              Быстрая связь в чате WhatsApp для вопросов и консультаций.
            </p>
            <span className="mt-6 flex items-center gap-2 text-[16px] font-black text-emerald-600">
              +996 550 786186
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        {/* Блок «Если вы встретили ошибку — напишите нам» с маскотом */}
        <div className="mt-12 rounded-3xl border-2 border-red-600/30 bg-gradient-to-br from-red-50/50 via-white to-amber-50/40 p-8 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md">
                <AlertTriangle className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-black text-navy sm:text-2xl">
                  {ct.reportErrorTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                  {ct.reportErrorSubtitle}
                </p>
              </div>
            </div>

            {/* Маскот-совёнок с подсказкой */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2 border border-amber-200 shadow-xs shrink-0">
              <img
                src="/owl-mascot.png"
                alt={t.owl.teacherName}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xs font-bold text-navy">
                {t.owl.teacherName} примет заявку
              </span>
            </div>
          </div>

          <form onSubmit={handleReportErrorSubmit} className="space-y-4 max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy mb-1">{ct.namePlaceholder}</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={ct.namePlaceholder}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1">{ct.emailPlaceholder}</label>
                <input
                  type="text"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder={ct.emailPlaceholder}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">Описание ошибки / замечания</label>
              <textarea
                required
                rows={4}
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder={ct.messagePlaceholder}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 active:scale-[0.99]"
              >
                <span>{ct.sendBtn}</span>
                <Send className="h-4 w-4" />
              </button>

              {submitted && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-xs font-bold text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{ct.successMessage}</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Раздел поддержки */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-navy p-8 md:flex-row md:p-12 shadow-xl">
          <div className="text-center md:text-left">
            <h4 className="text-[24px] font-black text-white">{c.support.title}</h4>
            <p className="mt-2 text-[15px] text-slate-300 font-medium">{c.support.description}</p>
          </div>
          <a
            href="https://t.me/mediamap_kg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-[15px] font-black text-white transition-all hover:bg-red-700 shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
            {c.support.button}
          </a>
        </div>
      </PageSection>
    </div>
  );
};

export default Contacts;

