"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Code2,
  Download,
  FolderGit2,
  Home,
  MessageCircle,
} from "lucide-react";

const dockItems = [
  { id: "about", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "engineering", label: "Engineering", icon: Code2 },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

export function MacDockNav() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    let frame = 0;
    function updateActiveSection() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = Math.min(window.innerHeight * 0.35, 240);
        let current = "about";
        for (const item of dockItems) {
          const section = document.getElementById(item.id);
          if (section && section.getBoundingClientRect().top <= threshold)
            current = item.id;
        }
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 40
        )
          current = "contact";
        setActiveSection(current);
      });
    }
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    const observer = new ResizeObserver(updateActiveSection);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <nav className="portfolio-dock" aria-label="Main navigation">
      <div className="professional-toolbar">
        {dockItems.map(({ id, label, icon: Icon }) => (
          <a
            className="dock-item"
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={activeSection === id ? "location" : undefined}
          >
            <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
            <span className="dock-tooltip" aria-hidden="true">
              {label}
            </span>
            <span className="dock-mobile-label" aria-hidden="true">
              {label === "Engineering" ? "Code" : label}
            </span>
          </a>
        ))}
        <span className="dock-divider" aria-hidden="true" />
        <a
          className="dock-item dock-download"
          href="/AdilJaved_CV.pdf"
          download
          aria-label="Download résumé"
        >
          <Download size={18} strokeWidth={1.7} aria-hidden="true" />
          <span className="dock-tooltip" aria-hidden="true">
            Download résumé
          </span>
          <span className="dock-mobile-label" aria-hidden="true">
            Résumé
          </span>
        </a>
      </div>
    </nav>
  );
}
