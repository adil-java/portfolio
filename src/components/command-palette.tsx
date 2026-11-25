"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Briefcase,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  Home,
  MessageCircle,
  Search,
  SunMoon,
} from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

// Desktop visitors only: phones and tablets keep the bottom nav.
const DESKTOP = "(min-width: 1024px) and (pointer: fine)";

const SECTIONS = [
  { id: "about", label: "About", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "tab-navigation", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: MessageCircle },
] as const;

// Same offset the dock uses so headings aren't hidden under the sticky header.
function goToSection(id: string) {
  if (id === "about") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
    const onKey = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        window.matchMedia(DESKTOP).matches
      ) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Close first so the palette is out of the way when the action plays out.
  const run = (action: () => void) => {
    setOpen(false);
    window.setTimeout(action, 120);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DATA.contact.email);
      setToast("Email copied");
    } catch {
      setToast(RESUME_DATA.contact.email);
    }
  };
  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_DATA.contact.tel);
      setToast("Phone Number copied");
    } catch {
      setToast(RESUME_DATA.contact.tel);
    }
  };

  const shortcut = mac ? "⌘" : "Ctrl";

  return (
    <>
      <button
        type="button"
        className="palette-trigger"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
      >
        <Search size={14} aria-hidden="true" />
        <span>Search</span>
        <kbd>{shortcut}K</kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        loop
        // Every typed word must appear, instead of loose letter matching.
        filter={(value, search) =>
          search
            .toLowerCase()
            .split(/\s+/)
            .every((term) => value.includes(term))
            ? 1
            : 0
        }
      >
        <div className="palette-search">
          <Search size={16} aria-hidden="true" />
          <Command.Input placeholder="Search sections, projects, actions…" />
          <kbd>esc</kbd>
        </div>

        <Command.List>
          <Command.Empty>No results. Try “react” or “contact”.</Command.Empty>

          <Command.Group heading="Navigate">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <Command.Item
                key={id}
                value={`go to ${label} section`}
                onSelect={() => run(() => goToSection(id))}
              >
                <span className="palette-icon">
                  <Icon size={15} />
                </span>
                {label}
                <span className="palette-hint">Jump to</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects">
            {RESUME_DATA.projects.map((project) => {
              const title = project.title.split(" - ")[0];
              return (
                <Command.Item
                  key={project.title}
                  value={`${project.title} ${project.category} ${project.techStack.join(" ")}`}
                  onSelect={() =>
                    run(() =>
                      window.open(project.link.href, "_blank", "noopener"),
                    )
                  }
                >
                  <span className="palette-icon palette-logo">
                    {project.logo ? (
                      <Image src={project.logo} alt="" width={20} height={20} />
                    ) : (
                      <FolderGit2 size={15} />
                    )}
                  </span>
                  <span className="palette-title">
                    {title}
                    <small>{project.techStack.slice(0, 3).join(" · ")}</small>
                  </span>
                  <ArrowUpRight size={14} className="palette-hint" />
                </Command.Item>
              );
            })}
          </Command.Group>

          <Command.Group heading="Actions">
            <Command.Item
              value="switch theme dark light mode"
              onSelect={() =>
                run(() =>
                  document.querySelector<HTMLElement>(".theme-toggle")?.click(),
                )
              }
            >
              <span className="palette-icon">
                <SunMoon size={15} />
              </span>
              Switch theme
            </Command.Item>
            <Command.Item
              value="view cv resume pdf"
              onSelect={() =>
                run(() => window.open("/AdilJaved_CV.pdf", "_blank", "noopener"))
              }
            >
              <span className="palette-icon">
                <FileText size={15} />
              </span>
              View CV
              <ArrowUpRight size={14} className="palette-hint" />
            </Command.Item>
            <Command.Item
              value={`copy email ${RESUME_DATA.contact.email}`}
              onSelect={() => run(copyEmail)}
            >
              <span className="palette-icon">
                <Copy size={15} />
              </span>
              Copy email
              <span className="palette-hint">{RESUME_DATA.contact.email}</span>
            </Command.Item>

            <Command.Item
              value={`copy number ${RESUME_DATA.contact.tel}`}
              onSelect={() => run(copyNumber)}
            >
              <span className="palette-icon">
                <Copy size={15} />
              </span>
              Copy Phone Number
              <span className="palette-hint">{RESUME_DATA.contact.tel}</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Links">
            {RESUME_DATA.contact.social.map((social) => (
              <Command.Item
                key={social.name}
                value={`open ${social.name} profile`}
                onSelect={() =>
                  run(() => window.open(social.url, "_blank", "noopener"))
                }
              >
                <span className="palette-icon">
                  <social.icon className="h-[15px] w-[15px]" />
                </span>
                {social.name}
                <ArrowUpRight size={14} className="palette-hint" />
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        <div className="palette-footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>
              <CornerDownLeft size={10} />
            </kbd>{" "}
            open
          </span>
          <span>
            <kbd>{shortcut}</kbd>
            <kbd>K</kbd> toggle
          </span>
        </div>
      </Command.Dialog>

      <div className="palette-toast" data-show={Boolean(toast)} role="status">
        {toast}
      </div>
    </>
  );
}
