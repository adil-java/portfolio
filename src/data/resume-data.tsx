import { GitHubIcon, LeetCodeIcon, LinkedInIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Adil Javed",
  initials: "AJ",
  location: "Karachi Pakistan ,PAK",
  locationLink: "https://www.google.com/maps/place/Karachi",
  about:
    "I am a Full Stack Developer with a deep interest in the architectural side of technology. While I'm proficient across the MERN stack, I am currently leveling up my expertise in DevOps, Redis, and System Design to build more scalable and resilient applications. I thrive on the challenge of optimizing performance and automating workflows. I love turning complex ideas into functional projects and am always looking to connect with fellow tech enthusiasts to collaborate and grow.",
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
      {
        name: "LeetCode",
        url: "https://leetcode.com/u/AdilJavaa/",
        icon: LeetCodeIcon,
      }

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
  work: [
    {
      company: "Shifted Sol",
      link: "",
      badges: ["Hybrid"],
      title: "Entry Level React TypeScript Developer",
      start: "Feb 2026",
      end: "Present",
      description: null,
      technologies: ["ReactJs", "TypeScript", "MSSQL", "Docker", "Dot Net Core"]
    },
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "C++", "C#"],
    frameworks: ["React JS", "React Native", "Node JS", "Express JS", "FastApi", "TailwindCSS"],
    databasesAndTools: ["Kubernetes", "Docker", "Redis", "Postgres SQL", "Mongo DB", "MYSQL", "Firebase", "Stripe"],
    aiAndLibraries: ["Google Gemini", "Rag", "OpenCv", "Window form"]
  },
  projects: [
    {
      title: "GreenBuddy - AI Plant Disease Diagnoser",
      techStack: [
        "Python",
        "EfficientNet",
        "Rag",
        "React Native",
        "FastApi",
        "Google Gemini",
        "MongoDB",
      ],
      description:
        "An AI-powered agricultural health platform featuring an image classification model trained on the PlantVillage dataset to accurately identify plant diseases. It integrates a custom Retrieval-Augmented Generation (RAG) pipeline powered by the Gemini API to deliver contextual treatment strategies, organic remedies, and precise chemical recommendations to farmers based on localized diagnoses.",
      logo: null,
      size: "large" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/greenBuddy-Backend",
      }
    },
    {
      title: "HomeFit - AR-Based Furniture App",
      techStack: [
        "React Native",
        "Firebase",
        "ViroReact",
        "MySQL",
        "Node JS",
        "Express JS",
        "Stripe",
        "Augmented Reality"
      ],
      description:
        "An AR-based furniture shopping application that allows users to preview furniture in their real living space with accurate scale and placement. Sellers can upload standard 2D product images which are automatically converted into interactive 3D models. The platform includes Stripe Connect for secure end-to-end payments between buyers and sellers, along with a web-based admin panel to manage users, sellers, and product listings.",
      logo: null,
      size: "large" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/HomeFit",
      }
    },
    {
      title: "SmartWear - Real-Time Glasses Filter",
      techStack: [
        "Python",
        "Computer Vision",
        "OpenCv"
      ],
      description:
        "A computer vision application designed to automatically overlay digital eyewear directly onto a user's face in real time. Utilizing OpenCV feature mapping, the system tracks facial structures from a live camera feed, calculates exact eye coordinates, dynamic distances, and rotation angles, and applies real-time image transformations to scale, rotate, and blend the glasses overlay seamlessly during movement.",
      logo: null,
      size: "large" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/Open-Cv-Glasses-placing.git",
      }
    },
    {
      title: "NED Events",
      techStack: [
        "React JS",
        "MySQL",
        "Node JS",
        "Express JS",
        "TailwindCSS",

      ],
      description:
        "NED - Events is a platform for student societies at NED to promote events and for students to discover and attend them. It connects organizers with vendors and fosters community engagement among students.",
      logo: "NED-Events",
      size: "medium" as const,
      link: {
        label: "render.com",
        href: "https://ned-events-frontend.onrender.com",
      },
    },
    {
      title: "PDF-to-Quiz Generator",
      techStack: [
        "Google Gemini",
        "Typescript",
        "Reactjs",
        "Nodejs",
        "TailwindCSS",

      ],
      description:
        "Built PDF-to-Quiz Generator, an intelligent web app that transforms uploaded PDFs into auto-generated notes and quizzes using Google’s Gemini API. It’s designed to help students and educators save time, automate revision, and generate quizzes instantly from study materials.",
      logo: "PDF-to-Quiz", size: "large" as const, link: {
        label: "vercel.com",
        href: "https://pdf-to-quiz-app.vercel.app/",
      },
    }, {
      title: "Blogger",
      techStack: ["React js", "Node js", "Express js", "MongoDB", "TailwindCSS"],
      description:
        "A full-stack blogging platform where users can create, edit, and publish blog posts with rich text editing, user authentication, and comment functionality.",
      logo: null,
      size: "small" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/Blogger",
      },
    }
    , {
      title: "Food App",
      techStack: [
        "Reactjs",
        "MongoDB",
        "Nodejs",
        "Expressjs",
        "TailwindCSS",

      ],
      description:
        "An online food application where users can place orders and sell food items",
      logo: null,
      size: "small" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/FoodApp",
      },
    },
    {

      title: "Library MS",
      techStack: ["C#", "Window form", "SQL"],
      description:
        "A Library Management System used to maintain records of books, students, and librarians",
      logo: null,
      size: "small" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/OOPS-Project.git",
      },
    },
    {

      title: "Pandemic Simulation System",
      techStack: ["C++", "DSA"],
      description:
        "A system designed to simulate the spread of a pandemic across various regions and analyze the effects of different intervention strategies, such as lockdowns, vaccinations, and health care resource allocation.",
      logo: null,
      size: "medium" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/DSA-Project.git",
      },
    },
    {

      title: "code Collab",
      techStack: ["Node js", "React js", "socket.io"],
      description:
        "A real-time collaborative code editor that allows multiple users to edit code simultaneously and see changes in real-time.",
      logo: '../app/collaboration.png',
      size: "medium" as const,
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/code-Collab.git",
      },
    },


  ],
  certificates: [
    {
      name: "Introduction to Deep Learning with PyTorch",
      issuer: "DataCamp",
      date: "January 2026",
    },
    {
      name: "React JS Web Development – The Essentials Bootcamp",
      issuer: "Udemy",
      date: "July 2025",
    },
  ],

} as const;
