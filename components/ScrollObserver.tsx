"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 경로 변경 시 이전 sr-on 클래스 초기화 (재방문 시 재애니메이션)
    document.querySelectorAll<HTMLElement>("[data-sr]").forEach((el) => {
      el.classList.remove("sr-on");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sr-on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    const raf = requestAnimationFrame(() => {
      document.querySelectorAll("[data-sr]").forEach((el) => io.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]); // ← 경로가 바뀔 때마다 재실행

  return null;
}
