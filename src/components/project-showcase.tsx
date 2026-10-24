"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

type Project = (typeof RESUME_DATA.projects)[number];
type ProjectTab = "selected" | "all";

type SelectedWork = {
  titlePrefix: string;
  displayName: string;
  description: string;
  technologies: readonly string[];
};

const SELECTED_WORK: readonly SelectedWork[] = [
  {
    titlePrefix: "GreenBuddy",
    displayName: "GreenBuddy",
    description:
      "Identifies plant diseases from images and delivers contextual treatment guidance through a mobile app.",
    technologies: ["FastAPI", "EfficientNet", "RAG"],
  },
  {
    titlePrefix: "HomeFit",
    displayName: "HomeFit",
    description:
      "Preview furniture in your own space, with seller listings, payments, and an admin dashboard in one app.",
    technologies: ["React Native", "ViroReact", "Stripe"],
  },
  {
    titlePrefix: "All-in-One File Editor",
    displayName: "All-in-One File Editor",
    description:
      "Edits PDFs, documents, spreadsheets, and slides fully offline, with annotations, signatures, form filling, and live formulas.",
    technologies: ["React Native", "Expo", "pdf-lib"],
  },
  {
    titlePrefix: "WhatsApp Campaign",
    displayName: "WhatsApp Campaign Sender",
    description:
      "Connects to WhatsApp Web by QR code and sends personalized, scheduled campaign messages to imported contacts.",
    technologies: ["Next.js", "TypeScript", "whatsapp-web.js"],
  },
];

const selectedProjects = SELECTED_WORK.flatMap((presentation) => {
  const project = RESUME_DATA.projects.find((entry) =>
    entry.title.startsWith(presentation.titlePrefix),
  );
  return project ? [{ project, presentation }] : [];
});

function isSourceLink(href: string) {
  try {
    const hostname = new URL(href).hostname.toLowerCase();
    return hostname === "github.com" || hostname === "www.github.com";
  } catch {
    return false;
  }
}

function ProjectCard({
  project,
  presentation,
  selected,
}: {
  project: Project;
  presentation?: SelectedWork;
  selected: boolean;
}) {
  const title = presentation?.displayName ?? project.title.split(" - ")[0];
  const description =
    selected && presentation ? presentation.description : project.description;
  const technologies =
    presentation?.technologies ?? project.techStack.slice(0, 3);
  const action = isSourceLink(project.link.href) ? "View source" : "Open app";
  return (
    <article className="project-card">
      <div className="project-card-head">
        <span className="project-mark" aria-hidden="true">
          {project.logo ? (
            <Image src={project.logo} alt="" width={42} height={42} />
          ) : (
            <FolderGit2 size={21} strokeWidth={1.6} />
          )}
        </span>
        <div className="project-heading">
          <h3>
            <a
              className="project-title"
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          </h3>
          <p className="project-category">{project.category}</p>
        </div>
      </div>
      <p className="project-description">{description}</p>
      <ul className="project-tech" aria-label={`${title} technologies`}>
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div className="project-footer">
        <a
          className="project-action"
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${action}: ${title} (opens in a new tab)`}
        >
          {action}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState<ProjectTab>("selected");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const tabs: readonly { id: ProjectTab; label: string; count: number }[] = [
    { id: "selected", label: "Selected work", count: selectedProjects.length },
    { id: "all", label: "All projects", count: RESUME_DATA.projects.length },
  ];

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="project-showcase">
      <div className="project-section-header">
        <h2>Projects</h2>
        <span className="project-count">
          {RESUME_DATA.projects.length} projects
        </span>
      </div>
      <div className="project-tabs" role="tablist" aria-label="Project views">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            className="project-tab"
            type="button"
            role="tab"
            id={`${id}-${tab.id}-tab`}
            aria-selected={activeTab === tab.id}
            aria-controls={`${id}-${tab.id}-panel`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => navigateTabs(event, index)}
          >
            {tab.label}
            <span className="project-count">{tab.count}</span>
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          className="project-panel"
          key={tab.id}
          role="tabpanel"
          id={`${id}-${tab.id}-panel`}
          aria-labelledby={`${id}-${tab.id}-tab`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
        >
          {activeTab === tab.id && (
            <div className="project-grid">
              {tab.id === "selected"
                ? selectedProjects.map(({ project, presentation }) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      presentation={presentation}
                      selected
                    />
                  ))
                : RESUME_DATA.projects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      presentation={SELECTED_WORK.find((entry) =>
                        project.title.startsWith(entry.titlePrefix),
                      )}
                      selected={false}
                    />
                  ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
