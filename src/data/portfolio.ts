/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything on the site is rendered from this file.
 *
 *  Sources: CV (Kavindu_Chamith_Resume_SSE.pdf) and LinkedIn export (Profile.pdf).
 *  Where the two disagreed, the CV (the more recent document) was used:
 *    • SLIIT degree period → Jan 2020 – Jan 2024 (LinkedIn lists Jan 2023).
 *
 *  ✏️  EDITABLE / MISSING FIELDS — fill these in when available:
 *    • profile.links.github.href ........ no GitHub URL in either document (link is hidden while null)
 *    • projects[].github ................ no repository URLs supplied (button hidden while null)
 *    • projects[].screenshots ........... live products use homepage screenshots; the rest show abstract illustrations
 *
 *  Intentionally NOT published: phone number, street address and referees'
 *  contact details from the CV.
 */
import type {
  Certification,
  Education,
  Honour,
  Photo,
  Profile,
  Project,
  Publication,
  ResearchShowcase,
  Role,
  Skill,
  SkillCategory,
  Stat,
} from "@/types/portfolio";

export const profile: Profile = {
  fullName: "Don Kavindu Chamith Senevirathna",
  displayName: { first: "Kavindu", last: "Senevirathna" },
  initials: "KS",
  title: "Senior Software Engineer",
  company: "CodeGen International",
  location: {
    city: "Colombo",
    country: "Sri Lanka",
    timezone: "Asia/Colombo",
    coords: "6.9271° N, 79.8612° E",
  },
  heroIntro:
    "I design and build scalable enterprise software — from Angular and Spring Boot platforms to LLM-powered agents and RAG knowledge bases — at CodeGen International.",
  email: "kavinduchamith01@gmail.com",
  links: {
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kavindu-senevirathna-700a6a21a",
      handle: "in/kavindu-senevirathna",
    },
    github: {
      label: "GitHub",
      href: null, // ✏️ e.g. "https://github.com/your-username"
      handle: undefined,
    },
  },
  languages: [
    { name: "Sinhala", level: "Native" },
    { name: "English", level: "Professional working" },
  ],
};

export const marqueeTech = [
  "Java",
  "Spring Boot",
  "Angular",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Kotlin",
  ".NET",
  "C++",
  "LangChain",
  "CrewAI",
  "Weaviate",
  "RAG",
  "Docker",
  "Kubernetes",
  "GitLab CI/CD",
  "Jenkins",
  "Splunk",
  "JMeter",
  "OWASP ZAP",
];

export const about = {
  heading: [
    { text: "Building", accent: false },
    { text: "digital", accent: false },
    { text: "experiences", accent: true },
    { text: "through", accent: false },
    { text: "engineering", accent: true },
    { text: "and", accent: false },
    { text: "creativity.", accent: true },
  ],
  paragraphs: [
    "I’m a Senior Software Engineer at CodeGen International in Colombo, with a First Class Honours degree in Software Engineering from SLIIT. I grew from intern to senior engineer at the same company — four roles, each with more ownership than the last.",
    "My work spans the full stack: Angular and React on the front end; Spring Boot, Node.js and .NET on the back end; Docker, Kubernetes and CI/CD pipelines in between. Today I lead AI-related initiatives — building LLM agents that automate business workflows and knowledge bases on graph and vector databases for semantic search and RAG.",
    "I care about clean, maintainable code, efficient architecture, and the non-functional details that make software production-grade: performance, security and observability.",
  ],
  approach: [
    {
      title: "Scalable by design",
      body: "Enterprise features that hold up — Spring Boot services, Angular front ends, containerised delivery on Kubernetes.",
    },
    {
      title: "AI where it adds value",
      body: "LLM agents, retrieval-augmented generation and vector search, applied to real business workflows.",
    },
    {
      title: "Production-grade NFRs",
      body: "Load testing with JMeter, profiling, Splunk observability and OWASP ZAP security assessments.",
    },
    {
      title: "Agile, collaborative",
      body: "Former Scrum Master — sprint planning, retrospectives and backlog grooming for cross-functional teams.",
    },
  ],
};

export const stats: Stat[] = [
  {
    value: "4+",
    numeric: 4,
    suffix: "+",
    label: "Years at CodeGen",
    note: "Since Oct 2022, incl. internship",
  },
  {
    value: "4",
    numeric: 4,
    label: "Roles, one trajectory",
    note: "Intern → Associate → Engineer → Senior",
  },
  {
    value: "3.71",
    numeric: 3.71,
    decimals: 2,
    label: "CGPA · First Class",
    note: "BSc (Hons) IT, SLIIT",
  },
];

export const experience: Role[] = [
  {
    title: "Senior Software Engineer",
    company: "CodeGen International",
    location: "Colombo, Sri Lanka",
    start: "May 2025",
    end: "Present",
    current: true,
    summary: "Leading AI initiatives while delivering full-stack enterprise features.",
    highlights: [
      "Spearhead AI-related initiatives, architecting and deploying multiple AI agents using LLM frameworks to automate complex business workflows and enhance platform intelligence.",
      "Designed and implemented knowledge base solutions on graph databases and the Weaviate vector database, enabling semantic search and retrieval-augmented generation (RAG).",
      "Translate client requirements into scalable full-stack features with Angular and Spring Boot, delivered on time and aligned with business objectives.",
    ],
    tech: ["LLM Agents", "RAG", "Weaviate", "Graph DB", "Angular", "Spring Boot"],
  },
  {
    title: "Software Engineer",
    company: "CodeGen International",
    location: "Colombo, Sri Lanka",
    start: "Jan 2024",
    end: "May 2025",
    summary: "Engineer and Scrum Master — performance, security and delivery.",
    highlights: [
      "Served a dual role as Software Engineer and Scrum Master — facilitating sprint planning, retrospectives and backlog grooming for cross-functional Agile teams.",
      "Drove performance optimisation through JMeter load testing and Splunk observability; reduced vulnerability exposure with OWASP ZAP security assessments.",
      "Implemented client-driven enhancements across the Angular front end and Spring Boot back end.",
      "Managed CI/CD pipelines (GitLab, Jenkins) and orchestrated containerised deployments with Docker and Kubernetes.",
    ],
    tech: ["Angular", "Spring Boot", "JMeter", "Splunk", "OWASP ZAP", "GitLab", "Jenkins", "Kubernetes"],
  },
  {
    title: "Associate Software Engineer",
    company: "CodeGen International",
    location: "Colombo, Sri Lanka",
    start: "Jun 2023",
    end: "Jan 2024",
    summary: "Enterprise features, integration and non-functional quality.",
    highlights: [
      "Delivered enterprise features with AngularJS and Spring Boot inside a cross-functional team, contributing to system integration and Agile ceremonies.",
      "Executed security and performance testing with OWASP ZAP and JMeter; identified, analysed and resolved non-functional requirement (NFR) issues to production-grade standards.",
      "Used Docker, Kubernetes, Jenkins and GitLab to support streamlined, automated delivery.",
    ],
    tech: ["AngularJS", "Spring Boot", "OWASP ZAP", "JMeter", "Docker", "Jenkins"],
  },
  {
    title: "Software Engineer Intern",
    company: "CodeGen International",
    location: "Trace Expert City, Sri Lanka",
    start: "Oct 2022",
    end: "Jun 2023",
    summary: "Where it started — Java and Spring Boot foundations.",
    highlights: [
      "Developed and tested back-end features in Java and Spring Boot, building a strong foundation in enterprise application patterns and moving into a full-time engineering role.",
    ],
    tech: ["Java", "Spring Boot"],
  },
];

export const skillCategories: SkillCategory[] = [
  { id: "languages", label: "Languages", blurb: "The foundations I think and build in." },
  { id: "frontend", label: "Frontend", blurb: "Component-driven interfaces for enterprise products." },
  { id: "backend", label: "Backend", blurb: "Services, APIs and integration layers." },
  { id: "ai", label: "AI / ML", blurb: "From CNNs to LLM agents and retrieval." },
  { id: "devops", label: "Cloud & DevOps", blurb: "Containerised, automated delivery." },
  { id: "data", label: "Databases", blurb: "Document, relational, vector and graph." },
  { id: "quality", label: "Quality & Practice", blurb: "Performance, security and the way teams work." },
];

export const skills: Skill[] = [
  // Languages
  { name: "Java", icon: "siOpenjdk", category: "languages" },
  { name: "TypeScript", icon: "siTypescript", category: "languages" },
  { name: "JavaScript", icon: "siJavascript", category: "languages" },
  { name: "Python", icon: "siPython", category: "languages" },
  { name: "Kotlin", icon: "siKotlin", category: "languages" },
  { name: "C++", icon: "siCplusplus", category: "languages" },
  { name: "C#", category: "languages" },
  // Frontend
  { name: "Angular", icon: "siAngular", category: "frontend" },
  { name: "AngularJS", icon: "siAngular", category: "frontend" },
  { name: "React", icon: "siReact", category: "frontend" },
  { name: "Next.js", icon: "siNextdotjs", category: "frontend" },
  // Backend
  { name: "Spring Boot", icon: "siSpringboot", category: "backend" },
  { name: "Node.js", icon: "siNodedotjs", category: "backend" },
  { name: "Express.js", icon: "siExpress", category: "backend" },
  { name: ".NET", icon: "siDotnet", category: "backend" },
  // AI / ML
  { name: "LangChain", icon: "siLangchain", category: "ai" },
  { name: "CrewAI", icon: "siCrewai", category: "ai" },
  { name: "RAG", category: "ai" },
  { name: "TensorFlow", icon: "siTensorflow", category: "ai" },
  { name: "Keras", icon: "siKeras", category: "ai" },
  { name: "CNN / Deep Learning", category: "ai" },
  { name: "IoT Integration", category: "ai" },
  // DevOps
  { name: "Docker", icon: "siDocker", category: "devops" },
  { name: "Kubernetes", icon: "siKubernetes", category: "devops" },
  { name: "Jenkins", icon: "siJenkins", category: "devops" },
  { name: "GitLab CI/CD", icon: "siGitlab", category: "devops" },
  { name: "Splunk", icon: "siSplunk", category: "devops" },
  // Data
  { name: "MongoDB", icon: "siMongodb", category: "data" },
  { name: "MySQL", icon: "siMysql", category: "data" },
  { name: "SQL", category: "data" },
  { name: "Weaviate", category: "data" },
  { name: "Graph Databases", category: "data" },
  // Quality & practice
  { name: "JMeter", icon: "siApachejmeter", category: "quality" },
  { name: "OWASP ZAP", icon: "siZap", category: "quality" },
  { name: "YourKit", category: "quality" },
  { name: "Agile / Scrum", category: "quality" },
  { name: "NFR Analysis", category: "quality" },
];

/** Pairs of skills that are used together in my actual work — drawn as connections. */
export const skillLinks: [string, string][] = [
  ["Angular", "Spring Boot"],
  ["AngularJS", "Spring Boot"],
  ["Java", "Spring Boot"],
  ["TypeScript", "Angular"],
  ["React", "Node.js"],
  ["Node.js", "MongoDB"],
  ["Express.js", "MongoDB"],
  ["Next.js", "React"],
  ["C#", ".NET"],
  ["Python", "TensorFlow"],
  ["TensorFlow", "Keras"],
  ["Keras", "CNN / Deep Learning"],
  ["CNN / Deep Learning", "IoT Integration"],
  ["LangChain", "RAG"],
  ["CrewAI", "LangChain"],
  ["RAG", "Weaviate"],
  ["RAG", "Graph Databases"],
  ["Docker", "Kubernetes"],
  ["Jenkins", "GitLab CI/CD"],
  ["GitLab CI/CD", "Docker"],
  ["Splunk", "JMeter"],
  ["JMeter", "NFR Analysis"],
  ["OWASP ZAP", "NFR Analysis"],
  ["YourKit", "JMeter"],
  ["MySQL", "SQL"],
  ["Spring Boot", "MySQL"],
];

export const projects: Project[] = [
  {
    slug: "ai-agents-knowledge-base",
    name: "LLM Agents & RAG Knowledge Bases",
    category: "AI Engineering",
    context: "Professional work · CodeGen International",
    year: "2025 — Now",
    description:
      "Multiple AI agents built on LLM frameworks to automate complex business workflows, backed by knowledge bases that make enterprise information searchable by meaning.",
    problem:
      "Complex business workflows needed automation, and platform knowledge needed to be retrievable semantically — not just by keyword.",
    contribution:
      "Architected and deployed the agents, and designed and implemented knowledge base solutions on graph databases and Weaviate to power semantic search and retrieval-augmented generation.",
    tech: ["LLM frameworks", "RAG", "Weaviate", "Graph DB"],
    github: null,
    live: null,
    screenshots: [],
    visual: "agents",
  },
  {
    slug: "questio",
    name: "Questio — AI MCQ Generator",
    category: "AI Product",
    context: "Independent build · Live product",
    description:
      "Upload a PDF, DOCX or text file and Questio turns it into high-quality multiple choice questions, with correct answers and explanations, in English or Sinhala.",
    problem:
      "Teachers and students spend hours writing practice questions by hand, and almost no tools generate them in Sinhala.",
    contribution:
      "Built the document parsing pipeline, the AI generation layer on Gemini and OpenAI, and shareable session links so a group can take the same quiz together in real time.",
    tech: ["Next.js", "Gemini", "OpenAI", "Real-time"],
    github: null,
    live: "https://questios.vercel.app/",
    screenshots: [{ src: "/images/projects/questio.webp", alt: "Questio landing page: Generate intelligent MCQs instantly" }],
  },
  {
    slug: "helabiz",
    name: "Helabiz",
    category: "SaaS Platform",
    context: "Independent build · Live product",
    description:
      "An all-in-one platform for Sri Lankan small businesses: a drag-and-drop website builder on the front, and orders, stock, customers, expenses and profit on the back — in Sinhala and English.",
    problem:
      "Small sellers run on WhatsApp and Instagram chats, keep accounts in notebooks and can't afford a developer for a proper website.",
    contribution:
      "Designed and built the product end to end: the drag-and-drop site builder with templates, cart and checkout, and the business dashboard for orders, inventory, invoices and reports, with a bilingual Sinhala/English interface.",
    tech: ["Next.js", "Drag & Drop Builder", "E-Commerce", "i18n"],
    github: null,
    live: "https://helabiz.vercel.app/",
    screenshots: [{ src: "/images/projects/helabiz.webp", alt: "Helabiz landing page in Sinhala with a preview of the website builder" }],
  },
  {
    slug: "fixlk",
    name: "FixLK",
    category: "Marketplace",
    context: "Independent build · Live product",
    description:
      "A services marketplace for Sri Lanka: post a job for free and verified electricians, plumbers, carpenters, tutors and photographers in your district send you quotes.",
    problem:
      "Finding a trustworthy tradesperson in Sri Lanka still runs on word of mouth, with no easy way to compare price, rating or response time.",
    contribution:
      "Built the job posting and quoting flow, provider profiles with ratings and response times, district-based search across all 25 districts and WhatsApp-first contact.",
    tech: ["Next.js", "Marketplace", "Reviews", "WhatsApp"],
    github: null,
    live: "https://fix-lk.vercel.app/",
    screenshots: [{ src: "/images/projects/fixlk.webp", alt: "FixLK homepage: find a trusted electrician, plumber or carpenter near you" }],
  },
  {
    slug: "langa",
    name: "Langa",
    category: "Social · Real-time",
    context: "Independent build · Live product",
    description:
      "A location-based social app for meeting people nearby: browse who's online within a chosen radius, see shared interests and start a private real-time chat.",
    problem:
      "Meeting new people nearby usually means exposing your exact location — Langa needed discovery without that privacy cost.",
    contribution:
      "Built radius-based discovery with distances calculated server-side so coordinates are never shared, real-time chat with typing indicators and read receipts, and safety tools for hiding, blocking and reporting.",
    tech: ["Next.js", "Geolocation", "Real-time Chat", "Privacy"],
    github: null,
    live: "https://chat-gamma-sandy.vercel.app/",
    screenshots: [{ src: "/images/projects/langa.webp", alt: "Langa landing page: meet new people right around you" }],
  },
  {
    slug: "seoul-aura",
    name: "Seoul Aura",
    category: "E-Commerce",
    context: "Client build · seoulaura.lk",
    description:
      "A live online store selling authentic Korean skincare in Sri Lanka, with new arrivals, pre-orders, best sellers and islandwide delivery.",
    problem:
      "A K-beauty importer needed a store that builds trust in product authenticity and handles both in-stock items and pre-orders from Seoul.",
    contribution:
      "Built the storefront end to end: product catalogue and categories, pre-order flow, cart, promotions and a community section.",
    tech: ["Next.js", "E-Commerce", "Pre-orders", "SEO"],
    github: null,
    live: "https://www.seoulaura.lk/",
    screenshots: [{ src: "/images/projects/seoul-aura.webp", alt: "Seoul Aura storefront with a Korean skincare promotional banner" }],
  },
  {
    slug: "ceylora",
    name: "Ceylora",
    category: "Travel Experience",
    context: "Independent build · Live site",
    description:
      "An immersive guide to Sri Lanka — ancient kingdoms, misty tea country, wildlife and coastlines — told through real photography and an interactive island map.",
    problem:
      "Most Sri Lanka travel sites are lists of links; Ceylora set out to make the island feel like a story you scroll through.",
    contribution:
      "Designed and built the experience: scroll-driven chapters, destination and experience guides, an interactive map of 21 places and a travel journal.",
    tech: ["Next.js", "Animation", "Interactive Map", "Editorial Design"],
    github: null,
    live: "https://ceylora-lime.vercel.app/",
    screenshots: [{ src: "/images/projects/ceylora.webp", alt: "Ceylora homepage: Discover the soul of Sri Lanka, over Sigiriya at dusk" }],
  },
  {
    slug: "smart-pest-detection",
    name: "Smart Pest Infestation Detection Device",
    category: "IoT + Deep Learning",
    context: "Final year research · SLIIT",
    description:
      "An IoT device that classifies pest infestations in tea plantations in real time, with a companion web and mobile app for farmer monitoring.",
    problem:
      "Tea farmers need to spot pest infestations early and keep an eye on plantation health without walking every row.",
    contribution:
      "Built the IoT and deep-learning device for real-time classification, plus the companion web and mobile apps for monitoring.",
    outcome: "Recognised for innovation in AI-driven agricultural technology.",
    tech: ["Python", "TensorFlow", "IoT", "Web & Mobile"],
    github: null,
    live: null,
    screenshots: [],
    visual: "pest",
  },
  {
    slug: "drowsy-driver-detection",
    name: "Drowsy Driver Detection System",
    category: "Computer Vision",
    context: "Academic project",
    description:
      "A CNN-based facial analysis system that detects driver drowsiness in real time and raises safety alerts.",
    problem: "Driver fatigue is a silent road-safety risk that needs to be caught the moment it happens.",
    contribution:
      "Developed the CNN-based facial analysis pipeline for real-time drowsiness detection and alerting.",
    tech: ["Python", "TensorFlow", "Keras", "CNN"],
    github: null,
    live: null,
    screenshots: [],
    visual: "drowsy",
  },
  {
    slug: "mern-applications",
    name: "Three Full-Stack MERN Applications",
    category: "Full-Stack",
    context: "Medical Records · Ticket Reservation · Research Projects",
    description:
      "Healthcare record management, seat-based movie ticketing with an admin panel, and research-project tracking with task assignment.",
    problem:
      "Three different domains — patient records, cinema seating and research coordination — each needing a complete web application.",
    contribution: "Delivered all three as full-stack MERN applications.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    github: null,
    live: null,
    screenshots: [],
    visual: "mern",
  },
  {
    slug: "ecommerce-aspnet",
    name: "E-Commerce Platform",
    category: "Client Delivery",
    context: "Production build for a live client",
    description:
      "A production e-commerce platform with product management, cart and checkout — built and handed over to a live client.",
    problem: "A client needed a working online store they could run and manage themselves.",
    contribution: "Built the platform end-to-end in ASP.NET and handed it over to the client.",
    tech: ["ASP.NET", ".NET", "C#"],
    github: null,
    live: null,
    screenshots: [],
    visual: "commerce",
  },
];

/** Source: https://arxiv.org/abs/2608.27480 */
export const publication: Publication = {
  title:
    "Effectiveness of IoT and Deep Learning for Detection and Severity Assessment of Postelectrotermes militaris in Tea Plantations",
  authors: [
    "D.K.C. Senevirathna",
    "A.A.E. Nanayakkara",
    "H.M.C.K. Kulathunga",
    "J.K.D.P. Nadula",
    "R.M. Mapatuna",
    "Malithi Nawarathne",
    "Jaliya L. Wijayaraja",
    "P.D. Senanayake",
    "Samitha Vidhanaarachchi",
    "Kalpani Manathunga",
  ],
  me: "D.K.C. Senevirathna",
  venue: "The Journal of Agricultural Sciences, Sri Lanka",
  status: "Accepted for publication",
  year: "2026",
  summary:
    "An IoT acoustic-monitoring framework that listens to tea trunks to detect the Upcountry Live Wood Termite early — and scores how severe each infestation is.",
  method:
    "A Raspberry Pi device with a high-sensitivity microphone records tea trunks non-invasively and tags each reading with GPS. Spectrograms feed a CNN, and a weighted severity model combines infestation probability, acoustic amplitude and infested neighbours within 5 m — mapped so managers can prioritise inspections.",
  metrics: [
    { value: "81.5%", numeric: 81.5, decimals: 1, suffix: "%", label: "Accuracy", note: "" },
    { value: "83.0%", numeric: 83, decimals: 1, suffix: "%", label: "Recall", note: "" },
    { value: "81.8%", numeric: 81.8, decimals: 1, suffix: "%", label: "F1-score", note: "" },
    { value: "0.819", numeric: 0.819, decimals: 3, label: "ROC-AUC", note: "" },
  ],
  links: [
    { label: "Read on arXiv", href: "https://arxiv.org/abs/2608.27480" },
    { label: "DOI", href: "https://doi.org/10.48550/arXiv.2608.27480" },
  ],
};

export const researchShowcase: ResearchShowcase = {
  title: "Showcasing IoT + deep learning for the tea industry.",
  summary:
    "We showcased our final-year research at SLIIT — a pioneering effort to combine the Internet of Things with deep-learning models to change how pests are managed on tea plantations.",
  detail:
    "The IoT device we built identifies pest habitats and assesses the severity of infestations in the field, with a companion web dashboard and mobile app for monitoring.",
  outcome: "Recognised for innovation in AI-driven agricultural technology.",
  tags: ["IoT device", "Deep learning", "Habitat identification", "Severity assessment"],
  photos: [
    {
      src: "/images/achievements/research-showcase-team.webp",
      alt: "The research team at the SLIIT final-year showcase stand, with the project's mobile app, web dashboard, poster and awards",
      caption: "The team at the showcase stand",
    },
    {
      src: "/images/achievements/research-showcase-supervisor.webp",
      alt: "The research team with a guest at the showcase stand, holding up the project's mobile app",
      caption: "Demoing the companion app",
    },
  ],
};

export const honours: Honour[] = [
  {
    title: "First Class Honours",
    stat: { value: "3.71", numeric: 3.71, decimals: 2, label: "CGPA", note: "/ 4.00" },
    detail: "BSc (Hons) in Information Technology, specialising in Software Engineering — SLIIT.",
  },
  {
    title: "Dean's List",
    stat: { value: "6", numeric: 6, label: "Semesters", note: "semesters" },
    detail: "Named on SLIIT's Dean's List for academic excellence across six semesters.",
  },
];

export const education: Education[] = [
  {
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    qualification: "BSc (Hons) in Information Technology",
    specialisation: "Specialising in Software Engineering",
    period: "Jan 2020 — Jan 2024",
    highlights: [
      "CGPA 3.71 / 4.00 — First Class Honours",
      "Dean's List — six semesters",
      "Final year research recognised for innovation in AI-driven agricultural technology",
    ],
  },
  {
    institution: "D.S. Senanayake College, Colombo",
    qualification: "GCE Advanced Level",
    specialisation: "Mathematics stream",
    period: "Feb 2015 — Dec 2019",
    highlights: [],
  },
  {
    institution: "D.S. Senanayake College, Colombo",
    qualification: "GCE Ordinary Level",
    period: "Jan 2009 — Dec 2015",
    highlights: ["9 A passes", "Senior School Prefect", "Science Society · Road Safety Society"],
  },
];

export const certifications: Certification[] = [
  { name: "Software Development Processes and Methodologies", issuer: "University of Minnesota · Coursera" },
  { name: "Programming Fundamentals", issuer: "Duke University · Coursera" },
  { name: "Programming Foundations with JavaScript, HTML and CSS", issuer: "Coursera" },
  { name: "Introduction to Web Development", issuer: "UC Davis · Coursera" },
  { name: "Technical Support Fundamentals", issuer: "Google · Coursera" },
  { name: "System Administration and IT Infrastructure Services", issuer: "Google · Coursera" },
  { name: "Operating Systems: Becoming a Power User", issuer: "Google · Coursera" },
  { name: "The Bits and Bytes of Computer Networking", issuer: "Google · Coursera" },
  { name: "Write Professional Emails in English", issuer: "Georgia Tech · Coursera" },
  { name: "Grammar and Punctuation", issuer: "UC Irvine Division of Continuing Education" },
];

/** Landscape photography — Unsplash License (free to use; credited on the page). */
export const sriLankaHero: Photo = {
  src: "/images/sri-lanka/sigiriya.jpg",
  alt: "Aerial view of Sigiriya rock fortress rising above dense green forest",
  place: "Sigiriya",
  region: "Central Province",
  credit: {
    name: "Dylan Shaw",
    profile: "https://unsplash.com/@dylanshaw",
    photo: "https://unsplash.com/photos/sigiriya-rock-fortress-in-sri-lanka-smUAKwMT8XA",
  },
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const site = {
  /** ✏️ Set NEXT_PUBLIC_SITE_URL to your real domain when deploying (used for SEO / Open Graph). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Kavindu Senevirathna — Senior Software Engineer in Sri Lanka building scalable enterprise software, full-stack platforms and LLM-powered AI systems.",
};
