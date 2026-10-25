import Image from "next/image";

// Same icons as the desktop dock.
const navItems = [
  { id: "about", label: "About", icon: "/dock/home.png" },
  { id: "experience", label: "Experience", icon: "/dock/experience.png" },
  { id: "tab-navigation", label: "Projects", icon: "/dock/projects.png" },
  { id: "contact", label: "Contact", icon: "/dock/contact.png" },
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
      {navItems.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => selectPage(id)}
          aria-pressed={activePage === id}
          aria-controls={id}
          className="mobile-nav-link"
          data-active={activePage === id}
        >
          <Image src={icon} alt="" width={26} height={26} draggable={false} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
