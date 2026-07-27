import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-navy-100">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-full bg-[--sv-soft] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-[--navy-800] font-black text-sm tracking-wider">T</span>
          </div>
          <span
            className="text-[--navy-800] font-black text-lg tracking-[0.18em] uppercase"
            style={{ fontFamily: "'SUIT', sans-serif" }}
          >
            THEO
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-[--navy-600] hover:text-[--navy-800] transition-colors tracking-wide">
            ATELIER
          </Link>
          <Link href="#" className="text-[--navy-600] hover:text-[--navy-800] transition-colors tracking-wide">
            COMMUNITY
          </Link>
          <Link href="#" className="text-[--navy-600] hover:text-[--navy-800] transition-colors tracking-wide">
            ABOUT
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="hidden md:inline-flex text-sm text-[--navy-700] hover:text-[--navy-800] font-medium px-4 py-2 rounded-lg hover:bg-navy-100 transition-colors"
          >
            로그인
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 bg-[--navy-800] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[--navy-700] transition-colors"
          >
            시작하기
          </Link>
        </div>

      </div>
    </header>
  );
}
