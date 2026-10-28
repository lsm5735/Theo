// 작가 등록으로 개설된 "내 아틀리에" — 데모라 DB 없이 이 브라우저의 localStorage에만 저장

import { useMemo, useSyncExternalStore } from "react";

export const MY_ATELIER_KEY = "theo_my_atelier";
export const MATERIAL_SLOTS = 3;

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

const CHANGE_EVENT = "theo-my-atelier-change";

function readRaw(): string | null {
  try {
    return localStorage.getItem(MY_ATELIER_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): MyAtelier | null {
  if (!raw) return null;
  try {
    return { ...emptyAtelier(), ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

export function loadMyAtelier(): MyAtelier | null {
  return parse(readRaw());
}

/** 저장 실패(용량 초과 등) 시 false */
export function saveMyAtelier(atelier: MyAtelier): boolean {
  try {
    localStorage.setItem(MY_ATELIER_KEY, JSON.stringify({ ...atelier, updatedAt: new Date().toISOString() }));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
}

const NOT_LOADED = "__not_loaded__";

/** undefined = 아직 읽기 전(SSR·하이드레이션), null = 아틀리에 없음 */
export function useMyAtelier(): MyAtelier | null | undefined {
  const raw = useSyncExternalStore(subscribe, readRaw, () => NOT_LOADED);
  return useMemo(() => (raw === NOT_LOADED ? undefined : parse(raw)), [raw]);
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
