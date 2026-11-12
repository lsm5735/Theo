"use client";

import Link from "next/link";
import Image from "next/image";

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

export default function ArtistCard({ artist, mode = "atelier" }: { artist: Artist; mode?: "atelier" | "apply" }) {
  const href = mode === "apply" ? `/atelier/${artist.slug}/apply` : `/atelier/${artist.slug}`;

  return (
    <article className="group h-full flex flex-col">
      {/* 이미지 — 4:5, 각진 모서리 */}
      <Link href={`/atelier/${artist.slug}`} className="block relative aspect-[1/1.25] overflow-hidden bg-surface-card">
        <Image
          src={artist.coverImage}
          alt={`${artist.name}의 작품`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </Link>

      {/* 캡션 */}
      <div className="pt-3 flex flex-col flex-1">
        <p className="type-label mb-1.5 text-muted">{artist.nameEn ?? ""}</p>
        <h3 className="leading-[1.1]" style={{ fontSize: "clamp(32px, 3vw, 46px)" }}>{artist.name}</h3>

        <Link
          href={href}
          onClick={(e) => e.stopPropagation()}
          className="mt-3 self-start text-[14px] link-line"
        >
          {mode === "apply" ? "신청하기" : "아틀리에 입장"} →
        </Link>
      </div>
    </article>
  );
}
