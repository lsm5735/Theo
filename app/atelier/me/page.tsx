"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useT } from "@/contexts/LangContext";
import { useMyAteliers } from "@/lib/myAtelier";
import MyAtelierCard from "@/components/atelier/MyAtelierCard";

// 이 브라우저에서 개설한 아틀리에 목록
export default function MyAtelierListPage() {
  const t = useT();
  const ateliers = useMyAteliers();

  if (ateliers === undefined) return null;

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <div className="max-w-[720px] mx-auto px-5 md:px-8 pt-14 pb-24">
        <p className="text-[11px] tracking-[0.24em] text-navy-400 font-semibold uppercase mb-3">MY ATELIER</p>
        <div className="flex items-end justify-between gap-4 mb-2">
          <h1 className="text-3xl font-black text-navy-900 leading-tight">{t("ma_list_title")}</h1>
          <Link href="/onboarding/artist" className="nb-btn shrink-0 px-4 py-2.5 rounded-xl font-black text-[13px]">
            {t("ma_list_new")}
          </Link>
        </div>
        <p className="text-sm text-muted mb-8" style={{ wordBreak: "keep-all" }}>{t("ma_list_sub")}</p>

        {ateliers.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-navy-200 p-10 text-center">
            <p className="text-navy-500 mb-6">{t("ma_empty")}</p>
            <Link href="/onboarding/artist" className="nb-btn inline-block px-8 py-3.5 rounded-xl font-black text-[15px]">
              {t("ma_empty_btn")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...ateliers].reverse().map((a) => <MyAtelierCard key={a.id} atelier={a} />)}
          </div>
        )}
      </div>
    </div>
  );
}
