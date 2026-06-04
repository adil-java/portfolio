"use client";

import { useState, useEffect, useRef } from "react";
import {
  Home,
  Briefcase,
  FolderGit2,
  MessageCircle,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  href: string;
}

const navItems: NavItem[] = [
  { id: "about", label: "Home", icon: Home, href: "#about" },
  { id: "experience", label: "Experience", icon: Briefcase, href: "#experience" },
  { id: "tab-navigation", label: "Projects", icon: FolderGit2, href: "#tab-navigation" },
  { id: "contact", label: "Contact", icon: MessageCircle, href: "#contact" },
];

export function MobileNav() {
  const [activeSection, setActiveSection] = useState("about");
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Near bottom → highlight contact
        if (scrollY + windowHeight >= documentHeight - 120) {
          setActiveSection("contact");
          ticking.current = false;
          return;
        }

        // Detect which section is in view
        const threshold = windowHeight * 0.35;
        for (let i = navItems.length - 1; i >= 0; i--) {
          const section = document.getElementById(navItems[i].id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= threshold) {
              setActiveSection(navItems[i].id);
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

  const scrollToSection = (item: NavItem) => {
    setActiveSection(item.id);
    const el = document.getElementById(item.id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-[100] print:hidden">
      {/* GitHub mobile-style bottom tab bar */}
      <nav className="bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-[#30363d]">
        <div className="flex items-stretch h-[52px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item)}
                className="mobile-nav-item relative flex-1 flex flex-col items-center justify-center gap-[2px]"
                aria-label={item.label}
              >
                {/* Active top bar — GitHub style */}
                <span
                  className={`absolute top-0 inset-x-3 h-[2px] rounded-b-full transition-all duration-200 ${isActive
                      ? "bg-[#0969da] dark:bg-[#2f81f7] opacity-100"
                      : "opacity-0"
                    }`}
                />

                {/* Icon */}
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${isActive
                      ? "text-[#0969da] dark:text-[#2f81f7]"
                      : "text-[#656d76] dark:text-[#8b949e]"
                    }`}
                  strokeWidth={isActive ? 2.2 : 1.6}
                />

                {/* Label */}
                <span
                  className={`text-[10px] leading-tight font-medium transition-colors duration-200 ${isActive
                      ? "text-[#0969da] dark:text-[#2f81f7]"
                      : "text-[#656d76] dark:text-[#8b949e]"
                    }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Safe area spacer for notched devices */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
