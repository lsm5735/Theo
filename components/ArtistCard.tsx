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
  nameEn?: string;
  oneLiner: string;
  profileImage: string;
  coverImage: string;
  followers: number;
  totalSponsors: number;
}

export default function ArtistCard({ artist, project, mode = "atelier" }: { artist: Artist; project: Project; mode?: "atelier" | "apply" }) {
  const t = useT();

  return (
    <article className="h-full bg-card rounded-2xl overflow-hidden border border-line shadow-card hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

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

      </Link>

      {/* 본문 */}
      <div className="p-[18px] flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-sv-soft shrink-0">
            <Image src={artist.profileImage} alt={artist.name} fill sizes="36px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-navy-900 text-[14px] leading-tight">{artist.name}{artist.nameEn && <span className="ml-1.5 text-[10.5px] font-semibold tracking-wider text-navy-400">{artist.nameEn}</span>}</p>
            <p className="text-[12px] font-myeongjo text-navy-600 mt-0.5 line-clamp-2 leading-relaxed">{artist.oneLiner}</p>
          </div>
        </div>

        {/* 프로젝트 */}
        <div className="border-t border-navy-100 pt-3.5 mb-4">
          <p className="text-[12.5px] text-navy-800 font-semibold mb-0.5 line-clamp-1">{project.title}</p>
          <p className="text-[11.5px] text-navy-500 mb-2">목표 {project.targetAmount.toLocaleString()}원</p>

          <p className="text-[11.5px] text-navy-500">테오 {project.sponsorCount}{t("theo_count_suffix")}</p>
        </div>

        <Link
          href={mode === "apply" ? `/atelier/${artist.slug}/apply` : `/atelier/${artist.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-auto block w-full text-center text-[13px] font-bold bg-navy-900 text-white py-2.5 rounded-xl hover:bg-navy-800 transition-colors"
        >
          {mode === "apply" ? "신청하기" : "아틀리에 입장"}
        </Link>
      </div>
    </article>
  );
}
