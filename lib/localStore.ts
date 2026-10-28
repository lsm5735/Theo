// localStorage에 JSON 하나를 저장하고, 같은 탭·다른 탭 변경을 구독하는 작은 스토어
// (데모라 DB 대신 사용 — Supabase 연결 시 이 계층만 교체)

import { useMemo, useSyncExternalStore } from "react";

const NOT_LOADED = "__not_loaded__";

export function createLocalStore<T>(key: string, fallback: T) {
  const event = `theo-store:${key}`;

  function readRaw(): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function parse(raw: string | null): T {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  function subscribe(cb: () => void) {
    const onStorage = (e: StorageEvent) => e.key === key && cb();
    window.addEventListener("storage", onStorage);
    window.addEventListener(event, cb);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(event, cb);
    };
  }

  return {
    get(): T {
      return parse(readRaw());
    },
    /** 저장 실패(용량 초과 등) 시 false */
    set(value: T): boolean {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event(event));
        return true;
      } catch {
        return false;
      }
    },
    /** undefined = 아직 읽기 전(SSR·하이드레이션) */
    useValue(): T | undefined {
      const raw = useSyncExternalStore(subscribe, readRaw, () => NOT_LOADED);
      return useMemo(() => (raw === NOT_LOADED ? undefined : parse(raw)), [raw]);
    },
  };
}
