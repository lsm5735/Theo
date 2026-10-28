// 테오(후원자)로서의 내 후원 기록 — 시드 3건 + 데모에서 직접 완료한 후원(localStorage)

import { useMemo } from "react";
import { createLocalStore } from "./localStore";

export interface MySponsorship {
  id: string;
  deliveryStep: number; // 1 후원 완료 · 2 재료 준비 중 · 3 가는 중 · 4 작가가 받았어요
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
    material: "윈저앤뉴튼 아티스트 오일 3색 (프러시안 블루·바이리디언·화이트) 200ml",
    amount: 18000,
    nickname: "테오",
  },
  {
    id: "my_002",
    deliveryStep: 3,
    sponsoredAt: "2026-07-18",
    artistId: "artist_theo_007",
    projectId: "project_artist_theo_007",
    material: "쉔넬리에 유화물감 대용량 4색",
    amount: 32000,
    nickname: "테오",
  },
  {
    id: "my_003",
    deliveryStep: 1,
    sponsoredAt: "2026-07-25",
    artistId: "artist_theo_013",
    projectId: "project_artist_theo_013",
    material: "캔버스 F100호 2점",
    amount: 45000,
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
