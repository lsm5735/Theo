import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import LetterCard from "@/components/LetterCard";
import artists from "@/data/artists.json";
import letters from "@/data/letters.json";
import materials from "@/data/materials.json";

interface Props {
  params: Promise<{ id: string }>;
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="w-full bg-navy-100 rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full bg-[--sv] transition-all duration-700"
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}

export default async function ArtistPage({ params }: Props) {
  const { id } = await params;
  const artist = artists.find((a) => a.id === id);
  if (!artist) notFound();

  const artistLetters = letters.filter((l) => l.artistId === id);
  const compatibleMaterials = materials.filter((m) =>
    m.compatibleGenres.includes(artist.genre)
  );

  const pct = Math.round(
    (artist.currentProject.fundedAmount / artist.currentProject.targetAmount) * 100
  );

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* Cover */}
      <div className="relative h-64 md:h-80 w-full bg-navy-200">
        <Image
          src={artist.coverImage}
          alt={`${artist.name} 커버`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[--navy-900]/70 via-[--navy-800]/20 to-transparent" />

        {/* Back */}
        <div className="absolute top-4 left-5 md:left-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            ← 작가 목록
          </Link>
        </div>

        {/* Genre / Media badges */}
        <div className="absolute bottom-5 left-5 md:left-8 flex flex-wrap gap-2">
          <span className="bg-[--navy-800] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {artist.genre}
          </span>
          {artist.media.map((m) => (
            <span key={m} className="bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Main content ─── */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-8">

        {/* Profile card (overlapping cover) */}
        <div className="relative -mt-14 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-card border border-navy-100">
            <div className="flex items-start gap-4 mb-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[--sv-soft] shrink-0 shadow-sm">
                <Image src={artist.profileImage} alt={artist.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h1 className="text-2xl font-black text-[--navy-800]">{artist.name}</h1>
                  <span className="text-sm text-[--muted]">{artist.nameEn}</span>
                </div>
                <p className="text-[--navy-600] font-medium text-sm mb-2">{artist.oneLiner}</p>
                <div className="flex items-center gap-1.5 text-xs text-[--muted]">
                  <span>📍</span>
                  <span>{artist.location}</span>
                  <span className="mx-1 text-navy-300">·</span>
                  <span>{artist.careerStage} 작가</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {artist.tags.map((tag) => (
                <span key={tag} className="text-xs text-[--navy-600] bg-navy-100 px-2.5 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Artist note */}
            <p className="text-sm text-[--ink] leading-[1.9] text-balance mb-5 pb-5 border-b border-navy-100">
              {artist.artistNote}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: artist.followers, label: "팔로워" },
                { value: artist.totalSponsors, label: "총 테오" },
                { value: artistLetters.length, label: "편지" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-black text-[--navy-800]">{s.value}</p>
                  <p className="text-xs text-[--muted] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Grid: left content + right sticky CTA ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 pb-20">

          {/* Left column */}
          <div className="space-y-10">

            {/* Current Project */}
            <section>
              <h2 className="text-lg font-black text-[--navy-800] mb-4">진행 중인 프로젝트</h2>
              <div className="bg-white rounded-xl overflow-hidden border border-navy-100 shadow-card">
                <div className="relative h-52">
                  <Image
                    src={artist.currentProject.sketchImage}
                    alt={artist.currentProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[--navy-900]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg leading-tight">{artist.currentProject.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[--ink] leading-relaxed mb-6">{artist.currentProject.concept}</p>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-[--navy-800]">
                        {artist.currentProject.fundedAmount.toLocaleString()}원 모였어요
                      </span>
                      <span className="font-black text-[--navy-700]">{pct}%</span>
                    </div>
                    <ProgressBar pct={pct} />
                    <div className="flex justify-between text-xs text-[--muted] mt-1.5">
                      <span>목표 {artist.currentProject.targetAmount.toLocaleString()}원</span>
                      <span>테오 {artist.currentProject.sponsorCount}명</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Materials */}
            <section>
              <h2 className="text-lg font-black text-[--navy-800] mb-4">재료 위시리스트</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {compatibleMaterials.slice(0, 6).map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                      m.isFunded
                        ? "bg-navy-100/50 border-navy-200 opacity-60"
                        : "bg-white border-navy-100 shadow-card"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-navy-100">
                      <Image src={m.image} alt={m.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[--navy-800] line-clamp-1">{m.name}</p>
                      <p className="text-xs text-[--muted] line-clamp-1 mt-0.5">{m.usageNote}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <p className="text-sm font-bold text-[--gold-text]">{m.price.toLocaleString()}원</p>
                        {m.isFunded && (
                          <span className="text-xs bg-navy-200 text-[--navy-600] px-1.5 py-0.5 rounded font-medium">선물 완료</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Dear Theo letters */}
            {artistLetters.length > 0 && (
              <section>
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="text-lg font-black text-[--navy-800]">Dear Theo</h2>
                  <span className="text-sm text-[--muted]">작가의 편지 {artistLetters.length}통</span>
                </div>
                <div className="space-y-5">
                  {artistLetters.map((letter) => (
                    <LetterCard key={letter.id} letter={letter} />
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right: sticky CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="bg-[--navy-800] rounded-xl p-6 text-white text-center shadow-card">
              <p className="text-[--sv] text-xs font-bold tracking-widest uppercase mb-2">재료 선물하기</p>
              <p className="text-lg font-black mb-1">{artist.name} 작가</p>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                재료를 선물하면 작가가<br />창작 과정을 편지로 답합니다.
              </p>
              <Link
                href={`/sponsor/${artist.id}`}
                className="w-full block bg-[--sv] text-[--ink] font-bold py-3.5 rounded-lg hover:bg-[--sv-soft] transition-colors text-sm"
              >
                재료 선물하기 →
              </Link>
            </div>

            {/* Fee info */}
            <div className="bg-white rounded-xl p-4 border border-navy-100 text-center">
              <p className="text-xs text-[--muted] leading-relaxed">
                💰 재료값 전액이 작가에게 전달됩니다.<br />
                작가 수수료는 0%예요.
              </p>
            </div>

            {/* Delivery info */}
            <div className="bg-white rounded-xl p-4 border border-navy-100">
              <p className="text-xs font-bold text-[--navy-700] mb-3">전달 4단계 추적</p>
              {["후원 완료", "재료 준비 중", "작가에게 가는 중", "작가가 받았어요"].map((step, i) => (
                <div key={step} className="flex items-center gap-2.5 py-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? "bg-[--sv] text-[--ink]" : "bg-navy-100 text-[--navy-400]"}`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs ${i === 0 ? "font-semibold text-[--navy-800]" : "text-[--muted]"}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return artists.map((a) => ({ id: a.id }));
}
