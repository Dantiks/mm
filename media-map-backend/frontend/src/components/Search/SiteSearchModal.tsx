import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Newspaper, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import EditableText from '../../components/CMS/EditableText';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string | number;
  title: string;
  type: 'marker' | 'news' | 'category';
  description?: string;
  link: string;
  badge?: string;
}

const SiteSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Static searchable database items
  const staticItems: SearchResultItem[] = [
    {
      id: 'cat-1',
      title: 'Язык вражды и разжигание розни (Hate Speech)',
      type: 'category',
      description: 'Материалы, содержащие агрессию, дегуманизацию или призывы к вражде в Кыргызстане.',
      link: '/categories/hate-speech',
      badge: 'Категория',
    },
    {
      id: 'cat-2',
      title: 'Фейковые новости и дезинформация (Disinformation)',
      type: 'category',
      description: 'Недостоверные сведению в социальный сетях, ложная информация и манипуляции.',
      link: '/categories/disinformation',
      badge: 'Категория',
    },
    {
      id: 'cat-3',
      title: 'Цифровое мошенничество и фишинг',
      type: 'category',
      description: 'Опасные ссылки, кража аккаунтов, финансовые пирамиды в Telegram/WhatsApp.',
      link: '/categories/digital-fraud',
      badge: 'Категория',
    },
    {
      id: 'news-1',
      title: 'В Бишкеке стартовала кампания против языка вражды в соцсетях',
      type: 'news',
      description: 'Эксперты фактчекинга дали практические инструкции по выявлению фейков.',
      link: '/news',
      badge: 'Новость',
    },
    {
      id: 'news-2',
      title: 'Цифровая безопасность журналистов: новое руководство',
      type: 'news',
      description: 'Как защитить данные и противостоять взлому аккаунтов.',
      link: '/useful',
      badge: 'Ресурс',
    },
    {
      id: 'map-1',
      title: 'Карта медиа-нарушений в Кыргызстане',
      type: 'marker',
      description: 'Интерактивная карта зарегистрированных медиа-нарушений по регионам КР.',
      link: '/map',
      badge: 'Карта',
    },
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchTerm = query.toLowerCase();

    // Search local database
    const matchedStatic = staticItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        (item.description && item.description.toLowerCase().includes(searchTerm))
    );

    // Also fetch markers from backend
    axiosApi
      .get('/markers')
      .then(({ data }) => {
        if (Array.isArray(data)) {
          const matchedBackend = data
            .filter((m: any) => {
              const text = `${m.authorComment || ''} ${m.authorCity || ''} ${m.authorRegion || ''} ${m.mediaLink || ''}`.toLowerCase();
              return text.includes(searchTerm);
            })
            .map((m: any) => ({
              id: `marker-${m.id}`,
              title: m.authorComment ? `Заявка #${m.id}: "${m.authorComment.slice(0, 60)}..."` : `Нарушение в г. ${m.authorCity}`,
              type: 'marker' as const,
              description: `Регион: ${m.authorRegion}, г. ${m.authorCity}. Ссылка: ${m.mediaLink || 'Нет ссылки'}`,
              link: '/map',
              badge: 'Нарушение',
            }));
          setResults([...matchedStatic, ...matchedBackend]);
        } else {
          setResults(matchedStatic);
        }
      })
      .catch(() => setResults(matchedStatic))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center bg-slate-900/60 p-4 pt-16 sm:pt-24 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="relative flex items-center border-b border-slate-100 pb-4">
          <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по сайту (новости, нарушения, категории, регионы)..."
            className="w-full rounded-2xl bg-slate-50 py-3 pl-11 pr-10 text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-red-500/30 transition-all border border-slate-200"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-12 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-3 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-2">
          {loading ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400">
              <EditableText textKey="siteSearchModal.raw1" value="Поиск информации по сайту..." />
            </div>
          ) : query.trim() && results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-bold text-slate-700"><EditableText textKey="siteSearchModal.raw2" value="Ничего не найдено" /></p>
              <p className="text-xs mt-1"><EditableText textKey="siteSearchModal.raw3" value="Попробуйте изменить поисковый запрос (например: Бишкек, фейк, вражда)" /></p>
            </div>
          ) : (
            results.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                onClick={onClose}
                className="flex items-start gap-3 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
              >
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {item.type === 'category' && <ShieldAlert className="h-4 w-4" />}
                  {item.type === 'news' && <Newspaper className="h-4 w-4" />}
                  {item.type === 'marker' && <MapPin className="h-4 w-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:underline decoration-2 underline-offset-2 transition-colors truncate">
                      {item.title}
                    </h4>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">{item.description}</p>
                  )}
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-navy shrink-0 self-center" />
              </Link>
            ))
          )}

          {!query.trim() && (
            <div className="py-8 text-center text-xs text-slate-400 space-y-3">
              <p className="font-bold text-slate-600"><EditableText textKey="siteSearchModal.raw4" value="Быстрый поиск по направлениям:" /></p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Язык вражды', 'Дезинформация', 'Бишкек', 'Фактчекинг', 'Фейки'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-semibold transition-all border border-slate-200"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteSearchModal;
