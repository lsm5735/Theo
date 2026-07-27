# Theo (테오) — 시연용 데모

> 팬이 작가에게 창작 재료를 선물하고, 작가는 창작 과정을 편지로 답하는 관계형 현물 후원 플랫폼.

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인

## 화면 구성

- `/` — 홈 (히어로 · 작가 목록 · 배지)
- `/artists/[id]` — 작가 아틀리에
- `/sponsor/[artistId]` — 재료 선물 플로우 (목업)

## 기술 스택

Next.js 16 · TypeScript · Tailwind CSS · JSON 파일 기반 목업 데이터
