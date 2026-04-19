"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const tabs = ["Home", "Projects", "Skills", "Contact"];

interface TrailStyle {
  left: number;
  width: number;
  opacity: number;
  fading: boolean;
}

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [trail, setTrail] = useState<TrailStyle>({
    left: 0,
    width: 0,
    opacity: 0,
    fading: false,
  });
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trailTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getPos = (btn: HTMLButtonElement) => {
    if (!trackRef.current) return { left: 0, width: 0 };
    const tr = trackRef.current.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    return { left: br.left - tr.left, width: br.width };
  };

  useEffect(() => {
    const idx = tabs.indexOf(activeTab);
    const btn = btnRefs.current[idx];
    if (btn) {
      const pos = getPos(btn);
      setTrail({ left: pos.left, width: pos.width, opacity: 0.9, fading: false });
    }
  }, []);

  const handleTabClick = useCallback(
    (tab: string, index: number) => {
      if (tab === activeTab) return;

      const fromBtn = btnRefs.current[tabs.indexOf(activeTab)];
      const toBtn = btnRefs.current[index];
      if (!fromBtn || !toBtn) return;

      const fp = getPos(fromBtn);
      const tp = getPos(toBtn);
      const goRight = tp.left > fp.left;

      if (trailTimerRef.current) clearTimeout(trailTimerRef.current);

      setTrail({
        left: goRight ? fp.left : tp.left,
        width: goRight ? fp.width : tp.width,
        opacity: 0.9,
        fading: false,
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTrail({
            left: goRight ? fp.left : tp.left,
            width: goRight
              ? tp.left + tp.width - fp.left
              : fp.left + fp.width - tp.left,
            opacity: 0.9,
            fading: false,
          });

          trailTimerRef.current = setTimeout(() => {
            setTrail((prev) => ({ ...prev, opacity: 0, fading: true }));
          }, 200);
        });
      });

      setActiveTab(tab);
      const targetId = tab.toLowerCase();
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    },
    [activeTab]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const correspondingTab = tabs.find((t) => t.toLowerCase() === id);
            if (correspondingTab) {
              setActiveTab(correspondingTab);
              const idx = tabs.indexOf(correspondingTab);
              const toBtn = btnRefs.current[idx];
              if (toBtn) {
                const pos = getPos(toBtn);
                setTrail({ left: pos.left, width: pos.width, opacity: 0.9, fading: false });
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    tabs.forEach((tab) => {
      const el = document.getElementById(tab.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 12px;
          pointer-events: auto;
        }

        /* ── Desktop nav (full layout) ── */
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 720px;
          max-width: 100%;
          gap: 12px;
          padding: 10px 16px;
          border-radius: 22px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.11);
          box-shadow: 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.25);
        }

        .nav-brand {
          flex-shrink: 0;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
        }

        .nav-track {
          position: relative;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          border-radius: 9999px;
          padding: 4px;
          background: rgba(0,0,0,0.28);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.55);
        }

        .nav-cta {
          flex-shrink: 0;
          white-space: nowrap;
          border-radius: 9999px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
          transition: all 0.2s;
          outline: none;
          cursor: pointer;
        }
        .nav-cta:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
          border-color: rgba(255,255,255,0.3);
        }

        .nav-tab-btn {
          position: relative;
          z-index: 20;
          white-space: nowrap;
          padding: 7px 14px;
          font-size: 12.5px;
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
          background: transparent;
          border: none;
          transition: color 0.25s;
        }

        /* ── Mobile: hide brand + CTA, center pill track ── */
        @media (max-width: 600px) {
          .nav-wrapper {
            padding: 12px 8px;
          }
          .nav-inner {
            width: auto;
            justify-content: center;
            padding: 8px 10px;
            border-radius: 18px;
          }
          .nav-brand,
          .nav-cta {
            display: none;
          }
          .nav-track {
            padding: 3px;
          }
          .nav-tab-btn {
            padding: 6px 11px;
            font-size: 11.5px;
          }
        }

        /* ── Tiny phones ── */
        @media (max-width: 380px) {
          .nav-tab-btn {
            padding: 5px 8px;
            font-size: 11px;
          }
        }
      `}</style>

      <div className="nav-wrapper">
        <nav className="nav-inner">
          {/* Brand */}
          <Link href="/" className="nav-brand">
            Aveeck Pandey
          </Link>

          {/* Nav Track */}
          <div ref={trackRef} className="nav-track">
            {/* Blue Trail */}
            <div
              className="absolute top-1 h-[calc(100%-8px)] rounded-full pointer-events-none z-0 bg-blue-500/50"
              style={{
                left: trail.left,
                width: trail.width,
                opacity: trail.opacity,
                transition: trail.fading
                  ? "left 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease"
                  : "left 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.12s ease",
              }}
            />

            {/* Tab Buttons */}
            {tabs.map((tab, i) => (
              <button
                key={tab}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => handleTabClick(tab, i)}
                className={`nav-tab-btn ${
                  activeTab === tab
                    ? "text-white/95 font-medium"
                    : "text-white/38 hover:text-white/70 font-normal"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="glass-pill"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    className="
                      absolute inset-0 z-10 rounded-full
                      bg-white/[0.11]
                      backdrop-blur-md
                      border border-white/[0.20]
                      shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]
                    "
                  />
                )}
                <span className="relative z-20">{tab}</span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="nav-cta"
            onClick={() => handleTabClick("Contact", tabs.indexOf("Contact"))}
          >
            Contact Me
          </button>
        </nav>
      </div>
    </>
  );
}