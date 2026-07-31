"use client";

import { useState, useMemo } from "react";
import ArtistCard from "@/components/ArtistCard";
import { useT } from "@/contexts/LangContext";
import { DictKey } from "@/lib/translations";

interface Artist {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  genre: string;
  media: string[];
  careerStage: string;
  location: string;
  tags: string[];
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

const MEDIA_GROUPS: Record<string, string[]> = {
  "유화": ["유화", "유채"],
  "아크릴": ["아크릴"],
  "수채·과슈": ["수채", "과슈"],
  "오일파스텔": ["오일파스텔"],
  "혼합": ["혼합매체", "콜라주"],
};

const MOOD_TAGS: Record<string, string[]> = {
  "고요한": ["정적", "고요함", "담담함", "차분함", "적막", "건조함", "아득함", "응시", "서늘함", "낮은 체온"],
  "따뜻한": ["따뜻함", "애틋함", "다정함", "아늑함", "설렘", "미세한 온기", "가벼움"],
  "강렬한": ["묵직함", "긴장", "불안", "웅장함", "화려함", "북받침", "집요함", "북적임"],
  "서정적인": ["쓸쓸함", "여운", "머뭇거림", "미결정", "유기적", "리듬감", "성실함", "솔직함"],
};

const MEDIA_OPTIONS = ["전체", ...Object.keys(MEDIA_GROUPS)];
const MOOD_OPTIONS = ["전체", ...Object.keys(MOOD_TAGS)];

const MEDIA_DISPLAY: Record<string, DictKey> = {
  "전체": "filter_all",
  "유화": "media_oil",
  "아크릴": "media_acrylic",
  "수채·과슈": "media_watercolor",
  "오일파스텔": "media_oilpastel",
  "혼합": "media_mixed",
};

const MOOD_DISPLAY: Record<string, DictKey> = {
  "전체": "filter_all",
  "고요한": "mood_quiet",
  "따뜻한": "mood_warm",
  "강렬한": "mood_intense",
  "서정적인": "mood_lyrical",
};

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 text-[13px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
        active
          ? "bg-navy-800 text-white border-navy-800 shadow-sm"
          : "bg-white text-navy-700 border-navy-200 hover:border-navy-500 hover:text-navy-800"
      }`}
    >
      {label}
    </button>
  );
}

export default function AtelierClient({
  artists,
  projectMap,
  total,
}: {
  artists: Artist[];
  projectMap: Record<string, Project>;
  total: number;
}) {
  const t = useT();
  const [selectedMedia, setSelectedMedia] = useState("전체");
  const [selectedMood, setSelectedMood] = useState("전체");

  const filtered = useMemo(() => {
    return artists.filter((artist) => {
      if (selectedMedia !== "전체") {
        const group = MEDIA_GROUPS[selectedMedia] ?? [];
        if (!artist.media.some((m) => group.includes(m))) return false;
      }
      if (selectedMood !== "전체") {
        const moodTags = MOOD_TAGS[selectedMood] ?? [];
        if (!artist.tags.some((tag) => moodTags.includes(tag))) return false;
      }
      return true;
    });
  }, [artists, selectedMedia, selectedMood]);

  const isFiltered = selectedMedia !== "전체" || selectedMood !== "전체";

  function reset() {
    setSelectedMedia("전체");
    setSelectedMood("전체");
  }

  return (
    <>
      {/* ── Filter bar ── */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-8">
        <div className="bg-white rounded-2xl border border-line px-5 py-4 shadow-card space-y-3">
          {/* Media row */}
          <div className="flex items-center gap-3">
            <span
              className="text-[10.5px] font-bold tracking-[0.22em] uppercase shrink-0"
              style={{ color: "var(--navy-400)", width: "2.8rem" }}
            >
              {t("filter_medium")}
            </span>
            <div
              className="flex gap-2 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {MEDIA_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt}
                  label={t(MEDIA_DISPLAY[opt])}
                  active={selectedMedia === opt}
                  onClick={() => setSelectedMedia(opt)}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-line" />

          {/* Mood row */}
          <div className="flex items-center gap-3">
            <span
              className="text-[10.5px] font-bold tracking-[0.22em] uppercase shrink-0"
              style={{ color: "var(--navy-400)", width: "2.8rem" }}
            >
              {t("filter_mood")}
            </span>
            <div
              className="flex gap-2 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {MOOD_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt}
                  label={t(MOOD_DISPLAY[opt])}
                  active={selectedMood === opt}
                  onClick={() => setSelectedMood(opt)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Result summary */}
        <div className="flex items-center justify-between mt-4 min-h-[22px]">
          {isFiltered ? (
            <>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                <b className="text-navy-800">{filtered.length}</b>{t("filter_found")}
              </p>
              <button
                onClick={reset}
                className="text-xs font-medium underline underline-offset-2"
                style={{ color: "var(--navy-500)" }}
              >
                {t("filter_reset")}
              </button>
            </>
          ) : (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {t("filter_total_pre")} <b className="text-navy-800">{total}</b>{t("filter_waiting")}
            </p>
          )}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <p className="text-base" style={{ color: "var(--muted)" }}>
              {t("filter_empty")}
            </p>
            <button
              onClick={reset}
              className="text-sm font-semibold underline underline-offset-2"
              style={{ color: "var(--navy-700)" }}
            >
              {t("filter_reset2")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((artist) => {
              const project = projectMap[artist.id];
              if (!project) return null;
              return (
                <ArtistCard key={artist.id} artist={artist} project={project} />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
