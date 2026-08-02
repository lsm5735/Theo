"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type Tab = "theo" | "gogh";

/* ── 테오(후원자) 스텝 ── */
const THEO_STEPS = [
  {
    step: "01",
    label: "작가 탐색",
    title: "취향에 맞는 작가를 찾는다",
    body: "아틀리에에서 20명의 신진 작가를 둘러보거나, 테오 봇에게 느낌으로 말해보세요. '밝고 따뜻한', '거친 붓질' 같은 단어로 취향에 맞는 작가를 추천받을 수 있습니다.",
    detail: [
      "장르·재료·분위기 필터로 탐색",
      "테오 봇 AI 취향 매칭",
      "작가 노트와 작업 과정 미리 읽기",
    ],
    cta: { label: "아틀리에 보기", href: "/atelier" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    step: "02",
    label: "재료 선물",
    title: "후원할 재료를 골라 선물한다",
    body: "작가가 이번 작품에 필요한 재료 목록 중 하나를 골라 선물합니다. 2~4만 원대로 시작할 수 있어요. Dear Gogh 메시지를 함께 보낼 수 있고, 작가의 배송지는 절대 공개되지 않습니다.",
    detail: [
      "낱개 재료 단위로 선택 가능",
      "Dear Gogh 메시지 첨부 (선택)",
      "작가 주소 비공개 — 테오가 안전 중개",
      "재료값 전액 작가 전달, 작가 수수료 0%",
    ],
    cta: { label: "후원 신청해보기", href: "/atelier" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
  },
  {
    step: "03",
    label: "전달 추적",
    title: "재료가 작가에게 도착하는 것을 확인한다",
    body: "후원 완료 → 재료 준비 중 → 가는 중 → 작가가 받았어요. 4단계로 재료가 작가에게 실제로 전달되는 과정을 확인할 수 있습니다. 마이테오에서 언제든 확인하세요.",
    detail: [
      "실시간 4단계 배송 상태 확인",
      "마이테오 대시보드에서 한눈에 보기",
      "후원 내역 타임라인 자동 기록",
    ],
    cta: { label: "마이테오 보기", href: "/my" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    ),
  },
  {
    step: "04",
    label: "편지 수신",
    title: "작가의 창작 편지를 받는다",
    body: "재료를 받은 작가는 Dear Theo 편지에 창작 과정을 담아 보내줍니다. 물감을 짜는 냄새, 캔버스 앞에서의 고민, 완성 직전의 설렘 — 작가만 아는 이야기가 편지로 도착합니다.",
    detail: [
      "작가 육필 감성의 Dear Theo 편지",
      "작업 과정 사진 포함",
      "편지 아카이브 영구 보관",
    ],
    cta: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    step: "05",
    label: "작품 완성",
    title: "완성된 작품에 내 이름이 남는다",
    body: "내가 보낸 재료로 완성된 작품을 만납니다. 작품 캡션에 후원자 이름이 남고, 작가가 판매를 선택하면 후원자에게 먼저 살 기회가 열립니다. 오픈 스튜디오·전시에 지인 1명과 함께 초대받을 수 있어요.",
    detail: [
      "작품 캡션에 후원자 닉네임 기재",
      "판매 작품 선구매 우선권",
      "오픈 스튜디오 초대 (지인 1인 동반 가능)",
      "씨앗→해바라기→밀밭→별밤 배지 시스템",
    ],
    cta: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
];

/* ── 고흐(작가) 스텝 ── */
const GOGH_STEPS = [
  {
    step: "01",
    label: "프로젝트 등록",
    title: "그릴 작품과 필요한 재료를 등록한다",
    body: "지금 시작하려는 작품의 구상을 소개하고, 완성에 필요한 재료 목록을 올립니다. 재료값 합계가 그 작품의 목표 금액이 됩니다. 작가 수수료는 0%입니다.",
    detail: [
      "작품 개념·스케치 이미지 업로드",
      "재료 낱개 단위로 목록 구성",
      "목표 금액 = 재료값 합계 자동 산정",
      "작가 수수료 0%, 재료값 전액 수령",
    ],
    cta: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    step: "02",
    label: "재료 수령",
    title: "배송지 비공개로 재료를 안전하게 받는다",
    body: "후원자가 재료를 선물하면 테오가 중개해 작가에게 전달합니다. 배송지는 후원자에게 절대 공개되지 않으며, 개인정보 노출 없이 재료를 받을 수 있습니다.",
    detail: [
      "배송지 완전 비공개 — 테오 중개",
      "Dear Gogh 메시지 함께 전달",
      "수령 확인 시 후원자에게 자동 알림",
    ],
    cta: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    step: "03",
    label: "창작",
    title: "받은 재료로 작품을 완성한다",
    body: "받은 재료로 작업합니다. 서두를 필요 없어요. 작업 기간 동안 과정 사진을 기록해두면 Dear Theo 편지에 담기 좋습니다. 후원자는 작가가 작업하는 동안 배송 상태를 확인할 수 있습니다.",
    detail: [
      "작업 기간 자유롭게 설정",
      "중간 과정 업데이트 가능",
      "커뮤니티 프로그램 참여 (라이브 페인팅·오픈 스튜디오)",
    ],
    cta: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
  },
  {
    step: "04",
    label: "Dear Theo 편지",
    title: "창작 과정을 편지로 후원자에게 보낸다",
    body: "재료를 선물해준 테오에게 Dear Theo 편지를 씁니다. 작업하면서 느낀 것, 재료가 화면에서 어떻게 달라졌는지, 완성 직전의 순간 — 작가만이 쓸 수 있는 이야기를 담아주세요.",
    detail: [
      "자유 형식 텍스트 + 과정 사진",
      "작품 완성 전후 언제든 전송 가능",
      "후원자 타임라인에 영구 보관",
      "편지는 후원자만 열람 가능",
    ],
    cta: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    step: "05",
    label: "완성 & 아카이브",
    title: "작품이 아카이브에 남고 후원자를 초대한다",
    body: "완성된 작품은 아틀리에 아카이브에 남습니다. 작품 캡션에 후원자 이름이 기재되며, 판매를 원하면 후원자에게 선구매 우선권이 주어집니다. 오픈 스튜디오·전시에 후원자를 초대할 수 있어요.",
    detail: [
      "완성작 아카이브 영구 보관",
      "작품 캡션 후원자 이름 기재",
      "판매 여부 작가가 직접 결정",
      "후원자 선구매·전시 초대 설정 가능",
    ],
    cta: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

/* ── FAQ ── */
const THEO_FAQ = [
  { q: "후원 최소 금액은 얼마인가요?", a: "재료 하나 단위로 선물할 수 있으며, 2만 원대부터 시작할 수 있습니다. 작가마다 재료 구성이 달라 금액이 다를 수 있습니다." },
  { q: "작가 주소가 공개되나요?", a: "절대 공개되지 않습니다. 테오가 안전하게 중개하며, 작가와 후원자 모두 서로의 주소를 알 수 없습니다." },
  { q: "편지는 언제 받을 수 있나요?", a: "재료가 작가에게 도착한 후, 작가가 창작 과정 중 또는 작품 완성 후에 편지를 보냅니다. 작업 기간에 따라 수 주에서 수개월이 걸릴 수 있습니다." },
  { q: "후원한 작품이 팔리면 수익을 나눠 받나요?", a: "수익 배분은 없습니다. 대신 판매 작품에 대한 선구매 우선권과 작품 캡션 기재, 전시 초대 등 비금전적 특권이 주어집니다." },
  { q: "환불이 가능한가요?", a: "재료가 발송 전 단계라면 환불 요청이 가능합니다. 발송 후에는 취소가 어려우며, 이 경우 고객센터로 문의해주세요." },
];

const GOGH_FAQ = [
  { q: "작가 수수료가 정말 0%인가요?", a: "네. 재료값 전액이 작가에게 전달됩니다. 플랫폼 수익은 제휴 화방 커미션 5~10%와 결제 수수료 3%(후원자 부담)로 운영됩니다." },
  { q: "배송지가 공개되나요?", a: "배송지는 후원자에게 공개되지 않습니다. 테오가 안전하게 중개하므로 개인정보 노출 없이 재료를 수령할 수 있습니다." },
  { q: "재료는 직접 구매할 수 없나요?", a: "현재는 테오 제휴 화방을 통해서만 구성됩니다. 특정 브랜드나 규격이 필요하다면 프로젝트 등록 시 재료 설명에 명시해주세요." },
  { q: "편지는 꼭 써야 하나요?", a: "의무는 아니지만 강력히 권장합니다. 후원자와의 관계를 만드는 핵심 경험이며, 편지를 보낸 작가일수록 다음 후원이 더 빨리 모입니다." },
  { q: "프로젝트를 여러 개 동시에 운영할 수 있나요?", a: "현재 베타 단계에서는 작가당 동시 활성 프로젝트 1개를 권장합니다. 완성 후 새 프로젝트를 시작하는 방식으로 운영해주세요." },
];

function StepCard({ s, index, accent }: { s: typeof THEO_STEPS[0]; index: number; accent: string }) {
  return (
    <div className="relative flex gap-5 md:gap-8">
      {/* 세로 타임라인 선 */}
      {index < 4 && (
        <div className="absolute left-[19px] top-[52px] bottom-0 w-px bg-navy-100" style={{ zIndex: 0 }} />
      )}

      {/* 스텝 번호 원 */}
      <div
        className="relative z-10 w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-[11px] font-black"
        style={{ background: accent === "gold" ? "var(--sv)" : "var(--navy-800)", color: accent === "gold" ? "var(--ink)" : "var(--chiffon)" }}
      >
        {s.step}
      </div>

      {/* 내용 */}
      <div className="flex-1 pb-10">
        <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: accent === "gold" ? "var(--sv-deep)" : "var(--navy-400)" }}>
          {s.label}
        </p>
        <h3 className="text-[17px] font-bold text-navy-900 leading-snug mb-2.5">{s.title}</h3>
        <p className="text-[13.5px] text-navy-600 leading-[1.9] mb-3">{s.body}</p>

        <ul className="space-y-1.5 mb-4">
          {s.detail.map((d) => (
            <li key={d} className="flex items-start gap-2 text-[12.5px] text-navy-700">
              <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent === "gold" ? "var(--sv-deep)" : "var(--navy-500)" }} />
              {d}
            </li>
          ))}
        </ul>

        {s.cta && (
          <Link
            href={s.cta.href}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold border rounded-lg px-3.5 py-2 transition-colors hover:bg-navy-800 hover:text-chiffon hover:border-navy-800"
            style={{ borderColor: "var(--navy-300)", color: "var(--navy-700)" }}
          >
            {s.cta.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </Link>
        )}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-100 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="text-[13.5px] font-semibold text-navy-900">{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className="shrink-0 transition-transform duration-200 text-navy-400"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <p className="text-[13px] text-navy-600 leading-[1.85] pb-4">{a}</p>
      )}
    </div>
  );
}

export default function HowPage() {
  const [tab, setTab] = useState<Tab>("theo");

  const steps = tab === "theo" ? THEO_STEPS : GOGH_STEPS;
  const faq   = tab === "theo" ? THEO_FAQ   : GOGH_FAQ;
  const accent = tab === "theo" ? "gold" : "navy";

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* 히어로 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pt-14 pb-10">
        <p data-sr="fade" className="text-[11px] tracking-[0.24em] text-navy-400 font-semibold uppercase mb-3">
          HOW IT WORKS
        </p>
        <h1 data-sr="up" className="text-3xl md:text-[40px] font-bold text-navy-900 leading-tight mb-3">
          이용방법 안내
        </h1>
        <p data-sr="up" data-d="1" className="text-[14px] text-navy-500 leading-relaxed max-w-[520px]">
          테오는 후원자와 작가를 잇는 관계형 현물 후원 플랫폼입니다.
          <br className="hidden md:block" />
          나의 역할에 맞는 이용 흐름을 확인해보세요.
        </p>
      </section>

      {/* 탭 */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 mb-10">
        <div data-sr="up" data-d="2" className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setTab("theo")}
            className={`sm:w-[260px] text-[15px] px-8 py-4 rounded-xl ${tab === "theo" ? "nb-btn" : "nb-btn-outline"}`}
            style={{ flexDirection: "column" }}
          >
            <span className="font-black">나는 테오입니다</span>
            <span className="text-[11px] font-semibold opacity-60 mt-0.5 block">후원자로 시작하기</span>
          </button>
          <button
            onClick={() => setTab("gogh")}
            className={`sm:w-[260px] text-[15px] px-8 py-4 rounded-xl ${tab === "gogh" ? "nb-btn" : "nb-btn-outline"}`}
            style={{ flexDirection: "column" }}
          >
            <span className="font-black">나는 고흐입니다</span>
            <span className="text-[11px] font-semibold opacity-50 mt-0.5 block">작가로 시작하기</span>
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 items-start">

          {/* 스텝 타임라인 */}
          <div>
            <div
              data-sr="up"
              className="rounded-2xl border border-line p-6 md:p-8 mb-8"
              style={{ background: "var(--card)", boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
            >
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-6"
                style={{ color: tab === "theo" ? "var(--sv-deep)" : "var(--navy-400)" }}>
                {tab === "theo" ? "테오(후원자) 이용 흐름" : "고흐(작가) 이용 흐름"}
              </p>
              {steps.map((s, i) => (
                <StepCard key={s.step} s={s} index={i} accent={accent} />
              ))}
            </div>

            {/* FAQ */}
            <div
              data-sr="up"
              data-d="1"
              className="rounded-2xl border border-line p-6 md:p-8"
              style={{ background: "var(--card)", boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
            >
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy-400 mb-5">자주 묻는 질문</p>
              {faq.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>

          {/* 사이드 요약 카드 */}
          <div className="space-y-4 md:sticky md:top-[72px]">

            {tab === "theo" ? (
              <>
                {/* 테오 혜택 요약 */}
                <div
                  data-sr="fade"
                  data-d="1"
                  className="rounded-2xl border border-line p-5"
                  style={{ background: "var(--card)", boxShadow: "0 4px 14px rgba(13,59,102,.06)" }}
                >
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--sv-deep)" }}>테오의 특권</p>
                  {[
                    "작품 캡션에 후원자 이름 기재",
                    "작가 육필 Dear Theo 편지 수신",
                    "완성작 선구매 우선권",
                    "오픈 스튜디오·전시 초대 (지인 1인 동반)",
                    "씨앗→해바라기→밀밭→별밤 배지",
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-2.5 mb-3 last:mb-0">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--sv-deep)" }} />
                      <span className="text-[13px] text-navy-700 leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>

                {/* 비용 구조 */}
                <div
                  data-sr="fade"
                  data-d="2"
                  className="rounded-2xl border border-line p-5"
                  style={{ background: "var(--card)", boxShadow: "0 4px 14px rgba(13,59,102,.06)" }}
                >
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-navy-400 mb-4">비용 구조</p>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-500">재료값</span>
                      <span className="font-bold text-navy-800">100% 작가에게</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-500">결제 수수료</span>
                      <span className="font-semibold text-navy-700">3% (후원자 부담)</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-500">작가 수수료</span>
                      <span className="font-bold" style={{ color: "var(--sv-deep)" }}>0%</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/atelier"
                  className="block w-full text-center text-[13.5px] font-bold bg-navy-800 text-chiffon py-3.5 rounded-xl hover:bg-navy-700 transition-colors"
                  style={{ boxShadow: "0 4px 14px rgba(13,59,102,.2)" }}
                >
                  아틀리에에서 작가 찾기 →
                </Link>
                <Link
                  href="/bot"
                  className="block w-full text-center text-[13px] font-semibold border border-navy-200 text-navy-700 py-3 rounded-xl hover:bg-navy-100 transition-colors"
                >
                  테오 봇으로 취향 매칭 →
                </Link>
              </>
            ) : (
              <>
                {/* 고흐 혜택 요약 */}
                <div
                  data-sr="fade"
                  data-d="1"
                  className="rounded-2xl border border-line p-5"
                  style={{ background: "var(--card)", boxShadow: "0 4px 14px rgba(13,59,102,.06)" }}
                >
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-navy-400 mb-4">작가에게 좋은 이유</p>
                  {[
                    "수수료 0% — 재료값 전액 수령",
                    "배송지 완전 비공개 — 개인정보 안전",
                    "팬과 창작으로 연결되는 관계",
                    "아카이브에 작품 영구 보관",
                    "커뮤니티 프로그램 참여 기회",
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-2.5 mb-3 last:mb-0">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--navy-500)" }} />
                      <span className="text-[13px] text-navy-700 leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>

                {/* 수익 구조 */}
                <div
                  data-sr="fade"
                  data-d="2"
                  className="rounded-2xl border border-line p-5"
                  style={{ background: "var(--card)", boxShadow: "0 4px 14px rgba(13,59,102,.06)" }}
                >
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-navy-400 mb-4">수익 구조</p>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-500">작가 수수료</span>
                      <span className="font-bold" style={{ color: "var(--sv-deep)" }}>0%</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-500">재료값</span>
                      <span className="font-bold text-navy-800">전액 작가 수령</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy-500">플랫폼 수익</span>
                      <span className="text-navy-600">화방 커미션 5~10%</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/onboarding/artist"
                  className="block w-full text-center text-[13.5px] font-bold bg-navy-800 text-chiffon py-3.5 rounded-xl hover:bg-navy-700 transition-colors"
                  style={{ boxShadow: "0 4px 14px rgba(13,59,102,.2)" }}
                >
                  작가로 시작하기 →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
