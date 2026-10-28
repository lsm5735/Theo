import { notFound } from "next/navigation";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import materials from "@/data/materials.json";
import AtelierDetailClient from "./AtelierDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AtelierDetailPage({ params }: Props) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  const project    = projects.find((p) => p.artistId === artist.id) ?? null;
  const artistMaterials = materials.filter((m) => m.artistId === artist.id);

  return (
    <AtelierDetailClient
      artist={artist}
      project={project}
      materials={artistMaterials}
    />
  );
}

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}
