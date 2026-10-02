"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { RESUME_DATA, type ProjectCategory } from "@/data/resume-data";

const categories: readonly ("All work" | ProjectCategory)[] = [
  "All work",
  "AI & vision",
  "Software & web",
  "Mobile & AR",
];

export function ProjectShowcase() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All work");
  const [expanded, setExpanded] = useState(false);
  const filtered = RESUME_DATA.projects.filter(
    (project) => category === "All work" || project.category === category,
  );
  const visible =
    expanded || category !== "All work" ? filtered : filtered.slice(0, 4);

  return (
    <>
      <div className="project-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setExpanded(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="project-count" role="status">
          {visible.length} of {RESUME_DATA.projects.length} projects
        </span>
      </div>
      <div className="project-grid" id="project-list">
        {visible.map((project, index) => (
          <article
            className="project-card"
            key={project.title}
            data-reveal
            data-reveal-delay={(index % 2) * 80}
          >
            <div className="project-body">
              <div className="repository-heading">
                <BookOpen size={16} aria-hidden="true" />
                <h3>
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title.split(" - ")[0]}
                  </a>
                </h3>
                <span className="repository-kind">
                  {project.link.label === "github.com"
                    ? "Repository"
                    : "Web app"}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="tech-tags">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="repository-footer">
                <span className="project-category">{project.category}</span>
                <a
                  className="project-cta"
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link.label === "github.com" ? (
                    <>
                      View source
                      <ArrowUpRight size={13} />
                    </>
                  ) : (
                    <>
                      Visit project
                      <ExternalLink size={12} />
                    </>
                  )}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {category === "All work" && (
        <div className="all-projects">
          <button
            className="button button-secondary"
            type="button"
            aria-expanded={expanded}
            aria-controls="project-list"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? "Show selected projects"
              : `Explore all ${RESUME_DATA.projects.length} projects`}
            {expanded ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
          </button>
        </div>
      )}
    </>
  );
}
