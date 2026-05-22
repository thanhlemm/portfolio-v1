import Navbar from "@/components/navigation/Navbar";
import Toolbar from "@/components/navigation/Toolbar";
import Home from "@/components/sections/Home";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Home />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

