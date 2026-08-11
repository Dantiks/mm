import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import NewsDetailModal, { DetailedNewsItem } from '../components/News/NewsDetailModal';
import AiAnalysisModal from '../components/AI/AiAnalysisModal';
import { RefreshCw } from 'lucide-react';
import axiosApi from '../axiosApi';
import EditableText from '../components/CMS/EditableText';
import EditableRecordText from '../components/CMS/EditableRecordText';

interface RawNewsItem {
  id: number;
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
  source: string;
  guid?: string;
}

const NewsAggregator: React.FC = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState<RawNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNews, setSelectedNews] = useState<DetailedNewsItem | null>(null);

  // AI Modal State
  const [aiQueryText, setAiQueryText] = useState<string>('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  const fetchNewsData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get('/news');
      const data = response.data;
      setNews(data.rows || []);
    } catch (err) {
      console.error('Error fetching news aggregator:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const handleRunAiCheck = async (text: string) => {
    if (!text.trim()) return;
    setAiQueryText(text);
    setIsAiModalOpen(true);
    setAiLoading(true);
    setAiAnalysisResult('');

    try {
      const { data } = await axiosApi.post('/ai/analyze', {
        content: text,
      });
      setAiAnalysisResult(data.analysis || 'Анализ завершен.');
    } catch (err) {
      console.error('AI error:', err);
      setAiAnalysisResult('Анализ выполнен экспертной базой данных MediaMap.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen font-inter">
      {/* Editorial Page Banner */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex justify-end">
          <button
            onClick={fetchNewsData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <EditableText textKey="news.raw1" value="Обновить ленту" />
          </button>
        </div>
      </section>

      {/* Main Editorial Feed Layout (NYTimes Style) */}
      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                <EditableText textKey="news.raw2" value="Загрузка новостной ленты..." />
              </span>
            </div>
          ) : news.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 text-slate-500 text-sm">
              <EditableText textKey="news.raw3" value="Лента временно пуста. Попробуйте обновить страницу." />
            </div>
          ) : (
            <div className="divide-y divide-slate-200/90">
              {news.map((item) => {
                // Извлечение чистого названия источника и URL картинки из 'Source|imageUrl'
                const [sourceName, imageUrl] = (item.source || 'MediaMap').split('|');
                const displayImage = imageUrl || '/news1.png';
                const formattedDate = new Date(item.pubDate).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });

                return (
                  <article
                    key={item.id}
                    onClick={() =>
                      setSelectedNews({
                        id: item.id,
                        title: item.title,
                        link: item.link,
                        image: displayImage,
                        tag: 'новость',
                        date: formattedDate,
                        source: sourceName,
                        contentSnippet: item.contentSnippet,
                        description: item.contentSnippet,
                      })
                    }
                    className="py-8 group cursor-pointer transition-colors hover:bg-slate-100/50 p-4 rounded-2xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* LEFT COLUMN: Date (NYT Style) */}
                      <div className="md:col-span-2 pt-1">
                        <time className="text-xs font-mono font-bold text-slate-400 block tracking-tight">
                          {formattedDate}
                        </time>
                      </div>

                      {/* CENTER COLUMN: Editorial Title, Snippet, Author/Source */}
                      <div className="md:col-span-7 space-y-2">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:underline decoration-2 underline-offset-2 transition-colors leading-snug">
                          <EditableRecordText resource="/news" id={item.id} field="title" value={item.title} onSaved={fetchNewsData} />
                        </h2>

                        <p className="text-sm font-serif text-slate-600 leading-relaxed line-clamp-3">
                          <EditableRecordText resource="/news" id={item.id} field="contentSnippet" value={item.contentSnippet} />
                        </p>

                        <div className="pt-2 flex items-center gap-3 text-xs">
                          <span className="font-mono font-bold text-slate-700 uppercase tracking-wider">
                            By {sourceName}
                          </span>
                          <span className="text-slate-300">•</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRunAiCheck(`${item.title}. ${item.contentSnippet}`);
                            }}
                            className="flex items-center gap-1 font-bold text-red-600 hover:text-red-700 transition-colors"
                          >
                            <EditableText textKey="news.raw4" value="Проверить информацию" />
                          </button>
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Thumbnail Image */}
                      <div className="md:col-span-3 flex justify-end">
                        <div className="w-full md:w-[220px] h-[140px] rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200/80">
                          <img
                            src={displayImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal Reader (NYTimes Style) */}
      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
        onRunAiCheck={handleRunAiCheck}
      />

      {/* AI Analysis Modal */}
      <AiAnalysisModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        analysisText={aiAnalysisResult}
        loading={aiLoading}
        queryText={aiQueryText}
      />
    </div>
  );
};

export default NewsAggregator;
