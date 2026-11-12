// 테오(선물하는 분)로서의 내 선물 기록 — 시드 3건 + 데모에서 직접 완료한 선물(localStorage)

import { useMemo } from "react";
import { createLocalStore } from "./localStore";

export interface MySponsorship {
  id: string;
  deliveryStep: number; // 1 선물 완료 · 2 재료 준비 중 · 3 가는 중 · 4 작가가 받았어요
  sponsoredAt: string;
  artistId: string;
  projectId: string;
  material: string;
  amount: number;
  nickname: string;
}

export const SEED_SPONSORSHIPS: MySponsorship[] = [
  {
    id: "my_001",
    deliveryStep: 4,
    sponsoredAt: "2026-07-10",
    artistId: "artist_theo_001",
    projectId: "project_artist_theo_001",
    material: "[입력 예시] 캔버스 F30호 1점",
    amount: 45000,
    nickname: "테오",
  },
  {
    id: "my_002",
    deliveryStep: 3,
    sponsoredAt: "2026-07-18",
    artistId: "artist_theo_002",
    projectId: "project_artist_theo_002",
    material: "[입력 예시] 메인 물감 3색 세트",
    amount: 32000,
    nickname: "테오",
  },
  {
    id: "my_003",
    deliveryStep: 1,
    sponsoredAt: "2026-07-25",
    artistId: "artist_theo_003",
    projectId: "project_artist_theo_003",
    material: "[입력 예시] 붓 3종 세트",
    amount: 18000,
    nickname: "테오",
  },
];

const store = createLocalStore<MySponsorship[]>("theo_my_sponsorships", []);

export function recordSponsorship(s: Omit<MySponsorship, "id" | "deliveryStep" | "sponsoredAt">) {
  store.set([
    ...store.get(),
    { ...s, id: `my_${Date.now()}`, deliveryStep: 1, sponsoredAt: new Date().toISOString().slice(0, 10) },
  ]);
}

/** 최신순. undefined = 아직 읽기 전 */
export function useMySponsorships(): MySponsorship[] | undefined {
  const local = store.useValue();
  return useMemo(() => (local === undefined ? undefined : [...local].reverse().concat(SEED_SPONSORSHIPS)), [local]);
}
