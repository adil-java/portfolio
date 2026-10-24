import Image from "next/image";
import { Award, GraduationCap, Terminal } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";
import { getTechIcon } from "@/lib/tech-icons";

function TechList({ technologies }: { technologies: string[] }) {
  return (
    <ul className="tech-list" aria-label="Technologies">
      {technologies.map((technology) => {
        const icon = getTechIcon(technology);
        return (
          <li key={technology}>
            {icon && (
              <Image
                src={icon.path}
                alt=""
                loading="lazy"
                unoptimized
                width={14}
                height={14}
                className={icon.invert ? "dark:invert" : ""}
              />
            )}
            {technology}
          </li>
        );
      })}
    </ul>
  );
}

export function CareerDetails() {
  const skillGroups = [
    { label: "Languages", items: RESUME_DATA.skills.languages },
    { label: "Frameworks", items: RESUME_DATA.skills.frameworks },
    { label: "Databases & tools", items: RESUME_DATA.skills.databasesAndTools },
    { label: "AI & vision", items: RESUME_DATA.skills.aiAndLibraries },
  ];

  return (
    <>
      <div className="section-heading">
        <div>
          <h2 id="experience-title">Experience</h2>
          <p>Where I&apos;ve worked and what I&apos;ve been learning.</p>
        </div>
      </div>
      <div className="work-list">
        {RESUME_DATA.work.map((work) => (
          <article className="work-card" key={work.company}>
            <div className="work-card-header">
              <div className="work-identity">
                <div
                  className={`company-mark${
                    work.logo?.startsWith("/") ? " company-mark--logo" : ""
                  }`}
                  aria-hidden="true"
                >
                  {work.logo?.startsWith("/") ? (
                    <Image src={work.logo} alt="" width={30} height={30} />
                  ) : (
                    work.company
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                  )}
                </div>
                <div>
                  <h3>{work.title}</h3>
                  <a href={work.link} target="_blank" rel="noopener noreferrer">
                    {work.company}
                  </a>
                </div>
              </div>
              <div className="work-meta">
                <span>
                  {work.start} — {work.end}
                </span>
                {work.end === "Present" && (
                  <span className="current-role">Current</span>
                )}
              </div>
            </div>
            {work.description && (
              <p className="work-description">{work.description}</p>
            )}
            {work.technologies && <TechList technologies={work.technologies} />}
          </article>
        ))}
      </div>

      <div className="education-certificates">
        <section aria-labelledby="education-title">
          <h3 className="subsection-title" id="education-title">
            <GraduationCap size={17} aria-hidden="true" />
            Education
          </h3>
          {RESUME_DATA.education.map((education) => (
            <article className="credential-card" key={education.school}>
              {education.logo && (
                <Image
                  src={education.logo}
                  alt=""
                  width={36}
                  height={36}
                  className="education-logo"
                />
              )}
              <div>
                <h4>{education.degree}</h4>
                <a
                  href={education.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {education.school}
                </a>
                <p className="credential-date">
                  {education.start} — {education.end}
                </p>
              </div>
            </article>
          ))}
        </section>
        <section aria-labelledby="certificates-title">
          <h3 className="subsection-title" id="certificates-title">
            <Award size={17} aria-hidden="true" />
            Certificates
          </h3>
          <div className="certificate-list">
            {RESUME_DATA.certificates.map((certificate) => (
              <article className="credential-card" key={certificate.name}>
                <div>
                  <h4>{certificate.name}</h4>
                  <p>
                    {certificate.issuer} <span aria-hidden="true">·</span>{" "}
                    {certificate.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="skills-section" aria-labelledby="skills-title">
        <h2 className="subsection-title" id="skills-title">
          <Terminal size={17} aria-hidden="true" />
          Technical Toolkit
        </h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <h4>{group.label}</h4>
              <TechList technologies={group.items} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
