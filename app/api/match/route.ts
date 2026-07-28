import { NextRequest, NextResponse } from "next/server";
import artistsData from "@/data/artists.json";
import projectsData from "@/data/projects.json";
import artworksData from "@/data/artworks.json";

type Artist = (typeof artistsData)[number];
type Project = (typeof projectsData)[number];
type Artwork = (typeof artworksData)[number];

function buildProfileCard(artist: Artist): string {
  const repArtworks = (artworksData as Artwork[])
    .filter((a) => a.artistId === artist.id && a.isRepresentative)
    .slice(0, 2);

  const project = (projectsData as Project[]).find(
    (p) => p.artistId === artist.id && p.status === "recruiting"
  );

  // 작가노트 앞 130자 (마스터문서 §12: "작가노트 요약 2문장")
  const noteSnippet =
    artist.artistNote.length > 130
      ? artist.artistNote.slice(0, 130) + "…"
      : artist.artistNote;

  const lines = [
    `[${artist.id}|${artist.name}|${artist.genre}·${artist.media.join("·")}|무드:${artist.tags.slice(0, 4).join(",")}]`,
    `작가노트: "${noteSnippet}"`,
  ];

  if (repArtworks.length > 0) {
    lines.push(`대표작: ${repArtworks.map((a) => a.caption).join(" / ")}`);
  }

  if (project) {
    // 신규 노출 부스트 신호: 후원 0건 작가에 표시
    const boost = project.sponsorCount === 0 ? " [신규작가]" : "";
    lines.push(`진행 프로젝트: ${project.title}(모집중)${boost}`);
  } else {
    lines.push("진행 프로젝트: 준비 중");
  }

  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { query?: string };
  const query = (body.query ?? "").trim();

  if (!query) {
    return NextResponse.json({ error: "query required" }, { status: 400 });
  }

  const activeArtists = (artistsData as Artist[]).filter((a) => a.status === "active");
  const profileCards = activeArtists.map(buildProfileCard).join("\n\n---\n\n");

  const systemPrompt = `당신은 테오(Theo) 플랫폼의 AI 큐레이터입니다.
후원자의 취향 문장을 분석해 아래 작가 프로필 카드에서 가장 잘 맞는 작가 3명을 추천하세요.

추천 기준 가중치:
- 취향 적합도 60%: 작가노트·무드 태그와 취향 감성의 일치
- 활성도 25%: 모집중 프로젝트 보유 여부
- 신규 노출 15%: [신규작가] 표시 작가에 소량 가점(첫 후원자를 만나게)

필수 규칙:
1. reason에는 반드시 작가노트 실제 문구를 큰따옴표로 인용할 것
2. 취향 문장의 감성과 어떻게 공명하는지 구체적으로 설명할 것
3. 아래 JSON 배열만 반환할 것 — 그 외 텍스트 절대 금지

[{"rank":1,"artistId":"artist_theo_XXX","reason":"이유(작가노트 인용 포함, 80자 이내)","quote":"인용된 작가노트 구절(30~50자)"},{"rank":2,...},{"rank":3,...}]`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  let rankings: { rank: number; artistId: string; reason: string; quote: string }[] = [];

  try {
    const apiRes = await fetch("https://api.upstage.ai/v1/solar/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTAGE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "solar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `후원자 취향: "${query}"\n\n작가 프로필 카드 (${activeArtists.length}명):\n${profileCards}\n\nTop 3를 JSON으로:`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (apiRes.ok) {
      const apiData = await apiRes.json();
      const content: string = apiData.choices?.[0]?.message?.content ?? "";
      const match = content.match(/\[[\s\S]*?\]/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          rankings = parsed;
        }
      }
    }
  } catch {
    clearTimeout(timeoutId);
    // 폴백으로 진행
  }

  // 폴백: Solar 실패 시 totalSponsors 기준 규칙 정렬
  if (!rankings.length) {
    const sorted = [...activeArtists].sort((a, b) => b.totalSponsors - a.totalSponsors);
    rankings = sorted.slice(0, 3).map((a, i) => ({
      rank: i + 1,
      artistId: a.id,
      reason: `취향과 맞닿는 감성을 가진 작가예요. ${a.oneLiner}`,
      quote: a.artistNote.slice(0, 45) + "…",
    }));
  }

  const results = rankings.slice(0, 3).map((r) => {
    const artist = (artistsData as Artist[]).find((a) => a.id === r.artistId) ?? null;
    const project =
      (projectsData as Project[]).find(
        (p) => p.artistId === r.artistId && p.status === "recruiting"
      ) ?? null;
    return { ...r, artist, project };
  });

  return NextResponse.json({ results });
}
