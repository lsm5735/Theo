"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

const STEPS = [
  { n: "01", label: "기본 프로필", desc: "이름·장르·활동 지역" },
  { n: "02", label: "작가노트", desc: "나의 세계관을 자유롭게" },
  { n: "03", label: "첫 프로젝트", desc: "진행 중 작품 + 목표 금액" },
  { n: "04", label: "완료", desc: "아틀리에 미리보기" },
];

const GENRE_OPTIONS = ["회화", "한국화", "드로잉", "판화", "조각", "설치", "사진", "미디어", "공예", "혼합"];
const MEDIA_OPTIONS = ["유화", "아크릴", "수채", "과슈", "목탄", "연필", "먹", "파스텔", "세라믹", "직물", "혼합매체"];

export default function ArtistOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // 폼 데이터
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [artistNote, setArtistNote] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectConcept, setProjectConcept] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleMedia(m: string) {
    setMedia((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!name.trim()) e.name = "이름을 입력해주세요.";
      if (!genre) e.genre = "장르를 선택해주세요.";
      if (media.length === 0) e.media = "매체를 하나 이상 선택해주세요.";
      if (!oneLiner.trim()) e.oneLiner = "한 줄 소개를 입력해주세요.";
    }
    if (step === 1) {
      if (artistNote.trim().length < 50) e.artistNote = "작가노트를 50자 이상 작성해주세요.";
    }
    if (step === 2) {
      if (!projectTitle.trim()) e.projectTitle = "프로젝트 제목을 입력해주세요.";
      if (!projectConcept.trim()) e.projectConcept = "작품 설명을 입력해주세요.";
      if (!targetAmount || isNaN(Number(targetAmount))) e.targetAmount = "목표 금액을 숫자로 입력해주세요.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleComplete() {
    const slug = `preview-${Date.now()}`;
    const artistData = {
      slug,
      name: name.trim(),
      genre,
      media,
      location: location.trim() || "서울",
      oneLiner: oneLiner.trim(),
      artistNote: artistNote.trim(),
      projectTitle: projectTitle.trim(),
      projectConcept: projectConcept.trim(),
      targetAmount: Number(targetAmount),
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=480&fit=crop&q=80",
    };
    localStorage.setItem("theo_new_artist", JSON.stringify(artistData));
    router.push("/atelier/preview");
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <div className="max-w-[560px] mx-auto px-5 md:px-8 pt-16 pb-24">
        <Link href="/" className="text-sm text-navy-400 hover:text-navy-700 transition-colors mb-10 inline-block">
          ← 홈으로
        </Link>

        {/* 헤딩 */}
        <p className="text-xs font-bold tracking-[0.22em] text-navy-400 uppercase mb-3">작가 등록</p>
        <h1 className="text-3xl md:text-4xl font-black text-navy-900 leading-[1.2] mb-3"
          style={{ letterSpacing: "-0.02em" }}>
          나만의 아틀리에를<br />열어보세요.
        </h1>
        <p className="text-[15px] text-muted leading-[1.85] mb-10">
          작가 수수료는 <strong className="text-navy-800">0%</strong>입니다.
          재료를 선물받고, 창작에만 집중하세요.
        </p>

        {/* 스텝 인디케이터 */}
        <div className="flex gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "bg-navy-800" : "bg-navy-200"}`} />
              <p className={`text-[10px] font-bold mt-1.5 ${i === step ? "text-navy-800" : "text-navy-300"}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── STEP 0: 기본 프로필 ── */}
        {step === 0 && (
          <div className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">01 · 기본 프로필</p>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">이름 (활동명) *</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="예: 윤도희"
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-2">활동 장르 *</label>
              <div className="flex flex-wrap gap-2">
                {GENRE_OPTIONS.map((g) => (
                  <button key={g} onClick={() => setGenre(g)}
                    className={`text-[12px] px-3.5 py-1.5 rounded-full border-2 font-semibold transition-all ${
                      genre === g ? "bg-navy-800 text-chiffon border-navy-800" : "border-navy-300 text-navy-600 hover:border-navy-600"
                    }`}>
                    {g}
                  </button>
                ))}
              </div>
              {errors.genre && <p className="text-red-500 text-xs mt-1">{errors.genre}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-2">주요 매체 * (복수 선택)</label>
              <div className="flex flex-wrap gap-2">
                {MEDIA_OPTIONS.map((m) => (
                  <button key={m} onClick={() => toggleMedia(m)}
                    className={`text-[12px] px-3.5 py-1.5 rounded-full border-2 font-semibold transition-all ${
                      media.includes(m) ? "bg-sv text-brutal border-brutal" : "border-navy-300 text-navy-600 hover:border-navy-600"
                    }`}
                    style={media.includes(m) ? { color: "var(--brutal)" } : {}}>
                    {m}
                  </button>
                ))}
              </div>
              {errors.media && <p className="text-red-500 text-xs mt-1">{errors.media}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">활동 지역</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 서울 마포구"
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">
                한 줄 소개 * <span className="font-normal text-navy-400">({oneLiner.length}/40)</span>
              </label>
              <input value={oneLiner} onChange={(e) => setOneLiner(e.target.value.slice(0, 40))}
                placeholder="예: 도시의 밤을 쌓는 사람"
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {errors.oneLiner && <p className="text-red-500 text-xs mt-1">{errors.oneLiner}</p>}
            </div>

            <button onClick={handleNext}
              className="nb-btn w-full py-3.5 rounded-xl font-black text-[15px] mt-2">
              다음 단계 →
            </button>
          </div>
        )}

        {/* ── STEP 1: 작가노트 ── */}
        {step === 1 && (
          <div className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">02 · 작가노트</p>
            <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
              내가 왜 그림을 그리는지, 어떤 방식으로 작업하는지, 무엇에 끌리는지 자유롭게 적어주세요.
              이 글이 테오 봇이 당신을 추천할 때 인용하는 핵심 재료가 됩니다.
            </p>
            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">
                작가노트 * <span className="font-normal text-navy-400">({artistNote.length}자)</span>
              </label>
              <textarea value={artistNote} onChange={(e) => setArtistNote(e.target.value)}
                placeholder="저는 매일 아침 창문 밖을 오래 바라봅니다..."
                rows={10}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors resize-none leading-[1.85]" />
              {errors.artistNote && <p className="text-red-500 text-xs mt-1">{errors.artistNote}</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)}
                className="nb-btn-outline flex-1 py-3.5 rounded-xl font-black text-[14px]">
                ← 이전
              </button>
              <button onClick={handleNext}
                className="nb-btn flex-1 py-3.5 rounded-xl font-black text-[14px]">
                다음 단계 →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: 첫 프로젝트 ── */}
        {step === 2 && (
          <div className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">03 · 첫 프로젝트</p>
            <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
              지금 시작하려는 작품의 구상과 목표 재료비를 입력하세요. 후원자들이 이 작품을 후원하게 됩니다.
            </p>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">작품 제목 *</label>
              <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="예: 밤 연작 No.1"
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">작품 설명 *</label>
              <textarea value={projectConcept} onChange={(e) => setProjectConcept(e.target.value)}
                placeholder="어떤 작품인지, 어떤 재료가 필요한지 설명해주세요."
                rows={5}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors resize-none leading-[1.85]" />
              {errors.projectConcept && <p className="text-red-500 text-xs mt-1">{errors.projectConcept}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">목표 재료비 (원) *</label>
              <input value={targetAmount} onChange={(e) => setTargetAmount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="예: 80000"
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {targetAmount && !isNaN(Number(targetAmount)) && (
                <p className="text-[12px] text-navy-500 mt-1">{Number(targetAmount).toLocaleString()}원</p>
              )}
              {errors.targetAmount && <p className="text-red-500 text-xs mt-1">{errors.targetAmount}</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="nb-btn-outline flex-1 py-3.5 rounded-xl font-black text-[14px]">
                ← 이전
              </button>
              <button onClick={handleNext}
                className="nb-btn flex-1 py-3.5 rounded-xl font-black text-[14px]">
                미리보기 →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: 완료 ── */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="nb-card p-7">
              <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-5">04 · 입력 내용 확인</p>

              <div className="space-y-3 text-[14px]">
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">이름</span>
                  <span className="font-bold text-navy-900">{name}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">장르·매체</span>
                  <span className="font-semibold text-navy-800">{genre} · {media.join(", ")}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">소개</span>
                  <span className="text-navy-700">{oneLiner}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">작가노트</span>
                  <span className="text-muted line-clamp-2">{artistNote}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">프로젝트</span>
                  <span className="font-bold text-navy-900">{projectTitle}</span>
                </div>
                <div className="flex gap-3 py-3">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">목표 금액</span>
                  <span className="font-black text-navy-800">{Number(targetAmount).toLocaleString()}원</span>
                </div>
              </div>
            </div>

            <button onClick={handleComplete}
              className="nb-btn w-full py-4 rounded-xl font-black text-[16px]">
              아틀리에 미리보기 열기 →
            </button>
            <button onClick={() => setStep(0)}
              className="nb-btn-outline w-full py-3.5 rounded-xl font-black text-[14px]">
              처음부터 다시 입력
            </button>
            <p className="text-center text-xs text-navy-400">* 데모 미리보기입니다. 실제 공개는 베타 오픈 시 가능합니다.</p>
          </div>
        )}

      </div>
    </div>
  );
}
