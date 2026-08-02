"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type Step = "form" | "done";

export default function PartnershipPage() {
  const [step, setStep] = useState<Step>("form");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const CATEGORIES = [
    "화방·미술 재료 제휴",
    "전시·갤러리 협력",
    "커뮤니티·이벤트 공동 기획",
    "미디어·콘텐츠 협력",
    "기술·서비스 제휴",
    "기타 문의",
  ];

  function validate() {
    const e: Record<string, string> = {};
    if (!company.trim()) e.company = "회사명을 입력해주세요.";
    if (!name.trim()) e.name = "담당자 이름을 입력해주세요.";
    if (!phone.trim() || !/^[0-9\-]{9,13}$/.test(phone.replace(/\s/g, "")))
      e.phone = "연락처를 입력해주세요. (예: 02-1234-5678)";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "올바른 이메일을 입력해주세요.";
    if (!category) e.category = "문의 유형을 선택해주세요.";
    if (!message.trim() || message.trim().length < 20)
      e.message = "문의 내용을 20자 이상 입력해주세요.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-5 py-20">
          <div className="max-w-[480px] w-full text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--navy-800)", boxShadow: "0 8px 22px rgba(13,59,102,.25)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--chiffon)" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-[26px] font-bold text-navy-900 mb-3">문의가 접수됐습니다</h1>
            <p className="text-[14px] text-navy-500 leading-[1.85] mb-2">
              <b className="text-navy-800">{company}</b> · <b className="text-navy-800">{name}</b> 담당자님,
            </p>
            <p className="text-[14px] text-navy-500 leading-[1.85] mb-8">
              검토 후 <b className="text-navy-800">{email}</b>로 영업일 3일 이내 회신드리겠습니다.
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/"
                className="block w-full text-center text-[13.5px] font-bold bg-navy-800 text-chiffon py-3.5 rounded-xl hover:bg-navy-700 transition-colors"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />

      <div className="max-w-[600px] w-full mx-auto px-5 md:px-8 py-10">
        <Link href="/" className="text-[12.5px] text-navy-400 hover:text-navy-700 transition-colors mb-8 inline-block">
          ← 홈으로
        </Link>

        <p className="text-[11px] tracking-[0.24em] text-navy-400 font-semibold uppercase mb-3">PARTNERSHIP</p>
        <h1 className="text-[28px] font-bold text-navy-900 leading-snug mb-2">제휴 문의</h1>
        <p className="text-[13.5px] text-navy-500 leading-relaxed mb-10">
          화방·갤러리·미디어·기술 파트너십, 공동 기획 등 다양한 협력을 환영합니다.<br />
          문의 내용을 남겨주시면 영업일 3일 이내 회신드립니다.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* 회사명 */}
          <div>
            <label className="block text-[12.5px] font-bold text-navy-700 mb-1.5">
              회사명 <span className="text-[#C2A43F]">*</span>
            </label>
            <input
              type="text"
              placeholder="(주)테오 파트너스"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={60}
              className="w-full text-[13.5px] text-navy-900 placeholder:text-navy-300 bg-paper border border-navy-200 rounded-xl px-4 py-3 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-200 transition-all"
            />
            {errors.company && <p className="text-[11.5px] text-red-500 mt-1">{errors.company}</p>}
          </div>

          {/* 담당자 이름 */}
          <div>
            <label className="block text-[12.5px] font-bold text-navy-700 mb-1.5">
              담당자 이름 <span className="text-[#C2A43F]">*</span>
            </label>
            <input
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="w-full text-[13.5px] text-navy-900 placeholder:text-navy-300 bg-paper border border-navy-200 rounded-xl px-4 py-3 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-200 transition-all"
            />
            {errors.name && <p className="text-[11.5px] text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* 연락처 + 이메일 (2열) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12.5px] font-bold text-navy-700 mb-1.5">
                연락처 <span className="text-[#C2A43F]">*</span>
              </label>
              <input
                type="tel"
                placeholder="02-1234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={13}
                className="w-full text-[13.5px] text-navy-900 placeholder:text-navy-300 bg-paper border border-navy-200 rounded-xl px-4 py-3 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-200 transition-all"
              />
              {errors.phone && <p className="text-[11.5px] text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-[12.5px] font-bold text-navy-700 mb-1.5">
                이메일 <span className="text-[#C2A43F]">*</span>
              </label>
              <input
                type="email"
                placeholder="partner@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[13.5px] text-navy-900 placeholder:text-navy-300 bg-paper border border-navy-200 rounded-xl px-4 py-3 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-200 transition-all"
              />
              {errors.email && <p className="text-[11.5px] text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* 문의 유형 */}
          <div>
            <label className="block text-[12.5px] font-bold text-navy-700 mb-1.5">
              문의 유형 <span className="text-[#C2A43F]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                    category === cat
                      ? "border-navy-700 bg-navy-800/5"
                      : "border-navy-200 bg-paper hover:border-navy-400"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                      category === cat ? "border-navy-800 bg-navy-800" : "border-navy-300"
                    }`}
                  >
                    {category === cat && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                  </span>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="sr-only"
                  />
                  <span className="text-[12.5px] text-navy-800">{cat}</span>
                </label>
              ))}
            </div>
            {errors.category && <p className="text-[11.5px] text-red-500 mt-1">{errors.category}</p>}
          </div>

          {/* 문의 내용 */}
          <div>
            <label className="block text-[12.5px] font-bold text-navy-700 mb-1.5">
              요청 및 문의 내용 <span className="text-[#C2A43F]">*</span>
            </label>
            <textarea
              placeholder="협력하고자 하는 내용, 제안 방식, 희망 일정 등을 자유롭게 작성해주세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={6}
              className="w-full text-[13.5px] text-navy-900 placeholder:text-navy-300 bg-paper border border-navy-200 rounded-xl px-4 py-3 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-200 transition-all resize-none leading-[1.85]"
            />
            <div className="flex justify-between mt-1">
              {errors.message
                ? <p className="text-[11.5px] text-red-500">{errors.message}</p>
                : <span />
              }
              <p className="text-[11px] text-navy-400 ml-auto">{message.length}/1000</p>
            </div>
          </div>

          {/* 제출 */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full text-[14px] font-bold bg-navy-800 text-chiffon py-3.5 rounded-xl hover:bg-navy-700 transition-colors"
              style={{ boxShadow: "0 4px 14px rgba(13,59,102,.2)" }}
            >
              문의 보내기
            </button>
            <p className="text-[11.5px] text-navy-400 text-center mt-3">
              제출된 정보는 제휴 검토 목적으로만 활용되며, 외부에 공개되지 않습니다.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
