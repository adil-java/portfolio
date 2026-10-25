"use client";

import { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  ChatCircleText,
  FileArrowDown,
  FolderSimple,
  House,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

interface DockItem {
  id: string;
  label: string;
  icon: PhosphorIcon;
  href: string;
}

// One icon family and weight so every tile reads as part of the same set.
const dockItems: DockItem[] = [
  { id: "about", label: "Home", icon: House, href: "#about" },
  { id: "experience", label: "Experience", icon: Briefcase, href: "#experience" },
  { id: "tab-navigation", label: "Projects", icon: FolderSimple, href: "#tab-navigation" },
  { id: "contact", label: "Contact", icon: ChatCircleText, href: "#contact" },
];

export function MacDockNav() {
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const pendingFrame = useRef<number | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [mouseX, setMouseX] = useState<number | null>(null);

  // macOS-style magnification: scale each icon by its distance from the cursor.
  const scaleFor = (index: number) => {
    const el = itemRefs.current[index];
    if (mouseX === null || !el) return 1;
    const rect = el.getBoundingClientRect();
    const distance = Math.abs(mouseX - (rect.left + rect.width / 2));
    const reach = 110;
    if (distance > reach) return 1;
    return 1 + 0.55 * Math.cos((distance / reach) * (Math.PI / 2)) ** 2;
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (pendingFrame.current !== null) return;

      pendingFrame.current = requestAnimationFrame(() => {
        pendingFrame.current = null;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY < 120) {
          setActiveSection("about");
          return;
        }

        if (scrollY + windowHeight >= documentHeight - 120) {
          setActiveSection("contact");
          return;
        }

        const threshold = scrollY + windowHeight * 0.55;
        // The profile stays pinned, so use the scrolling content to locate the
        // current section. Its position can differ from the toolbar order.
        const sections = dockItems
          .filter((item) => item.id !== "about")
          .flatMap((item) => {
            const section = document.getElementById(item.id);
            return section
              ? [{ id: item.id, top: section.getBoundingClientRect().top + scrollY }]
              : [];
          })
          .sort((a, b) => a.top - b.top);
        const visibleSections = sections.filter((section) => section.top <= threshold);
        setActiveSection(visibleSections[visibleSections.length - 1]?.id ?? "about");
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const observer = new ResizeObserver(handleScroll);
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (pendingFrame.current !== null) {
        cancelAnimationFrame(pendingFrame.current);
        pendingFrame.current = null;
      }
    };
  }, []);

  const scrollToSection = (item: DockItem) => {
    setActiveSection(item.id);
    if (item.id === "about") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const el = document.getElementById(item.id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "auto" });
    }
  };

  const tileBase =
    "relative flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-b from-white to-zinc-100 shadow-[0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-black/8 dark:from-zinc-700 dark:to-zinc-800 dark:shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] dark:ring-white/10 origin-bottom transition-transform duration-100 ease-out will-change-transform active:brightness-90";

  return (
    <nav
      aria-label="Desktop navigation"
      className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] print:hidden"
    >
      <div
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => {
          setMouseX(null);
          setHoveredIndex(null);
        }}
        className="flex items-end gap-10 rounded-[20px] border border-white/15 bg-white/50 px-2.5 pb-2 pt-2 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-900/50"
      >
        {dockItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const showTooltip = hoveredIndex === index || focusedIndex === index;
          const Icon = item.icon;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <div
                className={`absolute bottom-full mb-6 rounded-md border border-white/10 bg-zinc-800/90 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white shadow-lg backdrop-blur pointer-events-none transition-all duration-150 ${showTooltip ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"}`}
              >
                {item.label}
              </div>
              <button
                type="button"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                style={{ transform: `scale(${scaleFor(index)})` }}
                className={tileBase}
                aria-label={item.label}
                aria-current={isActive ? "location" : undefined}
              >
                <Icon
                  size={28}
                  weight="duotone"
                  className={isActive ? "text-[var(--portfolio-accent)]" : "text-zinc-700 dark:text-zinc-200"}
                />
              </button>
              <span
                aria-hidden="true"
                className={`mt-1 h-1 w-1 rounded-full bg-zinc-700 dark:bg-zinc-200 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          );
        })}

        <div className="mx-0.5 mb-2 h-10 w-px self-end bg-black/10 dark:bg-white/15" />

        <div className="relative flex flex-col items-center">
          <div
            className={`absolute bottom-full mb-5 rounded-md border border-white/10 bg-zinc-800/90 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white shadow-lg backdrop-blur pointer-events-none transition-all duration-150 ${hoveredIndex === dockItems.length || focusedIndex === dockItems.length ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"}`}
          >
            View CV
          </div>
          <a
            href="/AdilJaved_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              itemRefs.current[dockItems.length] = el;
            }}
            onMouseEnter={() => setHoveredIndex(dockItems.length)}
            onFocus={() => setFocusedIndex(dockItems.length)}
            onBlur={() => setFocusedIndex(null)}
            style={{ transform: `scale(${scaleFor(dockItems.length)})` }}
            className={tileBase}
            aria-label="View CV (opens in a new tab)"
          >
            <FileArrowDown
              size={28}
              weight="duotone"
              className="text-zinc-700 dark:text-zinc-200"
            />
          </a>
          <span aria-hidden="true" className="mt-1 h-1 w-1" />
        </div>
      </div>
    </nav>
  );
}
