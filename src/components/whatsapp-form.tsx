"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" className={props.className} {...props}>
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
    />
  </svg>
);

export function WhatsAppForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!message.trim()) {
      setError("Please write a message");
      return;
    }

    const phoneNumber = "923312755830";
    const formattedText = `Hi Adil,\n\nMy name is *${name.trim()}*.\n\n${message.trim()}`;
    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117] p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <WhatsAppIcon className="text-green-600 dark:text-[#3fb950]" />
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Send a message via WhatsApp</h3>
          <p className="text-[11px] text-gray-500 dark:text-[#8b949e]">Usually responds within an hour</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="wa-name" className="block text-xs font-medium text-gray-700 dark:text-[#c9d1d9] mb-1.5">Your Name</label>
          <input
            id="wa-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-[#30363d] bg-white dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9] placeholder-gray-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-[#1f6feb]/40 focus:border-blue-500 dark:focus:border-[#1f6feb] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="wa-message" className="block text-xs font-medium text-gray-700 dark:text-[#c9d1d9] mb-1.5">Message</label>
          <textarea
            id="wa-message"
            rows={3}
            placeholder="Hey Adil, I'd love to collaborate on a project..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-[#30363d] bg-white dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9] placeholder-gray-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-[#1f6feb]/40 focus:border-blue-500 dark:focus:border-[#1f6feb] transition-colors resize-none"
          />
        </div>

        {error && <p className="text-xs text-red-600 dark:text-[#f85149] font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-green-600 dark:bg-[#238636] text-white hover:bg-green-700 dark:hover:bg-[#2ea043] border border-green-700 dark:border-[#2ea043] transition-colors"
        >
          <WhatsAppIcon className="text-white" />
          Send via WhatsApp
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
