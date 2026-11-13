// 아틀리에 담벼락 — 작가(고흐)와 그 작가를 선물한 테오만 글·사진을 남길 수 있는 타임라인
// 시드: 기존 편지(작가 글로 축약) + 선물 메시지(테오 글). 새 글은 localStorage.

import { useEffect, useMemo, useState } from "react";
import { createLocalStore } from "./localStore";
import letters from "@/data/letters.json";
import sponsors from "@/data/sponsors.json";
import projects from "@/data/projects.json";

export type WallRole = "artist" | "theo";

export interface WallPost {
  id: string;
  wallId: string; // artist.id 또는 내 아틀리에 id("my_...")
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

// 작가 담벼락(artist_theo_*)은 서버(Vercel Blob)에 저장돼 모든 방문자에게 보인다.
// 내 아틀리에(my_*) 담벼락은 이 브라우저에만 저장한다.
const REMOTE_WALL = /^artist_theo_\d+$/;
export const isRemoteWall = (wallId: string) => REMOTE_WALL.test(wallId);

// 내가 쓴 글의 삭제 토큰 (글 id → 토큰). 이 토큰으로만 내 글을 지울 수 있다.
const tokenStore = createLocalStore<Record<string, string>>("theo_wall_tokens", {});
const REFRESH_EVENT = "theo-wall-refresh";

type NewPost = Omit<WallPost, "id" | "createdAt" | "mine">;

async function postRemote(post: NewPost): Promise<boolean> {
  try {
    const res = await fetch("/api/wall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallId: post.wallId, authorName: post.authorName, text: post.text, image: post.image }),
    });
    const j = await res.json();
    if (!res.ok || !j.ok) return false;
    tokenStore.set({ ...tokenStore.get(), [j.post.id]: j.token });
    window.dispatchEvent(new Event(REFRESH_EVENT));
    return true;
  } catch {
    return false;
  }
}

/** 담벼락에 글 남기기 (작가 담벼락은 서버에, 내 아틀리에는 이 브라우저에 저장). 성공 여부를 돌려준다 */
export async function submitWallPost(post: NewPost): Promise<boolean> {
  return isRemoteWall(post.wallId) ? postRemote(post) : addWallPost(post);
}

export function addWallPost(post: NewPost): boolean {
  // 작가 담벼락은 서버로 보낸다 (선물 완료 메시지 등). 결과를 기다리지 않는다
  if (isRemoteWall(post.wallId)) {
    void postRemote(post);
    return true;
  }
  return store.set([
    ...store.get(),
    { ...post, id: `post_${Date.now()}`, createdAt: new Date().toISOString(), mine: true },
  ]);
}

export function deleteWallPost(id: string, wallId?: string) {
  const token = tokenStore.get()[id];
  if (wallId && isRemoteWall(wallId) && token) {
    fetch("/api/wall", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallId, id, token }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.ok || /이미 없는/.test(j.error ?? "")) {
          const next = { ...tokenStore.get() };
          delete next[id];
          tokenStore.set(next);
        }
        window.dispatchEvent(new Event(REFRESH_EVENT));
      })
      .catch(() => {});
    return;
  }
  store.set(store.get().filter((p) => p.id !== id));
}

/** 담벼락 하나의 글 전체 삭제 (아틀리에 삭제 시) */
export function deleteWallPostsOf(wallId: string) {
  store.set(store.get().filter((p) => p.wallId !== wallId));
}

/** 최신 글이 앞. undefined = 아직 읽기 전 */
export function useWallPosts(wallId: string): WallPost[] | undefined {
  const local = store.useValue();
  const tokens = tokenStore.useValue();
  const remoteWall = isRemoteWall(wallId);
  const [remote, setRemote] = useState<WallPost[] | undefined>(remoteWall ? undefined : []);

  useEffect(() => {
    if (!remoteWall) return;
    let alive = true;
    async function load() {
      try {
        const r = await fetch(`/api/wall?wallId=${encodeURIComponent(wallId)}`, { cache: "no-store" });
        const j = await r.json();
        if (alive && j.ok) setRemote(j.posts as WallPost[]);
        else if (alive) setRemote((prev) => prev ?? []);
      } catch {
        if (alive) setRemote((prev) => prev ?? []);
      }
    }
    load();
    const timer = setInterval(load, 20000);
    window.addEventListener(REFRESH_EVENT, load);
    return () => {
      alive = false;
      clearInterval(timer);
      window.removeEventListener(REFRESH_EVENT, load);
    };
  }, [wallId, remoteWall]);

  return useMemo(() => {
    if (local === undefined || tokens === undefined || remote === undefined) return undefined;
    const mine = (p: WallPost): WallPost => (tokens[p.id] ? { ...p, mine: true } : p);
    const byNewest = (a: WallPost, b: WallPost) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0);
    const seeds = seedPosts(wallId);
    const real = [...remote.map(mine), ...local.filter((p) => p.wallId === wallId)];
    // 방문자가 남긴 글이 위(최신순), 예시 글은 그 아래
    return remoteWall ? [...real.sort(byNewest), ...seeds.sort(byNewest)] : [...seeds, ...real].sort(byNewest);
  }, [local, tokens, remote, wallId, remoteWall]);
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
