"use client";

import { useState, useRef, useEffect } from "react";
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
  KeyRound,
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

  // Multi-window Preview Handler (Staggers new windows so they don't stack directly on top)
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
      {/* MENU BAR */}
      <div className="mac-menu-bar">
        <div className="menu-left">
          <span className="apple-logo"></span>
          <span className="menu-active">Finder</span>
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
        className="finder-window"
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
            <span>{active?.name}</span>
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
                <strong>{portfolioData.personal.name}</strong>
                <span>{portfolioData.personal.profession}</span>
              </div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-heading">PORTFOLIO</p>
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

                    <span>{section.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="sidebar-section sidebar-contact">
              <p className="sidebar-heading">CONTACT</p>
              <div className="location-item">
                <Mail size={16} />
                <span>{portfolioData.contact.email}</span>
              </div>
              <div className="location-item">
                <Globe size={16} />
                <span>{portfolioData.contact.location}</span>
              </div>
              <div className="location-item">
                <MapPin size={16} />
                <span>{portfolioData.contact.phone}</span>
              </div>
            </div>

            <div className="sidebar-footer">
              <button>
                <Settings size={15} />
                Settings
              </button>
            </div>
          </aside>

          <section className="content">
            <Content section={activeSection} onPreview={openPreview} />
          </section>
        </div>

        <footer className="status-bar">
          <span>{active?.name}</span>
          <span>{portfolioData.personal.availability}</span>
        </footer>
      </div>
      {/* DOCK */}
      <div className="dock">
        {/* Finder */}
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

        {/* Resume */}
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

        {/* UI/UX Portfolio */}
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

        {/* Data Engineering */}
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

        {/* Separator 1 */}
        <div className="dock-separator"></div>

        {/* GitHub */}
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

        {/* LinkedIn */}
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

        {/* Fiverr */}
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

        {/* macOS TRASH SEPARATOR */}
        <div className="dock-separator"></div>

        {/* TRASH / BIN ICON */}
        <button
          className="dock-item"
          title="Trash"
          onClick={() => alert("Trash is empty.")}
        >
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


      {/* MULTI-WINDOW PREVIEW MANAGER (NON-BLOCKING DESKTOP) */}
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
    <div className="content-inner">
      <div className="profile-header">
        <div className="profile-photo">
          {!imgError ? (
            <img
              src={portfolioData.personal.avatar}
              alt={portfolioData.personal.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <span>MH</span>
          )}
        </div>

        <div>
          <p className="eyebrow">PERSONAL FILE</p>
          <h1>{portfolioData.personal.name}</h1>
          <p className="subtitle">{portfolioData.personal.role}</p>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <span>Current Focus</span>
          <strong>{portfolioData.personal.profession}</strong>
        </div>
        <div className="info-card">
          <span>Design Experience</span>
          <strong>{portfolioData.personal.experience}</strong>
        </div>
        <div className="info-card">
          <span>Design Projects</span>
          <strong>{portfolioData.personal.projects}</strong>
        </div>
        <div className="info-card">
          <span>Location</span>
          <strong>{portfolioData.personal.location}</strong>
        </div>
      </div>

      <div className="text-section">
        <h2>About Me</h2>
        {portfolioData.personal.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <FileText size={22} />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800 m-0">Curriculum Vitae (Resume)</h4>
            <p className="text-[11px] text-slate-500 m-0">Latest updated resume • PDF</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onPreview("Resume - Momin Hassan", portfolioData.personal.resumeFile)}
            className="action-btn-primary flex-1 sm:flex-none justify-center"
          >
            <Eye size={13} /> Preview
          </button>
          <a
            href={portfolioData.personal.resumeFile}
            download="Momin-Hassan-Resume.pdf"
            className="action-btn-secondary flex-1 sm:flex-none justify-center"
          >
            <Download size={13} /> Download
          </a>
        </div>
      </div>

      <div className="availability">
        <div className="availability-dot"></div>
        <span>{portfolioData.personal.availability}</span>
      </div>
    </div>
  );
}

/* EDUCATION */
function Education() {
  return (
    <div className="content-inner">
      <PageHeader eyebrow="EDUCATION" title="Education" description="Academic background and degrees." />
      <div className="finder-files">
        {portfolioData.education.map((item, index) => (
          <FileRow key={index} icon={<GraduationCap />} name={item.title} details={item.institution} date={item.year} />
        ))}
      </div>
    </div>
  );
}

/* CERTIFICATES */
function Certificates({ onPreview }: { onPreview: (title: string, url: string) => void }) {
  return (
    <div className="content-inner">
      <PageHeader eyebrow="CREDENTIALS" title="Certificates" description="Click any certificate to open macOS Preview window." />
      <div className="finder-files">
        {portfolioData.certificates.map((item, index) => (
          <div
            key={index}
            onClick={() => onPreview(item.title, item.file)}
            className="finder-file-row"
          >
            <div className="finder-file-icon"><Award size={20} /></div>
            <div className="finder-file-name">
              <strong>{item.title}</strong>
              <span>{item.institution}</span>
            </div>
            <span className="finder-file-date">{item.year}</span>
            <Eye size={15} className="row-more" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* EXPERIENCE */
function Experience() {
  const { professional, recommended, other } = portfolioData.experience;

  return (
    <div className="content-inner">
      <PageHeader
        eyebrow="WORK HISTORY"
        title="Experience"
        description="Professional background, client endorsements, and design history."
      />

      {/* 1. PROFESSIONAL EXPERIENCE */}
      <div className="mb-8">
        <h2 className="section-title">Professional Experience</h2>
        <div className="space-y-4">
          {professional.map((item, index) => (
            <div className="experience-card" key={index}>
              <div className="experience-icon overflow-hidden bg-slate-100 p-2">
                <img
                  src={item.icon}
                  alt={item.company}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const sibling = (e.target as HTMLElement).nextElementSibling;
                    if (sibling) (sibling as HTMLElement).style.display = "block";
                  }}
                />
                <span className="hidden">
                  <BriefcaseBusiness size={20} />
                </span>
              </div>
              <div>
                <h3>{item.position}</h3>
                <p>{item.company}</p>
                <span>{item.period}</span>
                <small>{item.description}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. COMPANIES WHO RECOMMEND ME */}
      <div className="mb-8">
        <h2 className="section-title">Companies Who Recommend Me</h2>
        <div className="space-y-4">
          {recommended.map((item, index) => (
            <div className="experience-card" key={index}>
              <div className="experience-icon overflow-hidden bg-slate-100 p-2">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const sibling = (e.target as HTMLElement).nextElementSibling;
                    if (sibling) (sibling as HTMLElement).style.display = "block";
                  }}
                />
                <span className="hidden">
                  <BriefcaseBusiness size={20} />
                </span>
              </div>
              <div>
                <h3>{item.name}</h3>
                <small>{item.description}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OTHER EXPERIENCE */}
      {other && other.length > 0 && (
        <div className="mb-6">
          <h2 className="section-title">Other Engagements</h2>
          <div className="finder-files">
            {other.map((item, index) => (
              <div className="finder-file-row" key={index}>
                <div className="finder-file-icon">
                  <BriefcaseBusiness size={18} />
                </div>
                <div className="finder-file-name">
                  <strong>{item.name}</strong>
                  <span>{item.details}</span>
                </div>
                {item.role && <span className="finder-file-date">{item.role}</span>}
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
    <div className="content-inner">
      <PageHeader eyebrow="DESIGN" title="UI/UX Portfolio" description={portfolioData.uiux.description} />

      <div className="skills-container">
        {portfolioData.uiux.skills.map((skill, index) => (
          <span className="skill-tag" key={index}>{skill}</span>
        ))}
      </div>

      <h2 className="section-title">Case Studies</h2>
      <div className="featured-grid">
        {portfolioData.uiux.featured.map((item, index) => (
          <div className="featured-card" key={index}>
            <div
              className="featured-card-thumb cursor-pointer group overflow-hidden"
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
                <Palette size={28} className="text-gray-400" />
              )}
            </div>
            <div className="featured-card-body">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a href={item.figma} target="_blank" rel="noopener noreferrer" className="action-btn-primary text-xs py-1 px-2 inline-flex">
                View on Figma <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8 mb-3.5">
        <h2 className="section-title m-0">Visual Portfolio (Fiverr Deliverables)</h2>
        <span className="text-xs text-slate-400 font-medium">{portfolioData.uiux.images.length} Designs</span>
      </div>

      <div className="image-grid">
        {portfolioData.uiux.images.length === 0 ? (
          <EmptyState icon={<Palette size={24} />} title="Visual Portfolio" description="Images will appear here." />
        ) : (
          portfolioData.uiux.images.map((image, index) => (
            <div
              className="portfolio-image cursor-pointer group overflow-hidden relative"
              key={index}
              onClick={() => onPreview(`UI/UX Project #${index + 1}`, image, true)}
            >
              <img
                src={image}
                alt={`Visual work ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Eye size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* DATA ENGINEERING */

function DataEngineering() {
  return (
    <div className="content-inner">
      <PageHeader eyebrow="DATA" title="Data Engineering" description={portfolioData.dataEngineering.description} />

      <div className="skills-container">
        {portfolioData.dataEngineering.skills.map((skill, index) => (
          <span className="skill-tag" key={index}>{skill}</span>
        ))}
      </div>

      <h2 className="section-title">Projects</h2>
      <div className="data-project-list">
        {portfolioData.dataEngineering.projects.map((project, index) => (
          <div className="data-project-card" key={index}>

            <div className="data-project-content">
              <div className="data-project-header">
                <h3>{project.title}</h3>
                {project.status && <span className="project-status">{project.status}</span>}
              </div>
              <p className="technologies">{project.technologies}</p>

              <ul className="list-disc pl-4 my-2 text-xs text-slate-600 space-y-1">
                {project.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>

              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-button">
                  <Code2 size={13} /> View Code on GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* PERSONAL PROJECTS */
function PersonalProjects() {
  return (
    <div className="content-inner">
      <PageHeader eyebrow="ENTREPRENEURSHIP" title="Personal Projects" description="Products and experiments I am building alongside my work." />
      <div className="featured-grid">
        {portfolioData.personalProjects.map((project, index) => (
          <div className="featured-card" key={index}>
            <div className="featured-card-thumb">
              {project.image ? <img src={project.image} alt={project.title} /> : <Rocket size={28} className="text-gray-400" />}
            </div>
            <div className="featured-card-body">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              {project.status === "Coming Soon" ? (
                <span className="coming-soon">Coming Soon</span>
              ) : (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="action-btn-primary text-xs py-1 px-2 inline-flex">
                  Visit Project <ExternalLink size={11} />
                </a>
              )}
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
      .catch(() => { });
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("/api/unlock-private", { // <-- Change to unlock-private
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
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
          <LockKeyhole size={28} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Confidential Documents</h2>
        <p className="text-xs text-slate-500 mb-6 text-center max-w-sm">
          These documents are protected and intended solely for employers, embassies, and authorized partners.
        </p>

        <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
          <input
            type="password"
            placeholder="Enter security key..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <div className="content-inner">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
            RESTRICTED ACCESS GRANTED
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            {portfolioData.privateFiles.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            {portfolioData.privateFiles.description}
          </p>
        </div>

        {/* ONE-CLICK COMPLETE PROFILE ZIP DOWNLOAD BUTTON */}
        <a
          href={portfolioData.privateFiles.zipDownloadUrl}
          download="Momin_Hassan_Complete_Profile.zip"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <FolderArchive size={16} />
          <span>Download All (ZIP)</span>
        </a>
      </div>

      {/* CATEGORIZED SECTIONS */}
      <div className="space-y-8">
        {portfolioData.privateFiles.categories.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {group.categoryName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.files.map((file, fileIdx) => {
                const isImage = file.type === "image";
                const secureFileUrl = `/api/protected-docs?file=${encodeURIComponent(file.file)}`;
                const secureDownloadUrl = `/api/protected-docs?file=${encodeURIComponent(file.file)}&download=1`;

                return (
                  <div
                    key={fileIdx}
                    onClick={() => onPreview(file.name, secureFileUrl, isImage)}
                    className="flex items-center justify-between p-3.5 bg-white border border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex-shrink-0">
                        {isImage ? <ImageIcon size={20} /> : <FileText size={20} />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">
                          {file.name}
                        </p>
                        {file.size && <span className="text-[10px] text-slate-400">{file.size}</span>}
                      </div>
                    </div>

                    <a
                      href={secureDownloadUrl}
                      download={file.file}
                      onClick={(e) => e.stopPropagation()}
                      title="Download file"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
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
    </div >
  );
}

/* ==========================================================================
   MULTI-WINDOW DRAGGABLE PREVIEW WINDOW WITH BOUNDARY SHELL & NON-BLOCKING DESKTOP
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

    // Viewport Shell Constraints
    const minX = 10;
    const maxX = window.innerWidth - modalWidth - 10;
    const minY = 35; // Below top menu bar
    const maxY = window.innerHeight - modalHeight - 75; // Above bottom dock

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
      className="fixed z-[9999] w-[90vw] max-w-2xl h-[65vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-300/80 backdrop-blur-md"
    >
      {/* WINDOW HEADER (DRAG HANDLE) */}
      <div
        className="h-9 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={startModalDrag}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-black/60 hover:text-black transition-colors"
          >
            <X size={8} />
          </button>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-medium text-slate-700 truncate max-w-xs">{windowData.title}</span>
        <div className="w-12 flex justify-end">
          <a href={windowData.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-800">
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* PREVIEW CONTENT */}
      <div className="flex-1 w-full bg-slate-50 overflow-hidden flex items-center justify-center p-2 select-none">
        {windowData.isImage ? (
          <img
            src={windowData.url}
            alt={windowData.title}
            className="max-w-full max-h-full object-contain rounded-md shadow-sm pointer-events-none"
          />
        ) : (
          <object
            data={`${windowData.url}#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            className="w-full h-full rounded-md border border-slate-200"
          >
            {/* Fallback if the browser refuses embedded PDF display */}
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <FileText size={48} className="text-slate-400 mb-3" />
              <p className="text-sm font-medium text-slate-700 mb-1">{windowData.title}</p>
              <p className="text-xs text-slate-500 mb-4">
                Your browser does not support embedded PDF previews.
              </p>
              <a
                href={windowData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn-primary text-xs py-1.5 px-3"
              >
                Open in Full Window
              </a>
            </div>
          </object>
        )}
      </div>
    </div>
  );
}

/* SHARED UI HELPERS */
function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function FileRow({ icon, name, details, date }: { icon: React.ReactNode; name: string; details: string; date: string }) {
  return (
    <div className="finder-file-row">
      <div className="finder-file-icon">{icon}</div>
      <div className="finder-file-name">
        <strong>{name}</strong>
        <span>{details}</span>
      </div>
      <span className="finder-file-date">{date}</span>
      <MoreHorizontal size={17} className="row-more" />
    </div>
  );
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}