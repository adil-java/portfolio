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
      title: "NED Events",
      techStack: [
        "TailwindCSS",
        "Nodejs",
        "Reactjs",
        "Expressjs",
        "MySQL"
        
      ],
      description:
        "NED - Events is a platform for student societies at NED to promote events and for students to discover and attend them. It connects organizers with vendors and fosters community engagement among students.",
      logo:"NED-Events",
      link: {
        label: "render.com",
        href: "https://ned-events-frontend.onrender.com",
      },
    }
    ,{
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
    {
      
      title: "code Collab",
      techStack: ["Node js" ,"React js", "socket.io"],
      description:
        "A real-time collaborative code editor that allows multiple users to edit code simultaneously and see changes in real-time.",
        logo:'../app/collaboration.png',
        link: {
          label: "github.com",
          href: "https://github.com/adil-java/code-Collab.git",
        },
    },
  ],
} as const;
