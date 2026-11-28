import { About } from "@/components/about/About";
import { Achievements } from "@/components/achievements/Achievements";
import { Contact } from "@/components/contact/Contact";
import { Education } from "@/components/education/Education";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { SriLanka } from "@/components/sri-lanka/SriLanka";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <SriLanka />
      <Contact />
    </main>
  );
}
