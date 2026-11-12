/** 기능 페이지(선물·신청·마이 등) 공통 상단 — 내용이 바로 보이도록 낮은 노란 띠에 제목만 */
export default function PageTitle({ text }: { text: string }) {
  return (
    <section className="tone-sun px-[var(--gap)] py-5 md:py-7 w-full">
      <h1 className="leading-[.95]" style={{ fontSize: "clamp(34px, 4.4vw, 60px)" }}>{text}</h1>
    </section>
  );
}
