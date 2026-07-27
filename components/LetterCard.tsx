import Image from "next/image";

interface Letter {
  id: string;
  fromSponsor: string;
  patronOrder: number;
  sponsoredMaterial: string;
  letter: {
    title: string;
    content: string;
    wipImage: string;
    createdAt: string;
  };
}

function IconPackage() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy-600">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>
    </svg>
  );
}

export default function LetterCard({ letter }: { letter: Letter }) {
  const d = new Date(letter.letter.createdAt);
  const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

  return (
    <article
      className="bg-chiffon border border-sv-deep/20 rounded-xl overflow-hidden"
      style={{ boxShadow: '0 8px 22px rgba(23,29,43,.06)' }}
    >
      {/* Letter header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs text-muted mb-1 font-medium tracking-[0.08em] uppercase">
              To. {letter.fromSponsor}님 (#{letter.patronOrder}번 테오)
            </p>
            <h3 className="text-base font-bold text-navy-800 leading-snug">
              {letter.letter.title}
            </h3>
          </div>
          <time className="text-xs text-muted shrink-0 mt-0.5">{dateStr}</time>
        </div>

        {/* Sponsored material tag */}
        <div className="inline-flex items-center gap-2 bg-card border border-sv-deep/30 rounded-lg px-3 py-2 mb-5">
          <IconPackage />
          <span className="text-xs font-semibold text-navy-700">{letter.sponsoredMaterial}</span>
        </div>

        {/* Letter body */}
        <p className="font-myeongjo text-sm text-ink whitespace-pre-line leading-[2.05]">
          {letter.letter.content}
        </p>
      </div>

      {/* WIP image */}
      <div className="relative h-52 mt-2">
        <Image
          src={letter.letter.wipImage}
          alt="작업 중인 모습"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-3 left-4 text-white text-xs font-medium tracking-wide">
          작업 과정 사진
        </p>
      </div>
    </article>
  );
}
