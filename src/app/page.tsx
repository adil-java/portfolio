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
    <main className="container mx-auto  p-6 md:p-16 shadow-xl rounded-lg overflow-hidden">
      <section className="mx-auto max-w-2xl space-y-10 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">{RESUME_DATA.name}</h1>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank" >
                <GlobeIcon className="size-3" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-2 pt-2">
              {RESUME_DATA.contact.email && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <MailIcon className="size-4 text-blue-500 hover:scale-110 transition-transform" />
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.tel && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`tel:${RESUME_DATA.contact.tel}`}>
                    <PhoneIcon className="size-4 text-green-500 hover:scale-110 transition-transform" />
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.social.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <a href={social.url}>
                    <social.icon className="size-4 hover:scale-110 transition-transform" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <Avatar className="size-24 border-2 border-gray-300 shadow-md rounded-lg hover:scale-105 transition-transform">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
        
        {/* About Section */}
        <div className="">
          <h2 className="text-xl font-bold text-gray-700">About Me</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{RESUME_DATA.about}</p>
        </div>

        <Section>
          <h2 className="text-xl font-bold text-gray-700">Education</h2>
          {RESUME_DATA.education.map((education) => (
            <Card key={education.school} className="bg-gray-50 ">
              <CardHeader>
                <div className="flex justify-between text-base">
                  <h3 className="font-semibold text-gray-800">{education.school}</h3>
                  <span className="text-sm text-gray-500">{education.start} - {education.end}</span>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">{education.degree}</CardContent>
            </Card>
          ))}
        </Section>

       <Section style={{ maxHeight: "150px", overflow: "auto" }}>
  <h2 className="text-xl font-bold text-gray-700">Skills</h2>
  <div className="flex flex-wrap gap-2">
    {RESUME_DATA.skills.map((skill) => (
      <Badge key={skill} className="text-sm bg-grey-300 text-stone-800 hover:text-white px-3 py-1 shadow-md">
        {skill}
      </Badge>
    ))}
  </div>
</Section>


     <section className="projects-section print-force-new-page">
  <Section>
    <h2 className="text-xl font-bold text-gray-700">Projects</h2>
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-1 print:gap-2">
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
