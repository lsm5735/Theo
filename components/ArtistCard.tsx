"use client";

import Link from "next/link";
import Image from "next/image";
import { useT } from "@/contexts/LangContext";

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

function getStatusLabel(status: string, t: ReturnType<typeof useT>) {
  const map: Record<string, { text: string; color: string }> = {
    recruiting:  { text: t("status_recruiting"),  color: "bg-sv text-ink" },
    in_progress: { text: t("status_in_progress"), color: "bg-navy-100 text-navy-700" },
    completed:   { text: t("status_completed"),   color: "bg-navy-200 text-navy-700" },
  };
  return map[status] ?? { text: status, color: "bg-navy-100 text-navy-600" };
}

export default function ArtistCard({ artist, project }: { artist: Artist; project: Project }) {
  const t = useT();
  const pct = Math.round((project.fundedAmount / project.targetAmount) * 100);
  const status = getStatusLabel(project.status, t);

  return (
    <article className="bg-card rounded-2xl overflow-hidden border border-line shadow-card hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      {/* 썸네일 — 클릭 시 아틀리에 이동 */}
      <Link href={`/atelier/${artist.slug}`} className="block group relative h-[140px] overflow-hidden bg-navy-100 shrink-0">
        <Image
          src={artist.coverImage}
          alt={`${artist.name}의 작품`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <span className={`absolute top-3 left-3 text-[10.5px] font-bold px-2.5 py-1 rounded-full ${status.color}`}>
          {status.text}
        </span>
        <span className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-sm text-[10.5px] font-semibold px-2.5 py-1 rounded-full">
          {artist.genre}
        </span>
      </Link>

      {/* 본문 */}
      <div className="p-[18px] flex flex-col flex-1">
        <p className="text-[11.5px] text-navy-500 font-medium mb-2">{artist.location}</p>

        <div className="flex items-start gap-3 mb-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-sv-soft shrink-0">
            <Image src={artist.profileImage} alt={artist.name} fill sizes="36px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-navy-900 text-[14px] leading-tight">{artist.name}</p>
            <p className="text-[12px] font-myeongjo text-navy-600 mt-0.5 line-clamp-2 leading-relaxed">{artist.oneLiner}</p>
          </div>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {artist.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] text-navy-700 bg-navy-100 px-2.5 py-0.5 rounded-full font-semibold">
              {tag}
            </span>
          ))}
        </div>

        {/* 프로젝트 */}
        <div className="border-t border-navy-100 pt-3.5 mb-4">
          <p className="text-[12.5px] text-navy-800 font-semibold mb-0.5 line-clamp-1">{project.title}</p>
          <p className="text-[11.5px] text-navy-500 mb-2">목표 {project.targetAmount.toLocaleString()}원</p>

          <div className="h-[6px] rounded-full bg-navy-100 overflow-hidden mb-1.5">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(pct, 100)}%`,
                background: "linear-gradient(90deg,var(--sv),var(--sv-deep))",
                transition: "width 0.7s ease",
              }}
            />
          </div>

          <div className="flex justify-between text-[11.5px]">
            <span className="text-navy-700 font-semibold"><b className="text-navy-900">{pct}%</b> {t("pct_achieved")}</span>
            <span className="text-navy-500">테오 {project.sponsorCount}{t("theo_count_suffix")}</span>
          </div>
        </div>

        {/* 신청하기 버튼 */}
        <Link
          href={`/atelier/${artist.slug}/apply`}
          onClick={(e) => e.stopPropagation()}
          className="mt-auto block w-full text-center text-[13px] font-bold bg-navy-800 text-chiffon py-2.5 rounded-xl hover:bg-navy-700 transition-colors"
        >
          신청하기
        </Link>
      </div>
    </article>
  );
}
