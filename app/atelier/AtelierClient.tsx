"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MyAtelierCard from "@/components/atelier/MyAtelierCard";
import { useMyAteliers } from "@/lib/myAtelier";
import { useT } from "@/contexts/LangContext";

interface Artist {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  oneLiner: string;
  careerStage: string;
  profileImage: string;
  coverImage: string;
}

export default function AtelierClient({ artists }: { artists: Artist[] }) {
  const t = useT();
  const myAteliers = useMyAteliers() ?? [];
  const [hover, setHover] = useState(0);

  return (
    <>
      {/* ── 작가 인덱스 ── */}
      <section className="px-[var(--gap)]">
        <div className="flex flex-col md:flex-row py-10 md:py-12 gap-6 md:gap-0">
          <div className="hidden md:flex flex-col gap-3 md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0">
            <span className="type-section">Artists</span>
          </div>

          <div className="relative w-full md:w-[calc((100vw-var(--gap)*2)*0.75)] md:pl-0">
            <p data-sr="up" className="type-m max-w-[34rem] mb-10 md:mb-14" style={{ wordBreak: "keep-all" }}>
              창작에 필요한 재료를 선물하고, 창작 과정을 담벼락에서 함께 지켜보세요.
            </p>

            <ul className="flex flex-col gap-5 md:gap-4 md:max-w-[calc((100vw-var(--gap)*2)*0.65)]">
              {artists.map((a, i) => {
                return (
                  <li
                    key={a.id}
                    data-sr="up"
                    data-d={String((i % 4) + 1)}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                  >
                    <Link href={`/atelier/${a.slug}`} className="flex items-center gap-4 group">
                      {/* 모바일 썸네일 */}
                      <span className="relative block md:hidden w-14 aspect-[1/1.25] shrink-0 overflow-hidden bg-surface-card">
                        <Image src={a.coverImage} alt={a.name} fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="flex flex-col md:flex-row md:items-baseline md:gap-5 min-w-0">
                        <span className="type-xl leading-none underlined group-hover:underline">{a.name}</span>
                        {a.nameEn && <span className="type-label text-muted mt-1.5 md:mt-0" style={{ fontSize: "clamp(15px, 1.4vw, 20px)" }}>{a.nameEn}</span>}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* 데스크톱 hover 미리보기 */}
            <div className="hidden md:block absolute top-0 right-0">
              <div className="relative aspect-[1/1.25] w-[14rem] bg-surface-card">
                {artists.map((a, i) => (
                  <div key={a.id} className={`absolute inset-0 transition-opacity duration-200 ${hover === i ? "opacity-100" : "opacity-0"}`}>
                    <Image src={a.coverImage} alt={a.name} fill sizes="14rem" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="dots-x" />
      </section>

      {/* ── 이 브라우저에서 개설한 아틀리에 (데모: DB 연결 전까지 본인 브라우저에서만 보임) ── */}
      {myAteliers.length > 0 && (
        <section className="px-[var(--gap)]">
          <div className="flex flex-col md:flex-row py-10 md:py-12 gap-6 md:gap-0">
            <div className="md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0">
              <span className="type-section">{t("ma_local_title")}</span>
              <p className="text-[14px] text-muted mt-2 max-w-[14rem]">{t("ma_local_note")}</p>
            </div>
            <div className="w-full md:w-[calc((100vw-var(--gap)*2)*0.75)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...myAteliers].reverse().map((a) => <MyAtelierCard key={a.id} atelier={a} />)}
            </div>
          </div>
          <hr className="dots-x" />
        </section>
      )}
    </>
  );
}
