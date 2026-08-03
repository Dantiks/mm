import React from 'react';
import { Send, ShieldCheck, BarChart3, ListFilter, ClipboardCheck, Eye } from 'lucide-react';
import { PageHero, PageSection } from '../components/UI/DesignKit';
import { useLanguage } from '../i18n/LanguageContext';
import termsContent from '../i18n/pages/terms';
import EditableText from '../components/CMS/EditableText';

const stepIcons = [
  <Send className="h-7 w-7 text-navy" key="send" />,
  <ShieldCheck className="h-7 w-7 text-navy" key="shield" />,
  <BarChart3 className="h-7 w-7 text-navy" key="chart" />,
];

const chipIconsByStepIndex: Record<number, React.ReactNode[]> = {
  1: [<ClipboardCheck className="h-4 w-4 text-goldDeep" key="clipboard" />],
  2: [
    <ListFilter className="h-4 w-4 text-goldDeep" key="filter" />,
    <Eye className="h-4 w-4 text-goldDeep" key="eye" />,
  ],
};

const Terms = () => {
  const { language } = useLanguage();
  const c = termsContent[language];

  return (
    <div className="bg-white">
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <PageSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {c.steps.map((step, i) => (
            <div
              key={step.n}
              className="flex h-full flex-col rounded-[16px] border border-lineLight bg-white p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-creamPill">
                  {stepIcons[i]}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[14px] font-bold text-white">
                  {step.n}
                </span>
              </div>

              <h3 className="mb-3 text-[20px] font-extrabold text-ink">
                <EditableText textKey={`terms.step.${step.n}.title`} value={step.title} />
              </h3>

              {step.body && (
                <p className="mb-4 text-[14px] leading-[22px] text-slateBody">
                  <EditableText textKey={`terms.step.${step.n}.body`} value={step.body} />
                </p>
              )}

              {step.bullets && (
                <ul className="space-y-3 text-[14px] leading-relaxed text-slateBody">
                  {step.bullets.map((b, idx) => (
                    <li key={b} className="flex gap-2">
                      <span className="font-bold text-gold">•</span>
                      <EditableText textKey={`terms.step.${step.n}.bullet.${idx}`} value={b} />
                    </li>
                  ))}
                </ul>
              )}

              {step.chips && (
                <div className="mt-auto space-y-2 pt-4">
                  {step.chips.map((label, chipIndex) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-[10px] border border-lineLight bg-cream px-3 py-2"
                    >
                      {chipIconsByStepIndex[i]?.[chipIndex]}
                      <span className="text-[11px] font-bold uppercase tracking-tight text-navy">
                        <EditableText textKey={`terms.step.${step.n}.chip.${chipIndex}`} value={label} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
};

export default Terms;
