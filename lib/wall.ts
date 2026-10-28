// 아틀리에 담벼락 — 작가(고흐)와 그 작가를 후원한 테오만 글·사진을 남길 수 있는 타임라인
// 시드: 기존 편지(작가 글로 축약) + 후원 메시지(테오 글). 새 글은 localStorage.

import { useMemo } from "react";
import { createLocalStore } from "./localStore";
import letters from "@/data/letters.json";
import sponsors from "@/data/sponsors.json";
import projects from "@/data/projects.json";

/** 내 아틀리에(/atelier/me)의 담벼락 id */
export const MY_WALL_ID = "me";

export type WallRole = "artist" | "theo";

export interface WallPost {
  id: string;
  wallId: string; // artist.id 또는 MY_WALL_ID
  role: WallRole;
  authorName: string;
  text: string;
  image: string;
  createdAt: string; // ISO 또는 YYYY-MM-DD
  mine?: boolean; // 이 브라우저에서 작성 — 삭제 가능
}

const MAX_EXCERPT = 220;

// 시드 작가 글에 붙는 작업실 사진 (작품 사진 대신 작업하는 모습)
const STUDIO_PHOTOS = ["/wall/studio-1.jpg", "/wall/studio-2.jpg", "/wall/studio-3.jpg", "/wall/studio-4.jpg"];

// 긴 편지를 담벼락용 짧은 글로: 인사·맺음말 빼고 본문 앞부분만
function excerptLetter(content: string): string {
  const paras = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p && !/님[,.]?(\s*안녕하세요\.?)?$/.test(p) && !/^Dear Theo/i.test(p));
  const body = paras.slice(0, 2).join(" ");
  return body.length > MAX_EXCERPT ? `${body.slice(0, MAX_EXCERPT).trimEnd()}…` : body;
}

function seedPosts(wallId: string): WallPost[] {
  const posts: WallPost[] = [];
  const projectIds = new Set(projects.filter((p) => p.artistId === wallId).map((p) => p.id));

  letters.forEach((l, i) => {
    if (l.artistId !== wallId) return;
    posts.push({
      id: `seed_${l.id}`,
      wallId,
      role: "artist",
      authorName: "",
      text: `${l.letter.title}\n\n${excerptLetter(l.letter.content)}`,
      image: STUDIO_PHOTOS[i % STUDIO_PHOTOS.length],
      createdAt: l.letter.createdAt,
    });
  });
  for (const s of sponsors) {
    if (!projectIds.has(s.projectId) || !s.message) continue;
    posts.push({
      id: `seed_${s.id}`,
      wallId,
      role: "theo",
      authorName: s.nickname,
      text: s.message,
      image: "",
      createdAt: s.date,
    });
  }
  return posts;
}

const store = createLocalStore<WallPost[]>("theo_wall_posts", []);

export function addWallPost(post: Omit<WallPost, "id" | "createdAt" | "mine">): boolean {
  return store.set([
    ...store.get(),
    { ...post, id: `post_${Date.now()}`, createdAt: new Date().toISOString(), mine: true },
  ]);
}

export function deleteWallPost(id: string) {
  store.set(store.get().filter((p) => p.id !== id));
}

/** 최신 글이 앞. undefined = 아직 읽기 전 */
export function useWallPosts(wallId: string): WallPost[] | undefined {
  const local = store.useValue();
  return useMemo(() => {
    if (local === undefined) return undefined;
    return [...seedPosts(wallId), ...local.filter((p) => p.wallId === wallId)].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  }, [local, wallId]);
}

/** 여러 담벼락의 최신 작가 글 (마이테오 피드용) */
export function useArtistUpdates(wallIds: string[], limit = 5): WallPost[] | undefined {
  const local = store.useValue();
  const key = wallIds.join(",");
  return useMemo(() => {
    if (local === undefined) return undefined;
    const ids = key ? key.split(",") : [];
    return ids
      .flatMap((id) => [...seedPosts(id), ...local.filter((p) => p.wallId === id)])
      .filter((p) => p.role === "artist")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  }, [local, key, limit]);
}
