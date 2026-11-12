import BigTitle from "@/components/BigTitle";

/** 하위 페이지 공통 상단 — 가로폭을 꽉 채우는 대형 타이틀 + 점선 */
export default function PageTitle({ text }: { text: string }) {
  return (
    <section className="px-[var(--gap)] pt-8 md:pt-14 w-full">
      <div className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-6 md:pb-10">
        <BigTitle text={text} minChars={10} />
      </div>
      <hr className="dots-x" />
    </section>
  );
}
