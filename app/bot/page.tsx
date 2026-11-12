"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import { CATEGORIES, FAQS, findFaq, type Faq } from "@/lib/botFaq";
import { INQUIRY_EMAIL } from "@/lib/site";

type Chip =
  | { kind: "cat"; label: string; value: string }
  | { kind: "faq"; label: string; value: string }
  | { kind: "inquiry"; label: string }
  | { kind: "home"; label: string };

interface Msg {
  id: number;
  role: "bot" | "user";
  text?: string;
  link?: { label: string; href: string };
  chips?: Chip[];
  form?: boolean;
}

const homeChips = (): Chip[] => [
  ...CATEGORIES.map((c): Chip => ({ kind: "cat", label: c, value: c })),
  { kind: "inquiry", label: "문의 남기기" },
];

const GREETING =
  "안녕하세요, 테오 봇이에요. 궁금한 점을 골라 주시거나 아래 입력창에 직접 물어봐 주세요. 찾지 못한 내용은 문의로 남길 수 있어요.";

let seq = 0;
const nextId = () => ++seq;

type FormState = "idle" | "sending" | "sent" | "fallback" | "error";

function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const mailto = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(`[테오 문의] ${name}님`)}&body=${encodeURIComponent(
    `${message}\n\n보내는 사람: ${name} (${email})`
  )}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setError("");
    if (!name.trim() || !message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("이름, 이메일, 문의 내용을 확인해 주세요.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "전송하지 못했어요. 잠시 후 다시 시도해 주세요.");
        setState("error");
        return;
      }
      setState(data.delivered ? "sent" : "fallback");
    } catch {
      setError("전송하지 못했어요. 잠시 후 다시 시도해 주세요.");
      setState("error");
    }
  }

  if (state === "sent") {
    return <p className="text-[16px] leading-[1.7]">문의가 전달됐어요. 남겨 주신 이메일로 답변드릴게요.</p>;
  }

  if (state === "fallback") {
    return (
      <div>
        <p className="text-[16px] leading-[1.7] mb-4">
          지금은 이 화면에서 바로 전송되지 않아요. 아래 버튼을 누르면 메일 앱이 열리고, 내용이 미리 채워져 있어요. 보내기만 눌러 주세요.
        </p>
        <a href={mailto} className="nb-btn px-6 py-3 text-[15px]">
          메일 앱으로 보내기 →
        </a>
        <p className="text-[13px] text-muted mt-3">받는 곳: {INQUIRY_EMAIL}</p>
      </div>
    );
  }

  const inputCls = "w-full bg-paper border border-ink/40 px-3 py-2.5 text-[16px] focus:outline-none focus:border-ink";

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <div>
        <label className="type-label block mb-1.5">이름</label>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={50} placeholder="홍길동" />
      </div>
      <div>
        <label className="type-label block mb-1.5">이메일</label>
        <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} placeholder="답변 받을 이메일" />
      </div>
      <div>
        <label className="type-label block mb-1.5">문의 내용</label>
        <textarea className={`${inputCls} min-h-[120px]`} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} placeholder="궁금한 점을 적어 주세요." />
      </div>
      {error && <p className="text-[14px] text-red-600">{error}</p>}
      <button type="submit" disabled={state === "sending"} className="nb-btn px-6 py-3 text-[15px] disabled:opacity-60">
        {state === "sending" ? "보내는 중…" : "문의 보내기 →"}
      </button>
    </form>
  );
}

export default function BotPage() {
  const [msgs, setMsgs] = useState<Msg[]>(() => [{ id: nextId(), role: "bot", text: GREETING, chips: homeChips() }]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    // 첫 화면에서는 스크롤하지 않고, 대화가 이어질 때만 맨 아래로
    if (first.current) {
      first.current = false;
      return;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs]);

  const answer = (faq: Faq): Msg => ({
    id: nextId(),
    role: "bot",
    text: faq.answer,
    link: faq.link,
    chips: [
      ...FAQS.filter((f) => f.category === faq.category && f.id !== faq.id).map((f): Chip => ({ kind: "faq", label: f.question, value: f.id })),
      { kind: "home", label: "다른 질문 보기" },
      { kind: "inquiry", label: "문의 남기기" },
    ],
  });

  const inquiryMsg = (): Msg => ({
    id: nextId(),
    role: "bot",
    text: "문의 내용을 남겨 주세요. 확인하고 남겨 주신 이메일로 답변드릴게요.",
    form: true,
    chips: [{ kind: "home", label: "처음으로" }],
  });

  function push(...m: Msg[]) {
    setMsgs((prev) => [...prev, ...m]);
  }

  function onChip(chip: Chip) {
    const user: Msg = { id: nextId(), role: "user", text: chip.label };
    if (chip.kind === "cat") {
      push(user, {
        id: nextId(),
        role: "bot",
        text: `${chip.value}에 대해 궁금한 점을 골라 주세요.`,
        chips: [
          ...FAQS.filter((f) => f.category === chip.value).map((f): Chip => ({ kind: "faq", label: f.question, value: f.id })),
          { kind: "home", label: "처음으로" },
        ],
      });
    } else if (chip.kind === "faq") {
      const faq = FAQS.find((f) => f.id === chip.value);
      if (faq) push(user, answer(faq));
    } else if (chip.kind === "inquiry") {
      push(user, inquiryMsg());
    } else {
      push(user, { id: nextId(), role: "bot", text: "어떤 점이 궁금하세요?", chips: homeChips() });
    }
  }

  function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    const user: Msg = { id: nextId(), role: "user", text };
    const faq = findFaq(text);
    if (faq) {
      push(user, answer(faq));
    } else {
      push(user, {
        id: nextId(),
        role: "bot",
        text: "잘 모르겠어요. 아래에서 골라 보시거나, 문의로 남겨 주시면 확인하고 답변드릴게요.",
        chips: homeChips(),
      });
    }
  }

  const lastId = msgs[msgs.length - 1].id;

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <PageTitle text="Ask Theo" />

      <main className="px-[var(--gap)]">
        <div className="flex flex-col md:flex-row py-12 md:py-16 gap-6 md:gap-0">
          <div className="md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0">
            <span className="type-section">Help</span>
          </div>

          <div className="w-full md:w-[calc((100vw-var(--gap)*2)*0.75)] md:max-w-[52rem]">
            <ul className="space-y-6">
              {msgs.map((m) => {
                const active = m.id === lastId;
                return (
                  <li key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                    {m.role === "user" ? (
                      <p className="bg-navy-900 text-white px-4 py-2.5 text-[16px] max-w-[85%]">{m.text}</p>
                    ) : (
                      <div className="max-w-[44rem]">
                        <p className="type-label text-muted mb-2">Theo Bot</p>
                        <div className="border border-line bg-card px-5 py-4">
                          {m.text && <p className="text-[16px] leading-[1.8]" style={{ wordBreak: "keep-all" }}>{m.text}</p>}
                          {m.link && (
                            <Link href={m.link.href} className="link-line text-[15px] inline-block mt-3">
                              {m.link.label} →
                            </Link>
                          )}
                          {m.form && active && <div className="mt-5"><InquiryForm /></div>}
                        </div>
                        {m.chips && (
                          <div className={`flex flex-wrap gap-2 mt-3 ${active ? "" : "opacity-40 pointer-events-none"}`}>
                            {m.chips.map((c) => (
                              <button
                                key={c.kind + c.label}
                                type="button"
                                disabled={!active}
                                onClick={() => onChip(c)}
                                className={`${c.kind === "inquiry" ? "nb-btn" : "nb-btn-outline"} px-4 py-2 text-[15px] text-left`}
                              >
                                {c.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div ref={endRef} />

            <form onSubmit={onSend} className="flex gap-2 mt-10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="궁금한 점을 입력해 보세요. 예: 환불이 되나요?"
                className="flex-1 bg-paper border border-ink/40 px-4 py-3 text-[16px] focus:outline-none focus:border-ink"
                maxLength={200}
              />
              <button type="submit" className="nb-btn px-6 py-3 text-[15px]">보내기</button>
            </form>
          </div>
        </div>
        <hr className="dots-x" />
      </main>
    </div>
  );
}
