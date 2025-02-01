import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Adil Javed",
  initials: "AJ",
  location: "Karachi Pakistan ,PAK",
  locationLink: "https://www.google.com/maps/place/Karachi",
  about:
  "I am a software engineering student learning the MERN stack. I am working with MongoDB, Express.js, React, and Node.js. I am very interested in backend development and want to get better at it. I enjoy learning new things and applying them to projects. I am excited to work on new ideas and meet others who love technology.",
  avatarUrl: "https://avatars.githubusercontent.com/u/145782640?v=4",
  
  contact: {
    email: "adiljavaid125@gmail.com",
    tel: "+923312755830",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/adil-java",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/adil-javed082004/",
        icon: LinkedInIcon,
      },
     
    ],
  },
  education: [
    {
      school: "NED University of Engineering and Technology",
      degree: "Bachelor of Software Engineering",
      start: "2023",
      end: "2027",
    },
  
  ],
  work:null,
  skills: [
    "Python3",
    "JavaScript",
    "HTML",
    "CSS",
    "TailwindCSS",
    "ReactJS",
    "NodeJS",
    "ExpressJS",
    "PostgresSQL"
    
  ],
   projects: [
    {
      title: "Food App",
      techStack: [
        "Node.js",
        "React js",
        "MongoDB",
        "Express.js",
        
      ],
      description:
        "It is the online Food application where user can order and sell ",
      logo:null,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/FoodApp",
      },
    },
    {
      
      title: "Library MS",
      techStack: ["c#" ,"Window form", "SQL"],
      description:
        "A library Mangement system which is use to keep record of Books",
        logo:null,
        link: {
          label: "github.com",
          href: "https://github.com/adil-java/OOPS-Project.git",
        },
    },
  ],
} as const;
