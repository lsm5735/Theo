"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Wall from "@/components/atelier/Wall";
import { useMySponsorships } from "@/lib/sponsorships";
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
  artistNote: string;
}

interface Project {
  id: string;
  artistId: string;
  title: string;
  concept: string;
  targetAmount: number;
  fundedAmount: number;
  sponsorCount: number;
  status: string;
  sketchImage: string;
}

interface Material {
  id: string;
  artistId: string;
  name: string;
  usageNote: string;
  price: number;
  isFunded: boolean;
  imageUrl?: string;
}

interface Props {
  artist: Artist;
  project: Project | null;
  materials: Material[];
}

export default function AtelierDetailClient({ artist, project, materials }: Props) {
  const t = useT();
  // 이 작가를 선물한 테오만 담벼락에 글을 남길 수 있음
  const mySponsorship = useMySponsorships()?.find((sp) => sp.artistId === artist.id);


  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* Cover */}
      <div className="relative h-56 md:h-72 w-full bg-navy-200">
        <Image
          src={artist.coverImage}
          alt={`${artist.name} 커버`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top,rgba(7,34,60,.7) 0%,rgba(13,59,102,.2) 50%,transparent 100%)" }}
        />

        {/* Back */}
        <div className="absolute top-4 left-5 md:left-8">
          <Link
            href="/atelier"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            {t("back_atelier")}
          </Link>
        </div>

      </div>

      {/* Main content */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-8">

        {/* Profile card — overlaps cover */}
        <div className="relative -mt-12 mb-10">
          <div
            data-sr="up"
            className="bg-card rounded-3xl p-7 border border-line"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-sv-soft shrink-0 shadow-sm">
                <Image src={artist.profileImage} alt={artist.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h1 className="text-[30px] font-semibold text-ink mb-1 leading-tight" style={{ letterSpacing: "-0.03em" }}>{artist.name}</h1>
                {artist.nameEn && <p className="text-[11px] font-semibold tracking-[0.2em] text-navy-400 mb-1.5">{artist.nameEn}</p>}
                <p className="font-myeongjo text-navy-600 text-sm mb-2">{artist.oneLiner}</p>
                <p className="text-xs text-muted">
                  {artist.careerStage} 작가
                </p>
              </div>
            </div>

            {/* Artist note */}
            <p className="text-sm text-ink leading-[1.95]">
              {artist.artistNote}
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 pb-20">

          {/* Left */}
          <div className="space-y-10">

            {/* Current project */}
            {project && (
              <section data-sr="up">
                <h2 className="text-[22px] font-semibold text-ink mb-4">{t("section_project")}</h2>
                <div
                  className="bg-card rounded-2xl overflow-hidden border border-line"
                >
                  <div className="relative h-48">
                    <Image
                      src={project.sketchImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 720px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,34,60,.6),transparent 60%)" }} />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-base leading-snug">{project.title}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-ink leading-relaxed mb-5">{project.concept}</p>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-navy-800">
                        {project.fundedAmount.toLocaleString()}{t("raised_suffix")}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted mt-1.5">
                      <span>{t("goal_label")} {project.targetAmount.toLocaleString()}원</span>
                      <span>테오 {project.sponsorCount}{t("sponsor_count_suffix")}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-navy-100">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-xs text-navy-600 hover:text-navy-800 font-semibold transition-colors"
                      >
                        {t("project_detail")}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 선물하기 */}
            {materials.length > 0 && (
              <section data-sr="up">
                <h2 className="text-[22px] font-semibold text-ink mb-4">{t("section_materials")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {materials.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-xl overflow-hidden border flex flex-col transition-colors ${
                        m.isFunded
                          ? "border-navy-200 opacity-60 bg-navy-100/50"
                          : "border-line bg-card"
                      }`}
                      style={!m.isFunded ? { boxShadow: "0 8px 22px rgba(23,29,43,.06)" } : undefined}
                    >
                      {/* 이미지 */}
                      <div className="relative h-36 bg-navy-100 shrink-0 overflow-hidden">
                        {m.imageUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={m.imageUrl}
                            alt={m.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {m.isFunded && (
                          <span className="absolute top-2 left-2 text-[10px] bg-navy-200 text-navy-600 px-2 py-0.5 rounded-full font-bold">
                            {t("material_gifted")}
                          </span>
                        )}
                      </div>
                      {/* 텍스트 */}
                      <div className="p-3 flex flex-col flex-1">
                        <p className="text-[13px] font-semibold text-navy-800 line-clamp-2 leading-snug mb-1">{m.name}</p>
                        <p className="text-[11.5px] text-muted leading-relaxed line-clamp-2 flex-1">{m.usageNote}</p>
                        <p className="text-[13px] font-bold mt-2" style={{ color: "var(--gold-text)" }}>
                          {m.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 담벼락 */}
            <Wall
              wallId={artist.id}
              artistName={artist.name}
              author={mySponsorship ? { role: "theo", name: mySponsorship.nickname } : null}
              lockedCta={{ href: `/sponsor/${artist.id}`, label: t("wall_locked_cta") }}
            />


          </div>

          {/* Right: sticky CTA */}
          <div data-sr="fade" className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div
              className="bg-navy-900 rounded-3xl p-7 text-center"
            >
              <p className="text-sv text-xs font-bold tracking-[0.16em] uppercase mb-2">{t("cta_gift_title")}</p>
              <p className="text-lg font-black text-white mb-1">{artist.name} 작가</p>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                {t("cta_gift_desc").split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
              <Link
                href={`/sponsor/${artist.id}`}
                className="w-full block bg-sv text-ink font-semibold py-3.5 rounded-xl hover:bg-sv-soft transition-colors text-[15px]"
              >
                {t("cta_gift_btn")}
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
