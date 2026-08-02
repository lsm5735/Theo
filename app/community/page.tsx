import Header from "@/components/Header";
import Link from "next/link";

export const metadata = {
  title: "Community — Theo",
  description: "테오 작가들의 오픈 스튜디오, 전시, 라이브 페인팅, 드로잉 클래스",
};

type ProgramType = "오픈 스튜디오" | "신작 전시" | "라이브 페인팅" | "드로잉 클래스";

interface Program {
  id: string;
  type: ProgramType;
  artistName: string;
  artistSlug: string;
  artistImage: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number | null;
  coverImage: string;
  tags: string[];
}

const TYPE_STYLE: Record<ProgramType, { bg: string; text: string; dot: string }> = {
  "오픈 스튜디오": { bg: "bg-navy-100", text: "text-navy-700", dot: "#20517E" },
  "신작 전시":     { bg: "bg-[#F4D35E]/20", text: "text-[#58450E]", dot: "#C2A43F" },
  "라이브 페인팅": { bg: "bg-navy-800/10", text: "text-navy-800", dot: "#0D3B66" },
  "드로잉 클래스": { bg: "bg-[#EBF0F4]", text: "text-navy-600", dot: "#376590" },
};

const PROGRAMS: Program[] = [
  {
    id: "prog_001",
    type: "오픈 스튜디오",
    artistName: "서윤재",
    artistSlug: "seo-yunjae",
    artistImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    title: "도시의 물이 흐르는 자리",
    description: "한강과 중랑천 현장 스케치 노트, 린넨 위에 유채를 겹치는 과정을 작업실에서 직접 볼 수 있습니다. 작가와 자유롭게 이야기를 나눌 수 있는 시간입니다.",
    date: "2026. 8. 16 (토)",
    time: "14:00 – 17:00",
    location: "서울 성북구 작업실",
    capacity: 8,
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=500&fit=crop&q=80",
    tags: ["유화", "린넨", "물"],
  },
  {
    id: "prog_002",
    type: "신작 전시",
    artistName: "오재인",
    artistSlug: "oh-jaein",
    artistImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&q=80",
    title: "아름다운 재난 — 신작 7점",
    description: "어두운 밑칠 위에 화려한 색으로 덮어쓴 재난 이미지 신작 7점. 처음엔 아름답고, 조금 뒤엔 당황하게 되는 두 감정 사이를 탐험합니다.",
    date: "2026. 8. 22 – 8. 30",
    time: "화–일 12:00 – 19:00",
    location: "서울 중랑구 갤러리 앙코르",
    capacity: null,
    coverImage: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800&h=500&fit=crop&q=80",
    tags: ["유화", "재난", "화려한 색"],
  },
  {
    id: "prog_003",
    type: "라이브 페인팅",
    artistName: "배주원",
    artistSlug: "bae-juwon",
    artistImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    title: "밤 11시, 간판이 켜지는 순간",
    description: "영등포 골목 야경을 현장에서 한 번에 그립니다. 어두운 바탕 위에 빛을 한 획으로 얹는 임파스토 작업을 실시간으로 지켜보세요.",
    date: "2026. 8. 9 (토)",
    time: "22:30 – 00:00",
    location: "서울 영등포구 편의점 앞 (신청자 공지)",
    capacity: 15,
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop&q=80",
    tags: ["유화", "야경", "임파스토"],
  },
  {
    id: "prog_004",
    type: "드로잉 클래스",
    artistName: "하연우",
    artistSlug: "ha-yeonwoo",
    artistImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    title: "시들기 시작한 것들 — 과슈 드로잉",
    description: "반값으로 내려온 화분을 함께 사러 가고, 그 자리에서 과슈로 그립니다. 마르면서 색이 가라앉는 과슈의 특성을 활용해 시드는 과정을 담는 법을 배웁니다.",
    date: "2026. 8. 23 (일)",
    time: "11:00 – 14:00",
    location: "서울 서대문구 테오 스튜디오",
    capacity: 6,
    coverImage: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=500&fit=crop&q=80",
    tags: ["과슈", "식물", "초보 가능"],
  },
  {
    id: "prog_005",
    type: "오픈 스튜디오",
    artistName: "노경서",
    artistSlug: "noh-gyeongseo",
    artistImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
    title: "중력이 만드는 형태",
    description: "캔버스를 눕히고, 세우고, 기울이며 물감이 스스로 도착한 자리를 화면 구조로 받아들이는 작업 현장. 대리석 가루와 유채를 섞는 방법을 눈으로 확인합니다.",
    date: "2026. 8. 30 (일)",
    time: "15:00 – 18:00",
    location: "서울 은평구 작업실",
    capacity: 10,
    coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=500&fit=crop&q=80",
    tags: ["혼합매체", "추상", "중력"],
  },
  {
    id: "prog_006",
    type: "신작 전시",
    artistName: "진세아",
    artistSlug: "jin-sea",
    artistImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&q=80",
    title: "같은 산, 백 번째 — 북한산 연작전",
    description: "4년간 북한산을 100회 오르며 완성한 능선 연작. 계절보다 습도가, 습도보다 그날의 공기가 산의 색을 바꾼다는 것을 20점의 유화로 보여줍니다.",
    date: "2026. 8. 8 – 8. 17",
    time: "목–일 13:00 – 19:00",
    location: "서울 강북구 산 아래 갤러리",
    capacity: null,
    coverImage: "/artist-jinsea.jpeg",
    tags: ["유화", "나이프", "풍경"],
  },
  {
    id: "prog_007",
    type: "라이브 페인팅",
    artistName: "임도현",
    artistSlug: "im-dohyeon",
    artistImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80",
    title: "두 시간, 당신의 초상",
    description: "같은 사람을 같은 자리에서 두 시간 안에 그립니다. 관람자 중 1인을 모델로 선정해 린넨 위에 얇게 초상을 완성하는 과정 전체를 공개합니다.",
    date: "2026. 8. 14 (금)",
    time: "19:30 – 21:30",
    location: "서울 광진구 카페 레이어드",
    capacity: 20,
    coverImage: "https://images.unsplash.com/photo-1579783483458-83d02161294e?w=800&h=500&fit=crop&q=80",
    tags: ["유화", "초상", "린넨"],
  },
  {
    id: "prog_008",
    type: "드로잉 클래스",
    artistName: "유선하",
    artistSlug: "yoo-seonha",
    artistImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&q=80",
    title: "설거지하다 멈춘 3초 — 일상 수채",
    description: "기억에 남지 않는 하루 중 가장 사소한 순간을 A4 크기 수채로 그립니다. 수채의 큰 덩어리와 과슈의 불투명함을 함께 쓰는 법, 초보도 가능합니다.",
    date: "2026. 8. 17 (월)",
    time: "19:00 – 21:30",
    location: "서울 관악구 테오 스튜디오",
    capacity: 8,
    coverImage: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=500&fit=crop&q=80",
    tags: ["수채", "과슈", "일상", "초보 가능"],
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* Hero */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pt-14 pb-10">
        <p className="text-[11px] tracking-[0.24em] text-navy-400 font-semibold uppercase mb-3">
          COMMUNITY
        </p>
        <h1 className="text-3xl md:text-[40px] font-bold text-navy-900 leading-tight">
          작가와 직접 만나는 시간
        </h1>
        <p className="text-muted text-sm md:text-base mt-3 leading-relaxed max-w-[560px]">
          오픈 스튜디오, 신작 전시, 라이브 페인팅, 드로잉 클래스.
          <br className="hidden md:block" />
          후원 너머 작가의 창작 현장에 함께할 수 있는 프로그램입니다.
        </p>

        {/* 타입 필터 (장식용) */}
        <div className="flex flex-wrap gap-2 mt-6">
          {(["오픈 스튜디오", "신작 전시", "라이브 페인팅", "드로잉 클래스"] as ProgramType[]).map((type) => {
            const s = TYPE_STYLE[type];
            return (
              <span
                key={type}
                className={`inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full ${s.bg} ${s.text}`}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
                {type}
              </span>
            );
          })}
        </div>
      </section>

      {/* 카드 그리드 */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((prog) => {
            const s = TYPE_STYLE[prog.type];
            return (
              <article
                key={prog.id}
                className="bg-card border border-line rounded-2xl overflow-hidden flex flex-col"
                style={{ boxShadow: "0 8px 22px rgba(23,29,43,.06)" }}
              >
                {/* 커버 이미지 */}
                <div className="relative w-full h-44 shrink-0">
                  <img
                    src={prog.coverImage}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* 타입 뱃지 */}
                  <span
                    className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10.5px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
                    {prog.type}
                  </span>
                  {/* 정원 */}
                  {prog.capacity !== null && (
                    <span className="absolute top-3 right-3 text-[10.5px] font-semibold bg-black/40 text-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      정원 {prog.capacity}명
                    </span>
                  )}
                </div>

                {/* 내용 */}
                <div className="p-5 flex flex-col flex-1">
                  {/* 작가 */}
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <img
                      src={prog.artistImage}
                      alt={prog.artistName}
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-line"
                    />
                    <span className="text-[12px] text-navy-500 font-semibold">{prog.artistName} 작가</span>
                  </div>

                  {/* 제목 */}
                  <h2 className="text-[16px] font-bold text-navy-900 leading-snug mb-2">
                    {prog.title}
                  </h2>

                  {/* 설명 */}
                  <p className="text-[13px] text-muted leading-[1.85] mb-4 flex-1">
                    {prog.description}
                  </p>

                  {/* 일정·장소 */}
                  <div className="bg-navy-100 rounded-xl px-4 py-3 mb-4 space-y-1.5">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[10px] font-bold tracking-[0.12em] text-navy-400 uppercase w-8 shrink-0 pt-0.5">날짜</span>
                      <span className="text-[12.5px] text-navy-800 font-medium">{prog.date}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-[10px] font-bold tracking-[0.12em] text-navy-400 uppercase w-8 shrink-0 pt-0.5">시간</span>
                      <span className="text-[12.5px] text-navy-800 font-medium">{prog.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-[10px] font-bold tracking-[0.12em] text-navy-400 uppercase w-8 shrink-0 pt-0.5">장소</span>
                      <span className="text-[12.5px] text-navy-800 font-medium">{prog.location}</span>
                    </div>
                  </div>

                  {/* 태그 + CTA */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {prog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10.5px] text-navy-500 bg-navy-100 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/atelier/${prog.artistSlug}/apply`}
                      className="shrink-0 text-[11.5px] font-bold bg-navy-800 text-chiffon px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors whitespace-nowrap"
                    >
                      신청하기
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center">
          <p className="text-[12px] text-navy-400 leading-relaxed">
            프로그램 신청 및 문의는 각 작가 아틀리에 페이지에서 가능합니다.
            <br />
            후원자(테오)만 신청할 수 있는 프로그램이 있을 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
