// 테오 봇 — 자주 묻는 질문. 답변은 사이트 안내 문구(랜딩·이용방법)에서 가져왔습니다.
// 내용을 바꾸려면 이 파일의 answer 만 고치면 됩니다.

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  /** 글로 질문했을 때 찾기 위한 키워드 */
  keywords: string[];
  /** 답변 아래에 붙는 이동 링크 */
  link?: { label: string; href: string };
}

export const CATEGORIES = ["서비스 소개", "선물하기", "작가로 참여", "배송·환불", "전시·커뮤니티"] as const;

export const FAQS: Faq[] = [
  // ── 서비스 소개
  {
    id: "what",
    category: "서비스 소개",
    question: "테오는 어떤 서비스예요?",
    answer:
      "테오는 꽃다발 대신 물감을 선물하는 서비스예요. 팬이 작가에게 창작에 필요한 재료를 선물하고, 작가는 아틀리에 담벼락에 작업 과정을 나눕니다. 그 물감이 작품이 되는 과정을 함께 지켜볼 수 있어요.",
    keywords: ["테오", "서비스", "뭐", "소개", "플랫폼", "무엇"],
    link: { label: "서비스 소개 보기", href: "/#how" },
  },
  {
    id: "wall",
    category: "서비스 소개",
    question: "작가 소식은 어디서 볼 수 있나요?",
    answer:
      "작가 아틀리에의 담벼락에서 볼 수 있어요. 선물이 작업실에 도착하면 도착 인증 사진이 올라오고, 작품이 만들어지는 과정과 완성된 작품의 사진도 확인할 수 있어요. 선물한 테오도 응원 메시지를 남길 수 있어요.",
    keywords: ["담벼락", "소식", "작가", "과정", "사진", "인증", "응원"],
    link: { label: "아틀리에 보러 가기", href: "/atelier" },
  },
  {
    id: "benefit",
    category: "서비스 소개",
    question: "선물하면 어떤 혜택이 있나요?",
    answer:
      "작품이 완성되면 선물이 와요. 작품으로 만들어지는 굿즈, 전시회 초대권, 커뮤니티 입장권, 작품 선구매권이 있고, 더 많은 혜택이 열릴 예정이에요. 선물한 작품이 팔려도 수익을 나누지는 않아요. 대신 선구매 우선권과 작품 캡션 기재, 전시 초대 같은 혜택이 주어져요.",
    keywords: ["혜택", "굿즈", "초대권", "입장권", "선구매", "수익", "배분", "보상", "받"],
  },

  // ── 선물하기
  {
    id: "how-gift",
    category: "선물하기",
    question: "어떻게 선물하나요?",
    answer:
      "작가 아틀리에에서 마음에 드는 재료를 골라 선물하면 돼요. QR이나 온라인 링크로도 쉽게 선물할 수 있어요. 재료를 고르고 결제하면, 선물은 작가님의 작업실로 안전하게 배송해 드려요.",
    keywords: ["선물", "방법", "어떻게", "결제", "구매", "QR", "링크", "하는"],
    link: { label: "작가 보러 가기", href: "/atelier" },
  },
  {
    id: "unit",
    category: "선물하기",
    question: "선물은 어떤 단위로 하나요?",
    answer: "재료 하나 단위로 선물할 수 있어요. 작가마다 필요한 재료가 달라서 금액도 다를 수 있어요.",
    keywords: ["단위", "금액", "가격", "얼마", "재료"],
  },
  {
    id: "no-artist",
    category: "선물하기",
    question: "응원하고 싶은 작가가 테오에 없어요",
    answer: "테오에게 작가님 초대를 요청해 주세요. 문의를 남겨 주시면 확인하고 연락드릴게요.",
    keywords: ["없", "초대", "요청", "다른 작가", "추천"],
  },

  // ── 작가로 참여
  {
    id: "artist-join",
    category: "작가로 참여",
    question: "작가로 참여하려면 어떻게 해야 해요?",
    answer:
      "새로 시작하려는 작품의 구상과 필요한 재료 목록을 올려 프로젝트를 등록하면 돼요. 아틀리에가 열리고, 그 과정을 담벼락에 나눌 수 있어요.",
    keywords: ["작가", "참여", "등록", "프로젝트", "아틀리에", "개설", "신청", "입점"],
    link: { label: "작가로 시작하기", href: "/onboarding/artist" },
  },
  {
    id: "artist-material",
    category: "작가로 참여",
    question: "재료는 직접 구매할 수 없나요?",
    answer:
      "현재는 테오 제휴 화방을 통해서만 구성돼요. 특정 브랜드나 규격이 필요하다면 프로젝트 등록 시 재료 설명에 적어 주세요.",
    keywords: ["직접", "화방", "브랜드", "규격", "재료", "구매"],
  },
  {
    id: "artist-multi",
    category: "작가로 참여",
    question: "프로젝트를 여러 개 동시에 운영할 수 있나요?",
    answer:
      "베타 단계에서는 작가당 동시에 진행하는 프로젝트 1개를 권장해요. 완성한 뒤 새 프로젝트를 시작하는 방식으로 운영해 주세요.",
    keywords: ["여러", "동시", "프로젝트", "개수", "몇 개"],
  },

  // ── 배송·환불
  {
    id: "address",
    category: "배송·환불",
    question: "작가 주소가 공개되나요?",
    answer:
      "공개되지 않아요. 테오가 안전하게 중개하기 때문에 작가와 선물하는 분 모두 서로의 주소를 알 수 없어요.",
    keywords: ["주소", "공개", "개인정보", "배송지", "안전"],
  },
  {
    id: "delivery",
    category: "배송·환불",
    question: "선물은 어떻게 배송되나요?",
    answer:
      "선물은 작가님의 작업실로 배송돼요. 배송 상태는 선물 후 단계별로 확인할 수 있어요. 선물 완료, 재료 준비 중, 작가에게 가는 중, 작가가 받았어요 순서로 진행돼요.",
    keywords: ["배송", "도착", "언제", "택배", "상태", "단계"],
  },
  {
    id: "refund",
    category: "배송·환불",
    question: "환불이 가능한가요?",
    answer:
      "재료가 발송되기 전이라면 환불을 요청할 수 있어요. 발송 후에는 취소가 어려워요. 이 경우에는 문의를 남겨 주세요.",
    keywords: ["환불", "취소", "반품", "교환"],
  },

  // ── 전시·커뮤니티
  {
    id: "show",
    category: "전시·커뮤니티",
    question: "팝업 전시 [CONTINUE]는 언제, 어디서 열려요?",
    answer: "2026년 11월 28일(토)부터 29일(일)까지, 서울 종로구 창덕궁길 83-1에서 열려요.",
    keywords: ["전시", "팝업", "continue", "컨티뉴", "언제", "어디", "장소", "날짜"],
    link: { label: "전시 보기", href: "/show" },
  },
  {
    id: "program",
    category: "전시·커뮤니티",
    question: "함께할 수 있는 프로그램이 있나요?",
    answer:
      "11월 28일(토)에 오픈 스튜디오(진형 작가), 라이브 페인팅(이동구 작가), Theo 아트 나이트가 열려요. 장소는 모두 서울 종로구 창덕궁길 83-1이에요. 신청은 커뮤니티 페이지에서 할 수 있어요.",
    keywords: ["프로그램", "오픈 스튜디오", "라이브", "페인팅", "아트 나이트", "커뮤니티", "행사", "신청"],
    link: { label: "프로그램 보기", href: "/community" },
  },
];

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

/** 글로 입력한 질문에서 가장 비슷한 FAQ를 찾는다. 점수가 낮으면 null. */
export function findFaq(input: string): Faq | null {
  const text = norm(input);
  if (!text) return null;
  let best: { faq: Faq; score: number } | null = null;
  for (const faq of FAQS) {
    let score = 0;
    for (const k of faq.keywords) if (text.includes(norm(k))) score += k.length >= 2 ? 2 : 1;
    // 질문 문장과 겹치는 글자 조각(2글자)이 많으면 가산
    const q = norm(faq.question);
    for (let i = 0; i < text.length - 1; i++) if (q.includes(text.slice(i, i + 2))) score += 0.15;
    if (!best || score > best.score) best = { faq, score };
  }
  return best && best.score >= 1.5 ? best.faq : null;
}
