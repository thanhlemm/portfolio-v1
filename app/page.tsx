import Navbar from "@/components/navigation/Navbar";
import Toolbar from "@/components/navigation/Toolbar";
import About from "@/components/sections/About";
import Home from "@/components/sections/Home";
import Hero from "@/components/test-framer-motion";
import Scene from "@/components/test-threejs";
import { ModeToggle } from "@/components/toggle/modeToggle";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  return (
    <>
      {/* <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="min-h-screen w-full max-w-3xl py-32 px-16 bg-white dark:bg-blue-300 sm:items-start">
          <main className="flex  items-center justify-between ">
            <Hero />
            <ModeToggle />
          </main>
          <Scene />
        </div>
      </div> */}
      <Navbar />
      <Toolbar />
      <Home />
      <About />
    </>
  );
}
