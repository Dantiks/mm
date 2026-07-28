import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { PageHero, PageSection } from '../components/UI/DesignKit';

interface NewsItem {
  id: number;
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
  source: string;
}

const NewsAggregator: React.FC = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.rows || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={t.aggregator.title}
        subtitle={t.aggregator.subtitle}
      />
      <PageSection>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col rounded-2xl border-2 border-slate-200/80 bg-white p-6 transition-all hover:-translate-y-1 hover:border-red-600/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                    {item.source}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(item.pubDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy leading-tight mb-2 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-3">
                  {item.contentSnippet}
                </p>
                <div className="mt-4 text-sm font-bold text-red-600 flex items-center gap-1">
                  {t.aggregator.readSource} <span aria-hidden="true">→</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default NewsAggregator;
