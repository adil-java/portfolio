"use client";

import React from "react";

export function OpenToWorkBadge() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 w-full h-full pointer-events-none z-10 select-none"
      aria-hidden="true"
    >
      <defs>
        {/* Define the text path running counter-clockwise so the text stands upright (heads pointing inward) */}
        <path
          id="openToWorkPath"
          d="M 22.06 63.66 A 86 86 0 0 0 136.34 177.94"
          fill="none"
        />
      </defs>
      <path
        d="M 22.06 63.66 A 86 86 0 0 0 136.34 177.94"
        fill="none"
        stroke="#057642"
        filter="drop-shadow(15px 15px 25px #057642)"
        strokeWidth="28"

      />


      {/* Curved Text */}
      <text
        fill="#ffffff"
        fontSize="12.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        letterSpacing="0.18em"
        dy="4.5"
      >
        <textPath href="#openToWorkPath" startOffset="50%" textAnchor="middle">
          #OPENTOWORK
        </textPath>
      </text>
    </svg>
  );
}
