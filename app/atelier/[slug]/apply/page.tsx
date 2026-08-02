import { notFound } from "next/navigation";
import artists from "@/data/artists.json";
import projects from "@/data/projects.json";
import ApplyClient from "./ApplyClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  const project = projects.find((p) => p.artistId === artist.id) ?? null;

  return <ApplyClient artist={artist} project={project} />;
}

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}
