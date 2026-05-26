"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon, DownloadIcon, BookOpenIcon, GitForkIcon, StarIcon, PinIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppForm } from "@/components/whatsapp-form";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"Pinned" | "projects">("Pinned");

  return (
    <main className="min-h-screen w-full bg-white dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9] transition-colors duration-200 print:bg-white print:text-black">

      {/* ── Top Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#30363d] print:hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              {/* <svg className="w-5 h-5 text-gray-700 dark:text-white" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg> */}
              <img width="20" height="20" src="./apple-icon.png" alt="initials" />
              {RESUME_DATA.name}
            </span>
            {/* <div className="hidden md:flex items-center gap-1">
              {["About", "Experience", "Projects", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => {
                    if (item === "Projects") {
                      e.preventDefault();
                      setActiveTab("projects");
                      document.getElementById("tab-navigation")?.scrollIntoView({ behavior: "smooth" });
                    } else if (item === "About") {
                      setActiveTab("  Pinned");
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-[#8b949e] hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-[#21262d] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-md text-xs font-medium border-gray-300 dark:border-[#30363d] bg-gray-50 dark:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] hover:bg-gray-100 dark:hover:bg-[#30363d] hover:border-gray-400 dark:hover:border-[#8b949e]" asChild>
              <a href="https://adil-java.github.io/AdilJaved_CV.pdf" target="_blank" rel="noopener noreferrer">
                <DownloadIcon className="w-3.5 h-3.5 mr-1.5" />
                Resume
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════════════════════════════════════════════
            PROFILE HEADER — GitHub style
        ══════════════════════════════════════════════════ */}
        <section id="about" className="py-8 lg:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 border-b border-gray-200 dark:border-[#21262d]">
          {/* Left: Avatar + Meta */}
          <div className="flex flex-col items-center lg:items-start shrink-0 lg:w-[296px]">
            <Avatar className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-2 border-gray-200 dark:border-[#30363d] shadow-md">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback className="text-4xl font-bold bg-gray-100 dark:bg-[#21262d] text-gray-600 dark:text-[#8b949e]">{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center lg:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{RESUME_DATA.name}</h1>
              <p className="text-lg font-light text-gray-500 dark:text-[#8b949e] mt-0.5">adil-java</p>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-[#8b949e] text-center lg:text-left leading-relaxed">{RESUME_DATA.about}</p>

            {/* Status */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 dark:text-[#8b949e]">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Available for opportunities
            </div>

            {/* Social buttons */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start w-full">
              {RESUME_DATA.contact.email && (
                <a href={`mailto:${RESUME_DATA.contact.email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] hover:bg-gray-100 dark:hover:bg-[#30363d] transition-colors">
                  <MailIcon className="w-3.5 h-3.5" /> Email
                </a>
              )}
              {RESUME_DATA.contact.tel && (
                <a href={`tel:${RESUME_DATA.contact.tel}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] hover:bg-gray-100 dark:hover:bg-[#30363d] transition-colors">
                  <PhoneIcon className="w-3.5 h-3.5" /> Phone
                </a>
              )}
              {RESUME_DATA.contact.social.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] hover:bg-gray-100 dark:hover:bg-[#30363d] transition-colors">
                  <social.icon className="w-3.5 h-3.5" /> {social.name}
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="mt-4 flex items-center gap-1.5 text-sm text-gray-600 dark:text-[#8b949e]">
              <GlobeIcon className="w-4 h-4" />
              <a href={RESUME_DATA.locationLink} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 dark:hover:text-[#58a6ff]">{RESUME_DATA.location}</a>
            </div>
          </div>

          {/* Right: Dynamic Subviews based on tabs */}
          <div className="flex-2 min-w-0 space-y-6">
            {/* EDUCATION & CERTIFICATES */}
            <section className="py-2 border-b border-gray-200 dark:border-[#21262d]">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-[#8b949e]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
                    Education
                  </h2>
                  <div className="space-y-4">
                    {RESUME_DATA.education.map((edu) => (
                      <div key={edu.school} className="p-4 rounded-lg border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117]">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{edu.school}</h3>
                        <p className="text-xs text-gray-500 dark:text-[#8b949e] mt-1">{edu.degree}</p>
                        <span className="inline-block mt-2 text-xs font-mono text-gray-400 dark:text-[#484f58]">{edu.start} – {edu.end}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* WORK EXPERIENCE */}
                {RESUME_DATA.work && RESUME_DATA.work.length > 0 && (
                  <section id="experience" className="py-2 border-b border-gray-200 dark:border-[#21262d]">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500 dark:text-[#8b949e]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Work Experience
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {RESUME_DATA.work.map((work) => (
                        <div key={work.company} className="p-4 rounded-lg border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117]">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                {work.title}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-[#8b949e] mt-0.5">
                                {work.link ? (
                                  <a href={work.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-[#58a6ff] hover:underline">
                                    {work.company}
                                  </a>
                                ) : (
                                  work.company
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 mt-1 sm:mt-0">
                              <span className="text-xs font-mono text-gray-400 dark:text-[#484f58]">
                                {work.start} – {work.end}
                              </span>
                              {work.badges && work.badges.map((badge) => (
                                <span key={badge} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-50 dark:bg-[#238636]/10 text-green-700 dark:text-[#3fb950] border border-green-200/50 dark:border-[#238636]/30">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>

                          {work.description && (
                            <p className="text-xs text-gray-500 dark:text-[#8b949e] mt-3 leading-relaxed">
                              {work.description}
                            </p>
                          )}

                          {work.technologies && work.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {work.technologies.map((tech) => (
                                <code key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#1c2128] text-gray-600 dark:text-[#8b949e] font-mono">
                                  {tech}
                                </code>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-[#8b949e]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                    Certificates
                  </h2>
                  <div className="space-y-4">
                    {RESUME_DATA.certificates.map((cert) => (
                      <div key={cert.name} className="p-4 rounded-lg border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117]">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{cert.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-[#8b949e] mt-1">{cert.issuer}</p>
                        <span className="inline-block mt-2 text-xs font-mono text-gray-400 dark:text-[#484f58]">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* TECHNICAL SKILLS — Card Row Style */}
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-[#8b949e] uppercase tracking-wider mb-3">
                Technical Skills
              </h3>

              <div className="p-4 rounded-lg border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117] space-y-2.5 text-xs text-gray-700 dark:text-[#c9d1d9] leading-relaxed">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">Languages: </span>
                  <span className="text-gray-600 dark:text-[#8b949e]">{RESUME_DATA.skills.languages.join(", ")}</span>
                </div>

                <div className="border-t border-gray-100 dark:border-[#21262d] pt-2.5">
                  <span className="font-bold text-gray-900 dark:text-white">Frameworks & Libraries: </span>
                  <span className="text-gray-600 dark:text-[#8b949e]">{RESUME_DATA.skills.frameworks.join(", ")}</span>
                </div>

                <div className="border-t border-gray-100 dark:border-[#21262d] pt-2.5">
                  <span className="font-bold text-gray-900 dark:text-white">Databases & Tools: </span>
                  <span className="text-gray-600 dark:text-[#8b949e]">{RESUME_DATA.skills.databasesAndTools.join(", ")}</span>
                </div>

                <div className="border-t border-gray-100 dark:border-[#21262d] pt-2.5">
                  <span className="font-bold text-gray-900 dark:text-white">AI & Emerging Tech: </span>
                  <span className="text-gray-600 dark:text-[#8b949e]">{RESUME_DATA.skills.aiAndLibraries.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* ── Dynamic Tab-like Header ── */}
            <div id="tab-navigation" className="flex items-center gap-4 border-b border-gray-200 dark:border-[#21262d] pb-2">
              <button
                onClick={() => setActiveTab("Pinned")}
                className={`flex items-center gap-1.5 text-sm font-medium pb-2 -mb-[10px] transition-colors border-b-2 ${activeTab === "Pinned"
                  ? "font-semibold text-gray-900 dark:text-white border-orange-500 dark:border-[#f78166]"
                  : "text-gray-500 dark:text-[#8b949e] border-transparent hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <PinIcon className="w-4 h-4" />
                5 Pinned
              </button>

              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center gap-1.5 text-sm font-medium pb-2 -mb-[10px] transition-colors border-b-2 ${activeTab === "projects"
                  ? "font-semibold text-gray-900 dark:text-white border-orange-500 dark:border-[#f78166]"
                  : "text-gray-500 dark:text-[#8b949e] border-transparent hover:text-gray-900 dark:hover:text-white"
                  }`}
              >


                <GitForkIcon className="w-4 h-4" />
                <span>{RESUME_DATA.projects.length} Projects</span>
              </button>
            </div>

            {/* ── Tab View Conditionals ── */}
            {activeTab === "Pinned" ? (
              <>


                {/* PINNED PROJECTS (Top 4) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-[#8b949e] uppercase tracking-wider">Pinned Projects</h3>
                    <button onClick={() => setActiveTab("projects")} className="text-xs text-blue-600 dark:text-[#58a6ff] hover:underline">View all repositories</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {RESUME_DATA.projects.slice(0, 5).map((project) => (
                      <a key={project.title} href={"link" in project ? project.link.href : "#"} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117] hover:border-gray-400 dark:hover:border-[#8b949e] transition-colors group">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpenIcon className="w-4 h-4 text-gray-400 dark:text-[#8b949e]" />
                          <span className="text-sm font-semibold text-blue-600 dark:text-[#58a6ff] group-hover:underline truncate">{project.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-[#8b949e] line-clamp-2 leading-relaxed mb-3">{project.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-[#8b949e]">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span key={tech} className="flex items-center gap-1">
                              <span className={`w-3 h-3 rounded-full ${i % 5 === 0 ? "bg-yellow-400 dark:bg-[#f1e05a]" :
                                i % 5 === 1 ? "bg-blue-400 dark:bg-[#3178c6]" :
                                  i % 5 === 2 ? "bg-green-500 dark:bg-[#3fb950]" :
                                    i % 5 === 3 ? "bg-purple-400 dark:bg-[#a855f7]" :
                                      "bg-red-400 dark:bg-[#f97583]"
                                }`} />
                              {tech}
                            </span>
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* ══════════════════════════════════════════════════
                  ALL REPOSITORIES
                 ══════════════════════════════════════════════════ */
              <section id="projects" className="py-2">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-[#8b949e]" />
                  All Projects
                </h2>
                <div className="space-y-0 divide-y divide-gray-200 dark:divide-[#21262d]">
                  {RESUME_DATA.projects.map((project) => (
                    <div key={project.title} className="py-5 first:pt-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <a href={"link" in project ? project.link.href : "#"} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-blue-600 dark:text-[#58a6ff] hover:underline">{project.title}</a>
                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full border border-gray-300 dark:border-[#30363d] text-gray-500 dark:text-[#8b949e] leading-none">Public</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-[#8b949e] mt-1.5 leading-relaxed max-w-2xl">{project.description}</p>
                          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500 dark:text-[#8b949e]">
                            {project.techStack.map((tech, i) => (
                              <span key={tech} className="flex items-center gap-1.5">
                                <span className={`w-3 h-3 rounded-full ${i % 5 === 0 ? "bg-yellow-400 dark:bg-[#f1e05a]" :
                                  i % 5 === 1 ? "bg-blue-400 dark:bg-[#3178c6]" :
                                    i % 5 === 2 ? "bg-green-500 dark:bg-[#3fb950]" :
                                      i % 5 === 3 ? "bg-purple-400 dark:bg-[#a855f7]" :
                                        "bg-red-400 dark:bg-[#f97583]"
                                  }`} />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <a href={"link" in project ? project.link.href : "#"} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex justify-content items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] text-gray-700 dark:text-[#c9d1d9] hover:bg-gray-100 dark:hover:bg-[#30363d] transition-colors mt-2 sm:mt-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                          View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CONTACT — WhatsApp Form (Centered)
        ══════════════════════════════════════════════════ */}
        <section id="contact" className="py-8 lg:py-12 flex flex-col items-center">
          <div className="w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-2">
              <MailIcon className="w-4 h-4 text-gray-500 dark:text-[#8b949e]" />
              Get in Touch
            </h2>
            <WhatsAppForm />
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-[#21262d] py-8 print:hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-[#484f58]">© {new Date().getFullYear()} {RESUME_DATA.name}. Built with Next.js</p>
          <div className="flex items-center gap-3">
            {RESUME_DATA.contact.social.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-[#484f58] hover:text-gray-600 dark:hover:text-[#8b949e] transition-colors">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Command Menu */}
      <CommandMenu
        links={RESUME_DATA.contact.social.map((social) => ({
          url: social.url,
          title: social.name,
        }))}
      />
    </main>
  );
}