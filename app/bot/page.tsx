"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import artists from "@/data/artists.json";

interface Message {
  role: "bot" | "user";
  text: string;
  chips?: string[];
  showResult?: boolean;
}

const FLOW: { botText: string; chips: string[] }[] = [
  {
    botText: "안녕하세요, 저는 테오예요.\n어떤 그림 앞에서 오래 멈춰 서시나요?\n작품 이름을 몰라도 괜찮아요 — 느낌으로 말해주세요.",
    chips: ["어두운 분위기", "밝고 따뜻한", "추상적인", "사실적인"],
  },
  {
    botText: "그 어두움이 고요한 쪽인가요, 아니면 격정적인 쪽인가요?",
    chips: ["고요하고 쓸쓸한", "격정적이고 강렬한"],
  },
  {
    botText: "도시의 밤 같은 풍경이 떠오르네요.\n사람이 있는 장면이 좋으세요, 아니면 비어 있는 편이 좋으세요?",
    chips: ["사람이 있는 장면", "비어 있는 공간"],
  },
  {
    botText: "정리하면 — 어두운 · 고요한 · 도시 · 두터운 붓질.\n맞을까요?",
    chips: ["맞아요, 추천받을게요", "조금 다르게 다시"],
  },
];

export default function BotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: FLOW[0].botText, chips: FLOW[0].chips },
  ]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  function handleChip(chip: string) {
    const userMsg: Message = { role: "user", text: chip };
    const nextStep = step + 1;

    if (nextStep >= FLOW.length) {
      setMessages((prev) => [
        ...prev,
        userMsg,
        { role: "bot", text: "취향에 맞는 작가를 찾았어요.", showResult: true },
      ]);
      setDone(true);
    } else {
      setMessages((prev) => [
        ...prev,
        userMsg,
        { role: "bot", text: FLOW[nextStep].botText, chips: FLOW[nextStep].chips },
      ]);
      setStep(nextStep);
    }
  }

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
          <p className="text-xs font-semibold tracking-[0.22em] text-navy-400 uppercase mb-3">THEO BOT</p>
          <h1 className="text-2xl font-bold text-navy-900 leading-snug">
            취향에 맞는 작가를<br />찾아드릴게요.
          </h1>
        </div>

        {/* Chat */}
        <div className="flex flex-col gap-4 flex-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" ? (
                <div className="max-w-[85%]">
                  {/* Bot avatar */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sv text-[10px] font-black">T</span>
                    </div>
                    <div
                      className="bg-card border border-line rounded-2xl rounded-tl-sm px-4 py-3.5"
                      style={{ boxShadow: '0 4px 14px rgba(13,59,102,.05)' }}
                    >
                      <p className="text-[14px] text-navy-900 leading-[1.8] whitespace-pre-line">{msg.text}</p>

                      {/* Result cards */}
                      {msg.showResult && (
                        <div className="mt-5 space-y-3">
                          {artists.slice(0, 3).map((a) => (
                            <Link
                              key={a.id}
                              href={`/artists/${a.id}`}
                              className="flex items-center gap-3 bg-paper border border-navy-100 rounded-xl p-3.5 hover:border-navy-300 transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-navy-200 shrink-0 overflow-hidden relative">
                                <div
                                  className="absolute inset-0"
                                  style={{ background: 'linear-gradient(135deg,#0D3B66,#376590)' }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-navy-900">{a.name}</p>
                                <p className="text-[11px] text-muted truncate mt-0.5">{a.oneLiner}</p>
                              </div>
                              <svg className="w-4 h-4 text-navy-400 group-hover:text-navy-700 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chips */}
                  {!done && msg.chips && i === messages.length - 1 && (
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
        </div>

        {/* Input (decorative) */}
        {!done && (
          <div className="mt-8 flex gap-2 bg-card border border-navy-200 rounded-xl p-2" style={{ boxShadow: '0 4px 14px rgba(13,59,102,.06)' }}>
            <input
              type="text"
              placeholder="직접 입력하거나 위 버튼을 눌러주세요"
              className="flex-1 border-none outline-none text-sm text-navy-900 bg-transparent placeholder:text-navy-300 px-2 min-w-0"
              readOnly
            />
            <button className="shrink-0 bg-navy-800 text-chiffon text-sm font-bold px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors">
              전송
            </button>
          </div>
        )}

        {done && (
          <div className="mt-8 text-center">
            <p className="text-xs text-navy-400 mb-4">* 이 화면은 시연용 데모입니다.</p>
            <Link
              href="/#artists"
              className="inline-block bg-navy-800 text-chiffon font-bold px-8 py-3.5 rounded-xl hover:bg-navy-700 transition-colors text-sm"
            >
              전체 작가 보기
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
