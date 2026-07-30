"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import materials from "@/data/materials.json";

interface Props {
  artistId: string;
}

function IconCheck() {
  return (
    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" />
    </svg>
  );
}

// 씨앗 배지 획득 모먼트에 표시할 star 아이콘
function IconStar() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── 파티클 컨페티 (CSS 애니메이션, 라이브러리 없음) ───
const PARTICLE_DATA = [
  { left: 5,  top: -10, size: 9,  delay: 0.00, dur: 2.1, shape: 0, ci: 0 },
  { left: 11, top: -25, size: 7,  delay: 0.12, dur: 1.9, shape: 1, ci: 1 },
  { left: 20, top: -8,  size: 11, delay: 0.05, dur: 2.3, shape: 2, ci: 2 },
  { left: 28, top: -18, size: 6,  delay: 0.22, dur: 2.0, shape: 0, ci: 3 },
  { left: 35, top: -5,  size: 8,  delay: 0.08, dur: 1.8, shape: 1, ci: 4 },
  { left: 43, top: -22, size: 10, delay: 0.18, dur: 2.2, shape: 2, ci: 0 },
  { left: 50, top: -12, size: 7,  delay: 0.30, dur: 2.0, shape: 0, ci: 1 },
  { left: 57, top: -6,  size: 9,  delay: 0.10, dur: 1.7, shape: 1, ci: 2 },
  { left: 65, top: -20, size: 6,  delay: 0.25, dur: 2.4, shape: 2, ci: 3 },
  { left: 72, top: -9,  size: 11, delay: 0.04, dur: 1.9, shape: 0, ci: 4 },
  { left: 80, top: -16, size: 8,  delay: 0.20, dur: 2.1, shape: 1, ci: 0 },
  { left: 88, top: -3,  size: 7,  delay: 0.15, dur: 2.3, shape: 2, ci: 1 },
  { left: 93, top: -28, size: 9,  delay: 0.35, dur: 1.8, shape: 0, ci: 2 },
  { left: 16, top: -30, size: 6,  delay: 0.40, dur: 2.0, shape: 1, ci: 3 },
  { left: 38, top: -35, size: 10, delay: 0.28, dur: 2.2, shape: 2, ci: 4 },
  { left: 60, top: -28, size: 7,  delay: 0.45, dur: 1.9, shape: 0, ci: 0 },
  { left: 74, top: -32, size: 8,  delay: 0.33, dur: 2.3, shape: 1, ci: 1 },
  { left: 85, top: -14, size: 6,  delay: 0.50, dur: 2.1, shape: 2, ci: 2 },
  { left: 48, top: -40, size: 9,  delay: 0.55, dur: 1.7, shape: 0, ci: 3 },
  { left: 24, top: -42, size: 7,  delay: 0.60, dur: 2.0, shape: 1, ci: 4 },
];
const PARTICLE_COLORS = ["#F4D35E", "#0D3B66", "#F8D07A", "#A6B8C9", "#FAF0CA"];

function Confetti() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {PARTICLE_DATA.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: p.top,
            width: p.size,
            height: p.size,
            background: PARTICLE_COLORS[p.ci],
            borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "50% 0 50% 0",
            animation: `confettiFall ${p.dur}s ${p.delay}s cubic-bezier(.4,0,1,1) forwards`,
          }}
        />
      ))}
    </div>
  );
}

const NEXT_STEPS = [
  { label: "후원 완료",       desc: "재료 선물이 접수됐어요",             done: true },
  { label: "재료 준비 중",    desc: "제휴 화방에서 재료를 준비해요",       done: false },
  { label: "작가에게 가는 중", desc: "작가의 작업실로 배송 중이에요",       done: false },
  { label: "작가가 받았어요",  desc: "편지가 곧 도착할 거예요 ✉",         done: false },
];

export default function SponsorClient({ artistId }: Props) {
  const artist = artists.find((a) => a.id === artistId);
  const project = projects.find((p) => p.artistId === artistId);

  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  if (!artist) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-muted">작가를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const availableMaterials = materials.filter(
    (m) => m.artistId === artistId && !m.isFunded
  );

  const selectedMaterial = materials.find((m) => m.id === selected);
  const fee = selectedMaterial ? Math.round(selectedMaterial.price * 0.03) : 0;
  const total = selectedMaterial ? selectedMaterial.price + fee : 0;

  const sponsorCount = project?.sponsorCount ?? 0;
  const myOrder = sponsorCount + 1;

  /* ─── Done screen ─── */
  if (done && selectedMaterial) {
    return (
      <div className="min-h-screen" style={{ background: "var(--paper)" }}>
        {/* CSS keyframes for confetti + badge pop */}
        <style>{`
          @keyframes confettiFall {
            0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
            80%  { opacity: 0.9; }
            100% { transform: translateY(90vh) rotate(560deg) scale(0.6); opacity: 0; }
          }
          @keyframes badgePop {
            0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
            60%  { transform: scale(1.25) rotate(8deg);  opacity: 1; }
            80%  { transform: scale(0.92) rotate(-4deg); }
            100% { transform: scale(1)    rotate(0deg);  opacity: 1; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseRing {
            0%   { transform: scale(1);   opacity: 0.6; }
            100% { transform: scale(1.9); opacity: 0; }
          }
        `}</style>

        <Confetti />
        <Header />

        {/* ── Hero: dark banner ── */}
        <div
          className="relative overflow-hidden pt-14 pb-28 text-center"
          style={{ background: "var(--navy-800)" }}
        >
          {/* subtle dot pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(244,211,94,.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />

          {/* Badge with pulse ring */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <span className="absolute w-20 h-20 rounded-full" style={{
              background: "rgba(244,211,94,0.25)",
              animation: "pulseRing 1.8s 0.3s ease-out infinite",
            }} />
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center text-ink"
              style={{
                background: "var(--sv)",
                animation: "badgePop 0.55s 0.15s cubic-bezier(.22,1,.36,1) both",
              }}
            >
              <IconStar />
            </div>
          </div>

          {/* Badge label */}
          <p
            className="text-xs font-bold tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--sv)", animation: "fadeUp .5s 0.55s both" }}
          >
            씨앗 배지 획득
          </p>

          {/* N번째 테오 */}
          <h1
            className="font-black leading-snug mb-3 px-5"
            style={{ color: "#fff", animation: "fadeUp .5s 0.65s both" }}
          >
            <span className="text-lg md:text-xl block mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
              당신은 이제 {artist.name} 작가의
            </span>
            <span
              className="text-[3.5rem] md:text-[4.5rem] leading-none"
              style={{ color: "var(--sv)" }}
            >
              {myOrder}번째
            </span>
            <span className="text-3xl md:text-4xl block mt-1" style={{ color: "#fff" }}>
              테오입니다.
            </span>
          </h1>

          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.55)", animation: "fadeUp .5s 0.78s both" }}
          >
            {artist.name} 작가에게 소중한 후원자가 되었어요
          </p>
        </div>

        {/* ── Content ── */}
        <div className="max-w-[480px] mx-auto px-5 -mt-10 pb-24">

          {/* 선물 내역 카드 */}
          <div
            className="rounded-2xl p-6 mb-4"
            style={{
              background: "var(--chiffon)",
              border: "1px solid rgba(194,164,63,0.25)",
              boxShadow: "0 20px 48px rgba(7,34,60,.14)",
              animation: "fadeUp .55s 0.85s both",
            }}
          >
            {/* 작가 mini profile */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "var(--sv-soft)" }}>
                <Image src={artist.profileImage} alt={artist.name} fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-navy-900 text-sm">{artist.name}</p>
                {project && <p className="text-xs text-muted truncate">{project.title}</p>}
              </div>
            </div>

            <div className="border-t pt-4 space-y-2.5" style={{ borderColor: "rgba(194,164,63,0.2)" }}>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-3">선물 내역</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted">재료</span>
                <span className="font-semibold text-navy-800 text-right max-w-[60%] leading-snug">{selectedMaterial.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">재료값</span>
                <span className="font-semibold text-navy-800">{selectedMaterial.price.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">결제·전달 수수료 (3%)</span>
                <span className="text-navy-600">{fee.toLocaleString()}원</span>
              </div>
              <div
                className="flex justify-between pt-3 border-t font-black"
                style={{ borderColor: "rgba(194,164,63,0.2)" }}
              >
                <span className="text-navy-800">총 결제</span>
                <span className="text-navy-800 text-lg">{total.toLocaleString()}원</span>
              </div>
            </div>

            <p className="text-[11px] text-muted mt-3 leading-relaxed text-center">
              재료값 전액이 작가에게 전달됩니다 · 작가 수수료 0%
            </p>
          </div>

          {/* Dear Gogh 메시지 */}
          {message && (
            <div
              className="rounded-2xl p-5 mb-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                animation: "fadeUp .5s 0.95s both",
              }}
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-3">Dear Gogh · 내 응원 메시지</p>
              <p className="font-myeongjo text-sm text-ink leading-relaxed">{message}</p>
            </div>
          )}

          {/* 다음에 일어날 일 */}
          <div
            className="rounded-2xl p-5 mb-7"
            style={{
              background: "var(--card)",
              border: "1px solid var(--line)",
              animation: "fadeUp .5s 1.05s both",
            }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-4">이제 무슨 일이 생기냐면</p>
            <ol className="space-y-3">
              {NEXT_STEPS.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {/* Step indicator */}
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={step.done
                      ? { background: "var(--navy-800)", color: "#fff" }
                      : { background: "var(--navy-100)", color: "var(--navy-400)" }
                    }
                  >
                    {step.done
                      ? <IconCheckCircle />
                      : <span className="text-[10px] font-bold">{idx + 1}</span>
                    }
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p
                      className="text-sm font-bold leading-tight"
                      style={{ color: step.done ? "var(--navy-800)" : "var(--navy-400)" }}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{step.desc}</p>
                  </div>
                  {/* Connector line */}
                  {idx < NEXT_STEPS.length - 1 && (
                    <div
                      className="absolute"
                      style={{
                        left: 27,
                        width: 1,
                        height: 12,
                        background: "var(--navy-100)",
                      }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ animation: "fadeUp .5s 1.15s both" }}
          >
            <Link
              href="/my"
              className="flex-1 font-bold py-4 rounded-xl text-sm text-center transition-all"
              style={{
                background: "var(--navy-800)",
                color: "#fff",
                boxShadow: "0 8px 22px rgba(13,59,102,.22)",
              }}
            >
              마이테오에서 확인하기
            </Link>
            <Link
              href="/atelier"
              className="flex-1 font-semibold py-4 rounded-xl text-sm text-center transition-colors"
              style={{
                background: "var(--card)",
                border: "1.5px solid var(--line)",
                color: "var(--navy-700)",
              }}
            >
              다른 작가 찾기
            </Link>
          </div>

          <p className="text-[11px] text-center mt-5" style={{ color: "var(--muted)" }}>
            * 이 화면은 시연용 데모입니다. 실제 결제는 이루어지지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  /* ─── Sponsor form ─── */
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <div className="max-w-[640px] mx-auto px-5 md:px-8 py-10">

        {/* Back link */}
        <Link
          href={`/artists/${artist.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-navy-800 font-medium mb-8 transition-colors"
        >
          ← {artist.name} 아틀리에
        </Link>

        {/* Artist summary banner */}
        <div className="bg-navy-800 rounded-xl p-5 flex items-center gap-4 mb-8">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-sv-soft shrink-0">
            <Image src={artist.profileImage} alt={artist.name} fill sizes="56px" className="object-cover" />
          </div>
          <div>
            <p className="text-sv font-bold text-xs tracking-[0.16em] uppercase mb-1">재료 선물하기</p>
            <p className="text-white font-black text-base">{artist.name}</p>
            {project && (
              <p className="text-white/60 text-xs mt-0.5">{project.title}</p>
            )}
          </div>
        </div>

        {/* STEP 1: Select material */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-sv text-ink font-black text-xs flex items-center justify-center">
              1
            </span>
            <h2 className="font-black text-navy-800">재료를 선택하세요</h2>
          </div>

          <div className="space-y-3">
            {availableMaterials.length === 0 ? (
              <p className="text-sm text-muted text-center py-8">현재 선물 가능한 재료가 없습니다.</p>
            ) : (
              availableMaterials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                    selected === m.id
                      ? "border-navy-800 bg-card"
                      : "border-navy-100 bg-card hover:border-navy-300"
                  }`}
                  style={selected === m.id ? { boxShadow: '0 8px 22px rgba(23,29,43,.06)' } : undefined}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-800 text-sm leading-snug">{m.name}</p>
                    <p className="text-xs text-muted mt-0.5 line-clamp-1">{m.usageNote}</p>
                    <p className="text-sm font-bold text-gold-text mt-1.5">{m.price.toLocaleString()}원</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center transition-all ${
                      selected === m.id
                        ? "bg-navy-800 border-navy-800"
                        : "border-navy-300"
                    }`}
                  >
                    {selected === m.id && <IconCheck />}
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        {/* STEP 2: Message */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-sv text-ink font-black text-xs flex items-center justify-center">
              2
            </span>
            <h2 className="font-black text-navy-800">
              Dear Gogh 메시지{" "}
              <span className="text-muted text-sm font-normal">(선택)</span>
            </h2>
          </div>
          <p className="text-xs text-muted mb-3">작가에게 한마디 · 편지와 함께 전달돼요</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="응원의 말을 남겨보세요. 최대 500자."
            maxLength={500}
            rows={4}
            className="w-full bg-card border-2 border-navy-100 focus:border-navy-700 rounded-xl p-4 text-sm text-ink placeholder:text-muted resize-none outline-none transition-colors leading-relaxed"
          />
          <p className="text-xs text-muted text-right mt-1">{message.length} / 500</p>
        </section>

        {/* STEP 3: Summary */}
        {selectedMaterial && (
          <div className="bg-card border border-line rounded-xl p-5 mb-4" style={{ boxShadow: '0 8px 22px rgba(23,29,43,.06)' }}>
            <div className="space-y-2 mb-4 pb-4 border-b border-navy-100">
              <div className="flex justify-between text-sm">
                <span className="text-muted">재료값</span>
                <span className="font-medium text-navy-800">{selectedMaterial.price.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">결제·전달 수수료 (3%)</span>
                <span className="font-medium text-navy-600">{fee.toLocaleString()}원</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-navy-800">총 결제 금액</span>
              <span className="font-black text-navy-800 text-lg">{total.toLocaleString()}원</span>
            </div>
            <p className="text-xs text-muted mt-3 leading-relaxed">
              재료값 전액이 작가에게 전달됩니다. 작가 수수료는 0%예요.
            </p>
          </div>
        )}

        <button
          disabled={!selected}
          onClick={() => setDone(true)}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
            selected
              ? "bg-navy-800 text-white hover:bg-navy-700"
              : "bg-navy-100 text-navy-300 cursor-not-allowed"
          }`}
          style={selected ? { boxShadow: '0 8px 22px rgba(23,29,43,.06)' } : undefined}
        >
          {selected
            ? `${total.toLocaleString()}원 선물하기`
            : "재료를 먼저 선택해주세요"}
        </button>

        <p className="text-xs text-muted text-center mt-4 leading-relaxed">
          * 이 화면은 시연용 데모입니다. 실제 결제는 이루어지지 않습니다.
        </p>

      </div>
    </div>
  );
}
