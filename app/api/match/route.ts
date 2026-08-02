import { NextRequest, NextResponse } from "next/server";
import artistsData from "@/data/artists.json";
import projectsData from "@/data/projects.json";

type Artist = {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  profileImage: string;
  tags: string[];
  artistNote: string;
  palette: string[];
  media: string[];
  genre: string;
};

type Project = {
  id: string;
  artistId: string;
  title: string;
  targetAmount: number;
  fundedAmount: number;
};

// 사용자 키워드 → 작가 태그/노트 매핑
const KEYWORD_SCORES: Array<{ pattern: RegExp; tags: string[] }> = [
  // 밝기/온도
  { pattern: /밝|따뜻|warm|bright/, tags: ["살구빛", "복숭아빛", "따뜻함", "레몬빛", "다정함", "머스터드", "호박색", "황토", "황금"] },
  { pattern: /어두|dark|짙|심|깊/, tags: ["검정", "군청", "짙은", "암부", "심해", "적막", "묵직", "어두운"] },
  { pattern: /서늘|차가|cool|차분/, tags: ["청록", "회백", "서늘함", "차분함", "정적", "쪽빛", "청자색"] },

  // 감정/무드
  { pattern: /고요|잔잔|조용|정적|calm|quiet/, tags: ["정적", "서늘함", "차분함", "적막", "여운", "가벼움", "애틋함"] },
  { pattern: /격정|강렬|intense|강|역동/, tags: ["두꺼운 겹침", "임파스토", "화려함", "불안", "형광", "긴장", "잔진동", "묵직함"] },
  { pattern: /쓸쓸|고독|외로|lonely/, tags: ["쓸쓸함", "여운", "적막", "담담함", "애틋함"] },
  { pattern: /따스|따뜻|포근|cozy/, tags: ["따뜻함", "살구빛", "복숭아빛", "다정함", "아늑함"] },
  { pattern: /몽환|꿈|dream|신비/, tags: ["반투명 레이어", "번짐", "흐린 경계", "유기적", "미결정"] },
  { pattern: /에너지|역동|생생|vivid/, tags: ["잔진동", "화려함", "선명한 주황", "형광 산호", "격정적"] },

  // 소재/장면
  { pattern: /도시|city|건물|거리|밤/, tags: ["도시", "고요함", "낯섦", "군청", "형광 연두", "밤길", "호박색"] },
  { pattern: /자연|숲|나무|forest|nature|산|하늘/, tags: ["짙은 초록", "이끼빛", "쪽빛", "웅장함", "아득함", "아늑함", "탁한 초록"] },
  { pattern: /사람|인물|people|인간|얼굴|portrait/, tags: ["뒷모습", "초상", "군상", "응시", "북적임", "익명성", "담담함"] },
  { pattern: /추상|abstract|형태없|비구상/, tags: ["흘러내린 자취", "마티에르", "무광 평면", "잔진동", "유기적", "투명함"] },
  { pattern: /식물|꽃|flower|plant/, tags: ["탁한 초록", "바랜 분홍", "차분함", "애틋함", "이끼빛"] },
  { pattern: /실내|공간|room|interior/, tags: ["적막", "여운", "호박색", "성실함", "투명함"] },
  { pattern: /빛|light|조명/, tags: ["레몬빛", "투명함", "형광 연두", "성실함", "호박색", "명부만 두껍게"] },

  // 붓질/기법
  { pattern: /두꺼|두텁|임파스|impasto|거친/, tags: ["마티에르", "두꺼운 겹침", "묵직함", "한 획 임파스토", "긴장"] },
  { pattern: /얇|섬세|thin|투명|번짐/, tags: ["얇은 겹칠", "반투명 레이어", "번짐", "가벼움", "흐린 경계"] },
  { pattern: /매끈|clean|flat|정밀|깔끔/, tags: ["무광 평면", "붓자국 없음", "매끈한 패널", "정밀 묘사", "마스킹 경계"] },
  { pattern: /흘|흐르|pour|drip/, tags: ["흘러내린 자취", "흘림", "부분 선명화", "유기적"] },
];

// 매칭 점수 계산
function scoreArtist(artist: Artist, query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  for (const { pattern, tags } of KEYWORD_SCORES) {
    if (pattern.test(lowerQuery)) {
      for (const tag of tags) {
        if (artist.tags.some((t) => t.includes(tag) || tag.includes(t))) {
          score += 2;
        }
        if (artist.artistNote.includes(tag)) {
          score += 1;
        }
        if (artist.oneLiner.includes(tag)) {
          score += 1;
        }
      }
    }
  }

  // 노트 직접 키워드 매칭 보너스
  const queryWords = lowerQuery.split(/[,\s]+/).filter(Boolean);
  for (const word of queryWords) {
    if (word.length < 2) continue;
    if (artist.artistNote.includes(word)) score += 1;
    if (artist.oneLiner.includes(word)) score += 2;
    if (artist.tags.some((t) => t.includes(word))) score += 2;
  }

  return score;
}

// 추천 이유 생성
function generateReason(artist: Artist, query: string): { reason: string; quote: string } {
  const lowerQuery = query.toLowerCase();

  // 겹치는 태그를 찾아 이유에 포함
  const matchedTags: string[] = [];
  for (const { pattern, tags } of KEYWORD_SCORES) {
    if (pattern.test(lowerQuery)) {
      for (const tag of tags) {
        if (artist.tags.some((t) => t.includes(tag) || tag.includes(t))) {
          const matched = artist.tags.find((t) => t.includes(tag) || tag.includes(t));
          if (matched && !matchedTags.includes(matched)) matchedTags.push(matched);
        }
      }
    }
  }

  const tagPhrase = matchedTags.length > 0
    ? `'${matchedTags.slice(0, 2).join("', '")}' 같은 감각이`
    : `${artist.tags.slice(0, 2).join(", ")} 같은 감각이`;

  const reasonTemplates = [
    `${tagPhrase} 당신의 취향과 정확히 맞닿아 있습니다. ${artist.name} 작가는 ${artist.oneLiner.replace("습니다.", "는 작가입니다.")}`,
    `${artist.name} 작가의 작업에서 ${tagPhrase} 느껴집니다. ${artist.artistNote.slice(0, 60)}...`,
    `당신이 원하는 그림의 온도와 ${artist.name} 작가의 색감이 비슷합니다. ${tagPhrase} 두 감성을 이어주는 연결고리입니다.`,
  ];

  // 작가 ID 기반으로 템플릿 선택 (매번 같은 작가는 같은 이유)
  const templateIdx = parseInt(artist.id.replace(/\D/g, "").slice(-1)) % reasonTemplates.length;
  const reason = reasonTemplates[templateIdx];

  return { reason, quote: artist.oneLiner };
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ results: [] }, { status: 400 });
    }

    const artists = artistsData as Artist[];
    const projects = projectsData as Project[];

    // 점수 계산 + 셔플로 동점 시 다양성 확보
    const scored = artists
      .map((artist) => ({
        artist,
        score: scoreArtist(artist, query) + Math.random() * 0.5,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const results = scored.map(({ artist }, i) => {
      const project = projects.find((p) => p.artistId === artist.id) ?? null;
      const { reason, quote } = generateReason(artist, query);

      return {
        rank: i + 1,
        artistId: artist.id,
        reason,
        quote,
        artist: {
          id: artist.id,
          name: artist.name,
          slug: artist.slug,
          oneLiner: artist.oneLiner,
          profileImage: artist.profileImage,
        },
        project: project
          ? {
              id: project.id,
              title: project.title,
              targetAmount: project.targetAmount,
              fundedAmount: project.fundedAmount,
            }
          : null,
      };
    });

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
