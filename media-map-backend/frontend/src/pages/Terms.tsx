import React from 'react';
import { Send, ShieldCheck, Map, MousePointer2, ClipboardCheck, Eye } from 'lucide-react';
import { PageHero, PageSection } from '../components/UI/DesignKit';

interface Step {
  n: number;
  icon: React.ReactNode;
  title: string;
  body?: string;
  bullets?: string[];
  chips?: { icon: React.ReactNode; label: string }[];
}

const steps: Step[] = [
  {
    n: 1,
    icon: <Send className="h-7 w-7 text-navy" />,
    title: 'Билдирүү жиберүү',
    bullets: [
      'Форманы толтуруп, шылуундар же кастык тили тууралуу кабарлаңыз.',
      'Жайгашкан жерди, шилтемени жана скриншотту тиркеңиз.',
    ],
  },
  {
    n: 2,
    icon: <ShieldCheck className="h-7 w-7 text-navy" />,
    title: 'Эксперттик текшерүү',
    body: 'Фактчекерлер жана эксперттер маалыматты кылдат текшерип, администраторго өткөрүп беришет.',
    chips: [
      { icon: <ClipboardCheck className="h-4 w-4 text-goldDeep" />, label: 'Администратор белги коёт' },
    ],
  },
  {
    n: 3,
    icon: <Map className="h-7 w-7 text-navy" />,
    title: 'Мониторинг',
    body: 'Картаны реалдуу убакытта байкап, бузуулар боюнча толук маалымат алыңыз.',
    chips: [
      { icon: <MousePointer2 className="h-4 w-4 text-goldDeep" />, label: 'Интерактивдүү чыкылдатуу' },
      { icon: <Eye className="h-4 w-4 text-goldDeep" />, label: 'Фильтрациялоо мүмкүнчүлүгү' },
    ],
  },
];

const Terms = () => {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="колдонмо"
        title="Картаны кантип колдонуу керек?"
        subtitle="Үч жөнөкөй кадам менен санариптик коопсуздукка салым кошуңуз."
      />

      <PageSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex h-full flex-col rounded-[16px] border border-lineLight bg-white p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-creamPill">
                  {step.icon}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[14px] font-bold text-white">
                  {step.n}
                </span>
              </div>

              <h3 className="mb-3 text-[20px] font-extrabold text-ink">{step.title}</h3>

              {step.body && (
                <p className="mb-4 text-[14px] leading-[22px] text-slateBody">{step.body}</p>
              )}

              {step.bullets && (
                <ul className="space-y-3 text-[14px] leading-relaxed text-slateBody">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="font-bold text-gold">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {step.chips && (
                <div className="mt-auto space-y-2 pt-4">
                  {step.chips.map((chip) => (
                    <div
                      key={chip.label}
                      className="flex items-center gap-2 rounded-[10px] border border-lineLight bg-cream px-3 py-2"
                    >
                      {chip.icon}
                      <span className="text-[11px] font-bold uppercase tracking-tight text-navy">
                        {chip.label}
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
