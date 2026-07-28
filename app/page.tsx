import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";

/* ─── Hero underline SVG ─── */
function HeroUnderlineSvg() {
  return (
    <svg
      viewBox="0 0 280 30"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[-10px] right-[-10px] bottom-[-3px] h-[0.68em] w-[calc(100%+20px)] -z-10"
    >
      <defs>
        <filter id="bu1" x="-10%" y="-40%" width="120%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.07" numOctaves={3} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={3.8} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#bu1)">
        {/* 메인 하이라이트 면 */}
        <path d="M2 7 Q80 3 154 5 T278 4 L278 24 Q168 27 88 25 T2 26 Z" fill="#F4D35E" opacity="0.88" />
        {/* 상단 붓질 강조선 */}
        <path d="M8 6 Q120 2 272 5" fill="none" stroke="#F8D07A" strokeWidth="2" opacity={0.45} strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ─── Pen icon ─── */
function IconPen() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

/* ─── User icon ─── */
function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Home() {
  const featuredArtists = artists.slice(0, 3);
  const projectMap = Object.fromEntries(projects.map((p) => [p.artistId, p]));

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* ─── HERO ─── */}
      <header className="max-w-[1080px] mx-auto px-5 md:px-8" id="start">
        <div className="pt-14 md:pt-32 pb-0 text-center">

          {/* Headline */}
          <h1 className="font-bold text-[30px] sm:text-[42px] md:text-[60px] leading-[1.2] md:leading-[1.15] tracking-tight text-navy-900 mb-6 md:mb-10"
            style={{ wordBreak: 'keep-all' }}>
            모두의 고흐가 되기 전,<br />
            나만의{" "}
            <span className="relative inline-block italic text-navy-700">
              고흐
              <HeroUnderlineSvg />
            </span>를 만난다.
          </h1>

          {/* Subtext */}
          <p className="text-[14px] md:text-[17px] text-muted leading-[1.9] max-w-[560px] mx-auto mb-10 md:mb-14" style={{ wordBreak: 'keep-all' }}>
            반 고흐에게는 평생 그를 응원해준 동생 테오가 있었기에 세계가 사랑하는 명작이 탄생할 수 있었습니다.<br />
            세상이 알아보기 전, 당신이 먼저 발견한 예술가에게 재료를 선물하고, 위대한 작품이 태어나는 과정을 함께 만들어 보세요.
          </p>

          {/* Role selection */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-5 md:mb-6">
            <Link
              href="/onboarding/artist"
              className="group w-full sm:w-auto border-2 border-navy-800 text-navy-800 font-bold text-[14px] md:text-[15px] px-6 py-3.5 md:py-4 rounded-xl hover:bg-navy-800 hover:text-chiffon transition-all duration-200 text-center"
            >
              나는 <span className="text-navy-600 group-hover:text-sv transition-colors">고흐</span>입니다
              <span className="block text-xs font-normal text-muted group-hover:text-chiffon/70 mt-0.5 transition-colors">작가로 시작하기</span>
            </Link>
            <Link
              href="/bot"
              className="group w-full sm:w-auto bg-navy-800 text-chiffon font-bold text-[14px] md:text-[15px] px-6 py-3.5 md:py-4 rounded-xl hover:bg-navy-700 transition-all duration-200 text-center"
            >
              나는 <span className="text-sv">테오</span>입니다
              <span className="block text-xs font-normal text-chiffon/60 group-hover:text-chiffon/80 mt-0.5 transition-colors">후원자로 시작하기</span>
            </Link>
          </div>

          <p className="text-xs text-navy-400 mb-9">
            이미 계정이 있으신가요?{" "}
            <Link href="#" className="text-navy-600 font-semibold hover:underline">로그인</Link>
          </p>

        </div>
      </header>

      {/* ─── PROBLEM BAND ─── */}
      <section className="bg-navy-900 text-chiffon mt-16 py-24">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.24em] text-sv font-semibold uppercase mb-4">THE GAP</p>
            <h2 className="font-bold text-[28px] md:text-[32px] text-chiffon leading-[1.4] mb-5" style={{ wordBreak: 'keep-all' }}>
              미술 시장은 커지는데,<br />그 성장의 과실이 젊은 예술가에게 흐르지 않습니다
            </h2>
            <p className="text-[14.5px] leading-[1.9] max-w-[540px] mx-auto" style={{ color: 'rgba(250,240,202,.68)', wordBreak: 'keep-all' }}>
              전시 관람객은 매년 늘어나고 아트페어는 성황을 이루지만,
              정작 그 작품을 만든 신진 작가의 수입은 제자리입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fan */}
            <div className="rounded-[16px] p-8" style={{ background: 'rgba(250,240,202,.06)', border: '1px solid rgba(250,240,202,.14)' }}>
              <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center mb-5 text-chiffon">
                <IconUser />
              </div>
              <h4 className="text-[17px] font-bold text-chiffon mb-4" style={{ wordBreak: 'keep-all' }}>팬의 딜레마</h4>
              <p className="text-[14px] leading-[2.0]" style={{ color: 'rgba(250,240,202,.7)', wordBreak: 'keep-all' }}>
                전시를 찾아다니고, 인스타그램에서 작가를 팔로우하고, 작품을 스크랩합니다.
                응원하는 마음은 확실하지만 그 마음을 전할 방법이 없습니다.
                완성작을 사기엔 수십만 원이 부담스럽고, SNS 좋아요 한 번으로는 아무것도 전해지지 않는 것 같아 아쉽습니다.
                팬과 작가 사이에는 마음을 행동으로 옮길 수 있는 접점이 없습니다.
              </p>
            </div>

            {/* Artist */}
            <div className="rounded-[16px] p-8" style={{ background: 'rgba(250,240,202,.06)', border: '1px solid rgba(250,240,202,.14)' }}>
              <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center mb-5 text-chiffon">
                <IconPen />
              </div>
              <h4 className="text-[17px] font-bold text-chiffon mb-4" style={{ wordBreak: 'keep-all' }}>작가의 현실</h4>
              <p className="text-[14px] leading-[2.0]" style={{ color: 'rgba(250,240,202,.7)', wordBreak: 'keep-all' }}>
                새 작업을 시작하려면 재료비가 먼저 나갑니다.
                캔버스, 물감, 붓 — 작품이 팔리기 전까지는 전부 자비입니다.
                지원사업을 찾아보지만 경쟁률은 높고 서류는 많습니다.
                그래서 많은 신진 작가들이 창작보다 생계를 먼저 생각하게 되고,
                결국 작업을 멈추거나 속도를 줄입니다.
              </p>
            </div>
          </div>

          <p className="text-center mt-14 font-medium text-[18px] md:text-[22px] text-chiffon leading-[1.75]" style={{ wordBreak: 'keep-all' }}>
            THEO는 그 사이를 잇는 <em className="not-italic text-sv">현물 후원</em>을 설계했습니다.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-14 md:py-[82px] bg-paper" id="how">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.24em] text-navy-600 font-semibold uppercase mb-3">HOW IT WORKS</p>
            <h2 className="font-medium text-[26px] md:text-[36px] text-navy-900 leading-[1.35] mb-4">재료가 작품이 되기까지</h2>
            <p className="text-[14.5px] text-muted leading-[1.9] max-w-[480px] mx-auto" style={{ wordBreak: 'keep-all' }}>
              후원은 재료 낱개가 아니라 <strong className="text-navy-800">하나의 작품 프로젝트</strong>를 완성시키는 일입니다.
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 01 — Artist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] items-center">
              <div>
                <div className="flex items-center gap-[11px] mb-[18px]">
                  <b className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-bold text-navy-700" style={{ border: '1.5px solid var(--navy-300)' }}>01</b>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Artist</span>
                </div>
                <h3 className="font-medium text-[22px] md:text-[27px] text-navy-900 mb-[14px] leading-snug" style={{ wordBreak: 'keep-all' }}>
                  작가가 그릴 작품을 등록한다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]" style={{ wordBreak: 'keep-all' }}>
                  지금 시작하려는 작품의 구상과 <strong className="text-navy-800">필요한 재료 목록</strong>을 올립니다.
                  재료값 합계가 그 작품의 목표가 됩니다. 작가가 내는 수수료는 <strong className="text-navy-800">0%</strong>입니다.
                </p>
              </div>
              <div className="bg-navy-100 border border-navy-200 rounded-[18px] p-[26px] min-h-[262px] flex flex-col justify-center gap-3">
                {[
                  { grad: 'linear-gradient(145deg,var(--navy-700),var(--navy-900))', title: '코발트블루 유화물감 세트', note: '"밤 연작의 주조색이에요"', price: '32,000원' },
                  { grad: 'linear-gradient(145deg,#D8CBAA,#9B8A63)', title: '캔버스 천 10호 ×3', note: '"다음 장면의 바탕입니다"', price: '28,000원' },
                ].map((item) => (
                  <div key={item.title} className="bg-card border border-line rounded-xl p-3.5 shadow-card">
                    <div className="flex gap-3 items-center">
                      <div className="w-[46px] h-[46px] rounded-[9px] shrink-0" style={{ background: item.grad }} />
                      <div>
                        <h6 className="text-[12.5px] font-semibold text-navy-900">{item.title}</h6>
                        <p className="font-myeongjo text-[11px] text-muted mt-0.5">{item.note}</p>
                        <p className="font-semibold text-[13px] text-navy-700 mt-0.5">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 02 — Patron */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] items-center">
              <div className="order-2 md:order-1 rounded-[18px] p-[26px] min-h-[262px] flex flex-col justify-center gap-3" style={{ background: '#FCF6E2', border: '1px solid var(--line)' }}>
                <div className="bg-card border border-line rounded-xl p-4 shadow-card" style={{ border: '1.5px solid var(--navy-700)' }}>
                  <p className="text-[9.5px] tracking-[0.16em] text-navy-700 font-bold mb-2 uppercase">DEAR GOGH</p>
                  <p className="font-myeongjo text-[12.5px] text-navy-900 leading-[1.85]">
                    "밤 연작 응원해요. 이 파랑이 다음 그림의 하늘이 되면 좋겠어요."
                  </p>
                </div>
                <div className="bg-card border border-line rounded-xl p-3.5 shadow-card">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sv-soft flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 36 36" fill="none">
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                          <ellipse key={deg} cx="18" cy="8" rx="3" ry="5.5" fill="#F4D35E" opacity={0.85} transform={`rotate(${deg} 18 18)`} />
                        ))}
                        <circle cx="18" cy="18" r="6.5" fill="#C2A43F" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-bold text-gold-text">해바라기 배지까지</span>
                    <span className="ml-auto text-[10.5px] text-muted">8,000원</span>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-[11px] mb-[18px]">
                  <b className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-bold text-navy-700" style={{ border: '1.5px solid var(--navy-300)' }}>02</b>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Patron</span>
                </div>
                <h3 className="font-medium text-[22px] md:text-[27px] text-navy-900 mb-[14px] leading-snug" style={{ wordBreak: 'keep-all' }}>
                  재료를 선물하고 한마디를 남긴다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]" style={{ wordBreak: 'keep-all' }}>
                  2~4만 원대로 시작합니다. <strong className="text-navy-800">Dear Gogh</strong> 메시지를 함께 보내고, 작가의 배송지는 공개되지 않습니다.
                  후원이 쌓이면 밤하늘에 별처럼 <strong className="text-navy-800">배지</strong>가 켜집니다.
                </p>
              </div>
            </div>

            {/* Step 03 — Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] items-center">
              <div>
                <div className="flex items-center gap-[11px] mb-[18px]">
                  <b className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-bold text-navy-700" style={{ border: '1.5px solid var(--navy-300)' }}>03</b>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Process</span>
                </div>
                <h3 className="font-medium text-[22px] md:text-[27px] text-navy-900 mb-[14px] leading-snug" style={{ wordBreak: 'keep-all' }}>
                  전달을 확인하고, 편지로 답이 온다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]" style={{ wordBreak: 'keep-all' }}>
                  재료가 <strong className="text-navy-800">작가에게 도착했는지까지</strong> 4단계로 확인합니다.
                  작가는 그 재료로 작업한 과정을 <strong className="text-navy-800">Dear Theo</strong> 편지에 담아 보내고,
                  편지와 작업은 타임라인에 자동으로 쌓입니다.
                </p>
              </div>
              <div className="bg-navy-100 border border-navy-200 rounded-[18px] p-[26px] min-h-[262px] flex flex-col justify-center gap-3">
                {/* Delivery tracker */}
                <div className="bg-card border border-line rounded-xl p-3.5 shadow-card">
                  <div className="flex items-center gap-0 mt-1">
                    {[true, true, true, false].map((on, i) => (
                      <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className={`w-[11px] h-[11px] rounded-full shrink-0 ${on ? 'bg-sv' : 'bg-navy-200'}`} />
                        {i < 3 && <div className={`h-[2px] flex-1 ${on ? 'bg-sv-deep' : 'bg-navy-200'}`} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9.5px] text-muted mt-2">
                    <span>후원 완료</span>
                    <span>재료 준비</span>
                    <span className="font-bold text-navy-800">가는 중</span>
                    <span>작가 수령</span>
                  </div>
                </div>
                {/* Letter preview */}
                <div className="bg-card border border-line rounded-xl p-3.5 shadow-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9.5px] text-navy-400">2026.08.14</span>
                    <div className="w-[22px] h-[27px] rounded-sm" style={{ background: 'var(--sv-soft)', border: '1px solid var(--sv-deep)' }} />
                  </div>
                  <p className="font-myeongjo text-[11.5px] font-bold text-navy-900 mb-1">지수 테오님께,</p>
                  <p className="font-myeongjo text-[11.5px] text-navy-900 leading-[1.85]">
                    보내주신 코발트블루가 어제 도착했습니다. 뚜껑을 열자마자 세 번째 캔버스의 하늘부터 올렸어요.
                  </p>
                  <div className="rounded-md mt-2 h-[46px]" style={{ background: 'linear-gradient(155deg,#061A2E,var(--navy-700))' }} />
                </div>
              </div>
            </div>

            {/* Step 04 — Complete */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] items-center">
              <div className="order-2 md:order-1 rounded-[18px] p-[26px] min-h-[262px] flex flex-col justify-center gap-3" style={{ background: '#FCF6E2', border: '1px solid var(--line)' }}>
                <div className="bg-card border border-line rounded-xl overflow-hidden shadow-card">
                  <div className="relative" style={{ height: '104px', background: 'linear-gradient(150deg,#061A2E,var(--navy-700) 60%,var(--navy-500))' }}>
                    <span className="absolute bottom-[9px] left-3 text-[10.5px]" style={{ color: 'rgba(250,240,202,.9)' }}>밤 연작 No.3 · 완성</span>
                  </div>
                  <div className="p-3">
                    <p className="font-myeongjo text-[11.5px] text-muted leading-[1.7]">재료 후원 — 지수, 하나, 무늬</p>
                  </div>
                </div>
                <div className="bg-card border border-line rounded-xl p-3.5 shadow-card">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold text-gold-text">오픈스튜디오 초대</span>
                    <span className="ml-auto text-[10.5px] text-muted">후원자 + 지인 1인</span>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-[11px] mb-[18px]">
                  <b className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-bold text-navy-700" style={{ border: '1.5px solid var(--navy-300)' }}>04</b>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Complete</span>
                </div>
                <h3 className="font-medium text-[22px] md:text-[27px] text-navy-900 mb-[14px] leading-snug" style={{ wordBreak: 'keep-all' }}>
                  작품이 완성되면, 그 자리에 초대된다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]" style={{ wordBreak: 'keep-all' }}>
                  내가 보낸 물감으로 완성된 작품을 <strong className="text-navy-800">작품 캡션에 이름이 남은 채로</strong> 만납니다.
                  작가가 판매를 선택하면 후원자에게 <strong className="text-navy-800">먼저 살 기회</strong>가 열리고,
                  전시·아띠에는 <strong className="text-navy-800">지인 한 명</strong>과 함께 올 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OPEN PROJECTS ─── */}
      <section className="py-14 md:py-[82px] bg-paper" id="projects">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.24em] text-navy-600 font-semibold uppercase mb-3">OPEN PROJECTS</p>
            <h2 className="font-medium text-[36px] text-navy-900 leading-[1.35] mb-4">지금 시작되고 있는 작업</h2>
            <p className="text-[14.5px] text-muted leading-[1.9]">완성되기 전에 만나는 작품들입니다.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArtists.map((artist) => {
              const project = projectMap[artist.id];
              if (!project) return null;
              return <ArtistCard key={artist.id} artist={artist} project={project} />;
            })}
          </div>

          {artists.length > 3 && (
            <div className="text-center mt-10">
              <Link
                href="/atelier"
                className="inline-flex items-center gap-2 border border-navy-400 text-navy-700 font-semibold px-6 py-3 rounded-lg hover:border-navy-700 hover:bg-navy-100 transition-colors text-sm"
              >
                전체 작가 보기 ({artists.length}명) →
              </Link>
            </div>
          )}
        </div>

        {/* ─── Artband ─── */}
        <div className="mt-16 max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="h-[264px] rounded-[20px] relative overflow-hidden" style={{ background: 'linear-gradient(168deg,#061A2E 0%,#07223C 26%,#0D3B66 62%,#376590 108%)' }}>
            <div className="absolute rounded-full" style={{ width: '104px', height: '104px', top: '-22px', right: '8%', background: 'radial-gradient(circle,rgba(248,208,122,.85) 0 26%,rgba(244,211,94,.32) 48%,transparent 70%)' }} />
            {[{ top: '34px', left: '12%' },{ top: '96px', left: '27%' },{ top: '150px', left: '76%' },{ top: '52px', left: '64%' }].map((s, i) => (
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-sv-soft opacity-70" style={{ top: s.top, left: s.left }} />
            ))}
            <div className="absolute bottom-0" style={{ left: '5%', width: '18px', height: '80px', background: 'linear-gradient(180deg,#0a2f0a,#061A2E)', clipPath: 'polygon(50% 0%,100% 100%,0% 100%)', opacity: 0.6 }} />
            <div className="absolute bottom-0" style={{ left: '9%', width: '14px', height: '60px', background: 'linear-gradient(180deg,#0a2f0a,#061A2E)', clipPath: 'polygon(50% 0%,100% 100%,0% 100%)', opacity: 0.5 }} />
            <div
              className="absolute bg-paper rounded-[13px] p-[15px_17px] w-[220px] sm:w-[288px]"
              style={{ left: '50%', top: '44px', transform: 'translateX(-50%)', boxShadow: '0 18px 44px rgba(6,26,46,.42)' }}
            >
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center justify-center" style={{ width: '36px', height: '36px', border: '1px solid var(--navy-200)', borderRadius: '50%', transform: 'rotate(-9deg)' }}>
                  <span className="text-navy-400 text-[7px] leading-tight text-center">SEOUL<br />THEO</span>
                </div>
                <div className="flex items-center justify-center" style={{ width: '28px', height: '34px', background: 'var(--sv-soft)', border: '1px solid var(--sv-deep)', borderRadius: '2px' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h8M5 1v8" stroke="#C2A43F" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
              </div>
              <p className="font-myeongjo text-[11.5px] sm:text-[12.5px] text-navy-900 leading-[1.85]">
                "보내주신 코발트블루가 어제 도착했습니다. 밤 연작 세 번째 캔버스의 하늘부터 올렸어요…"
              </p>
            </div>
            <div className="absolute bg-paper rounded-[13px] p-[15px_17px] hidden sm:block" style={{ right: '5%', bottom: '20px', width: '186px', boxShadow: '0 18px 44px rgba(6,26,46,.42)' }}>
              <div className="rounded-lg mb-2.5" style={{ height: '56px', background: 'linear-gradient(150deg,var(--navy-800),#061A2E)' }} />
              <p className="text-[12px] font-semibold text-navy-900 mb-2">밤 연작 No.3</p>
              <div className="h-1.5 rounded-full bg-navy-100 overflow-hidden mb-1.5">
                <div className="h-full rounded-full" style={{ width: '64%', background: 'linear-gradient(90deg,var(--sv),var(--sv-deep))' }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted"><span>64%</span><span>테오 12명</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THEO BOT BAND ─── */}
      <section
        className="py-[78px] text-chiffon"
        id="bot"
        style={{ background: 'linear-gradient(150deg,var(--navy-900) 0%,var(--navy-800) 55%,var(--navy-700) 100%)' }}
      >
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.24em] text-sv font-semibold uppercase mb-3">MEET THEO BOT</p>
            <h2 className="font-medium text-[36px] text-chiffon leading-[1.35] mb-4" style={{ wordBreak: 'keep-all' }}>
              취향을 설명하기 어려우면,<br />그냥 이야기하세요
            </h2>
            <p className="text-[14.5px] leading-[1.9] max-w-[440px] mx-auto" style={{ color: 'rgba(250,240,202,.68)', wordBreak: 'keep-all' }}>
              작품 이름을 몰라도 괜찮습니다. 느낌으로 말하면 테오 봇이 어울리는 작가를 찾아냅니다.
            </p>
          </div>

          {/* Chat mockup */}
          <div className="max-w-[520px] mx-auto flex flex-col gap-3">
            {/* Bot bubble */}
            <div
              className="max-w-[84%] px-4 py-3 rounded-[15px] rounded-bl-[5px] text-[13.5px] leading-[1.8] flex gap-[11px] items-start"
              style={{ background: 'rgba(250,240,202,.1)', border: '1px solid rgba(250,240,202,.16)', color: 'var(--chiffon)', wordBreak: 'keep-all' }}
            >
              <div className="w-6 h-6 rounded-full bg-sv-soft shrink-0 flex items-center justify-center">
                <span className="font-black text-[8px] text-navy-800">T</span>
              </div>
              <span>안녕하세요, 저는 테오예요. 어떤 그림 앞에서 오래 멈춰 서시나요? 작품 이름을 몰라도 괜찮아요 — 느낌으로 말해주세요.</span>
            </div>
            {/* User bubble */}
            <div
              className="max-w-[84%] self-end px-4 py-3 rounded-[15px] rounded-br-[5px] text-[13.5px] leading-[1.8] font-medium"
              style={{ background: 'var(--sv)', color: 'var(--ink)', wordBreak: 'keep-all' }}
            >
              짙은 밤색이 좋아요. 붓질이 거칠게 살아있는 유화 같은 것들이요.
            </div>
            {/* Bot bubble */}
            <div
              className="max-w-[84%] px-4 py-3 rounded-[15px] rounded-bl-[5px] text-[13.5px] leading-[1.8] flex gap-[11px] items-start"
              style={{ background: 'rgba(250,240,202,.1)', border: '1px solid rgba(250,240,202,.16)', color: 'var(--chiffon)', wordBreak: 'keep-all' }}
            >
              <div className="w-6 h-6 rounded-full bg-sv-soft shrink-0 flex items-center justify-center">
                <span className="font-black text-[8px] text-navy-800">T</span>
              </div>
              <span>좋아요. 그 어두움은 조용한 쪽인가요, 격정적인 쪽인가요?</span>
            </div>
            {/* Chips */}
            <div className="flex gap-2 flex-wrap self-end">
              {['조용한', '격정적인', '둘 다'].map((chip) => (
                <span
                  key={chip}
                  className="text-[11.5px] px-3 py-1.5 rounded-full"
                  style={{ border: '1px solid rgba(250,240,202,.3)', color: 'rgba(250,240,202,.85)' }}
                >
                  {chip}
                </span>
              ))}
            </div>
            {/* User bubble */}
            <div
              className="max-w-[84%] self-end px-4 py-3 rounded-[15px] rounded-br-[5px] text-[13.5px] leading-[1.8] font-medium"
              style={{ background: 'var(--sv)', color: 'var(--ink)', wordBreak: 'keep-all' }}
            >
              조용한 쪽이요. 도시의 밤 같은.
            </div>
            {/* Bot bubble with recommendation */}
            <div
              className="w-full px-4 py-3 rounded-[15px] rounded-bl-[5px] text-[13.5px] leading-[1.8] flex flex-col gap-3"
              style={{ background: 'rgba(250,240,202,.1)', border: '1px solid rgba(250,240,202,.16)', color: 'var(--chiffon)', wordBreak: 'keep-all' }}
            >
              <div className="flex gap-[11px] items-start">
                <div className="w-6 h-6 rounded-full bg-sv-soft shrink-0 flex items-center justify-center">
                  <span className="font-black text-[8px] text-navy-800">T</span>
                </div>
                <span>정리하면 — <strong>어두운 · 두터운 · 고요한 · 도시</strong>. 이 결과 맞닿은 고흐 세 명을 찾았어요.</span>
              </div>
              {/* Reco card */}
              <div className="bg-paper rounded-[14px] p-3.5 flex gap-3 items-center">
                <div className="w-[52px] h-[52px] rounded-[10px] shrink-0 overflow-hidden relative bg-navy-800">
                  <Image src={artists[0].profileImage} alt={artists[0].name} fill sizes="52px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="text-[13.5px] font-semibold text-navy-900">{artists[0].name} · {artists[0].genre} / {artists[0].media[0]}</h6>
                  <p className="text-[11.5px] text-muted leading-[1.6] mt-1" style={{ wordBreak: 'keep-all' }}>
                    작가노트의 "도시의 물가를 오래 바라보다 남은 잔상"이 말씀하신 결과 맞닿아요. 지금{" "}
                    <strong>{projectMap[artists[0].id]?.title ?? ""}</strong>을 진행 중입니다.
                  </p>
                </div>
                <span className="font-bold text-[12.5px] text-navy-700 ml-2 shrink-0">92%</span>
              </div>
            </div>
          </div>

          <p className="text-center text-[10.5px] mt-7" style={{ color: 'rgba(250,240,202,.4)' }}>
            추천은 실제 등록 작가 DB에서만 이뤄지며, 각 추천에는 근거가 되는 작가노트 문장이 함께 표시됩니다.
          </p>
        </div>
      </section>

      {/* ─── BADGE SECTION ─── */}
      <section className="bg-navy-100 border-t border-navy-200 border-b border-navy-200 py-[78px]" id="badges">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.24em] text-navy-600 font-semibold uppercase mb-3">THEO BADGE</p>
            <h2 className="font-medium text-[24px] md:text-[36px] text-navy-900 leading-[1.35] mb-4">후원할수록 쌓이는 나의 이야기</h2>
            <p className="text-sm text-muted max-w-[400px] mx-auto leading-relaxed" style={{ wordBreak: 'keep-all' }}>
              유명해지기 전에 먼저 알아본 사람. 그 기록이 배지로 남습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                lv: 'LV. 01',
                name: '씨앗',
                cond: '첫 후원 1회',
                desc: 'Dear Theo 편지 수신 시작. 작가의 창작 과정을 가장 먼저 받아봅니다.',
                symbol: (
                  <div className="w-10 h-10 mx-auto flex items-center justify-center">
                    <div className="w-5 h-7 rounded-full border-2 border-navy-400 bg-navy-200" />
                  </div>
                ),
              },
              {
                lv: 'LV. 02',
                name: '해바라기',
                cond: '누적 10만원 또는 3회',
                desc: '신작 48시간 선공개. 일반 공개 전 먼저 감상하세요.',
                symbol: (
                  <div className="w-10 h-10 mx-auto flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <ellipse key={deg} cx="18" cy="8" rx="3" ry="5.5" fill="#F4D35E" opacity={0.85} transform={`rotate(${deg} 18 18)`} />
                      ))}
                      <circle cx="18" cy="18" r="6.5" fill="#C2A43F" />
                      <circle cx="18" cy="18" r="4.5" fill="#58450E" opacity={0.5} />
                    </svg>
                  </div>
                ),
              },
              {
                lv: 'LV. 03',
                name: '밀밭',
                cond: '누적 30만원',
                desc: '오픈스튜디오 우선 신청. 작가의 작업실에 먼저 방문합니다.',
                symbol: (
                  <div className="w-10 h-10 mx-auto flex items-center justify-center gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <div className="w-1.5 h-2 rounded-sm bg-sv-deep opacity-80" />
                        <div className="w-0.5 h-4 bg-navy-400 rounded-full" />
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                lv: 'LV. 04',
                name: '별밤',
                cond: '누적 100만원',
                desc: '전시 오프닝 초대. 작가와 함께하는 특별한 밤.',
                symbol: (
                  <div className="w-10 h-10 mx-auto flex items-center justify-center">
                    <div
                      className="w-8 h-8 bg-sv"
                      style={{ clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }}
                    />
                  </div>
                ),
              },
            ].map((b) => (
              <div key={b.name} className="bg-card border border-line rounded-[16px] p-[24px_20px] text-center">
                <p className="text-[10px] tracking-[0.18em] text-navy-400 mb-4">{b.lv}</p>
                <div className="mb-3">{b.symbol}</div>
                <h5 className="text-[15px] font-bold text-navy-900 mb-1.5">{b.name}</h5>
                <p className="text-[11.5px] font-semibold text-gold-text mb-3">{b.cond}</p>
                <p className="text-[11.5px] text-muted leading-[1.75]" style={{ wordBreak: 'keep-all' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARTY / LOOP ─── */}
      <section className="bg-card border-t border-line py-[78px]" id="community">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div>
              <p className="text-[11px] tracking-[0.24em] text-navy-600 font-semibold uppercase mb-3">ARTY · 아띠</p>
              <h2 className="font-medium text-[31px] text-navy-900 leading-[1.4] mt-3 mb-[18px]" style={{ wordBreak: 'keep-all' }}>
                내가 기여한 작품 앞에서<br />작가를 만납니다
              </h2>
              <p className="text-[14.5px] text-muted leading-[1.95]" style={{ wordBreak: 'keep-all' }}>
                완성된 작품을 보는 자리에 후원자를 초대합니다.
                그때 보는 것은 남의 작품이 아니라 <strong className="text-navy-800">내가 보낸 물감으로 그려진 작품</strong>입니다.
                관객이 아니라 기여자로 그 자리에 서는 경험이라, 작가와의 대화도 감상이 아니라{" "}
                <strong className="text-navy-800">함께 만든 것에 대한 이야기</strong>가 됩니다.
              </p>
              <p className="text-[14.5px] text-muted leading-[1.95] mt-4" style={{ wordBreak: 'keep-all' }}>
                그리고 <strong className="text-navy-800">지인 한 명</strong>을 데려올 수 있습니다.
                "내가 먼저 발견한 작가"를 보여주고 싶은 마음이, 다음 테오를 데려옵니다.
              </p>
            </div>

            {/* Invite card */}
            <div className="bg-navy-900 rounded-[18px] p-[30px] text-chiffon">
              <p className="text-[11px] tracking-[0.24em] text-sv font-semibold uppercase mb-2.5">OPEN STUDIO</p>
              <h4 className="font-medium text-[20px] text-chiffon mt-2.5 mb-2" style={{ wordBreak: 'keep-all' }}>윤도희 오픈스튜디오</h4>
              <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(250,240,202,.7)', wordBreak: 'keep-all' }}>
                후원하신 코발트블루로 완성한 밤 연작을 작업실에서 함께 봅니다.
              </p>
              <div className="flex gap-2 flex-wrap mt-4 mb-4">
                {['8/29(토) 15:00', '망원동', '6석 중 4석'].map((tag) => (
                  <span key={tag} className="text-[11.5px] px-[11px] py-[5px] rounded-[7px]" style={{ background: 'rgba(250,240,202,.1)', border: '1px solid rgba(250,240,202,.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="#"
                className="block w-full text-center font-bold rounded-[10px] bg-sv text-ink hover:bg-sv-soft transition-colors"
                style={{ fontSize: '13px', padding: '9px 17px' }}
              >
                참가 신청
              </Link>
              <p className="mt-3.5 pt-3.5 text-[12.5px] leading-[1.7]" style={{ borderTop: '1px solid rgba(250,240,202,.16)', color: 'rgba(250,240,202,.75)' }}>
                <strong className="text-sv">+1</strong> 지인 한 분과 함께 오실 수 있어요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section
        className="relative overflow-hidden text-center py-[88px] px-8"
        style={{ background: 'linear-gradient(140deg,#061A2E 0%,#0D3B66 52%,#376590 100%)' }}
      >
        {/* Stars */}
        {[
          { top: '26px', left: '14%' },
          { top: '64px', right: '16%' },
          { bottom: '36px', left: '26%' },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full bg-sv-soft opacity-60"
            style={{ top: (s as { top?: string }).top, bottom: (s as { bottom?: string }).bottom, left: (s as { left?: string }).left, right: (s as { right?: string }).right }}
          />
        ))}

        <div className="relative max-w-[680px] mx-auto">
          <h2 className="font-medium text-[40px] text-chiffon leading-[1.35] mb-4" style={{ wordBreak: 'keep-all' }}>
            작가에게 첫 번째 별이<br />되어 주세요
          </h2>
          <p className="font-bold text-[15px] mb-7" style={{ color: 'var(--chiffon)' }}>
            작가 수수료 0% · 시작은 무료예요
          </p>

          {/* Join bar — dark variant */}
          <div
            className="flex gap-2 max-w-[452px] mx-auto rounded-xl p-2 mb-4"
            style={{ background: 'rgba(250,240,202,.1)', border: '1.5px solid rgba(250,240,202,.28)' }}
          >
            <span className="flex items-center pl-1 text-[13.5px] shrink-0" style={{ color: 'rgba(250,240,202,.6)' }}>theo.kr/</span>
            <input
              type="text"
              placeholder="활동명을 입력하세요"
              aria-label="아틀리에 주소"
              className="flex-1 border-none outline-none text-sm bg-transparent min-w-0 placeholder:text-chiffon/45 text-chiffon"
              readOnly
            />
            <Link
              href="/onboarding/artist"
              className="shrink-0 bg-sv text-ink font-bold rounded-lg hover:bg-sv-soft transition-colors"
              style={{ fontSize: '13px', padding: '9px 17px' }}
            >
              아틀리에 열기
            </Link>
          </div>
          <p className="text-xs" style={{ color: 'rgba(250,240,202,.6)' }}>
            후원자로 오셨나요?{" "}
            <Link href="/bot" className="text-sv font-bold hover:underline">테오 봇으로 시작하기 →</Link>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#061A2E' }} className="text-chiffon pt-14 pb-9" id="about">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-sv-soft flex items-center justify-center">
                  <span className="font-black text-xs text-navy-800">T</span>
                </div>
                <b className="font-black tracking-[0.2em] text-sm text-chiffon">THEO</b>
              </div>
              <p className="text-[12px] leading-[1.8] max-w-[230px]" style={{ color: 'rgba(250,240,202,.55)' }}>
                시각예술 작가의 창작 재료를 후원하는 관계형 현물 후원 플랫폼
              </p>
            </div>

            {/* Links col 1 */}
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase" style={{ color: 'rgba(250,240,202,.45)' }}>서비스</p>
              <ul className="space-y-2.5">
                {[
                  { label: '작가로 시작하기', href: '/onboarding/artist' },
                  { label: '테오 봇', href: '/bot' },
                  { label: '진행 중 작업', href: '#projects' },
                  { label: '아띠 프로그램', href: '#community' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[12.5px] hover:text-chiffon transition-colors" style={{ color: 'rgba(250,240,202,.72)' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links col 2 */}
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase" style={{ color: 'rgba(250,240,202,.45)' }}>도움말</p>
              <ul className="space-y-2.5">
                {['이용 방법', '자주 묻는 질문', '수수료 안내', '문의하기'].map((l) => (
                  <li key={l}>
                    <Link href="#how" className="text-[12.5px] hover:text-chiffon transition-colors" style={{ color: 'rgba(250,240,202,.72)' }}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links col 3 */}
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase" style={{ color: 'rgba(250,240,202,.45)' }}>회사</p>
              <ul className="space-y-2.5">
                {['브랜드 스토리', '이용약관', '개인정보처리방침', '통신판매중개 고지'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[12.5px] hover:text-chiffon transition-colors" style={{ color: 'rgba(250,240,202,.72)' }}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-[11.5px]"
            style={{ borderTop: '1px solid rgba(250,240,202,.12)', color: 'rgba(250,240,202,.45)' }}
          >
            <span>© 2026 Theo</span>
            <span>테오는 재료 거래의 중개자이며, 재료의 하자·배송 책임은 약관에 따릅니다.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
