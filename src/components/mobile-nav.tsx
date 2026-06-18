"use client";

import {
  Home,
  Briefcase,
  FolderGit2,
  MessageCircle,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { id: "about", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "tab-navigation", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

interface MobileNavProps {
  activePage: string;
  onPageChange: (pageId: string) => void;
}

export function MobileNav({ activePage, onPageChange }: MobileNavProps) {
  const handleClick = (item: NavItem) => {
    onPageChange(item.id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-[100] flex justify-center print:hidden">
      {/* Sleek, boxy, floating mobile toolbar */}
      <nav className="flex items-center justify-around w-full max-w-sm px-2 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-lg">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`flex-1 max-w-[76px] h-9 flex flex-col items-center justify-center rounded transition-all duration-150 relative active:scale-95 -webkit-tap-highlight-color-transparent touch-manipulation select-none
                ${isActive
                  ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              aria-label={item.label}
            >
              <Icon
                className="w-4 h-4"
                strokeWidth={isActive ? 2 : 1.7}
              />
              <span className="text-[9px] font-medium tracking-wide mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
