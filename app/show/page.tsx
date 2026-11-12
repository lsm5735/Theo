import Header from "@/components/Header";
import Link from "next/link";

export const metadata = {
  title: "Show — Theo",
  description: "팝업 전시 [CONTINUE]",
};

const INFO = [
  { label: "전시명", value: "팝업 전시 [CONTINUE]" },
  { label: "일정", value: "2026. 11. 28 (토) – 11. 29 (일)" },
  { label: "장소", value: "서울 종로구 창덕궁길 83-1" },
];

export default function ShowPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* Hero */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pt-14 pb-10">
        <p data-sr="fade" className="nb-tag mb-5">
          SHOW
        </p>
        <h1 data-sr="up" className="text-[34px] md:text-[52px] font-semibold text-ink leading-[1.1]">
          [CONTINUE]
        </h1>
        <p data-sr="up" data-d="1" className="text-muted text-sm md:text-base mt-3 leading-relaxed max-w-[560px]">
          [입력 예시] 전시를 소개하는 한두 문장이 들어갈 자리입니다.
        </p>
      </section>

      {/* 전시 포스터·메인 이미지 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-10">
        <div
          data-sr="up"
          className="relative w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden border border-line bg-navy-100 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-museum.jpg" alt="[CONTINUE] 전시 이미지" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <span className="relative text-white/80 text-sm font-semibold">[입력 예시] 전시 포스터·메인 이미지</span>
        </div>
      </section>

      {/* 전시 정보 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-10">
        <div data-sr="up" className="bg-card border border-line rounded-2xl p-6 md:p-8 grid gap-4 md:grid-cols-3">
          {INFO.map((i) => (
            <div key={i.label}>
              <p className="text-[10.5px] font-bold tracking-[0.18em] text-navy-400 uppercase mb-1">{i.label}</p>
              <p className="text-[15px] font-semibold text-navy-900 leading-snug">{i.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 전시 소개 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-10">
        <h2 data-sr="up" className="text-[22px] font-semibold text-ink mb-3">전시 소개</h2>
        <p data-sr="up" className="text-sm text-ink leading-[1.95] max-w-[720px]">
          [입력 예시] 전시의 기획 의도와 이야기가 들어갈 자리입니다. 어떤 주제로 열리는 전시인지, 어떤 작품을 만날 수 있는지 적어 주세요.
        </p>
      </section>

      {/* 참여 작가 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-10">
        <h2 data-sr="up" className="text-[22px] font-semibold text-ink mb-3">참여 작가</h2>
        <p data-sr="up" className="text-sm text-muted">[입력 예시] 참여 작가 소개가 들어갈 자리입니다.</p>
      </section>

      {/* 프로그램 연결 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-24">
        <div data-sr="up" className="flex flex-wrap gap-3">
          <Link
            href="/community"
            className="inline-flex items-center bg-navy-800 text-chiffon font-bold rounded-lg hover:bg-navy-700 transition-colors"
            style={{ fontSize: "13px", padding: "10px 18px" }}
          >
            함께하는 프로그램 보기
          </Link>
          <Link
            href="/atelier"
            className="inline-flex items-center border border-navy-300 text-navy-700 font-bold rounded-lg hover:bg-navy-100 transition-colors"
            style={{ fontSize: "13px", padding: "10px 18px" }}
          >
            작가 아틀리에 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
