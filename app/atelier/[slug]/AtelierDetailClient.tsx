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
  usageColor?: string;
  coverPosition?: string;
  extraImages?: string[];
  workImageMore?: string[];
  /** 폰 화면에서만 숨길 사진(경로) */
  mobileHideImages?: string[];
  /** 이름 밑 한 문장이 두 문장일 때, 폰 화면에서는 첫 문장 뒤에서 줄을 바꾼다 */
  oneLinerMobileBreak?: boolean;
  coverNatural?: boolean;
  noteFlow?: ({ t: string; corner?: { img: string; alt?: string }; img?: undefined; row?: undefined; size?: undefined; alt?: undefined } | { row: { img: string; alt?: string }[]; t?: undefined; img?: undefined; size?: undefined; alt?: undefined } | { t?: undefined; row?: undefined; img: string; size?: string; alt?: string })[];
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

function Row({ label, children, anchor = false, hideLabelOnMobile = false, tightTopOnMobile = false }: { label: string; children: React.ReactNode; anchor?: boolean; hideLabelOnMobile?: boolean; tightTopOnMobile?: boolean }) {
  return (
    <section className="px-[var(--gap)]">
      <div className={`${anchor ? "relative " : ""}${tightTopOnMobile ? "max-md:pt-4 " : ""}flex flex-col md:flex-row py-12 md:py-16 gap-6 md:gap-0`}>
        <div className={`${LEFT}${hideLabelOnMobile ? " max-md:hidden" : ""}`}>
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
          <Link href="/atelier" className="link-line text-[14px] max-md:hidden inline-block mb-8 md:mb-12">
            {t("back_atelier")}
          </Link>
          <div data-sr="fade" className="pr-0 md:pr-[var(--gap)] pb-8 md:pb-14" style={{ color: artist.titleColor ?? "#8c8c8c" }}>
            <BigTitle text={artist.nameEn ?? artist.name} />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 프로필 */}
        <Row label="Artist" hideLabelOnMobile>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_16rem] gap-8 lg:gap-12">
            <div data-sr="up">
              {/* 폰에서는 "ARTIST" 라벨을 없애고 그 자리(맨 위)에 이름을 둔다. 프로필 사진은 작게 줄여 오른쪽, 윗변은 이름과 같은 높이.
                  md 이상은 기존처럼 라벨 + 오른쪽 열/아래 큰 사진 */}
              <div className="md:hidden float-right ml-4 relative w-[7rem] aspect-[1/1.25] overflow-hidden bg-surface-card">
                <Image src={artist.profileImage} alt={artist.name} fill sizes="7rem" className="object-cover" />
              </div>
              <div className="flex items-start mb-6 min-h-[8.75rem] md:block md:min-h-0 md:mb-0">
                <h2 className="text-[34px] max-md:text-[32px] md:text-[52px] leading-[1.1] md:mb-6" style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 800, letterSpacing: "-0.04em" }}>{artist.name}</h2>
              </div>
              <p className="type-m font-normal max-md:font-bold max-md:text-[21px]! mb-8" style={{ wordBreak: "keep-all", fontFamily: "'PT Serif','Noto Sans KR',serif" }}>{artist.oneLinerMobileBreak && artist.oneLiner.includes("? ") ? (
                  <>
                    {artist.oneLiner.slice(0, artist.oneLiner.indexOf("? ") + 1)}{" "}
                    <br className="md:hidden" />
                    {artist.oneLiner.slice(artist.oneLiner.indexOf("? ") + 2)}
                  </>
                ) : (
                  artist.oneLiner
                )}</p>
              <p className="text-[17px] max-md:text-[15px] md:text-[19px] leading-[1.9] text-muted whitespace-pre-line max-md:whitespace-normal" style={{ wordBreak: "keep-all" }}>{artist.artistNote}</p>
              {artist.shopUrl ? (
                <a href={artist.shopUrl} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-gray px-7 py-3 text-[15px] max-md:text-[13px] mt-10 inline-flex" style={artist.buttonColor ? ({ "--btn-bg": artist.buttonColor } as React.CSSProperties) : undefined}>
                  {t("cta_gift_btn")}
                </a>
              ) : (
                <Link href={`/sponsor/${artist.id}`} className="nb-btn nb-btn-gray px-7 py-3 text-[15px] max-md:text-[13px] mt-10 inline-flex" style={artist.buttonColor ? ({ "--btn-bg": artist.buttonColor } as React.CSSProperties) : undefined}>
                  {t("cta_gift_btn")}
                </Link>
              )}
            </div>
            <div data-sr="up" data-d="1" className="hidden md:block relative aspect-[1/1.25] w-full max-w-[16rem] overflow-hidden bg-surface-card">
              <Image src={artist.profileImage} alt={artist.name} fill sizes="16rem" className="object-cover" />
            </div>
          </div>
        </Row>

        {/* 커버 이미지 */}
        <section className="px-[var(--gap)] py-12 max-md:pb-8 md:py-16">
          {artist.coverNatural ? (
            <div data-sr="up" className="w-full overflow-hidden bg-surface-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={artist.coverImage} alt={`${artist.name} 작품 모음`} className="block w-full h-auto" />
            </div>
          ) : (
          <div data-sr="up" className="relative w-full aspect-[16/9] md:aspect-[16/6] overflow-hidden bg-surface-card">
            <Image src={artist.coverImage} alt={`${artist.name} 커버`} fill sizes="100vw" className="object-cover" style={{ objectPosition: artist.coverPosition ?? "center" }} priority />
          </div>
          )}
          <hr className="dots-x mt-12 md:mt-16 max-md:hidden" />
        </section>

        {/* 작가 노트 — 글 사이사이에 작품 사진 */}
        {artist.noteFlow && (
          <Row label="Note" tightTopOnMobile>
            <div className="space-y-10 md:space-y-14">
              {artist.noteFlow.map((b, i) =>
                b.t !== undefined ? (
                  b.corner ? (
                    // 글 아래, 오른쪽 끝에 작은 사진
                    <div key={i} data-sr="up" className="w-full max-w-[62rem]">
                      <p className="text-[16.9px] max-md:text-[14.899999999999999px] leading-[1.95] whitespace-pre-line max-md:whitespace-normal" style={{ wordBreak: "keep-all" }}>{b.t}</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.corner.img} alt={b.corner.alt ?? `${artist.name} 작품`} className="block ml-auto mt-6 w-[11rem] md:w-[17.5rem] h-auto" />
                    </div>
                  ) : (
                    <p key={i} data-sr="up" className="text-[16.9px] max-md:text-[14.899999999999999px] leading-[1.95] whitespace-pre-line max-md:whitespace-normal" style={{ wordBreak: "keep-all" }}>{b.t}</p>
                  )
                ) : b.row ? (
                  <div key={i} data-sr="up" className="grid grid-cols-2 gap-3 md:gap-5 w-full max-w-[62rem]">
                    {b.row.map((r) => (
                      <div key={r.img} className="overflow-hidden bg-surface-card">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.img} alt={r.alt ?? `${artist.name} 작품`} className="block w-full h-auto" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={i} data-sr="up"
                    className={`overflow-hidden bg-surface-card w-full ${b.size === "md" ? "max-w-[30rem]" : b.size === "lg" ? "max-w-[62rem]" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.img!} alt={b.alt ?? `${artist.name} 작품`} className="block w-full h-auto" />
                  </div>
                )
              )}
            </div>
          </Row>
        )}

        {/* 작가 노트 (본문 + 작품) */}
        {artist.statement && (
          <Row label="Note" tightTopOnMobile>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-10 lg:gap-14 items-start">
              <div className="space-y-8">
                {artist.statement.split("\n\n").map((para, i) => (
                  <p key={i} data-sr="up" className="text-[16.9px] max-md:text-[14.899999999999999px] leading-[1.95] whitespace-pre-line max-md:whitespace-normal" style={{ wordBreak: "keep-all" }}>{para}</p>
                ))}
              </div>
              {artist.workImage && (
                <div className="w-full max-w-[22rem] space-y-6">
                  {(() => {
                    const imgs = [artist.workImage, ...(artist.workImageMore ?? [])];
                    const same = imgs.length > 1; // 여러 장이면 같은 크기(4:3)로 맞춤
                    return imgs.map((src, i) => (
                      <div key={src} data-sr="up" data-d={String(Math.min(i + 1, 3))}
                        className={`overflow-hidden bg-surface-card ${same ? "aspect-[4/3] relative" : ""} ${artist.mobileHideImages?.includes(src) ? "max-md:hidden" : ""}`}>
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
                    <p className="text-[16px] max-md:text-[14px] leading-snug line-clamp-2 mb-1 group-hover:underline underline-offset-4">{m.name}</p>
                    <p className={`text-[14px] max-md:text-[12px] leading-snug line-clamp-2 mb-2 ${artist.usageColor ? "" : "text-muted"}`} style={artist.usageColor ? { color: artist.usageColor } : undefined}>{m.usageNote}</p>
                    <p className="text-[16px] max-md:text-[14px] font-bold">{m.price.toLocaleString()}원</p>
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
            author={{ role: "theo", name: mySponsorship?.nickname ?? "" }}
          />
        </Row>
      </main>
    </div>
  );
}
