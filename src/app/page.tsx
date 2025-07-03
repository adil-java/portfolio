import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name}`,
};

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black py-6 md:py-10 print:bg-white print:py-0">
      <div className="container mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
        {/* GRID WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 print:grid-cols-1">
          {/* PROFILE + ABOUT + SKILLS */}
          <aside className="space-y-8 lg:col-span-1 order-first print:order-first">
            {/* PROFILE */}
            <section className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-indigo-500/60 dark:border-indigo-400/60">
                <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
                <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {RESUME_DATA.name}
                </h1>
                <p className="flex items-center justify-center lg:justify-start gap-1 text-sm text-gray-700 dark:text-gray-300">
                  <GlobeIcon className="w-4 h-4" />
                  <a
                    href={RESUME_DATA.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {RESUME_DATA.location}
                  </a>
                </p>
                {/* CONTACT ICONS */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
                  {RESUME_DATA.contact.email && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${RESUME_DATA.contact.email}`} aria-label="Email">
                        <MailIcon className="w-5 h-5" />
                      </a>
                    </Button>
                  )}
                  {RESUME_DATA.contact.tel && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={`tel:${RESUME_DATA.contact.tel}`} aria-label="Phone">
                        <PhoneIcon className="w-5 h-5" />
                      </a>
                    </Button>
                  )}
                  {RESUME_DATA.contact.social.map((social) => (
                    <Button key={social.name} variant="outline" size="icon" asChild>
                      <a href={social.url} aria-label={social.name}>
                        <social.icon className="w-5 h-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <Section className="rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-200">About Me</h2>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {RESUME_DATA.about}
              </p>
            </Section>

            {/* SKILLS */}
            <Section className="rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-200">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.map((skill) => (
                  <Badge key={skill} className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-2.5 py-1 rounded-full">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Section>
          </aside>

          {/* EDUCATION & PROJECTS */}
          <div className="space-y-8 lg:col-span-2">
            {/* EDUCATION */}
            <Section className="rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">Education</h2>
              {RESUME_DATA.education.map((education) => (
                <Card key={education.school} className="bg-white dark:bg-gray-800/90 shadow-none border border-gray-200 dark:border-gray-700 mb-4 last:mb-0">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {education.school}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {education.start} – {education.end}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 dark:text-gray-300">
                    {education.degree}
                  </CardContent>
                </Card>
              ))}
            </Section>

            {/* PROJECTS */}
            <Section className="rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RESUME_DATA.projects.map((project) => (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    tags={project.techStack}
                    link={"link" in project ? project.link.href : undefined}
                  />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* QUICK COMMAND MENU */}
      <CommandMenu
        links={RESUME_DATA.contact.social.map((social) => ({
          url: social.url,
          title: social.name,
        }))}
      />
    </main>
  );
}
