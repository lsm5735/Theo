"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useT } from "@/contexts/LangContext";

const STEPS_N = ["01", "02", "03", "04"];

const GENRE_OPTIONS = ["회화", "한국화", "드로잉", "판화", "조각", "설치", "사진", "미디어", "공예", "혼합"];
const MEDIA_OPTIONS = ["유화", "아크릴", "수채", "과슈", "목탄", "연필", "먹", "파스텔", "세라믹", "직물", "혼합매체"];

export default function ArtistOnboarding() {
  const t = useT();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const STEPS = [
    { n: "01", label: t("ob_step1") },
    { n: "02", label: t("ob_step2") },
    { n: "03", label: t("ob_step3") },
    { n: "04", label: t("ob_step4") },
  ];

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
      if (!name.trim()) e.name = t("err_name");
      if (!genre) e.genre = t("err_genre");
      if (media.length === 0) e.media = t("err_media");
      if (!oneLiner.trim()) e.oneLiner = t("err_liner");
    }
    if (step === 1) {
      if (artistNote.trim().length < 50) e.artistNote = t("err_note");
    }
    if (step === 2) {
      if (!projectTitle.trim()) e.projectTitle = t("err_proj_title");
      if (!projectConcept.trim()) e.projectConcept = t("err_proj_concept");
      if (!targetAmount || isNaN(Number(targetAmount))) e.targetAmount = t("err_proj_amount");
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
          {t("ob_back")}
        </Link>

        {/* 헤딩 */}
        <p className="text-xs font-bold tracking-[0.22em] text-navy-400 uppercase mb-3">{t("ob_label")}</p>
        <h1 className="text-3xl md:text-4xl font-black text-navy-900 leading-[1.2] mb-3"
          style={{ letterSpacing: "-0.02em" }}>
          {t("ob_h1a")}<br />{t("ob_h1b")}
        </h1>
        <p className="text-[15px] text-muted leading-[1.85] mb-10">
          {t("ob_sub")}
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
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">{t("ob_s0_label")}</p>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">{t("ob_name")}</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder={t("ob_name_ph")}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-2">{t("ob_genre")}</label>
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
              <label className="block text-[13px] font-bold text-navy-700 mb-2">{t("ob_media")}</label>
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
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">{t("ob_location")}</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder={t("ob_location_ph")}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">
                {t("ob_liner")} <span className="font-normal text-navy-400">({oneLiner.length}/40)</span>
              </label>
              <input value={oneLiner} onChange={(e) => setOneLiner(e.target.value.slice(0, 40))}
                placeholder={t("ob_liner_ph")}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {errors.oneLiner && <p className="text-red-500 text-xs mt-1">{errors.oneLiner}</p>}
            </div>

            <button onClick={handleNext}
              className="nb-btn w-full py-3.5 rounded-xl font-black text-[15px] mt-2">
              {t("btn_next")}
            </button>
          </div>
        )}

        {/* ── STEP 1: 작가노트 ── */}
        {step === 1 && (
          <div className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">{t("ob_s1_label")}</p>
            <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
              {t("ob_s1_desc")}
            </p>
            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">
                {t("ob_note")} <span className="font-normal text-navy-400">({artistNote.length}자)</span>
              </label>
              <textarea value={artistNote} onChange={(e) => setArtistNote(e.target.value)}
                placeholder={t("ob_note_ph")}
                rows={10}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors resize-none leading-[1.85]" />
              {errors.artistNote && <p className="text-red-500 text-xs mt-1">{errors.artistNote}</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)}
                className="nb-btn-outline flex-1 py-3.5 rounded-xl font-black text-[14px]">
                {t("btn_prev")}
              </button>
              <button onClick={handleNext}
                className="nb-btn flex-1 py-3.5 rounded-xl font-black text-[14px]">
                {t("btn_next")}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: 첫 프로젝트 ── */}
        {step === 2 && (
          <div className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">{t("ob_s2_label")}</p>
            <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
              {t("ob_s2_desc")}
            </p>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">{t("ob_proj_title")}</label>
              <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}
                placeholder={t("ob_proj_title_ph")}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">{t("ob_proj_concept")}</label>
              <textarea value={projectConcept} onChange={(e) => setProjectConcept(e.target.value)}
                placeholder={t("ob_proj_concept_ph")}
                rows={5}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors resize-none leading-[1.85]" />
              {errors.projectConcept && <p className="text-red-500 text-xs mt-1">{errors.projectConcept}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy-700 mb-1.5">{t("ob_proj_amount")}</label>
              <input value={targetAmount} onChange={(e) => setTargetAmount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder={t("ob_proj_amount_ph")}
                className="w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors" />
              {targetAmount && !isNaN(Number(targetAmount)) && (
                <p className="text-[12px] text-navy-500 mt-1">{Number(targetAmount).toLocaleString()}원</p>
              )}
              {errors.targetAmount && <p className="text-red-500 text-xs mt-1">{errors.targetAmount}</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="nb-btn-outline flex-1 py-3.5 rounded-xl font-black text-[14px]">
                {t("btn_prev")}
              </button>
              <button onClick={handleNext}
                className="nb-btn flex-1 py-3.5 rounded-xl font-black text-[14px]">
                {t("btn_preview")}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: 완료 ── */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="nb-card p-7">
              <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-5">{t("ob_s3_label")}</p>

              <div className="space-y-3 text-[14px]">
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">{t("ob_field_name")}</span>
                  <span className="font-bold text-navy-900">{name}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">{t("ob_field_genre")}</span>
                  <span className="font-semibold text-navy-800">{genre} · {media.join(", ")}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">{t("ob_field_liner")}</span>
                  <span className="text-navy-700">{oneLiner}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">{t("ob_field_note")}</span>
                  <span className="text-muted line-clamp-2">{artistNote}</span>
                </div>
                <div className="flex gap-3 py-3 border-b border-line">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">{t("ob_field_project")}</span>
                  <span className="font-bold text-navy-900">{projectTitle}</span>
                </div>
                <div className="flex gap-3 py-3">
                  <span className="text-navy-400 font-semibold w-24 shrink-0">{t("ob_field_amount")}</span>
                  <span className="font-black text-navy-800">{Number(targetAmount).toLocaleString()}원</span>
                </div>
              </div>
            </div>

            <button onClick={handleComplete}
              className="nb-btn w-full py-4 rounded-xl font-black text-[16px]">
              {t("btn_open")}
            </button>
            <button onClick={() => setStep(0)}
              className="nb-btn-outline w-full py-3.5 rounded-xl font-black text-[14px]">
              {t("btn_restart")}
            </button>
            <p className="text-center text-xs text-navy-400">{t("ob_demo_note")}</p>
          </div>
        )}

      </div>
    </div>
  );
}
