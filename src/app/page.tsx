"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CareerDetails } from "@/components/career-details";
import { MobileNav } from "@/components/mobile-nav";
import { PortfolioNav } from "@/components/portfolio-nav";
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
              aj.
            </span>
            <span>{RESUME_DATA.name}</span>
          </a>
          <div className="header-actions">
            <PortfolioNav />
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
            <Avatar className="desktop-avatar">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback className="bg-gray-100 text-4xl font-bold text-gray-600 dark:bg-[#21262d] dark:text-[#8b949e]">
                {RESUME_DATA.initials}
              </AvatarFallback>
            </Avatar>
            <div className="profile-identity">
              <h1 id="profile-name">{RESUME_DATA.name}</h1>
              <p className="profile-role">{RESUME_DATA.role}</p>
            </div>
            <p className="profile-bio">
              Studying Software Engineering at NED University.
            </p>
            <a
              className="profile-location"
              href={RESUME_DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={14} aria-hidden="true" />
              {RESUME_DATA.location}
            </a>
            <p className="availability">
              <span aria-hidden="true" />
              Open to opportunities
            </p>
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
          </section>

          <div className="desktop-content">
            <article
              className={`about-section ${panelClass("about")}`}
              aria-labelledby="overview-title"
            >
              <div className="about-introduction">
                <p className="section-eyebrow">About me</p>
                <h2 id="overview-title">
                  Full stack developer,
                  <br />

                </h2>
                <div className="about-copy">
                  <p>
                    I&apos;m Adil, a Software Engineering student at NED
                    University. I work across frontend and backend, building web
                    and mobile applications with TypeScript, React, Node.js, and
                    React Native.
                  </p>
                  <p>
                    My projects include a plant disease detector, an AR
                    furniture app, and an offline document editor. Alongside
                    these, I&apos;m learning more about system design, Redis,
                    and DevOps.
                  </p>
                </div>
                <div className="about-actions">
                  <button
                    className="overview-project-link"
                    type="button"
                    onClick={showProjects}
                  >
                    View my projects
                    <ArrowDownRight size={16} aria-hidden="true" />
                  </button>
                  <a
                    className="about-contact-link"
                    href={`mailto:${RESUME_DATA.contact.email}`}
                  >
                    Get in touch <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <dl className="about-details">
                <div>
                  <dt>Recent experience</dt>
                  <dd>{RESUME_DATA.work[0].company}</dd>
                  <dd className="about-detail-note">
                    {RESUME_DATA.work[0].title}
                  </dd>
                </div>
                <div>
                  <dt>Education</dt>
                  <dd>NED University</dd>
                  <dd className="about-detail-note">
                    {RESUME_DATA.education[0].degree}
                  </dd>
                </div>
              </dl>
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
                  <h2 id="contact-title">Contact</h2>
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
    </div>
  );
}
