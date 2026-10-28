"use client";

import { useT } from "@/contexts/LangContext";
import { DictKey } from "@/lib/translations";
import { MATERIAL_SLOTS, MyMaterial, isValidContact, normalizeUrl } from "@/lib/myAtelier";

export const INPUT_CLS =
  "w-full border-2 border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-600 transition-colors";
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
  materials: MyMaterial[]; // 항상 MATERIAL_SLOTS 길이
}

export function padMaterials(materials: MyMaterial[]): MyMaterial[] {
  return Array.from({ length: MATERIAL_SLOTS }, (_, i) => materials[i] ?? { link: "", reason: "" });
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
  onChange: (index: number, field: keyof MyMaterial, value: string) => void;
}) {
  const t = useT();
  return (
    <>
      <p className="text-[14px] text-muted leading-[1.8]" style={{ wordBreak: "keep-all" }}>
        {t("ob_mat_desc")}
      </p>
      {errors.materials && <p data-error="true" className="text-red-500 text-xs">{errors.materials}</p>}
      {materials.map((m, i) => (
        <div key={i} className="rounded-xl border-2 border-navy-100 p-4 space-y-3">
          <p className="text-[13px] font-bold text-navy-700">{t("ob_mat_n")} {i + 1}</p>
          <Field error={errors[`mat_link_${i}`]}>
            <input type="url" inputMode="url" value={m.link}
              onChange={(e) => onChange(i, "link", e.target.value)}
              placeholder={t("ob_mat_link_ph")} className={INPUT_CLS} />
          </Field>
          <Field label={t("ob_mat_reason")} error={errors[`mat_reason_${i}`]}>
            <textarea value={m.reason}
              onChange={(e) => onChange(i, "reason", e.target.value)}
              placeholder={t("ob_mat_reason_ph")} rows={3} className={TEXTAREA_CLS} />
          </Field>
        </div>
      ))}
    </>
  );
}
