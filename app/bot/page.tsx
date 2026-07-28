"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import artworksData from "@/data/artworks.json";

interface Message {
  role: "bot" | "user";
  text: string;
  chips?: string[];
}

interface ArtistData {
  id: string;
  name: string;
  slug: string;
  oneLiner: string;
  profileImage: string;
}

interface ProjectData {
  id: string;
  title: string;
  targetAmount: number;
  fundedAmount: number;
}

interface MatchResult {
  rank: number;
  artistId: string;
  reason: string;
  quote: string;
  artist: ArtistData | null;
  project: ProjectData | null;
}

// 마스터문서 §12b-1: 3~5턴 고정 흐름
const FLOW = [
  {
    botText:
      "안녕하세요, 저는 테오예요.\n어떤 그림 앞에서 오래 멈춰 서시나요?\n느낌으로 말해주세요 — 작품 이름 몰라도 괜찮아요.",
    chips: ["어두운 분위기", "밝고 따뜻한", "추상적인", "사실적인"],
  },
  {
    botText: "그 느낌이 고요한 쪽인가요, 아니면 격정적인 쪽인가요?",
    chips: ["고요하고 쓸쓸한", "격정적이고 강렬한", "잔잔하고 일상적인"],
  },
  {
    botText: "어떤 소재나 장면이 자주 떠오르세요?",
    chips: ["도시·밤·건물", "자연·식물·빛", "사람·감정·관계", "추상·질감·형태"],
  },
  {
    botText: "마지막으로 — 붓질 느낌은 어떤 게 좋으세요?",
    chips: ["두텁고 거친 임파스토", "얇고 매끄러운", "번지고 흐르는", "선명하고 절제된"],
  },
];

const RANK_LABEL = ["1st", "2nd", "3rd"];
const RANK_STYLE = [
  "bg-sv text-ink",
  "bg-navy-200 text-navy-700",
  "bg-navy-100 text-navy-500",
];

export default function BotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: FLOW[0].botText, chips: FLOW[0].chips },
  ]);
  const [step, setStep] = useState(0);
  const [chipCtx, setChipCtx] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isDone = isLoading || results.length > 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, results]);

  async function fetchMatch(query: string) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  function triggerMatch(context: string[]) {
    const query = context.join(", ");
    setMessages((p) => [
      ...p,
      { role: "bot", text: "취향에 맞는 작가를 찾고 있어요..." },
    ]);
    setStep(FLOW.length);
    fetchMatch(query);
  }

  function handleChip(chip: string) {
    const newCtx = [...chipCtx, chip];
    setChipCtx(newCtx);
    const nextStep = step + 1;
    const userMsg: Message = { role: "user", text: chip };

    if (nextStep >= FLOW.length) {
      setMessages((p) => [...p, userMsg]);
      triggerMatch(newCtx);
    } else {
      setMessages((p) => [
        ...p,
        userMsg,
        { role: "bot", text: FLOW[nextStep].botText, chips: FLOW[nextStep].chips },
      ]);
      setStep(nextStep);
    }
  }

  // 마스터문서 §12b-1: "바로 추천받기" — 어느 턴에서든 수집된 정보로 즉시 추천
  function handleQuickMatch() {
    const ctx = chipCtx.length > 0 ? chipCtx : ["감성적인 그림"];
    setMessages((p) => [...p, { role: "user", text: "바로 추천받을게요" }]);
    triggerMatch(ctx);
  }

  // 자유 문장 입력 → 칩 선택과 동일하게 단계 진행 (즉시 매칭 안 함)
  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;
    setInputText("");

    const newCtx = [...chipCtx, text];
    setChipCtx(newCtx);
    const nextStep = step + 1;

    if (nextStep >= FLOW.length) {
      setMessages((p) => [...p, { role: "user", text }]);
      triggerMatch(newCtx);
    } else {
      setMessages((p) => [
        ...p,
        { role: "user", text },
        { role: "bot", text: FLOW[nextStep].botText, chips: FLOW[nextStep].chips },
      ]);
      setStep(nextStep);
    }
  }

  function handleReset() {
    setMessages([{ role: "bot", text: FLOW[0].botText, chips: FLOW[0].chips }]);
    setStep(0);
    setChipCtx([]);
    setInputText("");
    setIsLoading(false);
    setResults([]);
  }

  const isConversationActive = step < FLOW.length && !isDone;

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />

      <div className="flex-1 max-w-[600px] w-full mx-auto px-5 md:px-8 py-10 flex flex-col">

        {/* Back */}
        <Link
          href="/"
          className="text-sm text-navy-400 hover:text-navy-700 transition-colors mb-10 inline-block"
        >
          ← 홈으로
        </Link>

        {/* Title */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.22em] text-navy-400 uppercase mb-3">
            THEO BOT
          </p>
          <h1 className="text-2xl font-bold text-navy-900 leading-snug">
            취향에 맞는 작가를
            <br />
            찾아드릴게요.
          </h1>
        </div>

        {/* Chat */}
        <div className="flex flex-col gap-4 flex-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" ? (
                <div className="max-w-[85%] w-full">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sv text-[10px] font-black">T</span>
                    </div>
                    <div
                      className="bg-card border border-line rounded-2xl rounded-tl-sm px-4 py-3.5"
                      style={{ boxShadow: "0 4px 14px rgba(13,59,102,.05)" }}
                    >
                      <p className="text-[14px] text-navy-900 leading-[1.8] whitespace-pre-line">
                        {msg.text}
                      </p>
                    </div>
                  </div>

                  {/* 칩 선택지 */}
                  {isConversationActive && msg.chips && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-9">
                      {msg.chips.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => handleChip(chip)}
                          className="text-[12.5px] px-3.5 py-2 rounded-full border border-navy-300 text-navy-700 hover:bg-navy-800 hover:text-chiffon hover:border-navy-800 transition-all"
                        >
                          {chip}
                        </button>
                      ))}
                      {/* 바로 추천받기 — 3턴 이상 응답 후 노출 */}
                      {step >= 2 && (
                        <button
                          onClick={handleQuickMatch}
                          className="text-[12.5px] px-3.5 py-2 rounded-full bg-sv text-ink font-semibold hover:opacity-90 transition-all"
                        >
                          바로 추천받기 →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-navy-800 text-chiffon rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]">
                  <p className="text-[14px] leading-[1.7]">{msg.text}</p>
                </div>
              )}
            </div>
          ))}

          {/* 로딩 — 이중 나선 소용돌이 */}
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sv text-[10px] font-black">T</span>
              </div>
              <div
                className="bg-card border border-line rounded-2xl rounded-tl-sm px-6 py-5"
                style={{ boxShadow: "0 4px 14px rgba(13,59,102,.05)" }}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* 이중 나선: 네이비 바깥고리(시계방향) + 골드 안쪽고리(반시계) */}
                  <div className="relative w-11 h-11">
                    <svg
                      className="absolute inset-0 animate-spin"
                      style={{ animationDuration: "1.3s", animationTimingFunction: "linear" }}
                      width="44" height="44" viewBox="0 0 44 44" fill="none"
                    >
                      <path d="M22 3 A19 19 0 1 1 3 22" stroke="#0D3B66" strokeWidth="3" strokeLinecap="round" />
                      <path d="M22 3 A19 19 0 0 0 3 22" stroke="#0D3B66" strokeWidth="3" strokeLinecap="round" opacity="0.12" />
                    </svg>
                    <svg
                      className="absolute inset-0 animate-spin"
                      style={{ animationDuration: "1.3s", animationTimingFunction: "linear", animationDirection: "reverse" }}
                      width="44" height="44" viewBox="0 0 44 44" fill="none"
                    >
                      <path d="M22 9 A13 13 0 1 0 9 22" stroke="#F4D35E" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M22 9 A13 13 0 0 1 9 22" stroke="#F4D35E" strokeWidth="2.5" strokeLinecap="round" opacity="0.12" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-navy-700 font-medium">취향에 맞는 고흐를 매칭중이에요</p>
                </div>
              </div>
            </div>
          )}

          {/* 결과 카드 */}
          {!isLoading && results.length > 0 && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sv text-[10px] font-black">T</span>
              </div>
              <div className="flex-1 space-y-3">
                {/* 봇 텍스트 */}
                <div
                  className="bg-card border border-line rounded-2xl rounded-tl-sm px-4 py-3.5"
                  style={{ boxShadow: "0 4px 14px rgba(13,59,102,.05)" }}
                >
                  <p className="text-[14px] text-navy-900 leading-[1.8]">
                    취향에 맞는 작가 3명을 찾았어요.
                  </p>
                </div>

                {results.map((r, i) => {
                  if (!r.artist) return null;
                  const repArtwork = (artworksData as { artistId: string; isRepresentative: boolean; imageUrl: string; title: string }[])
                    .find((a) => a.artistId === r.artistId && a.isRepresentative) ?? null;

                  return (
                    <div
                      key={r.artistId}
                      className="bg-card border border-line rounded-2xl overflow-hidden"
                      style={{ boxShadow: "0 4px 14px rgba(13,59,102,.05)" }}
                    >
                      {/* 대표 작품 이미지 */}
                      {repArtwork && (
                        <div className="relative w-full h-40">
                          <img
                            src={repArtwork.imageUrl}
                            alt={repArtwork.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-1 rounded-md ${RANK_STYLE[i]}`}>
                            {RANK_LABEL[i]}
                          </span>
                          <p className="absolute bottom-2.5 left-3 text-[11px] text-white/75 font-medium">{repArtwork.title}</p>
                        </div>
                      )}
                      <div className="p-4">
                      {/* 작가 헤더 */}
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={r.artist.profileImage}
                            alt={r.artist.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          {!repArtwork && (
                            <span className={`absolute -top-1.5 -left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${RANK_STYLE[i]}`}>
                              {RANK_LABEL[i]}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-bold text-navy-900">
                            {r.artist.name}
                          </p>
                          <p className="text-[12px] text-muted mt-0.5 leading-relaxed">
                            {r.artist.oneLiner}
                          </p>
                        </div>
                        <Link
                          href={`/atelier/${r.artist.slug}`}
                          className="shrink-0 text-[11px] font-semibold text-navy-700 border border-navy-300 px-2.5 py-1.5 rounded-lg hover:bg-navy-800 hover:text-chiffon hover:border-navy-800 transition-all"
                        >
                          아틀리에 →
                        </Link>
                      </div>

                      {/* 추천 이유 */}
                      <div className="mt-3 bg-navy-100 rounded-xl px-3.5 py-3.5">
                        <p className="text-[10px] font-bold tracking-[0.14em] text-navy-400 uppercase mb-2">
                          이 작가를 추천하는 이유
                        </p>
                        <p className="text-[13px] text-navy-800 leading-[1.85]">
                          {r.reason}
                        </p>
                        {r.quote && (
                          <p className="text-[12px] text-navy-500 italic mt-2.5 pl-3 border-l-2 border-navy-300 leading-[1.7]">
                            &ldquo;{r.quote}&rdquo;
                          </p>
                        )}
                      </div>
                      </div>
                    </div>
                  );
                })}

                {/* 하단 액션 */}
                <div className="text-center pt-1 pb-2 space-y-3">
                  <p className="text-[11px] text-navy-300">
                    Solar AI가 작가노트를 직접 읽고 추천했어요
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleReset}
                      className="text-sm text-navy-500 border border-navy-300 px-4 py-2 rounded-xl hover:bg-navy-800 hover:text-chiffon hover:border-navy-800 transition-all"
                    >
                      다시 찾기
                    </button>
                    <Link
                      href="/atelier"
                      className="text-sm font-bold bg-navy-800 text-chiffon px-4 py-2 rounded-xl hover:bg-navy-700 transition-colors"
                    >
                      전체 작가 보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* 텍스트 입력 */}
        {!isDone && (
          <form
            onSubmit={handleTextSubmit}
            className="mt-8 flex gap-2 bg-card border border-navy-200 rounded-xl p-2"
            style={{ boxShadow: "0 4px 14px rgba(13,59,102,.06)" }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="직접 입력해도 좋아요 (예: 어두운 밤 도시 풍경, 거친 붓질 유화)"
              className="flex-1 border-none outline-none text-sm text-navy-900 bg-transparent placeholder:text-navy-300 px-2 min-w-0"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="shrink-0 bg-navy-800 text-chiffon text-sm font-bold px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-40"
            >
              전송
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
