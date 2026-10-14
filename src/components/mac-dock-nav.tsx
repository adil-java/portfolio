"use client";

import { useState, useEffect, useRef } from "react";
import {
  Home,
  Briefcase,
  FolderGit2,
  MessageCircle,
  Download,
} from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: typeof Home;
  href: string;
}

const dockItems: DockItem[] = [
  { id: "about", label: "Home", icon: Home, href: "#about" },
  { id: "experience", label: "Experience", icon: Briefcase, href: "#experience" },
  { id: "tab-navigation", label: "Projects", icon: FolderGit2, href: "#tab-navigation" },
  { id: "contact", label: "Contact", icon: MessageCircle, href: "#contact" },
];

export function MacDockNav() {
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const pendingFrame = useRef<number | null>(null);

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

  return (
    <nav aria-label="Desktop navigation" className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] print:hidden">
      {/* Boxy professional toolbar container */}
      <div
        className="professional-toolbar relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
      >
        {/* Nav items */}
        {dockItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const showTooltip = hoveredIndex === index || focusedIndex === index;
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              <div
                className={`absolute bottom-full mb-2 px-2 py-1 rounded text-[10px] tracking-wide font-medium uppercase
                  bg-gray-900 dark:bg-white text-white dark:text-gray-950
                  shadow-md whitespace-nowrap pointer-events-none
                  transition-all duration-150 ease-out
                  ${showTooltip ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95"}`}
              >
                {item.label}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                className={`w-9 h-9 flex items-center justify-center rounded transition-all duration-150 relative active:scale-95
                  ${isActive
                    ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-zinc-800/80"
                  }`}
                aria-label={item.label}
                aria-current={isActive ? "location" : undefined}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.7}
                />
              </button>
            </div>
          );
        })}

        {/* Clean divider */}
        <div className="w-px h-5 bg-gray-200 dark:bg-zinc-800 mx-1 self-center" />

        {/* Download CV */}
        <div className="relative flex flex-col items-center">
          <div
            className={`absolute bottom-full mb-2 px-2 py-1 rounded text-[10px] tracking-wide font-medium uppercase
              bg-gray-900 dark:bg-white text-white dark:text-gray-950
              shadow-md whitespace-nowrap pointer-events-none
              transition-all duration-150 ease-out
              ${hoveredIndex === dockItems.length || focusedIndex === dockItems.length ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95"}`}
          >
            Download CV
          </div>
          <a
            href="/AdilJaved_CV.pdf"
            download
            onMouseEnter={() => setHoveredIndex(dockItems.length)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setFocusedIndex(dockItems.length)}
            onBlur={() => setFocusedIndex(null)}
            className={`w-9 h-9 flex items-center justify-center rounded transition-all duration-150 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-zinc-800/80 active:scale-95`}
            aria-label="Download CV"
          >
            <Download
              size={18}
              strokeWidth={1.7}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
