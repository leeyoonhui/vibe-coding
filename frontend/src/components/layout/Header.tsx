"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "activities", label: "Activities" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export function Header({ name }: { name: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 현재 보고 있는 섹션의 메뉴를 강조한다.
  useEffect(() => {
    const sections = ["home", ...NAV_ITEMS.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-20 border-b border-surface bg-canvas">
      <nav aria-label="주 메뉴" className="container-page flex h-16 items-center justify-between gap-6 md:h-[88px]">
        <a href="#home" className="text-2xl font-bold tracking-[-0.5px] text-white md:text-[32px]" onClick={() => setMenuOpen(false)}>
          {name}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-10 text-lg md:flex">
          {NAV_ITEMS.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`border-b-2 py-3 transition-colors hover:text-accent ${
                    active ? "border-accent font-bold text-accent" : "border-transparent text-fg"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-line text-white md:hidden"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <ul id="mobile-menu" className="border-t border-surface bg-canvas px-5 pb-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block border-b border-surface py-4 text-lg ${activeId === item.id ? "font-bold text-accent" : "text-fg"}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
