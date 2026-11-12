"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
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

const LEFT = "md:w-[calc((100vw-var(--gap)*2)*0.25-1.5rem)] shrink-0";
const RIGHT = "w-full md:w-[calc((100vw-var(--gap)*2)*0.75)]";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="px-[var(--gap)]">
      <div className="flex flex-col md:flex-row py-12 md:py-16 gap-6 md:gap-0">
        <div className={LEFT}>
          <span className="type-section">{label}</span>
        </div>
        <div className={RIGHT}>{children}</div>
      </div>
      <hr className="dots-x" />
    </section>
  );
}

export default function AtelierDetailClient({ artist, project, materials }: Props) {
  const t = useT();
  // 이 작가를 선물한 테오만 담벼락에 글을 남길 수 있음
  const mySponsorship = useMySponsorships()?.find((sp) => sp.artistId === artist.id);

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        {/* 타이틀 */}
        <section className="px-[var(--gap)] pt-6 md:pt-10">
          <Link href="/atelier" className="link-line text-[14px] inline-block mb-8 md:mb-12">
            {t("back_atelier")}
          </Link>
          <div data-sr="fade" className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-8 md:pb-14">
            <BigTitle text={artist.nameEn ?? artist.name} />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 프로필 */}
        <Row label="Artist">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_16rem] gap-8 lg:gap-12">
            <div data-sr="up">
              <h2 className="type-xl mb-6" style={{ fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 400 }}>{artist.name}</h2>
              <p className="type-m mb-8" style={{ wordBreak: "keep-all", fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 400 }}>{artist.oneLiner}</p>
              <p className="text-[16px] leading-[1.9] max-w-[40rem] text-muted" style={{ wordBreak: "keep-all" }}>{artist.artistNote}</p>
              <Link href={`/sponsor/${artist.id}`} className="nb-btn px-7 py-3 text-[15px] mt-10 inline-flex">
                {t("cta_gift_btn")}
              </Link>
            </div>
            <div data-sr="up" data-d="1" className="relative aspect-[1/1.25] w-full max-w-[16rem] overflow-hidden bg-surface-card">
              <Image src={artist.profileImage} alt={artist.name} fill sizes="16rem" className="object-cover" />
            </div>
          </div>
        </Row>

        {/* 커버 이미지 */}
        <section className="px-[var(--gap)] py-12 md:py-16">
          <div data-sr="up" className="relative w-full aspect-[16/9] md:aspect-[16/6] overflow-hidden bg-surface-card">
            <Image src={artist.coverImage} alt={`${artist.name} 커버`} fill sizes="100vw" className="object-cover" priority />
          </div>
          <hr className="dots-x mt-12 md:mt-16" />
        </section>

        {/* 프로젝트 */}
        {project && (
          <Row label={t("section_project")}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
              <div data-sr="up" className="relative aspect-[4/3] overflow-hidden bg-surface-card">
                <Image src={project.sketchImage} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <div data-sr="up" data-d="1">
                <h3 className="type-l mb-5" style={{ fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 400, wordBreak: "keep-all" }}>{project.title}</h3>
                <p className="text-[16px] leading-[1.85] text-muted mb-8" style={{ wordBreak: "keep-all" }}>{project.concept}</p>
                <p className="text-[17px] mb-1">{project.fundedAmount.toLocaleString()}{t("raised_suffix")}</p>
                <p className="text-[14px] text-muted mb-8">
                  {t("goal_label")} {project.targetAmount.toLocaleString()}원 · 테오 {project.sponsorCount}{t("sponsor_count_suffix")}
                </p>
                <Link href={`/projects/${project.id}`} className="link-line text-[16px]">{t("project_detail")}</Link>
              </div>
            </div>
          </Row>
        )}

        {/* 선물하기 */}
        {materials.length > 0 && (
          <Row label={t("section_materials")}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-10">
              {materials.map((m, i) => (
                <div key={m.id} data-sr="up" data-d={String((i % 3) + 1)} className={m.isFunded ? "opacity-55" : ""}>
                  <div className="relative aspect-[4/3] bg-surface-card overflow-hidden mb-3">
                    {m.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.imageUrl} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    {m.isFunded && (
                      <span className="absolute top-2 left-2 text-[12px] bg-sv text-ink px-2 py-0.5 font-bold">{t("material_gifted")}</span>
                    )}
                  </div>
                  <p className="text-[16px] leading-snug line-clamp-2 mb-1">{m.name}</p>
                  <p className="text-[14px] text-muted leading-snug line-clamp-2 mb-2">{m.usageNote}</p>
                  <p className="text-[16px] font-bold">{m.price.toLocaleString()}원</p>
                </div>
              ))}
            </div>
            <Link href={`/sponsor/${artist.id}`} className="nb-btn px-7 py-3 text-[15px]">
              {t("cta_gift_btn")}
            </Link>
          </Row>
        )}

        {/* 담벼락 */}
        <Row label="Wall">
          <Wall
            wallId={artist.id}
            artistName={artist.name}
            author={mySponsorship ? { role: "theo", name: mySponsorship.nickname } : null}
            lockedCta={{ href: `/sponsor/${artist.id}`, label: t("wall_locked_cta") }}
          />
        </Row>
      </main>
    </div>
  );
}
