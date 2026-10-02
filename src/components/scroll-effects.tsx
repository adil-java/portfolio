"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function ScrollEffects() {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanupMotion = () => {};

    function enableMotion() {
      const pending = new Set<HTMLElement>();
      const timeline = main!.querySelector<HTMLElement>(".timeline");
      const entries = Array.from(
        timeline?.querySelectorAll<HTMLElement>(".timeline-entry") ?? [],
      );
      let frame = 0;
      let positions: number[] = [];
      let distance = 0;
      let needsMeasurement = true;

      const reveal = (element: HTMLElement) => {
        element.dataset.revealState = "visible";
        pending.delete(element);
        intersection.unobserve(element);
      };
      const intersection = new IntersectionObserver(
        (records) => {
          for (const record of records) {
            if (record.isIntersecting) reveal(record.target as HTMLElement);
          }
        },
        { rootMargin: "0px 0px -32px 0px", threshold: 0.08 },
      );

      function register(element: HTMLElement) {
        if (element.dataset.revealState === "visible" || pending.has(element))
          return;
        // Keep the initial viewport and content above a deep link immediately readable.
        if (element.getBoundingClientRect().top < window.innerHeight - 32) {
          reveal(element);
          return;
        }
        const delay = clamp(Number(element.dataset.revealDelay) || 0, 0, 180);
        element.style.setProperty("--reveal-delay", `${delay}ms`);
        element.dataset.revealState = "pending";
        pending.add(element);
        intersection.observe(element);
      }

      main!.querySelectorAll<HTMLElement>("[data-reveal]").forEach(register);
      const mutations = new MutationObserver((records) => {
        for (const record of records) {
          for (const node of Array.from(record.removedNodes)) {
            if (!(node instanceof HTMLElement)) continue;
            const removed = [
              node,
              ...Array.from(
                node.querySelectorAll<HTMLElement>("[data-reveal]"),
              ),
            ];
            for (const element of removed) {
              pending.delete(element);
              intersection.unobserve(element);
            }
          }
          for (const node of Array.from(record.addedNodes)) {
            if (!(node instanceof HTMLElement)) continue;
            if (node.matches("[data-reveal]")) register(node);
            node
              .querySelectorAll<HTMLElement>("[data-reveal]")
              .forEach(register);
          }
        }
        scheduleUpdate();
      });
      mutations.observe(main!, { childList: true, subtree: true });

      function updateScroll() {
        frame = 0;
        if (needsMeasurement && timeline) {
          positions = entries.map((entry) => entry.offsetTop);
          distance = positions[positions.length - 1] ?? 0;
          needsMeasurement = false;
        }
        // Read layout before updating styles; scrolling never triggers a React render.
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const pageProgress =
          scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
        const timelineTop = timeline?.getBoundingClientRect().top ?? 0;
        const readPosition = window.innerHeight * 0.55 - timelineTop - 8;
        const timelineProgress =
          distance > 0 ? clamp(readPosition / distance, 0, 1) : 0;

        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${pageProgress})`;
        if (timeline) {
          timeline.dataset.scrollTimeline = "active";
          timeline.style.setProperty("--timeline-distance", `${distance}px`);
          timeline.style.setProperty(
            "--timeline-progress",
            `${timelineProgress}`,
          );
          timeline.style.setProperty(
            "--timeline-offset",
            `${timelineProgress * distance}px`,
          );
          entries.forEach((entry, index) => {
            // Allow for fractional layout positions and integer scroll rounding.
            const reached = String(readPosition + 1 >= positions[index]);
            if (entry.dataset.reached !== reached)
              entry.dataset.reached = reached;
          });
        }
      }
      function scheduleUpdate() {
        if (!frame) frame = requestAnimationFrame(updateScroll);
      }
      function measure() {
        needsMeasurement = true;
        scheduleUpdate();
      }
      function revealFocusedContent(event: FocusEvent) {
        if (!(event.target instanceof HTMLElement)) return;
        const element = event.target.closest<HTMLElement>("[data-reveal]");
        if (element && pending.has(element)) reveal(element);
      }
      const resize = new ResizeObserver(measure);
      resize.observe(document.body);
      if (timeline) resize.observe(timeline);
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", measure);
      main!.addEventListener("focusin", revealFocusedContent);
      scheduleUpdate();

      return () => {
        cancelAnimationFrame(frame);
        intersection.disconnect();
        mutations.disconnect();
        resize.disconnect();
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", measure);
        main!.removeEventListener("focusin", revealFocusedContent);
        pending.forEach((element) => {
          // Restore readable defaults on teardown without marking unseen content
          // as revealed during React's development effect replay.
          delete element.dataset.revealState;
          element.style.removeProperty("--reveal-delay");
        });
        if (timeline) {
          delete timeline.dataset.scrollTimeline;
          entries.forEach((entry) => {
            delete entry.dataset.reached;
          });
        }
      };
    }

    function syncPreference() {
      cleanupMotion();
      cleanupMotion = preference.matches ? () => {} : enableMotion();
    }
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      cleanupMotion();
      preference.removeEventListener("change", syncPreference);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
