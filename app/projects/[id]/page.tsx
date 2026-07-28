import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import SponsorFlowSheet from "./SponsorFlowSheet";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import materials from "@/data/materials.json";
import sponsors from "@/data/sponsors.json";

interface Props {
  params: Promise<{ id: string }>;
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
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


function SponsorAvatar({ nickname }: { nickname: string }) {
  const colors = [
    "bg-[#0D3B66] text-white",
    "bg-[#1D3161] text-white",
    "bg-[#376590] text-white",
    "bg-[#4E7A46] text-white",
    "bg-[#5C2A20] text-white",
    "bg-[#6B5B8C] text-white",
    "bg-[#8A5A1E] text-white",
    "bg-[#3E6C93] text-white",
  ];
  const color = colors[nickname.charCodeAt(0) % colors.length];
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>
      {nickname.slice(0, 1)}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
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

  const pct = Math.round((project.fundedAmount / project.targetAmount) * 100);
  const remaining = project.targetAmount - project.fundedAmount;

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* Hero */}
      <div className="relative h-72 md:h-96 w-full bg-navy-900">
        <Image
          src={project.sketchImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(7,34,60,.85) 0%,rgba(13,59,102,.3) 55%,transparent 100%)",
          }}
        />

        {/* Back */}
        <div className="absolute top-4 left-5 md:left-8">
          <Link
            href={`/atelier/${artist.slug}`}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            ← {artist.name} 아틀리에
          </Link>
        </div>

        {/* Status badge */}
        <div className="absolute top-4 right-5 md:right-8">
          <span className="bg-sv text-ink text-xs font-bold px-3 py-1.5 rounded-full">
            모집 중
          </span>
        </div>

        {/* Title area */}
        <div className="absolute bottom-6 left-5 md:left-8 right-5 md:right-8">
          <p className="text-white/70 text-sm mb-1.5 font-medium">
            {artist.name} 작가의 프로젝트
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-snug mb-3">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1 rounded-full">
              {artist.genre}
            </span>
            {artist.media.map((m) => (
              <span
                key={m}
                className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-full"
              >
                {m}
              </span>
            ))}
            <span className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-full">
              {project.expectedWeeks}주 예상
            </span>
          </div>
        </div>
      </div>

      {/* Funding summary bar */}
      <div className="bg-navy-800 py-6 px-5 md:px-8">
        <div className="max-w-[1080px] mx-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <div>
              <span className="text-2xl font-black text-white">
                {project.fundedAmount.toLocaleString()}원
              </span>
              <span className="text-white/50 text-sm ml-2">모였어요</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-black text-sv text-xl">{pct}%</span>
              <span className="text-white/60">
                목표{" "}
                <span className="text-white/80 font-semibold">
                  {project.targetAmount.toLocaleString()}원
                </span>
              </span>
            </div>
          </div>
          <ProgressBar pct={pct} />
          <div className="flex justify-between text-xs mt-2.5">
            <span className="text-white/50">
              테오{" "}
              <span className="text-sv font-bold">{project.sponsorCount}명</span>이 함께합니다
            </span>
            <span className="text-white/50">
              남은 금액{" "}
              <span className="text-white/70 font-medium">
                {remaining.toLocaleString()}원
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* Left column */}
          <div className="space-y-12">

            {/* 작품 구상 */}
            <section>
              <h2 className="text-lg font-black text-navy-800 mb-1">작품 구상</h2>
              <p className="text-xs text-muted mb-4">{artist.name} 작가의 창작 계획</p>

              {/* Artist palette */}
              <div className="flex gap-1.5 mb-5">
                {artist.palette.map((color) => (
                  <div
                    key={color}
                    title={color}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ background: color }}
                  />
                ))}
                <span className="text-xs text-muted self-center ml-1">작가 팔레트</span>
              </div>

              <div
                className="bg-card rounded-xl p-6 md:p-8 border border-line"
                style={{ boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
              >
                <p className="font-myeongjo text-ink leading-[2.1] text-[15px]">
                  {project.concept}
                </p>

                <div className="mt-6 pt-5 border-t border-navy-100 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-sv-soft shrink-0">
                    <Image
                      src={artist.profileImage}
                      alt={artist.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-800">{artist.name}</p>
                    <p className="text-xs text-muted">{artist.oneLiner}</p>
                  </div>
                  <Link
                    href={`/atelier/${artist.slug}`}
                    className="ml-auto text-xs text-navy-600 hover:text-navy-800 font-medium transition-colors shrink-0"
                  >
                    아틀리에 →
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {artist.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-navy-600 bg-navy-100 px-2.5 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* 재료 위시리스트 + 후원 플로우 (클라이언트) */}
            {projectMaterials.length > 0 && (
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
            )}

            {/* 후원자 명단 */}
            {projectSponsors.length > 0 && (
              <section>
                <h2 className="text-lg font-black text-navy-800 mb-1">후원자 명단</h2>
                <p className="text-xs text-muted mb-5">
                  {projectSponsors.length}명의 테오가 이 작품을 응원합니다
                </p>

                <div className="space-y-3">
                  {projectSponsors.map((sp) => {
                    const mat = materials.find((m) => m.id === sp.materialId);
                    return (
                      <div
                        key={sp.id}
                        className="bg-card rounded-xl p-4 border border-line"
                        style={{ boxShadow: "0 4px 12px rgba(23,29,43,.04)" }}
                      >
                        <div className="flex items-start gap-3">
                          <SponsorAvatar nickname={sp.nickname} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-sm font-bold text-navy-800">
                                {sp.nickname} 님
                              </span>
                              <span className="text-xs text-muted shrink-0">
                                {formatDate(sp.date)}
                              </span>
                            </div>
                            <p className="text-xs text-navy-600 mt-0.5">
                              재료 후원{" "}
                              <span className="font-semibold text-navy-700">
                                {sp.amount.toLocaleString()}원
                              </span>
                            </p>
                            {mat && (
                              <p className="text-xs text-muted mt-0.5 truncate">
                                → {mat.usageNote}
                              </p>
                            )}
                            {sp.message && (
                              <p className="mt-2 text-sm text-ink leading-relaxed bg-navy-50 rounded-lg px-3 py-2 border-l-2 border-sv">
                                "{sp.message}"
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          </div>

          {/* Right sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">

            {/* CTA card */}
            <div
              className="bg-navy-800 rounded-xl p-6"
              style={{ boxShadow: "0 8px 22px rgba(23,29,43,.12)" }}
            >
              <p className="text-sv text-xs font-bold tracking-[0.16em] uppercase mb-3">
                재료 선물하기
              </p>

              {/* Mini progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-bold">{pct}% 달성</span>
                  <span className="text-white/60 text-xs">
                    {project.sponsorCount}명 참여
                  </span>
                </div>
                <div className="w-full bg-white/15 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: "linear-gradient(90deg,var(--sv),var(--sv-deep))",
                    }}
                  />
                </div>
              </div>

              <p className="text-white/60 text-xs mb-5 leading-relaxed">
                재료를 선물하면 {artist.name} 작가가<br />
                창작 과정을 편지로 답합니다.
              </p>

              <Link
                href={`/sponsor/${artist.id}`}
                className="w-full block bg-sv text-ink font-bold py-3.5 rounded-lg hover:bg-sv-soft transition-colors text-sm text-center"
              >
                재료 선물하기 →
              </Link>
            </div>

            {/* 재료 요약 */}
            {projectMaterials.length > 0 && (
              <div
                className="bg-card rounded-xl p-4 border border-line"
                style={{ boxShadow: "0 4px 12px rgba(23,29,43,.04)" }}
              >
                <p className="text-xs font-bold text-navy-700 mb-3">재료 현황</p>
                {projectMaterials.map((m, i) => (
                  <div key={m.id} className={`flex items-center justify-between py-2 ${i < projectMaterials.length - 1 ? "border-b border-navy-100" : ""}`}>
                    <div className="flex-1 min-w-0 mr-2">
                      <p className="text-xs text-navy-700 font-medium truncate">{m.usageNote}</p>
                      <p className="text-xs text-muted truncate">{m.name}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-bold text-navy-700">{m.price.toLocaleString()}원</p>
                      {m.isFunded ? (
                        <span className="text-[10px] text-green-600 font-medium">선물 완료</span>
                      ) : (
                        <span className="text-[10px] text-muted">필요</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Fee info */}
            <div className="bg-chiffon rounded-xl p-4 border border-sv/20 text-center">
              <p className="text-xs font-bold text-navy-700 mb-1">작가 수수료 0%</p>
              <p className="text-xs text-navy-600 leading-relaxed">
                재료값 전액이 {artist.name} 작가에게 전달됩니다.<br />
                배송지는 공개되지 않습니다.
              </p>
            </div>

            {/* Delivery steps */}
            <div className="bg-card rounded-xl p-4 border border-line">
              <p className="text-xs font-bold text-navy-700 mb-3">전달 4단계</p>
              {["후원 완료", "재료 준비 중", "작가에게 가는 중", "작가가 받았어요"].map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-2.5 py-1.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                        i === 0 ? "bg-sv text-ink" : "bg-navy-100 text-navy-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-xs ${
                        i === 0 ? "font-semibold text-navy-800" : "text-muted"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}
