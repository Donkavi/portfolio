import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/navigation/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { Intro } from "@/components/ui/Intro";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { profile, site } from "@/data/portfolio";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const name = `${profile.displayName.first} ${profile.displayName.last}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${name} — ${profile.title}`,
    template: `%s — ${name}`,
  },
  description: site.description,
  applicationName: `${name} Portfolio`,
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  keywords: [
    name,
    profile.fullName,
    profile.title,
    "Software Engineer Sri Lanka",
    "Full-stack developer",
    "Spring Boot",
    "Angular",
    "React",
    "AI agents",
    "RAG",
    "LangChain",
    "Colombo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${name} — Portfolio`,
    title: `${name} — ${profile.title}`,
    description: site.description,
    locale: "en_US",
    firstName: profile.displayName.first,
    lastName: profile.displayName.last,
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} — ${profile.title}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: name,
  jobTitle: profile.title,
  worksFor: { "@type": "Organization", name: profile.company },
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressCountry: "LK",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Sri Lanka Institute of Information Technology" },
  email: `mailto:${profile.email}`,
  url: site.url,
  sameAs: [profile.links.linkedin.href, profile.links.github.href].filter(Boolean),
  knowsAbout: ["Java", "Spring Boot", "Angular", "React", "Node.js", "Python", "LLM agents", "RAG", "Kubernetes"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
    >
      <head>
        {/* Flag motion-capable clients before paint so hero elements don't flash before their entrance. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion');history.scrollRestoration='manual';",
          }}
        />
        <noscript>
          <style>{`[data-intro]{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Providers>
          <Intro />
          <ScrollProgress />
          <Navbar />
          {children}
          <Cursor />
        </Providers>
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
