import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LeetCodeIcon, LinkedInIcon } from "@/components/icons";

type SocialLink = {
  name: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type EducationEntry = {
  school: string;
  link: string;
  degree: string;
  start: string;
  end: string;
  logo?: string;
};

type WorkEntry = {
  company: string;
  link: string;
  badges: string[];
  title: string;
  start: string;
  end: string;
  description: string | null;
  logo?: string;
  technologies?: string[];
};

export type ProjectCategory = "AI & vision" | "Software & web" | "Mobile apps" | "Mobile & AR";

type ProjectEntry = {
  title: string;
  category: ProjectCategory;
  techStack: string[];
  description: string;
  logo: string | null;
  size: "small" | "medium" | "large";
  link: {
    label: string;
    href: string;
  };
};

type CertificateEntry = {
  name: string;
  issuer: string;
  date: string;
};

type ResumeData = {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  role: string;
  about: string;
  avatarUrl: string;
  contact: {
    email: string;
    tel: string;
    social: SocialLink[];
  };
  education: EducationEntry[];
  work: WorkEntry[];
  skills: {
    languages: string[];
    frameworks: string[];
    databasesAndTools: string[];
    aiAndLibraries: string[];
  };
  projects: ProjectEntry[];
  certificates: CertificateEntry[];
};

export const RESUME_DATA: ResumeData = {
  name: "Adil Javed",
  initials: "AJ",
  location: "Karachi, Pakistan",
  locationLink: "https://www.google.com/maps/place/Karachi",
  role: "Software Engineer · Full Stack Developer",
  about:
    "Software Engineering student at NED University and full stack developer. I mostly work with the MERN stack, and I like adding AI where it actually helps. Currently learning DevOps, Redis, and system design.",
  avatarUrl: "/adil-avatar.jpg",
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
      },
    ],
  },
  education: [
    {
      school: "NED University of Engineering and Technology",
      link: "https://www.neduet.edu.pk/",
      degree: "Bachelor of Software Engineering",
      start: "2023",
      end: "Present",
      logo: "/ned-logo.png",
    },
  ],
  work: [
    {
      company: "Jaffer Business Systems",
      link: "https://jbs.live/",
      badges: ["Hybrid"],
      title: "Software Engineer Intern",
      start: "Aug 2026",
      end: "Sep 2026",
      description: null,
      logo: "/skills/jbs-logo.png",
      technologies: ["NestJS", "TypeScript", "PostgreSQL", "Next.js"],
    },
    {
      company: "Shifted Sol",
      link: "https://www.shiftedsol.com/",
      badges: ["Hybrid"],
      title: "React TypeScript Developer",
      start: "Feb 2026",
      end: "May 2026",
      description: null,
      logo: "/skills/ShiftedSolLogo.png",
      technologies: [
        "React",
        "TypeScript",
        "SQL Server",
        "Docker",
        ".NET Core",
      ],
    },
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "C++", "C#"],
    frameworks: [
      "React",
      "React Native",
      "Node.js",
      "Express",
      "FastAPI",
      "Tailwind CSS",
    ],
    databasesAndTools: [
      "Kubernetes",
      "Docker",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Firebase",
      "Stripe",
    ],
    aiAndLibraries: ["Google Gemini", "RAG", "OpenCV", "Vector Databases"],
  },
  projects: [
    {
      title: "WhatsApp Campaign Message Sender",
      category: "Software & web",
      techStack: [
        "Next.js",
        "TypeScript",
        "whatsapp-web.js",
        "Tailwind CSS",
        "Vitest",
      ],
      description:
        "A web app that connects to WhatsApp Web by QR code and sends personalized campaign messages one at a time. Imports Google Contacts or plain CSV files into an editable contacts table, normalizes international phone numbers, and supports scheduled sends.",
      logo: "/projects/whatsapp-campaign.png",
      size: "large",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/Whatsapp-bulk-msg-sender",
      },
    },
    {
      title: "All-in-One File Editor - React Native App",
      category: "Mobile apps",
      techStack: [
        "React Native",
        "Expo",
        "TypeScript",
        "pdf-lib",
        "PDF.js",
      ],
      description:
        "An offline mobile app for editing PDF, Word, Excel, and PowerPoint files, all on the device. Annotate, sign, fill forms, and edit a PDF's own text; edit spreadsheet cells and formulas; change slide text without losing the design; and keep notes and to-do lists.",
      logo: "/projects/file-editor.png",
      size: "large",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/Mobile-PDF-Editor",
      },
    },
    {
      title: "GreenBuddy - AI Plant Disease Diagnoser",
      category: "AI & vision",
      techStack: [
        "Python",
        "EfficientNet",
        "RAG",
        "React Native",
        "FastAPI",
        "Google Gemini",
        "MongoDB",
      ],
      description:
        "A plant health platform that identifies diseases from images using EfficientNet. A Gemini-powered RAG pipeline provides contextual treatment guidance through a mobile app.",
      logo: "/projects/greenbuddy.png",
      size: "large",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/greenBuddy-Backend",
      },
    },
    {
      title: "HomeFit - AR-Based Furniture App",
      category: "Mobile & AR",
      techStack: [
        "React Native",
        "Firebase",
        "ViroReact",
        "MySQL",
        "Node.js",
        "Express",
        "Stripe",
        "Augmented Reality",
      ],
      description:
        "An AR shopping app for previewing furniture in your own space. Combines 2D-to-3D product models, Stripe Connect payments, and an admin dashboard for sellers and listings.",
      logo: "/projects/homefit.png",
      size: "large",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/HomeFit",
      },
    },
    {
      title: "SmartWear - Real-Time Glasses Filter",
      category: "AI & vision",
      techStack: ["Python", "Computer Vision", "OpenCV"],
      description:
        "A virtual eyewear experience powered by OpenCV. Tracks facial features and adjusts the scale, position, and rotation of glasses as the user moves in front of a live camera.",
      logo: "/projects/smartwear.png",
      size: "large",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/Open-Cv-Glasses-placing.git",
      },
    },
    {
      title: "NED Events",
      category: "Software & web",
      techStack: ["React", "MySQL", "Node.js", "Express", "Tailwind CSS"],
      description:
        "An event discovery platform for NED University. Helps student societies promote events, students find activities, and organizers connect with vendors.",
      logo: "/projects/ned-events.png",
      size: "medium",
      link: {
        label: "render.com",
        href: "https://ned-events-frontend.onrender.com",
      },
    },
    {
      title: "PDF-to-Quiz Generator",
      category: "AI & vision",
      techStack: [
        "Google Gemini",
        "TypeScript",
        "React",
        "Node.js",
        "Tailwind CSS",
      ],
      description:
        "Turns uploaded PDFs into study notes and quizzes with the Gemini API. Gives students and educators a practical way to build revision materials from existing documents.",
      logo: "/projects/pdf-to-quiz.png",
      size: "large",
      link: {
        label: "vercel.com",
        href: "https://pdf-to-quiz-app.vercel.app/",
      },
    },
    {
      title: "Blogger",
      category: "Software & web",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      description:
        "A full-stack blogging platform where users can create, edit, and publish blog posts with rich text editing, user authentication, and comment functionality.",
      logo: "/projects/blogger.png",
      size: "small",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/Blogger",
      },
    },
    {
      title: "Food App",
      category: "Software & web",
      techStack: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
      description:
        "A full stack food ordering application where customers can browse and place orders, and sellers can offer food items.",
      logo: "/projects/food-app.png",
      size: "small",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/FoodApp",
      },
    },
    {
      title: "Library Management",
      category: "Software & web",
      techStack: ["C#", "Windows Forms", "SQL"],
      description:
        "A C# desktop application for managing library records, including books, students, and librarians, backed by a SQL database.",
      logo: "/projects/library-management.png",
      size: "small",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/OOPS-Project.git",
      },
    },
    {
      title: "Pandemic Simulation System",
      category: "Software & web",
      techStack: ["C++", "DSA"],
      description:
        "A system designed to simulate the spread of a pandemic across various regions and analyze the effects of different intervention strategies, such as lockdowns, vaccinations, and health care resource allocation.",
      logo: "/projects/pandemic-simulation.png",
      size: "medium",
      link: {
        label: "github.com",
        href: "https://github.com/adil-java/DSA-Project.git",
      },
    },
    {
      title: "Code Collab",
      category: "Software & web",
      techStack: ["Node.js", "React", "socket.io"],
      description:
        "A real-time collaborative code editor that allows multiple users to edit code simultaneously and see changes in real-time.",
      logo: "/projects/code-collab.png",
      size: "medium",
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
