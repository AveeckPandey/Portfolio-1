"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const inputStyle =
    "w-full px-5 py-4 border border-white/10 rounded-xl outline-none focus:border-blue-500 bg-white/5 backdrop-blur-sm transition-all text-white placeholder:text-white/30";

  const glassPanel =
    "backdrop-blur-xl bg-black/30 border border-white/10 rounded-[30px] p-6 sm:p-8 lg:p-16 shadow-2xl";

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 769px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const updateVideoPreference = () => setShowVideo(mediaQuery.matches);

    updateVideoPreference();
    mediaQuery.addEventListener("change", updateVideoPreference);

    return () => mediaQuery.removeEventListener("change", updateVideoPreference);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setSuccess("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setSuccess("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSuccess("Message sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSuccess(error instanceof Error ? error.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center bg-[#05060a] px-4 py-16 sm:p-6"
    >
      {showVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/assets/contact.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at top, rgba(37,99,235,0.18), transparent 35%), linear-gradient(180deg, #06070c 0%, #05060a 100%)",
          }}
        />
      )}

      <div className={`relative z-10 w-full max-w-6xl ${glassPanel}`}>
        <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Let&apos;s talk.</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            className={inputStyle}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Your email"
            className={inputStyle}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            rows={4}
            placeholder="Your message"
            className={`${inputStyle} resize-none`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
            <ArrowRight size={18} />
          </motion.button>

          {success && <p className="text-sm text-white/70">{success}</p>}
        </form>
      </div>
    </section>
  );
}
