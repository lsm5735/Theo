import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";

/** 이용약관·개인정보처리방침·고지 페이지의 공통 틀 */
export function LegalShell({ big, title, children }: { big: string; title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <PageTitle text={big} />
      <main className="px-[var(--gap)]">
        <div className="max-w-[56rem] md:ml-[calc((100vw-var(--gap)*2)*0.25)] py-10 md:py-16">
          <h1 className="text-[26px] md:text-[34px] font-bold leading-[1.25] mb-8" style={{ wordBreak: "keep-all" }}>{title}</h1>
          <div className="text-[15.5px] leading-[1.9]" style={{ wordBreak: "keep-all" }}>{children}</div>
          <p className="mt-14 text-[14px] text-muted">
            <Link href="/terms" className="underlined">이용약관</Link>
            <span className="mx-2">·</span>
            <Link href="/privacy" className="underlined">개인정보처리방침</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

/** 조항/항목 하나 (소제목 + 내용) */
export function Art({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section className="mt-9 first:mt-0">
      <h2 className="text-[18px] md:text-[20px] font-bold leading-snug mb-3">{h}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

type Item = string | [string, string[]];

/** 번호 목록 — [본문, 하위 글머리 목록] 형태로 하위 항목도 넣을 수 있다 */
export function Ol({ items }: { items: Item[] }) {
  return (
    <ol className="list-decimal pl-6 space-y-1.5 marker:text-muted">
      {items.map((it, i) => {
        const [t, sub] = typeof it === "string" ? [it, undefined] : it;
        return (
          <li key={i}>
            {t}
            {sub && (
              <ul className="list-disc pl-5 mt-1.5 space-y-1 marker:text-muted">
                {sub.map((x, j) => <li key={j}>{x}</li>)}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function Ul({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1.5 marker:text-muted">
      {items.map((x, i) => <li key={i}>{x}</li>)}
    </ul>
  );
}

/** 표 — 좁은 화면에서는 가로로 밀어 볼 수 있게 한다 */
export function Tbl({ head, rows, min = "36rem" }: { head: string[]; rows: ReactNode[][]; min?: string }) {
  return (
    <div className="overflow-x-auto border-y border-[rgba(7,34,60,.25)]">
      <table className="w-full text-[14px] leading-[1.7] border-collapse" style={{ minWidth: min }}>
        <thead>
          <tr className="bg-surface-card text-left">
            {head.map((h) => <th key={h} className="font-bold px-3 py-2.5 align-top">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[rgba(7,34,60,.15)]">
              {r.map((c, j) => <td key={j} className="px-3 py-2.5 align-top">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
