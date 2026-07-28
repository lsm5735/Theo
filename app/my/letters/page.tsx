import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import letters from "@/data/letters.json";
import artists from "@/data/artists.json";

export const metadata = {
  title: "내 편지함 — Theo",
};

export default function MyLettersPage() {
  const items = letters
    .map((l) => {
      const artist = artists.find((a) => a.id === l.artistId)!;
      return { ...l, artist };
    })
    .sort((a, b) => b.letter.createdAt.localeCompare(a.letter.createdAt));

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main className="max-w-[640px] mx-auto px-5 md:px-8 py-10">
        {/* Page header */}
        <div className="mb-10">
          <Link
            href="/my"
            className="text-xs text-muted hover:text-navy-700 transition-colors mb-4 inline-block"
          >
            ← 후원 대시보드
          </Link>

          <div className="flex items-end gap-4 mb-2">
            <h1 className="text-2xl font-black text-navy-800">내 편지함</h1>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full mb-0.5"
              style={{ background: "var(--sv)", color: "var(--ink)" }}
            >
              {letters.length}통
            </span>
          </div>
          <p className="font-myeongjo text-sm text-muted leading-relaxed">
            작가님들이 재료를 받고 보내온 편지예요. 창작이 어떻게 진행되고 있는지 읽어보세요.
          </p>
        </div>

        {/* Letter list */}
        <div className="space-y-2.5">
          {items.map((item) => {
            const d = new Date(item.letter.createdAt);
            const dateStr = `${d.getMonth() + 1}월 ${d.getDate()}일`;
            const excerpt = item.letter.content
              .replace(/\n/g, " ")
              .replace(/Dear Theo,.*$/, "")
              .trim()
              .slice(0, 72);

            return (
              <Link
                key={item.id}
                href={`/my/letters/${item.id}`}
                className="group flex items-start gap-4 rounded-xl px-4 py-4 border transition-all hover:shadow-card"
                style={{
                  background: "var(--chiffon)",
                  borderColor: "rgba(194,164,63,0.2)",
                }}
              >
                {/* Artist avatar */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 mt-0.5"
                  style={{ borderColor: "var(--sv-soft)" }}>
                  <Image
                    src={item.artist.profileImage}
                    alt={item.artist.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-navy-800 text-sm shrink-0">
                        {item.artist.name}
                      </span>
                      <span className="text-[10px] text-muted shrink-0 hidden sm:inline">
                        #{item.patronOrder}번 테오
                      </span>
                    </div>
                    <time className="text-[11px] text-muted shrink-0">{dateStr}</time>
                  </div>

                  <p className="font-myeongjo text-navy-700 text-[13.5px] leading-snug mb-1 truncate">
                    {item.letter.title}
                  </p>

                  <p className="text-xs text-muted leading-relaxed line-clamp-1">
                    {excerpt}…
                  </p>
                </div>

                {/* Arrow */}
                <span className="text-navy-300 group-hover:text-navy-500 transition-colors text-base mt-1 shrink-0">
                  ›
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
