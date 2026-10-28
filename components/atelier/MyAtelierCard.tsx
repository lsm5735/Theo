"use client";

import Link from "next/link";
import { useT } from "@/contexts/LangContext";
import { MyAtelier } from "@/lib/myAtelier";

export default function MyAtelierCard({ atelier }: { atelier: MyAtelier }) {
  const t = useT();
  return (
    <Link
      href={`/atelier/me/${atelier.id}`}
      className="group block rounded-xl overflow-hidden border border-line bg-card hover:border-navy-300 transition-colors"
      style={{ boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
    >
      <div className="relative h-24"
        style={{ background: "linear-gradient(150deg,var(--navy-900) 0%,var(--navy-700) 60%,var(--navy-500) 100%)" }}>
        {atelier.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={atelier.coverImage} alt="" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="px-4 pb-4 -mt-7 relative">
        <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-sv-soft bg-navy-100 flex items-center justify-center mb-2">
          {atelier.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={atelier.profileImage} alt={atelier.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-black text-navy-500">{atelier.name.slice(0, 1)}</span>
          )}
        </div>
        <p className="font-black text-navy-900 group-hover:underline underline-offset-2">{atelier.name}</p>
        <p className="text-[12.5px] text-muted truncate">
          {atelier.project ? atelier.project.title : atelier.oneLiner || t("ma_card_no_project")}
        </p>
      </div>
    </Link>
  );
}
