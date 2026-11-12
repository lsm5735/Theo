"use client";

import { useEffect, useState } from "react";

// 레퍼런스의 페이지 타이틀 — 글자를 컨테이너 가로폭에 꽉 채워 늘리는 대형 디스플레이 타이틀
// · 줄바꿈("\n")이 있으면 각 줄을 가로폭에 맞춰 위아래로 쌓는다.
// · typing: 글자가 타이핑하듯 하나씩 나타난다. (자리는 처음부터 잡혀 있어 레이아웃이 흔들리지 않음)

function Line({ text, shown, minChars }: { text: string; shown: number; minChars: number }) {
  // minChars: 글자 수가 적어도 이 글자 수 기준으로 크기를 잡아, 짧은 제목이 지나치게 커지지 않게 한다
  const n = Math.max(text.length, minChars);
  const width = (1000 * text.length) / n;
  const fs = 1000 / (n * 0.66);
  const h = fs * 0.98;
  return (
    <svg
      viewBox={`0 0 1000 ${h}`}
      className="block w-full h-auto overflow-visible"
      role="presentation"
      style={{ maxHeight: "36rem" }}
    >
      <text
        x="0"
        y={fs * 0.74}
        textLength={width}
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
        style={{ fontFamily: "'Archivo Black', 'Noto Sans KR', sans-serif", fontSize: fs, letterSpacing: "-0.03em", whiteSpace: "pre" }}
      >
        {shown >= text.length
          ? text
          : Array.from(text).map((ch, i) => (
              <tspan key={i} fillOpacity={i < shown ? 1 : 0}>
                {ch}
              </tspan>
            ))}
      </text>
    </svg>
  );
}

export default function BigTitle({ text, typing = false, speed = 70, minChars = 0 }: { text: string; typing?: boolean; speed?: number; minChars?: number }) {
  const lines = text.split("\n");
  const total = lines.reduce((n, l) => n + l.length, 0);
  // 타이핑이 아니면 처음부터 전부 보임. 타이핑이면 0부터 시작 (reduced-motion 이면 바로 전부)
  const [count, setCount] = useState(typing ? 0 : total);

  useEffect(() => {
    if (!typing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      if (reduce) {
        setCount(total);
        return;
      }
      let n = 0;
      id = setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= total && id) clearInterval(id);
      }, speed);
    }, reduce ? 0 : 350);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [typing, total, speed]);

  const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.length, 0));

  return (
    <h1 aria-label={lines.join(" ")} className="flex flex-col gap-[1.5vw] m-0">
      {lines.map((l, i) => (
        <Line key={l} text={l} minChars={minChars} shown={Math.max(0, Math.min(l.length, count - starts[i]))} />
      ))}
    </h1>
  );
}
