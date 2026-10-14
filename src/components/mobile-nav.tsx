import { Briefcase, FolderGit2, Home, MessageCircle } from "lucide-react";

const navItems = [
  { id: "about", label: "About", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "tab-navigation", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: MessageCircle },
] as const;

type MobilePage = "about" | "experience" | "tab-navigation" | "contact";

export function MobileNav({
  activePage,
  onPageChange,
}: {
  activePage: MobilePage;
  onPageChange: (page: MobilePage) => void;
}) {
  const selectPage = (page: MobilePage) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <nav aria-label="Mobile navigation" className="mobile-bottom-nav md:hidden print:hidden">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => selectPage(id)}
          aria-pressed={activePage === id}
          className="mobile-nav-link"
          data-active={activePage === id}
        >
          <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
