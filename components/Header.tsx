import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[12px] border-b border-line">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 flex items-center justify-between py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/logo-face.png"
            alt="THEO"
            className="w-8 h-8 shrink-0"
          />
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
          <a href="/#community" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            Community
          </a>
          <a href="/#how" className="text-muted hover:text-navy-800 transition-colors text-[12.5px] tracking-[0.1em] uppercase">
            이용방법
          </a>
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
          <a
            href="/#start"
            className="inline-flex items-center bg-navy-800 text-chiffon font-bold rounded-lg hover:bg-navy-700 transition-colors"
            style={{ fontSize: '13px', padding: '9px 17px' }}
          >
            시작하기
          </a>
        </div>

      </div>
    </header>
  );
}
