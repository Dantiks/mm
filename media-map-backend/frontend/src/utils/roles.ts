/**
 * Роли в базе хранятся в верхнем регистре ('ADMIN', 'MODERATOR', 'SUPERADMIN'),
 * но в коде местами сравнивались с 'admin'. Сравнение вынесено сюда и
 * приведено к регистронезависимому, чтобы расхождение не повторялось.
 */
export const ROLE_SUPERADMIN = 'SUPERADMIN';
export const ROLE_ADMIN = 'ADMIN';
export const ROLE_MODERATOR = 'MODERATOR';

const normalize = (role?: string | null) => (role || '').trim().toUpperCase();

/** Полный доступ: правка текстов и изображений сайта. */
export const canEditSiteContent = (role?: string | null) =>
  [ROLE_ADMIN, ROLE_SUPERADMIN].includes(normalize(role));

/** Доступ в админ-панель (проверка заявок). */
export const canAccessAdminPanel = (role?: string | null) =>
  [ROLE_ADMIN, ROLE_SUPERADMIN, ROLE_MODERATOR].includes(normalize(role));
