"use client";

import { useT } from "@/contexts/LangContext";
import { DictKey } from "@/lib/translations";
import { MATERIAL_SLOTS, MAX_MATERIALS, MyMaterial, isValidContact, normalizeUrl } from "@/lib/myAtelier";

export const INPUT_CLS =
  "w-full min-h-11 border border-line-strong rounded-xl px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 bg-card outline-none focus:border-ink transition-colors";
export const TEXTAREA_CLS = `${INPUT_CLS} resize-none leading-[1.85]`;

export type Errors = Record<string, string>;
type T = (key: DictKey) => string;

/** 등록 폼·설정 패널이 공유하는 입력값 */
export interface BasicDraft {
  name: string;
  contact: string;
  sns: string;
  portfolio: string;
  artistNote: string;
  materials: MyMaterial[]; // 최소 MATERIAL_SLOTS 칸, "+ 재료 추가"로 늘어남
}

const EMPTY_MATERIAL: MyMaterial = { link: "", reason: "" };

export function padMaterials(materials: MyMaterial[]): MyMaterial[] {
  const length = Math.max(MATERIAL_SLOTS, materials.length);
  return Array.from({ length }, (_, i) => materials[i] ?? EMPTY_MATERIAL);
}

/** 칸 수가 바뀌면 재료 칸 에러는 인덱스가 어긋나므로 지움 */
export function clearMaterialErrors(errors: Errors): Errors {
  return Object.fromEntries(Object.entries(errors).filter(([k]) => !k.startsWith("mat_")));
}

/** 저장용: 빈 칸 제거 + 링크 정규화 */
export function cleanMaterials(materials: MyMaterial[]): MyMaterial[] {
  return materials
    .filter((m) => m.link.trim())
    .map((m) => ({ link: normalizeUrl(m.link) ?? m.link.trim(), reason: m.reason.trim() }));
}

export function validateProfile(d: Pick<BasicDraft, "name" | "contact" | "portfolio">, t: T): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = t("err_name");
  if (d.contact.trim() && !isValidContact(d.contact)) e.contact = t("err_contact_fmt");
  if (d.portfolio.trim() && !normalizeUrl(d.portfolio)) e.portfolio = t("err_url");
  return e;
}

export function validateNote(note: string, t: T): Errors {
  return note.trim() ? {} : { artistNote: t("err_note") };
}

export function validateMaterials(materials: MyMaterial[], t: T): Errors {
  const e: Errors = {};
  let filled = 0;
  materials.forEach((m, i) => {
    const hasLink = !!m.link.trim();
    if (hasLink) {
      filled++;
      if (!normalizeUrl(m.link)) e[`mat_link_${i}`] = t("err_url");
      if (!m.reason.trim()) e[`mat_reason_${i}`] = t("err_mat_reason");
    } else if (m.reason.trim()) {
      e[`mat_link_${i}`] = t("err_mat_link");
    }
  });
  if (filled === 0) e.materials = t("err_mat_none");
  return e;
}

export function scrollToFirstError() {
  requestAnimationFrame(() => {
    document.querySelector("[data-error='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

export function Field({
  label,
  error,
  help,
  children,
}: {
  label?: React.ReactNode;
  error?: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-error={error ? "true" : undefined}>
      {label && <label className="block text-[13px] font-bold text-navy-700 mb-1.5">{label}</label>}
      {children}
      {help && !error && <p className="text-[12px] text-navy-400 mt-1">{help}</p>}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function ProfileFields({
  draft,
  errors,
  onChange,
}: {
  draft: Pick<BasicDraft, "name" | "contact" | "sns" | "portfolio">;
  errors: Errors;
  onChange: (field: "name" | "contact" | "sns" | "portfolio", value: string) => void;
}) {
  const t = useT();
  return (
    <>
      <Field label={t("ob_name")} error={errors.name}>
        <input value={draft.name} onChange={(e) => onChange("name", e.target.value)}
          placeholder={t("ob_name_ph")} className={INPUT_CLS} />
      </Field>
      <Field label={t("ob_contact")} error={errors.contact} help={t("ob_contact_help")}>
        <input value={draft.contact} onChange={(e) => onChange("contact", e.target.value)}
          placeholder={t("ob_contact_ph")} className={INPUT_CLS} />
      </Field>
      <Field label={t("ob_sns")}>
        <input value={draft.sns} onChange={(e) => onChange("sns", e.target.value)}
          placeholder={t("ob_sns_ph")} className={INPUT_CLS} />
      </Field>
      <Field label={t("ob_portfolio")} error={errors.portfolio}>
        <input type="url" inputMode="url" value={draft.portfolio} onChange={(e) => onChange("portfolio", e.target.value)}
          placeholder={t("ob_portfolio_ph")} className={INPUT_CLS} />
      </Field>
    </>
  );
}

export function NoteField({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const t = useT();
  return (
    <>
      <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
        {t("ob_note_desc")}
      </p>
      <ul className="space-y-1.5 rounded-xl bg-navy-100/60 px-4 py-3">
        {(["ob_note_q1", "ob_note_q2", "ob_note_q3"] as const).map((k) => (
          <li key={k} className="flex gap-2 text-[13px] text-navy-700 leading-[1.7]" style={{ wordBreak: "keep-all" }}>
            <span className="text-navy-400 shrink-0">·</span>
            {t(k)}
          </li>
        ))}
      </ul>
      <Field
        label={<>{t("ob_note")} <span className="font-normal text-navy-400">({value.length}{t("ob_note_count")})</span></>}
        error={error}
      >
        <textarea value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={t("ob_note_ph")} rows={10} className={TEXTAREA_CLS} />
      </Field>
    </>
  );
}

export function MaterialFields({
  materials,
  errors,
  onChange,
}: {
  materials: MyMaterial[];
  errors: Errors;
  onChange: (materials: MyMaterial[]) => void;
}) {
  const t = useT();

  function update(index: number, field: keyof MyMaterial, value: string) {
    onChange(materials.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  }

  return (
    <>
      <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
        {t("ob_mat_desc")}
      </p>
      {errors.materials && <p data-error="true" className="text-red-500 text-xs">{errors.materials}</p>}
      {materials.map((m, i) => (
        <div key={i} className="rounded-2xl bg-surface-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold text-navy-700">{t("ob_mat_n")} {i + 1}</p>
            {materials.length > 1 && (
              <button type="button" onClick={() => onChange(materials.filter((_, idx) => idx !== i))}
                className="text-[12px] text-navy-400 hover:text-red-500 transition-colors">
                {t("ob_mat_remove")}
              </button>
            )}
          </div>
          <Field error={errors[`mat_link_${i}`]}>
            <input type="url" inputMode="url" value={m.link}
              onChange={(e) => update(i, "link", e.target.value)}
              placeholder={t("ob_mat_link_ph")} className={INPUT_CLS} />
          </Field>
          <Field label={t("ob_mat_reason")} error={errors[`mat_reason_${i}`]}>
            <textarea value={m.reason}
              onChange={(e) => update(i, "reason", e.target.value)}
              placeholder={t("ob_mat_reason_ph")} rows={3} className={TEXTAREA_CLS} />
          </Field>
        </div>
      ))}
      {materials.length < MAX_MATERIALS ? (
        <button type="button" onClick={() => onChange([...materials, EMPTY_MATERIAL])}
          className="w-full rounded-2xl border border-dashed border-line-strong py-3 text-[13px] font-bold text-navy-600 hover:border-navy-400 hover:text-navy-800 transition-colors">
          {t("ob_mat_add")}
        </button>
      ) : (
        <p className="text-center text-[12px] text-navy-400">{t("ob_mat_max_pre")}{MAX_MATERIALS}{t("ob_mat_max_post")}</p>
      )}
    </>
  );
}
