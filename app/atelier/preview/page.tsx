"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

interface ArtistData {
  name: string;
  genre: string;
  media: string[];
  location: string;
  oneLiner: string;
  artistNote: string;
  projectTitle: string;
  projectConcept: string;
  targetAmount: number;
  profileImage: string;
  coverImage: string;
}

export default function AtelierPreviewPage() {
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("theo_new_artist");
      if (raw) setArtist(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!artist) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <div className="max-w-[560px] mx-auto px-5 pt-32 text-center">
          <p className="text-navy-400 mb-6">아직 등록된 아틀리에가 없어요.</p>
          <Link href="/onboarding/artist" className="nb-btn px-8 py-3.5 rounded-xl font-black text-[15px]">
            작가 등록하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* 미리보기 배너 */}
      <div className="bg-sv border-b-2 border-brutal py-3 px-5 text-center">
        <p className="text-[13px] font-black" style={{ color: "var(--brutal)" }}>
          미리보기 모드 · 실제 공개 전 아틀리에 화면입니다
          <Link href="/onboarding/artist" className="ml-4 underline font-bold">수정하기</Link>
        </p>
      </div>

      {/* 커버 이미지 */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden bg-navy-200">
        <img src={artist.coverImage} alt="커버" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,34,60,.7) 0%,rgba(13,59,102,.2) 50%,transparent 100%)" }} />
        <div className="absolute top-4 left-5 md:left-8">
          <Link href="/atelier" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors">
            ← 작가 탐색
          </Link>
        </div>
        <div className="absolute bottom-5 left-5 md:left-8 flex flex-wrap gap-2">
          <span className="bg-navy-800 text-chiffon text-xs font-bold px-3 py-1.5 rounded-full">{artist.genre}</span>
          {artist.media.map((m) => (
            <span key={m} className="bg-navy-700/70 text-chiffon text-xs font-semibold px-3 py-1.5 rounded-full">{m}</span>
          ))}
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">

          {/* 메인 */}
          <div>
            {/* 프로필 헤더 */}
            <div className="flex items-start gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 nb-card p-0">
                <img src={artist.profileImage} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-black text-[28px] text-navy-900 leading-tight mb-1"
                  style={{ letterSpacing: "-0.02em" }}>{artist.name}</h1>
                <p className="text-[15px] text-muted mb-2">{artist.oneLiner}</p>
                <p className="text-[12px] text-navy-400 font-semibold">📍 {artist.location}</p>
              </div>
            </div>

            {/* 작가노트 */}
            <div className="nb-card p-7 mb-8">
              <p className="text-xs font-black tracking-[0.2em] text-navy-400 uppercase mb-4">작가노트</p>
              <p className="text-[15px] text-navy-900 leading-[2.0] font-myeongjo" style={{ wordBreak: "keep-all" }}>
                {artist.artistNote}
              </p>
            </div>

            {/* 진행 중 프로젝트 */}
            <div className="nb-card p-7">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-black tracking-[0.2em] text-navy-400 uppercase">진행 중 프로젝트</p>
                <span className="nb-tag text-[9px]">모집중</span>
              </div>
              <h2 className="font-black text-[22px] text-navy-900 mb-3" style={{ letterSpacing: "-0.01em" }}>
                {artist.projectTitle}
              </h2>
              <p className="text-[14px] text-muted leading-[1.9] mb-6" style={{ wordBreak: "keep-all" }}>
                {artist.projectConcept}
              </p>

              {/* 진행률 */}
              <div className="bg-navy-100 rounded-full h-2 overflow-hidden mb-2">
                <div className="h-full rounded-full w-0" style={{ background: "linear-gradient(90deg,var(--sv),var(--sv-deep))" }} />
              </div>
              <div className="flex justify-between text-[12px] font-semibold mb-6">
                <span className="text-muted">0% 달성</span>
                <span className="text-navy-800">목표 {artist.targetAmount.toLocaleString()}원</span>
              </div>

              <button
                className="nb-btn w-full py-4 rounded-xl font-black text-[15px]"
                onClick={() => alert("데모 미리보기입니다. 베타 오픈 시 후원이 가능합니다.")}
              >
                이 작품 후원하기
              </button>
              <p className="text-center text-xs text-navy-400 mt-3">
                * 데모 미리보기 — 실제 후원은 베타 오픈 후 가능합니다
              </p>
            </div>
          </div>

          {/* 사이드 */}
          <div className="space-y-5">
            <div className="nb-card p-5">
              <p className="text-xs font-black tracking-[0.2em] text-navy-400 uppercase mb-4">작가 정보</p>
              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-navy-400 font-semibold">장르</span>
                  <span className="font-bold text-navy-800">{artist.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-400 font-semibold">매체</span>
                  <span className="font-bold text-navy-800 text-right">{artist.media.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-400 font-semibold">지역</span>
                  <span className="font-bold text-navy-800">{artist.location}</span>
                </div>
              </div>
            </div>

            <div className="nb-card p-5 text-center" style={{ background: "#FCF7E8" }}>
              <p className="text-[13px] font-black text-navy-800 mb-2">이 아틀리에 공개하기</p>
              <p className="text-[11.5px] text-muted leading-[1.7] mb-4" style={{ wordBreak: "keep-all" }}>
                베타 오픈 후 실제 아틀리에로 공개되어 후원자를 만날 수 있어요.
              </p>
              <button
                className="nb-btn w-full py-2.5 rounded-xl font-black text-[13px]"
                onClick={() => alert("베타 오픈 신청이 완료되었습니다. 오픈 시 알림을 보내드릴게요!")}
              >
                오픈 신청하기
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
