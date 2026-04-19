"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["a Full Stack Developer", "an AI/ML Engineer", "a GenAI Builder", "a Creative Technologist"];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/AveeckPandey",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aveeckpandey",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/AveeckPandey",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.902-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Mail",
    href: "mailto:aveeckpandey.619@email.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function RoleTypewriter() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
      <span style={{ color: "rgba(160,160,180,0.55)", fontWeight: 300 }}>I&apos;m </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          style={{ color: "rgba(140,210,255,0.9)", fontWeight: 500, display: "inline-block" }}
          initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stagger: any = (i: number) => ({
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.07, duration: 0.48, ease: "easeOut" },
  },
});

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 769px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const updateVideoPreference = () => setShowVideo(mediaQuery.matches);

    updateVideoPreference();
    mediaQuery.addEventListener("change", updateVideoPreference);

    return () => mediaQuery.removeEventListener("change", updateVideoPreference);
  }, []);

  return (
    <>
      <style>{`
        .video-bg {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          object-fit: cover;
          z-index: -2;
        }
        .video-overlay {
          position: fixed;
          inset: 0;
          z-index: -1;
          background: linear-gradient(to bottom, rgba(11,14,20,0.5), rgba(11,14,20,0.95));
        }

        .hp-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 80px;
          padding-bottom: 24px;
          box-sizing: border-box;
          overflow: hidden;
          font-family: system-ui, sans-serif;
          color: #e8e8f0;
        }

        .hp-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(72px);
          will-change: transform;
        }
        @keyframes floatOrb1 {
          0% { transform: translate(0px, 0px); }
          100% { transform: translate(12px, -22px); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate(0px, 0px); }
          100% { transform: translate(-10px, 18px); }
        }
        .hp-orb-1 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(80,160,255,0.15) 0%, transparent 70%);
          top: -80px; left: -80px;
          animation: floatOrb1 5s ease-in-out infinite alternate;
        }
        .hp-orb-2 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(160,80,255,0.11) 0%, transparent 70%);
          bottom: 10px; right: -50px;
          animation: floatOrb2 6s ease-in-out infinite alternate 1s;
        }

        /* ── BENTO GRID ── */
        .hp-bento {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          grid-template-rows: auto auto auto;
          gap: 10px;
          width: 100%;
          max-width: 1080px;
          padding: 0 16px 16px;
          box-sizing: border-box;
        }

        .hp-card {
          background: rgba(255,255,255,0.042);
          border: 1px solid rgba(255,255,255,0.085);
          border-radius: 18px;
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          padding: 16px 18px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
        }
        .hp-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.055) 0%, transparent 55%);
          pointer-events: none;
        }
        .hp-card:hover {
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 6px 28px rgba(0,0,0,0.22);
          transform: translateY(-2px);
        }

        /* Desktop grid placement */
        .hp-hero   { grid-column: 1; grid-row: 1 / 3; }
        .hp-status { grid-column: 2; grid-row: 1; }
        .hp-about  { grid-column: 3; grid-row: 1; }
        .hp-code   { grid-column: 2; grid-row: 2 / 4; }
        .hp-skills { grid-column: 1; grid-row: 3; }
        .hp-social { grid-column: 3; grid-row: 2; }
        .hp-cta    { grid-column: 3; grid-row: 3; }

        /* ── HERO ── */
        .hp-tag {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9.5px; font-weight: 500; letter-spacing: 0.12em;
          color: rgba(120,200,255,0.8);
          background: rgba(80,160,255,0.09);
          border: 1px solid rgba(80,160,255,0.18);
          border-radius: 100px; padding: 3px 10px;
          margin-bottom: 10px; text-transform: uppercase;
        }
        .hp-name {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(1.55rem, 4vw, 2.4rem);
          line-height: 1.05; letter-spacing: -0.03em; color: #fff;
          margin-bottom: 8px;
        }
        .hp-name span {
          background: linear-gradient(120deg, #7eb8ff 0%, #c084fc 50%, #7eb8ff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }
        .hp-role { font-size: 0.77rem; margin-bottom: 10px; min-height: 20px; }
        .hp-desc { font-size: 0.75rem; line-height: 1.7; color: rgba(200,200,220,0.52); font-weight: 300; margin-bottom: 14px; }
        .hp-gfx {
          position: absolute; bottom: -14px; right: -14px;
          width: 100px; height: 100px; opacity: 0.055; pointer-events: none;
        }

        /* ── RESUME BUTTON ── */
        .hp-resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid rgba(120, 180, 255, 0.28);
          background: rgba(80, 140, 255, 0.08);
          color: rgba(160, 210, 255, 0.85);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.22s, border-color 0.22s, color 0.22s, box-shadow 0.22s, transform 0.18s;
          position: relative;
          z-index: 1;
        }
        .hp-resume-btn:hover {
          background: rgba(80, 140, 255, 0.18);
          border-color: rgba(120, 180, 255, 0.5);
          color: #c4e0ff;
          box-shadow: 0 0 18px rgba(100, 160, 255, 0.2);
          transform: translateY(-1px);
        }
        .hp-resume-btn svg {
          flex-shrink: 0;
        }

        /* ── STATUS ── */
        .hp-dot {
          width: 7px; height: 7px; background: #4ade80; border-radius: 50%;
          display: inline-block; margin-right: 7px;
          animation: pdot 2s ease-in-out infinite;
        }
        @keyframes pdot {
          0%,100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.18); }
          50%      { box-shadow: 0 0 0 7px rgba(74,222,128,0.04); }
        }
        .hp-avail {
          font-size: 9.5px; letter-spacing: 0.1em; color: #4ade80;
          text-transform: uppercase; font-weight: 500;
          display: flex; align-items: center; margin-bottom: 8px;
        }
        .hp-stitle {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(1.1rem, 2.5vw, 1.55rem); line-height: 1.1;
          letter-spacing: -0.03em; color: #fff; margin-bottom: 4px;
        }
        .hp-ssub { font-size: 0.67rem; color: rgba(180,180,200,0.43); letter-spacing: 0.08em; text-transform: uppercase; }

        /* ── ABOUT ── */
        .hp-emoji { font-size: 1.35rem; margin-bottom: 5px; display: block; }
        .hp-atitle { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .hp-atext { font-size: 0.72rem; line-height: 1.7; color: rgba(200,200,220,0.52); font-weight: 300; }

        /* ── CODE ── */
        .hp-codewin {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 9px 12px;
          font-family: 'Fira Code', monospace;
          font-size: 0.63rem; line-height: 1.85;
          color: rgba(200,200,220,0.62); overflow: hidden;
        }
        .hp-dots { display: flex; gap: 5px; margin-bottom: 7px; }
        .hp-dot2 { width: 8px; height: 8px; border-radius: 50%; }
        .hp-clabel {
          font-family: 'Syne', sans-serif; font-size: 0.85rem; font-weight: 800;
          color: #fff; letter-spacing: -0.02em; margin-top: 10px;
        }
        .hp-csub { font-size: 0.64rem; color: rgba(160,160,180,0.43); letter-spacing: 0.07em; text-transform: uppercase; margin-top: 3px; }
        .cp{color:#c084fc} .cb{color:#7eb8ff} .cg{color:#4ade80} .cy{color:#fbbf24} .cgr{color:rgba(160,160,180,0.4)}

        /* ── SKILLS ── */
        .hp-stag { font-family:'Syne',sans-serif; font-size:0.68rem; font-weight:700; color:rgba(160,160,180,0.55); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px; }
        .hp-pills { display:flex; flex-wrap:wrap; gap:5px; }
        .hp-pill {
          font-size:0.65rem; font-weight:500; padding:3px 9px;
          border-radius:100px; border:1px solid rgba(255,255,255,0.085);
          color:rgba(210,210,235,0.72); background:rgba(255,255,255,0.032);
          transition:all 0.2s; cursor:default;
        }
        .hp-pill:hover{background:rgba(120,180,255,0.1);border-color:rgba(120,180,255,0.28);color:#a8d4ff;transform:scale(1.05)}
        .hp-pill.ac{background:rgba(80,160,255,0.08);border-color:rgba(80,160,255,0.2);color:#8ec4ff}

        /* ── SOCIAL ── */
        .hp-sgrid { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
        .hp-sbtn {
          display:flex; align-items:center; gap:6px;
          padding:7px 10px; border-radius:9px;
          border:1px solid rgba(255,255,255,0.075);
          background:rgba(255,255,255,0.032);
          color:rgba(210,210,235,0.72); font-size:0.68rem; font-weight:500;
          text-decoration:none; transition:all 0.22s;
        }
        .hp-sbtn:hover{background:rgba(255,255,255,0.075);border-color:rgba(255,255,255,0.14);color:#fff;transform:translateY(-1px)}

        /* ── CTA ── */
        .hp-cta-card {
          background: linear-gradient(135deg, rgba(80,140,255,0.15) 0%, rgba(160,80,255,0.11) 100%) !important;
          border-color: rgba(120,160,255,0.17) !important;
          display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:9px;
        }
        .hp-ctatext{font-family:'Syne',sans-serif;font-size:0.82rem;font-weight:800;color:#fff;letter-spacing:-0.01em;line-height:1.25}
        .hp-ctabtn {
          display:inline-flex; align-items:center; gap:5px;
          background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.17);
          color:#fff; padding:7px 16px; border-radius:100px;
          font-size:0.68rem; font-weight:600; text-decoration:none;
          letter-spacing:0.06em; text-transform:uppercase; cursor:pointer;
          transition:all 0.25s;
        }
        .hp-ctabtn:hover{background:rgba(255,255,255,0.18);box-shadow:0 0 22px rgba(140,160,255,0.25);transform:scale(1.04)}

        /* ── TABLET: 2-col ── */
        @media (max-width: 860px) {
          .hp-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .hp-hero   { grid-column: 1 / 3; grid-row: auto; }
          .hp-status { grid-column: 1;     grid-row: auto; }
          .hp-about  { grid-column: 2;     grid-row: auto; }
          .hp-code   { grid-column: 1 / 3; grid-row: auto; }
          .hp-skills { grid-column: 1 / 3; grid-row: auto; }
          .hp-social { grid-column: 1;     grid-row: auto; }
          .hp-cta    { grid-column: 2;     grid-row: auto; }
        }

        /* ── MOBILE: 1-col ── */
        @media (max-width: 560px) {
          .hp-root {
            padding-top: 72px;
          }
          .hp-bento {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 0 10px 20px;
          }
          .hp-hero,
          .hp-status,
          .hp-about,
          .hp-code,
          .hp-skills,
          .hp-social,
          .hp-cta {
            grid-column: 1;
            grid-row: auto;
          }
          .hp-card {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(30, 35, 45, 0.3);
          }
          .hp-name {
            font-size: clamp(2rem, 10vw, 2.8rem);
          }
          .hp-stitle {
            font-size: clamp(1.2rem, 5vw, 1.6rem);
          }
          .hp-cta-card {
            min-height: 110px;
          }
          .hp-sgrid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      {showVideo ? (
        <video autoPlay loop muted playsInline className="video-bg">
          <source src="/assets/homepage.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="video-bg"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(80,160,255,0.2), transparent 35%), linear-gradient(180deg, #07111c 0%, #05070d 50%, #040508 100%)",
          }}
        />
      )}
      <div className="video-overlay" />

      <div id="home" className="hp-root">
        <div className="hp-orb hp-orb-1" />
        <div className="hp-orb hp-orb-2" />

        <div className="hp-bento">

          {/* HERO */}
          <motion.div className="hp-card hp-hero" variants={stagger(0)} initial="hidden" animate="visible">
            <div className="hp-tag">✦ Portfolio 2026</div>
            <div className="hp-name">Aveeck<br /><span>Pandey.</span></div>
            <div className="hp-role"><RoleTypewriter /></div>
            <p className="hp-desc">
              Building digital products at the intersection of code, AI & design.
              Turning complex problems into elegant, human-first experiences.
            </p>

            {/* ── RESUME DOWNLOAD BUTTON (added here, nothing else changed) ── */}
            <motion.a
              href="/assets/harshibar_s_resume (4).pdf"
              download
              className="hp-resume-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                <path d="M8 1v9M4.5 7l3.5 3.5L11.5 7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12v1.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V12" strokeLinecap="round"/>
              </svg>
              Download Resume
            </motion.a>

            <svg className="hp-gfx" viewBox="0 0 120 120" fill="none">
              {[0,1,2,3,4,5].map(i=>(
                <g key={i}>
                  <line x1={i*24} y1="0" x2={i*24} y2="120" stroke="white" strokeWidth="0.7"/>
                  <line x1="0" y1={i*24} x2="120" y2={i*24} stroke="white" strokeWidth="0.7"/>
                </g>
              ))}
              <circle cx="60" cy="60" r="36" stroke="white" strokeWidth="0.7"/>
            </svg>
          </motion.div>

          {/* STATUS */}
          <motion.div className="hp-card hp-status" variants={stagger(1)} initial="hidden" animate="visible">
            <div className="hp-avail"><span className="hp-dot"/>Available for Work</div>
            <div className="hp-stitle">Open to<br/>Opportunities.</div>
            <div className="hp-ssub">Final Year · Digital Craftsman</div>
          </motion.div>

          {/* ABOUT */}
          <motion.div className="hp-card hp-about" variants={stagger(2)} initial="hidden" animate="visible">
            <span className="hp-emoji">🧠</span>
            <div className="hp-atitle">About Me</div>
            <p className="hp-atext">Final year CS student obsessed with building things that matter. I live at the intersection of full-stack engineering and AI — from neural nets to production-ready apps.</p>
          </motion.div>

          {/* CODE */}
          <motion.div className="hp-card hp-code" variants={stagger(3)} initial="hidden" animate="visible">
            <div className="hp-codewin">
              <div className="hp-dots">
                <div className="hp-dot2" style={{background:"#ff5f57"}}/>
                <div className="hp-dot2" style={{background:"#ffbd2e"}}/>
                <div className="hp-dot2" style={{background:"#28c840"}}/>
              </div>
              <div><span className="cp">const</span> <span className="cb">dev</span> = {"{"}</div>
              <div>&nbsp;&nbsp;<span className="cy">name</span>: <span className="cg">&quot;Aveeck Pandey&quot;</span>,</div>
              <div>&nbsp;&nbsp;<span className="cy">role</span>: <span className="cg">&quot;Full Stack + AI Engineer&quot;</span>,</div>
              <div>&nbsp;&nbsp;<span className="cy">stack</span>: [<span className="cg">&quot;React&quot;</span>, <span className="cg">&quot;Python&quot;</span>, <span className="cg">&quot;LLMs&quot;</span>],</div>
              <div>&nbsp;&nbsp;<span className="cy">available</span>: <span className="cp">true</span>,</div>
              <div>{"}"}</div>
              <br/>
              <div><span className="cgr">{"// Currently exploring"}</span></div>
              <div><span className="cp">const</span> <span className="cb">focus</span> = [</div>
              <div>&nbsp;&nbsp;<span className="cg">&quot;Agentic AI systems&quot;</span>,</div>
              <div>&nbsp;&nbsp;<span className="cg">&quot;Multimodal LLMs&quot;</span>,</div>
              <div>&nbsp;&nbsp;<span className="cg">&quot;Edge ML deployment&quot;</span></div>
              <div>];</div>
            </div>
            <div className="hp-clabel">Creative Coding.</div>
            <div className="hp-csub">Code as a creative medium</div>
          </motion.div>

          {/* SKILLS */}
          <motion.div className="hp-card hp-skills" variants={stagger(4)} initial="hidden" animate="visible">
            <div className="hp-stag">Tech Stack</div>
            <div className="hp-pills">
              {["React","Next.js","TypeScript","Node.js","Python","FastAPI","PyTorch","LangChain","OpenAI","Docker","PostgreSQL","Tailwind"].map((s,i)=>(
                <motion.span key={s} className={`hp-pill${i<5?" ac":""}`} whileHover={{scale:1.07}} transition={{type:"spring",stiffness:400}}>{s}</motion.span>
              ))}
            </div>
          </motion.div>

          {/* SOCIAL */}
          <motion.div className="hp-card hp-social" variants={stagger(5)} initial="hidden" animate="visible">
            <div className="hp-stag" style={{marginBottom:8}}>Find Me</div>
            <div className="hp-sgrid">
              {socialLinks.map(s=>(
                <motion.a key={s.label} href={s.href} className="hp-sbtn" target="_blank" rel="noopener noreferrer" whileHover={{y:-1}} transition={{type:"spring",stiffness:400}}>
                  {s.icon}{s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div className="hp-card hp-cta-card hp-cta" variants={stagger(6)} initial="hidden" animate="visible">
            <div className="hp-ctatext">Let&apos;s Build<br/>Something Great.</div>
            <motion.a href="mailto:aveeckpandey.619@email.com" className="hp-ctabtn" whileHover={{scale:1.05}} whileTap={{scale:0.97}}>
              ✦ Get in Touch
            </motion.a>
          </motion.div>

        </div>
      </div>
    </>
  );
}
