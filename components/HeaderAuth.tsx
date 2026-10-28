"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import AuthModal from "./AuthModal";

export default function HeaderAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    import("@/lib/supabase").then(({ supabase }) => {
      if (!supabase) return;
      supabase.auth.getUser().then(({ data }) => setUser(data.user));
      const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null);
      });
      return () => listener.subscription.unsubscribe();
    });
  }, []);

  async function handleLogout() {
    const { supabase } = await import("@/lib/supabase");
    if (supabase) await supabase.auth.signOut();
    window.location.reload();
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-navy-600 hidden md:inline truncate max-w-[140px]">
          {user.email}
        </span>
        <button onClick={handleLogout}
          className="text-[13px] font-semibold text-ink border border-line-strong px-3.5 py-2 rounded-xl hover:border-ink transition-colors"
          >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className="hidden md:inline-flex items-center text-[14px] font-semibold text-white bg-navy-900 hover:bg-navy-800 px-5 h-10 rounded-xl transition-colors">
        로그인
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
