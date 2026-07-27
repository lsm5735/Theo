import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
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
  coverImage: string;
  followers: number;
  totalSponsors: number;
}

const statusLabel: Record<string, { text: string; color: string }> = {
  recruiting:  { text: "후원 모집 중",  color: "bg-sv text-ink" },
  in_progress: { text: "작업 진행 중",  color: "bg-navy-100 text-navy-700" },
  completed:   { text: "완성",          color: "bg-navy-200 text-navy-700" },
};

export default function ArtistCard({ artist, project }: { artist: Artist; project: Project }) {
  const pct = Math.round(
    (project.fundedAmount / project.targetAmount) * 100
  );
  const status =
    statusLabel[project.status] ??
    { text: project.status, color: "bg-navy-100 text-navy-600" };

  return (
    <Link
      href={`/artists/${artist.id}`}
      className="block group outline-none focus-visible:ring-2 focus-visible:ring-navy-800 rounded-2xl"
    >
      <article
        className="bg-card rounded-2xl overflow-hidden border border-line hover:-translate-y-0.5 transition-all duration-200"
        style={{ boxShadow: '0 8px 22px rgba(23,29,43,.06)' }}
      >
        {/* Thumbnail */}
        <div className="relative h-[132px] overflow-hidden bg-navy-100">
          <Image
            src={artist.coverImage}
            alt={`${artist.name}의 작품`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Status badge */}
          <span className={`absolute top-3 left-3 text-[10.5px] font-bold px-2.5 py-1 rounded-full ${status.color}`}>
            {status.text}
          </span>

          {/* Genre badge */}
          <span className="absolute top-3 right-3 bg-paper/92 text-navy-800 text-[10.5px] font-semibold px-2.5 py-1 rounded-full">
            {artist.genre}
          </span>
        </div>

        <div className="p-[18px]">
          {/* Artist who */}
          <p className="text-[11.5px] text-muted mb-1.5">{artist.location}</p>

          <div className="flex items-start gap-3 mb-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-sv-soft shrink-0">
              <Image
                src={artist.profileImage}
                alt={artist.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-navy-900 text-sm leading-tight">{artist.name}</p>
              <p className="text-[12.5px] font-myeongjo text-muted mt-0.5 truncate">{artist.oneLiner}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {artist.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-navy-600 bg-navy-100 px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project */}
          <div className="border-t border-navy-100 pt-4">
            <p className="text-[12px] font-myeongjo text-muted mb-1 truncate">{project.title}</p>

            {/* Progress bar */}
            <div
              className="h-[7px] rounded-full bg-navy-100 overflow-hidden mt-2 mb-1.5"
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(pct, 100)}%`,
                  background: 'linear-gradient(90deg,var(--sv),var(--sv-deep))',
                  transition: 'width 0.7s ease',
                }}
              />
            </div>

            <div className="flex justify-between text-[11.5px] text-muted">
              <span>
                <b className="text-navy-800">{pct}%</b> 달성
              </span>
              <span>테오 {project.sponsorCount}명</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
