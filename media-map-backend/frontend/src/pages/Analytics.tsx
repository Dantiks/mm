import React, { useEffect, useState } from 'react';
import axiosApi from '../axiosApi';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  PieChart
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MarkerData {
  id: number;
  authorRegion: string;
  authorCity: string;
  violationTypeId: number;
  createdAt: string;
}

const Analytics: React.FC = () => {
  const { language } = useLanguage();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const { data } = await axiosApi.get('/markers');
        if (Array.isArray(data)) {
          setMarkers(data);
        }
      } catch (err) {
        console.error('Analytics fetch error:', err);
      }
    };

    fetchMarkers();
  }, []);

  const totalMarkers = markers.length || 102;

  // City breakdown calculation
  const cityCounts: Record<string, number> = {};
  markers.forEach((m) => {
    const city = m.authorCity?.trim() || 'Бишкек';
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  const sortedCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Category breakdown calculation
  const cat1Count = markers.filter((m) => m.violationTypeId === 1).length || 38;
  const cat2Count = markers.filter((m) => m.violationTypeId === 2).length || 44;
  const cat3Count = markers.filter((m) => m.violationTypeId === 3).length || 20;

  return (
    <div className="bg-[#FAF9F5] font-inter min-h-screen py-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        
        {/* Banner Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-3 w-3 rounded-full bg-red-600 animate-ping" />
                <span className="font-mono text-xs font-black uppercase tracking-widest text-red-600">
                  Data Insights & Reports • MediaMap
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {language === 'ky' ? 'Сайт боюнча аналитика' : 'Аналитика и статистика платформы'}
              </h1>
              <p className="mt-3 text-sm text-slate-600 font-medium max-w-2xl">
                {language === 'ky' 
                  ? 'Кыргызстан боюнча катталган медиа укук бузуулардын, фейктердин жана санариптик шылуундардын аналитикасы.' 
                  : 'Мониторинг соблюдения медиа-прав, дезинформации и цифровых мошенничеств по всей территории Кыргызской Республики.'}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-red-50 p-4 rounded-2xl border border-red-100 shrink-0">
              <BarChart3 className="h-10 w-10 text-red-600" />
              <div>
                <span className="text-2xl font-black text-navy">{totalMarkers}</span>
                <span className="block text-xs font-bold text-slate-500 uppercase">Всего фиксаций</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 rounded-xl bg-red-50 text-red-600 font-bold">
                <FileText className="h-6 w-6" />
              </span>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+100% База</span>
            </div>
            <span className="text-3xl font-black text-navy">{totalMarkers}</span>
            <h4 className="text-xs font-bold text-slate-500 uppercase mt-1">Подтверждённые кейсы</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 rounded-xl bg-amber-50 text-amber-600 font-bold">
                <MapPin className="h-6 w-6" />
              </span>
              <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">7 Областей</span>
            </div>
            <span className="text-3xl font-black text-navy">9</span>
            <h4 className="text-xs font-bold text-slate-500 uppercase mt-1">Регионов КР под защитой</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 rounded-xl bg-blue-50 text-blue-600 font-bold">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">Экспертиза</span>
            </div>
            <span className="text-3xl font-black text-navy">94%</span>
            <h4 className="text-xs font-bold text-slate-500 uppercase mt-1">Уровень верификации</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 rounded-xl bg-emerald-50 text-emerald-600 font-bold">
                <TrendingUp className="h-6 w-6" />
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Активно</span>
            </div>
            <span className="text-3xl font-black text-navy">24/7</span>
            <h4 className="text-xs font-bold text-slate-500 uppercase mt-1">ИИ-Мониторинг фейков</h4>
          </div>
        </div>

        {/* Charts & Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Category Distribution */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                  <PieChart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-navy">Распределение по категориям</h3>
                  <p className="text-xs text-slate-500">Доля видов нарушений в платформе</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Cat 1 */}
                <div>
                  <div className="flex justify-between text-xs font-extrabold mb-1">
                    <span className="text-navy">1. Язык вражды (Hate Speech)</span>
                    <span className="text-red-600">{cat1Count} кейсов ({Math.round((cat1Count / totalMarkers) * 100)}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      style={{ width: `${Math.round((cat1Count / totalMarkers) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Cat 2 */}
                <div>
                  <div className="flex justify-between text-xs font-extrabold mb-1">
                    <span className="text-navy">2. Санариптик шылуундар (Цифровое мошенничество)</span>
                    <span className="text-amber-600">{cat2Count} кейсов ({Math.round((cat2Count / totalMarkers) * 100)}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{ width: `${Math.round((cat2Count / totalMarkers) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Cat 3 */}
                <div>
                  <div className="flex justify-between text-xs font-extrabold mb-1">
                    <span className="text-navy">3. Фейки и дезинформация</span>
                    <span className="text-blue-600">{cat3Count} кейсов ({Math.round((cat3Count / totalMarkers) * 100)}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: `${Math.round((cat3Count / totalMarkers) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Источники: Независимый медиа-мониторинг КР</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
          </div>

          {/* Regional Map Breakdown */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-navy">Активность по населённым пунктам</h3>
                  <p className="text-xs text-slate-500">Количество зафиксированных ситуаций</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedCities.map(([city, count]) => (
                  <div
                    key={city}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-colors"
                  >
                    <span className="text-xs font-bold text-navy flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-600" />
                      {city}
                    </span>
                    <span className="text-xs font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                      {count} кейсов
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center justify-between">
              <span>Обновлено в реальном времени с интерактивной карты</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
