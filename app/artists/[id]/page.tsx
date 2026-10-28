import { notFound, redirect } from "next/navigation";
import artists from "@/data/artists.json";

interface Props {
  params: Promise<{ id: string }>;
}

// 구 작가 페이지 — 아틀리에(/atelier/[slug])로 통합
export default async function ArtistPage({ params }: Props) {
  const { id } = await params;
  const artist = artists.find((a) => a.id === id);
  if (!artist) notFound();
  redirect(`/atelier/${artist.slug}`);
}
