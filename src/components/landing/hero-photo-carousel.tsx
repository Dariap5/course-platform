"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LANDING_HERO_PHOTOS } from "@/lib/landing-media";
import { AUTHOR_NAME } from "@/lib/lessons-data";

const INTERVAL_MS = 3500;

export function HeroPhotoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % LANDING_HERO_PHOTOS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full bg-[var(--lg-bg)]">
      {LANDING_HERO_PHOTOS.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 1 : 0,
            pointerEvents: i === index ? "auto" : "none",
          }}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt={`${AUTHOR_NAME} — фото ${i + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 320px"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
