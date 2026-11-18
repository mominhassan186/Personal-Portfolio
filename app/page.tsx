"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  UserRound,
  GraduationCap,
  Award,
  BriefcaseBusiness,
  FileText,
  Folder,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
  Search,
  MoreHorizontal,
  Settings,
  Globe,
  Mail,
  MapPin,
  Wifi,
  BatteryFull,
  Volume2,
  Command,
  Minus,
  Square,
  X,
  ExternalLink,
  Palette,
  Database,
  Rocket,
  Code2,
  Download,
  Image as ImageIcon,
  FolderArchive,
  Eye,
  CheckCircle2,
  Trash2,
} from "lucide-react";

import { portfolioData } from "@/Data/portfolio";

type Section = {
  id: string;
  name: string;
  icon: string;
  fallbackIcon: React.ElementType;
  locked?: boolean;
};

export interface PreviewItem {
  id: string;
  title: string;
  url: string;
  isImage?: boolean;
  x: number;
  y: number;
}

const sections: Section[] = [
  { id: "about", name: "About Me", icon: "/icons/sidebar/about.svg", fallbackIcon: UserRound },
  { id: "education", name: "Education", icon: "/icons/sidebar/education.svg", fallbackIcon: GraduationCap },
  { id: "certificates", name: "Certificates", icon: "/icons/sidebar/certificates.svg", fallbackIcon: Award },
  { id: "experience", name: "Experience", icon: "/icons/sidebar/experience.svg", fallbackIcon: BriefcaseBusiness },
  { id: "uiux", name: "UI/UX Portfolio", icon: "/icons/sidebar/uiux.svg", fallbackIcon: Palette },
  { id: "data", name: "Data Engineering", icon: "/icons/sidebar/data.svg", fallbackIcon: Database },
  { id: "personal", name: "Personal Projects", icon: "/icons/sidebar/personal.svg", fallbackIcon: Rocket },
  { id: "private", name: "Private Files", icon: "/icons/sidebar/private.svg", fallbackIcon: LockKeyhole, locked: true },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Multi-window Preview State
  const [previewWindows, setPreviewWindows] = useState<PreviewItem[]>([]);
  const [sidebarImgError, setSidebarImgError] = useState(false);

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const active = sections.find((section) => section.id === activeSection);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
      setCurrentDate(now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - windowPosition.x,
      y: e.clientY - windowPosition.y,
    };
  };

  const dragWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !windowRef.current) return;

    const winWidth = windowRef.current.offsetWidth;
    const winHeight = windowRef.current.offsetHeight;

    const maxX = (window.innerWidth - winWidth) / 2;
    const minX = -maxX;
    const maxY = (window.innerHeight - winHeight) / 2 - 20;
    const minY = -maxY;

    let targetX = e.clientX - dragOffset.current.x;
    let targetY = e.clientY - dragOffset.current.y;

    targetX = Math.max(minX, Math.min(maxX, targetX));
    targetY = Math.max(minY, Math.min(maxY, targetY));

    setWindowPosition({ x: targetX, y: targetY });
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setWindowPosition({ x: 0, y: 0 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openPreview = (title: string, url: string, isImage?: boolean) => {
    const id = `${url}-${Date.now()}`;
    const offsetIndex = previewWindows.length % 5;
    const newWin: PreviewItem = {
      id,
      title,
      url,
      isImage,
      x: 30 + offsetIndex * 24,
      y: 40 + offsetIndex * 24,
    };
    setPreviewWindows((prev) => [...prev, newWin]);
  };

  const closePreview = (id: string) => {
    setPreviewWindows((prev) => prev.filter((win) => win.id !== id));
  };

  const updatePreviewPosition = (id: string, x: number, y: number) => {
    setPreviewWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, x, y } : win))
    );
  };

  const openSection = (section: string) => setActiveSection(section);

  return (
    <main
      className={`mac-desktop ${isDragging ? "is-dragging" : ""}`}
      style={{
        backgroundImage: `url(${portfolioData.personal.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseMove={dragWindow}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {/* MAC MENU BAR */}
      <div className="mac-menu-bar">
        <div className="menu-left">
          <span className="apple-logo font-semibold"></span>
          <span className="menu-active font-semibold">Finder</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>

        <div className="menu-right">
          <Command size={14} />
          <Wifi size={15} />
          <Volume2 size={15} />
          <BatteryFull size={18} />
          <span>{currentTime || "..."}</span>
          <span>{currentDate || "..."}</span>
        </div>
      </div>

      {/* DESKTOP SHORTCUT */}
      <div className="desktop-icon" onDoubleClick={() => openSection("about")}>
        <div className="desktop-folder">
          <Folder size={38} />
        </div>
        <span>My Portfolio</span>
      </div>

      {/* FINDER WINDOW */}
      <div
        ref={windowRef}
        className="finder-window border border-black/10 dark:border-white/15"
        style={{
          transform: `translate(calc(-50% + ${windowPosition.x}px), calc(-50% + ${windowPosition.y}px))`,
        }}
      >
        <div className="window-header" onMouseDown={startDragging}>
          <div className="traffic-lights">
            <button className="traffic red"><X size={9} /></button>
            <button className="traffic yellow"><Minus size={9} /></button>
            <button className="traffic green"><Square size={8} /></button>
          </div>

          <div className="window-title">
            <Folder size={15} />
            <span className="font-medium text-neutral-800 dark:text-neutral-200">{active?.name}</span>
          </div>

          <div className="window-actions" onMouseDown={(e) => e.stopPropagation()}>
            <button><ChevronLeft size={18} /></button>
            <button><ChevronRight size={18} /></button>
            <button><Search size={17} /></button>
            <button><MoreHorizontal size={19} /></button>
          </div>
        </div>

        <div className="finder-body">
          <aside className="sidebar">
            <div className="mini-profile">
              <div className="mini-avatar">
                {!sidebarImgError ? (
                  <img
                    src={portfolioData.personal.avatar}
                    alt="Profile"
                    onError={() => setSidebarImgError(true)}
                  />
                ) : (
                  <span>MH</span>
                )}
              </div>
              <div className="mini-profile-info">
                <strong className="text-sm font-semibold">{portfolioData.personal.name}</strong>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{portfolioData.personal.profession}</span>
              </div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-heading text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider">
                PORTFOLIO
              </p>
              {sections.map((section) => {
                const Fallback = section.fallbackIcon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    className={`sidebar-item ${isActive ? "active" : ""}`}
                    onClick={() => openSection(section.id)}
                  >
                    <img
                      src={section.icon}
                      alt={section.name}
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                        const sibling = (e.target as HTMLElement).nextElementSibling;
                        if (sibling) (sibling as HTMLElement).style.display = "block";
                      }}
                    />
                    <span className="hidden">
                      <Fallback size={17} />
                    </span>

                    <span className="text-xs font-medium">{section.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="sidebar-section sidebar-contact">
              <p className="sidebar-heading text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider">
                CONTACT
              </p>
              <div className="location-item text-xs">
                <Mail size={15} />
                <span className="truncate">{portfolioData.contact.email}</span>
              </div>
              <div className="location-item text-xs">
                <Globe size={15} />
                <span>{portfolioData.contact.location}</span>
              </div>
              <div className="location-item text-xs">
                <MapPin size={15} />
                <span>{portfolioData.contact.phone}</span>
              </div>
            </div>

            <div className="sidebar-footer">
              <button className="text-xs font-medium">
                <Settings size={15} />
                Settings
              </button>
            </div>
          </aside>

          <section className="content">
            <Content section={activeSection} onPreview={openPreview} />
          </section>
        </div>

        <footer className="status-bar text-xs text-neutral-500 border-t border-black/[0.06] dark:border-white/[0.08]">
          <span>{active?.name}</span>
          <span>{portfolioData.personal.availability}</span>
        </footer>
      </div>

      {/* DOCK */}
      <div className="dock border border-white/20 dark:border-white/10">
        <button className="dock-item" onClick={() => openSection("about")} title="Finder">
          <img
            src="/icons/dock/finder.webp"
            alt="Finder"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <Folder size={26} className="hidden" />
        </button>

        <button
          className="dock-item"
          onClick={() => openPreview("Momin Hassan - Resume", portfolioData.personal.resumeFile)}
          title="Preview Resume"
        >
          <img
            src="/icons/dock/resume.webp"
            alt="Resume"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <FileText size={26} className="hidden" />
        </button>

        <button className="dock-item" onClick={() => openSection("uiux")} title="UI/UX Portfolio">
          <img
            src="/icons/dock/uiux.webp"
            alt="UI/UX"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <Palette size={26} className="hidden" />
        </button>

        <button className="dock-item" onClick={() => openSection("data")} title="Data Engineering">
          <img
            src="/icons/dock/data.webp"
            alt="Data"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <Database size={26} className="hidden" />
        </button>

        <div className="dock-separator"></div>

        <a className="dock-item" href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <img
            src="/icons/dock/github.webp"
            alt="GitHub"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <Code2 size={24} className="hidden" />
        </a>

        <a className="dock-item" href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <img
            src="/icons/dock/linkedin.webp"
            alt="LinkedIn"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <Globe size={24} className="hidden" />
        </a>

        <a className="dock-item" href={portfolioData.contact.fiverr} target="_blank" rel="noopener noreferrer" title="Fiverr">
          <img
            src="/icons/dock/fiverr.webp"
            alt="Fiverr"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <CheckCircle2 size={26} className="hidden" />
        </a>

        <div className="dock-separator"></div>

        <button className="dock-item" title="Trash" onClick={() => alert("Trash is empty.")}>
          <img
            src="/icons/dock/trash.webp"
            alt="Trash"
            className="dock-icon"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
              const sibling = (e.target as HTMLElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <Trash2 size={24} className="hidden text-slate-700" />
        </button>
      </div>

      {/* MULTI-WINDOW PREVIEW MANAGER */}
      {previewWindows.map((win) => (
        <DraggablePreviewModal
          key={win.id}
          windowData={win}
          onClose={() => closePreview(win.id)}
          onUpdatePos={(x, y) => updatePreviewPosition(win.id, x, y)}
        />
      ))}
    </main>
  );
}

/* CONTENT ROUTER */
function Content({
  section,
  onPreview,
}: {
  section: string;
  onPreview: (title: string, url: string, isImage?: boolean) => void;
}) {
  if (section === "about") return <About onPreview={onPreview} />;
  if (section === "education") return <Education />;
  if (section === "certificates") return <Certificates onPreview={onPreview} />;
  if (section === "experience") return <Experience />;
  if (section === "uiux") return <UIUXPortfolio onPreview={onPreview} />;
  if (section === "data") return <DataEngineering />;
  if (section === "personal") return <PersonalProjects />;
  if (section === "private") return <Private onPreview={onPreview} />;
  return null;
}

/* ABOUT */
function About({ onPreview }: { onPreview: (title: string, url: string) => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="content-inner space-y-6">
      <div className="profile-header flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center shrink-0">
          {!imgError ? (
            <img
              src={portfolioData.personal.avatar}
              alt={portfolioData.personal.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-xl font-bold text-neutral-600 dark:text-neutral-300">MH</span>
          )}
        </div>

        <div>
          <p className="eyebrow text-xs font-semibold tracking-wider uppercase text-neutral-400">PERSONAL FILE</p>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{portfolioData.personal.name}</h1>
          <p className="subtitle text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">{portfolioData.personal.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Current Focus", val: portfolioData.personal.profession },
          { label: "Design Experience", val: portfolioData.personal.experience },
          { label: "Design Projects", val: portfolioData.personal.projects },
          { label: "Location", val: portfolioData.personal.location },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/50 backdrop-blur-md flex flex-col justify-between"
          >
            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
              {item.label}
            </span>
            <strong className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
              {item.val}
            </strong>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md space-y-3">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wide uppercase">
          About Me
        </h2>
        {portfolioData.personal.bio.map((paragraph, index) => (
          <p key={index} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Resume Banner */}
      <div className="p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Curriculum Vitae (Resume)</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Latest updated resume • Official PDF</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onPreview("Resume - Momin Hassan", portfolioData.personal.resumeFile)}
            className="action-btn-primary flex-1 sm:flex-none justify-center text-xs font-medium py-2 px-3.5"
          >
            <Eye size={14} /> Preview
          </button>
          <a
            href={portfolioData.personal.resumeFile}
            download="Momin-Hassan-Resume.pdf"
            className="action-btn-secondary flex-1 sm:flex-none justify-center text-xs font-medium py-2 px-3.5"
          >
            <Download size={14} /> Download
          </a>
        </div>
      </div>

      <div className="availability inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white/40 dark:bg-neutral-800/40 text-xs font-medium text-neutral-700 dark:text-neutral-300">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span>{portfolioData.personal.availability}</span>
      </div>
    </div>
  );
}

/* EDUCATION */
function Education() {
  return (
    <div className="content-inner space-y-6">
      <PageHeader
        eyebrow="EDUCATION"
        title="Education"
        description="Academic background and degrees."
      />
      <div className="space-y-4">
        {portfolioData.education.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md"
          >
            <div className="flex items-start gap-4">
              {/* Education Icon */}
              <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 flex items-center justify-center shrink-0 border border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-200">
                <GraduationCap size={22} />
              </div>

              {/* Header with Title on Left, Date on Right (Matches Experience) */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                    {item.year}
                  </span>
                </div>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-1">
                  {item.institution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CERTIFICATES */
function Certificates({ onPreview }: { onPreview: (title: string, url: string) => void }) {
  return (
    <div className="content-inner space-y-6">
      <PageHeader eyebrow="CREDENTIALS" title="Certificates" description="Click any certificate to inspect in macOS Preview." />
      <div className="space-y-3">
        {portfolioData.certificates.map((item, index) => (
          <div
            key={index}
            onClick={() => onPreview(item.title, item.file)}
            className="p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md flex items-center justify-between gap-4 cursor-pointer hover:border-black/20 dark:hover:border-white/25 transition-all group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 flex items-center justify-center shrink-0 border border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-200 group-hover:text-blue-500 transition-colors">
                <Award size={20} />
              </div>
              <div className="min-w-0">
                <strong className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 block truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </strong>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block mt-0.5">
                  {item.institution}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{item.year}</span>
              <Eye size={15} className="text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* EXPERIENCE */
function Experience() {
  const { professional, recommended, other } = portfolioData.experience as any;
  const clientLogos = (portfolioData.experience as any)?.clientLogos;

  return (
    <div className="content-inner space-y-8">
      <PageHeader
        eyebrow="WORK HISTORY"
        title="Experience"
        description="Professional background, client endorsements, and design history."
      />

      {/* 1. PROFESSIONAL EXPERIENCE */}
      <div>
        <h2 className="section-title mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {professional?.map((item: any, index: number) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 flex items-center justify-center shrink-0 border border-black/[0.06] dark:border-white/[0.08] p-2 overflow-hidden">
                  <img
                    src={item.icon}
                    alt={item.company || item.position}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                      const sibling = (e.target as HTMLElement).nextElementSibling;
                      if (sibling) (sibling as HTMLElement).style.display = "flex";
                    }}
                  />
                  <span className="hidden items-center justify-center text-neutral-500">
                    <BriefcaseBusiness size={20} />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.position}
                    </h3>
                    <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">
                    {item.company}
                    {item.employmentType && (
                      <span className="text-neutral-400 font-normal"> · {item.employmentType}</span>
                    )}
                  </p>

                  {/* Bullet points if available */}
                  {item.bullets && item.bullets.length > 0 ? (
                    <ul className="mt-3 space-y-1.5 pl-1">
                      {item.bullets.map((bullet: string, bIdx: number) => (
                        <li key={bIdx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2 leading-relaxed">
                          <span className="text-neutral-400 select-none">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : item.description ? (
                    <p className="mt-2 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CLIENTS & BRANDS WORKED WITH */}
      {clientLogos && clientLogos.length > 0 && (
        <div>
          <h2 className="section-title mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Clients & Brands Worked With
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {clientLogos.map((client: any, idx: number) => (
              <div
                key={idx}
                className="group flex flex-col items-center justify-between p-2.5 h-28 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md hover:border-black/20 dark:hover:border-white/20 transition-all"
              >
                {/* Maximized Logo Area */}
                <div className="w-full flex-1 flex items-center justify-center min-h-0 px-1">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-14 sm:h-16 w-full max-w-[95%] object-contain grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Subtitle (-2 points: 9.5px) */}
                <span className="mt-0.5 text-[9.5px] tracking-tight font-medium text-neutral-400 dark:text-neutral-500 text-center truncate max-w-full leading-tight select-none">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. COMPANIES WHO RECOMMEND ME */}
      {recommended && recommended.length > 0 && (
        <div>
          <h2 className="section-title mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Companies Who Recommend Me
          </h2>
          <div className="space-y-3">
            {recommended.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 flex items-center justify-center shrink-0 border border-black/[0.06] dark:border-white/[0.08] p-2 overflow-hidden">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                        const sibling = (e.target as HTMLElement).nextElementSibling;
                        if (sibling) (sibling as HTMLElement).style.display = "flex";
                      }}
                    />
                    <span className="hidden items-center justify-center text-neutral-500">
                      <BriefcaseBusiness size={20} />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. OTHER ENGAGEMENTS */}
      {other && other.length > 0 && (
        <div>
          <h2 className="section-title mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Other Engagements
          </h2>
          <div className="space-y-3">
            {other.map((item: any, index: number) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 flex items-center justify-center shrink-0 border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300">
                    <BriefcaseBusiness size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {item.details}
                    </p>
                  </div>
                </div>
                {item.role && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium shrink-0">
                    {item.role}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* UI/UX PORTFOLIO */
function UIUXPortfolio({ onPreview }: { onPreview: (title: string, url: string, isImage?: boolean) => void }) {
  return (
    <div className="content-inner space-y-6">
      <PageHeader eyebrow="DESIGN" title="UI/UX Portfolio" description={portfolioData.uiux.description} />

      <div className="flex flex-wrap gap-2">
        {portfolioData.uiux.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 text-xs font-medium rounded-lg border border-black/[0.08] dark:border-white/[0.1] bg-white/50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <h2 className="section-title text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Case Studies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {portfolioData.uiux.featured.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md overflow-hidden flex flex-col"
            >
              <div
                className="h-40 cursor-pointer overflow-hidden relative group bg-neutral-100 dark:bg-neutral-700/50 flex items-center justify-center"
                onClick={() => onPreview(item.title, item.image, true)}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <Palette size={28} className="text-neutral-400" />
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 action-btn-primary text-xs py-1.5 px-2.5 inline-flex items-center gap-1.5 self-start"
                >
                  View on Figma <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title m-0 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Visual Portfolio (Fiverr Deliverables)
          </h2>
          <span className="text-xs text-neutral-400 font-medium">
            {portfolioData.uiux.images.length} Designs
          </span>
        </div>

        {/* 2 in a row on both mobile and desktop with fixed 4:3 aspect ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {portfolioData.uiux.images.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-neutral-100 dark:bg-neutral-800/50 overflow-hidden relative cursor-pointer group"
              onClick={() => onPreview(`UI/UX Project #${index + 1}`, image, true)}
            >
              <img
                src={image}
                alt={`Visual work ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <Eye
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* DATA ENGINEERING */
function DataEngineering() {
  return (
    <div className="content-inner space-y-6">
      <PageHeader eyebrow="DATA" title="Data Engineering" description={portfolioData.dataEngineering.description} />

      <div className="flex flex-wrap gap-2">
        {portfolioData.dataEngineering.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 text-xs font-medium rounded-lg border border-black/[0.08] dark:border-white/[0.1] bg-white/50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <h2 className="section-title text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Projects
        </h2>
        <div className="space-y-4">
          {portfolioData.dataEngineering.projects.map((project, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{project.title}</h3>
                {project.status && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 font-medium">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                {project.technologies}
              </p>

              <ul className="mt-3 space-y-1.5 pl-1">
                {project.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-neutral-400 select-none">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {project.github && (
                <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Code2 size={14} /> View Code on GitHub
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* PERSONAL PROJECTS */
function PersonalProjects() {
  return (
    <div className="content-inner space-y-6">
      <PageHeader eyebrow="ENTREPRENEURSHIP" title="Personal Projects" description="Products and experiments I am building alongside my work." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {portfolioData.personalProjects.map((project, index) => (
          <div
            key={index}
            className="rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md overflow-hidden flex flex-col"
          >
            <div className="h-40 bg-neutral-100 dark:bg-neutral-700/50 flex items-center justify-center">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <Rocket size={28} className="text-neutral-400" />
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{project.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="mt-3">
                {project.status === "Coming Soon" ? (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium">
                    Coming Soon
                  </span>
                ) : (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="action-btn-primary text-xs py-1.5 px-2.5 inline-flex items-center gap-1.5">
                    Visit Project <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* PRIVATE FILES COMPONENT */

function Private({
  onPreview,
}: {
  onPreview: (title: string, url: string, isImage?: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/unlock-private")
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .catch(() => {});
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("/api/unlock-private", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setErrorMsg("Incorrect access key. Please contact me for access.");
      }
    } catch (err) {
      setErrorMsg("Error verifying access key.");
    }
  };

  // LOCKED STATE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="content-inner flex flex-col items-center justify-center py-16">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
          <LockKeyhole size={28} />
        </div>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Confidential Documents</h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 text-center max-w-sm">
          These documents are protected and intended solely for employers, embassies, and authorized partners.
        </p>

        <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
          <input
            type="password"
            placeholder="Enter security key..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-3 py-2 text-xs border border-black/[0.1] dark:border-white/[0.15] bg-white/70 dark:bg-neutral-800/70 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-neutral-900 dark:text-neutral-100"
          />
          <button type="submit" className="action-btn-primary text-xs py-2 px-4 whitespace-nowrap">
            Unlock
          </button>
        </form>
        {errorMsg && <p className="text-xs text-red-500 mt-3 font-medium">{errorMsg}</p>}
      </div>
    );
  }

  // UNLOCKED CATEGORIZED SCREEN
  return (
    <div className="content-inner space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/[0.08] dark:border-white/[0.1] gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            RESTRICTED ACCESS GRANTED
          </span>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
            {portfolioData.privateFiles.title}
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-md leading-relaxed">
            {portfolioData.privateFiles.description}
          </p>
        </div>

        <a
          href={portfolioData.privateFiles.zipDownloadUrl}
          download="Momin_Hassan_Complete_Profile.zip"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors whitespace-nowrap self-start sm:self-auto border border-blue-500"
        >
          <FolderArchive size={16} />
          <span>Download All (ZIP)</span>
        </a>
      </div>

      <div className="space-y-6">
        {portfolioData.privateFiles.categories.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {group.categoryName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.files.map((file, fileIdx) => {
                const isImage = file.type === "image";
                const secureFileUrl = `/api/unlock-private?file=${encodeURIComponent(file.file)}`;
                const secureDownloadUrl = `/api/unlock-private?file=${encodeURIComponent(file.file)}&download=1`;

                return (
                  <div
                    key={fileIdx}
                    onClick={() => onPreview(file.name, secureFileUrl, isImage)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white/60 dark:bg-neutral-800/40 backdrop-blur-md hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:text-blue-500 transition-colors shrink-0">
                        {isImage ? <ImageIcon size={20} /> : <FileText size={20} />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {file.name}
                        </p>
                        {file.size && <span className="text-xs text-neutral-400 dark:text-neutral-500">{file.size}</span>}
                      </div>
                    </div>

                    <a
                      href={secureDownloadUrl}
                      download={file.file}
                      onClick={(e) => e.stopPropagation()}
                      title="Download file"
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md transition-colors"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   MULTI-WINDOW DRAGGABLE PREVIEW WINDOW WITH CLEAN MACOS CHROME
   ========================================================================== */
function DraggablePreviewModal({
  windowData,
  onClose,
  onUpdatePos,
}: {
  windowData: PreviewItem;
  onClose: () => void;
  onUpdatePos: (x: number, y: number) => void;
}) {
  const [isDrag, setIsDrag] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ x: 0, y: 0 });

  const startModalDrag = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) return;
    setIsDrag(true);
    dragRef.current = {
      x: e.clientX - windowData.x,
      y: e.clientY - windowData.y,
    };
  };

  const onModalDrag = (e: MouseEvent) => {
    if (!isDrag || !modalRef.current) return;

    const modalWidth = modalRef.current.offsetWidth;
    const modalHeight = modalRef.current.offsetHeight;

    const minX = 10;
    const maxX = window.innerWidth - modalWidth - 10;
    const minY = 35;
    const maxY = window.innerHeight - modalHeight - 75;

    let nextX = e.clientX - dragRef.current.x;
    let nextY = e.clientY - dragRef.current.y;

    nextX = Math.max(minX, Math.min(maxX, nextX));
    nextY = Math.max(minY, Math.min(maxY, nextY));

    onUpdatePos(nextX, nextY);
  };

  const stopModalDrag = () => setIsDrag(false);

  useEffect(() => {
    if (isDrag) {
      window.addEventListener("mousemove", onModalDrag);
      window.addEventListener("mouseup", stopModalDrag);
    } else {
      window.removeEventListener("mousemove", onModalDrag);
      window.removeEventListener("mouseup", stopModalDrag);
    }
    return () => {
      window.removeEventListener("mousemove", onModalDrag);
      window.removeEventListener("mouseup", stopModalDrag);
    };
  }, [isDrag]);

  return (
    <div
      ref={modalRef}
      style={{
        left: `${windowData.x}px`,
        top: `${windowData.y}px`,
      }}
      className="fixed z-[9999] w-[90vw] max-w-2xl h-[65vh] bg-white/95 dark:bg-neutral-900/95 rounded-2xl flex flex-col overflow-hidden border border-black/15 dark:border-white/20 backdrop-blur-xl"
    >
      {/* WINDOW HEADER */}
      <div
        className="h-10 bg-neutral-100/80 dark:bg-neutral-800/80 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between px-3.5 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={startModalDrag}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-black/40 hover:text-black transition-colors"
          >
            <X size={8} />
          </button>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-xs">{windowData.title}</span>
        <div className="w-12 flex justify-end">
          <a href={windowData.url} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* PREVIEW CONTENT */}
      <div className="flex-1 w-full bg-neutral-50 dark:bg-neutral-950 overflow-hidden flex items-center justify-center p-2 select-none">
        {windowData.isImage ? (
          <img
            src={windowData.url}
            alt={windowData.title}
            className="max-w-full max-h-full object-contain rounded-lg pointer-events-none"
          />
        ) : (
          <iframe
            src={`${windowData.url}#toolbar=1&navpanes=0`}
            className="w-full h-full rounded-lg border-0"
            title={windowData.title}
          />
        )}
      </div>
    </div>
  );
}

/* SHARED UI HELPERS */
function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="page-header space-y-1 mb-6">
      <p className="eyebrow text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
        {eyebrow}
      </p>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
        {title}
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
        {description}
      </p>
    </div>
  );
}