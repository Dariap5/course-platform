"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "из хаоса",
  "из ступора",
  "из рутины",
  "к себе",
  "к ясности",
  "к действию",
];

type Mode = "typing" | "pause" | "deleting";

export function TypewriterWord() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [mode, setMode] = useState<Mode>("typing");

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let t: ReturnType<typeof setTimeout>;

    if (mode === "typing") {
      if (displayed === current) {
        t = setTimeout(() => setMode("pause"), 400);
      } else {
        t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 90);
      }
    } else if (mode === "pause") {
      t = setTimeout(() => setMode("deleting"), 1400);
    } else {
      if (displayed === "") {
        queueMicrotask(() => {
          setPhraseIndex((i) => (i + 1) % PHRASES.length);
          setMode("typing");
        });
      } else {
        t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, 60);
      }
    }

    return () => clearTimeout(t);
  }, [displayed, mode, phraseIndex]);

  return (
    <span className="landing-gradient-text" style={{ whiteSpace: "nowrap" }}>
      {displayed}
      <span className="typewriter-cursor" aria-hidden />
    </span>
  );
}
