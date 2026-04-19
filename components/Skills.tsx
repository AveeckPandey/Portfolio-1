"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaCode
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiFirebase,
  SiOpencv,
  SiExpo,
  SiFlask,
  SiFastapi,
  SiDjango,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiPytorch,
  SiVercel,
  SiNetlify
} from "react-icons/si";

const ICONS: Record<string, JSX.Element> = {
  "React": <FaReact className="text-sky-400 w-6 h-6" />,
  "Next.js": <SiNextdotjs className="text-white w-6 h-6" />,
  "Node.js": <FaNodeJs className="text-green-500 w-6 h-6" />,
  "Express.js": <SiExpress className="text-gray-300 w-6 h-6" />,
  "MongoDB": <SiMongodb className="text-green-600 w-6 h-6" />,
  "PostgreSQL": <SiPostgresql className="text-blue-500 w-6 h-6" />,
  "TensorFlow": <SiTensorflow className="text-orange-500 w-6 h-6" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400 w-6 h-6" />,
  "JavaScript": <SiJavascript className="text-yellow-400 w-6 h-6" />,
  "TypeScript": <SiTypescript className="text-blue-400 w-6 h-6" />,
  "HTML": <SiHtml5 className="text-orange-500 w-6 h-6" />,
  "CSS": <SiCss className="text-blue-500 w-6 h-6" />,
  "Python": <FaPython className="text-yellow-300 w-6 h-6" />,
  "Git": <FaGitAlt className="text-orange-500 w-6 h-6" />,
  "Docker": <FaDocker className="text-blue-400 w-6 h-6" />,
  "Firebase": <SiFirebase className="text-yellow-400 w-6 h-6" />,
  "AWS (Basics)": <FaAws className="text-orange-400 w-6 h-6" />,
  "Vercel": <SiVercel className="text-white w-6 h-6" />,
  "Netlify": <SiNetlify className="text-teal-400 w-6 h-6" />,
  "OpenCV": <SiOpencv className="text-red-500 w-6 h-6" />,
  "NLP": <FaCode className="text-purple-500 w-6 h-6" />,
  "LLMs": <FaCode className="text-pink-500 w-6 h-6" />,
  "Prompt Engineering": <FaCode className="text-blue-500 w-6 h-6" />,
  "Data Preprocessing": <FaCode className="text-green-500 w-6 h-6" />,
  "Data Visualization": <FaCode className="text-yellow-500 w-6 h-6" />,
  "EDA": <FaCode className="text-red-500 w-6 h-6" />,
  "3D Plotting": <FaCode className="text-purple-500 w-6 h-6" />,
  "React Native": <FaCode className="text-blue-500 w-6 h-6" />,
  "Expo": <SiExpo className="text-purple-500 w-6 h-6" />,
  "Flask": <SiFlask className="text-green-500 w-6 h-6" />,
  "FastAPI": <SiFastapi className="text-blue-500 w-6 h-6" />,
  "Django": <SiDjango className="text-green-500 w-6 h-6" />,
  "NumPy": <SiNumpy className="text-blue-500 w-6 h-6" />,
  "Pandas": <SiPandas className="text-green-500 w-6 h-6" />,
  "Scikit-learn": <SiScikitlearn className="text-blue-500 w-6 h-6" />,
  "PyTorch": <SiPytorch className="text-green-500 w-6 h-6" />,
};

const TECH_CATEGORIES: Record<string, string[]> = {
  "Web Dev": [
    "React", "Next.js", "Node.js", "Express.js", "PostgreSQL",
    "MongoDB", "Tailwind CSS", "HTML", "CSS", "JavaScript", "TypeScript"
  ],
  "Python/Backend": [
    "Python", "Flask", "FastAPI", "Django", "PostgreSQL",
    "MongoDB", "NumPy", "Pandas"
  ],
  "GenAI / AI-ML": [
    "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV",
    "NLP", "LLMs", "Prompt Engineering", "Data Preprocessing"
  ],
  "Mobile Dev": [
    "React Native", "Expo"
  ],
  "Tools & DevOps": [
    "Git", "Firebase", "Docker", "AWS (Basics)", "Vercel", "Netlify"
  ],
  "Data Science": [
    "Data Visualization", "EDA", "3D Plotting"
  ]
};

const RADAR_AXES = [
  { label: "FRONTEND",    val: 0.88, color: "#60a5fa" },
  { label: "BACKEND",     val: 0.80, color: "#a78bfa" },
  { label: "DATA SCIENCE",val: 0.76, color: "#34d399" },
  { label: "AI/ML",       val: 0.72, color: "#f472b6" },
  { label: "DEVOPS",      val: 0.60, color: "#fb923c" },
  { label: "DESIGN",      val: 0.65, color: "#fbbf24" },
];

/* ─── RADAR CHART ─── */
function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const W = 300, H = 300, cx = W / 2, cy = H / 2, R = 90;
    const N = RADAR_AXES.length;

    let prog = 0;
    const animate = () => {
      if (prog < 1) {
        prog += 0.02;
        ctx.clearRect(0, 0, W, H);

        // Grid rings
        [0.4, 0.7, 1].forEach(f => {
          ctx.beginPath();
          for (let i = 0; i < N; i++) {
            const a = -Math.PI / 2 + (i * Math.PI * 2) / N;
            const x = cx + Math.cos(a) * R * f;
            const y = cy + Math.sin(a) * R * f;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = "rgba(255,255,255,0.05)";
          ctx.stroke();
        });

        // Data web
        ctx.beginPath();
        RADAR_AXES.forEach((ax, i) => {
          const a = -Math.PI / 2 + (i * Math.PI * 2) / N;
          const x = cx + Math.cos(a) * R * ax.val * prog;
          const y = cy + Math.sin(a) * R * ax.val * prog;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        grad.addColorStop(0, "rgba(59,130,246,0.1)");
        grad.addColorStop(1, "rgba(59,130,246,0.4)");
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#3b82f6";
        ctx.strokeStyle = "rgba(96,165,250,0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Labels & dots
        RADAR_AXES.forEach((ax, i) => {
          const a = -Math.PI / 2 + (i * Math.PI * 2) / N;
          const lx = cx + Math.cos(a) * (R + 25);
          const ly = cy + Math.sin(a) * (R + 25);
          ctx.font = "bold 9px Inter";
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.textAlign = "center";
          ctx.fillText(ax.label, lx, ly);

          const dx = cx + Math.cos(a) * R * ax.val * prog;
          const dy = cy + Math.sin(a) * R * ax.val * prog;
          ctx.beginPath();
          ctx.arc(dx, dy, 3, 0, Math.PI * 2);
          ctx.fillStyle = ax.color;
          ctx.fill();
        });

        requestAnimationFrame(animate);
      }
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} width={300} height={300} />;
}

/* ─── MAIN COMPONENT ─── */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Web Dev");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const glass =
    "bg-[#ffffff03] border border-white/[0.06] rounded-[32px] backdrop-blur-xl shadow-2xl";

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#05060a] flex flex-col items-center py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        autoPlay loop muted playsInline
        src="/assets/skills.mp4"
      />

      {/* Mesh Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] opacity-40 z-0" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-blue-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-2">What I Do</p>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter italic">Skills & Expertise</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Radar Chart */}
          <div className={`lg:col-span-4 p-6 sm:p-10 flex flex-col items-center justify-center ${glass} border-blue-500/10`}>
            <h3 className="self-start text-[10px] font-bold tracking-widest text-white/20 mb-4">SKILL RADAR</h3>
            <RadarChart />
          </div>

          {/* Tech Stack */}
          <div className={`lg:col-span-8 p-5 sm:p-8 ${glass}`}>

            {/* Header row: stacks on mobile, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
              <h3 className="text-[10px] font-bold tracking-widest text-white/20 uppercase shrink-0">
                Tech Stack
              </h3>

              {/* Scrollable tab bar — never wraps, scrolls horizontally */}
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 overflow-x-auto scrollbar-none">
                {Object.keys(TECH_CATEGORIES).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 sm:px-5 py-2 rounded-xl text-[10px] font-black whitespace-nowrap transition-all shrink-0 ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech grid — 3 cols on mobile, more on larger screens */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <AnimatePresence>
                {TECH_CATEGORIES[activeCategory].map((name) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-[20px] bg-white/[0.03] border border-white/[0.05] hover:border-white/20 transition-all group"
                  >
                    <div className="mb-2 transition-transform group-hover:scale-110 duration-300">
                      {ICONS[name] || <div className="w-6 h-6 rounded-full bg-white/10" />}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-white/40 group-hover:text-white/80 transition-colors text-center leading-tight">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Proficiency Bars */}
          <div className={`lg:col-span-7 p-6 sm:p-10 ${glass}`}>
            <h3 className="text-[10px] font-bold tracking-widest text-white/20 mb-8 uppercase">Efficiency Index</h3>
            <div className="space-y-8">
              {RADAR_AXES.slice(0, 4).map((p, i) => (
                <div key={p.label} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-white/60 uppercase tracking-tighter">{p.label}</span>
                    <span className="text-xs font-black text-blue-400">{(p.val * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: visible ? `${p.val * 100}%` : 0 }}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                      style={{ boxShadow: "0 0 10px rgba(37,99,235,0.5)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`lg:col-span-5 p-6 sm:p-10 ${glass} flex flex-col justify-center space-y-4`}>
            <h3 className="text-[10px] font-bold tracking-widest text-white/20 mb-4 uppercase">At A Glance</h3>
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-white/5 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col justify-center items-center">
                <div className="text-4xl font-black text-white italic">15+</div>
                <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase mt-2">Projects</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col justify-center items-center">
                <div className="text-4xl font-black text-white italic">Final</div>
                <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase mt-2">Year B.Tech</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-10 opacity-20 text-[10px] font-black tracking-widest uppercase text-white">
        Aveeck Pandey // Terminal.01
      </div>
    </section>
  );
}