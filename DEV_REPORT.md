# Theo 데모 — 개발 보고서

> 작성일: 2026-07-27  
> 저장소: https://github.com/lsm5735/Theo  
> 배포: https://theo-demo.vercel.app

---

## 1. 프로젝트 개요

**Theo(테오)** 는 팬이 작가에게 창작 재료를 선물하고, 작가는 창작 과정을 편지로 답하는 **관계형 현물 후원 플랫폼**의 시연용 데모입니다.

- 랜딩 카피: *"모두의 고흐가 되기 전, 나만의 고흐를 만난다."*
- 실제 결제·로그인·DB 없음 — 모든 데이터는 JSON 파일로 관리
- 목적: 투자자·파트너 대상 제품 시연, MVP 흐름 검증

---

## 2. 기술 스택

| 항목 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) | SSG 정적 생성, 파일 기반 라우팅 |
| 언어 | TypeScript | 타입 안정성 |
| 스타일링 | Tailwind CSS v4 | CSS 변수 기반 토큰 시스템 |
| 데이터 | JSON 파일 (`data/*.json`) | DB 없이 20명 작가 데이터 관리 |
| 폰트 | SUIT (CDN) + Nanum Myeongjo (편지) | 한국형 지오메트릭 산세리프 |
| 이미지 | Unsplash CDN + `next/image` | 플레이스홀더 이미지 최적화 |
| 배포 | Vercel (GitHub 연동 자동 배포) | main 푸시 시 자동 재배포 |

---

## 3. 브랜드 디자인 시스템

### 컬러 팔레트 (v3.0)

| 토큰 | HEX | 용도 |
|---|---|---|
| `navy-800` | `#0D3B66` | Regal Navy — 주 버튼·제목·다크 섹션 |
| `navy-100` | `#EBF0F4` | 섹션 배경 틴트 |
| `sv` | `#F4D35E` | Sunflower Velvet — 배지·별·액센트 |
| `sv-soft` | `#F8D07A` | 로고 배경 고정색 |
| `paper` | `#FDFAF0` | 메인 배경 (Lemon Chiffon) |
| `chiffon` | `#FAF0CA` | 편지지·다크 섹션 텍스트 |
| `gold-text` | `#58450E` | 흰 배경 골드 텍스트 (대비 9.2) |
| `muted` | `#5E7284` | 보조 텍스트 |

### 심벌 시스템

| 심벌 | 역할 |
|---|---|
| 별 | 후원자(테오) — 배지·완성 이벤트 |
| 해바라기 | 작가(고흐) — 배지 LV.02 |
| 밀밭 | 성장 — 배지 LV.03 |
| 소용돌이 | AI 테오봇 |

---

## 4. 페이지 구성

### 라우트 맵

| 라우트 | 설명 | 생성 방식 |
|---|---|---|
| `/` | 랜딩 — 히어로·THE GAP·HOW·프로젝트·배지·클로징 | Static |
| `/atelier` | 작가 탐색 — 20명 카드 그리드 | Static |
| `/atelier/[slug]` | 작가 아틀리에 — 프로필·프로젝트·작품·재료·편지 | SSG × 20 |
| `/sponsor/[artistId]` | 재료 선물 플로우 — 선택·메시지·Mock 결제 | SSG × 20 |
| `/bot` | 테오봇 — 대화형 작가 추천 (4턴 플로우) | Static |
| `/onboarding/artist` | 작가 등록 — 4단계 Mock 폼 | Static |

**총 생성 페이지: 67개**

### 랜딩 페이지 섹션 구성 (§16-3 기반)

1. **NAV** — 브랜드 로고 SVG + About(okrr.art) / Atelier / Community / 이용방법
2. **HERO** — Fraunces italic 타이포 + 골드 붓질 언더라인 + 역할 선택(고흐/테오)
3. **THE GAP** — 문제 제기 (팬의 딜레마 / 작가의 현실)
4. **HOW IT WORKS** — 4단계 좌우 교차 레이아웃 + 미니 UI 패널
5. **진행 중 프로젝트** — artists.json 연동 3개 카드
6. **THEO BOT** — 대화 목업 + 추천 카드
7. **BADGE** — 씨앗·해바라기·밀밭·별밤 4단계
8. **아띠·완성 루프** — 오픈스튜디오 초대
9. **CLOSING CTA** — 다크 그라디언트 + 가입 바
10. **FOOTER** — 4열 다크 푸터

---

## 5. 데이터 구조 (§10 스키마 기반)

소스: `/Users/middun/Theo/theo_personas_mock.json` (artue.io 서울 1990년대생 회화 작가 실측 분포 기반 가상 인물 20명)

### 파일 구성

```
data/
├── artists.json     # 20명 작가 프로필
├── projects.json    # 20개 진행 중 프로젝트
├── artworks.json    # 60점 대표 작품 (작가당 3점)
├── materials.json   # 60개 재료 위시리스트 (프로젝트당 3개)
└── letters.json     # 5통 Dear Theo 편지 (시연용)
```

### 스키마 요약

**artists.json**
```
id · slug · name · oneLiner · genre · media[] · careerStage
location · artistNote · tags[] · palette[] · status
profileImage · coverImage · followers · totalSponsors
```

**projects.json**
```
id · artistId · title · concept · targetAmount · fundedAmount
sponsorCount · isForSale · expectedWeeks · status · sketchImage
```

**artworks.json**
```
id · artistId · title · caption · year · size · medium
isRepresentative · imageUrl
```

**materials.json**
```
id · projectId · artistId · name · price · usageNote · isFunded · compatibleGenres[]
```

### 작가 20명 목록

| # | 이름 | 장르 | 지역 | 경력 |
|---|---|---|---|---|
| 001 | 서윤재 | 회화(유화) · 풍경/물 | 성북구 | 8년 |
| 002 | 문하람 | 회화(아크릴) · 인물 | 마포구 | 7년 |
| 003 | 배주원 | 회화(유화) · 야경 | 영등포구 | 6년 |
| 004 | 노경서 | 회화(혼합) · 추상 | 은평구 | 9년 |
| 005 | 하연우 | 회화(과슈) · 정물 | 서대문구 | 5년 |
| 006 | 임도현 | 회화(유화) · 초상 | 광진구 | 7년 |
| 007 | 진세아 | 회화(유채) · 풍경/산 | 강북구 | 6년 |
| 008 | 곽민유 | 회화(아크릴) · 추상 | 금천구 | 6년 |
| 009 | 오재인 | 회화(유화) · 심상 | 중랑구 | 5년 |
| 010 | 유선하 | 회화(수채·과슈) · 일상 | 관악구 | 4년 |
| 011 | 남기웅 | 회화(유화) · 정물 | 성동구 | 5년 |
| 012 | 최이든 | 회화(유화) · 풍경/숲 | 도봉구 | 4년 |
| 013 | 백서린 | 회화(아크릴) · 군상 | 동작구 | 5년 |
| 014 | 조현빈 | 회화(혼합) · 추상/기하 | 용산구 | 4년 |
| 015 | 한소윤 | 회화(유화) · 자연 | 노원구 | 4년 |
| 016 | 강우람 | 회화(유화) · 도시/밤 | 서초구 | 3년 |
| 017 | 신여진 | 회화(오일파스텔) · 감정 | 강서구 | 3년 |
| 018 | 표지우 | 회화(아크릴) · 추상/빛 | 양천구 | 2년 |
| 019 | 윤채린 | 회화(과슈) · 순간 | 구로구 | 2년 |
| 020 | 방시현 | 회화(유화) · 자화상 | 은평구 | 2년 |

---

## 6. 주요 컴포넌트

| 컴포넌트 | 파일 | 설명 |
|---|---|---|
| Header | `components/Header.tsx` | Sticky GNB — 브랜드 로고 SVG + 내비게이션 |
| ArtistCard | `components/ArtistCard.tsx` | 작가 탐색 카드 (커버 이미지·진행률·태그) |
| LetterCard | `components/LetterCard.tsx` | Dear Theo 편지 카드 (명조 폰트) |
| SponsorClient | `app/sponsor/[artistId]/SponsorClient.tsx` | 재료 선물 플로우 클라이언트 컴포넌트 |

---

## 7. Mock 처리 목록

| 기능 | 처리 방식 |
|---|---|
| 로그인/인증 | UI만 표시 (`href="#"`) |
| 결제 | React state 전환 → 완료 화면 |
| AI 테오봇 | 4턴 정적 플로우 + 칩 클릭 인터랙션 |
| 작가 스튜디오 | 미구현 (링크만) |
| 배송 추적 | 고정 4단계 UI 표시 |

---

## 8. 개발 이력 (커밋 순서)

| 커밋 | 내용 |
|---|---|
| `af7724c` | create-next-app 초기 설정 |
| `39ae8c4` | 브랜드 디자인 시스템 + 기본 3개 화면 구현 |
| `67a7a40` | SUIT 단일 폰트·미니멀 리디자인 |
| `2549376` | 히어로 개편 + 고흐/테오 역할 선택 버튼 |
| `66ab333` | THE GAP 섹션 문구 개편 |
| `5bd726e` | 히어로·배지·아트밴드 구조 개편 |
| `1bb6f68` | theo_landing_v4_3.html → Next.js 완전 이식 |
| `ac7ac46` | 이전 디자인 변경사항 복원 |
| `d809e73` | Vercel 배포용 next.config 정리 |
| `0e5132c` | 모바일 반응형 — 전체 섹션 패딩·폰트 조정 |
| `e1e93c6` | 모바일 편지 카드 가운데 정렬 수정 |
| `72de38b` | About 탭 → okrr.art 외부 링크 연결 |
| `10e57de` | 작가 20명 페르소나 → §10 스키마 JSON 변환 |
| `984183d` | 작가 탐색 페이지(/atelier) + 아틀리에 라우팅 구현 |

---

## 9. 로컬 실행

```bash
cd ~/Theo/theo-demo
npm run dev
```

접속: **http://localhost:3000**

---

## 10. 배포 및 업데이트

```bash
git add -A
git commit -m "변경 내용"
git push
```

`main` 브랜치에 푸시하면 Vercel이 자동으로 재배포합니다.

**배포 주소: https://theo-demo.vercel.app**

---

*이 문서는 시연용 데모의 개발 현황을 기록합니다. 가상 작가 데이터는 artue.io 서울 1990년대생 회화 작가 분포를 참고한 픽션이며, 실존 인물과 무관합니다.*
