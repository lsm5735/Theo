import artists from "@/data/artists.json";
import SponsorClient from "./SponsorClient";

interface Props {
  params: Promise<{ artistId: string }>;
}

export default async function SponsorPage({ params }: Props) {
  const { artistId } = await params;
  return <SponsorClient artistId={artistId} />;
}

export function generateStaticParams() {
  return artists.map((a) => ({ artistId: a.id }));
}
