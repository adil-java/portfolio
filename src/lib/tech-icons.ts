// Maps technology names (case-insensitive) to their icon paths in /skills/
// `invert` = true means the icon is dark/black and needs CSS invert in dark mode

interface TechIconInfo {
  path: string;
  invert: boolean;
}

const TECH_ICON_MAP: Record<string, TechIconInfo> = {
  // Languages
  "javascript": { path: "/skills/javascript-logo-javascript-icon-transparent-free-png.webp", invert: false },
  "typescript": { path: "/skills/5968381.png", invert: false },
  "python": { path: "/skills/Python-logo-notext.svg.png", invert: false },
  "c++": { path: "/skills/ISO_C++_Logo.svg.png", invert: false },
  "c#": { path: "/skills/Csharp_Logo.png", invert: false },

  // Frontend
  "react js": { path: "/skills/reactjs_logo_icon_170805.png", invert: false },
  "reactjs": { path: "/skills/reactjs_logo_icon_170805.png", invert: false },
  "react native": { path: "/skills/reactjs_logo_icon_170805.png", invert: false },
  "react": { path: "/skills/reactjs_logo_icon_170805.png", invert: false },
  "tailwindcss": { path: "/skills/tailwind-css-logo-rounded-free-png.webp", invert: false },
  "tailwind": { path: "/skills/tailwind-css-logo-rounded-free-png.webp", invert: false },
  "expo": { path: "/skills/expo_logo_icon_145293.png", invert: true },
  "viroreact": { path: "/skills/Ar.png", invert: false },
  "viro react": { path: "/skills/Ar.png", invert: false },
  "augmented reality": { path: "/skills/Ar.png", invert: false },
  "ar": { path: "/skills/Ar.png", invert: false },

  // Backend
  "node js": { path: "/skills/png-clipart-node-js-logo-node-js-javascript-web-application-express-js-computer-software-others-miscellaneous-text-thumbnail.png", invert: false },
  "nodejs": { path: "/skills/png-clipart-node-js-logo-node-js-javascript-web-application-express-js-computer-software-others-miscellaneous-text-thumbnail.png", invert: false },
  "node": { path: "/skills/png-clipart-node-js-logo-node-js-javascript-web-application-express-js-computer-software-others-miscellaneous-text-thumbnail.png", invert: false },
  "express js": { path: "/skills/express-js.png", invert: true },
  "expressjs": { path: "/skills/express-js.png", invert: true },
  "express": { path: "/skills/express-js.png", invert: true },
  "fastapi": { path: "/skills/fastapi-logo.CrXoa3Er_1303ab.webp", invert: false },
  "nest.js": { path: "/skills/nest-js-icon.webp", invert: false },
  "nestjs": { path: "/skills/nest-js-icon.webp", invert: false },
  "dot net core": { path: "/skills/NET_Core_Logo.svg.png", invert: false },
  "dotnet core": { path: "/skills/NET_Core_Logo.svg.png", invert: false },
  ".net core": { path: "/skills/NET_Core_Logo.svg.png", invert: false },
  ".net": { path: "/skills/NET_Core_Logo.svg.png", invert: false },
  "dotnet": { path: "/skills/NET_Core_Logo.svg.png", invert: false },
  "dot net": { path: "/skills/NET_Core_Logo.svg.png", invert: false },
  "csharp": { path: "/skills/Csharp_Logo.png", invert: false },

  // Databases & Tools
  "mssql": { path: "/skills/Microsoft_SQL_Server_2025_icon.svg.png", invert: false },
  "sql server": { path: "/skills/Microsoft_SQL_Server_2025_icon.svg.png", invert: false },
  "sql": { path: "/skills/Microsoft_SQL_Server_2025_icon.svg.png", invert: false },
  "mongodb": { path: "/skills/png-clipart-mongodb-logo-database-nosql-sql-logo-company-text-thumbnail.png", invert: false },
  "mongo db": { path: "/skills/png-clipart-mongodb-logo-database-nosql-sql-logo-company-text-thumbnail.png", invert: false },
  "mysql": { path: "/skills/mysql-logo.svg", invert: false },
  "firebase": { path: "/skills/firebase-logo-firebase-icon-free-png.webp", invert: false },
  "redis": { path: "/skills/Redis-Logo.wine.svg", invert: false },
  "docker": { path: "/skills/Docker-Logo.png", invert: false },
  "stripe": { path: "/skills/5968382.png", invert: false },

  // AI
  "google gemini": { path: "/skills/gemini-icon-on-a-transparent-background-free-png.webp", invert: false },
  "rag": { path: "/skills/gemini-icon-on-a-transparent-background-free-png.webp", invert: false },
  "efficientnet": { path: "/skills/Python-logo-notext.svg.png", invert: false },

  // Tools
  "socket.io": { path: "/skills/socketio_logo_icon_168806.png", invert: true },
  "opencv": { path: "/skills/Python-logo-notext.svg.png", invert: false },
  "computer vision": { path: "/skills/Python-logo-notext.svg.png", invert: false },
};

/**
 * Returns the icon info for a given technology name, or null if no icon exists.
 */
export function getTechIcon(techName: string): TechIconInfo | null {
  const key = techName.toLowerCase().trim();
  return TECH_ICON_MAP[key] ?? null;
}
