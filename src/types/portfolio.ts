export type SocialLink = {
  label: string;
  /** Full URL. Leave `null` to hide the link everywhere on the site. */
  href: string | null;
  handle?: string;
};

export type Profile = {
  fullName: string;
  displayName: { first: string; last: string };
  initials: string;
  title: string;
  company: string;
  location: { city: string; country: string; timezone: string; coords: string };
  heroIntro: string;
  email: string;
  links: {
    linkedin: SocialLink;
    github: SocialLink;
  };
  languages: { name: string; level: string }[];
};

export type Stat = {
  value: string;
  /** Optional numeric target for count-up animations. */
  numeric?: number;
  decimals?: number;
  suffix?: string;
  label: string;
  note: string;
};

export type Role = {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tech: string[];
};

export type SkillCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "ai"
  | "devops"
  | "data"
  | "quality";

export type Skill = {
  name: string;
  /** simple-icons export name, e.g. "siDocker". Omit for concepts without a logo. */
  icon?: string;
  category: SkillCategoryId;
};

export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  blurb: string;
};

export type ProjectVisualKind = "agents" | "pest" | "drowsy" | "mern" | "commerce";

export type Project = {
  slug: string;
  name: string;
  category: string;
  context: string;
  year?: string;
  description: string;
  problem: string;
  contribution: string;
  outcome?: string;
  tech: string[];
  /** Add a URL to show a "Source" button. */
  github: string | null;
  /** Add a URL to show a "Live" button. */
  live: string | null;
  /** Add real screenshots under /public/images/projects and list them here. */
  screenshots: { src: string; alt: string }[];
  /** Abstract illustration, used when there is no screenshot. */
  visual?: ProjectVisualKind;
};

export type Publication = {
  title: string;
  authors: string[];
  /** The author name to highlight as you. */
  me: string;
  venue: string;
  status: string;
  year: string;
  summary: string;
  method: string;
  metrics: Stat[];
  links: { label: string; href: string }[];
};

export type ResearchShowcase = {
  title: string;
  summary: string;
  detail: string;
  outcome: string;
  tags: string[];
  photos: { src: string; alt: string; caption: string }[];
};

export type Honour = {
  title: string;
  stat: Stat;
  detail: string;
};

export type Education = {
  institution: string;
  qualification: string;
  specialisation?: string;
  period: string;
  location?: string;
  highlights: string[];
};

export type Certification = {
  name: string;
  issuer: string;
};

export type Photo = {
  src: string;
  alt: string;
  place: string;
  region: string;
  credit: { name: string; profile: string; photo: string };
};
