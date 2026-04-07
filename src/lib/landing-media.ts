/** Статика лендинга в /public/landing */

/**
 * Увеличивайте значение после замены файлов в `public/landing` с тем же именем —
 * иначе Next/Image и браузер могут долго отдавать старую картинку из кэша.
 */
export const LANDING_HERO_MEDIA_REV = "3";

export const LANDING_LOGO = "/landing/logo-community.png";

export const LANDING_HERO_PHOTOS = [
  `/landing/photo-dasha-1.png?v=${LANDING_HERO_MEDIA_REV}`,
  `/landing/photo-dasha-2.png?v=${LANDING_HERO_MEDIA_REV}`,
  `/landing/photo-dasha-3.png?v=${LANDING_HERO_MEDIA_REV}`,
] as const;

/** 2-й скрин — кружок «личный созвон с Дашей» */
export const LANDING_CALL_PHOTO = "/landing/photo-dasha-1.png";

export const LANDING_NOTION_PREVIEW = "/landing/notion-screenshot.png";
export const LANDING_PLANNER_PREVIEW = "/landing/planner-screenshot.png";

export const LANDING_VIDEO_PREVIEWS = [
  "/landing/video-lesson-1.png",
  "/landing/video-lesson-2.png",
  "/landing/video-lesson-3.png",
  "/landing/video-lesson-4.png",
] as const;
