"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

interface Artist {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  profileImage: string;
  coverImage: string;
  location: string;
  genre: string;
  media: string[];
  totalSponsors: number;
}

interface Project {
  id: string;
  title: string;
  targetAmount: number;
  fundedAmount: number;
  sponsorCount: number;
}

interface Props {
  artist: Artist;
  project: Project | null;
}

type Step = "form" | "done";

const MOTIVATION_OPTIONS = [
  "평소에 이 작가의 작업이 좋았어요",
  "취향에 맞는 그림 스타일이에요",
  "창작 과정이 궁금해서요",
  "편지로 소식을 받고 싶어요",
  "소규모 작가를 응원하고 싶어요",
];

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[12.5px] font-bold text-navy-700 mb-1.5 tracking-[0.04em]">
      {children}
      {required && <span className="text-[#C2A43F] ml-0.5">*</span>}
    </label>
  );
}

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  maxLength,
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className="w-full text-[13.5px] text-navy-900 placeholder:text-navy-300 bg-paper border border-navy-200 rounded-xl px-4 py-3 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-200 transition-all"
    />
  );
}

export default function ApplyClient({ artist, project }: Props) {
  const [step, setStep] = useState<Step>("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motivation, setMotivation] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pct = project ? Math.round((project.fundedAmount / project.targetAmount) * 100) : 0;

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "이름을 입력해주세요.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "올바른 이메일을 입력해주세요.";
    if (!phone.trim() || !/^[0-9\-]{9,13}$/.test(phone.replace(/\s/g, ""))) e.phone = "연락처를 입력해주세요. (예: 010-1234-5678)";
    if (!motivation) e.motivation = "신청 동기를 선택해주세요.";
    if (!agree) e.agree = "개인정보 수집에 동의해주세요.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep("done");
  }

  /* ── 완료 화면 ── */
  if (step === "done") {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-5 py-16">
          <div className="max-w-[460px] w-full text-center">
            {/* 별 아이콘 */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--sv)", boxShadow: "0 8px 22px rgba(244,211,94,.35)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            <h1 className="text-[26px] font-bold text-navy-900 leading-snug mb-3">
              신청이 완료됐어요
            </h1>
            <p className="text-[14px] text-navy-500 leading-[1.85] mb-2">
              <b className="text-navy-800">{name}</b>님은 이제
            </p>
            <p className="text-[14px] text-navy-500 leading-[1.85] mb-8">
              <b className="text-navy-800">{artist.name}</b> 작가의{" "}
              <b className="text-navy-800">{artist.totalSponsors !== undefined ? artist.totalSponsors + 1 : ""}번째 테오</b>입니다.
            </p>

            {/* 작가 미니 프로필 */}
            <div
              className="flex items-center gap-3 bg-card border border-line rounded-2xl px-4 py-3.5 mb-8 text-left"
              style={{ boxShadow: "0 4px 14px rgba(13,59,102,.06)" }}
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0">
                <Image src={artist.profileImage} alt={artist.name} fill sizes="44px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-navy-900 text-[14px]">{artist.name}</p>
                <p className="text-[12px] text-navy-500 mt-0.5 line-clamp-1">{artist.oneLiner}</p>
              </div>
              {project && (
                <div className="shrink-0 text-right">
                  <p className="text-[11px] text-navy-400 mb-0.5">달성률</p>
                  <p className="text-[14px] font-bold text-navy-800">{pct}%</p>
                </div>
              )}
            </div>

            <p className="text-[12px] text-navy-400 mb-6 leading-relaxed">
              입력하신 이메일(<b className="text-navy-600">{email}</b>)로<br />
              확인 안내를 보내드릴게요. 창작 과정 편지도 곧 도착합니다.
            </p>

            <div className="flex flex-col gap-2.5">
              <Link
                href={`/atelier/${artist.slug}`}
                className="block w-full text-center text-[13.5px] font-bold bg-navy-800 text-chiffon py-3 rounded-xl hover:bg-navy-700 transition-colors"
              >
                {artist.name} 작가 아틀리에 보기
              </Link>
              <Link
                href="/atelier"
                className="block w-full text-center text-[13px] text-navy-500 border border-navy-200 py-3 rounded-xl hover:bg-navy-100 transition-colors"
              >
                다른 작가 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── 신청 폼 ── */
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />

      <div className="max-w-[580px] w-full mx-auto px-5 md:px-8 py-10 flex flex-col">

        {/* 뒤로 */}
        <Link href={`/atelier/${artist.slug}`} className="text-[12.5px] text-navy-400 hover:text-navy-700 transition-colors mb-8 inline-block">
          ← {artist.name} 아틀리에로
        </Link>

        {/* 작가 헤더 */}
        <div
          className="flex items-center gap-3.5 bg-card border border-line rounded-2xl px-4 py-3.5 mb-8"
          style={{ boxShadow: "0 4px 14px rgba(13,59,102,.06)" }}
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <Image src={artist.profileImage} alt={artist.name} fill sizes="48px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold tracking-[0.16em] text-navy-400 uppercase mb-0.5">후원 신청</p>
            <p className="font-bold text-navy-900 text-[15px] leading-tight">{artist.name}</p>
            <p className="text-[12px] text-navy-500 mt-0.5 line-clamp-1">{project?.title ?? artist.oneLiner}</p>
          </div>
          {project && (
            <div className="shrink-0 text-right">
              <p className="text-[11px] text-navy-400 mb-0.5">현재 달성</p>
              <p className="text-[16px] font-bold text-navy-800">{pct}%</p>
            </div>
          )}
        </div>

        <h1 className="text-[22px] font-bold text-navy-900 leading-snug mb-1">
          후원자 정보를 입력해주세요
        </h1>
        <p className="text-[13px] text-navy-500 mb-8 leading-relaxed">
          재료는 테오가 안전하게 중개해 작가에게 전달합니다.<br />
          작가에게 배송지나 개인정보는 공개되지 않아요.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* 이름 */}
          <div>
            <FieldLabel required>이름</FieldLabel>
            <Input placeholder="홍길동" value={name} onChange={setName} maxLength={30} />
            {errors.name && <p className="text-[11.5px] text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* 이메일 */}
          <div>
            <FieldLabel required>이메일</FieldLabel>
            <Input type="email" placeholder="hello@example.com" value={email} onChange={setEmail} />
            {errors.email && <p className="text-[11.5px] text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* 연락처 */}
          <div>
            <FieldLabel required>연락처</FieldLabel>
            <Input type="tel" placeholder="010-1234-5678" value={phone} onChange={setPhone} maxLength={13} />
            {errors.phone && <p className="text-[11.5px] text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* 신청 동기 */}
          <div>
            <FieldLabel required>신청 동기</FieldLabel>
            <div className="flex flex-col gap-2">
              {MOTIVATION_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                    motivation === opt
                      ? "border-navy-700 bg-navy-800/5"
                      : "border-navy-200 bg-paper hover:border-navy-400"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                      motivation === opt ? "border-navy-800 bg-navy-800" : "border-navy-300"
                    }`}
                  >
                    {motivation === opt && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    )}
                  </span>
                  <input
                    type="radio"
                    name="motivation"
                    value={opt}
                    checked={motivation === opt}
                    onChange={() => setMotivation(opt)}
                    className="sr-only"
                  />
                  <span className="text-[13px] text-navy-800">{opt}</span>
                </label>
              ))}
            </div>
            {errors.motivation && <p className="text-[11.5px] text-red-500 mt-1">{errors.motivation}</p>}
          </div>

          {/* 작가에게 한마디 */}
          <div>
            <FieldLabel>작가에게 한마디 <span className="text-navy-400 font-normal">(선택)</span></FieldLabel>
            <textarea
              placeholder={`${artist.name} 작가에게 전하고 싶은 말을 자유롭게 적어주세요. 편지와 함께 전달돼요.`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={300}
              rows={4}
              className="w-full text-[13.5px] text-navy-900 placeholder:text-navy-300 bg-paper border border-navy-200 rounded-xl px-4 py-3 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-200 transition-all resize-none font-myeongjo leading-[1.9]"
            />
            <p className="text-[11px] text-navy-400 text-right mt-1">{message.length}/300</p>
          </div>

          {/* 동의 */}
          <label className="flex items-start gap-3 cursor-pointer">
            <span
              className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                agree ? "border-navy-800 bg-navy-800" : "border-navy-300"
              }`}
              onClick={() => setAgree((p) => !p)}
            >
              {agree && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </span>
            <input type="checkbox" checked={agree} onChange={() => setAgree((p) => !p)} className="sr-only" />
            <span className="text-[12.5px] text-navy-600 leading-relaxed">
              <b className="text-navy-800">개인정보 수집·이용에 동의</b>합니다.
              <span className="text-navy-400 block mt-0.5 text-[11.5px]">
                수집 항목: 이름, 이메일, 연락처 / 목적: 후원 신청 처리 / 보관: 후원 완료 후 1년
              </span>
            </span>
          </label>
          {errors.agree && <p className="text-[11.5px] text-red-500 -mt-3">{errors.agree}</p>}

          {/* 제출 */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full text-[14px] font-bold bg-navy-800 text-chiffon py-3.5 rounded-xl hover:bg-navy-700 transition-colors"
              style={{ boxShadow: "0 4px 14px rgba(13,59,102,.2)" }}
            >
              신청 완료하기
            </button>
            <p className="text-[11.5px] text-navy-400 text-center mt-3 leading-relaxed">
              재료값 전액이 작가에게 전달됩니다. 작가 수수료는 0%예요.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
