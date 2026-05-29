"use client";

import React, { useEffect, useState, useRef } from "react";

// List of all the available skill images in public/skills
const SKILL_IMAGES = [
  "/skills/5968381.png",
  "/skills/Csharp_Logo.png",
  "/skills/ISO_C++_Logo.svg.png",
  "/skills/Python-logo-notext.svg.png",
  "/skills/Redis-Logo.wine.svg",
  "/skills/Visual_Studio_Code_1.35_icon.svg.png",
  "/skills/Docker-Logo.png",

  "/skills/expo_logo_icon_145293.png",
  "/skills/fastapi-logo.CrXoa3Er_1303ab.webp",
  "/skills/firebase-logo-firebase-icon-free-png.webp",
  "/skills/javascript-logo-javascript-icon-transparent-free-png.webp",
  "/skills/lg-685660bc962f7-LeetCode.webp",
  "/skills/nest-js-icon.webp",
  "/skills/png-clipart-mongodb-logo-database-nosql-sql-logo-company-text-thumbnail.png",
  "/skills/png-clipart-node-js-logo-node-js-javascript-web-application-express-js-computer-software-others-miscellaneous-text-thumbnail.png",
  "/skills/reactjs_logo_icon_170805.png",
  "/skills/tailwind-css-logo-rounded-free-png.webp",
  "/skills/cursor-ai.png",
  "/skills/NET_Core_Logo.svg.png",
  "/skills/Microsoft_SQL_Server_2025_icon.svg.png",
  "/skills/mysql-logo.svg",
  "/skills/Ar.png"
];

interface FloatingSkill {
  id: number;
  src: string;
  left: number; // percentage
  top: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  animationType: string;
  scrollSpeed: number; // rate of parallax movement
}

export function BackgroundSkills() {
  const [skills, setSkills] = useState<FloatingSkill[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const count = 12; // number of background icons to show
    const newSkills: FloatingSkill[] = [];

    // Shuffle the images to pick a random subset
    const shuffled = [...SKILL_IMAGES].sort(() => 0.5 - Math.random());
    const selectedImages = shuffled.slice(0, count);

    // Grid-based random allocation to prevent bunching up
    // We divide the viewport into 12 virtual grid zones and place one icon in each
    const cols = 4;
    const rows = 3;
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Random position within the grid cell, keeping some margins to avoid edges
      const left = col * cellWidth + 5 + Math.random() * (cellWidth - 15);
      const top = row * cellHeight + 5 + Math.random() * (cellHeight - 15);

      // Random size (32px to 56px - subtle and clean)
      const size = 32 + Math.random() * 24;

      // Random animation details
      const delay = Math.random() * -20; // negative delay so animations start immediately at different points
      const duration = 25 + Math.random() * 20; // 25s to 45s
      const animationType = ["float-slow", "float-slower", "float-slowest"][i % 3];

      // Random speed for parallax scrolling (-0.15 to -0.45)
      // They will scroll up slower than the text, creating a beautiful depth effect
      const scrollSpeed = -0.15 - Math.random() * 0.3;

      newSkills.push({
        id: i,
        src: selectedImages[i],
        left,
        top,
        size,
        delay,
        duration,
        animationType,
        scrollSpeed,
      });
    }

    setSkills(newSkills);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--scroll-y",
          `${window.scrollY}px`
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run handler initially to sync position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (skills.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none print:hidden"
    >
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="absolute opacity-[0.09] dark:opacity-[0.18] transition-opacity duration-1000"
          style={{
            left: `${skill.left}%`,
            top: `${skill.top}%`,
            width: `${skill.size}px`,
            height: `${skill.size}px`,
            transform: `translateY(calc(var(--scroll-y, 0px) * ${skill.scrollSpeed}))`,
            willChange: "transform",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              animation: `${skill.animationType} ${skill.duration}s infinite ease-in-out`,
              animationDelay: `${skill.delay}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.src}
              alt=""
              className="w-full h-full object-contain filter contrast-100 brightness-100 transition-all duration-300"
              onError={(e) => {
                // Hide image if it fails to load
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
