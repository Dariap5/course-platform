"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { UserRow } from "@/lib/supabase/types";

export function useSession() {
  const [user, setUser] = useState<UserRow | null>(null);
  const [loading, setLoading] = useState(true);

  const applyProfile = useCallback((profile: UserRow | null) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("course_paid");
      } catch {
        /* noop */
      }
    }
    setUser(profile);
  }, []);

  const loadProfile = useCallback(
    async (userId: string) => {
      const { data: row } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (row) {
        applyProfile(row);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        applyProfile(null);
        return;
      }

      const res = await fetch("/api/auth/ensure-profile", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) {
        applyProfile(null);
        return;
      }

      const { data: again } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      applyProfile(again ?? null);
    },
    [applyProfile],
  );

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("[useSession] init error:", e);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
        return;
      }

      if (session?.user) {
        try {
          await loadProfile(session.user.id);
        } catch (e) {
          console.error("[useSession] profile fetch error:", e);
        } finally {
          if (mounted) setLoading(false);
        }
      } else {
        setUser(null);
        if (mounted) setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  const refreshProfile = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) await loadProfile(session.user.id);
  }, [loadProfile]);

  return { user, loading, signOut, refreshProfile };
}
