"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

export function WhatsAppForm() {
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !message) {
      setError("Please enter your name and a message.");
      return;
    }
    setError("");
    const body = `Hi Adil,\n\nMy name is ${name}.${
      email ? `\nYou can reach me at ${email}.` : ""
    }\n\n${message}\n\nBest,\n${name}`;
    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${RESUME_DATA.contact.tel.replace(
          /\D/g,
          "",
        )}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      window.location.href = `mailto:${
        RESUME_DATA.contact.email
      }?subject=${encodeURIComponent(
        `Portfolio inquiry from ${name}`,
      )}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <div className="contact-form-card" data-reveal data-reveal-delay={80}>
      <div
        className="contact-channels"
        role="group"
        aria-label="Contact method"
      >
        <button
          type="button"
          aria-pressed={channel === "email"}
          onClick={() => {
            setChannel("email");
            setError("");
          }}
        >
          <Mail size={16} />
          Email
        </button>
        <button
          type="button"
          aria-pressed={channel === "whatsapp"}
          onClick={() => {
            setChannel("whatsapp");
            setError("");
          }}
        >
          <MessageCircle size={16} />
          WhatsApp
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              required
              maxLength={100}
            />
          </div>
          <div>
            <label htmlFor="contact-email">
              Email <span>(optional)</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your Email"
              maxLength={254}
            />
          </div>
        </div>
        <label htmlFor="contact-message">What do you have in mind?</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell me a little about your project or opportunity…"
          rows={4}
          required
          maxLength={4000}
          aria-describedby={error ? "contact-error" : undefined}
        />
        {error && (
          <p id="contact-error" className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button-primary" type="submit">
          {channel === "email" ? "Draft an email" : "Continue on WhatsApp"}
          <ArrowUpRight size={16} />
        </button>
        <p className="form-note">
          {channel === "email"
            ? "Opens your email app with your message ready to send."
            : "Opens WhatsApp with your message ready to send."}
        </p>
      </form>
    </div>
  );
}
