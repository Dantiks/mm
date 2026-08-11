import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import axiosApi from '../axiosApi';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';
import { selectUser } from '../features/users/usersSlice';
import { canEditSiteContent } from '../utils/roles';

type PendingMap = Record<string, string>;
type PendingByLang = Record<Language, PendingMap>;

export type EditorToast = { kind: 'success' | 'error' | 'info'; text: string } | null;

interface EditorModeContextValue {
  isEditorMode: boolean;
  toggleEditorMode: () => void;
  setEditorMode: (val: boolean) => void;
  /** Правки текущего языка. */
  pendingChanges: PendingMap;
  /** Правки по всем языкам — нужно панели, чтобы показать общий счётчик. */
  pendingByLanguage: PendingByLang;
  /** bothLanguages — для значений без перевода (пути к картинкам). */
  registerChange: (key: string, newValue: string, opts?: { bothLanguages?: boolean }) => void;
  revertChange: (key: string, opts?: { bothLanguages?: boolean }) => void;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  totalPendingCount: number;
  toast: EditorToast;
  clearToast: () => void;
  canEdit: boolean;
  /** Скрыт ли объект (мягкое удаление). */
  isHidden: (key: string) => boolean;
  /** Скрыть или вернуть объект. */
  setHidden: (key: string, hidden: boolean) => void;
  /** Все скрытые объекты — сохранённые и ещё не сохранённые. */
  hiddenKeys: string[];
}

const EditorModeContext = createContext<EditorModeContextValue | undefined>(undefined);

const emptyPending = (): PendingByLang => ({ ru: {}, ky: {} });

/**
 * Удаление — мягкое: объект помечается флагом в той же таблице текстов, под
 * ключом с этим префиксом. Так удаление проходит через общий буфер правок,
 * сохраняется той же кнопкой и так же откатывается, а сам объект остаётся
 * в базе и его можно вернуть.
 */
const HIDDEN_PREFIX = 'hidden.';

export const EditorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);
  const [pendingByLanguage, setPendingByLanguage] = useState<PendingByLang>(emptyPending);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<EditorToast>(null);
  const { language, refreshSiteTexts, siteTexts } = useLanguage();

  // Право на редактирование берём из состояния приложения, а не из localStorage:
  // флаг в localStorage правится через devtools. Это всё равно только UI —
  // настоящая проверка на сервере (AdminGuard).
  const user = useSelector(selectUser);
  const canEdit = canEditSiteContent(user?.role);

  const pendingChanges = pendingByLanguage[language] ?? {};
  const totalPendingCount =
    Object.keys(pendingByLanguage.ru).length + Object.keys(pendingByLanguage.ky).length;
  const hasUnsavedChanges = totalPendingCount > 0;

  const clearToast = useCallback(() => setToast(null), []);

  const isHidden = useCallback(
    (key: string) => {
      const flagKey = HIDDEN_PREFIX + key;
      // Несохранённое состояние важнее сохранённого: иначе объект, только что
      // удалённый или возвращённый, до сохранения выглядел бы по-старому.
      const pending = pendingByLanguage.ru[flagKey] ?? pendingByLanguage.ky[flagKey];
      if (pending !== undefined) return pending === '1';
      return siteTexts[flagKey]?.ru === '1';
    },
    [pendingByLanguage, siteTexts],
  );

  const setHidden = useCallback((key: string, hidden: boolean) => {
    const flagKey = HIDDEN_PREFIX + key;
    const value = hidden ? '1' : '0';
    setPendingByLanguage((prev) => ({
      ru: { ...prev.ru, [flagKey]: value },
      ky: { ...prev.ky, [flagKey]: value },
    }));
  }, []);

  const hiddenKeys = useMemo(() => {
    const result = new Set<string>();
    for (const [k, v] of Object.entries(siteTexts)) {
      if (k.startsWith(HIDDEN_PREFIX) && v.ru === '1') {
        result.add(k.slice(HIDDEN_PREFIX.length));
      }
    }
    for (const [k, v] of Object.entries(pendingByLanguage.ru)) {
      if (!k.startsWith(HIDDEN_PREFIX)) continue;
      const bare = k.slice(HIDDEN_PREFIX.length);
      if (v === '1') result.add(bare);
      else result.delete(bare);
    }
    return Array.from(result).sort();
  }, [siteTexts, pendingByLanguage]);

  // Переход из админки по ссылке «Редактировать сайт визуально» (?edit=1).
  // Права всё равно проверяются: без роли параметр ничего не даёт.
  useEffect(() => {
    if (!canEdit) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') !== '1') return;

    setIsEditorMode(true);
    params.delete('edit');
    const query = params.toString();
    window.history.replaceState(
      {},
      '',
      window.location.pathname + (query ? `?${query}` : ''),
    );
  }, [canEdit]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Правки живут только в памяти — уход со страницы их потеряет.
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);

  const registerChange = useCallback(
    (key: string, newValue: string, opts?: { bothLanguages?: boolean }) => {
      // Ключ правки привязан к языку: иначе правка на русском уедет
      // в кыргызскую колонку при переключении языка перед сохранением.
      setPendingByLanguage((prev) =>
        opts?.bothLanguages
          ? {
              ru: { ...prev.ru, [key]: newValue },
              ky: { ...prev.ky, [key]: newValue },
            }
          : { ...prev, [language]: { ...prev[language], [key]: newValue } },
      );
    },
    [language],
  );

  const revertChange = useCallback(
    (key: string, opts?: { bothLanguages?: boolean }) => {
      setPendingByLanguage((prev) => {
        if (opts?.bothLanguages) {
          if (prev.ru[key] === undefined && prev.ky[key] === undefined) return prev;
          const ru = { ...prev.ru };
          const ky = { ...prev.ky };
          delete ru[key];
          delete ky[key];
          return { ru, ky };
        }
        // Откат правки одного языка не должен стирать правку другого.
        if (prev[language][key] === undefined) return prev;
        const next = { ...prev[language] };
        delete next[key];
        return { ...prev, [language]: next };
      });
    },
    [language],
  );

  const discardChanges = useCallback(() => {
    setPendingByLanguage(emptyPending());
  }, []);

  const saveChanges = useCallback(async () => {
    if (!hasUnsavedChanges || isSaving) return;

    setIsSaving(true);
    try {
      const currentRes = await axiosApi.get('/site-texts');
      const currentData: Record<string, { ru?: string; ky?: string }> = currentRes.data || {};

      const touchedKeys = Array.from(
        new Set([
          ...Object.keys(pendingByLanguage.ru),
          ...Object.keys(pendingByLanguage.ky),
        ]),
      );

      const itemsToUpdate = touchedKeys.map((key) => {
        const existing = currentData[key] || {};
        const ru = pendingByLanguage.ru[key] ?? existing.ru ?? '';
        const ky = pendingByLanguage.ky[key] ?? existing.ky ?? '';
        return {
          key,
          // Если одного из языков нет в базе, дублируем второй, но не молча:
          // на это указывает предупреждение ниже.
          valueRu: ru || ky,
          valueKy: ky || ru,
        };
      });

      const missingTranslation = itemsToUpdate.filter(
        (i) => !(pendingByLanguage.ru[i.key] && pendingByLanguage.ky[i.key]),
      ).length;

      await axiosApi.put('/site-texts', { items: itemsToUpdate });
      await refreshSiteTexts();
      setPendingByLanguage(emptyPending());

      setToast({
        kind: 'success',
        text:
          missingTranslation > 0
            ? `Сохранено: ${itemsToUpdate.length}. Из них ${missingTranslation} правились только на одном языке — проверьте второй.`
            : `Сохранено изменений: ${itemsToUpdate.length}`,
      });
    } catch (err: any) {
      const status = err?.response?.status;
      const text =
        status === 401
          ? 'Сессия истекла — войдите заново.'
          : status === 403
            ? 'Недостаточно прав: изменять тексты может только администратор.'
            : err?.response?.data?.message
              ? `Ошибка сохранения: ${err.response.data.message}`
              : 'Не удалось сохранить изменения. Правки остались в буфере.';
      setToast({ kind: 'error', text });
      // Буфер намеренно не чистим — иначе правки пропадут вместе с ошибкой.
    } finally {
      setIsSaving(false);
    }
  }, [hasUnsavedChanges, isSaving, pendingByLanguage, refreshSiteTexts]);

  // Ctrl+S сохраняет, Ctrl+E включает и выключает режим.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === 's' && isEditorMode) {
        e.preventDefault();
        void saveChanges();
      }
      if (e.key === 'e' && canEdit) {
        e.preventDefault();
        setIsEditorMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isEditorMode, saveChanges, canEdit]);

  const toggleEditorMode = useCallback(() => {
    setIsEditorMode((prev) => {
      if (prev && hasUnsavedChanges) {
        const ok = window.confirm(
          'Есть несохранённые правки. Выйти из режима редактирования и потерять их?',
        );
        if (!ok) return prev;
        setPendingByLanguage(emptyPending());
      }
      return !prev;
    });
  }, [hasUnsavedChanges]);

  const value = useMemo(
    () => ({
      isEditorMode,
      toggleEditorMode,
      setEditorMode: setIsEditorMode,
      pendingChanges,
      pendingByLanguage,
      registerChange,
      revertChange,
      saveChanges,
      discardChanges,
      isSaving,
      hasUnsavedChanges,
      totalPendingCount,
      toast,
      clearToast,
      canEdit,
      isHidden,
      setHidden,
      hiddenKeys,
    }),
    [
      isEditorMode,
      toggleEditorMode,
      pendingChanges,
      pendingByLanguage,
      registerChange,
      revertChange,
      saveChanges,
      discardChanges,
      isSaving,
      hasUnsavedChanges,
      totalPendingCount,
      toast,
      clearToast,
      canEdit,
      isHidden,
      setHidden,
      hiddenKeys,
    ],
  );

  return <EditorModeContext.Provider value={value}>{children}</EditorModeContext.Provider>;
};

/**
 * Вне провайдера редактор просто выключен.
 *
 * CMS-компоненты стоят и на страницах админки, а она живёт в своём layout
 * без EditorModeProvider. Раньше хук в этом случае бросал исключение и ронял
 * всю панель — падение вместо «редактирование недоступно».
 */
const DISABLED: EditorModeContextValue = {
  isEditorMode: false,
  toggleEditorMode: () => {},
  setEditorMode: () => {},
  pendingChanges: {},
  pendingByLanguage: { ru: {}, ky: {} },
  registerChange: () => {},
  revertChange: () => {},
  saveChanges: async () => {},
  discardChanges: () => {},
  isSaving: false,
  hasUnsavedChanges: false,
  totalPendingCount: 0,
  toast: null,
  clearToast: () => {},
  canEdit: false,
  isHidden: () => false,
  setHidden: () => {},
  hiddenKeys: [],
};

export const useEditorMode = () => useContext(EditorModeContext) ?? DISABLED;
