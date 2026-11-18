// ==========================================
// Type Definitions
// ==========================================

export interface EducationItem {
  title: string;
  institution: string;
  year: string;
  type: string;
}

export interface CertificateItem {
  title: string;
  institution: string;
  year: string;
  type: string;
  file: string; // PDF path
}

export interface ExperienceItem {
  position: string;
  company: string;
  employmentType?: string; // e.g. "Full-time" or "Part-time"
  period: string;          // e.g. "May 2023 - Present · 3 yrs 6 mos"
  status?: string;          // e.g. "Present"
  icon: string;
  description?: string;
  bullets?: string[];      // Multiple bullet points like LinkedIn
}

export interface RecommendedCompanyItem {
  name: string;
  icon: string;
  description: string;
}

export interface OtherExperienceItem {
  name: string;
  role?: string;
  details: string;
}

export interface ClientLogoItem {
  name: string;
  logo: string; // Path inside public/icons/companies/
  url?: string; // Optional website link
}

export interface CaseStudyItem {
  title: string;
  description: string;
  image: string; // WebP path
  figma: string;
}

export interface PrivateFileItem {
  name: string;
  type: "pdf" | "image";
  file: string; // Exact filename served via protected route
  size?: string;
}

export interface PrivateCategory {
  categoryName: string;
  files: PrivateFileItem[];
}

export interface DataProjectItem {
  title: string;
  technologies: string;
  bullets: string[];
  image: string; // WebP path
  github: string;
  status?: string;
}

export interface PersonalProjectItem {
  title: string;
  description: string;
  image: string; // WebP path
  link: string;
  status: "Live" | "Coming Soon";
}

// ==========================================
// Portfolio Data
// ==========================================

export const portfolioData = {
  personal: {
    name: "Momin Hassan",
    role: "UI/UX Designer | Aspiring Data Engineer",
    profession: "Junior Data Engineer",
    experience: "5+ Years",
    projects: "250+ Fiverr Projects",
    location: "Pakistan",
    availability: "Available for opportunities",
    avatar: "/profile.webp",
    wallpaper: "/wallpaper.webp",
    resumeFile: "/resume/Momin-Hassan-Resume.pdf",
    bio: [
      "I’m a UI/UX & Product Designer with 5+ years of experience transitioning into Data Engineering.",
      "Designed and contributed to 150+ apps and 30+ websites, working with developers, product managers, and cross-functional teams.",
      "Currently working as a Junior Data Engineer, with hands-on experience building ETL pipelines, relational databases, data warehouses, and analytics solutions."
    ],
  },

  contact: {
    email: "mominhasan186@gmail.com",
    linkedin: "https://linkedin.com/in/mominhassan186",
    github: "https://github.com/mominhassan186",
    fiverr: "https://www.fiverr.com/mominhassan911?public_mode=true",
    phone: "+92 304 6881700",
    location: "Pakistan",
  },

  education: [
    {
      title: "Bachelor's Degree — Computer Science",
      institution: "The University of Faisalabad",
      year: "30 Sep, 2019 – 02 Apr, 2023 (4 Year)",
      type: "4 Year Degree",
    },
    {
      title: "Intermediate - FSC (Pre-Engineering)",
      institution: "Abdul Salam Groups of Colleges",
      year: "01 Sep, 2017 – 10 Sep, 2019 (2 Year)",
      type: "2 Year Degree",
    },
    {
      title: "Matriculation - Science",
      institution: "Anmol Public High School",
      year: "01 Apr, 2015 – 10 Aug, 2017 (2 Year)",
      type: "2 Year Degree",
    },
  ] as EducationItem[],

  certificates: [
    {
      title: "PSEB Freelancer Certificate",
      institution: "Pakistan Software Export Board (PSEB) - Ministry of IT & Telecom",
      year: "Valid until Aug 2027",
      type: "Certificate",
      file: "/certificates/PSEB Freelancer Certificate.pdf",
    },
    {
      title: "Python for Data Science, AI & Development",
      institution: "Coursera / IBM",
      year: "Apr 2026",
      type: "Certificate",
      file: "/certificates/python-data-science.pdf",
    },
    {
      title: "Foundations of Project Management",
      institution: "Coursera / Google",
      year: "Sep 2025",
      type: "Certificate",
      file: "/certificates/project-management.pdf",
    },
    {
      title: "Developing Innovative Ideas for Product Leaders",
      institution: "University of Maryland, College Park",
      year: "Jan 2024",
      type: "Certificate",
      file: "/certificates/innovative-ideas.pdf",
    },
    {
      title: "Using AI in the UX Process",
      institution: "LinkedIn",
      year: "Nov 2024",
      type: "Certificate",
      file: "/certificates/ai-ux-design.pdf",
    },
    {
      title: "Agile User Experience Design and Research",
      institution: "LinkedIn",
      year: "Oct 2024",
      type: "Certificate",
      file: "/certificates/agile-ux.pdf",
    },
    {
      title: "Systems Thinking for Product Designers",
      institution: "LinkedIn",
      year: "Oct 2024",
      type: "Certificate",
      file: "/certificates/systems-thinking.pdf",
    },
  ] as CertificateItem[],

  experience: {
    // Category 1: Professional Experience (matches ExperienceItem[])
    professional: [
      {
        position: "UI/UX Designer - Freelance",
        company: "Fiverr",
        employmentType: "Full-time",
        period: "May 2023 – Present · 3 yrs 6 mos",
        status: "Present",
        icon: "/icons/companies/fiverr.svg",
        description:
          "Completed 250+ projects while maintaining a consistent 5-star client rating. Collaborated with founders, developers, and product teams delivering 150+ mobile apps and 30+ websites",
      },
      {
        position: "UI/UX Designer - Freelance",
        company: "Fiverr",
        employmentType: "Part-time",
        period: "Jul 2021 – Apr 2023 · 1 yr 10 mos",
        icon: "/icons/companies/fiverr.svg",
        description:
          "Provided Part-time freelance UI/UX design services alongside completing undergraduate studies (BS Computer Science).",
      },
    ] as ExperienceItem[],

    // 2- 4-per-row client logos (stored in public/icons/companies/*.webp)
    
    clientLogos: [
      { name: "Olive Dating LLC", logo: "/icons/companies/olive-dating.webp" },
      { name: "HDIDA AUTO", logo: "/icons/companies/hdida-auto.webp" },
      { name: "CLIENTMENT OÜ", logo: "/icons/companies/clientment.webp" },
      { name: "Foodsply Inc.", logo: "/icons/companies/FoodSply.webp" },
      { name: "BasketBallist", logo: "/icons/companies/client-5.webp" },
      { name: "WellScape", logo: "/icons/companies/client-6.webp" },
      { name: "InventoryBase", logo: "/icons/companies/client-7.webp" },
      { name: "Rythmia Life Advancment Centre", logo: "/icons/companies/client-8.webp" },
      { name: "4Plastic Inc.", logo: "/icons/companies/client-9.webp" },
      { name: "Scenic Air Safaris Ltd.", logo: "/icons/companies/client-10.webp" },
      { name: "Espresso Computing Inc.", logo: "/icons/companies/client-11.webp" },
      { name: "Groppr App", logo: "/icons/companies/client-12.webp" },
      { name: "Performall GmbH", logo: "/icons/companies/client-13.webp" },
      { name: "Real Italian Resturant", logo: "/icons/companies/client-14.webp" },
      { name: "Expaty.com", logo: "/icons/companies/client-15.webp" },
      { name: "20Lab.app", logo: "/icons/companies/client-16.webp" },
    ] as ClientLogoItem[],

    // Category 2: Companies Who Recommend Me (matches RecommendedCompanyItem[])
    recommended: [
      {
        name: "Olive Dating LLC",
        icon: "/icons/companies/olive-dating.svg",
        description:
          "Product research, UI/UX solutions, and performance monitoring for consumer mobile products.",
      },
      {
        name: "HDIDA AUTO",
        icon: "/icons/companies/hdida-auto.svg",
        description:
          "Led design strategy, branding, and interactive component systems working closely with technical teams.",
      },
      {
        name: "Clientment",
        icon: "/icons/companies/clientment.svg",
        description:
          "Designed comprehensive digital design systems and client-facing web workflows.",
      },
    ] as RecommendedCompanyItem[],

    // Category 3: Other Experience / Notable Engagements (matches OtherExperienceItem[])
    other: [
    ] as OtherExperienceItem[],
  },

  uiux: {
    title: "UI/UX Portfolio",
    description: "Selected UI/UX and product design work across web and mobile products.",
    skills: [
      "UI/UX Design", "Product Design", "User Research", "User Flows",
      "Prototyping", "Design Systems", "Figma", "FigJam", "Miro",
      "Loom", "Jira", "Notion", "Hotjar", "ChatGPT"
    ],
    featured: [
      {
        title: "AI Healthcare - Case Study",
        description: "Mobile app design and detailed case study for a health and wellness.",
        image: "/uiux/case-studies/featured-1.webp",
        figma: "https://www.figma.com/proto/EiZ7i54HIubTA1TUawjFgU/Halsa-App-Case-Study?node-id=18-2&viewport=-973%2C450%2C0.57&t=wYnUR5rhPmLaWoCY-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
      },
      {
        title: "Rail Guide - Case Study",
        description: "Mobile app for a railway station navigation & information platform.",
        image: "/uiux/case-studies/featured-2.webp",
        figma: "https://www.figma.com/proto/D26CmP2qFkZUUkrhgPVdck/RailGuide-App-Case-Study?node-id=1-2&p=f&viewport=575%2C249%2C0.45&t=3K72zCPlruiIZ0gE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
      },
      {
        title: "Sticky on web - Case Study",
        description: "Web extension for a productivity & note-taking while browsing.",
        image: "/uiux/case-studies/featured-3.webp",
        figma: "https://www.figma.com/proto/TleReuoUJwXmdAmAn6FaLT/Stiq-Web-Extension---Case-Study?node-id=1-5&viewport=463%2C231%2C0.44&t=ByQevYvxGXhm0cJW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
      }
    ] as CaseStudyItem[],
    images: [
      "/uiux/visual-portfolio/work-1.webp",
      "/uiux/visual-portfolio/work-2.webp",
      "/uiux/visual-portfolio/work-3.webp",
      "/uiux/visual-portfolio/work-4.webp",
      "/uiux/visual-portfolio/work-5.webp",
      "/uiux/visual-portfolio/work-6.webp",
      "/uiux/visual-portfolio/work-7.webp",
      "/uiux/visual-portfolio/work-8.webp",
      "/uiux/visual-portfolio/work-10.webp",
      "/uiux/visual-portfolio/work-11.webp",
      "/uiux/visual-portfolio/work-12.webp",
      "/uiux/visual-portfolio/work-13.webp",
      "/uiux/visual-portfolio/work-14.webp",
      "/uiux/visual-portfolio/work-15.webp",
      "/uiux/visual-portfolio/work-16.webp",
      "/uiux/visual-portfolio/work-17.webp",
      "/uiux/visual-portfolio/work-18.webp",
      "/uiux/visual-portfolio/work-19.webp",
      "/uiux/visual-portfolio/work-20.webp",
      "/uiux/visual-portfolio/work-21.webp",
      "/uiux/visual-portfolio/work-22.webp",
      "/uiux/visual-portfolio/work-23.webp",
      "/uiux/visual-portfolio/work-24.webp",
      "/uiux/visual-portfolio/work-25.webp",
      "/uiux/visual-portfolio/work-26.webp",
      "/uiux/visual-portfolio/work-27.webp",
      "/uiux/visual-portfolio/work-28.webp",
      "/uiux/visual-portfolio/work-29.webp",
      "/uiux/visual-portfolio/work-30.webp",
      "/uiux/visual-portfolio/work-31.webp",
      "/uiux/visual-portfolio/work-32.webp",
      "/uiux/visual-portfolio/work-33.webp",
      "/uiux/visual-portfolio/work-34.webp",
      "/uiux/visual-portfolio/work-35.webp",
      "/uiux/visual-portfolio/work-36.webp",
      "/uiux/visual-portfolio/work-37.webp",
      "/uiux/visual-portfolio/work-38.webp",
      "/uiux/visual-portfolio/work-39.webp",
      "/uiux/visual-portfolio/work-41.webp",
      "/uiux/visual-portfolio/work-42.webp",
      "/uiux/visual-portfolio/work-43.webp",
      "/uiux/visual-portfolio/work-44.webp",
      "/uiux/visual-portfolio/work-45.webp",
      "/uiux/visual-portfolio/work-46.webp",
    ] as string[],
  },

  dataEngineering: {
    title: "Data Engineering",
    description:
      "Transitioning into Data Engineering by combining my product thinking with robust backend data pipelines, relational modeling, data warehouses, and AI-driven workflows.",
    skills: [
      "Python", "SQL", "MySQL", "PostgreSQL", "Pandas", "ETL Pipelines",
      "Data Cleaning", "Data Transformation", "Data Modeling", "Data Warehousing",
      "Star Schema", "AWS S3", "AWS Lambda", "Apache Airflow", "Streamlit", "Power BI", "Git"
    ],
    projects: [
      {
        title: "Crypto Data Pipeline",
        technologies: "Python • PostgreSQL • REST API • Streamlit • Git",
        bullets: [
          "Built an end-to-end ETL pipeline that extracts live cryptocurrency data from the CoinGecko API.",
          "Cleaned and transformed JSON data using Python before loading it into PostgreSQL.",
          "Developed a Streamlit dashboard to visualize live market trends and key metrics."
        ],
        github: "https://github.com/mominhassan186/crypto-data-pipeline",
      },
      {
        title: "Healthcare M&E Performance Dashboard",
        technologies: "Python • PostgreSQL • SQL • Streamlit",
        bullets: [
          "Built a healthcare M&E dashboard using Python, Pandas, Plotly, and Streamlit.",
          "Tracked compliance, inspections, KPIs, and corrective actions.",
          "Designed the UI/UX in Figma and implemented the interactive dashboard."
        ],
        github: "https://github.com/mominhassan186/Healthcare-M-E-Performance-Dashboard-V1.0",
      },
      {
        title: "Cloud Data Pipeline",
        technologies: "Python • AWS • PostgreSQL • Airflow",
        bullets: [
          "Developing a cloud-based ETL pipeline to automate API data ingestion and processing.",
          "Implemented scheduled workflows with Apache Airflow and AWS cloud storage.",
          "Set up automated error logging and pipeline monitoring."
        ],
        github: "https://github.com/mominhassan186/Cloud-Data-Pipeline",
        status: "In Progress",
      },
    ] as DataProjectItem[],
  },

  personalProjects: [
    {
      title: "Stiq - Web Extension",
      description: "Personal product and entrepreneurial idea currently in development.",
      image: "/personal-projects/project-1.webp",
      link: "#",
      status: "Coming Soon",
    },
  ] as PersonalProjectItem[],

  languages: [
    "English — Fluent",
    "Urdu — Native",
    "German — Basic",
  ],

  interests: [
    "Fitness & Training",
    "Financial Markets & Trading",
    "Python",
    "Machine Learning",
    "Data Science",
  ],

  privateFiles: {
    title: "Confidential Documents",
    description: "Verified identity records, academic credentials, and official certificates.",
    zipDownloadUrl: "/api/unlock-private?zip=1",
    categories: [
      {
        categoryName: "Academic & Education",
        files: [
          {
            name: "Matriculation Certificate",
            type: "pdf",
            file: "Matric front and back.pdf",
            size: "In Science"
          },
          {
            name: "Intermediate Certificate",
            type: "pdf",
            file: "Inter front and back.pdf",
            size: "Pre-Engineering"
          },
          {
            name: "Bachelors Degree",
            type: "pdf",
            file: "BSCS Degree.pdf",
            size: "BSCS"
          },
          {
            name: "Bachelors Transcript",
            type: "pdf",
            file: "BSCS Transcript.pdf",
            size: "BSCS"
          },
        ],
      },
      {
        categoryName: "Identity & Licenses",
        files: [
          {
            name: "ID Card",
            type: "pdf",
            file: "ID Card Front-Back.pdf",
            size: "Valid until 2033"
          },
          {
            name: "Passport",
            type: "pdf",
            file: "Passport.pdf",
            size: "Valid until 2033"
          },
          {
            name: "Driving License",
            type: "pdf",
            file: "Driving_License.pdf",
            size: "Not Yet Issued"
          },
          {
            name: "Birth Certificate",
            type: "pdf",
            file: "Birth Certificate.pdf",
            size: ""
          },
          {
            name: "Domicile Certificate",
            type: "pdf",
            file: "Domicile.pdf",
            size: ""
          },
        ],
      },
      {
        categoryName: "University Letters",
        files: [
          {
            name: "From Dr. Abdul Rauf",
            type: "pdf",
            file: "Dr. Abdul Rauf - Rec Letter.pdf",
            size: ""
          },
          {
            name: "From Dr. Majid",
            type: "pdf",
            file: "Dr. Majid - Rec Letter.pdf",
            size: ""
          },
          {
            name: "University Bonafide Letter",
            type: "pdf",
            file: "Uni Bonafide Letter.pdf",
            size: ""
          },
        ],
      },
      {
        categoryName: "Work Recommendations Letters",
        files: [
          {
            name: "Clientment Recommendation Letter",
            type: "pdf",
            file: "Clientment Recommendation Letter.pdf",
            size: ""
          },
          {
            name: "Olive Dating LLC Recommendation Letter",
            type: "pdf",
            file: "Olive Dating LLC Recommendation Letter.pdf",
            size: ""
          },
      
        ],
      },
      {
        categoryName: "Official Profile Photos",
        files: [
          {
            name: "Profile Picture",
            type: "image",
            file: "Profile Picture.JPEG",
            size: ""
          },
          {
            name: "Profile with Glasses",
            type: "image",
            file: "Profile with Glasses.JPEG",
            size: ""
          },
        ],
      },
    ] as PrivateCategory[],
  },
};