import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  pubDate: string;
  link: string;
}

const NewsManagement: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/news');
      setNews(data.rows || []);
    } catch (err) {
      console.error(err);
      alert('Ошибка при загрузке новостей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту новость?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      alert('Новость удалена');
      fetchNews();
    } catch (err) {
      console.error(err);
      alert('Ошибка при удалении');
    }
  };

  const handleTriggerFetch = async () => {
    setFetching(true);
    try {
      await axios.get('http://localhost:5000/api/news/trigger-fetch');
      alert('Парсинг новостей запущен');
      await fetchNews();
    } catch (err) {
      console.error(err);
      alert('Ошибка при парсинге новостей');
    } finally {
      setFetching(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-navy">Управление новостями</h1>
        <button
          onClick={handleTriggerFetch}
          disabled={fetching}
          className="bg-navy text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-navyCard transition-all disabled:opacity-50"
        >
          {fetching ? 'Загрузка...' : 'Запустить парсер сейчас'}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        {news.length === 0 ? (
          <p className="text-slate-500">Нет новостей. Запустите парсер.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-4 font-bold text-slate-500">ID</th>
                  <th className="py-3 px-4 font-bold text-slate-500">Заголовок</th>
                  <th className="py-3 px-4 font-bold text-slate-500">Источник</th>
                  <th className="py-3 px-4 font-bold text-slate-500">Дата</th>
                  <th className="py-3 px-4 font-bold text-slate-500 text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="py-3 px-4 text-slate-500">#{item.id}</td>
                    <td className="py-3 px-4 font-medium text-navy max-w-md truncate">
                      <a href={item.link} target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors">
                        {item.title}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                        {item.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-sm">
                      {new Date(item.pubDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
