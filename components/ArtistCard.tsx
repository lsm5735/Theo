import Link from "next/link";
import Image from "next/image";

interface Project {
  title: string;
  targetAmount: number;
  fundedAmount: number;
  sponsorCount: number;
  status: string;
}

interface Artist {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  genre: string;
  tags: string[];
  location: string;
  profileImage: string;
  recentWork: string;
  followers: number;
  totalSponsors: number;
  currentProject: Project;
}

const statusLabel: Record<string, { text: string; color: string }> = {
  recruiting: { text: "후원 모집 중", color: "bg-[--sv] text-[--ink]" },
  in_progress: { text: "작업 진행 중", color: "bg-navy-100 text-[--navy-700]" },
  completed:   { text: "완성", color: "bg-green-50 text-green-700" },
};

export default function ArtistCard({ artist }: { artist: Artist }) {
  const pct = Math.round((artist.currentProject.fundedAmount / artist.currentProject.targetAmount) * 100);
  const status = statusLabel[artist.currentProject.status] ?? { text: artist.currentProject.status, color: "bg-navy-100 text-[--navy-600]" };

  return (
    <Link href={`/artists/${artist.id}`} className="block group outline-none focus-visible:ring-2 focus-visible:ring-[--navy-800] rounded-xl">
      <article className="bg-white rounded-xl overflow-hidden border border-navy-100 shadow-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">

        {/* Work image */}
        <div className="relative h-52 overflow-hidden bg-navy-100">
          <Image
            src={artist.recentWork}
            alt={`${artist.name}의 최근 작품`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Genre badge */}
          <span className="absolute top-3 left-3 bg-[--navy-800] text-white text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide">
            {artist.genre}
          </span>

          {/* Status badge */}
          <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
            {status.text}
          </span>
        </div>

        <div className="p-5">
          {/* Artist info */}
          <div className="flex items-start gap-3 mb-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[--sv-soft] shrink-0">
              <Image
                src={artist.profileImage}
                alt={artist.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-[--navy-800] leading-tight">{artist.name}</p>
              <p className="text-sm text-[--muted] mt-0.5 truncate">{artist.oneLiner}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {artist.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[--navy-600] bg-navy-100 px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project */}
          <div className="border-t border-navy-100 pt-4">
            <p className="text-xs text-[--muted] mb-1">진행 중 프로젝트</p>
            <p className="text-sm font-semibold text-[--navy-800] mb-3 truncate">{artist.currentProject.title}</p>

            {/* Progress */}
            <div className="w-full bg-navy-100 rounded-full h-1.5 mb-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-[--sv] transition-all duration-700"
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[--muted]">
              <span className="font-medium text-[--navy-700]">{pct}% 달성</span>
              <span>테오 {artist.currentProject.sponsorCount}명</span>
            </div>
          </div>
        </div>

      </article>
    </Link>
  );
}
