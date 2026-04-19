"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  category: string;
  color: string;
  link?: string;
  github?: string;
  image?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "QR-Based Inventory & Logistics Management System",
    subtitle: "Food Aid Inventory Management System",
    description:
      "A full-stack mobile application built for NGOs and relief organizations to manage food aid inventory — tracking rice, dal, and sachets across boxes using QR codes, real-time Firestore updates, and shortage detection. No more spreadsheets. No more manual errors. Just scan, dispatch, and go.",
    tags: ["React Native", "Firestore", "Expo"],
    year: "2024",
    category: "APP Development",
    color: "#60a5fa",
  },
  {
    id: 2,
    title: "Skin Disease Detection AI",
    subtitle: "AI-Powered Skin Disease Detection System",
    description:
      "End-to-end e-commerce solution featuring real-time inventory sync, Stripe payment integration, Redis caching, and an admin analytics panel. Designed for sub-200ms response times at scale.",
    tags: ["Python", "TensorFlow", "Keras", "React", "FastAPI", "Explainable AI", "MobileNetV2"],
    year: "2025",
    category: "AI / ML",
    color: "#a78bfa",
  },
  {
    id: 3,
    title: "Breast Cancer Detection",
    subtitle: "Machine Learning System",
    description:
      "This project develops a machine learning system to classify breast tumors as malignant or benign using the Wisconsin Breast Cancer dataset. It includes data preprocessing, model training, evaluation, a Streamlit interface for predictions, and SHAP-based explainable AI.",
    tags: ["Python", "scikit-learn", "Pandas", "Streamlit", "Plotly"],
    year: "2025",
    category: "Data Science",
    color: "#34d399",
  },
  {
    id: 4,
    title: "Chatty",
    subtitle: "Real-Time Collaborative Platform",
    description:
      "Chatty is a real-time messaging app that enables users to send and receive messages instantly with a fast and user-friendly interface.",
    tags: ["Socket.io", "React", "MongoDB", "JWT"],
    year: "2025",
    category: "Full Stack",
    color: "#fb923c",
  },
  {
    id: 5,
    title: "SyncroAI",
    subtitle: "AI-Powered Resume & LinkedIn Optimization",
    description:
      "SyncroAI is a smart platform designed to bridge the gap between your resume and LinkedIn profile. It uses AI to analyze your experience, skills, and achievements, ensuring both documents are consistent, optimized, and tailored for maximum impact.",
    tags: ["Next.js", "Google Gemini", "LangChain", "Chrome Extension"],
    year: "2026",
    category: "Full Stack",
    color: "#f472b6",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI / ML":      "bg-blue-500/10 text-blue-300/80 border-blue-400/20",
  "Full Stack":   "bg-violet-500/10 text-violet-300/80 border-violet-400/20",
  "Data Science": "bg-emerald-500/10 text-emerald-300/80 border-emerald-400/20",
};

export default function Projects() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [visible, setVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Touch/swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 769px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const updateVideoPreference = () => setShowVideo(mediaQuery.matches);

    updateVideoPreference();
    mediaQuery.addEventListener("change", updateVideoPreference);

    return () => mediaQuery.removeEventListener("change", updateVideoPreference);
  }, []);

  const goTo = useCallback(
    (idx: number, dir: "next" | "prev") => {
      if (animating || idx === active) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(idx);
        setAnimating(false);
      }, 380);
    },
    [animating, active]
  );

  const next = useCallback(() => goTo((active + 1) % PROJECTS.length, "next"), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + PROJECTS.length) % PROJECTS.length, "prev"), [active, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only swipe horizontally if horizontal movement is dominant
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const project = PROJECTS[active];

  return (
    <>
      <style>{`
        /* ── Projects layout ── */
        .proj-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 40px;
          box-sizing: border-box;
          background: #010205;
        }

        .proj-slider {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1080px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Desktop: large card + right thumbnail stack side by side */
        .proj-main-row {
          display: flex;
          gap: 16px;
          align-items: stretch;
        }

        .proj-card {
          flex: 1;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
          min-height: 380px;
        }

        .proj-card-inner {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 36px;
        }

        /* Thumbnail sidebar */
        .proj-thumbs {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 190px;
          flex-shrink: 0;
        }

        .proj-thumb-btn {
          position: relative;
          text-align: left;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
          padding: 12px 14px;
          flex: 1;
          cursor: pointer;
          border: none;
          background: none;
        }

        /* Bottom info row */
        .proj-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          padding: 0 4px;
        }

        .proj-desc-area {
          flex: 1;
          max-width: 560px;
        }

        .proj-nav-area {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          flex-shrink: 0;
        }

        /* ── TABLET (≤860px): hide thumbs sidebar, show dots only ── */
        @media (max-width: 860px) {
          .proj-thumbs { display: none; }
          .proj-card { min-height: 340px; }
          .proj-card-inner { padding: 24px 28px; }
        }

        /* ── MOBILE (≤600px): single column, full width card ── */
        @media (max-width: 600px) {
          .proj-section {
            padding: 72px 12px 32px;
          }
          .proj-slider { gap: 16px; }
          .proj-card {
            min-height: 0;
            border-radius: 16px;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(20, 25, 30, 0.45);
          }
          .proj-card-inner {
            padding: 18px 18px;
            gap: 14px;
          }
          .proj-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .proj-nav-area {
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .proj-desc-area { max-width: 100%; }
        }

        /* ── Tiny (≤380px) ── */
        @media (max-width: 380px) {
          .proj-card-inner { padding: 14px 14px; }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="proj-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Video background */}
        {showVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            autoPlay
            loop
            muted
            playsInline
            src="/assets/Project.mp4"
          />
        ) : (
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(167,139,250,0.18), transparent 32%), linear-gradient(180deg, #040507 0%, #010205 100%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010205]/80 via-transparent to-[#010205]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010205]/60 via-transparent to-[#010205]/60 pointer-events-none" />

        {/* Section header */}
        <div
          className="relative z-10 text-center mb-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p className="text-[11px] tracking-[0.22em] text-white/30 font-medium mb-3 uppercase">
            Selected Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none">
            Projects
          </h2>
          <div className="mt-3 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        {/* Slider */}
        <div
          className="proj-slider transition-all duration-700 delay-150"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          {/* Main row */}
          <div className="proj-main-row">

            {/* Large active card */}
            <div className="proj-card">
              {/* Accent glow */}
              <div
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none transition-all duration-700"
                style={{ background: `radial-gradient(circle, ${project.color}22 0%, transparent 70%)` }}
              />

              <div
                className="proj-card-inner"
                style={{
                  opacity: animating ? 0 : 1,
                  transform: animating
                    ? direction === "next" ? "translateX(-24px)" : "translateX(24px)"
                    : "translateX(0)",
                  transition: "opacity 0.38s ease, transform 0.38s ease",
                }}
              >
                {/* Category + year */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-medium tracking-widest px-3 py-1 rounded-full border ${
                      CATEGORY_COLORS[project.category] ?? "bg-white/5 text-white/50 border-white/10"
                    }`}
                  >
                    {project.category.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-white/25 tracking-widest font-light">
                    {project.year}
                  </span>
                </div>

                {/* Mock screen */}
                <div
                  className="my-5 rounded-xl overflow-hidden flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}11 0%, rgba(255,255,255,0.02) 100%)`,
                    border: `1px solid ${project.color}22`,
                    minHeight: 120,
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover rounded-xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-8">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `${project.color}18`,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                          stroke={project.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
                        </svg>
                      </div>
                      <span className="text-[11px]" style={{ color: `${project.color}80` }}>
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title + subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] font-light" style={{ color: `${project.color}cc` }}>
                    {project.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right thumbnail stack — hidden on mobile via CSS */}
            <div className="proj-thumbs">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i, i > active ? "next" : "prev")}
                  className="proj-thumb-btn"
                  style={{
                    background:
                      i === active
                        ? `linear-gradient(135deg, ${p.color}18, rgba(255,255,255,0.06))`
                        : "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border:
                      i === active
                        ? `1px solid ${p.color}35`
                        : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: i === active ? `0 4px 20px ${p.color}18` : "none",
                    transform: i === active ? "scale(1)" : "scale(0.97)",
                    opacity: i === active ? 1 : 0.55,
                  }}
                >
                  {i === active && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full"
                      style={{ background: p.color }}
                    />
                  )}
                  <p className="text-[10px] font-medium tracking-widest mb-1"
                    style={{ color: i === active ? `${p.color}bb` : "rgba(255,255,255,0.25)" }}>
                    {p.category.toUpperCase()}
                  </p>
                  <p className="text-[12px] font-semibold leading-tight"
                    style={{ color: i === active ? "#fff" : "rgba(255,255,255,0.45)" }}>
                    {p.title}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {p.year}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom info row */}
          <div
            className="proj-bottom"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.38s ease, transform 0.38s ease",
            }}
          >
            {/* Description + links */}
            <div className="proj-desc-area">
              <p className="text-[13px] text-white/40 leading-relaxed font-light">
                {project.description}
              </p>
              <div className="flex gap-5 mt-4">
                <a
                  href={project.github ?? "https://github.com/aveeckpandey"}
                  className="flex items-center gap-1.5 text-[12px] font-medium transition-opacity hover:opacity-70"
                  style={{ color: project.color }}
                  target="_blank" rel="noopener noreferrer"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={project.link ?? "#"}
                  className="flex items-center gap-1.5 text-[12px] font-medium text-white/35 hover:text-white/70 transition-colors"
                  target="_blank" rel="noopener noreferrer"
                >
                  View case
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav controls */}
            <div className="proj-nav-area">
              <p className="text-[11px] text-white/20 tracking-widest font-light">
                <span className="text-white/60 font-medium">
                  {String(active + 1).padStart(2, "0")}
                </span>
                {" / "}
                {String(PROJECTS.length).padStart(2, "0")}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous project"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Next project"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Pill dot indicators */}
              <div className="flex gap-1.5">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => goTo(i, i > active ? "next" : "prev")}
                    aria-label={`Go to project ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 20 : 5,
                      height: 5,
                      background: i === active ? project.color : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer label */}
        <div className="absolute bottom-6 left-6 z-10">
          <p className="text-[10px] text-white/15 tracking-[0.15em] font-light">
            AVEECK PANDEY · PORTFOLIO
          </p>
        </div>
      </section>
    </>
  );
}
