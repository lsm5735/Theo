// 작가 등록으로 개설된 "내 아틀리에"들 — 데모라 DB 없이 이 브라우저의 localStorage에만 저장
// 한 브라우저에서 여러 개 개설 가능 (작가 여러 명 테스트용)

import { useMemo } from "react";
import { createLocalStore } from "./localStore";
import { deleteWallPostsOf } from "./wall";

export const MATERIAL_SLOTS = 3; // 처음 보여주는 재료 칸 수
export const MAX_MATERIALS = 10;

export const GENRE_OPTIONS = ["회화", "한국화", "드로잉", "판화", "조각", "설치", "사진", "미디어", "공예", "혼합"];
export const MEDIA_OPTIONS = ["유화", "아크릴", "수채", "과슈", "목탄", "연필", "먹", "파스텔", "세라믹", "직물", "혼합매체"];

export interface MyMaterial {
  link: string;
  reason: string;
}

export interface MyProject {
  title: string;
  concept: string;
  targetAmount: number;
  image: string;
}

export interface MyAtelier {
  id: string; // "my_..." — 담벼락 id로도 사용
  name: string;
  contact: string;
  sns: string;
  portfolio: string;
  artistNote: string;
  materials: MyMaterial[];
  oneLiner: string;
  location: string;
  genre: string;
  media: string[];
  profileImage: string;
  coverImage: string;
  project: MyProject | null;
  createdAt: string;
  updatedAt: string;
}

export function emptyAtelier(): MyAtelier {
  const now = new Date().toISOString();
  return {
    id: `my_${Date.now().toString(36)}`,
    name: "",
    contact: "",
    sns: "",
    portfolio: "",
    artistNote: "",
    materials: [],
    oneLiner: "",
    location: "",
    genre: "",
    media: [],
    profileImage: "",
    coverImage: "",
    project: null,
    createdAt: now,
    updatedAt: now,
  };
}

const store = createLocalStore<MyAtelier[]>("theo_my_ateliers", []);

// 예전 단일 아틀리에(theo_my_atelier) → 목록으로 1회 이전. 담벼락 글(wallId "me")도 새 id로 옮김
const LEGACY_KEY = "theo_my_atelier";
const WALL_KEY = "theo_wall_posts";
if (typeof window !== "undefined") {
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const atelier: MyAtelier = { ...emptyAtelier(), ...JSON.parse(legacy) };
      if (!atelier.id) atelier.id = emptyAtelier().id;
      localStorage.setItem("theo_my_ateliers", JSON.stringify([...store.get(), atelier]));
      const posts = JSON.parse(localStorage.getItem(WALL_KEY) || "[]") as { wallId: string }[];
      localStorage.setItem(WALL_KEY, JSON.stringify(posts.map((p) => (p.wallId === "me" ? { ...p, wallId: atelier.id } : p))));
      localStorage.removeItem(LEGACY_KEY);
    }
  } catch {
    // 이전 실패 시 무시 (데모)
  }
}

function normalize(list: MyAtelier[]): MyAtelier[] {
  return list.map((a) => ({ ...emptyAtelier(), ...a }));
}

export function getMyAtelier(id: string): MyAtelier | null {
  return normalize(store.get()).find((a) => a.id === id) ?? null;
}

/** 새 아틀리에 개설 → id 반환 (저장 실패 시 null) */
export function createMyAtelier(atelier: MyAtelier): string | null {
  return store.set([...store.get(), atelier]) ? atelier.id : null;
}

/** 저장 실패(용량 초과 등) 시 false */
export function saveMyAtelier(atelier: MyAtelier): boolean {
  const next = { ...atelier, updatedAt: new Date().toISOString() };
  return store.set(store.get().map((a) => (a.id === atelier.id ? next : a)));
}

/** 아틀리에와 그 담벼락 글 삭제 */
export function deleteMyAtelier(id: string) {
  store.set(store.get().filter((a) => a.id !== id));
  deleteWallPostsOf(id);
}

/** 개설 순서대로. undefined = 아직 읽기 전 */
export function useMyAteliers(): MyAtelier[] | undefined {
  const list = store.useValue();
  return useMemo(() => (list === undefined ? undefined : normalize(list)), [list]);
}

/** undefined = 아직 읽기 전, null = 없음 */
export function useMyAtelier(id: string): MyAtelier | null | undefined {
  const list = useMyAteliers();
  return list === undefined ? undefined : list.find((a) => a.id === id) ?? null;
}

// 스킴이 없으면 https://를 붙여서 검증 — 쇼핑몰 주소를 그대로 붙여넣는 경우가 많음
export function normalizeUrl(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

export function isValidContact(v: string): boolean {
  const s = v.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) || /^[0-9+\-\s()]{9,}$/.test(s);
}

/** "@id"는 인스타그램 프로필로, 그 외는 링크로 취급 */
export function snsHref(sns: string): string | null {
  const s = sns.trim();
  if (!s) return null;
  if (/^@[\w.]+$/.test(s)) return `https://instagram.com/${s.slice(1)}`;
  return normalizeUrl(s);
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** 업로드 이미지를 maxSize 안으로 줄여 JPEG data URL로 — localStorage 용량(약 5MB) 보호 */
export function resizeImage(file: File, maxSize: number, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image load failed"));
    };
    img.src = url;
  });
}
