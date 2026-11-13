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
  statement?: string;
  workImage?: string;
  shopUrl?: string;
  titleColor?: string;
  buttonColor?: string;
  coverPosition?: string;
  extraImages?: string[];
  workImageMore?: string[];
}

interface Material {
  id: string;
  artistId: string;
  name: string;
  usageNote: string;
  price: number;
  isFunded: boolean;
  imageUrl?: string;
  link?: string;
}

interface Props {
  artist: Artist;
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

function CardLink({ href, children }: { href?: string; children: React.ReactNode }) {
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block group">{children}</a>
  ) : (
    <div>{children}</div>
  );
}

export default function AtelierDetailClient({ artist, materials }: Props) {
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
          <div data-sr="fade" className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-8 md:pb-14" style={{ color: artist.titleColor ?? "#8c8c8c" }}>
            <BigTitle text={artist.nameEn ?? artist.name} />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 프로필 */}
        <Row label="Artist">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_16rem] gap-8 lg:gap-12">
            <div data-sr="up">
              <h2 className="text-[34px] md:text-[52px] leading-[1.1] mb-6" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 800, letterSpacing: "-0.04em" }}>{artist.name}</h2>
              <p className="type-m mb-8" style={{ wordBreak: "keep-all", fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 400 }}>{artist.oneLiner}</p>
              <p className="text-[17px] md:text-[19px] leading-[1.9] text-muted whitespace-pre-line" style={{ wordBreak: "keep-all" }}>{artist.artistNote}</p>
              {artist.shopUrl ? (
                <a href={artist.shopUrl} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-gray px-7 py-3 text-[15px] mt-10 inline-flex" style={artist.buttonColor ? ({ "--btn-bg": artist.buttonColor } as React.CSSProperties) : undefined}>
                  {t("cta_gift_btn")}
                </a>
              ) : (
                <Link href={`/sponsor/${artist.id}`} className="nb-btn nb-btn-gray px-7 py-3 text-[15px] mt-10 inline-flex" style={artist.buttonColor ? ({ "--btn-bg": artist.buttonColor } as React.CSSProperties) : undefined}>
                  {t("cta_gift_btn")}
                </Link>
              )}
            </div>
            <div data-sr="up" data-d="1" className="relative aspect-[1/1.25] w-full max-w-[16rem] overflow-hidden bg-surface-card">
              <Image src={artist.profileImage} alt={artist.name} fill sizes="16rem" className="object-cover" />
            </div>
          </div>
        </Row>

        {/* 커버 이미지 */}
        <section className="px-[var(--gap)] py-12 md:py-16">
          <div data-sr="up" className="relative w-full aspect-[16/9] md:aspect-[16/6] overflow-hidden bg-surface-card">
            <Image src={artist.coverImage} alt={`${artist.name} 커버`} fill sizes="100vw" className="object-cover" style={{ objectPosition: artist.coverPosition ?? "center" }} priority />
          </div>
          <hr className="dots-x mt-12 md:mt-16" />
        </section>

        {/* 작가 노트 (본문 + 작품) */}
        {artist.statement && (
          <Row label="Note">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-10 lg:gap-14 items-start">
              <div className="space-y-8">
                {artist.statement.split("\n\n").map((para, i) => (
                  <p key={i} data-sr="up" className="text-[16.9px] leading-[1.95] whitespace-pre-line" style={{ wordBreak: "keep-all" }}>{para}</p>
                ))}
              </div>
              {artist.workImage && (
                <div className="w-full max-w-[22rem] space-y-6">
                  {(() => {
                    const imgs = [artist.workImage, ...(artist.workImageMore ?? [])];
                    const same = imgs.length > 1; // 여러 장이면 같은 크기(4:3)로 맞춤
                    return imgs.map((src, i) => (
                      <div key={src} data-sr="up" data-d={String(Math.min(i + 1, 3))}
                        className={`overflow-hidden bg-surface-card ${same ? "aspect-[4/3] relative" : ""}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`${artist.name} 작품 ${i + 1}`}
                          className={same ? "absolute inset-0 w-full h-full object-cover" : "block w-full h-auto"}
                          style={same ? { objectPosition: "30% 50%" } : undefined} />
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
            {artist.extraImages && artist.extraImages.length > 0 && (
              <div className="mt-14 space-y-6">
                {artist.extraImages.map((src, i) => (
                  <div key={src} data-sr="up" className="overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${artist.name} 작업 이야기 ${i + 1}`} className="block w-full h-auto" />
                  </div>
                ))}
              </div>
            )}
          </Row>
        )}

        {/* 선물하기 */}
        {materials.length > 0 && (
          <Row label={t("section_materials")}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {materials.map((m, i) => (
                <div key={m.id} data-sr="up" data-d={String((i % 3) + 1)}>
                  <CardLink href={m.link}>
                    <div className="relative aspect-square bg-surface-card overflow-hidden mb-3">
                      {m.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.imageUrl} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                    </div>
                    <p className="text-[16px] leading-snug line-clamp-2 mb-1 group-hover:underline underline-offset-4">{m.name}</p>
                    <p className="text-[14px] text-muted leading-snug line-clamp-2 mb-2">{m.usageNote}</p>
                    <p className="text-[16px] font-bold">{m.price.toLocaleString()}원</p>
                  </CardLink>
                </div>
              ))}
            </div>
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
