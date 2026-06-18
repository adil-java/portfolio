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
  const ticking = useRef(false);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= documentHeight - 120) {
          setActiveSection("contact");
          ticking.current = false;
          return;
        }

        const threshold = windowHeight * 0.55;
        for (let i = dockItems.length - 1; i >= 0; i--) {
          const section = document.getElementById(dockItems[i].id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= threshold) {
              setActiveSection(dockItems[i].id);
              break;
            }
          }
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (item: DockItem) => {
    setActiveSection(item.id);
    const el = document.getElementById(item.id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] print:hidden">
      {/* Boxy professional toolbar container */}
      <div
        className="professional-toolbar relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
      >
        {/* Nav items */}
        {dockItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredIndex === index;
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              <div
                className={`absolute bottom-full mb-2 px-2 py-1 rounded text-[10px] tracking-wide font-medium uppercase
                  bg-gray-900 dark:bg-white text-white dark:text-gray-950
                  shadow-md whitespace-nowrap pointer-events-none
                  transition-all duration-150 ease-out
                  ${isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95"}`}
              >
                {item.label}
              </div>

              <button
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`w-9 h-9 flex items-center justify-center rounded transition-all duration-150 relative active:scale-95
                  ${isActive
                    ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-zinc-800/80"
                  }`}
                aria-label={item.label}
              >
                <Icon
                  className="w-4.5 h-4.5"
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
              ${hoveredIndex === dockItems.length ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95"}`}
          >
            Download CV
          </div>
          <a
            href="https://adil-java.github.io/AdilJaved_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(dockItems.length)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`w-9 h-9 flex items-center justify-center rounded transition-all duration-150 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-zinc-800/80 active:scale-95`}
            aria-label="Download CV"
          >
            <Download
              className="w-4.5 h-4.5"
              strokeWidth={1.7}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
