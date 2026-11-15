import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import { APPLY_PROGRAMS } from "@/lib/programs";
import ProgramApplyForm from "./ProgramApplyForm";

interface Props {
  params: Promise<{ program: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { program } = await params;
  const p = APPLY_PROGRAMS.find((x) => x.slug === program);
  return { title: p ? `${p.title} 신청 — Theo` : "신청 — Theo" };
}

export function generateStaticParams() {
  return APPLY_PROGRAMS.map((p) => ({ program: p.slug }));
}

export default async function ProgramApplyPage({ params }: Props) {
  const { program } = await params;
  const p = APPLY_PROGRAMS.find((x) => x.slug === program);
  if (!p) notFound();

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <PageTitle text="Apply" />
      <main className="max-w-[580px] w-full mx-auto px-5 md:px-8 py-10">
        <ProgramApplyForm program={p} />
      </main>
    </div>
  );
}
