"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

const budgetRanges = [
  "Under €5,000",
  "€5,000 – €15,000",
  "€15,000 – €35,000",
  "€35,000 – €75,000",
  "€75,000+",
  "Let's discuss",
];

const projectTypes = [
  "Music Video",
  "Commercial Film",
  "Brand Film",
  "Social Media Campaign",
  "Branding & Identity",
  "Campaign Production",
  "Other / Multiple",
];

interface FormState {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    budget: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Anti-spam: basic validation
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("error");
      return;
    }

    // Placeholder: replace with your backend API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
      setStatus("success");
      setForm({ name: "", email: "", budget: "", projectType: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <FadeIn>
        <div className="border border-obsidian-gold/30 bg-obsidian-charcoal p-16 text-center">
          <div className="w-12 h-px bg-obsidian-gold mx-auto mb-8" />
          <h3 className="font-display text-3xl text-obsidian-white mb-4">
            Message received.
          </h3>
          <p className="text-obsidian-silver text-base">
            We review every submission personally and will be in touch within 24 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-10 btn-ghost"
          >
            Send Another Message
          </button>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn direction="right">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs tracking-widest uppercase text-obsidian-silver mb-3">
              Name <span className="text-obsidian-gold">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full bg-obsidian-charcoal border border-obsidian-border text-obsidian-white placeholder-obsidian-muted px-5 py-4 text-sm focus:outline-none focus:border-obsidian-gold transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-obsidian-silver mb-3">
              Email <span className="text-obsidian-gold">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full bg-obsidian-charcoal border border-obsidian-border text-obsidian-white placeholder-obsidian-muted px-5 py-4 text-sm focus:outline-none focus:border-obsidian-gold transition-colors duration-200"
            />
          </div>
        </div>

        {/* Budget + Project Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs tracking-widest uppercase text-obsidian-silver mb-3">
              Budget Range
            </label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full bg-obsidian-charcoal border border-obsidian-border text-obsidian-white px-5 py-4 text-sm focus:outline-none focus:border-obsidian-gold transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="" className="bg-obsidian-charcoal text-obsidian-muted">
                Select budget
              </option>
              {budgetRanges.map((range) => (
                <option key={range} value={range} className="bg-obsidian-charcoal">
                  {range}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-obsidian-silver mb-3">
              Project Type
            </label>
            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              className="w-full bg-obsidian-charcoal border border-obsidian-border text-obsidian-white px-5 py-4 text-sm focus:outline-none focus:border-obsidian-gold transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="" className="bg-obsidian-charcoal text-obsidian-muted">
                Select type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-obsidian-charcoal">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs tracking-widest uppercase text-obsidian-silver mb-3">
            Your Project <span className="text-obsidian-gold">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={7}
            placeholder="Tell us about your project. What are you creating, who is it for, and what does success look like to you?"
            className="w-full bg-obsidian-charcoal border border-obsidian-border text-obsidian-white placeholder-obsidian-muted px-5 py-4 text-sm focus:outline-none focus:border-obsidian-gold transition-colors duration-200 resize-none"
          />
        </div>

        {/* Error */}
        {status === "error" && (
          <p className="text-red-400 text-sm">
            Please fill in all required fields with a valid email address.
          </p>
        )}

        {/* Hidden honeypot field (anti-spam) */}
        <input
          type="text"
          name="_honeypot"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          autoComplete="off"
        />

        {/* Submit */}
        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "loading" ? (
              <span className="flex items-center gap-3">
                <motion.span
                  className="w-4 h-4 border-2 border-obsidian-black/30 border-t-obsidian-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </span>
            ) : (
              <>
                Send Message
                <ArrowIcon className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>

        <p className="text-obsidian-muted text-xs">
          All inquiries are reviewed personally. No spam, no automated marketing.
        </p>
      </form>
    </FadeIn>
  );
}
