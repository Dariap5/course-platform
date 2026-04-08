"use client";

import { ExternalLink } from "lucide-react";

/** Kinescope: из страницы или embed-URL → https://kinescope.io/embed/{id} */
export function getKinescopeEmbedUrl(url: string): string | null {
  const t = url.trim();
  if (!/kinescope\.io/i.test(t)) return null;
  const embed = t.match(/kinescope\.io\/embed\/([^/?#]+)/i);
  if (embed) return `https://kinescope.io/embed/${embed[1]}`;
  const page = t.match(/kinescope\.io\/([^/?#]+)/i);
  if (page && page[1].toLowerCase() !== "embed") {
    return `https://kinescope.io/embed/${page[1]}`;
  }
  return null;
}

function getYoutubeId(url: string): string | null {
  const m =
    url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|v=)([\w-]{11})/) ??
    url.match(/^([\w-]{11})$/);
  return m?.[1] ?? null;
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m?.[1] ?? null;
}

export function LessonPlayer({
  videoUrl,
  title,
}: {
  videoUrl: string;
  title: string;
}) {
  const trimmed = videoUrl.trim();

  if (!trimmed) {
    return (
      <div
        className="flex aspect-video w-full items-center justify-center rounded-[var(--r-xl)] gradient-border bg-[hsl(var(--bg-secondary))] px-6 text-center text-sm text-[hsl(var(--fg-muted))] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      >
        Видео скоро появится здесь. Добавь ссылку в{" "}
        <code className="mx-1 rounded bg-[hsl(var(--bg-tertiary))] px-1">
          lessons-data.ts
        </code>
      </div>
    );
  }

  const kine = getKinescopeEmbedUrl(trimmed);
  if (kine) {
    return (
      <div
        className="w-full overflow-hidden rounded-2xl bg-black"
        style={{
          aspectRatio: "16 / 9",
          boxShadow:
            "0 0 0 1.5px #3B3BF5, 0 8px 32px rgba(59,59,245,0.15)",
        }}
      >
        <iframe
          title={title}
          src={kine}
          width="100%"
          height="100%"
          className="block h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  const yt = getYoutubeId(trimmed);
  if (yt) {
    return (
      <div
        className="aspect-video w-full overflow-hidden rounded-[var(--r-xl)] gradient-border shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      >
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${yt}`}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const vm = getVimeoId(trimmed);
  if (vm) {
    return (
      <div
        className="aspect-video w-full overflow-hidden rounded-[var(--r-xl)] gradient-border shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      >
        <iframe
          title={title}
          src={`https://player.vimeo.com/video/${vm}`}
          className="h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="aspect-video w-full overflow-hidden rounded-[var(--r-xl)] gradient-border shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <video
        controls
        className="h-full w-full object-cover"
        src={trimmed}
        title={title}
      />
    </div>
  );
}

export function NotionButton({
  url,
  label,
}: {
  url: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.open(url, "_blank")}
      className="inline-flex items-center gap-2 rounded-[var(--r-md)] px-4 py-2.5 text-sm font-medium text-[hsl(var(--accent-text))] gradient-border transition-opacity hover:opacity-80"
    >
      <ExternalLink className="h-4 w-4" />
      {label}
    </button>
  );
}
