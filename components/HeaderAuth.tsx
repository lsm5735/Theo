"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import AuthModal from "./AuthModal";

export default function HeaderAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    window.location.reload();
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 relative">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 text-[13px] font-black text-navy-700 border-2 border-navy-800 px-3.5 py-2 rounded-lg hover:bg-navy-800 hover:text-chiffon transition-all"
          style={{ boxShadow: "2px 2px 0 var(--brutal)" }}
        >
          <span className="w-6 h-6 rounded-full bg-sv flex items-center justify-center text-[11px] font-black"
            style={{ color: "var(--brutal)", border: "1.5px solid var(--brutal)" }}>
            {user.email?.[0].toUpperCase()}
          </span>
          <span className="hidden md:inline max-w-[120px] truncate">{user.email}</span>
        </button>

        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 nb-card p-2 z-[100]">
            <p className="text-[11px] text-muted px-3 py-2 truncate border-b border-line mb-1">{user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full text-left text-[13px] font-bold text-navy-700 px-3 py-2.5 rounded-lg hover:bg-navy-100 transition-colors"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="hidden md:inline-flex items-center text-[13px] font-black text-navy-700 border-2 border-navy-800 px-4 py-2 rounded-lg hover:bg-navy-800 hover:text-chiffon transition-all"
        style={{ boxShadow: "2px 2px 0 var(--brutal)", padding: "9px 17px" }}
      >
        로그인
      </button>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
