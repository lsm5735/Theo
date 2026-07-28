import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import letters from "@/data/letters.json";
import artists from "@/data/artists.json";

/* ─── Stamp SVG ─────────────────────────────────────────────────────── */
function StampSvg() {
  const W = 72, H = 92;
  const r = 4.5, gap = 12;

  const holes: { cx: number; cy: number }[] = [];
  for (let x = gap / 2; x <= W - gap / 2; x += gap) {
    holes.push({ cx: x, cy: 0 });
    holes.push({ cx: x, cy: H });
  }
  for (let y = gap / 2; y <= H - gap / 2; y += gap) {
    holes.push({ cx: 0, cy: y });
    holes.push({ cx: W, cy: y });
  }

  /* 5-pointed star centered at (36, 36) */
  const starPoints = (() => {
    const cx = 36, cy = 35, OR = 13, IR = 5.5;
    return Array.from({ length: 10 })
      .map((_, i) => {
        const angle = ((i * 36 - 90) * Math.PI) / 180;
        const rr = i % 2 === 0 ? OR : IR;
        return `${(cx + rr * Math.cos(angle)).toFixed(2)},${(cy + rr * Math.sin(angle)).toFixed(2)}`;
      })
      .join(" ");
  })();

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ filter: "drop-shadow(0 2px 6px rgba(23,29,43,.18))" }}
    >
      <defs>
        <mask id="stamp-perf">
          <rect width={W} height={H} fill="white" />
          {holes.map((h, i) => (
            <circle key={i} cx={h.cx} cy={h.cy} r={r} fill="black" />
          ))}
        </mask>
      </defs>

      {/* Paper base */}
      <rect width={W} height={H} fill="#FEF9EE" mask="url(#stamp-perf)" />

      {/* Image area — navy */}
      <rect x={7} y={7} width={58} height={58} fill="#0D3B66" />

      {/* Thin inner border for image area */}
      <rect x={9} y={9} width={54} height={54} fill="none" stroke="#F4D35E" strokeWidth="0.8" opacity="0.5" />

      {/* Star */}
      <polygon points={starPoints} fill="#F4D35E" />

      {/* Horizontal rule */}
      <line x1={7} y1={65} x2={65} y2={65} stroke="#C2A43F" strokeWidth="0.6" opacity="0.5" />

      {/* THEO */}
      <text
        x={36}
        y={76}
        textAnchor="middle"
        fontSize={9.5}
        fontWeight="800"
        fill="#0D3B66"
        fontFamily="Jost, Futura, sans-serif"
        letterSpacing="2"
      >
        THEO
      </text>

      {/* 한국 */}
      <text
        x={36}
        y={85.5}
        textAnchor="middle"
        fontSize={6}
        fill="#5E7284"
        fontFamily="SUIT, sans-serif"
        letterSpacing="0.5"
      >
        한국 · KOREA
      </text>
    </svg>
  );
}

/* ─── Postmark SVG ───────────────────────────────────────────────────── */
function PostmarkSvg({ date }: { date: string }) {
  const [y, m, d] = date.split("-");
  const dateStr = `${y}.${m}.${d}`;
  return (
    <svg width={88} height={88} viewBox="0 0 88 88" opacity={0.42}>
      <circle cx={44} cy={44} r={41} fill="none" stroke="#376590" strokeWidth={2} />
      <circle cx={44} cy={44} r={34} fill="none" stroke="#376590" strokeWidth={1} />

      {/* Cancellation bars */}
      <line x1={10} y1={38} x2={78} y2={38} stroke="#376590" strokeWidth={1.8} />
      <line x1={10} y1={44} x2={78} y2={44} stroke="#376590" strokeWidth={1.8} />
      <line x1={10} y1={50} x2={78} y2={50} stroke="#376590" strokeWidth={1.8} />

      {/* Top label */}
      <text
        x={44}
        y={26}
        textAnchor="middle"
        fontSize={7.5}
        fontWeight="800"
        fill="#376590"
        fontFamily="Jost, Futura, sans-serif"
        letterSpacing="2"
      >
        THEO POST
      </text>

      {/* Date */}
      <text
        x={44}
        y={64}
        textAnchor="middle"
        fontSize={7}
        fill="#376590"
        fontFamily="monospace"
        letterSpacing="1"
      >
        {dateStr}
      </text>

      {/* Bottom label */}
      <text
        x={44}
        y={75}
        textAnchor="middle"
        fontSize={6}
        fill="#376590"
        fontFamily="SUIT, sans-serif"
        letterSpacing="0.5"
      >
        서울 · SEOUL
      </text>
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
interface Props {
  params: Promise<{ id: string }>;
}

export default async function LetterDetailPage({ params }: Props) {
  const { id } = await params;
  const letter = letters.find((l) => l.id === id);
  if (!letter) notFound();

  const artist = artists.find((a) => a.id === letter.artistId)!;

  /* ── Parse paragraphs ──────────────────────────────────── */
  const allParas = letter.letter.content.split("\n\n").filter((p) => p.trim());

  /* Signature = last paragraph starting with "Dear Theo," */
  let sigIdx = -1;
  for (let i = allParas.length - 1; i >= 0; i--) {
    if (allParas[i].startsWith("Dear Theo,")) {
      sigIdx = i;
      break;
    }
  }
  const signature = sigIdx >= 0 ? allParas[sigIdx] : "";
  const contentParas = allParas.filter((_, i) => i !== sigIdx);

  /* Greeting = first paragraph (e.g. "지수님,") */
  const greeting = contentParas[0] ?? "";
  const bodyParas = contentParas.slice(1);

  /* Split body at ~midpoint for WIP image insertion */
  const split = Math.max(1, Math.ceil(bodyParas.length / 2));
  const beforeImg = bodyParas.slice(0, split);
  const afterImg = bodyParas.slice(split);

  /* Date */
  const d = new Date(letter.letter.createdAt);
  const dateStr = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

  /* Prev / next navigation */
  const sorted = [...letters].sort((a, b) =>
    b.letter.createdAt.localeCompare(a.letter.createdAt)
  );
  const idx = sorted.findIndex((l) => l.id === id);
  const prevLetter = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const nextLetter = idx > 0 ? sorted[idx - 1] : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Header />

      <main className="max-w-[640px] mx-auto px-4 md:px-8 py-10 pb-20">
        {/* Back nav */}
        <Link
          href="/my/letters"
          className="text-xs text-muted hover:text-navy-700 transition-colors mb-8 inline-block"
        >
          ← 편지함으로
        </Link>

        {/* ── Letter paper ─────────────────────────────────── */}
        <article
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#FFFEF8",
            boxShadow:
              "0 2px 4px rgba(23,29,43,.04), 0 12px 40px rgba(23,29,43,.10), 0 1px 0 rgba(23,29,43,.04)",
          }}
        >
          {/* ── Stamp area ─────────────────────────────────── */}
          <div className="px-7 pt-7 pb-5 flex items-start justify-between gap-4">
            {/* Return address */}
            <div className="pt-1">
              <p
                className="text-[9.5px] font-bold tracking-[0.18em] uppercase mb-1.5"
                style={{ color: "var(--muted)" }}
              >
                FROM.
              </p>
              <p
                className="font-myeongjo font-bold text-[14px] leading-snug"
                style={{ color: "var(--navy-800)" }}
              >
                {artist.name} 작가
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                {artist.location} · 아틀리에
              </p>
            </div>

            {/* Stamp + postmark (overlapping) */}
            <div className="relative w-[110px] h-[96px] shrink-0">
              <div className="absolute right-0 top-0 z-10">
                <StampSvg />
              </div>
              <div
                className="absolute z-20"
                style={{
                  right: "2px",
                  top: "6px",
                  transform: "rotate(-22deg)",
                  transformOrigin: "center center",
                }}
              >
                <PostmarkSvg date={letter.letter.createdAt} />
              </div>
            </div>
          </div>

          {/* ── Perforation divider ────────────────────────── */}
          <div className="px-7 mb-7">
            <div
              className="w-full h-px"
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--navy-300) 0px, var(--navy-300) 5px, transparent 5px, transparent 9px)",
              }}
            />
          </div>

          {/* ── Letter header ──────────────────────────────── */}
          <div className="px-7 mb-6">
            <p
              className="font-myeongjo text-[11px] mb-1.5 tracking-wide"
              style={{ color: "var(--muted)" }}
            >
              To.
            </p>
            <p
              className="font-myeongjo text-[15px] font-bold"
              style={{ color: "var(--navy-800)" }}
            >
              {letter.fromSponsor}님
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
              #{letter.patronOrder}번 테오
            </p>
          </div>

          {/* ── Title & date ───────────────────────────────── */}
          <div className="px-7 mb-6">
            <h1
              className="font-myeongjo text-[15px] leading-relaxed mb-2"
              style={{ color: "var(--navy-700)" }}
            >
              {letter.letter.title}
            </h1>
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{ background: "var(--line)" }}
              />
              <time
                className="font-myeongjo text-[11px] shrink-0"
                style={{ color: "var(--muted)" }}
              >
                {dateStr}
              </time>
            </div>
          </div>

          {/* ── Greeting ───────────────────────────────────── */}
          <div className="px-7 mb-5">
            <p
              className="font-myeongjo text-[16px] leading-loose"
              style={{ color: "var(--ink)" }}
            >
              {greeting}
            </p>
          </div>

          {/* ── Body: before image ─────────────────────────── */}
          <div className="px-7 space-y-5 mb-8">
            {beforeImg.map((para, i) => (
              <p
                key={i}
                className="font-myeongjo text-[15.5px] break-keep whitespace-pre-line"
                style={{ color: "var(--ink)", lineHeight: "2.1" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* ── WIP image ──────────────────────────────────── */}
          <div className="px-4 mb-8">
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                aspectRatio: "16/9",
                boxShadow: "0 3px 16px rgba(23,29,43,.14)",
              }}
            >
              <Image
                src={letter.letter.wipImage}
                alt={`${artist.name} 작업 중인 모습`}
                fill
                sizes="(max-width: 640px) calc(100vw - 2rem), 608px"
                className="object-cover"
              />
              {/* Subtle vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(23,29,43,.25))",
                }}
              />
            </div>
            <p
              className="font-myeongjo text-[11.5px] text-center mt-2.5 italic"
              style={{ color: "var(--muted)" }}
            >
              — 작업 중인 모습
            </p>
          </div>

          {/* ── Body: after image ──────────────────────────── */}
          {afterImg.length > 0 && (
            <div className="px-7 space-y-5 mb-8">
              {afterImg.map((para, i) => (
                <p
                  key={i}
                  className="font-myeongjo text-[15.5px] break-keep whitespace-pre-line"
                  style={{ color: "var(--ink)", lineHeight: "2.1" }}
                >
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* ── Signature ──────────────────────────────────── */}
          {signature && (
            <div className="px-7 mb-8">
              <div
                className="mb-5 h-px"
                style={{ background: "var(--line)" }}
              />
              <p
                className="font-myeongjo text-[14.5px] whitespace-pre-line leading-loose"
                style={{ color: "var(--navy-700)" }}
              >
                {signature}
              </p>
            </div>
          )}

          {/* ── Footer ─────────────────────────────────────── */}
          <div
            className="px-7 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
            style={{
              borderTop: "1px solid var(--line)",
              background: "rgba(235,240,244,0.3)",
            }}
          >
            {/* Material chip */}
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <span
                className="shrink-0 text-[10px] font-bold tracking-wider uppercase mt-px"
                style={{ color: "var(--muted)" }}
              >
                선물
              </span>
              <span
                className="text-[12px] font-semibold leading-relaxed"
                style={{ color: "var(--navy-700)" }}
              >
                {letter.sponsoredMaterial}
              </span>
            </div>

            {/* Atelier link */}
            <Link
              href={`/atelier/${artist.slug}`}
              className="shrink-0 text-xs font-semibold transition-colors hover:opacity-80"
              style={{ color: "var(--navy-600)" }}
            >
              {artist.name} 아틀리에 →
            </Link>
          </div>
        </article>

        {/* ── Prev / Next navigation ───────────────────────── */}
        <nav className="mt-8 flex gap-3">
          {prevLetter ? (
            <Link
              href={`/my/letters/${prevLetter.id}`}
              className="flex-1 rounded-xl px-4 py-3.5 border transition-all hover:shadow-card text-left"
              style={{ background: "var(--chiffon)", borderColor: "rgba(194,164,63,.2)" }}
            >
              <p className="text-[10px] font-bold tracking-wider text-muted uppercase mb-1">
                ← 이전 편지
              </p>
              <p className="font-myeongjo text-[13px] text-navy-700 leading-snug truncate">
                {prevLetter.letter.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextLetter ? (
            <Link
              href={`/my/letters/${nextLetter.id}`}
              className="flex-1 rounded-xl px-4 py-3.5 border transition-all hover:shadow-card text-right"
              style={{ background: "var(--chiffon)", borderColor: "rgba(194,164,63,.2)" }}
            >
              <p className="text-[10px] font-bold tracking-wider text-muted uppercase mb-1">
                다음 편지 →
              </p>
              <p className="font-myeongjo text-[13px] text-navy-700 leading-snug truncate">
                {nextLetter.letter.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return letters.map((l) => ({ id: l.id }));
}
