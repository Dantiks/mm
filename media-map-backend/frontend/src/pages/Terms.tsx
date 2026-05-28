import React from 'react';
import { Send, ShieldCheck, Map, MousePointer2, ClipboardCheck, Eye } from "lucide-react";

const Terms = () => {
  return (
      <div className="max-w-7xl w-full mx-auto px-6 md:px-10 py-16">
        {/* Заголовок секции */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Картаны кантип <span className="text-blue-600">колдонуу керек?</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            Үч жөнөкөй кадам менен санариптик коопсуздукка салым кошуңуз
          </p>
        </div>

        <div className="relative">
          {/* Пунктирная линия (видна только на десктопах) */}
          <div className="absolute inset-x-0 hidden lg:block top-4 px-32 opacity-20">
            <img
                alt=""
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                className="w-full"
            />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

            {/* Кадам 1 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-white border-4 border-blue-50 rounded-[2.5rem] shadow-xl shadow-blue-100/50 z-10 relative">
                  <Send className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  1
                </div>
              </div>

              <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow h-full">
                <h3 className="font-bold text-slate-800 text-xl mb-4 flex items-center gap-2">
                  Билдирүү жиберүү
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    Форманы толтуруп, шылуундар же кастык тили тууралуу кабарлаңыз.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    Жайгашкан жерди, шилтемени жана скриншотту тиркеңиз.
                  </li>
                </ul>
              </div>
            </div>

            {/* Кадам 2 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-white border-4 border-emerald-50 rounded-[2.5rem] shadow-xl shadow-emerald-100/50 z-10 relative">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  2
                </div>
              </div>

              <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow h-full">
                <h3 className="font-bold text-slate-800 text-xl mb-4 flex items-center gap-2">
                  Эксперттик текшерүү
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Фактчекерлер жана эксперттер маалыматты кылдат текшерип, администраторго өткөрүп беришет.
                </p>
                <div className="flex items-center gap-2 py-2 px-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-tight">Администратор белги коёт</span>
                </div>
              </div>
            </div>

            {/* Кадам 3 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-white border-4 border-purple-50 rounded-[2.5rem] shadow-xl shadow-purple-100/50 z-10 relative">
                  <Map className="w-8 h-8 text-purple-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  3
                </div>
              </div>

              <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow h-full">
                <h3 className="font-bold text-slate-800 text-xl mb-4 flex items-center gap-2">
                  Мониторинг
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Картаны реалдуу убакытта байкап, бузуулар боюнча толук маалымат алыңыз.
                </p>
                <div className="flex items-center gap-2 py-2 px-3 bg-purple-50 rounded-xl border border-purple-100 mb-2">
                  <MousePointer2 className="w-4 h-4 text-purple-600" />
                  <span className="text-[11px] font-bold text-purple-700 uppercase tracking-tight">Интерактивдүү чыкылдатуу</span>
                </div>
                <div className="flex items-center gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Eye className="w-4 h-4 text-slate-600" />
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Фильтрациялоо мүмкүнчүлүгү</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};

export default Terms;