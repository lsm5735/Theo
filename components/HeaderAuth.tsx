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
          className="text-[13px] font-black text-navy-700 border-2 border-navy-800 px-3.5 py-2 rounded-lg hover:bg-navy-800 hover:text-chiffon transition-all"
          style={{ boxShadow: "2px 2px 0 var(--brutal)" }}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className="hidden md:inline-flex items-center text-[13px] font-black text-navy-700 border-2 border-navy-800 px-4 py-2 rounded-lg hover:bg-navy-800 hover:text-chiffon transition-all"
        style={{ boxShadow: "2px 2px 0 var(--brutal)", padding: "9px 17px" }}>
        로그인
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
