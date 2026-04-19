import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Home from "../components/Home";

const Project = dynamic(() => import("../components/Project"), { ssr: true });
const Skills = dynamic(() => import("../components/Skills"), { ssr: true });
const Contact = dynamic(() => import("../components/Contact"), { ssr: true });

export default function Page() {
  return (
    <>
    <Navbar />  
    <Home />
    <Project />
    <Skills />
    <Contact />
    </>
  );
}
