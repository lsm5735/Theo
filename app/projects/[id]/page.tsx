import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import BigTitle from "@/components/BigTitle";
import SponsorFlowSheet from "./SponsorFlowSheet";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import materials from "@/data/materials.json";
import sponsors from "@/data/sponsors.json";

interface Props {
  params: Promise<{ id: string }>;
}


function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
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

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const artist = artists.find((a) => a.id === project.artistId);
  if (!artist) notFound();

  const projectMaterials = materials.filter((m) => m.projectId === id);
  const projectSponsors = sponsors
    .filter((s) => s.projectId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const remaining = project.targetAmount - project.fundedAmount;

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        {/* 타이틀 */}
        <section className="px-[var(--gap)] pt-6 md:pt-10">
          <Link href={`/atelier/${artist.slug}`} className="link-line text-[14px] inline-block mb-8 md:mb-12">
            ← {artist.name} 아틀리에
          </Link>
          <div data-sr="fade" className="pr-[calc(var(--gap)*0.5)] md:pr-[var(--gap)] pb-8 md:pb-14">
            <BigTitle text={project.title} />
          </div>
          <hr className="dots-x" />
        </section>

        {/* 이미지 */}
        <section className="px-[var(--gap)] py-12 md:py-16">
          <div data-sr="up" className="relative w-full aspect-[16/9] md:aspect-[16/6] overflow-hidden bg-surface-card">
            <Image src={project.sketchImage} alt={project.title} fill sizes="100vw" className="object-cover" priority />
          </div>
          <hr className="dots-x mt-12 md:mt-16" />
        </section>

        {/* 현황 */}
        <Row label="Status">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {[
              { k: "모인 금액", v: `${project.fundedAmount.toLocaleString()}원` },
              { k: "목표 금액", v: `${project.targetAmount.toLocaleString()}원` },
              { k: "남은 금액", v: `${remaining.toLocaleString()}원` },
              { k: "함께하는 테오", v: `${project.sponsorCount}명` },
            ].map((x) => (
              <div key={x.k} data-sr="up">
                <dt className="type-label text-muted mb-3">{x.k}</dt>
                <dd className="type-m">{x.v}</dd>
              </div>
            ))}
          </dl>
        </Row>

        {/* 작품 구상 */}
        <Row label="Concept">
          <p data-sr="up" className="type-m max-w-[40rem] mb-8" style={{ wordBreak: "keep-all", fontFamily: "'PT Serif','Noto Sans KR',serif", fontWeight: 400 }}>
            {project.concept}
          </p>
          <div className="flex items-center gap-2 mb-10">
            {artist.palette.map((color) => (
              <span key={color} title={color} className="w-7 h-7 rounded-full border border-ink/20" style={{ background: color }} />
            ))}
            <span className="text-[14px] text-muted ml-2">작가 팔레트</span>
          </div>
          <Link href={`/atelier/${artist.slug}`} className="group flex items-center gap-4">
            <span className="relative w-14 aspect-[1/1.25] overflow-hidden bg-surface-card shrink-0">
              <Image src={artist.profileImage} alt={artist.name} fill sizes="56px" className="object-cover" />
            </span>
            <span>
              <span className="block text-[19px] underlined group-hover:underline">{artist.name}</span>
              <span className="block text-[14px] text-muted">{artist.oneLiner}</span>
            </span>
          </Link>
        </Row>

        {/* 재료 선물 플로우 */}
        {projectMaterials.length > 0 && (
          <Row label="Gift">
            <SponsorFlowSheet
              materials={projectMaterials.map((m) => ({
                id: m.id,
                name: m.name,
                price: m.price,
                usageNote: m.usageNote,
                isFunded: m.isFunded,
              }))}
              artist={{ id: artist.id, name: artist.name, slug: artist.slug }}
              project={{ id: project.id, title: project.title, sponsorCount: project.sponsorCount }}
            />
          </Row>
        )}

        {/* 선물한 테오 명단 */}
        {projectSponsors.length > 0 && (
          <Row label="Theos">
            <p className="text-[15px] text-muted mb-6">{projectSponsors.length}명의 테오가 이 작품을 응원합니다</p>
            <div>
              {projectSponsors.map((sp) => {
                const mat = materials.find((m) => m.id === sp.materialId);
                return (
                  <div key={sp.id}>
                    <hr className="dots-x" />
                    <div className="py-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1">
                      <span className="text-[18px]">{sp.nickname} 님</span>
                      <span className="text-[14px] text-muted">{formatDate(sp.date)}</span>
                      <span className="text-[15px] text-muted col-span-2">
                        재료 선물 {sp.amount.toLocaleString()}원{mat ? ` · ${mat.usageNote}` : ""}
                      </span>
                      {sp.message && <p className="col-span-2 mt-2 text-[16px] leading-relaxed">&ldquo;{sp.message}&rdquo;</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Row>
        )}

        {/* 전달 안내 */}
        <Row label="Delivery">
          <p className="text-[16px] leading-[1.8] mb-8 max-w-[34rem]">
            재료가 {artist.name} 작가에게 전달됩니다. 배송지는 공개되지 않습니다.
          </p>
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["선물 완료", "재료 준비 중", "작가에게 가는 중", "작가가 받았어요"].map((step, i) => (
              <li key={step}>
                <span className="type-label text-muted block mb-2">0{i + 1}</span>
                <span className="text-[16px]">{step}</span>
              </li>
            ))}
          </ol>
          <Link href={`/sponsor/${artist.id}`} className="nb-btn px-7 py-3 text-[15px] mt-10 inline-flex">
            재료 선물하기 →
          </Link>
        </Row>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}
