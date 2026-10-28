"use client";

import { useState, useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import AtelierSettings, { SettingsTab } from "@/components/atelier/AtelierSettings";
import Wall from "@/components/atelier/Wall";
import { useT } from "@/contexts/LangContext";
import { MyAtelier, deleteMyAtelier, hostOf, saveMyAtelier, snsHref, useMyAtelier } from "@/lib/myAtelier";

const noopSubscribe = () => () => {};
const SETTINGS_TABS: SettingsTab[] = ["profile", "note", "materials", "project"];

const CARD_SHADOW = {};

export default function MyAtelierPage() {
  const t = useT();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const atelier = useMyAtelier(id);
  const search = useSyncExternalStore(noopSubscribe, () => window.location.search, () => "");
  const params = new URLSearchParams(search);
  const fromSignup = params.get("new") === "1";
  // ?settings=project 처럼 들어오면 해당 탭으로 설정 패널을 연 채 시작 (마이테오 고흐 화면에서 연결)
  const urlTab = SETTINGS_TABS.find((tab) => tab === params.get("settings")) ?? null;
  const [savedOnce, setSavedOnce] = useState(false);
  const [pickedTab, setSettingsTab] = useState<SettingsTab | null | undefined>(undefined);
  const settingsTab = pickedTab === undefined ? urlTab : pickedTab;
  const justCreated = fromSignup && !savedOnce;

  function handleSave(next: MyAtelier): boolean {
    if (!saveMyAtelier(next)) return false;
    setSavedOnce(true);
    return true;
  }

  function handleDelete() {
    deleteMyAtelier(id);
    router.replace("/atelier/me");
  }

  if (atelier === undefined) return null;

  if (!atelier) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <div className="max-w-[560px] mx-auto px-5 pt-32 text-center">
          <p className="text-navy-400 mb-6">{t("ma_not_found")}</p>
          <Link href="/atelier/me" className="nb-btn px-8 py-3.5 rounded-xl font-black text-[15px]">
            {t("ma_list_btn")}
          </Link>
        </div>
      </div>
    );
  }

  const project = atelier.project;
  const sns = snsHref(atelier.sns);
  const infoRows = [
    { label: t("ma_info_genre"), value: atelier.genre },
    { label: t("ma_info_media"), value: atelier.media.join(", ") },
    { label: t("ma_info_location"), value: atelier.location },
  ].filter((r) => r.value);

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* 소유자 바 */}
      <div className="bg-navy-800 px-5 md:px-8 py-3">
        <div className="max-w-[1080px] mx-auto flex items-center justify-between gap-3">
          <p className="text-[12.5px] font-semibold text-chiffon/80 min-w-0" style={{ wordBreak: "keep-all" }}>
            {justCreated ? t("ma_created") : t("ma_owner_bar")}
          </p>
          <button
            onClick={() => setSettingsTab("profile")}
            className="shrink-0 bg-sv text-ink text-[12.5px] font-bold px-4 py-2 rounded-lg hover:bg-sv-soft transition-colors"
          >
            {t("ma_settings")}
          </button>
        </div>
      </div>

      {/* 커버 */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden"
        style={{ background: "linear-gradient(150deg,var(--navy-900) 0%,var(--navy-700) 60%,var(--navy-500) 100%)" }}>
        {atelier.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={atelier.coverImage} alt="" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top,rgba(7,34,60,.7) 0%,rgba(13,59,102,.2) 50%,transparent 100%)" }} />
        <div className="absolute top-4 left-5 md:left-8">
          <Link href="/atelier/me" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors">
            {t("ma_back_list")}
          </Link>
        </div>
        {(atelier.genre || atelier.media.length > 0) && (
          <div className="absolute bottom-5 left-5 md:left-8 flex flex-wrap gap-2">
            {atelier.genre && (
              <span className="bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full">{atelier.genre}</span>
            )}
            {atelier.media.map((m) => (
              <span key={m} className="bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">{m}</span>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[1080px] mx-auto px-5 md:px-8">
        {/* 프로필 카드 */}
        <div className="relative -mt-12 mb-10">
          <div className="bg-card rounded-2xl p-6 border border-line" style={CARD_SHADOW}>
            <div className="flex items-start gap-4">
              <button
                onClick={() => setSettingsTab("profile")}
                className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-sv-soft shrink-0 shadow-sm bg-navy-100 flex items-center justify-center"
                aria-label={t("st_profile_img")}
              >
                {atelier.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={atelier.profileImage} alt={atelier.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-black text-navy-500">{atelier.name.slice(0, 1)}</span>
                )}
              </button>
              <div className="flex-1 min-w-0 pt-1">
                <h1 className="text-2xl font-semibold text-ink mb-1">{atelier.name}</h1>
                {atelier.oneLiner ? (
                  <p className="font-myeongjo text-navy-600 text-sm mb-2">{atelier.oneLiner}</p>
                ) : (
                  <button onClick={() => setSettingsTab("profile")}
                    className="text-[13px] text-navy-400 underline underline-offset-2 mb-2 text-left">
                    {t("ma_oneliner_empty")}
                  </button>
                )}
                {atelier.location && <p className="text-xs text-muted">{atelier.location}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 pb-20">
          {/* 왼쪽 */}
          <div className="space-y-10 min-w-0">
            {/* 프로젝트 */}
            <section>
              <h2 className="text-[22px] font-semibold text-ink mb-4">{t("ma_project_title")}</h2>
              {project ? (
                <div className="bg-card rounded-2xl overflow-hidden border border-line" style={CARD_SHADOW}>
                  {project.image && (
                    <div className="relative h-48">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,34,60,.6),transparent 60%)" }} />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="font-black text-navy-900 text-[18px] mb-2">{project.title}</p>
                    <p className="text-sm text-ink leading-relaxed mb-5 whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
                      {project.concept}
                    </p>
                    <div className="w-full bg-navy-100 rounded-full h-2 overflow-hidden" />
                    <div className="flex justify-between text-xs text-muted mt-1.5">
                      <span>0{t("ma_pct")}</span>
                      <span>{t("ma_goal")} {project.targetAmount.toLocaleString()}원</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-navy-100">
                      <button onClick={() => setSettingsTab("project")}
                        className="text-xs text-navy-600 hover:text-navy-800 font-semibold transition-colors">
                        {t("ma_settings")} →
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-line-strong p-8 text-center">
                  <p className="font-bold text-navy-700 mb-1.5">{t("ma_project_empty")}</p>
                  <p className="text-[13px] text-muted leading-[1.7] mb-5 max-w-[360px] mx-auto" style={{ wordBreak: "keep-all" }}>
                    {t("ma_project_empty_sub")}
                  </p>
                  <button onClick={() => setSettingsTab("project")}
                    className="nb-btn px-6 py-3 rounded-xl font-black text-[14px]">
                    {t("ma_project_add")}
                  </button>
                </div>
              )}
            </section>

            {/* 작가노트 */}
            <section>
              <h2 className="text-[22px] font-semibold text-ink mb-4">{t("ma_note_title")}</h2>
              <div className="bg-card rounded-2xl p-6 border border-line" style={CARD_SHADOW}>
                <p className="text-[15px] text-navy-900 leading-[2.0] font-myeongjo whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
                  {atelier.artistNote}
                </p>
              </div>
            </section>

            {/* 필요한 재료 */}
            {atelier.materials.length > 0 && (
              <section>
                <h2 className="text-[22px] font-semibold text-ink mb-4">{t("ma_materials_title")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {atelier.materials.map((m, i) => (
                    <div key={i} className="rounded-2xl border border-line bg-card p-4 flex flex-col" style={CARD_SHADOW}>
                      <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-navy-400 mb-2 truncate">
                        {hostOf(m.link)}
                      </p>
                      <p className="text-[13px] text-navy-800 leading-[1.7] flex-1 mb-3" style={{ wordBreak: "keep-all" }}>
                        {m.reason}
                      </p>
                      <a href={m.link} target="_blank" rel="noopener noreferrer"
                        className="text-[12.5px] font-bold text-navy-700 hover:text-navy-900 transition-colors">
                        {t("ma_material_open")}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 담벼락 — 작가 본인으로 작성 */}
            <Wall wallId={atelier.id} artistName={atelier.name} author={{ role: "artist", name: atelier.name }} />
          </div>

          {/* 오른쪽 */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            {(sns || atelier.portfolio) && (
              <div className="bg-card rounded-2xl p-5 border border-line">
                <p className="text-xs font-bold text-navy-700 mb-3">{t("ma_links_title")}</p>
                <div className="space-y-2.5 text-[13px]">
                  {sns && (
                    <a href={sns} target="_blank" rel="noopener noreferrer" className="flex justify-between gap-3 group">
                      <span className="text-navy-400 font-semibold shrink-0">{t("ob_sns")}</span>
                      <span className="font-semibold text-navy-800 group-hover:underline truncate">{atelier.sns}</span>
                    </a>
                  )}
                  {atelier.portfolio && (
                    <a href={atelier.portfolio} target="_blank" rel="noopener noreferrer" className="flex justify-between gap-3 group">
                      <span className="text-navy-400 font-semibold shrink-0">{t("ob_portfolio")}</span>
                      <span className="font-semibold text-navy-800 group-hover:underline truncate">{hostOf(atelier.portfolio)}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {infoRows.length > 0 && (
              <div className="bg-card rounded-2xl p-5 border border-line">
                <p className="text-xs font-bold text-navy-700 mb-3">{t("ma_info_title")}</p>
                <div className="space-y-2.5 text-[13px]">
                  {infoRows.map((r) => (
                    <div key={r.label} className="flex justify-between gap-3">
                      <span className="text-navy-400 font-semibold shrink-0">{r.label}</span>
                      <span className="font-bold text-navy-800 text-right">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => setSettingsTab("profile")}
              className="nb-btn-outline w-full py-3 rounded-xl font-black text-[14px]">
              {t("ma_settings")}
            </button>
          </div>
        </div>
      </div>

      {settingsTab && (
        <AtelierSettings
          atelier={atelier}
          initialTab={settingsTab}
          onClose={() => setSettingsTab(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
