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
  period: string;
  icon: string;
  description: string;
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

export interface CaseStudyItem {
  title: string;
  description: string;
  image: string; // WebP path
  figma: string;
}

// Private Files Directory
export interface PrivateFileItem {
  name: string;
  type: "pdf" | "image";
  file: string; // The confidential filename served via your protected API route
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

export const portfolioData = {
  personal: {
    name: "Momin Hassan",
    role: "UI/UX Designer | Aspiring Data Engineer",
    profession: "Junior Data Engineer",
    experience: "5+ Years",
    projects: "250+ Fiverr Projects",
    location: "Pakistan",
    availability: "Available for opportunities",
    avatar: "/profile.webp", // WebP photograph
    wallpaper: "/wallpaper.webp", // WebP desktop wallpaper
    resumeFile: "/resume/Momin-Hassan-Resume.pdf", // PDF document
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
      file: "/certificates/PSEB Freelancer Certificate.pdf", // PDF
    },

    {
      title: "Python for Data Science, AI & Development",
      institution: "Coursera / IBM",
      year: "Apr 2026",
      type: "Certificate",
      file: "/certificates/python-data-science.pdf", // PDF
    },
    {
      title: "Foundations of Project Management",
      institution: "Coursera / Google",
      year: "Sep 2025",
      type: "Certificate",
      file: "/certificates/project-management.pdf", // PDF
    },
    {
      title: "Developing Innovative Ideas for Product Leaders",
      institution: "University of Maryland, College Park",
      year: "Jan 2024",
      type: "Certificate",
      file: "/certificates/innovative-ideas.pdf", // PDF
    },
    {
      title: "Using AI in the UX Process",
      institution: "LinkedIn",
      year: "Nov 2024",
      type: "Certificate",
      file: "/certificates/ai-ux-design.pdf", // PDF
    },
    {
      title: "Agile User Experience Design and Research",
      institution: "LinkedIn",
      year: "Oct 2024",
      type: "Certificate",
      file: "/certificates/agile-ux.pdf", // PDF
    },
    {
      title: "Systems Thinking for Product Designers",
      institution: "LinkedIn",
      year: "Oct 2024",
      type: "Certificate",
      file: "/certificates/systems-thinking.pdf", // PDF
    },
  ] as CertificateItem[],

  experience: {
    // Category 1: Professional Experience (with dates & roles)
    professional: [
      {
        position: "UX/UI Designer",
        company: "Fiverr",
        period: "Jul 2021 – Present",
        icon: "/icons/companies/fiverr.svg",
        description:
          "Completed 250+ projects while maintaining a consistent 5-star client rating. Achieved Level-2 Seller status and collaborated with diverse clients to understand requirements and deliver tailored UX/UI solutions.",
      },
    ] as ExperienceItem[],

    // Category 2: Companies Who Recommend Me (focused on company & recommendation details)
    recommended: [

      {
        title: "Systems Thinking for Product Designers",
        institution: "LinkedIn",
        year: "Oct 2024",
        type: "Certificate",
        file: "/certificates/systems-thinking.pdf", // PDF
      },

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
        icon: "/icons/companies/clientment.svg", // Add SVG into public/icons/companies/
        description:
          "Designed comprehensive digital design systems and client-facing web workflows.",
      },
    ] as RecommendedCompanyItem[],

    // Category 3: Other Experience / Notable Engagements (simplified list)
    other: [
      {
        name: "Technolangs IT Training Institute",
        role: "UI/UX Practice",
        details: "Internship focused on design practice and workflows.",
      },
      {
        name: "GFX Mentor",
        role: "Design Tools",
        details: "Intensive training across core design tools and creative suites.",
      },
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
        image: "/uiux/case-studies/featured-1.webp", // WebP
        figma: "https://www.figma.com/proto/EiZ7i54HIubTA1TUawjFgU/Halsa-App-Case-Study?node-id=18-2&viewport=-973%2C450%2C0.57&t=wYnUR5rhPmLaWoCY-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
      },
      {
        title: "Rail Guide - Case Study",
        description: "Mobile app for a railway station navigation & information platform.",
        image: "/uiux/case-studies/featured-2.webp", // WebP
        figma: "https://www.figma.com/proto/D26CmP2qFkZUUkrhgPVdck/RailGuide-App-Case-Study?node-id=1-2&p=f&viewport=575%2C249%2C0.45&t=3K72zCPlruiIZ0gE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
      },
      {
        title: "Sticky on web - Case Study",
        description: "Web extension for a productivity & note-taking while browsing.",
        image: "/uiux/case-studies/featured-3.webp", // WebP
        figma: "https://www.figma.com/proto/TleReuoUJwXmdAmAn6FaLT/Stiq-Web-Extension---Case-Study?node-id=1-5&viewport=463%2C231%2C0.44&t=ByQevYvxGXhm0cJW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
      }
    ] as CaseStudyItem[],
    // Generates work-1.webp through work-20.webp

    images: [
      "/uiux/visual-portfolio/work-1.webp",
      "/uiux/visual-portfolio/work-2.webp",
      "/uiux/visual-portfolio/work-3.webp",
      "/uiux/visual-portfolio/work-4.webp",
      "/uiux/visual-portfolio/work-5.webp",
      "/uiux/visual-portfolio/work-6.webp",
      "/uiux/visual-portfolio/work-7.webp",
      "/uiux/visual-portfolio/work-8.webp",
      // "/uiux/visual-portfolio/work-9.webp",
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
      //"/uiux/visual-portfolio/work-40.webp",
      "/uiux/visual-portfolio/work-41.webp",
      "/uiux/visual-portfolio/work-42.webp",
      "/uiux/visual-portfolio/work-43.webp",
      "/uiux/visual-portfolio/work-44.webp",
      "/uiux/visual-portfolio/work-45.webp",
      "/uiux/visual-portfolio/work-46.webp",
    ] as string[], // <-- Add 'as string[]' here
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
      image: "/personal-projects/project-1.webp", // WebP
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

  // Private Files
  privateFiles: {
    title: "Confidential Documents",
    description: "Verified identity records, academic credentials, and official certificates.",
    zipDownloadUrl: "/api/download-profile-zip",
    categories: [
      {
        categoryName: "Academic & Education",
        files: [
          {
            name: "Matriculation Certificate",
            type: "pdf",
            file: "Matric front and back.pdf", // <-- Exact file name in protected-docs/
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
            file: "Bachelors_Transcript.pdf",
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
            file: "FBR_Certificate.pdf",
            size: ""
          },

          {
            name: "Olive Dating LLC Recommendation Letter",
            type: "pdf",
            file: "Olive Dating LLC Recommendation Letter.pdf",
            size: ""
          },

          {
            name: "HDIDA AUTO Recommendation Letter",
            type: "pdf",
            file: "HDIDA AUTO Recommendation Letter.pdf",
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
    ],
  },
};

