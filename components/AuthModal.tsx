"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
}

type Mode = "login" | "signup" | "done";

export default function AuthModal({ onClose }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { supabase } = await import("@/lib/supabase");
    if (!supabase) {
      setError("현재 인증 서비스가 준비 중입니다.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw error;
        setMode("done");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
        window.location.reload();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "오류가 발생했습니다.";
      if (msg.includes("Invalid login credentials")) setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      else if (msg.includes("User already registered")) setError("이미 가입된 이메일입니다. 로그인해주세요.");
      else if (msg.includes("Password should be")) setError("비밀번호는 6자 이상이어야 합니다.");
      else setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-5"
      style={{ background: "rgba(7,34,60,.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="nb-card w-full max-w-[420px] p-8 bg-paper relative">
        <button onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-navy-100 transition-colors text-navy-400 hover:text-navy-800 font-black text-lg">
          ✕
        </button>

        <div className="flex items-center gap-2.5 mb-7">
          <img src="/logo-face.png" alt="THEO" className="w-8 h-8" />
          <b className="font-black tracking-[0.3em] text-base text-navy-900 uppercase">THEO</b>
        </div>

        {mode === "done" ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-5">✉️</div>
            <h2 className="font-black text-[20px] text-navy-900 mb-3">이메일을 확인해주세요</h2>
            <p className="text-[14px] text-muted leading-[1.85]" style={{ wordBreak: "keep-all" }}>
              <strong className="text-navy-800">{email}</strong>으로 인증 링크를 보냈습니다.<br />
              메일함을 확인하고 링크를 클릭해 가입을 완료해주세요.
            </p>
            <button onClick={onClose} className="nb-btn w-full py-3.5 rounded-xl font-black text-[15px] mt-6">확인</button>
          </div>
        ) : (
          <>
            <div className="flex gap-1 mb-7 bg-navy-100 rounded-xl p-1">
              {(["login", "signup"] as const).map((m) => (
                <button key={m} onClick={() => { setMode(m); setError(""); }}
                  className="flex-1 py-2.5 rounded-lg text-[13px] font-black transition-all"
                  style={mode === m
                    ? { background: "var(--navy-800)", color: "var(--chiffon)", boxShadow: "2px 2px 0 var(--brutal)" }
                    : { color: "var(--navy-500)" }}>
                  {m === "login" ? "로그인" : "회원가입"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-black text-navy-600 uppercase tracking-[0.1em] mb-1.5">이메일</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com" required
                  className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-[14px] text-navy-900 placeholder:text-navy-300 bg-white outline-none focus:border-navy-700 transition-colors" />
              </div>
              <div>
                <label className="block text-[12px] font-black text-navy-600 uppercase tracking-[0.1em] mb-1.5">
                  비밀번호 {mode === "signup" && <span className="font-normal normal-case text-navy-400">(6자 이상)</span>}
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required minLength={6}
                  className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-[14px] text-navy-900 placeholder:text-navy-300 bg-white outline-none focus:border-navy-700 transition-colors" />
              </div>
              {error && <p className="text-[13px] font-semibold text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{error}</p>}
              <button type="submit" disabled={loading}
                className="nb-btn w-full py-3.5 rounded-xl font-black text-[15px] disabled:opacity-60 mt-2">
                {loading ? "처리 중..." : mode === "login" ? "로그인" : "계정 만들기"}
              </button>
            </form>

            <p className="text-center text-[12px] text-navy-400 mt-5">
              {mode === "login" ? "아직 계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                className="font-black text-navy-700 hover:underline">
                {mode === "login" ? "회원가입" : "로그인"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
