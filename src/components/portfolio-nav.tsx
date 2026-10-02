import { ArrowUpRight } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";
import { ThemeToggle } from "./theme-toggle";

export function PortfolioNav() {
  return (
    <header className="site-header">
      <div className="site-container nav-inner">
        <a
          className="header-identity"
          href="#about"
          aria-label="Adil Javed home"
        >
          <span className="header-monogram" aria-hidden="true">
            aj<span>.</span>
          </span>
          <span className="header-name">
            {RESUME_DATA.name}
            <span>SOFTWARE ENGINEER</span>
          </span>
        </a>
        <div className="header-right">
          <a className="header-contact" href="#contact">
            Let’s talk
            <ArrowUpRight size={14} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
