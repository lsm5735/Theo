"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { INQUIRY_EMAIL } from "@/lib/site";
import { GIFT_ARTISTS, MOTIVATION_OPTIONS, type ApplyProgram } from "@/lib/programs";

// 프로그램 신청 — /api/inquiry 로 접수 메일을 보낸다.
// 서버에 메일 발송 설정이 없으면(delivered:false) 사용자의 메일 앱으로 보내도록 안내한다.

type State = "idle" | "sending" | "sent" | "fallback" | "error";

export default function ProgramApplyForm({ program }: { program: ApplyProgram }) {
  const sessions = program.sessions;
  const eventLine = `${program.title} (${program.date} · ${program.location})`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState("");
  const [gifted, setGifted] = useState("");
  const [motivation, setMotivation] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>("idle");
  const [serverError, setServerError] = useState("");

  // 완료·안내 화면으로 바뀌면 맨 위부터 보이게 한다 (폼이 길어서 아래로 내려가 있던 스크롤을 올림)
  useEffect(() => {
    if (state === "sent" || state === "fallback") window.scrollTo({ top: 0, behavior: "instant" });
  }, [state]);

  const message = `[${eventLine}]\n${sessions ? `참여 회차: ${session}` : `시간: ${program.time}`}\n선물한 작가: ${gifted}\n참여 동기: ${motivation}\n이름: ${name.trim()}\n이메일: ${email.trim()}\n연락처: ${phone.trim()}`;
  const mailto = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(`[${program.label} 신청] ${name.trim()}님`)}&body=${encodeURIComponent(message)}`;

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "이름을 입력해 주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "올바른 이메일을 입력해 주세요.";
    if (!/^[0-9\-]{9,13}$/.test(phone.replace(/\s/g, ""))) e.phone = "연락처를 입력해 주세요. (예: 010-1234-5678)";
    if (sessions && !session) e.session = "참여 회차를 선택해 주세요.";
    if (!gifted) e.gifted = "선물하신 작가를 선택해 주세요.";
    if (!motivation) e.motivation = "참여 동기를 선택해 주세요.";
    if (!agree) e.agree = "개인정보 수집·이용에 동의해 주세요.";
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (state === "sending") return;
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setServerError("");
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message, subject: `[${program.label} 신청]` }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "전송하지 못했어요. 잠시 후 다시 시도해 주세요.");
        setState("error");
        return;
      }
      setState(data.delivered ? "sent" : "fallback");
    } catch {
      setServerError("전송하지 못했어요. 잠시 후 다시 시도해 주세요.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div>
        <h1 className="text-[38px] max-md:text-[36px] md:text-[46px] leading-snug mb-5" style={{ fontWeight: 700, wordBreak: "keep-all" }}>신청이 접수됐어요</h1>
        <p className="text-[22px] max-md:text-[20px] leading-[1.8] mb-8" style={{ wordBreak: "keep-all" }}>
          <b>{name.trim()}</b>님, {program.title} 신청이 들어왔어요.<br />
          남겨 주신 이메일로 안내드릴게요.
        </p>
        <Link href="/community" className="nb-btn px-8 py-4 text-[19px] max-md:text-[17px]">프로그램 목록으로</Link>
      </div>
    );
  }

  if (state === "fallback") {
    return (
      <div>
        <h1 className="leading-snug mb-5 whitespace-nowrap" style={{ fontWeight: 700, fontSize: "clamp(20px, 6vw, 36px)" }}>메일로 신청을 마무리해 주세요</h1>
        <p className="text-[22px] max-md:text-[20px] leading-[1.8] mb-5" style={{ wordBreak: "keep-all" }}>
          지금은 이 화면에서 바로 전송되지 않아요. 아래 버튼을 누르면 메일 앱이 열리고 신청 내용이 미리 채워져 있어요.
          <b> 메일의 보내기까지 눌러야 신청이 접수돼요.</b>
        </p>
        <a href={mailto} className="inline-flex items-center justify-center min-h-[68px] px-12 py-5 text-[26px] max-md:text-[24px] font-bold bg-sv text-ink transition-colors hover:bg-navy-900 hover:text-white">신청 완료하기</a>
        <p className="text-[17px] max-md:text-[15px] text-muted mt-3">받는 곳: {INQUIRY_EMAIL}</p>
      </div>
    );
  }

  const inputCls = "w-full bg-paper border border-ink/40 px-3 py-2.5 text-[16px] max-md:text-[14px] focus:outline-none focus:border-ink";
  const errCls = "text-[13px] max-md:text-[11px] text-red-600 mt-1";

  return (
    <>
      <Link href="/community" className="text-[14px] max-md:text-[12px] text-muted hover:text-ink transition-colors mb-8 block w-fit">
        Arty로
      </Link>
      <p className="type-label mb-2">{program.label}</p>
      <h1 className="type-m mb-2" style={{ fontWeight: 700, wordBreak: "keep-all" }}>{program.title} 신청</h1>
      <p className="text-[15px] max-md:text-[13px] text-muted leading-[1.8] mb-8" style={{ wordBreak: "keep-all" }}>
        {program.date}{program.time ? ` ${program.time}` : ""} · {program.location}<br />
        {program.intro}
      </p>

      <form onSubmit={submit} noValidate className="space-y-5">
        <div>
          <label className="type-label block mb-1.5">이름</label>
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={30} placeholder="홍길동" />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>

        <div>
          <label className="type-label block mb-1.5">이메일</label>
          <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} placeholder="hello@example.com" />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>

        <div>
          <label className="type-label block mb-1.5">연락처</label>
          <input className={inputCls} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={13} placeholder="010-1234-5678" />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>

        {sessions && (
          <fieldset>
            <legend className="type-label mb-1.5">참여 회차</legend>
            <div className="flex flex-col gap-2">
              {sessions.map((s) => (
                <label
                  key={s}
                  className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                    session === s ? "border-ink bg-sv" : "border-ink/40 bg-paper hover:border-ink"
                  }`}
                >
                  <input type="radio" name="session" value={s} checked={session === s} onChange={() => setSession(s)} className="accent-black" />
                  <span className="text-[16px] max-md:text-[14px]">{s}</span>
                </label>
              ))}
            </div>
            {errors.session && <p className={errCls}>{errors.session}</p>}
          </fieldset>
        )}

        <fieldset>
          <legend className="type-label mb-1.5">어떤 작가에게 선물하셨나요?</legend>
          <div className="grid grid-cols-2 gap-2">
            {GIFT_ARTISTS.map((n) => (
              <label
                key={n}
                className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                  gifted === n ? "border-ink bg-sv" : "border-ink/40 bg-paper hover:border-ink"
                }`}
              >
                <input type="radio" name="gifted" value={n} checked={gifted === n} onChange={() => setGifted(n)} className="accent-black" />
                <span className="text-[16px] max-md:text-[14px]">{n}</span>
              </label>
            ))}
          </div>
          {errors.gifted && <p className={errCls}>{errors.gifted}</p>}
        </fieldset>

        <fieldset>
          <legend className="type-label mb-1.5">참여 동기</legend>
          <div className="flex flex-col gap-2">
            {MOTIVATION_OPTIONS.map((m) => (
              <label
                key={m}
                className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                  motivation === m ? "border-ink bg-sv" : "border-ink/40 bg-paper hover:border-ink"
                }`}
              >
                <input type="radio" name="motivation" value={m} checked={motivation === m} onChange={() => setMotivation(m)} className="accent-black" />
                <span className="text-[16px] max-md:text-[14px]">{m}</span>
              </label>
            ))}
          </div>
          {errors.motivation && <p className={errCls}>{errors.motivation}</p>}
        </fieldset>

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1.5 w-4 h-4 accent-black" />
            <span className="text-[14.5px] max-md:text-[12.5px] leading-[1.7]">
              <b>개인정보 수집·이용에 동의</b>합니다.
              <span className="block text-[13px] max-md:text-[11px] text-muted mt-0.5">
                수집 항목: 이름, 이메일, 연락처 / 목적: 프로그램 참여 신청 접수 및 안내 /{" "}
                <Link href="/privacy" className="underline underline-offset-2" target="_blank">개인정보처리방침</Link>
              </span>
            </span>
          </label>
          {errors.agree && <p className={errCls}>{errors.agree}</p>}
        </div>

        {serverError && <p className={errCls}>{serverError}</p>}

        <button type="submit" disabled={state === "sending"} className="nb-btn px-8 py-3 text-[15px] max-md:text-[13px] disabled:opacity-50">
          {state === "sending" ? "보내는 중…" : "신청하기"}
        </button>
      </form>
    </>
  );
}
