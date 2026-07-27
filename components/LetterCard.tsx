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

export default function LetterCard({ letter }: { letter: Letter }) {
  const d = new Date(letter.letter.createdAt);
  const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

  return (
    <article className="bg-[--chiffon] border border-[--sv-deep]/20 rounded-xl overflow-hidden shadow-card">

      {/* Letter header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs text-[--muted] mb-1 font-medium tracking-wide uppercase">
              To. {letter.fromSponsor}님 (#{letter.patronOrder}번 테오)
            </p>
            <h3 className="text-base font-bold text-[--navy-800] leading-snug">
              {letter.letter.title}
            </h3>
          </div>
          <time className="text-xs text-[--muted] shrink-0 mt-0.5">{dateStr}</time>
        </div>

        {/* Sponsored material tag */}
        <div className="inline-flex items-center gap-2 bg-white border border-[--sv-deep]/30 rounded-lg px-3 py-2 mb-5">
          <span className="text-base leading-none">🎁</span>
          <span className="text-xs font-semibold text-[--navy-700]">{letter.sponsoredMaterial}</span>
        </div>

        {/* Letter body */}
        <p className="font-myeongjo text-sm text-[--ink] whitespace-pre-line leading-[2.05]">
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
