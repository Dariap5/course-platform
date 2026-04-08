"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/useSession";
import { SUPPORT_URL } from "@/lib/lessons-data";
import { isPaidPlan } from "@/lib/plan-access";

export default function ActivatePage() {
  const { user, loading: sessionLoading, refreshProfile } = useSession();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionLoading || !user) return;
    if (!user.name?.trim()) {
      router.replace("/onboarding");
      return;
    }
    if (isPaidPlan(user.plan)) router.replace("/dashboard");
  }, [sessionLoading, user, router]);

  useEffect(() => {
    if (sessionLoading || user) return;
    router.replace("/login");
  }, [sessionLoading, user, router]);

  async function handleActivate() {
    if (!user || !code.trim()) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/access/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim(), userId: user.id }),
    });
    const data = (await res.json()) as { error?: string };
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Ошибка");
      return;
    }
    await refreshProfile();
    router.replace("/dashboard");
  }

  if (sessionLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[hsl(var(--fg-muted))]">
        Загрузка…
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (isPaidPlan(user.plan)) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAFAFA",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          borderRadius: "20px",
          padding: "40px 32px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
        }}
      >
        <h1
          style={{ fontWeight: 800, fontSize: "22px", marginBottom: "8px" }}
        >
          Введи код доступа
        </h1>
        <p
          style={{
            color: "#737373",
            fontSize: "14px",
            marginBottom: "28px",
            lineHeight: 1.6,
          }}
        >
          После оплаты ты получила код в Telegram от Даши. Введи его здесь — и
          уроки откроются сразу.
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="ТСБК-XXXXXX"
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textAlign: "center",
            border: "1.5px solid #e5e5e5",
            borderRadius: "12px",
            outline: "none",
            marginBottom: "12px",
            fontFamily: "monospace",
          }}
          onKeyDown={(e) => e.key === "Enter" && void handleActivate()}
        />

        {error ? (
          <p
            style={{
              color: "#EF4444",
              fontSize: "13px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => void handleActivate()}
          disabled={loading || code.length < 4}
          style={{
            width: "100%",
            padding: "15px",
            background: loading ? "#a5b4fc" : "#3B3BF5",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Проверяю..." : "Активировать доступ"}
        </button>

        <p
          style={{
            color: "#a3a3a3",
            fontSize: "12px",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Нет кода?{" "}
          <a href={SUPPORT_URL} style={{ color: "#3B3BF5" }}>
            Напиши Даше в Telegram
          </a>
        </p>
      </div>
    </div>
  );
}
