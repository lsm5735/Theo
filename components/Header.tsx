import Link from "next/link";

/* Brand logo SVG — matches theo_landing_v4_3.html */
function BrandLogoSvg() {
  return (
    <svg width="34" height="34" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="plogo_1" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves={3} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={4.0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#plogo_1)">
        <path
          d="M490.8 256.0 Q487.4 292.6 483.6 310.7 Q479.8 328.7 472.7 345.8 Q465.7 362.8 456.2 378.7 Q446.7 394.6 433.6 407.5 Q420.5 420.5 406.4 432.0 Q392.2 443.5 376.7 453.0 Q361.2 462.5 344.8 470.5 Q328.3 478.5 310.6 483.5 Q292.8 488.5 274.4 488.5 Q256.0 488.6 237.9 486.8 Q219.7 485.1 202.4 479.8 Q185.0 474.5 168.0 468.2 Q151.0 462.0 135.5 452.7 Q119.9 443.3 106.4 431.2 Q92.8 419.2 81.5 405.1 Q70.2 391.0 61.3 375.4 Q52.3 359.8 44.0 343.7 Q35.6 327.6 30.5 310.1 Q25.3 292.5 24.1 274.3 Q22.8 256.0 24.5 237.8 Q26.1 219.6 31.4 202.2 Q36.7 184.7 42.9 167.7 Q49.1 150.6 59.6 135.7 Q70.0 120.9 81.9 107.3 Q93.8 93.8 107.2 81.7 Q120.6 69.7 136.0 60.1 Q151.3 50.6 167.9 43.3 Q184.5 36.0 202.1 31.6 Q219.8 27.2 237.9 24.6 Q256.0 22.1 274.3 23.4 Q292.6 24.7 310.5 29.0 Q328.3 33.3 345.1 40.9 Q361.8 48.4 377.7 57.4 Q393.7 66.4 406.8 79.3 Q419.9 92.1 432.2 105.6 Q444.6 119.0 454.2 134.6 Q463.7 150.2 472.0 166.7 Q480.2 183.2 484.0 201.2 Q487.8 219.3 489.3 237.6 Q490.8 256.0 489.1 274.3 Z"
          fill="#F8D07A"
        />
      </g>
      <text
        x="256"
        y="256"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Jost, Futura, Avenir Next, sans-serif"
        fontWeight="800"
        fontSize="150"
        letterSpacing="9"
        fill="#141414"
      >
        THEO
      </text>
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[12px] border-b border-line">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 flex items-center justify-between py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <BrandLogoSvg />
          <b className="font-black tracking-[0.3em] text-base text-navy-900 uppercase">THEO</b>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="https://www.okrr.art/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase"
          >
            About
          </a>
          <Link href="/atelier" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            Atelier
          </Link>
          <Link href="#community" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            Community
          </Link>
          <Link href="#how" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            이용방법
          </Link>
          <Link
            href="/my"
            className="font-black text-[12.5px] tracking-[0.1em] uppercase transition-colors hover:opacity-80"
            style={{ color: 'var(--sv-deep)' }}
          >
            마이테오
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          {/* Mobile: 마이테오 icon */}
          <Link
            href="/my"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:opacity-80"
            style={{ background: 'var(--sv)', color: 'var(--ink)' }}
            aria-label="마이테오"
          >
            <span className="text-sm font-black">⭐</span>
          </Link>
          <Link
            href="#"
            className="hidden md:inline-flex items-center text-sm font-bold text-navy-700 border border-navy-400 hover:border-navy-700 px-4 py-2 rounded-lg transition-colors"
            style={{ fontSize: '13px', padding: '9px 17px' }}
          >
            로그인
          </Link>
          <Link
            href="#start"
            className="inline-flex items-center bg-navy-800 text-chiffon font-bold rounded-lg hover:bg-navy-700 transition-colors"
            style={{ fontSize: '13px', padding: '9px 17px' }}
          >
            시작하기
          </Link>
        </div>

      </div>
    </header>
  );
}
