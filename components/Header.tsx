import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-line">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-full bg-sv-soft flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-navy-800 font-black text-sm leading-none" style={{ fontFamily: "'Jost', sans-serif" }}>T</span>
          </div>
          <span
            className="text-navy-800 font-black text-base tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            THEO
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-muted hover:text-navy-800 transition-colors"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: '12.5px', letterSpacing: '0.1em' }}
          >
            ATELIER
          </Link>
          <Link
            href="#"
            className="text-muted hover:text-navy-800 transition-colors"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: '12.5px', letterSpacing: '0.1em' }}
          >
            COMMUNITY
          </Link>
          <Link
            href="#"
            className="text-muted hover:text-navy-800 transition-colors"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: '12.5px', letterSpacing: '0.1em' }}
          >
            ABOUT
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="hidden md:inline-flex text-sm text-navy-700 hover:text-navy-800 font-medium px-4 py-2 rounded-lg hover:bg-navy-100 transition-colors border border-navy-400 hover:border-navy-700"
          >
            로그인
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 bg-navy-800 text-chiffon text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors"
          >
            시작하기
          </Link>
        </div>

      </div>
    </header>
  );
}
