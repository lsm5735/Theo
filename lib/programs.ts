// 프로그램 신청 페이지(/community/<slug>/apply)에 쓰는 정보.
// 카드 내용(설명·사진 등)은 app/community/page.tsx 에 있고, 여기엔 신청에 필요한 것만 둔다.

export interface ApplyProgram {
  slug: string;
  title: string;
  /** 이름 위에 작게 보이는 프로그램 종류 */
  label: string;
  date: string;
  location: string;
  intro: string;
  /** 회차를 고르게 할 때만. 없으면 time 하나로 고정 */
  sessions?: string[];
  time?: string;
}

const DATE = "2026. 11. 28 (토)";
const LOCATION = "서울 종로구 창덕궁길 83-1";

export const APPLY_PROGRAMS: ApplyProgram[] = [
  {
    slug: "open-studio",
    title: "진형 작가 오픈 스튜디오",
    label: "오픈 스튜디오",
    date: DATE,
    location: LOCATION,
    time: "2:00 - 3:30 pm",
    intro: "작가의 작업실에 놀러 온 것처럼, 그리는 모습을 어깨너머로 지켜보는 시간이에요.",
  },
  {
    slug: "live-painting",
    title: "이동구 작가 라이브 페인팅",
    label: "라이브 페인팅",
    date: DATE,
    location: LOCATION,
    time: "4:00 - 5:30 pm",
    intro: "선물한 재료로 채워지는 캔버스를 눈앞에서 라이브로 만나는 시간이에요.",
  },
  {
    slug: "art-night",
    title: "Theo 아트 나이트",
    label: "Theo 아트 나이트",
    date: DATE,
    location: LOCATION,
    sessions: ["1회차 6:00 - 7:00 pm", "2회차 7:00 - 8:00 pm"],
    intro: "웰컴드링크(맥주)를 마시며 작가와 가까이에서 이야기 나누는 저녁이에요.",
  },
];

/** 선물한 작가를 고르는 선택지 (순서 고정) */
export const GIFT_ARTISTS = ["김동형", "이동구", "전예진", "진형"];

/** 신청 동기 선택지 — 작가 선물 신청서와 프로그램 신청서가 같이 쓴다 */
export const MOTIVATION_OPTIONS = [
  "평소에 이 작가의 작업이 좋았어요",
  "취향에 맞는 그림 스타일이에요",
  "창작 과정이 궁금해서요",
  "담벼락에서 작업 소식을 보고 싶어요",
  "테오 서비스를 응원하고 싶어요",
];
