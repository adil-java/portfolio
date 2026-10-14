"use client";

import React, { useState } from "react";
import { Send, Mail } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    className={props.className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
    />
  </svg>
);

export function WhatsAppForm() {
  const [activeTab, setActiveTab] = useState<"email" | "whatsapp">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectTab = (tab: "email" | "whatsapp") => {
    setActiveTab(tab);
    setError("");
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextTab: "email" | "whatsapp";
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      nextTab = activeTab === "email" ? "whatsapp" : "email";
    } else if (event.key === "Home") {
      nextTab = "email";
    } else if (event.key === "End") {
      nextTab = "whatsapp";
    } else {
      return;
    }

    event.preventDefault();
    selectTab(nextTab);
    document.getElementById(`contact-${nextTab}-tab`)?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!message.trim()) {
      setError("Please write a message about the role, project, or idea.");
      return;
    }

    if (activeTab === "whatsapp") {
      const phoneNumber = RESUME_DATA.contact.tel.replace(/\D/g, "");
      const formattedText = `Hi Adil,\n\nMy name is *${name.trim()}*.\n\n${message.trim()}`;
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          formattedText,
        )}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    const emailSubject =
      subject.trim() || `Portfolio Inquiry from ${name.trim()}`;
    const emailBody = `Hi Adil,\n\nMy name is ${name.trim()}.\n${
      email.trim() ? `My email address is: ${email.trim()}\n\n` : "\n"
    }${message.trim()}\n\nBest regards,\n${name.trim()}`;

    const mailtoUrl = `mailto:${
      RESUME_DATA.contact.email
    }?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      emailBody,
    )}`;

    window.location.href = mailtoUrl;
  };

  const inputClass =
    "contact-input w-full min-h-11 rounded-md border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 sm:text-sm dark:border-[#30363d] dark:bg-[#0d1117] dark:text-[#c9d1d9] dark:placeholder:text-[#8b949e] dark:focus:border-[#58a6ff]";
  const labelClass =
    "contact-label mb-2 block text-sm font-medium text-gray-700 dark:text-[#c9d1d9]";

  return (
    <div className="w-full">
      <div
        className="contact-tabs mb-5 flex items-center gap-5 border-b border-gray-200 dark:border-[#30363d]"
        role="tablist"
        aria-label="Contact method"
      >
        {(["email", "whatsapp"] as const).map((tab) => (
          <button
            key={tab}
            id={`contact-${tab}-tab`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls="contact-panel"
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => selectTab(tab)}
            onKeyDown={handleTabKeyDown}
            className={`contact-tab -mb-px flex min-h-11 items-center gap-2 border-b-2 pb-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${
              activeTab === tab
                ? "border-orange-500 font-semibold text-gray-900 dark:border-[#f78166] dark:text-white"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:text-[#8b949e] dark:hover:text-white"
            }`}
          >
            {tab === "email" ? (
              <Mail className="h-4 w-4" aria-hidden="true" />
            ) : (
              <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
            )}
            {tab === "email" ? "Email" : "WhatsApp"}
          </button>
        ))}
      </div>

      <div
        id="contact-panel"
        role="tabpanel"
        aria-labelledby={`contact-${activeTab}-tab`}
        className="contact-panel rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-[#30363d] dark:bg-[#121212]"
      >
        <form onSubmit={handleSubmit} className="contact-form space-y-5">
          <div
            className={`grid gap-5 ${
              activeTab === "email" ? "sm:grid-cols-2" : ""
            }`}
          >
            <div className="contact-field">
              <label htmlFor="contact-name" className={labelClass}>
                Your name{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            {activeTab === "email" && (
              <div className="contact-field">
                <label htmlFor="contact-email" className={labelClass}>
                  Your email{" "}
                  <span className="font-normal text-gray-500 dark:text-[#8b949e]">
                    (optional)
                  </span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </div>
          {activeTab === "email" && (
            <div className="contact-field">
              <label htmlFor="contact-subject" className={labelClass}>
                Subject{" "}
                <span className="font-normal text-gray-500 dark:text-[#8b949e]">
                  (optional)
                </span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                maxLength={160}
                placeholder="A role, project, or collaboration"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputClass}
              />
            </div>
          )}
          <div className="contact-field">
            <label htmlFor="contact-message" className={labelClass}>
              Message{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              maxLength={2000}
              placeholder="Tell me about the role, project, or idea you have in mind."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} contact-textarea min-h-32 resize-y leading-relaxed`}
            />
          </div>
          <p
            id="contact-form-error"
            aria-live="polite"
            role={error ? "alert" : undefined}
            className={
              error
                ? "text-sm font-medium text-red-600 dark:text-[#f85149]"
                : "sr-only"
            }
          >
            {error}
          </p>
          <div className="contact-actions flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="contact-helper text-xs leading-relaxed text-gray-500 dark:text-[#8b949e]">
              {activeTab === "email"
                ? "Review and send from your email app."
                : "Review and send in WhatsApp."}
            </p>
            <button
              type="submit"
              className={`contact-submit inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 sm:w-auto ${
                activeTab === "email"
                  ? "border-blue-700 bg-[#1f6feb] hover:bg-[#185cbd] dark:border-[#388bfd] dark:bg-[#2188ff] dark:hover:bg-[#388bfd]"
                  : "border-green-700 bg-[#2ea043] hover:bg-[#2c973f] dark:border-[#2ea043]"
              }`}
            >
              {activeTab === "email" ? (
                <Mail className="h-4 w-4" aria-hidden="true" />
              ) : (
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
              )}
              {activeTab === "email"
                ? "Open email draft"
                : "Continue in WhatsApp"}
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
