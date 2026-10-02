import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Code2,
  GraduationCap,
  MapPin,
  Braces,
  Database,
  Sparkles,
} from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";
import { PortfolioNav } from "@/components/portfolio-nav";
import { ProjectShowcase } from "@/components/project-showcase";
import { ProfilePortrait } from "@/components/profile-portrait";
import { WhatsAppForm } from "@/components/whatsapp-form";
import { MacDockNav } from "@/components/mac-dock-nav";
import { EngineeringProfile } from "@/components/engineering-profile";
import { ScrollEffects } from "@/components/scroll-effects";

const skillGroups = [
  { label: "Languages", skills: RESUME_DATA.skills.languages },
  { label: "Frameworks & libraries", skills: RESUME_DATA.skills.frameworks },
  {
    label: "Infrastructure & data",
    skills: RESUME_DATA.skills.databasesAndTools,
  },
  { label: "AI & computer vision", skills: RESUME_DATA.skills.aiAndLibraries },
];

const engineeringFocus = [
  {
    icon: Braces,
    title: "From interface to API",
    description:
      "Connecting React interfaces with Node.js and Python backends, with an interest in the architecture that holds everything together.",
  },
  {
    icon: Sparkles,
    title: "AI with a practical purpose",
    description:
      "Exploring image classification, retrieval-augmented generation, and computer vision through GreenBuddy and SmartWear.",
  },
  {
    icon: Database,
    title: "Thinking beyond the first version",
    description:
      "Learning how system design, caching, and deployment decisions shape the reliability and performance of an application.",
  },
];

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <PortfolioNav />
      <ScrollEffects />
      <main id="main-content" className="site-container">
        <section
          id="about"
          className="hero section-anchor"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> THE INTERSECTION OF LOGIC &
              CREATIVITY
            </p>
            <h1 id="hero-heading">
              Thoughtful code.
              <br />
              <span className="serif-accent">Useful software.</span>
            </h1>
            <p className="hero-intro">
              I’m Adil, a software engineer building full stack applications and
              practical AI experiences. I care about what happens behind the
              interface as much as what you see.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowDown size={16} />
              </a>
              <a
                className="button button-secondary"
                href="/AdilJaved_CV.pdf"
                download
              >
                Download résumé <ArrowDownToLine size={16} />
              </a>
            </div>
            <div className="hero-socials">
              <span>FIND ME ON</span>
              {RESUME_DATA.contact.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                  {social.name}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
            <p className="hero-footnote">
              <span aria-hidden="true">&lt;/&gt;</span> A little curiosity. A
              lot of building.
            </p>
          </div>
          <div className="profile-card">
            <div className="portrait-wrap">
              <ProfilePortrait />
              <span className="portrait-caption">
                THE PERSON BEHIND THE CODE
              </span>
            </div>
            <div className="profile-details">
              <div>
                <h2>{RESUME_DATA.name}</h2>
                <a
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={13} />
                  {RESUME_DATA.location}
                </a>
              </div>
              <span className="profile-mark" aria-hidden="true">
                <Code2 size={23} />
              </span>
            </div>
          </div>
        </section>

        <div className="intro-strip">
          <p>
            <span className="status-dot" /> Currently building at{" "}
            <a
              href={RESUME_DATA.work[0].link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {RESUME_DATA.work[0].company}
              <ArrowUpRight size={13} />
            </a>
          </p>
          <p>
            <GraduationCap size={17} /> Software Engineering · NED University
          </p>
        </div>

        <section
          id="projects"
          className="content-section section-anchor"
          aria-labelledby="projects-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">01 / SELECTED WORK</p>
              <h2 id="projects-heading">
                Selected projects<span className="accent-period">.</span>
              </h2>
            </div>
            <p>
              A selection of projects across web,
              <br className="hidden sm:block" /> mobile, and artificial
              intelligence.
            </p>
          </div>
          <ProjectShowcase />
        </section>

        <section
          id="experience"
          className="content-section section-anchor experience-section"
          aria-labelledby="experience-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">02 / THE JOURNEY</p>
              <h2 id="experience-heading">
                Learning by building<span className="accent-period">.</span>
              </h2>
            </div>
            <p>
              Hands-on experience.
              <br />A foundation in engineering.
            </p>
          </div>
          <div className="experience-grid">
            <div>
              <h3 className="subsection-title">Work experience</h3>
              <div className="timeline">
                <span className="timeline-progress" aria-hidden="true" />
                <span className="timeline-runner" aria-hidden="true" />
                {RESUME_DATA.work.map((work) => (
                  <article className="timeline-entry" key={work.company}>
                    <div className="timeline-content" data-reveal>
                      <div className="timeline-topline">
                        <span className="entry-date">
                          {work.start} — {work.end}
                        </span>
                        {work.end === "Present" && (
                          <span className="current-badge">Current</span>
                        )}
                      </div>
                      <h4>{work.title}</h4>
                      <a
                        className="company-link"
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {work.company}
                        <ArrowUpRight size={14} />
                      </a>
                      {work.description && (
                        <p className="entry-description">{work.description}</p>
                      )}
                      <div className="tech-tags">
                        {work.technologies?.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <p className="work-mode">{work.badges.join(" · ")}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="education-column">
              <h3 className="subsection-title">
                Education & continued learning
              </h3>
              {RESUME_DATA.education.map((education) => (
                <article
                  className="education-card"
                  key={education.school}
                  data-reveal
                >
                  <GraduationCap size={24} />
                  <p className="entry-date">
                    {education.start} — {education.end}
                  </p>
                  <h4>{education.degree}</h4>
                  <a
                    href={education.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {education.school}
                    <ArrowUpRight size={14} />
                  </a>
                </article>
              ))}
              <div className="certificates">
                {RESUME_DATA.certificates.map((certificate) => (
                  <article key={certificate.name} data-reveal>
                    <span className="certificate-mark" aria-hidden="true">
                      ↗
                    </span>
                    <div>
                      <h4>{certificate.name}</h4>
                      <p>
                        {certificate.issuer}
                        <span>·</span>
                        {certificate.date}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="engineering"
          className="content-section engineering-section section-anchor"
          aria-labelledby="engineering-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">03 / ENGINEERING MINDSET</p>
              <h2 id="engineering-heading">
                Behind the interface<span className="accent-period">.</span>
              </h2>
            </div>
            <p>
              The way I think about software,
              <br />
              and what I’m learning along the way.
            </p>
          </div>
          <div className="engineering-grid">
            <EngineeringProfile />
            <div className="engineering-notes">
              {engineeringFocus.map(({ icon: Icon, title, description }) => (
                <article key={title} data-reveal>
                  <span className="engineering-icon">
                    <Icon size={19} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="developer-links" data-reveal>
            {RESUME_DATA.contact.social
              .filter((social) => social.name !== "LinkedIn")
              .map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                  <span>
                    <strong>
                      {social.name === "GitHub"
                        ? "Explore the source"
                        : "The problem-solving side"}
                    </strong>
                    <span>
                      {social.name === "GitHub"
                        ? "Projects, experiments, and the code behind them."
                        : "Find me on LeetCode for algorithms and practice."}
                    </span>
                  </span>
                  <ArrowUpRight size={18} />
                </a>
              ))}
          </div>
        </section>

        <section
          id="skills"
          className="content-section section-anchor"
          aria-labelledby="skills-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">04 / THE TOOLKIT</p>
              <h2 id="skills-heading">
                The tools behind the work
                <span className="accent-period">.</span>
              </h2>
            </div>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <div
                className="skill-group"
                key={group.label}
                data-reveal
                data-reveal-delay={index * 55}
              >
                <span className="skill-number">0{index + 1}</span>
                <h3>{group.label}</h3>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="learning-note">
            <span className="status-dot" /> Currently exploring DevOps, Redis,
            and system design.
          </p>
        </section>

        <section
          id="contact"
          className="contact-section section-anchor"
          aria-labelledby="contact-heading"
        >
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">05 / LET’S CONNECT</p>
            <h2 id="contact-heading">
              Good things start
              <br />
              with a <span className="serif-accent">conversation.</span>
            </h2>
            <p>
              Have a project in mind, a role to discuss, or an interesting
              problem to solve? I’d love to hear from you.
            </p>
            <a
              className="contact-email"
              href={`mailto:${RESUME_DATA.contact.email}`}
            >
              {RESUME_DATA.contact.email}
              <ArrowUpRight size={17} />
            </a>
            <a
              className="contact-phone"
              href={`tel:${RESUME_DATA.contact.tel}`}
            >
              {RESUME_DATA.contact.tel}
            </a>
            <span className="contact-location">
              <MapPin size={14} /> Based in Karachi, Pakistan
            </span>
          </div>
          <WhatsAppForm />
        </section>
      </main>
      <MacDockNav />
      <footer className="site-footer site-container">
        <a className="wordmark" href="#about">
          adil<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Adil Javed</p>
        <a href="#about">
          Back to top <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
