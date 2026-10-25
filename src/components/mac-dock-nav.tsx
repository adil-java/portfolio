"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface DockItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const dockItems: DockItem[] = [
  { id: "about", label: "Home", icon: "/dock/home.png", href: "#about" },
  { id: "experience", label: "Experience", icon: "/dock/experience.png", href: "#experience" },
  { id: "tab-navigation", label: "Projects", icon: "/dock/projects.png", href: "#tab-navigation" },
  { id: "contact", label: "Contact", icon: "/dock/contact.png", href: "#contact" },
];

const TILE_SIZE = 48;

export function MacDockNav() {
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const pendingFrame = useRef<number | null>(null);
  const HOVER_SCALE = 1.3;

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
    "dock-tile relative flex shrink-0 items-center justify-center rounded-[22%] origin-bottom transition-transform duration-150 ease-out active:brightness-90";
  // Only the hovered (or keyboard-focused) tile grows; its neighbours keep their size.
  const tileStyle = (index: number) => {
    const grow = hoveredIndex === index || focusedIndex === index;
    // Scale instead of resizing so the dock itself keeps its size on hover.
    return {
      width: TILE_SIZE,
      height: TILE_SIZE,
      transform: `scale(${grow ? HOVER_SCALE : 1})`,
    };
  };

  return (
    <nav
      aria-label="Desktop navigation"
      className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] print:hidden"
    >
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        className="dock-glass flex items-end gap-4 rounded-[24px] px-4 pb-2 pt-2"
      >
        {dockItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const showTooltip = hoveredIndex === index || focusedIndex === index;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <div
                className={`absolute bottom-full mb-3 rounded-md border border-white/10 bg-zinc-800/90 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white shadow-lg backdrop-blur pointer-events-none transition-all duration-150 ${showTooltip ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"}`}
              >
                {item.label}
              </div>
              <button
                type="button"
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                style={tileStyle(index)}
                className={tileBase}
                aria-label={item.label}
                aria-current={isActive ? "location" : undefined}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={64}
                  height={64}
                  draggable={false}
                  className="h-[72%] w-[72%] object-contain"
                />
              </button>
              <span
                aria-hidden="true"
                className={`mt-1 h-1 w-1 rounded-full bg-zinc-700 dark:bg-zinc-200 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          );
        })}

        <div className="mx-1 mb-3 h-10 w-px self-end bg-black/10 dark:bg-white/15" />

        <div className="relative flex flex-col items-center">
          <div
            className={`absolute bottom-full mb-3 rounded-md border border-white/10 bg-zinc-800/90 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white shadow-lg backdrop-blur pointer-events-none transition-all duration-150 ${hoveredIndex === dockItems.length || focusedIndex === dockItems.length ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"}`}
          >
            View CV
          </div>
          <a
            href="/AdilJaved_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(dockItems.length)}
            onFocus={() => setFocusedIndex(dockItems.length)}
            onBlur={() => setFocusedIndex(null)}
            style={tileStyle(dockItems.length)}
            className={tileBase}
            aria-label="View CV (opens in a new tab)"
          >
            <Image
              src="/dock/cv.png"
              alt=""
              width={64}
              height={64}
              draggable={false}
              className="h-[72%] w-[72%] object-contain"
            />
          </a>
          <span aria-hidden="true" className="mt-1 h-1 w-1" />
        </div>
      </div>
    </nav>
  );
}
