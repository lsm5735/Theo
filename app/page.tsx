import Link from "next/link";
import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* ─── HERO ─── */}
      <section className="bg-[--navy-800] text-white overflow-hidden relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_60%_40%,#F4D35E_0%,transparent_60%)]" />

        <div className="relative max-w-[1080px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="text-[--sv] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              관계형 현물 후원 플랫폼
            </p>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
              모두의 고흐가<br />되기 전,<br />
              <span className="text-[--sv]">나만의 고흐</span>를<br />만난다.
            </h1>

            {/* Sub */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              작품을 사는 대신 창작에 필요한 재료를 선물하세요.
              개인정보 노출 없이 전달되고, 작가는 그 과정을 편지로 답합니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                href="#artists"
                className="inline-flex items-center gap-2 bg-[--sv] text-[--ink] font-bold px-6 py-3.5 rounded-lg hover:bg-[--sv-soft] transition-colors text-sm md:text-base"
              >
                나는 테오 — 후원자로 시작
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm md:text-base"
              >
                나는 고흐 — 작가로 시작
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 border-t border-white/10 pt-8">
              {[
                { value: "2~4만원", label: "1회 후원 금액" },
                { value: `${artists.length}명`, label: "현재 참여 작가" },
                { value: "0%", label: "작가 수수료" },
                { value: "100%", label: "재료에 전달" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-[--sv]">{s.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-[--sv-deep] text-xs font-bold tracking-[0.2em] uppercase mb-3">HOW IT WORKS</p>
          <h2 className="text-2xl md:text-3xl font-black text-[--navy-800]">어떻게 작동하나요?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: "🔍",
              title: "작가를 탐색하고",
              desc: "장르·감성 태그로 나에게 맞는 신진 작가와 진행 중인 프로젝트를 발견합니다.",
            },
            {
              step: "02",
              icon: "🎁",
              title: "재료를 선물하면",
              desc: "작가의 위시리스트에서 재료를 선택해 선물합니다. 작가 주소는 노출되지 않습니다.",
            },
            {
              step: "03",
              icon: "✉️",
              title: "편지가 도착합니다",
              desc: "재료를 받은 작가가 창작 과정을 사진과 함께 편지로 전합니다. Dear Theo.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-xl p-8 border border-navy-100 shadow-card relative overflow-hidden"
            >
              <p className="absolute top-4 right-5 text-6xl font-black text-navy-100 select-none leading-none">
                {item.step}
              </p>
              <span className="text-3xl mb-5 block">{item.icon}</span>
              <h3 className="text-lg font-bold text-[--navy-800] mb-2">{item.title}</h3>
              <p className="text-sm text-[--muted] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUST BAND ─── */}
      <section className="bg-navy-100 py-10">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "🔒", title: "주소 비공개", desc: "작가의 배송지는 절대 공개되지 않습니다" },
              { icon: "📦", title: "전달 4단계 확인", desc: "후원 → 발주 → 발송 → 수령까지 추적" },
              { icon: "💰", title: "작가 수수료 0%", desc: "재료값 전액이 작가에게 전달됩니다" },
              { icon: "✉️", title: "관계가 편지로", desc: "일회성 후원이 아닌 지속적 관계" },
            ].map((t) => (
              <div key={t.title} className="py-4">
                <span className="text-2xl block mb-2">{t.icon}</span>
                <p className="text-sm font-bold text-[--navy-800] mb-1">{t.title}</p>
                <p className="text-xs text-[--navy-600] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARTIST LISTING ─── */}
      <section id="artists" className="max-w-[1080px] mx-auto px-5 md:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[--sv-deep] text-xs font-bold tracking-[0.2em] uppercase mb-2">ATELIER</p>
            <h2 className="text-2xl md:text-3xl font-black text-[--navy-800]">지금 후원 가능한 작가</h2>
          </div>
          <span className="text-sm text-[--muted]">총 {artists.length}명</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* ─── BADGE SECTION ─── */}
      <section className="bg-[--navy-900] text-white py-20">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8 text-center">
          <p className="text-[--sv] text-xs font-bold tracking-[0.2em] uppercase mb-3">THEO BADGE</p>
          <h2 className="text-2xl md:text-3xl font-black mb-4">후원할수록 쌓이는 나의 이야기</h2>
          <p className="text-white/60 text-sm mb-12 max-w-md mx-auto leading-relaxed">
            유명해지기 전에 먼저 알아본 사람. 그 기록이 배지로 남습니다.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "씨앗", icon: "🌱", cond: "첫 후원 1회", desc: "Dear Theo 수신 시작" },
              { name: "해바라기", icon: "🌻", cond: "누적 10만원 or 3회", desc: "신작 48시간 선공개" },
              { name: "밀밭", icon: "🌾", cond: "누적 30만원", desc: "오픈스튜디오 우선 신청" },
              { name: "별밤", icon: "⭐", cond: "누적 100만원", desc: "전시 오프닝 초대" },
            ].map((b, i) => (
              <div
                key={b.name}
                className={`rounded-xl p-6 border ${i === 0 ? "border-[--sv]/60 bg-white/5" : "border-white/10 bg-white/5"}`}
              >
                <span className="text-3xl block mb-3">{b.icon}</span>
                <p className="font-bold text-sm mb-1">{b.name}</p>
                <p className="text-[--sv] text-xs mb-2 font-medium">{b.cond}</p>
                <p className="text-white/50 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="bg-[--navy-800] text-white py-20 text-center">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <p className="text-[--sv] text-xs font-bold tracking-[0.2em] uppercase mb-4">지금 시작하세요</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            작가에게 첫 번째 별이 되어 주세요
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-10 max-w-sm mx-auto leading-relaxed">
            아직 아무도 모르는 그 작가가,<br />나만의 고흐가 됩니다.
          </p>
          <Link
            href="#artists"
            className="inline-flex items-center gap-2 bg-[--sv] text-[--ink] font-bold px-8 py-4 rounded-lg hover:bg-[--sv-soft] transition-colors text-base"
          >
            작가 탐색하기 →
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[--navy-900] text-white/40 py-10">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[--sv-soft] flex items-center justify-center">
              <span className="text-[--navy-800] font-black text-[9px]">T</span>
            </div>
            <span className="font-bold tracking-widest text-white/60">THEO</span>
          </div>
          <p>© 2026 Theo. 이 화면은 시연용 데모입니다.</p>
          <div className="flex gap-4">
            <span className="hover:text-white/60 cursor-pointer">이용약관</span>
            <span className="hover:text-white/60 cursor-pointer">개인정보처리방침</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
