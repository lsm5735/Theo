import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";

function IconPen() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  const featuredArtists = artists.slice(0, 3);
  const projectMap = Object.fromEntries(projects.map((p) => [p.artistId, p]));

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Header />

      {/* ════════════════════════════════════════
          § 1. HERO
          ════════════════════════════════════════ */}
      <header className="relative overflow-hidden" id="start">
        {/* 배경 도트 패턴 */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(13,59,102,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="relative max-w-[1080px] mx-auto px-5 md:px-8 pt-20 md:pt-36 pb-16 md:pb-24 text-center">

          <h1
            data-sr="up"
            className="font-black text-[36px] sm:text-[52px] md:text-[72px] leading-[1.1] tracking-tight text-navy-900 mb-8 md:mb-10"
            style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}
          >
            모두의 고흐가 되기 전,<br />
            나만의{" "}
            <span style={{
              background: "linear-gradient(transparent 50%, rgba(244,211,94,.92) 50%, rgba(244,211,94,.92) 90%, transparent 90%)",
              padding: "0 4px",
              color: "var(--navy-700)",
            }}>
              고흐
            </span>를 만난다.
          </h1>

          <p
            data-sr="up" data-d="2"
            className="text-[15px] md:text-[18px] leading-[1.95] max-w-[580px] mx-auto mb-12"
            style={{ color: "var(--muted)", wordBreak: "keep-all" }}
          >
            반 고흐에게는 평생 그를 응원해준 동생 테오가 있었기에 세계가 사랑하는 명작이 탄생할 수 있었습니다. 세상이 알아보기 전, 당신이 먼저 발견한 예술가에게 재료를 선물하고, 위대한 작품이 태어나는 과정을 함께 만들어 보세요.
          </p>

          <div data-sr="up" data-d="3" className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/bot" className="nb-btn w-full sm:w-[260px] text-[15px] px-8 py-4 rounded-xl">
              <span className="font-black">나는 <span style={{ color: "var(--brutal)" }}>테오</span>입니다</span>
              <span className="block text-[11px] font-semibold opacity-60 mt-0.5">후원자로 시작하기</span>
            </Link>
            <Link href="/onboarding/artist" className="nb-btn-outline w-full sm:w-[260px] text-[15px] px-8 py-4 rounded-xl">
              <span className="font-black">나는 <span style={{ color: "var(--navy-700)" }}>고흐</span>입니다</span>
              <span className="block text-[11px] font-semibold opacity-50 mt-0.5">작가로 시작하기</span>
            </Link>
          </div>

          <p data-sr="fade" data-d="4" className="text-xs text-navy-400">
            이미 계정이 있으신가요?{" "}
            <Link href="#" className="text-navy-600 font-bold hover:underline">로그인</Link>
          </p>


        </div>
      </header>

      {/* ════════════════════════════════════════
          § 2. THE GAP
          ════════════════════════════════════════ */}
      <section style={{ background: "var(--navy-900)" }} className="py-24 md:py-32">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-16">
            <span className="nb-tag-light mb-6 inline-flex">THE GAP</span>
            <h2
              className="font-black text-[30px] md:text-[42px] leading-[1.2] mt-4 mb-5"
              style={{ color: "var(--chiffon)", wordBreak: "keep-all", letterSpacing: "-0.02em" }}
            >
              미술 시장은 커지는데,<br />
              그 성장의 과실이 젊은<br className="md:hidden" /> 예술가에게 흐르지 않습니다
            </h2>
            <p className="text-[15px] leading-[1.9] max-w-[520px] mx-auto" style={{ color: "rgba(250,240,202,.65)", wordBreak: "keep-all" }}>
              전시 관람객은 매년 늘어나고 아트페어는 성황을 이루지만,
              정작 그 작품을 만든 신진 작가의 수입은 제자리입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            <div data-sr="right" className="nb-card-dark rounded-[14px] p-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0"
                style={{ background: "rgba(244,211,94,.15)", color: "var(--sv)" }}>
                <IconUser />
              </div>
              <h4 className="font-black text-[18px] mb-3" style={{ color: "var(--chiffon)" }}>팬의 딜레마</h4>
              <p className="text-[14px] leading-[2.0]" style={{ color: "rgba(250,240,202,.68)", wordBreak: "keep-all" }}>
                전시를 찾아다니고, 인스타그램에서 작가를 팔로우하고, 작품을 스크랩합니다.
                응원하는 마음은 확실하지만 그 마음을 전할 방법이 없습니다.
                완성작을 사기엔 수십만 원이 부담스럽고, SNS 좋아요 한 번으로는 아무것도 전해지지 않는 것 같아 아쉽습니다.
              </p>
            </div>
            <div data-sr="left" className="nb-card-dark rounded-[14px] p-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0"
                style={{ background: "rgba(244,211,94,.15)", color: "var(--sv)" }}>
                <IconPen />
              </div>
              <h4 className="font-black text-[18px] mb-3" style={{ color: "var(--chiffon)" }}>작가의 현실</h4>
              <p className="text-[14px] leading-[2.0]" style={{ color: "rgba(250,240,202,.68)", wordBreak: "keep-all" }}>
                새 작업을 시작하려면 재료비가 먼저 나갑니다.
                캔버스, 물감, 붓 — 작품이 팔리기 전까지는 전부 자비입니다.
                지원사업을 찾아보지만 경쟁률은 높고 서류는 많습니다.
                그래서 많은 신진 작가들이 창작보다 생계를 먼저 생각하게 됩니다.
              </p>
            </div>
          </div>

          <p data-sr="up" data-d="2"
            className="text-center font-black text-[20px] md:text-[26px] leading-[1.6]"
            style={{ color: "var(--chiffon)", wordBreak: "keep-all" }}>
            THEO는 그 사이를 잇는{" "}
            <em className="not-italic" style={{ color: "var(--sv)" }}>현물 후원</em>을 설계했습니다.
          </p>

        </div>
      </section>

      {/* ════════════════════════════════════════
          § 3. HOW IT WORKS
          ════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "var(--paper)" }} id="how">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-20">
            <span className="nb-tag mb-5 inline-flex">HOW IT WORKS</span>
            <h2 className="font-black text-[28px] md:text-[44px] leading-[1.2] mt-4 mb-4 text-navy-900"
              style={{ letterSpacing: "-0.02em" }}>재료가 작품이 되기까지</h2>
            <p className="text-[15px] text-muted leading-[1.9] max-w-[480px] mx-auto" style={{ wordBreak: "keep-all" }}>
              후원은 재료 낱개가 아니라 <strong className="text-navy-800">하나의 작품 프로젝트</strong>를 완성시키는 일입니다.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">

            {/* Step 01 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">01</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">Artist</span>
                </div>
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  작가가 그릴 작품을 등록한다
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
                  지금 시작하려는 작품의 구상과 <strong className="text-navy-800">필요한 재료 목록</strong>을 올립니다.
                  재료값 합계가 그 작품의 목표가 됩니다. 작가 수수료는 <strong className="text-navy-800">0%</strong>입니다.
                </p>
              </div>
              <div data-sr="left" data-d="1" className="nb-card p-6 flex flex-col gap-3">
                {[
                  { grad: "linear-gradient(145deg,var(--navy-700),var(--navy-900))", title: "코발트블루 유화물감 세트", note: '"밤 연작의 주조색이에요"', price: "32,000원" },
                  { grad: "linear-gradient(145deg,#D8CBAA,#9B8A63)", title: "캔버스 천 10호 ×3", note: '"다음 장면의 바탕입니다"', price: "28,000원" },
                ].map((item) => (
                  <div key={item.title} className="soft-surface rounded-xl p-3.5">
                    <div className="flex gap-3 items-center">
                      <div className="w-[46px] h-[46px] rounded-[9px] shrink-0" style={{ background: item.grad }} />
                      <div>
                        <h6 className="text-[12.5px] font-black text-navy-900">{item.title}</h6>
                        <p className="font-myeongjo text-[11px] text-muted mt-0.5">{item.note}</p>
                        <p className="font-black text-[13px] text-navy-700 mt-0.5">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 02 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right" data-d="1" className="order-2 md:order-1 nb-card p-6 flex flex-col gap-3"
                style={{ background: "var(--card-soft)" }}>
                <div className="soft-surface rounded-xl p-4" style={{ border: "2px solid var(--navy-700)" }}>
                  <p className="text-[9.5px] tracking-[0.16em] text-navy-700 font-black mb-2 uppercase">DEAR GOGH</p>
                  <p className="font-myeongjo text-[12.5px] text-navy-900 leading-[1.85]">
                    "밤 연작 응원해요. 이 파랑이 다음 그림의 하늘이 되면 좋겠어요."
                  </p>
                </div>
                <div className="soft-surface rounded-xl p-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }}>
                      <svg width="14" height="14" viewBox="0 0 36 36" fill="none">
                        {[0,45,90,135,180,225,270,315].map((deg) => (
                          <ellipse key={deg} cx="18" cy="8" rx="3" ry="5.5" fill="#07223C" opacity={0.7} transform={`rotate(${deg} 18 18)`} />
                        ))}
                        <circle cx="18" cy="18" r="6.5" fill="#07223C" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-black" style={{ color: "var(--gold-text)" }}>해바라기 배지까지</span>
                    <span className="ml-auto text-[10.5px] text-muted">8,000원</span>
                  </div>
                </div>
              </div>
              <div data-sr="left" className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">02</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">Patron</span>
                </div>
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  재료를 선물하고 한마디를 남긴다
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
                  2~4만 원대로 시작합니다. <strong className="text-navy-800">Dear Gogh</strong> 메시지를 함께 보내고,
                  작가의 배송지는 공개되지 않습니다.
                  후원이 쌓이면 밤하늘에 별처럼 <strong className="text-navy-800">배지</strong>가 켜집니다.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">03</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">Process</span>
                </div>
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  전달을 확인하고, 편지로 답이 온다
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
                  재료가 <strong className="text-navy-800">작가에게 도착했는지까지</strong> 4단계로 확인합니다.
                  작가는 <strong className="text-navy-800">Dear Theo</strong> 편지에 창작 과정을 담아 보내고,
                  편지와 작업은 타임라인에 자동으로 쌓입니다.
                </p>
              </div>
              <div data-sr="left" data-d="1" className="nb-card p-6 flex flex-col gap-3">
                <div className="soft-surface rounded-xl p-3.5">
                  <div className="flex items-center gap-0 mt-1">
                    {[true, true, true, false].map((on, i) => (
                      <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className="w-[12px] h-[12px] rounded-full shrink-0"
                          style={{ background: on ? "var(--sv)" : "var(--navy-200)", border: on ? "2px solid var(--brutal)" : "2px solid var(--navy-300)" }} />
                        {i < 3 && <div className="h-[2.5px] flex-1" style={{ background: on ? "var(--sv-deep)" : "var(--navy-200)" }} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9.5px] mt-2.5 font-semibold">
                    <span className="text-muted">후원 완료</span>
                    <span className="text-muted">재료 준비</span>
                    <span className="text-navy-800">가는 중</span>
                    <span className="text-muted">작가 수령</span>
                  </div>
                </div>
                <div className="soft-surface rounded-xl p-3.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9.5px] text-navy-400 font-semibold">2026.08.14</span>
                    <div className="w-[22px] h-[27px] rounded-sm"
                      style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }} />
                  </div>
                  <p className="font-myeongjo text-[11.5px] font-bold text-navy-900 mb-1">지수 테오님께,</p>
                  <p className="font-myeongjo text-[11.5px] text-navy-900 leading-[1.85]">
                    보내주신 코발트블루가 어제 도착했습니다. 뚜껑을 열자마자 세 번째 캔버스의 하늘부터 올렸어요.
                  </p>
                  <div className="rounded-lg mt-2 h-[44px]"
                    style={{ background: "linear-gradient(155deg,#061A2E,var(--navy-700))" }} />
                </div>
              </div>
            </div>

            {/* Step 04 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-sr="right" data-d="1" className="order-2 md:order-1 nb-card p-6 flex flex-col gap-3"
                style={{ background: "var(--card-soft)" }}>
                <div className="rounded-xl overflow-hidden" style={{ border: "2px solid var(--brutal)" }}>
                  <div className="relative" style={{ height: "104px", background: "linear-gradient(150deg,#061A2E,var(--navy-700) 60%,var(--navy-500))" }}>
                    <span className="absolute bottom-[9px] left-3 text-[10.5px] font-bold" style={{ color: "rgba(250,240,202,.9)" }}>밤 연작 No.3 · 완성</span>
                  </div>
                  <div className="p-3" style={{ background: "var(--card)" }}>
                    <p className="font-myeongjo text-[11.5px] text-muted leading-[1.7]">재료 후원 — 지수, 하나, 무늬</p>
                  </div>
                </div>
                <div className="soft-surface rounded-xl p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="nb-tag text-[9px]">오픈스튜디오 초대</span>
                    <span className="ml-auto text-[10.5px] text-muted font-semibold">후원자 + 지인 1인</span>
                  </div>
                </div>
              </div>
              <div data-sr="left" className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="nb-step">04</div>
                  <span className="text-[11px] tracking-[0.18em] text-navy-400 font-bold uppercase">Complete</span>
                </div>
                <h3 className="font-black text-[26px] md:text-[32px] text-navy-900 mb-4 leading-[1.2]"
                  style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                  작품이 완성되면, 그 자리에 초대된다
                </h3>
                <p className="text-[15px] text-muted leading-[1.95] max-w-[400px]" style={{ wordBreak: "keep-all" }}>
                  내가 보낸 물감으로 완성된 작품을 <strong className="text-navy-800">작품 캡션에 이름이 남은 채로</strong> 만납니다.
                  작가가 판매를 선택하면 후원자에게 <strong className="text-navy-800">먼저 살 기회</strong>가 열리고,
                  전시·아띠에는 <strong className="text-navy-800">지인 한 명</strong>과 함께 올 수 있습니다.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 4. OPEN PROJECTS
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "var(--paper)" }} id="projects">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag mb-5 inline-flex">OPEN PROJECTS</span>
            <h2 className="font-black text-[28px] md:text-[40px] leading-[1.2] mt-4 mb-3 text-navy-900"
              style={{ letterSpacing: "-0.02em" }}>지금 시작되고 있는 작업</h2>
            <p className="text-[15px] text-muted leading-[1.9]">완성되기 전에 만나는 작품들입니다.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArtists.map((artist, i) => {
              const project = projectMap[artist.id];
              if (!project) return null;
              return (
                <div key={artist.id} data-sr="up" data-d={String(i + 1)}>
                  <ArtistCard artist={artist} project={project} />
                </div>
              );
            })}
          </div>

          {artists.length > 3 && (
            <div data-sr="up" data-d="4" className="text-center mt-12">
              <Link href="/atelier" className="nb-btn-outline text-[14px] px-7 py-3.5 rounded-xl font-black">
                전체 작가 보기 ({artists.length}명) →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 5. THEO BOT
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" id="bot"
        style={{ background: "linear-gradient(150deg,var(--navy-900) 0%,var(--navy-800) 55%,var(--navy-700) 100%)" }}>
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag-light mb-5 inline-flex">MEET THEO BOT</span>
            <h2 className="font-black text-[28px] md:text-[40px] leading-[1.2] mt-4 mb-4"
              style={{ color: "var(--chiffon)", wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
              취향을 설명하기 어려우면,<br />그냥 이야기하세요
            </h2>
            <p className="text-[15px] leading-[1.9] max-w-[440px] mx-auto" style={{ color: "rgba(250,240,202,.65)", wordBreak: "keep-all" }}>
              작품 이름을 몰라도 괜찮습니다. 느낌으로 말하면 테오 봇이 어울리는 작가를 찾아냅니다.
            </p>
          </div>

          <div className="max-w-[520px] mx-auto flex flex-col gap-3">
            {[
              { role: "bot", text: "안녕하세요, 저는 테오예요. 어떤 그림 앞에서 오래 멈춰 서시나요? 작품 이름을 몰라도 괜찮아요 — 느낌으로 말해주세요.", d: "1" },
              { role: "user", text: "짙은 밤색이 좋아요. 붓질이 거칠게 살아있는 유화 같은 것들이요.", d: "2" },
              { role: "bot", text: "좋아요. 그 어두움은 조용한 쪽인가요, 격정적인 쪽인가요?", d: "3" },
              { role: "user", text: "조용한 쪽이요. 도시의 밤 같은.", d: "4" },
            ].map((m, i) => (
              <div key={i} data-sr="up" data-d={m.d}
                className={`max-w-[84%] px-4 py-3 text-[13.5px] leading-[1.8] ${m.role === "user" ? "self-end" : ""}`}
                style={m.role === "bot"
                  ? { background: "rgba(250,240,202,.1)", border: "1.5px solid rgba(250,240,202,.2)", borderRadius: "16px 16px 16px 4px", color: "var(--chiffon)", wordBreak: "keep-all" }
                  : { background: "var(--sv)", border: "2px solid var(--brutal)", boxShadow: "3px 3px 0 var(--brutal)", borderRadius: "16px 16px 4px 16px", color: "var(--brutal)", fontWeight: 700, wordBreak: "keep-all" }
                }>
                {m.role === "bot" && (
                  <div className="flex gap-2.5 items-start">
                    <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }}>
                      <span className="font-black text-[8px]" style={{ color: "var(--brutal)" }}>T</span>
                    </div>
                    <span>{m.text}</span>
                  </div>
                )}
                {m.role === "user" && m.text}
              </div>
            ))}

            {/* 추천 결과 */}
            <div data-sr="up" data-d="5" className="nb-card p-4 mt-2">
              <div className="flex gap-[11px] items-start mb-3">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                  style={{ background: "var(--sv)", border: "1.5px solid var(--brutal)" }}>
                  <span className="font-black text-[8px]" style={{ color: "var(--brutal)" }}>T</span>
                </div>
                <span className="text-[13px] text-navy-800">
                  정리하면 — <strong>어두운 · 두터운 · 고요한 · 도시</strong>. 맞닿은 고흐 세 명을 찾았어요.
                </span>
              </div>
              <div className="soft-surface rounded-xl p-3 flex gap-3 items-center">
                <div className="w-[52px] h-[52px] rounded-[10px] shrink-0 overflow-hidden relative bg-navy-200"
                  style={{ border: "2px solid var(--brutal)" }}>
                  <Image src={artists[0].profileImage} alt={artists[0].name} fill sizes="52px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="text-[13px] font-black text-navy-900">{artists[0].name} · {artists[0].media[0]}</h6>
                  <p className="text-[11px] text-muted leading-[1.6] mt-0.5" style={{ wordBreak: "keep-all" }}>
                    "도시의 물가를 오래 바라보다 남은 잔상"이 취향과 맞닿아요.
                  </p>
                </div>
                <span className="nb-tag text-[9px]">92%</span>
              </div>
            </div>
          </div>

          <div data-sr="up" data-d="3" className="text-center mt-10">
            <Link href="/bot" className="nb-btn text-[14px] px-8 py-3.5 rounded-xl font-black">
              테오 봇으로 작가 찾기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 6. BADGES
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "var(--paper)" }} id="badges">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">

          <div data-sr="up" className="text-center mb-14">
            <span className="nb-tag mb-5 inline-flex">THEO BADGE</span>
            <h2 className="font-black text-[28px] md:text-[40px] leading-[1.2] mt-4 mb-4 text-navy-900"
              style={{ letterSpacing: "-0.02em" }}>후원할수록 쌓이는 나의 이야기</h2>
            <p className="text-[15px] text-muted max-w-[400px] mx-auto leading-relaxed" style={{ wordBreak: "keep-all" }}>
              유명해지기 전에 먼저 알아본 사람. 그 기록이 배지로 남습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                lv: "LV.01", name: "씨앗", cond: "첫 후원 1회",
                desc: "Dear Theo 편지 수신 시작. 작가의 창작 과정을 가장 먼저 받아봅니다.",
                symbol: (
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center" style={{ borderRadius: "12px" }}>
                    <div className="w-5 h-7 rounded-full" style={{ border: "2px solid var(--brutal)", background: "rgba(7,34,60,.15)" }} />
                  </div>
                ),
              },
              {
                lv: "LV.02", name: "해바라기", cond: "누적 10만원 또는 3회",
                desc: "신작 48시간 선공개. 일반 공개 전 먼저 감상하세요.",
                symbol: (
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center" style={{ borderRadius: "12px" }}>
                    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                      {[0,45,90,135,180,225,270,315].map((deg) => (
                        <ellipse key={deg} cx="18" cy="8" rx="3" ry="5.5" fill="var(--brutal)" opacity={0.6} transform={`rotate(${deg} 18 18)`} />
                      ))}
                      <circle cx="18" cy="18" r="6.5" fill="var(--brutal)" />
                      <circle cx="18" cy="18" r="4" fill="var(--sv)" opacity={0.6} />
                    </svg>
                  </div>
                ),
              },
              {
                lv: "LV.03", name: "밀밭", cond: "누적 30만원",
                desc: "오픈스튜디오 우선 신청. 작가의 작업실에 먼저 방문합니다.",
                symbol: (
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center gap-0.5" style={{ borderRadius: "12px" }}>
                    {[0,1,2].map((i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <div className="w-1.5 h-2 rounded-sm" style={{ background: "var(--brutal)", opacity: 0.7 }} />
                        <div className="w-0.5 h-4 rounded-full" style={{ background: "var(--brutal)", opacity: 0.5 }} />
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                lv: "LV.04", name: "별밤", cond: "누적 100만원",
                desc: "전시 오프닝 초대. 작가와 함께하는 특별한 밤.",
                symbol: (
                  <div className="w-11 h-11 mx-auto nb-step flex items-center justify-center" style={{ borderRadius: "12px" }}>
                    <div className="w-7 h-7" style={{
                      background: "var(--brutal)",
                      clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                    }} />
                  </div>
                ),
              },
            ].map((b, i) => (
              <div key={b.name} data-sr="scale" data-d={String(i + 1)} className="nb-card p-6 text-center">
                <p className="text-[10px] tracking-[0.18em] text-navy-400 font-bold mb-4">{b.lv}</p>
                <div className="mb-4">{b.symbol}</div>
                <h5 className="font-black text-[16px] text-navy-900 mb-1.5">{b.name}</h5>
                <p className="text-[11.5px] font-bold mb-3" style={{ color: "var(--gold-text)" }}>{b.cond}</p>
                <p className="text-[11.5px] text-muted leading-[1.75]" style={{ wordBreak: "keep-all" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 7. ARTY
          ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: "var(--paper)" }} id="community">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-12 items-center">

            <div data-sr="right">
              <span className="nb-tag mb-5 inline-flex">ARTY · 아띠</span>
              <h2 className="font-black text-[28px] md:text-[36px] text-navy-900 leading-[1.2] mt-4 mb-5"
                style={{ wordBreak: "keep-all", letterSpacing: "-0.02em" }}>
                내가 기여한 작품 앞에서<br />작가를 만납니다
              </h2>
              <p className="text-[15px] text-muted leading-[1.95]" style={{ wordBreak: "keep-all" }}>
                완성된 작품을 보는 자리에 후원자를 초대합니다.
                그때 보는 것은 남의 작품이 아니라 <strong className="text-navy-800">내가 보낸 물감으로 그려진 작품</strong>입니다.
                관객이 아니라 기여자로 그 자리에 서는 경험이라, 작가와의 대화도 감상이 아니라{" "}
                <strong className="text-navy-800">함께 만든 것에 대한 이야기</strong>가 됩니다.
              </p>
              <p className="text-[15px] text-muted leading-[1.95] mt-4" style={{ wordBreak: "keep-all" }}>
                <strong className="text-navy-800">지인 한 명</strong>을 데려올 수 있습니다.
                "내가 먼저 발견한 작가"를 보여주고 싶은 마음이, 다음 테오를 데려옵니다.
              </p>
            </div>

            <div data-sr="left" data-d="1" className="nb-card p-7" style={{ background: "var(--navy-900)" }}>
              <span className="nb-tag-light mb-4 inline-flex">OPEN STUDIO</span>
              <h4 className="font-black text-[20px] mt-3 mb-2" style={{ color: "var(--chiffon)" }}>윤도희 오픈스튜디오</h4>
              <p className="text-[13px] leading-[1.8]" style={{ color: "rgba(250,240,202,.7)", wordBreak: "keep-all" }}>
                후원하신 코발트블루로 완성한 밤 연작을 작업실에서 함께 봅니다.
              </p>
              <div className="flex gap-2 flex-wrap mt-4 mb-5">
                {["8/29(토) 15:00", "망원동", "6석 중 4석"].map((tag) => (
                  <span key={tag} className="text-[11.5px] px-3 py-1.5 rounded-lg font-semibold"
                    style={{ background: "rgba(250,240,202,.1)", border: "1px solid rgba(250,240,202,.25)", color: "var(--chiffon)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="#" className="nb-btn w-full rounded-xl font-black text-[13px] py-3">
                참가 신청
              </Link>
              <p className="mt-4 pt-4 text-[12.5px] leading-[1.7] font-semibold"
                style={{ borderTop: "1px solid rgba(250,240,202,.16)", color: "rgba(250,240,202,.75)" }}>
                <strong style={{ color: "var(--sv)" }}>+1</strong> 지인 한 분과 함께 오실 수 있어요
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          § 8. CLOSING CTA
          ════════════════════════════════════════ */}
      <section className="relative overflow-hidden text-center py-24 md:py-36 px-8"
        style={{ background: "linear-gradient(140deg,#061A2E 0%,#0D3B66 52%,#376590 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(244,211,94,.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {[{ top: "28px", left: "12%" }, { top: "70px", right: "14%" }, { bottom: "40px", left: "22%" }].map((s, i) => (
          <span key={i} className="absolute w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--sv)", opacity: 0.5, border: "1.5px solid var(--brutal)",
              top: (s as {top?:string}).top, bottom: (s as {bottom?:string}).bottom,
              left: (s as {left?:string}).left, right: (s as {right?:string}).right }} />
        ))}

        <div className="relative max-w-[680px] mx-auto">
          <h2 data-sr="up" className="font-black text-[36px] md:text-[52px] leading-[1.2] mb-5"
            style={{ color: "var(--chiffon)", letterSpacing: "-0.02em", wordBreak: "keep-all" }}>
            작가에게 첫 번째 별이<br />되어 주세요
          </h2>
          <p data-sr="up" data-d="1" className="font-black text-[15px] mb-10" style={{ color: "var(--sv)" }}>
            작가 수수료 0% · 시작은 무료예요
          </p>

          <div data-sr="up" data-d="2" className="flex gap-2 max-w-[460px] mx-auto rounded-xl p-2 mb-5 nb-card"
            style={{ background: "rgba(250,240,202,.08)" }}>
            <span className="flex items-center pl-1 text-[13.5px] shrink-0 font-semibold" style={{ color: "rgba(250,240,202,.5)" }}>theo.kr/</span>
            <input type="text" placeholder="활동명을 입력하세요" aria-label="아틀리에 주소"
              className="flex-1 border-none outline-none text-sm bg-transparent min-w-0 font-semibold"
              style={{ color: "var(--chiffon)" }} readOnly />
            <Link href="/onboarding/artist" className="nb-btn shrink-0 rounded-lg font-black text-[13px] px-4 py-2">
              아틀리에 열기
            </Link>
          </div>

          <p data-sr="fade" data-d="3" className="text-[13px] font-semibold" style={{ color: "rgba(250,240,202,.55)" }}>
            후원자로 오셨나요?{" "}
            <Link href="/bot" className="font-black hover:underline" style={{ color: "var(--sv)" }}>테오 봇으로 시작하기 →</Link>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#061A2E" }} className="text-chiffon pt-14 pb-9">
        <div className="max-w-[1080px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo-face.png" alt="THEO" className="w-7 h-7" />
                <b className="font-black tracking-[0.2em] text-sm" style={{ color: "var(--chiffon)" }}>THEO</b>
              </div>
              <p className="text-[12px] leading-[1.8] max-w-[230px]" style={{ color: "rgba(250,240,202,.5)" }}>
                시각예술 작가의 창작 재료를 후원하는 관계형 현물 후원 플랫폼
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "rgba(250,240,202,.4)" }}>서비스</p>
              <ul className="space-y-2.5">
                {[{ label: "작가로 시작하기", href: "/onboarding/artist" }, { label: "테오 봇", href: "/bot" }, { label: "진행 중 작업", href: "#projects" }, { label: "아띠 프로그램", href: "#community" }].map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-[12.5px] hover:text-chiffon transition-colors font-medium" style={{ color: "rgba(250,240,202,.7)" }}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "rgba(250,240,202,.4)" }}>도움말</p>
              <ul className="space-y-2.5">
                {["이용 방법", "자주 묻는 질문", "수수료 안내", "문의하기"].map((l) => (
                  <li key={l}><Link href="#how" className="text-[12.5px] hover:text-chiffon transition-colors font-medium" style={{ color: "rgba(250,240,202,.7)" }}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.14em] mb-4 uppercase font-bold" style={{ color: "rgba(250,240,202,.4)" }}>회사</p>
              <ul className="space-y-2.5">
                {["브랜드 스토리", "이용약관", "개인정보처리방침", "통신판매중개 고지"].map((l) => (
                  <li key={l}><Link href="#" className="text-[12.5px] hover:text-chiffon transition-colors font-medium" style={{ color: "rgba(250,240,202,.7)" }}>{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-[11.5px] font-medium"
            style={{ borderTop: "1px solid rgba(250,240,202,.1)", color: "rgba(250,240,202,.4)" }}>
            <span>© 2026 Theo</span>
            <span>테오는 재료 거래의 중개자이며, 재료의 하자·배송 책임은 약관에 따릅니다.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
