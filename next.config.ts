import type { NextConfig } from "next";
import path from "path";
import { LANDING_HERO_MEDIA_REV } from "./src/lib/landing-media";

const heroImgSearch = `?v=${LANDING_HERO_MEDIA_REV}`;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    /** В dev быстрее подхватываются новые файлы в /public с тем же именем */
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 60,
    /**
     * Без явного списка Next подставляет только `{ pathname: "**", search: "" }`,
     * и любой `?v=` на локальном src ломает next/image.
     * Ревизия синхронизирована с `LANDING_HERO_MEDIA_REV` в `landing-media.ts`.
     */
    localPatterns: [
      { pathname: "**", search: "" },
      {
        pathname: "/landing/photo-dasha-1.png",
        search: heroImgSearch,
      },
      {
        pathname: "/landing/photo-dasha-2.png",
        search: heroImgSearch,
      },
      {
        pathname: "/landing/photo-dasha-3.png",
        search: heroImgSearch,
      },
    ],
  },
};

export default nextConfig;
