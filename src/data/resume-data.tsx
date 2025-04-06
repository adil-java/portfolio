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
      end: "Present",
    },
  
  ],
  work:null,
  skills: [
    "Python3",
    "C++",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "React JS",
    "Node JS",
    "Express JS",
    "Postgres SQL",
    "Mongo DB",
    "MYSQL"
    
  ],
   projects: [
    {
      title: "Food App",
      techStack: [
        "TailwindCSS",
        "Nodejs",
        "Reactjs",
        "MongoDB",
        "Expressjs"
        
      ],
      description:
        "An online food application where users can place orders and sell food items",
      logo:null,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/FoodApp",
      },
    },
    {
      
      title: "Library MS",
      techStack: ["C#" ,"Window form", "SQL"],
      description:
        "A Library Management System used to maintain records of books, students, and librarians",
        logo:null,
        link: {
          label: "github.com",
          href: "https://github.com/adil-java/OOPS-Project.git",
        },
    },
  ],
} as const;
