import Link from "next/link";
import Header from "@/components/Header";

const steps = [
  { n: "01", label: "프로필", desc: "이름·장르·활동 지역" },
  { n: "02", label: "작가노트", desc: "나의 세계관을 자유롭게" },
  { n: "03", label: "첫 프로젝트", desc: "진행 중 작품 + 재료 위시리스트" },
  { n: "04", label: "정산 정보", desc: "배송지 비공개 처리" },
];

export default function ArtistOnboarding() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <div className="max-w-[560px] mx-auto px-5 md:px-8 pt-20 pb-24">

        {/* Back */}
        <Link
          href="/"
          className="text-sm text-navy-400 hover:text-navy-700 transition-colors mb-12 inline-block"
        >
          ← 홈으로
        </Link>

        {/* Heading */}
        <p className="text-xs font-semibold tracking-[0.22em] text-navy-400 uppercase mb-4">작가 등록</p>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 leading-[1.2] mb-4">
          나만의 아틀리에를<br />열어보세요.
        </h1>
        <p className="text-[15px] text-muted leading-[1.85] mb-14">
          작가 수수료는 <strong className="text-navy-800">0%</strong>입니다.
          재료를 선물받고, 창작에만 집중하세요.
          테오가 나머지를 처리합니다.
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-14">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="flex items-center gap-5 bg-card border border-line rounded-xl px-6 py-5"
              style={{ boxShadow: '0 4px 14px rgba(13,59,102,.05)' }}
            >
              <span className="w-9 h-9 rounded-full border-2 border-navy-200 flex items-center justify-center text-xs font-bold text-navy-600 shrink-0">
                {s.n}
              </span>
              <div>
                <p className="font-semibold text-navy-800 text-[14px]">{s.label}</p>
                <p className="text-xs text-muted mt-0.5">{s.desc}</p>
              </div>
              {i === 0 && (
                <span className="ml-auto text-[10px] font-bold text-sv bg-navy-800 px-2.5 py-1 rounded-full">
                  여기서 시작
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mock form — Step 1 */}
        <div className="bg-card border border-line rounded-2xl p-7" style={{ boxShadow: '0 8px 22px rgba(13,59,102,.06)' }}>
          <p className="text-xs font-semibold tracking-[0.2em] text-navy-400 uppercase mb-5">01 · 기본 프로필</p>

          <div className="space-y-4">
            {[
              { label: "이름 (활동명)", placeholder: "예: 윤도희" },
              { label: "활동 장르", placeholder: "예: 유화, 수채화, 드로잉" },
              { label: "활동 지역", placeholder: "예: 서울 마포구" },
              { label: "한 줄 소개 (40자 이내)", placeholder: "예: 도시의 밤을 쌓는 사람" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="w-full border border-navy-200 rounded-lg px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 bg-paper outline-none focus:border-navy-500 transition-colors"
                  readOnly
                />
              </div>
            ))}
          </div>

          <button className="w-full mt-7 bg-navy-800 text-chiffon font-bold py-3.5 rounded-xl hover:bg-navy-700 transition-colors text-[14px]">
            다음 단계로
          </button>

          <p className="text-center text-xs text-navy-400 mt-4">
            * 이 화면은 시연용 데모입니다.
          </p>
        </div>

      </div>
    </div>
  );
}
