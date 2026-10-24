"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "tab-navigation", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export function PortfolioNav() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    let pendingFrame: number | null = null;
    const updateSection = () => {
      if (pendingFrame !== null) return;
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = null;
        const threshold = window.innerHeight * 0.35;
        let current: string = "about";
        for (const section of sections.slice(1)) {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= threshold) {
            current = section.id;
          }
        }
        if (
          window.scrollY > 0 &&
          window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 4
        ) {
          current = "contact";
        }
        setActiveSection(current);
      });
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    const observer = new ResizeObserver(updateSection);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
      observer.disconnect();
      if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
    };
  }, []);

  return (
    <nav className="desktop-nav" aria-label="Desktop navigation">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={activeSection === section.id ? "location" : undefined}
          onClick={(event) => {
            event.preventDefault();
            setActiveSection(section.id);
            if (section.id === "about") {
              window.scrollTo({ top: 0, behavior: "auto" });
            } else {
              document.getElementById(section.id)?.scrollIntoView({
                behavior: "auto",
                block: "start",
              });
            }
          }}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
