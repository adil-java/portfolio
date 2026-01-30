import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name}`,
};

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black py-6 md:py-10 print:bg-white print:py-0">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        
        {/* HERO SECTION - Full Width */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 rounded-2xl p-6 sm:p-8 md:p-10 bg-white/90 dark:bg-gray-800/80 shadow-lg mb-8 print:bg-transparent print:shadow-none">
          <Avatar className="w-32 h-32 sm:w-36 sm:h-36 border-4 border-indigo-500/60 dark:border-indigo-400/60 shrink-0">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {RESUME_DATA.name}
              </h1>
              <p className="flex items-center justify-center md:justify-start gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
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
            </div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400 max-w-2xl">
              {RESUME_DATA.about}
            </p>
            {/* CONTACT ICONS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
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
              {/* Download CV - visible on larger screens */}
              <Button variant="default" className="hidden lg:inline-flex gap-2 bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                <a href="/AdilJaved_CV.pdf" download aria-label="Download CV">
                  <DownloadIcon className="w-4 h-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* SKILLS + EDUCATION + CERTIFICATES - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* SKILLS */}
          <Section className="rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills.map((skill) => (
                <Badge key={skill} className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-2.5 py-1 rounded-full">
                  {skill}
                </Badge>
              ))}
            </div>
          </Section>

          {/* EDUCATION */}
          <Section className="rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">Education</h2>
            {RESUME_DATA.education.map((education) => (
              <Card key={education.school} className="bg-transparent shadow-none border-0">
                <CardHeader className="p-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {education.school}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {education.degree}
                  </p>
                                   <Badge className="text-xs px-2 py-0.5 font-normal hover:bg-gray-100  bg-gray-50  text-gray-500 mt-1">

                    {education.start} – {education.end}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </Section>

          {/* CERTIFICATES */}
          <Section className="rounded-xl p-5 sm:p-6 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">Certificates</h2>
            <div className="space-y-3">
              {RESUME_DATA.certificates.map((certificate) => (
                <div key={certificate.name} className="flex items-start gap-2">
                  
                  <div>
                    <h3 className="font-medium dark:text-gray-100 text-sm">
                      {certificate.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {certificate.issuer}
                    </p>
                  <Badge className="text-xs px-2 py-0.5 font-normal hover:bg-gray-100  bg-gray-50  text-gray-500 mt-1">
                    {certificate.date}
                  </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* PROJECTS - Bento Grid Layout */}
        <Section className="rounded-xl p-4 sm:p-6 md:p-8 bg-white/90 dark:bg-gray-800/80 shadow-lg print:bg-transparent print:shadow-none">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-gray-200">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {RESUME_DATA.projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.techStack}
                link={"link" in project ? project.link.href : undefined}
                size={"size" in project ? project.size : "medium"}
              />
            ))}
          </div>
        </Section>
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
