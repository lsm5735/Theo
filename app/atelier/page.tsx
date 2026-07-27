import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
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
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pt-14 pb-10">
        <p className="text-[11px] tracking-[0.24em] text-navy-400 font-semibold uppercase mb-3">
          ATELIER
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-[40px] font-bold text-navy-900 leading-tight">
              지금 후원 가능한 작가
            </h1>
            <p className="text-muted text-sm md:text-base mt-2 leading-relaxed">
              창작에 필요한 재료를 선물하고, 창작 과정을 편지로 받아보세요.
            </p>
          </div>
          <span className="text-sm text-muted shrink-0">총 {artists.length}명</span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {artists.map((artist) => {
            const project = projectMap[artist.id];
            if (!project) return null;
            return (
              <ArtistCard key={artist.id} artist={artist} project={project} />
            );
          })}
        </div>
      </section>
    </div>
  );
}
