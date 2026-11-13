import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
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

const LEFT = "md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0";
const RIGHT = "w-full md:w-[calc((100vw-var(--gap)*2)*0.75)]";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="px-[var(--gap)]">
      <div className="flex flex-col md:flex-row py-12 md:py-16 gap-6 md:gap-0">
        <div className={LEFT}>
          <span className="type-section">{label}</span>
        </div>
        <div className={RIGHT}>{children}</div>
      </div>
      <hr className="dots-x" />
    </section>
  );
}

export default function ShowPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <section className="px-[var(--gap)] pt-10 md:pt-16">
          <div data-sr="fade" className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-8 md:pb-14">
            <BigTitle text="[CONTINUE]" />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 전시 이미지 */}
        <section className="pb-12 md:pb-16">
          {/* 포스터(843×1191)를 위·아래 반(843×595)으로 나눠 가로로 나란히 붙인다: 왼쪽 = 위쪽 절반, 오른쪽 = 아래쪽 절반. 화면 폭 끝까지 꽉 채운다 */}
          <div data-sr="up" role="img" aria-label="[CONTINUE] 전시 포스터" className="grid grid-cols-2 w-full overflow-hidden bg-surface-card">
            <div className="relative aspect-[843/595.5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/show-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="relative aspect-[843/595.5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/show-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-bottom" />
            </div>
          </div>
          <div className="px-[var(--gap)]"><hr className="dots-x mt-12 md:mt-16" /></div>
        </section>

        <Row label="Info">
          <dl>
            {INFO.map((i, n) => (
              <div key={i.label}>
                {n > 0 && <hr className="dots-x" />}
                <div data-sr="up" className="grid grid-cols-[6rem_1fr] md:grid-cols-[10rem_1fr] gap-4 py-5">
                  <dt className="type-label text-muted pt-2">{i.label}</dt>
                  <dd className="type-m">{i.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="About">
          <p data-sr="up" className="type-m max-w-[38rem] mb-6" style={{ wordBreak: "keep-all" }}>
            [입력 예시] 전시를 소개하는 한두 문장이 들어갈 자리입니다.
          </p>
          <p data-sr="up" className="text-[16px] leading-[1.95] text-muted max-w-[38rem]" style={{ wordBreak: "keep-all" }}>
            [입력 예시] 전시의 기획 의도와 이야기가 들어갈 자리입니다. 어떤 주제로 열리는 전시인지, 어떤 작품을 만날 수 있는지 적어 주세요.
          </p>
        </Row>

        <Row label="Artists">
          <p data-sr="up" className="text-[16px] text-muted">[입력 예시] 참여 작가 소개가 들어갈 자리입니다.</p>
        </Row>

        <section className="px-[var(--gap)] py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-0">
            <div className={LEFT} />
            <div className={`${RIGHT} flex flex-wrap gap-3`}>
              <Link href="/community" className="nb-btn px-7 py-3 text-[15px]">함께하는 프로그램 보기 →</Link>
              <Link href="/atelier" className="nb-btn-outline px-7 py-3 text-[15px]">작가 아틀리에 보기 →</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
