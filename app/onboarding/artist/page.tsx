"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useT } from "@/contexts/LangContext";
import { MyMaterial, emptyAtelier, loadMyAtelier, normalizeUrl, saveMyAtelier, useMyAtelier } from "@/lib/myAtelier";
import {
  BasicDraft,
  Errors,
  MaterialFields,
  NoteField,
  ProfileFields,
  cleanMaterials,
  padMaterials,
  scrollToFirstError,
  validateMaterials,
  validateNote,
  validateProfile,
} from "@/components/atelier/AtelierFields";

export default function ArtistOnboarding() {
  const t = useT();
  const router = useRouter();

  const existing = useMyAtelier();
  const [draft, setDraft] = useState<BasicDraft>({
    name: "",
    contact: "",
    sns: "",
    portfolio: "",
    artistNote: "",
    materials: padMaterials([]),
  });
  const [errors, setErrors] = useState<Errors>({});

  function setField(field: "name" | "contact" | "sns" | "portfolio" | "artistNote", value: string) {
    setDraft((d) => ({ ...d, [field]: value }));
  }

  function setMaterial(i: number, field: keyof MyMaterial, value: string) {
    setDraft((d) => ({
      ...d,
      materials: d.materials.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)),
    }));
  }

  function handleSubmit() {
    const e = {
      ...validateProfile(draft, t),
      ...validateNote(draft.artistNote, t),
      ...validateMaterials(draft.materials, t),
    };
    setErrors(e);
    if (Object.keys(e).length > 0) {
      scrollToFirstError();
      return;
    }

    // 재신청이면 사진·프로젝트 등 설정에서 바꾼 값은 유지
    const base = loadMyAtelier() ?? emptyAtelier();
    saveMyAtelier({
      ...base,
      name: draft.name.trim(),
      contact: draft.contact.trim(),
      sns: draft.sns.trim(),
      portfolio: draft.portfolio.trim() ? normalizeUrl(draft.portfolio) ?? "" : "",
      artistNote: draft.artistNote.trim(),
      materials: cleanMaterials(draft.materials),
    });
    router.push("/atelier/me?new=1");
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <div className="max-w-[560px] mx-auto px-5 md:px-8 pt-16 pb-24">
        <Link href="/" className="text-sm text-navy-400 hover:text-navy-700 transition-colors mb-10 inline-block">
          {t("ob_back")}
        </Link>

        <p className="text-xs font-bold tracking-[0.22em] text-navy-400 uppercase mb-3">{t("ob_label")}</p>
        <h1 className="text-3xl md:text-4xl font-black text-navy-900 leading-[1.2] mb-3"
          style={{ letterSpacing: "-0.02em" }}>
          {t("ob_h1a")}<br />{t("ob_h1b")}
        </h1>
        <p className="text-[15px] text-muted leading-[1.85] mb-10">
          {t("ob_sub")}
        </p>

        {existing && (
          <div className="rounded-xl border-2 border-navy-200 bg-card px-5 py-4 mb-6">
            <p className="text-[13px] text-navy-700 leading-[1.7] mb-2" style={{ wordBreak: "keep-all" }}>
              {t("ob_exists")}
            </p>
            <Link href="/atelier/me" className="text-[13px] font-bold text-navy-800 underline underline-offset-2">
              {t("ob_exists_btn")}
            </Link>
          </div>
        )}

        <div className="space-y-6">
          <section className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">{t("ob_sec1")}</p>
            <ProfileFields draft={draft} errors={errors} onChange={setField} />
          </section>

          <section className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">{t("ob_sec2")}</p>
            <NoteField value={draft.artistNote} error={errors.artistNote} onChange={(v) => setField("artistNote", v)} />
          </section>

          <section className="nb-card p-7 space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-navy-400 uppercase mb-2">{t("ob_sec3")}</p>
            <MaterialFields materials={draft.materials} errors={errors} onChange={setMaterial} />
          </section>

          <button onClick={handleSubmit}
            className="nb-btn w-full py-4 rounded-xl font-black text-[16px]">
            {t("ob_submit")}
          </button>
          <p className="text-center text-xs text-navy-400">{t("ob_demo_note")}</p>
        </div>
      </div>
    </div>
  );
}
