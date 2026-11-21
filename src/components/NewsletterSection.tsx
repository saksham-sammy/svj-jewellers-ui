"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!valid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("success");
    setMessage(
      "Preview mode: Email validated locally. Connect your mailing provider when going live."
    );
    setEmail("");
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-[#171512] text-[#F6F2EA] border-t border-[#C5A46D]/20 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#C5A46D] mb-3">
          Private Circle
        </p>
        <h2
          id="newsletter-heading"
          className="font-serif text-3xl sm:text-4xl font-light text-[#F6F2EA]"
        >
          Invitations &amp; New Collections
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#AFA79A] font-light max-w-md mx-auto leading-relaxed">
          Receive quiet dispatches on festive releases, bridal trunk previews,
          and bespoke atelier viewings.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-7 max-w-lg mx-auto flex flex-col sm:flex-row gap-3"
        >
          <label htmlFor="svj-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="svj-newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter your email address"
            className="flex-1 bg-[#11100E] border border-[#C5A46D]/30 px-4 py-3.5 text-sm text-[#F6F2EA] placeholder:text-[#7E766B] focus:outline-none focus:border-[#C5A46D]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-[#C5A46D] text-[#11100E] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-[#D7BA86] transition-colors cursor-pointer shrink-0"
          >
            <span>Subscribe</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {status === "error" && (
          <p role="alert" className="mt-3 text-xs text-[#E5A49B]">
            {message}
          </p>
        )}

        {status === "success" && (
          <p
            role="status"
            className="mt-3 inline-flex items-center gap-2 text-xs text-[#DFC89E]"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </p>
        )}
      </div>
    </section>
  );
}
