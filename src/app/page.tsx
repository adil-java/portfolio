"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Download,
  FileCode2,
  Globe,
  HeartHandshake,
  Mail,
  Phone,
  Smartphone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CareerDetails } from "@/components/career-details";
import { MacDockNav } from "@/components/mac-dock-nav";
import { MobileNav } from "@/components/mobile-nav";
import { OpenToWorkBadge } from "@/components/open-to-work-badge";
import { ProjectShowcase } from "@/components/project-showcase";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppForm } from "@/components/whatsapp-form";
import { RESUME_DATA } from "@/data/resume-data";

type MobilePage = "about" | "experience" | "tab-navigation" | "contact";

export default function Page() {
  const [activeMobilePage, setActiveMobilePage] = useState<MobilePage>("about");
  const panelClass = (page: MobilePage) =>
    activeMobilePage === page ? "" : "mobile-panel-hidden";

  const showProjects = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setActiveMobilePage("tab-navigation");
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      document
        .getElementById("tab-navigation")
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  return (
    <div className="portfolio-root">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="portfolio-header">
        <div className="portfolio-container header-inner">
          <a
            className="header-identity"
            href="#about"
            onClick={(event) => {
              event.preventDefault();
              setActiveMobilePage("about");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            <span className="header-monogram" aria-hidden="true">
              AJ
            </span>
            <span>{RESUME_DATA.name}</span>
          </a>
          <div className="header-actions">
            <a className="header-resume" href="/AdilJaved_CV.pdf" download>
              <Download size={15} aria-hidden="true" />
              <span>Download CV</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="portfolio-container">
        <div className="desktop-profile-layout">
          <section
            id="about"
            className={`profile-card desktop-profile-card ${panelClass(
              "about",
            )}`}
            aria-labelledby="profile-name"
          >
            <Avatar className="desktop-avatar rounded-full border-2 border-gray-200 dark:border-[#30363d]">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback className="bg-gray-100 text-4xl font-bold text-gray-600 dark:bg-[#21262d] dark:text-[#8b949e]">
                {RESUME_DATA.initials}
              </AvatarFallback>
              <OpenToWorkBadge />
            </Avatar>
            <div className="profile-identity">
              <h1 id="profile-name">{RESUME_DATA.name}</h1>
              <p className="profile-role">{RESUME_DATA.role}</p>
            </div>
            <p className="profile-bio">
              Software Engineering student at NED, building web, mobile, and
              practical AI applications.
            </p>
            {/* <a className="profile-resume " href="/AdilJaved_CV.pdf" download>
              <Download size={16} aria-hidden="true" /> Download CV
              <ArrowDownRight size={15} aria-hidden="true" />
            </a> */}
            <div
              className="profile-links"
              aria-label="Contact and social links"
            >
              <a href={`mailto:${RESUME_DATA.contact.email}`}>
                <Mail size={14} aria-hidden="true" />
                Email
              </a>
              <a href={`tel:${RESUME_DATA.contact.tel}`}>
                <Phone size={14} aria-hidden="true" />
                Phone
              </a>
              {RESUME_DATA.contact.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {social.name}
                </a>
              ))}
            </div>
            <a
              className="profile-location"
              href={RESUME_DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={14} aria-hidden="true" />
              {RESUME_DATA.location}
            </a>
          </section>

          <div className="desktop-content">
            <article
              className={`readme-card ${panelClass("about")}`}
              aria-labelledby="overview-title"
            >
              <div className="readme-topline">
                <span className="readme-filename">
                  <FileCode2 size={16} aria-hidden="true" />
                  adil-java <span aria-hidden="true">/</span> README.md
                </span>
                <span className="availability">
                  <span aria-hidden="true" />
                  Open to work
                </span>
              </div>
              <div className="readme-body">
                <p className="section-eyebrow">
                  Software engineer · Full stack developer
                </p>
                <h2 id="overview-title">
                  Full stack applications.
                  <br />
                  <span>Practical AI.</span>
                </h2>
                <p className="readme-description">
                  I build across the stack with TypeScript, develop mobile
                  experiences with React Native, and connect AI models to useful
                  applications.
                </p>
                <div className="readme-actions">
                  <div className="capability-row" aria-label="Areas of work">
                    <span>
                      <Code2 size={15} aria-hidden="true" />
                      Web applications
                    </span>
                    <span>
                      <Smartphone size={15} aria-hidden="true" />
                      Mobile &amp; AR
                    </span>
                    <span>
                      <Cpu size={15} aria-hidden="true" />
                      Applied AI
                    </span>
                  </div>
                  <button
                    className="overview-project-link"
                    type="button"
                    onClick={showProjects}
                  >
                    Explore selected work{" "}
                    <ArrowDownRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="readme-context">
                <span>
                  <span className="context-dot" aria-hidden="true" />
                  <strong>{RESUME_DATA.work[0].title}</strong> at{" "}
                  {RESUME_DATA.work[0].company}
                </span>
                <span>NED University · Software Engineering</span>
              </div>
            </article>

            <section
              id="experience"
              className={`section-card experience-section ${panelClass(
                "experience",
              )}`}
              aria-labelledby="experience-title"
            >
              <CareerDetails />
            </section>
            <section
              id="tab-navigation"
              className={`section-card projects-section ${panelClass(
                "tab-navigation",
              )}`}
              aria-label="Projects"
            >
              <ProjectShowcase />
              <a
                className="github-activity-link"
                href="https://github.com/adil-java"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>More code and contribution activity on GitHub</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </section>
            <section
              id="contact"
              className={`section-card contact-section ${panelClass(
                "contact",
              )}`}
              aria-labelledby="contact-title"
            >
              <div className="section-heading contact-heading">
                <div>
                  <h2 id="contact-title">
                    <HeartHandshake size={19} aria-hidden="true" />
                    Contact
                  </h2>
                  <p>For opportunities, projects, or collaboration.</p>
                </div>
              </div>
              <WhatsAppForm />
            </section>
          </div>
        </div>
      </main>

      <footer
        className={`portfolio-container portfolio-footer ${panelClass(
          "about",
        )}`}
      >
        <p>
          © {new Date().getFullYear()} {RESUME_DATA.name}
        </p>
        <div aria-label="Social links">
          {RESUME_DATA.contact.social.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <social.icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </footer>
      <MobileNav
        activePage={activeMobilePage}
        onPageChange={setActiveMobilePage}
      />
      <MacDockNav />
    </div>
  );
}
