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
    <main
      className="container mx-auto projects-section print-force-new-page p-4 sm:p-6 md:p-16 shadow-xl rounded-lg overflow-hidden font-mono
                 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      style={{ height: "auto", minHeight: "292mm", padding: "3mm 6mm", overflow: "hidden" }}
    >
      <section
        className="mx-auto max-w-xl sm:max-w-2xl space-y-6 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md
                   dark:shadow-gray-700"
        style={{ height: "auto", maxHeight: "none" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="space-y-3 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-gray-800 dark:text-gray-100">
              {RESUME_DATA.name}
            </h1>
            <p className="max-w-md mx-auto sm:mx-0 flex items-center justify-center sm:justify-start gap-1 text-pretty font-mono text-xs text-muted-foreground dark:text-gray-300">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="w-4 h-4" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
              {RESUME_DATA.contact.email && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <MailIcon className="w-5 h-5 text-blue-500 hover:scale-110 transition-transform" />
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.tel && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`tel:${RESUME_DATA.contact.tel}`}>
                    <PhoneIcon className="w-5 h-5 text-green-500 hover:scale-110 transition-transform" />
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.social.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <a href={social.url}>
                    <social.icon className="w-5 h-5 hover:scale-110 transition-transform text-gray-700 dark:text-gray-300" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <Avatar className="w-24 h-24 border-2 border-gray-300 dark:border-gray-600 shadow-md rounded-lg hover:scale-105 transition-transform">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <h2 className="text-lg font-bold font-mono text-gray-700 dark:text-gray-300">About Me</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed font-mono">
            {RESUME_DATA.about}
          </p>
        </div>

        <Section>
          <h2 className="text-lg font-bold font-mono text-gray-700 dark:text-gray-300">Education</h2>
          {RESUME_DATA.education.map((education) => (
            <Card key={education.school} className="bg-gray-50 dark:bg-gray-700 mb-3">
              <CardHeader>
                <div className="flex justify-between text-base text-gray-800 dark:text-gray-200">
                  <h3 className="font-semibold">{education.school}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {education.start} - {education.end}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-300">
                {education.degree}
              </CardContent>
            </Card>
          ))}
        </Section>

        <Section style={{ maxHeight: "130px", overflow: "auto" }}>
          <h2 className="text-lg font-bold font-mono text-gray-700 dark:text-gray-300">Skills</h2>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {RESUME_DATA.skills.map((skill) => (
              <Badge
                key={skill}
                className="text-sm bg-gray-300 dark:bg-gray-600 text-stone-800 dark:text-stone-200
                           hover:text-white px-3 py-1 shadow-md font-mono"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="text-lg font-bold font-mono text-gray-700 dark:text-gray-300 overflow-auto">Projects</h2>
          <div className="grid grid-cols-1 gap-2 print:grid-cols-1 print:gap-0.5 overflow-auto">
            {RESUME_DATA.projects.map((project) => (
              <div key={project.title} className="print-break">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.techStack}
                  link={"link" in project ? project.link.href : undefined}
                />
              </div>
            ))}
          </div>
        </Section>
      </section>

      <CommandMenu
        links={RESUME_DATA.contact.social.map((social) => ({
          url: social.url,
          title: social.name,
        }))}
      />
    </main>
  );
}
