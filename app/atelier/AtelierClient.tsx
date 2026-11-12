"use client";

import ArtistCard from "@/components/ArtistCard";
import MyAtelierCard from "@/components/atelier/MyAtelierCard";
import { useMyAteliers } from "@/lib/myAtelier";
import { useT } from "@/contexts/LangContext";

interface Artist {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  careerStage: string;
  profileImage: string;
  coverImage: string;
  followers: number;
  totalSponsors: number;
}

interface Project {
  id: string;
  artistId: string;
  title: string;
  targetAmount: number;
  fundedAmount: number;
  sponsorCount: number;
  status: string;
}

export default function AtelierClient({
  artists,
  projectMap,
}: {
  artists: Artist[];
  projectMap: Record<string, Project>;
}) {
  const t = useT();
  const myAteliers = useMyAteliers() ?? [];
  return (
    <>
      {/* ── 이 브라우저에서 개설한 아틀리에 (데모: DB 연결 전까지 본인 브라우저에서만 보임) ── */}
      {myAteliers.length > 0 && (
        <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-10">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-[22px] font-semibold text-ink">{t("ma_local_title")}</h2>
            <span className="text-xs text-muted">{t("ma_local_note")}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...myAteliers].reverse().map((a) => <MyAtelierCard key={a.id} atelier={a} />)}
          </div>
        </section>
      )}

      {/* ── Grid ── */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {artists.map((artist, index) => {
              const project = projectMap[artist.id];
              if (!project) return null;
              return (
                <div key={artist.id} data-sr="up" data-d={String((index % 4) + 1)}>
                  <ArtistCard artist={artist} project={project} />
                </div>
              );
            })}
          </div>
      </section>
    </>
  );
}
