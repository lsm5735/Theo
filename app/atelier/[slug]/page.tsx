import { notFound } from "next/navigation";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import artworks from "@/data/artworks.json";
import materials from "@/data/materials.json";
import letters from "@/data/letters.json";
import AtelierDetailClient from "./AtelierDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AtelierDetailPage({ params }: Props) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  const project    = projects.find((p) => p.artistId === artist.id) ?? null;
  const artistArtworks = artworks.filter((w) => w.artistId === artist.id);
  const artistMaterials = materials.filter((m) => m.artistId === artist.id);
  const artistLetters = letters.filter((l) => l.artistId === artist.id);

  return (
    <AtelierDetailClient
      artist={artist}
      project={project}
      artworks={artistArtworks}
      materials={artistMaterials}
      letters={artistLetters}
    />
  );
}

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}
