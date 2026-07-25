export interface ClassificationResult {
  category: string | null;
  matchedKeywords: string[];
}

interface CategoryDef {
  name: string;
  keywords: string[];
}

const CATEGORIES: CategoryDef[] = [
  {
    name: 'Язык вражды',
    keywords: [
      'мигрант', 'мигранты', 'нацмен', 'понаехал', 'понаехали',
      'все они одинаковые', 'грязные', 'убирайтесь', 'чужие',
      'нелюди', 'недочеловек', 'неполноценн', 'дискримин',
      'расист', 'ксенофоб', 'гомофоб', 'этнич', 'нация',
      'вон из страны', 'понаприехали',
    ],
  },
  {
    name: 'Дезинформация',
    keywords: [
      'фейк', 'фейковая новость', 'ложная информация', 'дезинформ',
      'выдумка', 'заговор', 'скрывают правду', 'настоящая новость',
      'это скрывают', 'вброс', 'манипуляция', 'фотожаба', 'дипфейк',
      'сфабриковано', 'обман сми', 'бот-аккаунт', 'накрутка',
    ],
  },
  {
    name: 'Цифровое мошенничество',
    keywords: [
      'выиграли приз', 'вы выиграли', 'перейдите по ссылке',
      'подтвердите карту', 'банковская карта', 'код из смс',
      'взломан аккаунт', 'заблокирован счёт', 'заблокирован счет',
      'служба безопасности банка', 'вакансия удалённо', 'вакансия удаленно',
      'заработок без вложений', 'верните долг', 'судебное разбирательство',
      'фишинг', 'скам', 'пароль', 'cvv', 'реквизиты карты',
      'переведите деньги', 'быстрый заработок',
    ],
  },
];

export function classifyText(text: string): ClassificationResult {
  const normalized = text.toLowerCase();
  let best: { category: string; matches: string[] } | null = null;

  for (const category of CATEGORIES) {
    const matches = category.keywords.filter((kw) => normalized.includes(kw));
    if (matches.length > 0 && (!best || matches.length > best.matches.length)) {
      best = { category: category.name, matches };
    }
  }

  return best
    ? { category: best.category, matchedKeywords: best.matches }
    : { category: null, matchedKeywords: [] };
}
