import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, RefreshCw, Plus, FileText, CheckCircle2, Globe, Search, Sparkles } from 'lucide-react';
import axiosApi from '../../axiosApi';
import EditableAuto from '../../components/CMS/EditableAuto';
import EditableText from '../../components/CMS/EditableText';

interface TextItem {
  key: string;
  valueRu: string;
  valueKy: string;
  category: string;
}

const CATEGORIES = [
  { id: 'all', label: 'Все тексты' },
  { id: 'home', label: '🏠 Главная страница' },
  { id: 'about', label: 'ℹ️ О нас' },
  { id: 'categories', label: '📁 Категории' },
  { id: 'resources', label: '📚 Полезное' },
  { id: 'contacts', label: '📞 Контакты' },
  { id: 'nav', label: '🧭 Навигация и Футер' },
];

const SiteTextsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form for adding new key
  const [newKey, setNewKey] = useState('');
  const [newValRu, setNewValRu] = useState('');
  const [newValKy, setNewValKy] = useState('');
  const [newCategory, setNewCategory] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleStartLiveEdit = () => {
    navigate('/?edit=1');
  };

  const fetchTexts = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get('/site-texts');
      const data = response.data; // object { [key]: { ru, ky, category } }
      const itemsList: TextItem[] = [];

      for (const [k, v] of Object.entries(data as Record<string, { ru: string; ky: string; category?: string }>)) {
        itemsList.push({
          key: k,
          valueRu: v.ru || '',
          valueKy: v.ky || '',
          category: v.category || (k.split('.')[0] || 'general'),
        });
      }

      setTexts(itemsList);
    } catch (err) {
      console.error('Failed to fetch site texts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const handleChange = (key: string, lang: 'ru' | 'ky', val: string) => {
    setTexts((prev) =>
      prev.map((t) => (t.key === key ? { ...t, [lang === 'ru' ? 'valueRu' : 'valueKy']: val } : t))
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      await axiosApi.put('/site-texts', {
        items: texts.map((t) => ({
          key: t.key,
          valueRu: t.valueRu,
          valueKy: t.valueKy,
          category: t.category,
        })),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error('Error saving site texts:', err);
      alert('Ошибка при сохранении текстов');
    } finally {
      setSaving(false);
    }
  };

  const handleAddNewKey = () => {
    if (!newKey.trim()) {
      alert('Укажите ключ текста (например, home.customTitle)');
      return;
    }
    if (texts.some((t) => t.key === newKey.trim())) {
      alert('Такой ключ уже существует!');
      return;
    }

    setTexts((prev) => [
      ...prev,
      {
        key: newKey.trim(),
        valueRu: newValRu,
        valueKy: newValKy,
        category: newCategory,
      },
    ]);

    setNewKey('');
    setNewValRu('');
    setNewValKy('');
    setShowAddModal(false);
  };

  const filteredTexts = texts.filter((t) => {
    const matchesCat = activeCategory === 'all' || t.category === activeCategory || t.key.startsWith(activeCategory);
    const matchesSearch =
      searchQuery === '' ||
      t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.valueRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.valueKy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <FileText className="w-7 h-7 text-red-600" />
            <EditableText textKey="siteTextsManagement.raw1" value="Редактирование текстов сайта (CMS)" />
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            <EditableText textKey="siteTextsManagement.raw2" value="Вы можете изменить абсолютно любой текст на сайте на двух языках (Русский и Кыргызча)." />
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all"
          >
            <Plus className="w-4 h-4" />
            <EditableText textKey="siteTextsManagement.raw3" value="Добавить ключ" />
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md shadow-red-500/20 transition-all disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveSuccess ? 'Сохранено!' : 'Сохранить все'}
          </button>
        </div>
      </div>

      {/* Live Visual Editor Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-navy via-slate-900 to-navy text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-600/30 text-amber-300 border border-red-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-base"><EditableText textKey="siteTextsManagement.raw4" value="Интерактивный живой редактор (In-Context CMS)" /></h3>
            <p className="text-xs text-slate-300">
              <EditableText textKey="siteTextsManagement.raw5" value="Вы можете перейти на страницы сайта и кликать по текстам для их визуального редактирования в реальном времени." />
            </p>
          </div>
        </div>
        <button
          onClick={handleStartLiveEdit}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md shadow-red-500/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span><EditableText textKey="siteTextsManagement.raw6" value="Перейти к визуальному редактированию" /></span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <EditableAuto ns="siteTextsManagement.cat.label" value={cat.label} />
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Поиск по ключу или тексту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Texts List */}
      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl shadow-sm">
          <RefreshCw className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : filteredTexts.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 text-slate-400 text-sm">
          <EditableText textKey="siteTextsManagement.raw7" value="Тексты не найдены. Попробуйте изменить фильтр или поисковый запрос." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTexts.map((item) => (
            <div
              key={item.key}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-200 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                  {item.key}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Категория: {item.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* RU */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-600 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <EditableText textKey="siteTextsManagement.raw8" value="Русский язык (RU)" />
                  </label>
                  {item.valueRu.length > 80 ? (
                    <textarea
                      rows={3}
                      value={item.valueRu}
                      onChange={(e) => handleChange(item.key, 'ru', e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item.valueRu}
                      onChange={(e) => handleChange(item.key, 'ru', e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                    />
                  )}
                </div>

                {/* KY */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-600 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <EditableText textKey="siteTextsManagement.raw9" value="Кыргызча (KY)" />
                  </label>
                  {item.valueKy.length > 80 ? (
                    <textarea
                      rows={3}
                      value={item.valueKy}
                      onChange={(e) => handleChange(item.key, 'ky', e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item.valueKy}
                      onChange={(e) => handleChange(item.key, 'ky', e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal to Add New Custom Key */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-800"><EditableText textKey="siteTextsManagement.raw10" value="Добавить новый ключ текста" /></h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600"><EditableText textKey="siteTextsManagement.raw11" value="Ключ (например, home.customBanner)" /></label>
                <input
                  type="text"
                  placeholder="home.myTitle"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600"><EditableText textKey="siteTextsManagement.raw12" value="Категория" /></label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-red-500"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600"><EditableText textKey="siteTextsManagement.raw13" value="Текст на русском (RU)" /></label>
                <input
                  type="text"
                  placeholder="Введите текст..."
                  value={newValRu}
                  onChange={(e) => setNewValRu(e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600"><EditableText textKey="siteTextsManagement.raw14" value="Текст на кыргызском (KY)" /></label>
                <input
                  type="text"
                  placeholder="Текстти киргизиңиз..."
                  value={newValKy}
                  onChange={(e) => setNewValKy(e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800"
              >
                <EditableText textKey="siteTextsManagement.raw15" value="Отмена" />
              </button>
              <button
                onClick={handleAddNewKey}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md shadow-red-500/20"
              >
                <EditableText textKey="siteTextsManagement.raw16" value="Добавить" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteTextsManagement;
