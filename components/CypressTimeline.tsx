/* ─────────────────────────────────────────────────────────────────────
   CypressTimeline — 반 고흐 사이프러스 세로축 타임라인
   채워진 실루엣 방식: 위는 뾰족, 아래로 갈수록 넓고 묵직해진다.
   ───────────────────────────────────────────────────────────────────── */

const SPACING = 80;
const TOP_PAD = 52;
const TREE_W  = 46;
const CX      = 23;
const NODE_R  = 5.5;

interface Artist { name: string; totalSponsors: number; followers: number; }
interface Milestone { date: string; title: string; desc: string; isFirst?: boolean; isCurrent?: boolean; }

function getMilestones(artist: Artist): Milestone[] {
  const mid = Math.round(artist.totalSponsors * 0.45);
  return [
    { date: "2024년 10월", title: "테오의 가족이 되었어요",
      desc: `${artist.name} 작가의 첫 번째 테오가 재료를 선물했어요.`, isFirst: true },
    { date: "2025년 1월",  title: "누적 후원 10명 달성",
      desc: "열 번째 테오가 함께해 주셨어요." },
    { date: "2025년 5월",  title: "첫 프로젝트를 완료했어요",
      desc: "재료 후원으로 첫 작품이 완성됐어요." },
    { date: "2025년 10월", title: "테오 가족이 된 지 1년",
      desc: "함께한 지 벌써 일 년이 됐어요." },
    { date: "2026년 3월",  title: `누적 후원 ${mid}명 달성`,
      desc: `${artist.name} 작가와 ${mid}명의 테오가 창작을 이어가고 있어요.` },
    { date: "지금",        title: `테오 ${artist.totalSponsors}명과 함께해요`,
      desc: "지금도 새로운 프로젝트를 함께 만들어가는 중이에요.", isCurrent: true },
  ];
}

/* ── 사이프러스 SVG ──────────────────────────────────────────────────
   채워진 실루엣: 위 뾰족 → 아래 넓음.
   내부에 잎 클러스터 텍스처를 클리핑해서 채운다.
   ──────────────────────────────────────────────────────────────────── */
function CypressSvg({ height }: { height: number }) {
  const H = height;

  const silhouette = [
    `M ${CX} 4`,
    `C ${CX + 3} 16, ${CX + 5} 44, ${CX + 7} ${H * 0.22}`,
    `C ${CX + 10} ${H * 0.36}, ${CX + 13} ${H * 0.50}, ${CX + 16} ${H * 0.63}`,
    `C ${CX + 18} ${H * 0.73}, ${CX + 21} ${H * 0.84}, ${CX + 22} ${H - 4}`,
    `L ${CX - 21} ${H - 4}`,
    `C ${CX - 20} ${H * 0.84}, ${CX - 17} ${H * 0.73}, ${CX - 15} ${H * 0.63}`,
    `C ${CX - 12} ${H * 0.50}, ${CX - 9} ${H * 0.36}, ${CX - 6} ${H * 0.22}`,
    `C ${CX - 4} 44, ${CX - 2} 16, ${CX} 4`,
    `Z`,
  ].join(" ");

  /* 잎 클러스터 — progress 따라 rx 3→22 */
  const shades = ["#253E2C", "#1D3324", "#2E5038", "#213829", "#38624A", "#192C20"];
  const clusters: { cx: number; cy: number; rx: number; ry: number; fill: string; rotate: number }[] = [];

  let y = 16, i = 0;
  while (y < H - 10) {
    const prog = y / H;
    const rx   = 3 + prog * 20;
    const ry   = 4 + prog * 3.5;
    const lean = i % 2 === 0 ? -16 : 17;
    const ox   = i % 3 === 0 ? -2 : i % 3 === 1 ? 2 : 0;
    clusters.push({ cx: CX + ox, cy: y, rx, ry, fill: shades[i % shades.length], rotate: lean });
    y += 16 + prog * 10 + (i % 3) * 4;
    i++;
  }

  return (
    <svg width={TREE_W} height={H} viewBox={`0 0 ${TREE_W} ${H}`} overflow="visible">
      <defs>
        <clipPath id="cp-cy">
          <path d={silhouette} />
        </clipPath>
        <linearGradient id="cy-lr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1E3828" />
          <stop offset="45%"  stopColor="#253F2E" />
          <stop offset="100%" stopColor="#18301F" />
        </linearGradient>
        <linearGradient id="cy-tb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3A6448" stopOpacity="0.5" />
          <stop offset="40%"  stopColor="#243C2B" stopOpacity="0" />
          <stop offset="100%" stopColor="#111E15" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* 베이스 실루엣 */}
      <path d={silhouette} fill="url(#cy-lr)" />

      {/* 잎 텍스처 (클립) */}
      <g clipPath="url(#cp-cy)">
        {clusters.map((c, idx) => (
          <ellipse key={idx}
            cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
            fill={c.fill} opacity={0.82}
            transform={`rotate(${c.rotate} ${c.cx} ${c.cy})`}
          />
        ))}
        {/* 왼쪽 하이라이트 */}
        <path d={`M ${CX - 5} 12 Q ${CX - 8} ${H * 0.3} ${CX - 9} ${H * 0.56} Q ${CX - 10} ${H * 0.76} ${CX - 11} ${H - 12}`}
          fill="none" stroke="#52906A" strokeWidth="3.5" strokeLinecap="round" opacity={0.26} />
        {/* 오른쪽 그림자 */}
        <path d={`M ${CX + 7} 22 Q ${CX + 10} ${H * 0.32} ${CX + 12} ${H * 0.58} Q ${CX + 14} ${H * 0.78} ${CX + 15} ${H - 12}`}
          fill="none" stroke="#0D1C10" strokeWidth="5" strokeLinecap="round" opacity={0.3} />
        {/* 위아래 그라데이션 오버레이 */}
        <path d={silhouette} fill="url(#cy-tb)" />
      </g>

      {/* 팁 하이라이트 */}
      <ellipse cx={CX} cy={7} rx={2} ry={3.5} fill="#60B87A" opacity={0.4} />
    </svg>
  );
}

/* ── 노드 원 ────────────────────────────────────────────────────────── */
function NodeCircle({ isFirst, isCurrent }: { isFirst?: boolean; isCurrent?: boolean }) {
  if (isCurrent)
    return <div style={{ width: NODE_R * 2, height: NODE_R * 2, borderRadius: "50%",
      background: "var(--sv)", border: "2px solid var(--sv-deep)",
      boxShadow: "0 0 0 4px rgba(244,211,94,.25)" }} />;
  if (isFirst)
    return <div style={{ width: NODE_R * 2, height: NODE_R * 2, borderRadius: "50%",
      background: "white", border: "2.5px solid #2E5038",
      boxShadow: "0 0 0 2.5px rgba(46,80,56,.18)" }} />;
  return <div style={{ width: NODE_R * 2 - 2, height: NODE_R * 2 - 2, borderRadius: "50%",
    background: "white", border: "2px solid #2E5038" }} />;
}

/* ── 메인 컴포넌트 ──────────────────────────────────────────────────── */
export default function CypressTimeline({ artist }: { artist: Artist }) {
  const milestones = getMilestones(artist);
  const treeH = TOP_PAD + (milestones.length - 1) * SPACING + 44;
  const nodeY  = (i: number) => TOP_PAD + i * SPACING;

  return (
    <section>
      <h2 className="text-lg font-black text-navy-800 mb-1">성장 타임라인</h2>
      <p className="text-xs text-muted mb-6">🌲 작가와 테오가 함께 만들어온 순간들</p>

      <div className="relative" style={{ minHeight: treeH }}>
        {/* 사이프러스 세로축 */}
        <div className="absolute top-0 left-0" style={{ width: TREE_W, height: treeH }}>
          <CypressSvg height={treeH} />
          {milestones.map((m, i) => (
            <div key={i} className="absolute flex items-center justify-center"
              style={{ left: CX - NODE_R, top: nodeY(i) - NODE_R, width: NODE_R * 2, height: NODE_R * 2 }}>
              <NodeCircle isFirst={m.isFirst} isCurrent={m.isCurrent} />
            </div>
          ))}
        </div>

        {/* 마일스톤 내용 */}
        <div style={{ marginLeft: TREE_W + 16, position: "relative", height: treeH }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ position: "absolute", top: nodeY(i) - 20, left: 0, right: 0 }}>
              <div className="absolute" style={{
                top: 22, left: -10, width: 8, height: 1,
                background: m.isCurrent ? "rgba(194,164,63,.65)" : "rgba(46,80,56,.3)",
              }} />
              <time className="block text-[10.5px] font-bold tracking-wide mb-0.5"
                style={{ color: m.isCurrent ? "var(--gold-text)" : "var(--muted)" }}>
                {m.date}
              </time>
              <p className="text-[13.5px] leading-snug"
                style={{ color: "var(--navy-800)", fontWeight: m.isCurrent || m.isFirst ? 800 : 700 }}>
                {m.title}
              </p>
              <p className="text-[11.5px] leading-relaxed mt-0.5" style={{ color: "var(--muted)" }}>
                {m.desc}
              </p>
            </div>
          ))}
          <div style={{ height: treeH }} />
        </div>
      </div>
    </section>
  );
}
