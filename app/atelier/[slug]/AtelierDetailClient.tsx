"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CypressTimeline from "@/components/CypressTimeline";
import { useT } from "@/contexts/LangContext";

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

interface Artwork {
  id: string;
  artistId: string;
  title: string;
  imageUrl: string;
  caption: string;
  isRepresentative: boolean;
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

interface Letter {
  id: string;
  artistId: string;
}

interface Props {
  artist: Artist;
  project: Project | null;
  artworks: Artwork[];
  materials: Material[];
  letters: Letter[];
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="w-full bg-navy-100 rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(pct, 100)}%`,
          background: "linear-gradient(90deg,var(--sv),var(--sv-deep))",
        }}
      />
    </div>
  );
}

export default function AtelierDetailClient({ artist, project, artworks, materials, letters }: Props) {
  const t = useT();

  const pct = project
    ? Math.round((project.fundedAmount / project.targetAmount) * 100)
    : 0;

  const trackSteps = [t("track_s1"), t("track_s2"), t("track_s3"), t("track_s4")];

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

        {/* Badges */}
        <div className="absolute bottom-5 left-5 md:left-8 flex flex-wrap gap-2">
          <span className="bg-navy-800 text-chiffon text-xs font-semibold px-3 py-1.5 rounded-full">
            {artist.genre}
          </span>
          {artist.media.map((m) => (
            <span
              key={m}
              className="bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-8">

        {/* Profile card — overlaps cover */}
        <div className="relative -mt-12 mb-10">
          <div
            className="bg-card rounded-xl p-6 border border-line"
            style={{ boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-sv-soft shrink-0 shadow-sm">
                <Image src={artist.profileImage} alt={artist.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h1 className="text-2xl font-black text-navy-800 mb-1">{artist.name}</h1>
                <p className="font-myeongjo text-navy-600 text-sm mb-2">{artist.oneLiner}</p>
                <p className="text-xs text-muted">
                  {artist.location} · {artist.careerStage} 작가
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {artist.tags.map((tag) => (
                <span key={tag} className="text-xs text-navy-600 bg-navy-100 px-2.5 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Artist note */}
            <p className="text-sm text-ink leading-[1.95] mb-5 pb-5 border-b border-navy-100">
              {artist.artistNote}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: artist.followers,     label: t("stat_followers") },
                { value: artist.totalSponsors, label: t("stat_theos") },
                { value: letters.length,       label: t("stat_letters") },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-bold text-xl text-navy-800">{s.value}</p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 pb-20">

          {/* Left */}
          <div className="space-y-10">

            {/* Current project */}
            {project && (
              <section>
                <h2 className="text-lg font-black text-navy-800 mb-4">{t("section_project")}</h2>
                <div
                  className="bg-card rounded-xl overflow-hidden border border-line"
                  style={{ boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
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
                      <span className="font-black text-navy-700">{pct}%</span>
                    </div>
                    <ProgressBar pct={pct} />
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

            {/* Artworks */}
            {artworks.length > 0 && (
              <section>
                <h2 className="text-lg font-black text-navy-800 mb-4">{t("section_artworks")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {artworks.map((work) => (
                    <div
                      key={work.id}
                      className="rounded-xl overflow-hidden border border-line bg-card"
                      style={{ boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
                    >
                      <div className="relative h-40">
                        <Image
                          src={work.imageUrl}
                          alt={work.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover"
                        />
                        {work.isRepresentative && (
                          <span className="absolute top-2 left-2 bg-sv text-ink text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {t("featured_badge")}
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-navy-800 text-sm">{work.title}</p>
                        <p className="text-xs text-muted mt-0.5 leading-relaxed line-clamp-2">{work.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 후원 상점 */}
            {materials.length > 0 && (
              <section>
                <h2 className="text-lg font-black text-navy-800 mb-4">{t("section_materials")}</h2>
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

            {/* Cypress Timeline */}
            <CypressTimeline artist={artist} />


          </div>

          {/* Right: sticky CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div
              className="bg-navy-800 rounded-xl p-6 text-center"
              style={{ boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
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
                className="w-full block bg-sv text-ink font-bold py-3.5 rounded-lg hover:bg-sv-soft transition-colors text-sm"
              >
                {t("cta_gift_btn")}
              </Link>
            </div>

            <div className="bg-card rounded-xl p-4 border border-line text-center">
              <p className="text-xs text-muted leading-relaxed">
                {t("zero_fee_note").split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 border border-line">
              <p className="text-xs font-bold text-navy-700 mb-3">{t("tracking_title")}</p>
              {trackSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                      i === 0 ? "bg-sv text-ink" : "bg-navy-100 text-navy-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-xs ${i === 0 ? "font-semibold text-navy-800" : "text-muted"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
