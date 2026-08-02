import Header from "@/components/Header";
import AtelierClient from "./AtelierClient";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";

export const metadata = {
  title: "Atelier — Theo",
  description: "지금 후원 가능한 신진 작가 20명",
};

export default function AtelierPage() {
  const projectMap = Object.fromEntries(
    projects.map((p) => [p.artistId, p])
  );

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* Page header */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pt-14 pb-8">
        <p data-sr="fade" className="text-[11px] tracking-[0.24em] text-navy-400 font-semibold uppercase mb-3">
          ATELIER
        </p>
        <div>
          <h1 data-sr="up" className="text-3xl md:text-[40px] font-bold text-navy-900 leading-tight">
            지금 후원 가능한 작가
          </h1>
          <p data-sr="up" data-d="1" className="text-muted text-sm md:text-base mt-2 leading-relaxed">
            창작에 필요한 재료를 선물하고, 창작 과정을 편지로 받아보세요.
          </p>
        </div>
      </section>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <AtelierClient
        artists={artists as any}
        projectMap={projectMap as any}
        total={artists.length}
      />
    </div>
  );
}
