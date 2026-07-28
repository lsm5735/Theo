"use client";

import { useState } from "react";
import Link from "next/link";

export interface SheetMaterial {
  id: string;
  name: string;
  price: number;
  usageNote: string;
  isFunded: boolean;
}

interface Props {
  materials: SheetMaterial[];
  artist: { id: string; name: string; slug: string };
  project: { id: string; title: string; sponsorCount: number };
}

type Step = 1 | 2 | 3 | 4;

function MaterialIcon({ note }: { note: string }) {
  if (note.includes("주조색")) {
    return (
      <svg className="w-4 h-4 text-sv shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }
  if (note.includes("바탕") || note.includes("종이")) {
    return (
      <svg className="w-4 h-4 text-navy-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-navy-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function SponsorFlowSheet({ materials, artist, project }: Props) {
  const [active, setActive] = useState<SheetMaterial | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const isOpen = active !== null;
  const fee = active ? Math.round(active.price * 0.03) : 0;
  const total = active ? active.price + fee : 0;
  const displayName = nickname.trim() || "테오님";

  const fundedCount = materials.filter((m) => m.isFunded).length;

  function openFlow(m: SheetMaterial) {
    setActive(m);
    setStep(1);
    setNickname("");
    setMessage("");
  }

  function closeFlow() {
    setActive(null);
  }

  return (
    <>
      {/* ─── Materials wishlist ─── */}
      <section>
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-lg font-black text-navy-800">재료 위시리스트</h2>
          {fundedCount > 0 && (
            <span className="text-xs text-navy-600 font-medium">
              {materials.length}개 중 {fundedCount}개 선물됨
            </span>
          )}
        </div>
        <p className="text-xs text-muted mb-4">재료를 클릭하면 후원 플로우가 시작됩니다</p>

        <div className="space-y-3">
          {materials.map((m) => (
            <button
              key={m.id}
              type="button"
              disabled={m.isFunded}
              onClick={() => !m.isFunded && openFlow(m)}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150 group ${
                m.isFunded
                  ? "bg-navy-100/40 border-navy-200 cursor-not-allowed opacity-70"
                  : "bg-card border-line hover:border-navy-500 hover:shadow-md cursor-pointer"
              }`}
              style={!m.isFunded ? { boxShadow: "0 8px 22px rgba(23,29,43,.06)" } : undefined}
            >
              <MaterialIcon note={m.usageNote} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-sm font-semibold leading-snug ${
                      m.isFunded ? "text-navy-500 line-through" : "text-navy-800"
                    }`}
                  >
                    {m.name}
                  </p>
                  {m.isFunded ? (
                    <span className="shrink-0 text-xs bg-navy-200 text-navy-600 px-2 py-0.5 rounded-full font-medium">
                      선물 완료 ✓
                    </span>
                  ) : (
                    <span className="shrink-0 text-xs bg-navy-800 text-sv px-2.5 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      선물하기
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mt-1 leading-relaxed font-medium ${
                    m.isFunded ? "text-navy-400" : "text-navy-600"
                  }`}
                >
                  {m.usageNote}
                </p>
                <p
                  className={`text-sm font-bold mt-1.5 ${
                    m.isFunded ? "text-navy-400" : "text-gold-text"
                  }`}
                >
                  {m.price.toLocaleString()}원
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Flow overlay ─── */}
      {isOpen && active && (
        <>
          <style>{`
            @keyframes sheet-up {
              from { transform: translateY(100%); opacity: 0.8; }
              to   { transform: translateY(0);    opacity: 1; }
            }
            @keyframes badge-pop {
              0%   { transform: scale(0) rotate(-18deg); opacity: 0; }
              60%  { transform: scale(1.28) rotate(4deg); opacity: 1; }
              100% { transform: scale(1) rotate(0deg);  opacity: 1; }
            }
            @keyframes ring-pulse {
              0%   { box-shadow: 0 0 0 0   rgba(244,211,94,.55); }
              70%  { box-shadow: 0 0 0 22px rgba(244,211,94,.0); }
              100% { box-shadow: 0 0 0 0   rgba(244,211,94,.0); }
            }
            @keyframes fade-up {
              from { opacity: 0; transform: translateY(14px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .sheet-enter { animation: sheet-up .36s cubic-bezier(.32,.72,0,1) both; }
            .badge-anim  {
              animation:
                badge-pop   .55s cubic-bezier(.175,.885,.32,1.275) both,
                ring-pulse  1.8s ease .55s infinite;
            }
            .fu1 { animation: fade-up .4s ease .65s both; }
            .fu2 { animation: fade-up .4s ease .85s both; }
            .fu3 { animation: fade-up .4s ease 1.05s both; }
            .fu4 { animation: fade-up .4s ease 1.25s both; }
          `}</style>

          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={step < 4 ? closeFlow : undefined}
          />

          {/* Sheet */}
          <div className="sheet-enter fixed bottom-0 left-0 right-0 z-50 bg-paper rounded-t-3xl max-h-[92vh] overflow-y-auto">
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur-sm">
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1.5 bg-navy-200 rounded-full" />
              </div>

              {/* Step row */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-navy-100">
                {/* Back */}
                <div className="w-16">
                  {step > 1 && step < 4 ? (
                    <button
                      onClick={() => setStep((s) => (s - 1) as Step)}
                      className="text-sm text-navy-600 hover:text-navy-800 font-medium"
                    >
                      ← 이전
                    </button>
                  ) : null}
                </div>

                {/* Step dots */}
                <div className="flex items-center gap-2">
                  {([1, 2, 3, 4] as Step[]).map((s) => (
                    <div
                      key={s}
                      className={`rounded-full transition-all duration-300 ${
                        s === step
                          ? "w-6 h-2 bg-navy-800"
                          : s < step
                          ? "w-2 h-2 bg-sv"
                          : "w-2 h-2 bg-navy-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Close */}
                <div className="w-16 flex justify-end">
                  {step < 4 ? (
                    <button
                      onClick={closeFlow}
                      className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center text-navy-500 hover:bg-navy-200 transition-colors"
                    >
                      <CloseIcon />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════
                  STEP 1 · 재료 확인
              ══════════════════════════════════════ */}
            {step === 1 && (
              <div className="px-5 pt-6 pb-10">
                <p className="text-[11px] font-bold tracking-[0.16em] text-navy-500 uppercase mb-1">
                  Step 1 · 재료 확인
                </p>
                <h3 className="text-xl font-black text-navy-800 mb-6">
                  이 재료를 선물할까요?
                </h3>

                {/* Selected material card */}
                <div
                  className="bg-card rounded-xl p-4 border border-navy-200 mb-5"
                  style={{ boxShadow: "0 4px 16px rgba(23,29,43,.08)" }}
                >
                  <div className="flex items-start gap-3">
                    <MaterialIcon note={active.usageNote} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-800 leading-snug">
                        {active.name}
                      </p>
                      <p className="text-xs text-navy-600 font-medium mt-1">
                        {active.usageNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="bg-navy-50 rounded-xl p-5 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted">재료값</span>
                      <span className="font-semibold text-navy-800">
                        {active.price.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted flex items-center gap-1.5">
                        결제·전달 수수료
                        <span className="text-[10px] bg-navy-200 text-navy-600 px-1.5 py-0.5 rounded font-bold">
                          3%
                        </span>
                      </span>
                      <span className="font-semibold text-navy-600">
                        +{fee.toLocaleString()}원
                      </span>
                    </div>
                    <div className="border-t border-navy-200 pt-3 flex justify-between items-baseline">
                      <span className="font-bold text-navy-800">총 결제 금액</span>
                      <span className="font-black text-navy-800 text-2xl">
                        {total.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted mt-3 leading-relaxed">
                    재료값 전액({active.price.toLocaleString()}원)이 작가에게 전달됩니다.
                    작가 수수료 0%.
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-navy-800 text-white font-bold py-4 rounded-xl hover:bg-navy-700 transition-colors"
                >
                  다음 — 메시지 작성
                </button>
              </div>
            )}

            {/* ══════════════════════════════════════
                  STEP 2 · Dear Gogh
              ══════════════════════════════════════ */}
            {step === 2 && (
              <div className="px-5 pt-6 pb-10">
                <p className="text-[11px] font-bold tracking-[0.16em] text-navy-500 uppercase mb-1">
                  Step 2 · 메시지
                </p>
                <h3 className="text-xl font-black text-navy-800 mb-1">
                  작가에게 한마디
                  <br />남겨볼까요?
                </h3>
                <p className="text-sm text-muted mb-6">두 항목 모두 선택 사항이에요.</p>

                {/* Nickname */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-navy-700 mb-1.5">
                    내 닉네임{" "}
                    <span className="font-normal text-muted">
                      (선택 · 완료 화면에 표시됩니다)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="테오님"
                    maxLength={12}
                    className="w-full bg-card border-2 border-navy-100 focus:border-navy-700 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-navy-700 mb-1.5">
                    Dear Gogh 메시지{" "}
                    <span className="font-normal text-muted">
                      (선택 · 편지와 함께 전달돼요)
                    </span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="응원의 말을 남겨보세요."
                    maxLength={300}
                    rows={4}
                    className="w-full bg-card border-2 border-navy-100 focus:border-navy-700 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted resize-none outline-none transition-colors leading-relaxed"
                  />
                  <p className="text-xs text-muted text-right mt-1">
                    {message.length} / 300
                  </p>
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-navy-800 text-white font-bold py-4 rounded-xl hover:bg-navy-700 transition-colors"
                >
                  다음 — 결제로 이동
                </button>
              </div>
            )}

            {/* ══════════════════════════════════════
                  STEP 3 · 모의 결제
              ══════════════════════════════════════ */}
            {step === 3 && (
              <div className="px-5 pt-6 pb-10">
                <p className="text-[11px] font-bold tracking-[0.16em] text-navy-500 uppercase mb-1">
                  Step 3 · 모의 결제
                </p>
                <h3 className="text-xl font-black text-navy-800 mb-6">
                  결제를 진행할게요
                </h3>

                {/* Order summary */}
                <div
                  className="bg-card rounded-xl border border-line p-5 mb-6"
                  style={{ boxShadow: "0 4px 16px rgba(23,29,43,.06)" }}
                >
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">작가</span>
                      <span className="font-semibold text-navy-800">{artist.name}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted shrink-0 mr-4">프로젝트</span>
                      <span className="font-semibold text-navy-800 text-right leading-snug">
                        {project.title}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted shrink-0 mr-4">재료</span>
                      <span className="font-semibold text-navy-800 text-right leading-snug">
                        {active.usageNote}
                      </span>
                    </div>
                    {nickname.trim() && (
                      <div className="flex justify-between">
                        <span className="text-muted">닉네임</span>
                        <span className="font-semibold text-navy-800">{nickname.trim()}</span>
                      </div>
                    )}
                    <div className="border-t border-navy-100 pt-3 flex justify-between items-baseline">
                      <span className="font-bold text-navy-800">총 결제 금액</span>
                      <span className="font-black text-navy-800 text-2xl">
                        {total.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pay button */}
                <button
                  onClick={() => setStep(4)}
                  className="w-full font-black py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2 mb-3"
                  style={{
                    background: "var(--sv)",
                    color: "var(--ink)",
                    boxShadow: "0 6px 24px rgba(244,211,94,.45)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                  {total.toLocaleString()}원 모의 결제하기
                </button>

                <p className="text-xs text-muted text-center leading-relaxed">
                  * 시연용 데모입니다. 실제 결제는 이루어지지 않습니다.
                </p>
              </div>
            )}

            {/* ══════════════════════════════════════
                  STEP 4 · 완료
              ══════════════════════════════════════ */}
            {step === 4 && (
              <div className="px-5 pt-8 pb-12 text-center">
                {/* 씨앗 배지 점등 */}
                <div className="mb-2">
                  <div className="badge-anim w-32 h-32 bg-navy-800 rounded-full flex flex-col items-center justify-center mx-auto">
                    <span className="text-4xl leading-none mb-1">⭐</span>
                    <span
                      className="text-xs font-black tracking-widest"
                      style={{ color: "var(--sv)" }}
                    >
                      씨앗
                    </span>
                  </div>
                </div>

                <p className="fu1 text-xs text-muted mb-6">씨앗 배지 획득</p>

                {/* Main message */}
                <div className="fu2 mb-6">
                  <p className="text-3xl font-black text-navy-800 leading-tight">
                    {displayName}은 이제
                  </p>
                  <p className="text-navy-500 text-sm mt-2 mb-0.5 font-medium">
                    {artist.name} 작가님
                  </p>
                  <p className="text-navy-700 font-bold text-base leading-snug mb-2">
                    "{project.title}"의
                  </p>
                  <p
                    className="text-3xl font-black"
                    style={{ color: "var(--sv)", textShadow: "0 2px 12px rgba(244,211,94,.4)" }}
                  >
                    테오입니다.
                  </p>
                </div>

                {/* Gifted material */}
                <div className="fu3 bg-chiffon border border-sv/25 rounded-xl p-4 text-left mb-3">
                  <p className="text-[11px] font-bold text-navy-600 mb-1.5 uppercase tracking-wide">
                    선물한 재료
                  </p>
                  <p className="text-sm font-semibold text-navy-800 leading-snug">
                    {active.name}
                  </p>
                  <p className="text-xs text-navy-600 mt-0.5">{active.usageNote}</p>
                  <p className="text-sm font-black mt-2" style={{ color: "var(--gold-text)" }}>
                    재료값 {active.price.toLocaleString()}원이 작가에게 전달됩니다.
                  </p>
                </div>

                {/* Message receipt */}
                {message.trim() && (
                  <div className="fu3 bg-chiffon border border-sv/25 rounded-xl p-4 text-left mb-3">
                    <p className="text-[11px] font-bold text-navy-600 mb-1.5 uppercase tracking-wide">
                      Dear Gogh 메시지
                    </p>
                    <p className="font-myeongjo text-sm text-ink leading-relaxed">
                      "{message.trim()}"
                    </p>
                  </div>
                )}

                <p className="fu3 text-xs text-muted mb-8 leading-relaxed">
                  재료가 준비되면 {artist.name} 작가에게 전달됩니다.
                  <br />
                  작가가 받으면 Dear Theo 편지가 도착할 거예요.
                </p>

                {/* CTAs */}
                <div className="fu4 flex flex-col gap-3">
                  <button
                    onClick={closeFlow}
                    className="w-full bg-navy-800 text-white font-bold py-3.5 rounded-xl hover:bg-navy-700 transition-colors text-sm"
                  >
                    프로젝트로 돌아가기
                  </button>
                  <Link
                    href="/"
                    onClick={closeFlow}
                    className="w-full bg-card border border-navy-200 text-navy-700 font-semibold py-3.5 rounded-xl hover:bg-navy-100 transition-colors text-sm text-center block"
                  >
                    다른 작가 보기
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
