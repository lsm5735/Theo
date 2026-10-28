"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/contexts/LangContext";
import {
  GENRE_OPTIONS,
  MEDIA_OPTIONS,
  MyAtelier,
  MyMaterial,
  normalizeUrl,
  resizeImage,
} from "@/lib/myAtelier";
import {
  Errors,
  Field,
  INPUT_CLS,
  TEXTAREA_CLS,
  MaterialFields,
  NoteField,
  ProfileFields,
  cleanMaterials,
  padMaterials,
  validateMaterials,
  validateNote,
  validateProfile,
} from "./AtelierFields";

export type SettingsTab = "profile" | "note" | "materials" | "project";

const TABS: { id: SettingsTab; key: "st_tab_profile" | "st_tab_note" | "st_tab_materials" | "st_tab_project" }[] = [
  { id: "profile", key: "st_tab_profile" },
  { id: "note", key: "st_tab_note" },
  { id: "materials", key: "st_tab_materials" },
  { id: "project", key: "st_tab_project" },
];

// 에러 키가 어느 탭에 속하는지 — 저장 시 첫 에러 탭으로 이동
function tabOfError(key: string): SettingsTab {
  if (key === "artistNote") return "note";
  if (key === "materials" || key.startsWith("mat_")) return "materials";
  if (key.startsWith("proj_")) return "project";
  return "profile";
}

interface ProjectDraft {
  title: string;
  concept: string;
  targetAmount: string;
  image: string;
}

function ImagePicker({
  label,
  value,
  round,
  maxSize,
  onChange,
}: {
  label: string;
  value: string;
  round?: boolean;
  maxSize: number;
  onChange: (dataUrl: string) => void;
}) {
  const t = useT();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    try {
      onChange(await resizeImage(file, maxSize));
    } catch {
      setError(t("st_img_fail"));
    }
  }

  return (
    <Field label={label} error={error}>
      <div className="flex items-center gap-4">
        <div className={`shrink-0 overflow-hidden bg-navy-100 border-2 border-navy-200 ${round ? "w-20 h-20 rounded-full" : "w-36 h-20 rounded-xl"}`}>
          {value && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => inputRef.current?.click()}
            className="nb-btn-outline px-4 py-2 rounded-lg font-bold text-[13px]">
            {t("st_upload")}
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")}
              className="text-[12px] text-navy-400 hover:text-navy-700 underline underline-offset-2 text-left">
              {t("st_remove")}
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ""; }} />
      </div>
    </Field>
  );
}

export default function AtelierSettings({
  atelier,
  initialTab,
  onClose,
  onSave,
}: {
  atelier: MyAtelier;
  initialTab: SettingsTab;
  onClose: () => void;
  onSave: (next: MyAtelier) => boolean;
}) {
  const t = useT();
  const [tab, setTab] = useState<SettingsTab>(initialTab);
  const [draft, setDraft] = useState({ ...atelier, materials: padMaterials(atelier.materials) });
  const [project, setProject] = useState<ProjectDraft>({
    title: atelier.project?.title ?? "",
    concept: atelier.project?.concept ?? "",
    targetAmount: atelier.project ? String(atelier.project.targetAmount) : "",
    image: atelier.project?.image ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [saveError, setSaveError] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  // 패널 열려 있는 동안 배경 스크롤 잠금 + ESC로 닫기
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  function set<K extends keyof MyAtelier>(field: K, value: MyAtelier[K]) {
    setDraft((d) => ({ ...d, [field]: value }));
  }

  function setMaterial(i: number, field: keyof MyMaterial, value: string) {
    setDraft((d) => ({
      ...d,
      materials: d.materials.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)),
    }));
  }

  function toggleMedia(m: string) {
    set("media", draft.media.includes(m) ? draft.media.filter((x) => x !== m) : [...draft.media, m]);
  }

  const projectTouched = !!(project.title.trim() || project.concept.trim() || project.targetAmount || project.image);

  function validateProject(): Errors {
    if (!projectTouched) return {};
    const e: Errors = {};
    if (!project.title.trim()) e.proj_title = t("err_proj_title");
    if (!project.concept.trim()) e.proj_concept = t("err_proj_concept");
    if (!project.targetAmount || Number(project.targetAmount) <= 0) e.proj_amount = t("err_proj_amount");
    return e;
  }

  function handleSave() {
    const e = {
      ...validateProfile(draft, t),
      ...validateNote(draft.artistNote, t),
      ...validateMaterials(draft.materials, t),
      ...validateProject(),
    };
    setErrors(e);
    const keys = Object.keys(e);
    if (keys.length > 0) {
      const tabsWithErrors = keys.map(tabOfError);
      if (!tabsWithErrors.includes(tab)) setTab(tabsWithErrors[0]);
      return;
    }

    const ok = onSave({
      ...draft,
      name: draft.name.trim(),
      contact: draft.contact.trim(),
      sns: draft.sns.trim(),
      portfolio: draft.portfolio.trim() ? normalizeUrl(draft.portfolio) ?? "" : "",
      artistNote: draft.artistNote.trim(),
      oneLiner: draft.oneLiner.trim(),
      location: draft.location.trim(),
      materials: cleanMaterials(draft.materials),
      project: projectTouched
        ? {
            title: project.title.trim(),
            concept: project.concept.trim(),
            targetAmount: Number(project.targetAmount),
            image: project.image,
          }
        : null,
    });
    if (ok) onClose();
    else setSaveError(t("st_save_fail"));
  }

  const errorTabs = new Set(Object.keys(errors).map(tabOfError));

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label={t("st_title")}>
      <div className="absolute inset-0 bg-navy-900/50" onClick={onClose} />

      <div className="relative w-full max-w-[520px] h-full bg-paper flex flex-col shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-lg font-black text-navy-900">{t("st_title")}</h2>
          <button onClick={onClose} className="text-[13px] font-semibold text-navy-400 hover:text-navy-800 px-2 py-1">
            {t("st_close")}
          </button>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 px-6 border-b border-line">
          {TABS.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className={`relative px-3 py-2.5 text-[13px] font-bold border-b-2 -mb-px transition-colors ${
                tab === tb.id ? "border-navy-800 text-navy-900" : "border-transparent text-navy-400 hover:text-navy-700"
              }`}>
              {t(tb.key)}
              {errorTabs.has(tb.id) && <span className="absolute top-2 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />}
            </button>
          ))}
        </div>

        {/* 본문 */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {tab === "profile" && (
            <>
              <ImagePicker label={t("st_profile_img")} value={draft.profileImage} round maxSize={480}
                onChange={(v) => set("profileImage", v)} />
              <ImagePicker label={t("st_cover_img")} value={draft.coverImage} maxSize={1600}
                onChange={(v) => set("coverImage", v)} />
              <ProfileFields draft={draft} errors={errors} onChange={(f, v) => set(f, v)} />
              <Field label={<>{t("st_oneliner")} <span className="font-normal text-navy-400">({draft.oneLiner.length}/40)</span></>}>
                <input value={draft.oneLiner} onChange={(e) => set("oneLiner", e.target.value.slice(0, 40))}
                  placeholder={t("st_oneliner_ph")} className={INPUT_CLS} />
              </Field>
              <Field label={t("st_location")}>
                <input value={draft.location} onChange={(e) => set("location", e.target.value)}
                  placeholder={t("st_location_ph")} className={INPUT_CLS} />
              </Field>
              <Field label={t("st_genre")}>
                <div className="flex flex-wrap gap-2">
                  {GENRE_OPTIONS.map((g) => (
                    <button key={g} type="button" onClick={() => set("genre", draft.genre === g ? "" : g)}
                      className={`text-[12px] px-3.5 py-1.5 rounded-full border-2 font-semibold transition-all ${
                        draft.genre === g ? "bg-navy-800 text-chiffon border-navy-800" : "border-navy-300 text-navy-600 hover:border-navy-600"
                      }`}>
                      {g}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={t("st_media")}>
                <div className="flex flex-wrap gap-2">
                  {MEDIA_OPTIONS.map((m) => (
                    <button key={m} type="button" onClick={() => toggleMedia(m)}
                      className={`text-[12px] px-3.5 py-1.5 rounded-full border-2 font-semibold transition-all ${
                        draft.media.includes(m) ? "bg-navy-800 text-chiffon border-navy-800" : "border-navy-300 text-navy-600 hover:border-navy-600"
                      }`}>
                      {m}
                    </button>
                  ))}
                </div>
              </Field>
            </>
          )}

          {tab === "note" && (
            <NoteField value={draft.artistNote} error={errors.artistNote} onChange={(v) => set("artistNote", v)} />
          )}

          {tab === "materials" && (
            <MaterialFields materials={draft.materials} errors={errors} onChange={setMaterial} />
          )}

          {tab === "project" && (
            <>
              <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
                {t("st_proj_desc")}
              </p>
              <Field label={t("st_proj_title")} error={errors.proj_title}>
                <input value={project.title} onChange={(e) => setProject((p) => ({ ...p, title: e.target.value }))}
                  placeholder={t("st_proj_title_ph")} className={INPUT_CLS} />
              </Field>
              <Field label={t("st_proj_concept")} error={errors.proj_concept}>
                <textarea value={project.concept} onChange={(e) => setProject((p) => ({ ...p, concept: e.target.value }))}
                  placeholder={t("st_proj_concept_ph")} rows={5} className={TEXTAREA_CLS} />
              </Field>
              <Field label={t("st_proj_amount")} error={errors.proj_amount}
                help={project.targetAmount ? `${Number(project.targetAmount).toLocaleString()}원` : undefined}>
                <input inputMode="numeric" value={project.targetAmount}
                  onChange={(e) => setProject((p) => ({ ...p, targetAmount: e.target.value.replace(/[^0-9]/g, "") }))}
                  placeholder={t("st_proj_amount_ph")} className={INPUT_CLS} />
              </Field>
              <ImagePicker label={t("st_proj_image")} value={project.image} maxSize={1400}
                onChange={(v) => setProject((p) => ({ ...p, image: v }))} />
              {projectTouched && (
                <button type="button"
                  onClick={() => { setProject({ title: "", concept: "", targetAmount: "", image: "" }); setErrors({}); }}
                  className="text-[12.5px] text-red-500 hover:text-red-600 underline underline-offset-2">
                  {t("st_proj_delete")}
                </button>
              )}
            </>
          )}
        </div>

        {/* 하단 저장 */}
        <div className="border-t border-line px-6 py-4 bg-paper">
          {saveError && <p className="text-red-500 text-xs mb-2">{saveError}</p>}
          <button onClick={handleSave} className="nb-btn w-full py-3.5 rounded-xl font-black text-[15px]">
            {t("st_save")}
          </button>
        </div>
      </div>
    </div>
  );
}
