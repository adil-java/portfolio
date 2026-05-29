"use client";

import { useEffect, useState } from "react";
import { GitHubIcon } from "./icons";
import { useTheme } from "./theme-provider";

interface ContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

interface ContributionData {
  contributions: ContributionDay[][];
  totalContributions: number;
}

export default function GitHubCalendar({ username }: { username: string }) {
  const { theme } = useTheme();
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`https://github-contributions-api.deno.dev/${username}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contribution data");
        return res.json();
      })
      .then((json) => {
        if (active && json && Array.isArray(json.contributions)) {
          setData({
            contributions: json.contributions,
            totalContributions: json.totalContributions ?? 0,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading GitHub contributions:", err);
        if (active) {
          // Generate realistic mock fallback data so the portfolio looks complete
          const mockContribs = generateMockContributions();
          const totalMock = mockContribs.reduce(
            (acc, week) =>
              acc + week.reduce((wAcc, day) => wAcc + day.contributionCount, 0),
            0
          );
          setData({
            contributions: mockContribs,
            totalContributions: totalMock,
          });
          setIsFallback(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [username]);

  // Color mapping based on GitHub's dark/light modes
  const getDayColor = (level: string) => {
    const isDark = theme === "dark";
    if (isDark) {
      switch (level) {
        case "NONE":
          return "#21262d";
        case "FIRST_QUARTILE":
          return "#0e4429";
        case "SECOND_QUARTILE":
          return "#006d32";
        case "THIRD_QUARTILE":
          return "#26a641";
        case "FOURTH_QUARTILE":
          return "#39d353";
        default:
          return "#161b22";
      }
    } else {
      switch (level) {
        case "NONE":
          return "#ebedf0";
        case "FIRST_QUARTILE":
          return "#9be9a8";
        case "SECOND_QUARTILE":
          return "#40c463";
        case "THIRD_QUARTILE":
          return "#30a14e";
        case "FOURTH_QUARTILE":
          return "#216e39";
        default:
          return "#ebedf0";
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full p-4 border border-t-white/40 border-x-white/10 border-b-white/5 dark:border-t-white/15 dark:border-x-white/5 dark:border-b-white/5 bg-white/85 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-lg animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 dark:bg-[#21262d] rounded" />
          <div className="w-48 h-4 bg-gray-200 dark:bg-[#21262d] rounded" />
        </div>
        <div className="h-[108px] bg-gray-150 dark:bg-[#161b22]/50 rounded-md" />
      </div>
    );
  }

  if (!data) return null;

  // Process month labels
  let prevMonth = -1;
  let lastMonthIndex = -99;
  const monthCols = data.contributions.map((week, index) => {
    if (week.length === 0) return "";
    const date = new Date(week[0].date);
    const month = date.getMonth();
    const monthName = date.toLocaleString("default", { month: "short" });

    if (month !== prevMonth && index - lastMonthIndex >= 4) {
      prevMonth = month;
      lastMonthIndex = index;
      return monthName;
    }
    return "";
  });

  return (
    <div className="w-full p-4 border border-t-white/40 border-x-white/10 border-b-white/5 dark:border-t-white/15 dark:border-x-white/5 dark:border-b-white/5 bg-white/85 dark:bg-[#161b22]/90 backdrop-blur-xl rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <GitHubIcon className="w-5 h-5 text-gray-700 dark:text-white" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {data.totalContributions} Contributions in the last year
          </h3>
          {isFallback && (
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/20 bg-yellow-500/5 text-yellow-600 dark:text-yellow-500">
              Demo Mode
            </span>
          )}
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 dark:text-[#58a6ff] hover:underline"
        >
          View Profile
        </a>
      </div>

      {/* Grid Container */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-[#30363d] scrollbar-track-transparent">
          {/* Day Names Labels */}
          <div className="flex flex-col gap-[3px] text-[9px] text-gray-400 dark:text-[#8b949e] pr-2 select-none justify-between h-[88px] pt-4 shrink-0 font-sans">
            <div className="h-[10px] flex items-center">Mon</div>
            <div className="h-[10px] flex items-center">Wed</div>
            <div className="h-[10px] flex items-center">Fri</div>
          </div>

          {/* Grid of Weeks */}
          <div className="flex flex-col gap-1">
            {/* Months Header */}
            <div className="flex gap-[3px] text-[9px] text-gray-400 dark:text-[#8b949e] h-3 select-none">
              {monthCols.map((label, idx) => (
                <div key={idx} className="w-[10px] shrink-0 relative">
                  {label && (
                    <span className="absolute left-0 top-0 whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Contribution Cells */}
            <div className="flex gap-[3px]">
              {data.contributions.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
                  {week.map((day, dIdx) => (
                    <div key={dIdx} className="relative group">
                      <div
                        className="w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-transform duration-100 hover:scale-125"
                        style={{ backgroundColor: getDayColor(day.contributionLevel) }}
                      />
                      {/* Premium CSS-based Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 hidden group-hover:block z-50 bg-gray-900 dark:bg-[#161b22] text-white dark:text-[#c9d1d9] text-[10px] rounded border border-gray-700/30 px-2 py-1 whitespace-nowrap shadow-lg pointer-events-none font-sans">
                        <span className="font-semibold">{day.contributionCount}</span>{" "}
                        contributions on {formatDate(day.date)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-[#8b949e]">
        <a
          href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-[#58a6ff] hover:underline hidden sm:inline"
        >
          Learn how we count contributions
        </a>
        <div className="flex items-center gap-1 ml-auto">
          <span>Less</span>
          {["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"].map(
            (level) => (
              <div
                key={level}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: getDayColor(level) }}
              />
            )
          )}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

// Fallback contribution generator
function generateMockContributions() {
  const contributions: ContributionDay[][] = [];
  const start = new Date();
  start.setDate(start.getDate() - 364);

  // Match the start of the week (Sunday)
  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  for (let w = 0; w < 53; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + (w * 7 + d));
      const dateStr = date.toISOString().split("T")[0];

      const rand = Math.random();
      let level = "NONE";
      let count = 0;

      if (rand > 0.8) {
        level = "FIRST_QUARTILE";
        count = Math.floor(Math.random() * 3) + 1;
      } else if (rand > 0.92) {
        level = "SECOND_QUARTILE";
        count = Math.floor(Math.random() * 4) + 4;
      } else if (rand > 0.97) {
        level = "THIRD_QUARTILE";
        count = Math.floor(Math.random() * 4) + 8;
      } else if (rand > 0.99) {
        level = "FOURTH_QUARTILE";
        count = Math.floor(Math.random() * 5) + 12;
      }

      week.push({
        color: "#ebedf0",
        contributionCount: count,
        contributionLevel: level,
        date: dateStr,
      });
    }
    contributions.push(week);
  }
  return contributions;
}
