"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import axios from "axios";

export default function Contact() {
  const inputStyle =
    "w-full px-5 py-4 border border-white/10 rounded-xl outline-none focus:border-blue-500 bg-white/5 backdrop-blur-sm transition-all text-white placeholder:text-white/30";

  const glassPanel =
    "backdrop-blur-xl bg-black/30 border border-white/10 rounded-[30px] p-8 lg:p-16 shadow-2xl";

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setSuccess("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setSuccess("");

      await axios.post("/api/contact", form);

      setSuccess("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSuccess("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex items-center justify-center p-6 bg-[#05060a]">
      
      {/* Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/assets/contact.mp4" type="video/mp4" />
      </video>

      <div className={`relative z-10 w-full max-w-6xl ${glassPanel}`}>
        
        <h2 className="text-4xl font-bold text-white mb-6">
          Let’s talk.
        </h2>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Full name"
            className={inputStyle}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Your email"
            className={inputStyle}
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            rows={4}
            placeholder="Your message"
            className={`${inputStyle} resize-none`}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl flex items-center gap-2"
          >
            {loading ? "Sending..." : "Send Message"}
            <ArrowRight size={18} />
          </motion.button>

          {success && (
            <p className="text-white/70 text-sm">{success}</p>
          )}
        </div>
      </div>
    </section>
  );
}