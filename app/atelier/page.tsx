import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
import AtelierClient from "./AtelierClient";
import artists from "@/data/artists.json";

export const metadata = {
  title: "Atelier — Theo",
  description: "지금 선물 가능한 신진 작가 4명",
};

export default function AtelierPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <section className="tone-sun px-[var(--gap)] pt-10 md:pt-16">
          <div data-sr="fade" className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-8 md:pb-14">
            <BigTitle text="Atelier" />
          </div>
          <hr className="dots-x" />
        </section>

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <AtelierClient artists={artists as any} />
      </main>
    </div>
  );
}
