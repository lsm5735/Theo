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
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
      </Link>

      {/* 캡션 — 점선 아래 이름을 크게 */}
      <div className="pt-4 flex flex-col flex-1">
        <hr className="dots-x mb-3" />
        <p className="type-label mb-2 text-muted">{artist.nameEn ?? ""}</p>
        <h3 className="leading-[1.05]" style={{ fontSize: "clamp(30px, 3.4vw, 54px)" }}>{artist.name}</h3>

        <Link
          href={href}
          onClick={(e) => e.stopPropagation()}
          className="mt-4 self-start text-[15px] link-line"
        >
          {mode === "apply" ? "신청하기" : "아틀리에 입장"} →
        </Link>
      </div>
    </article>
  );
}
