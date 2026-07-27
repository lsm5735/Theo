import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";

/* ─── Inline SVG icons ─── */
function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
function IconGift() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>
    </svg>
  );
}
function IconCoin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><path d="M8 12h8"/>
    </svg>
  );
}
function IconPen() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    </svg>
  );
}

export default function Home() {
  const featuredArtists = artists.slice(0, 3);

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* ─── HERO ─── */}
      <section className="bg-paper pt-24 md:pt-36 pb-0 text-center">
        <div className="max-w-[720px] mx-auto px-5 md:px-8">

          <p className="text-xs font-semibold tracking-[0.24em] text-navy-400 mb-8 uppercase">
            관계형 현물 후원 플랫폼
          </p>

          {/* Slogan */}
          <h1 className="text-4xl md:text-[60px] leading-[1.15] tracking-tight text-navy-900 mb-10 font-bold">
            모두의 고흐가 되기 전,<br />
            나만의{" "}
            <span className="relative inline-block italic text-navy-700">
              고흐
              <span
                className="absolute left-0 right-0 bottom-[2px] h-[0.38em] -z-10 rounded"
                style={{ background: 'var(--sv-soft)', opacity: 0.75 }}
              />
            </span>
            를 만난다.
          </h1>

          {/* Description */}
          <p className="text-[15px] md:text-[16px] text-muted leading-[1.95] max-w-[560px] mx-auto mb-4">
            화가 반 고흐에게는 평생 그를 응원해 준 동생 테오가 있었기에
            세계가 사랑하는 명작이 탄생할 수 있었습니다.
          </p>
          <p className="text-[15px] md:text-[16px] text-muted leading-[1.95] max-w-[560px] mx-auto mb-14">
            <strong className="text-navy-800 font-semibold">테오(후원자)</strong>는 작가에게 창작에 필요한 재료를 선물하고,{" "}
            <strong className="text-navy-800 font-semibold">고흐(작가)</strong>는 창작 과정을 담은 콘텐츠와
            영감을 담은 편지를 통해 관계가 쌓입니다.
          </p>

          {/* Role selection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link
              href="/onboarding/artist"
              className="group w-full sm:w-auto min-w-[220px] border-2 border-navy-800 text-navy-800 font-bold text-[15px] px-8 py-4 rounded-xl hover:bg-navy-800 hover:text-chiffon transition-all duration-200 text-center"
            >
              나는 <span className="text-navy-600 group-hover:text-sv transition-colors">고흐</span>입니다
              <span className="block text-xs font-normal text-muted group-hover:text-chiffon/70 mt-0.5 transition-colors">
                작가로 시작하기
              </span>
            </Link>
            <Link
              href="/bot"
              className="group w-full sm:w-auto min-w-[220px] bg-navy-800 text-chiffon font-bold text-[15px] px-8 py-4 rounded-xl hover:bg-navy-700 transition-all duration-200 text-center"
            >
              나는 <span className="text-sv">테오</span>입니다
              <span className="block text-xs font-normal text-chiffon/60 group-hover:text-chiffon/80 mt-0.5 transition-colors">
                후원자로 시작하기
              </span>
            </Link>
          </div>

          <p className="text-xs text-navy-400">
            이미 계정이 있으신가요?{" "}
            <Link href="#" className="text-navy-600 font-semibold hover:underline">로그인</Link>
          </p>
        </div>

        {/* Artband — dark sky with floating cards */}
        <div className="mt-10 max-w-[1080px] mx-auto px-5 md:px-8 relative">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              height: '264px',
              background: 'linear-gradient(168deg,#061A2E 0%,#07223C 26%,#0D3B66 62%,#376590 108%)',
            }}
          >
            {/* Moon */}
            <div
              className="absolute rounded-full"
              style={{
                width: '104px', height: '104px',
                top: '-22px', right: '8%',
                background: 'radial-gradient(circle,rgba(248,208,122,.85) 0 26%,rgba(244,211,94,.32) 48%,transparent 70%)',
              }}
            />
            {/* Stars */}
            {[
              { top: '18%', left: '12%', size: 2 },
              { top: '32%', left: '25%', size: 1.5 },
              { top: '12%', left: '42%', size: 2.5 },
              { top: '45%', left: '60%', size: 1.5 },
              { top: '20%', left: '72%', size: 2 },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-sv-soft opacity-70"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
              />
            ))}
            {/* Cypress silhouettes */}
            <div
              className="absolute bottom-0 left-8"
              style={{
                width: '18px', height: '80px',
                background: 'linear-gradient(180deg,#0a2f0a 0%,#061A2E 100%)',
                clipPath: 'polygon(50% 0%,100% 100%,0% 100%)',
                opacity: 0.6,
              }}
            />
            <div
              className="absolute bottom-0 left-14"
              style={{
                width: '14px', height: '60px',
                background: 'linear-gradient(180deg,#0a2f0a 0%,#061A2E 100%)',
                clipPath: 'polygon(50% 0%,100% 100%,0% 100%)',
                opacity: 0.5,
              }}
            />

            {/* Letter card */}
            <div
              className="absolute bg-paper rounded-xl shadow-float p-4"
              style={{ left: '50%', top: '44px', transform: 'translateX(-62%)', width: '280px' }}
            >
              <div className="flex justify-between items-center mb-2.5">
                <div
                  className="w-7 h-8 bg-sv-soft border border-sv-deep rounded-sm flex items-center justify-center"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5h8M5 1v8" stroke="#C2A43F" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div
                  className="w-9 h-9 border border-navy-200 rounded-full flex items-center justify-center text-navy-400"
                  style={{ fontFamily: "'Jost'", fontSize: '7px', lineHeight: 1.2, transform: 'rotate(-9deg)', textAlign: 'center' }}
                >
                  THEO<br />MAIL
                </div>
              </div>
              <p className="font-myeongjo text-[12.5px] text-navy-900 leading-[1.85]">
                이번 주에 드디어 코발트블루를 주문했어요.
                물감이 도착하면 바로 작업을 시작할게요.
                Dear Theo, 감사합니다.
              </p>
            </div>

            {/* Project card */}
            <div
              className="absolute bg-paper rounded-xl shadow-float p-4 hidden sm:block"
              style={{ right: '5%', bottom: '20px', width: '186px' }}
            >
              <div
                className="h-14 rounded-lg mb-2.5 relative overflow-hidden"
                style={{ background: 'linear-gradient(150deg,#0D3B66,#061A2E)' }}
              >
                <div
                  className="absolute top-2 left-2 text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-paper/90 text-navy-800"
                >
                  후원 모집 중
                </div>
              </div>
              <p className="text-[12px] leading-snug font-semibold text-navy-900 mb-2.5">밤 연작 No.3</p>
              <div className="h-1.5 rounded-full bg-navy-100 overflow-hidden mb-1.5">
                <div className="h-full w-[64%] rounded-full" style={{ background: 'linear-gradient(90deg,var(--sv),var(--sv-deep))' }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted">
                <span>64%</span>
                <span>테오 12명</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM BAND ─── */}
      <section className="bg-navy-900 text-chiffon mt-16 py-24">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.24em] text-sv font-semibold uppercase mb-4">THE GAP</p>
            <h2 className="font-bold text-2xl md:text-[32px] text-chiffon leading-[1.4] mb-5">
              미술 시장은 커지는데,<br />
              그 성장의 과실이 젊은 예술가에게 흐르지 않습니다
            </h2>
            <p className="text-[14.5px] text-chiffon/65 leading-[1.9] max-w-[540px] mx-auto">
              전시 관람객은 매년 늘어나고 아트페어는 성황을 이루지만,
              정작 그 작품을 만든 신진 작가의 수입은 제자리입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Fan side */}
            <div className="bg-chiffon/6 border border-chiffon/14 rounded-2xl p-8">
              <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center mb-5 text-chiffon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h4 className="text-[17px] font-bold text-chiffon mb-4">팬의 딜레마</h4>
              <p className="text-[14px] text-chiffon/70 leading-[2.0]">
                전시를 찾아다니고, 인스타그램에서 작가를 팔로우하고, 작품을 스크랩합니다.
                응원하는 마음은 확실하지만 그 마음을 전할 방법이 없습니다.
                완성작을 사기엔 수십만 원이 부담스럽고, SNS 좋아요 한 번으로는 아무것도 전해지지 않는 것 같아 아쉽습니다.
                팬과 작가 사이에는 마음을 행동으로 옮길 수 있는 접점이 없습니다.
              </p>
            </div>

            {/* Artist side */}
            <div className="bg-chiffon/6 border border-chiffon/14 rounded-2xl p-8">
              <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center mb-5 text-chiffon">
                <IconPen />
              </div>
              <h4 className="text-[17px] font-bold text-chiffon mb-4">작가의 현실</h4>
              <p className="text-[14px] text-chiffon/70 leading-[2.0]">
                새 작업을 시작하려면 재료비가 먼저 나갑니다.
                캔버스, 물감, 붓 — 작품이 팔리기 전까지는 전부 자비입니다.
                지원사업을 찾아보지만 경쟁률은 높고 서류는 많습니다.
                그래서 많은 신진 작가들이 창작보다 생계를 먼저 생각하게 되고,
                결국 작업을 멈추거나 속도를 줄입니다.
                응원해 주는 팬이 있다는 건 알지만, 그 에너지가 창작으로 이어지지 않습니다.
              </p>
            </div>
          </div>

          <p className="font-medium text-[18px] md:text-[22px] text-chiffon text-center mt-14 leading-[1.75]">
            THEO는 그 사이를 잇는 <em className="not-italic text-sv">현물 후원</em>을 설계했습니다.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS (4 steps) ─── */}
      <section className="py-20 md:py-24 bg-paper" id="how">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.24em] text-navy-600 font-semibold uppercase mb-3">HOW IT WORKS</p>
            <h2 className="font-medium text-2xl md:text-[36px] text-navy-900 leading-[1.35]">
              재료가 작품이 되기까지
            </h2>
          </div>

          <div className="space-y-16">
            {/* Step 01 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-full border border-navy-300 flex items-center justify-center font-bold text-xs text-navy-700">01</span>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Discover</span>
                </div>
                <h3 className="font-medium text-2xl md:text-[27px] text-navy-900 mb-4 leading-snug">
                  취향의 작가를 발견한다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]">
                  장르·감성 태그로 <strong className="text-navy-800">나에게 맞는 신진 작가</strong>와 진행 중인 프로젝트를 발견합니다.
                  아직 아무도 모르는 그 작가를 먼저 알아보세요.
                </p>
              </div>
              {/* Vis panel */}
              <div className="bg-navy-100 border border-navy-200 rounded-2xl p-6 min-h-[262px] flex flex-col justify-center gap-3">
                {artists.slice(0, 2).map((a) => (
                  <div key={a.id} className="bg-card border border-line rounded-xl p-3.5 flex gap-3 items-center shadow-card">
                    <div className="w-11 h-11 rounded-lg shrink-0 overflow-hidden relative bg-navy-200">
                      <Image src={a.profileImage} alt={a.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-semibold text-navy-900 truncate">{a.name}</p>
                      <p className="font-myeongjo text-[11px] text-muted mt-0.5 truncate">{a.oneLiner}</p>
                      <p className="font-semibold text-[13px] text-navy-700 mt-1">
                        {a.currentProject.fundedAmount.toLocaleString()}원 모임
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 02 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Vis first on desktop */}
              <div className="order-2 md:order-1 bg-chiffon border border-line rounded-2xl p-6 min-h-[262px] flex flex-col justify-center gap-3">
                <div className="bg-card border border-line rounded-xl p-4 shadow-card">
                  <p className="text-[9.5px] tracking-[0.16em] text-navy-700 font-bold mb-2 uppercase">위시리스트</p>
                  {[
                    { name: '코발트블루 유화물감 (120ml)', price: '18,000원' },
                    { name: '세이블 붓 No.8', price: '12,000원' },
                    { name: '리넨 캔버스 50×60cm', price: '24,000원' },
                  ].map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-2 border-b border-navy-100 last:border-0">
                      <p className="font-myeongjo text-[12.5px] text-navy-900">{item.name}</p>
                      <p className="font-bold text-[13px] text-navy-700 shrink-0 ml-3">{item.price}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10.5px] text-muted text-center mt-1">작가의 주소는 공개되지 않습니다</p>
              </div>

              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-full border border-navy-300 flex items-center justify-center font-bold text-xs text-navy-700">02</span>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Gift</span>
                </div>
                <h3 className="font-medium text-2xl md:text-[27px] text-navy-900 mb-4 leading-snug">
                  재료를 위시리스트에서 선물한다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]">
                  작가의 위시리스트에서 재료를 선택해 선물합니다.
                  <strong className="text-navy-800"> 작가 주소는 절대 노출되지 않고</strong>, 테오가 중개합니다.
                  재료값 전액이 작가에게 전달됩니다.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-full border border-navy-300 flex items-center justify-center font-bold text-xs text-navy-700">03</span>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Letter</span>
                </div>
                <h3 className="font-medium text-2xl md:text-[27px] text-navy-900 mb-4 leading-snug">
                  편지가 도착한다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]">
                  재료를 받은 작가가 <strong className="text-navy-800">창작 과정을 사진과 함께</strong> 편지로 전합니다.
                  일회성 후원이 아닌, 지속적인 관계의 시작입니다. Dear Theo.
                </p>
              </div>
              <div className="bg-chiffon border border-line rounded-2xl p-6 min-h-[262px] flex flex-col justify-center">
                <div className="bg-card border border-sv-deep/20 rounded-xl p-5 shadow-card">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[9.5px] tracking-[0.16em] text-navy-700 font-bold uppercase">Dear Theo</p>
                    <p className="text-[10.5px] text-muted">2026.07.15</p>
                  </div>
                  <p className="font-myeongjo text-[12.5px] text-navy-900 leading-[1.85]">
                    드디어 코발트블루가 도착했어요. 캔버스에 첫 칠을 했습니다.
                    새벽 빛이 이 색깔이구나, 싶었어요. 감사합니다, 테오님.
                  </p>
                  <div className="h-12 rounded-lg mt-3" style={{ background: 'linear-gradient(155deg,#061A2E,#20517E)' }} />
                </div>
              </div>
            </div>

            {/* Step 04 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Vis */}
              <div className="order-2 md:order-1 bg-navy-100 border border-navy-200 rounded-2xl p-6 min-h-[262px] flex flex-col justify-center gap-4">
                <div className="bg-card border border-line rounded-xl p-4 shadow-card">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[9.5px] tracking-[0.16em] text-navy-700 font-bold uppercase">전달 4단계</p>
                    <span className="text-[10.5px] font-bold text-sv bg-navy-800 px-2 py-0.5 rounded-full">작가가 받았어요</span>
                  </div>
                  <div className="flex items-center gap-0 mt-3">
                    {[true, true, true, true].map((on, i) => (
                      <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${on ? 'bg-sv' : 'bg-navy-200'}`} />
                        {i < 3 && <div className={`h-0.5 flex-1 ${on ? 'bg-sv-deep' : 'bg-navy-200'}`} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9.5px] text-muted mt-2">
                    {['후원 완료', '준비 중', '전달 중', '수령'].map((l, i) => (
                      <span key={i} className={i === 3 ? 'font-bold text-navy-800' : ''}>{l}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-card border border-line rounded-xl p-3.5 shadow-card">
                  <div className="w-8 h-8 rounded-lg bg-sv-soft flex items-center justify-center shrink-0">
                    <span className="font-black text-xs text-gold-text">01</span>
                  </div>
                  <div>
                    <p className="text-[9.5px] font-semibold tracking-[0.1em] text-gold-text uppercase">씨앗 배지 획득</p>
                    <p className="text-[11.5px] font-semibold text-navy-900 mt-0.5">첫 번째 테오가 되었습니다</p>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-full border border-navy-300 flex items-center justify-center font-bold text-xs text-navy-700">04</span>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 uppercase">Badge</span>
                </div>
                <h3 className="font-medium text-2xl md:text-[27px] text-navy-900 mb-4 leading-snug">
                  기억이 배지로 남는다
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.95] max-w-[410px]">
                  유명해지기 전에 먼저 알아본 사람.
                  후원할수록 <strong className="text-navy-800">씨앗 → 해바라기 → 밀밭 → 별밤</strong>으로 성장하는 배지가 쌓입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section id="artists" className="bg-paper border-t border-line py-20">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.24em] text-navy-600 font-semibold uppercase mb-2">ATELIER</p>
              <h2 className="font-medium text-2xl md:text-[36px] text-navy-900 leading-[1.35]">
                지금 후원 가능한 작가
              </h2>
            </div>
            <span className="text-sm text-muted">총 {artists.length}명</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>

          {artists.length > 3 && (
            <div className="text-center mt-10">
              <Link
                href="#"
                className="inline-flex items-center gap-2 border border-navy-400 text-navy-700 font-semibold px-6 py-3 rounded-lg hover:border-navy-700 hover:bg-navy-100 transition-colors text-sm"
              >
                전체 작가 보기 ({artists.length}명)
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── BADGE SECTION ─── */}
      <section className="bg-navy-100 border-t border-navy-200 border-b border-b-navy-200 py-20">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.24em] text-navy-600 font-semibold uppercase mb-3">THEO BADGE</p>
            <h2 className="font-medium text-2xl md:text-[36px] text-navy-900 leading-[1.35] mb-4">
              후원할수록 쌓이는 나의 이야기
            </h2>
            <p className="text-sm text-muted max-w-[400px] mx-auto leading-relaxed">
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
                    {/* Seed: small oval */}
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
                    {/* Sunflower: circle + petals via box-shadow */}
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-sv border-2 border-sv-deep mx-auto" />
                      {/* 8 petals */}
                      {[0,45,90,135,180,225,270,315].map((deg) => (
                        <div
                          key={deg}
                          className="absolute w-1.5 h-3 rounded-full bg-sv opacity-80"
                          style={{
                            top: '50%', left: '50%',
                            transformOrigin: '50% 100%',
                            transform: `rotate(${deg}deg) translateX(-50%) translateY(-100%)`,
                          }}
                        />
                      ))}
                    </div>
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
                    {/* Wheat: 3 vertical stalks */}
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
                    {/* Star shape via clip-path */}
                    <div
                      className="w-8 h-8 bg-sv"
                      style={{
                        clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
                      }}
                    />
                  </div>
                ),
              },
            ].map((b) => (
              <div
                key={b.name}
                className="bg-card border border-line rounded-2xl p-6 text-center"
              >
                <p className="text-[10px] tracking-[0.18em] text-navy-400 mb-4">{b.lv}</p>
                <div className="mb-3">{b.symbol}</div>
                <h5 className="text-[15px] font-bold text-navy-900 mb-1.5">{b.name}</h5>
                <p className="text-[11.5px] font-semibold text-gold-text mb-3">{b.cond}</p>
                <p className="text-[11.5px] text-muted leading-[1.75]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST ─── */}
      <section className="py-20 bg-paper">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.24em] text-navy-600 font-semibold uppercase mb-3">WHY THEO</p>
            <h2 className="font-medium text-2xl md:text-[36px] text-navy-900 leading-[1.35]">
              테오가 설계한 신뢰
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                big: '0%',
                title: '작가 수수료',
                desc: '재료값 전액이 작가에게 전달됩니다. 플랫폼 운영비는 제휴 화방 커미션으로만 충당합니다.',
                icon: <IconCoin />,
              },
              {
                big: '100%',
                title: '주소 비공개',
                desc: '작가의 배송지는 절대 공개되지 않습니다. 테오가 안전하게 중개하고, 팬에게 주소를 노출하지 않습니다.',
                icon: <IconLock />,
              },
              {
                big: '4단계',
                title: '전달 추적',
                desc: '후원 완료 → 재료 준비 중 → 작가에게 가는 중 → 작가가 받았어요. 전 과정을 투명하게 확인합니다.',
                icon: <IconBox />,
              },
            ].map((t) => (
              <div key={t.title} className="bg-card border border-line rounded-2xl p-7">
                <div className="w-9 h-9 rounded-lg bg-navy-100 flex items-center justify-center text-navy-600 mb-4">
                  {t.icon}
                </div>
                <p className="font-bold text-[32px] text-navy-800 mb-2.5">{t.big}</p>
                <h5 className="text-[15px] font-bold text-navy-900 mb-2.5">{t.title}</h5>
                <p className="text-[12.5px] text-muted leading-[1.8]">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section
        className="relative overflow-hidden text-center py-24 px-5"
        style={{ background: 'linear-gradient(140deg,#061A2E 0%,#0D3B66 52%,#376590 100%)' }}
      >
        {/* Stars */}
        {[
          { top: '12%', left: '8%', size: 2.5 },
          { top: '60%', left: '15%', size: 1.5 },
          { top: '20%', right: '10%', size: 2 },
          { top: '70%', right: '20%', size: 3 },
          { top: '40%', left: '48%', size: 1.5 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sv-soft opacity-60"
            style={{ top: s.top, left: (s as { left?: string }).left, right: (s as { right?: string }).right, width: s.size, height: s.size }}
          />
        ))}

        <div className="relative max-w-[680px] mx-auto">
          <p className="text-xs tracking-[0.24em] text-sv font-semibold uppercase mb-5">지금 시작하세요</p>
          <h2 className="font-medium text-3xl md:text-[40px] text-chiffon leading-[1.35] mb-5">
            작가에게 첫 번째 별이<br />되어 주세요
          </h2>
          <p className="font-bold text-[15px] text-chiffon/80 mb-7">
            아직 아무도 모르는 그 작가가, 나만의 고흐가 됩니다.
          </p>

          {/* Join bar (dark variant) */}
          <div
            className="flex gap-2 max-w-[452px] mx-auto rounded-xl p-2"
            style={{ background: 'rgba(250,240,202,.1)', border: '1.5px solid rgba(250,240,202,.28)' }}
          >
            <div className="flex items-center pl-1 shrink-0">
              <span className="text-[13.5px] text-chiffon/60">theo.kr /</span>
            </div>
            <input
              type="text"
              placeholder="활동명"
              className="flex-1 border-none outline-none text-sm bg-transparent text-chiffon placeholder:text-chiffon/45 min-w-0"
              readOnly
            />
            <Link
              href="#artists"
              className="shrink-0 bg-sv text-ink font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-sv-soft transition-colors"
            >
              시작하기
            </Link>
          </div>
          <p className="text-xs text-chiffon/60 mt-4">
            이미 계정이 있으신가요?{" "}
            <Link href="#" className="text-sv font-bold hover:underline">로그인</Link>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#061A2E' }} className="text-chiffon pt-14 pb-9">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-sv-soft flex items-center justify-center">
                  <span className="font-black text-xs text-navy-800">T</span>
                </div>
                <span className="font-black tracking-[0.2em] text-sm text-chiffon">THEO</span>
              </div>
              <p className="text-[12px] text-chiffon/55 leading-[1.8] max-w-[230px]">
                팬이 작가에게 창작 재료를 선물하고, 작가는 창작 과정을 편지로 답하는 관계형 현물 후원 플랫폼.
              </p>
            </div>

            {/* Links col 1 */}
            <div>
              <p className="text-[11px] tracking-[0.14em] text-chiffon/45 mb-4 uppercase">Platform</p>
              <ul className="space-y-2.5">
                {['작가 탐색', '후원 방법', '배지 시스템', '커뮤니티'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[12.5px] text-chiffon/72 hover:text-chiffon transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links col 2 */}
            <div>
              <p className="text-[11px] tracking-[0.14em] text-chiffon/45 mb-4 uppercase">Artists</p>
              <ul className="space-y-2.5">
                {['작가 등록', '아틀리에 관리', '프로젝트 개설', '수익 구조'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[12.5px] text-chiffon/72 hover:text-chiffon transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links col 3 */}
            <div>
              <p className="text-[11px] tracking-[0.14em] text-chiffon/45 mb-4 uppercase">Company</p>
              <ul className="space-y-2.5">
                {['이용약관', '개인정보처리방침', '문의하기', 'THEO 소개'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[12.5px] text-chiffon/72 hover:text-chiffon transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-[11.5px] text-chiffon/45"
            style={{ borderTop: '1px solid rgba(250,240,202,.12)' }}
          >
            <p>© 2026 Theo. 이 화면은 시연용 데모입니다.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-chiffon/70 transition-colors">이용약관</Link>
              <Link href="#" className="hover:text-chiffon/70 transition-colors">개인정보처리방침</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
