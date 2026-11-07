"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { RESUME_DATA } from "@/data/resume-data";

// Desktop-only loading effect: "agent" cursors build the page element by element,
// first the opening screen and then each section as it scrolls into view.
const AGENTS = [
  { name: "agent-layout", color: "#535458ff" },
  { name: "agent-type", color: "#b3750bff" },
  { name: "agent-assets", color: "#0f8e60ff" },
  { name: "agent-skills", color: "#4a1d8eff" },
  { name: "agent-education", color: "#4a1d8eff" },
  { name: "agent-projects", color: "#4a1d8eff" },
];
// Handles clicks on the theme toggle (see ThemeAgent below).
const THEME_AGENT = { name: "agent-theme", color: "#ca8a04ff" };
// Keep in sync with the html.agent-loading rule in globals.css.
const TARGETS =
  "main :is(h1, h2, h3, p, a, button, img, li, dt, dd, span), header :is(a, button)";
const MOVE_MS = 240;
const DRAW_MS = 280;
const GAP_MS = 40;
const IDLE_MS = 1200;
// Opening shot: big title and photo in the centre, then the layout agent
// drags the photo down into its slot before the rest is built.
const AVATAR = ".desktop-avatar";
const DRAG_MS = 900;
// Elements are queued once their top passes this share of the viewport.
const TRIGGER = 0.92;

type Cursor = { x: number; y: number; visible: boolean; drag?: boolean };
// Set by the head script in layout.tsx: "pending" until this component takes over.
type IntroState = "pending" | "mounted" | "done" | "expired";
type IntroWindow = Window & { __agentIntro?: IntroState };
// Runs before paint, so a client re-render after a hydration error never flashes.
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
type Rect = { left: number; top: number; width: number; height: number };
type Hero = { stage: "center" | "drag" | "done"; rect: Rect };
type Box = {
  id: number;
  agent: number;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  drawn: boolean;
  done: boolean;
};

function labelFor(el: Element) {
  const tag = el.tagName.toLowerCase();
  const cls = (el.getAttribute("class") ?? "").split(/\s+/).find(Boolean);
  return cls && !cls.includes(":") ? `${tag}.${cls}` : tag;
}

// Build top to bottom, then left to right, like a page being laid out.
function byPosition(a: Element, b: Element) {
  const ra = a.getBoundingClientRect();
  const rb = b.getBoundingClientRect();
  return Math.round(ra.top / 40) - Math.round(rb.top / 40) || ra.left - rb.left;
}

export function AgentCursors() {
  const [active, setActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [layerHeight, setLayerHeight] = useState(0);
  const [cursors, setCursors] = useState<Cursor[]>(() =>
    AGENTS.map(() => ({ x: 0, y: 0, visible: false })),
  );
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [hero, setHero] = useState<Hero | null>(null);

  useBeforePaint(() => {
    // The head script flags eligible screens before first paint. Re-add its
    // class in case React replaced the DOM after a hydration mismatch.
    const root = document.documentElement;
    const win = window as IntroWindow;
    if (win.__agentIntro !== "pending" && win.__agentIntro !== "mounted") return;
    win.__agentIntro = "mounted";
    root.dataset.agentIntro = "mounted";
    root.classList.add("agent-loading");

    let cancelled = false;
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => later(ms, resolve));

    // Every rendered element on the page, not just the first screen. Outermost
    // matches only, so a link inside a list item isn't drawn twice.
    const avatar = document.querySelector<HTMLElement>(AVATAR);
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(TARGETS),
    ).filter(
      (el) =>
        !el.parentElement?.closest(TARGETS) &&
        !el.closest(AVATAR) &&
        el.getClientRects().length > 0,
    );
    const pending = avatar ? [avatar, ...targets] : targets;

    // Hand over from the blanket loading rule to per-element flags, so content
    // rendered later (tabs, panels) appears normally instead of staying hidden.
    pending.forEach((el) => (el.dataset.agentPending = ""));
    root.classList.add("agent-building");
    root.classList.remove("agent-loading");

    let done = 0;
    const total = targets.length;
    const reveal = (el: HTMLElement) => {
      if (!("agentPending" in el.dataset)) return;
      el.style.transition = "opacity 300ms ease-out";
      delete el.dataset.agentPending;
      setTimeout(() => (el.style.transition = ""), 320);
    };
    const countDone = () => {
      done += 1;
      setProgress({ done, total });
      if (done >= total) later(IDLE_MS, finish);
    };
    const moveCursor = (agent: number, patch: Partial<Cursor>) =>
      setCursors((prev) =>
        prev.map((c, j) => (j === agent ? { ...c, ...patch } : c)),
      );

    setActive(true);
    setBoxes([]);
    setProgress({ done: 0, total });
    setLayerHeight(root.scrollHeight);
    setCursors(
      AGENTS.map((_, i) => ({
        x: window.innerWidth * (0.2 + i * 0.2),
        y: window.scrollY + window.innerHeight + 40,
        visible: false,
      })),
    );

    // Work queue fed by the intersection observer and shared by all agents.
    const queue: HTMLElement[] = [];
    let waiting: (() => void)[] = [];
    let working = 0;
    let idleTimer = 0;
    const wake = () => {
      waiting.forEach((resolve) => resolve());
      waiting = [];
    };
    const nextJob = async () => {
      while (!cancelled && queue.length === 0) {
        await new Promise<void>((resolve) => waiting.push(resolve));
      }
      return queue.shift();
    };
    // Agents leave once there is nothing left on screen to build.
    const markIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (working === 0 && queue.length === 0) {
          setBusy(false);
          setCursors((prev) => prev.map((c) => ({ ...c, visible: false })));
        }
      }, IDLE_MS);
    };

    let boxId = 0;
    const build = async (agent: number, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      // Skip drawing anything tiny or already scrolled past; just show it.
      if (
        r.width < 4 ||
        r.height < 4 ||
        r.bottom < 0 ||
        r.top > window.innerHeight
      ) {
        reveal(el);
        countDone();
        return;
      }
      // Page coordinates, so boxes stay on their element while scrolling.
      const x = r.left + window.scrollX;
      const y = r.top + window.scrollY;
      const id = boxId++;
      setBusy(true);
      setLayerHeight(root.scrollHeight);
      moveCursor(agent, { x, y, visible: true });
      await sleep(MOVE_MS);
      if (cancelled) return;
      setBoxes((prev) => [
        ...prev,
        {
          id,
          agent,
          x,
          y,
          w: r.width,
          h: r.height,
          label: labelFor(el),
          drawn: false,
          done: false,
        },
      ]);
      requestAnimationFrame(() =>
        setBoxes((prev) =>
          prev.map((b) => (b.id === id ? { ...b, drawn: true } : b)),
        ),
      );
      moveCursor(agent, { x: x + r.width, y: y + r.height });
      await sleep(DRAW_MS);
      if (cancelled) return;
      reveal(el);
      countDone();
      setBoxes((prev) =>
        prev.map((b) => (b.id === id ? { ...b, done: true } : b)),
      );
      later(700, () => setBoxes((prev) => prev.filter((b) => b.id !== id)));
      await sleep(GAP_MS);
    };

    const runAgent = async (agent: number) => {
      while (!cancelled) {
        const el = await nextJob();
        if (!el || cancelled) return;
        working += 1;
        await build(agent, el);
        working -= 1;
        if (queue.length === 0) markIdle();
      }
    };

    // Queue elements once they reach the viewport. Anything a fast scroll or
    // jump link skipped past is queued too and simply shown.
    const unqueued = new Set(targets);
    let scanFrame = 0;
    const scan = () => {
      scanFrame = 0;
      const line = window.innerHeight * TRIGGER;
      const ready = Array.from(unqueued)
        .filter((el) => el.getBoundingClientRect().top < line)
        .sort(byPosition);
      if (ready.length === 0) return;
      ready.forEach((el) => unqueued.delete(el));
      queue.push(...ready);
      wake();
    };
    const requestScan = () => {
      if (!scanFrame) scanFrame = requestAnimationFrame(scan);
    };
    let building = false;
    const startBuilding = () => {
      if (cancelled || building) return;
      building = true;
      AGENTS.forEach((_, i) => runAgent(i));
      scan();
      window.addEventListener("scroll", requestScan, { passive: true });
      window.addEventListener("resize", requestScan);
    };

    const avatarRect = avatar?.getBoundingClientRect();
    if (
      avatar &&
      avatarRect &&
      avatarRect.width > 0 &&
      avatarRect.bottom > 0 &&
      avatarRect.top < window.innerHeight
    ) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const size = Math.min(300, vh * 0.36);
      const center: Rect = {
        left: vw / 2 - size / 2,
        top: sy + vh / 2 - size / 2 + 40,
        width: size,
        height: size * 1.1,
      };
      const target: Rect = {
        left: avatarRect.left,
        top: avatarRect.top + sy,
        width: avatarRect.width,
        height: avatarRect.height,
      };
      setBusy(true);
      setHero({ stage: "center", rect: center });
      // The layout agent grabs the photo's corner...
      later(700, () =>
        moveCursor(0, {
          visible: true,
          x: center.left + center.width - 6,
          y: center.top + center.height - 6,
        }),
      );
      // ...and drags it into place while the title clears.
      later(1250, () => {
        setHero({ stage: "drag", rect: target });
        moveCursor(0, {
          drag: true,
          x: target.left + target.width - 6,
          y: target.top + target.height - 6,
        });
      });
      later(1250 + DRAG_MS, () => {
        reveal(avatar);
        setHero((prev) => (prev ? { ...prev, stage: "done" } : prev));
        moveCursor(0, { drag: false });
      });
      later(1250 + DRAG_MS + 400, () => {
        setHero(null);
        startBuilding();
      });
    } else {
      if (avatar) reveal(avatar);
      startBuilding();
    }

    function finish() {
      cancelled = true;
      wake();
      timers.forEach(clearTimeout);
      window.clearTimeout(idleTimer);
      cancelAnimationFrame(scanFrame);
      window.removeEventListener("scroll", requestScan);
      window.removeEventListener("resize", requestScan);
      pending.forEach(reveal);
      root.classList.remove("agent-loading", "agent-building");
      win.__agentIntro = "done";
      setActive(false);
    }
    // A click or key press shows the whole page straight away.
    window.addEventListener("keydown", finish, { once: true });
    window.addEventListener("pointerdown", finish, { once: true });

    // Cleanup resets everything so a dev Strict Mode re-run can start over.
    return () => {
      cancelled = true;
      wake();
      timers.forEach(clearTimeout);
      window.clearTimeout(idleTimer);
      cancelAnimationFrame(scanFrame);
      window.removeEventListener("scroll", requestScan);
      window.removeEventListener("resize", requestScan);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
      if (root.classList.contains("agent-building")) {
        pending.forEach((el) => {
          el.style.transition = "";
          delete el.dataset.agentPending;
        });
        root.classList.remove("agent-building");
        root.classList.add("agent-loading");
      }
    };
  }, []);

  if (!active) return null;

  const percent = progress.total
    ? Math.round((progress.done / progress.total) * 100)
    : 0;

  return (
    <div
      className="agent-layer"
      aria-hidden="true"
      style={{ height: layerHeight }}
    >
      {hero && (
        <>
          <div className="agent-title" data-stage={hero.stage}>
            <span>Welcome to </span>
            <span>{RESUME_DATA.name}</span>
            <strong>Portfolio</strong>
          </div>
          <div
            className="agent-photo"
            data-stage={hero.stage}
            style={{
              left: hero.rect.left,
              top: hero.rect.top,
              width: hero.rect.width,
              height: hero.rect.height,
              backgroundImage: `url(${RESUME_DATA.avatarUrl})`,
            }}
          >
            <i />
            <i />
            <i />
            <i />
          </div>
        </>
      )}
      {busy && (
        <div className="agent-hud">
          <div className="agent-hud-row">
            <span className="agent-hud-dots">
              {AGENTS.map((a) => (
                <i key={a.name} style={{ background: a.color }} />
              ))}
            </span>
            <span>
              {percent < 100 ? `${AGENTS.length} agents building…` : "Ready"}
            </span>
            <span className="agent-hud-count">
              {progress.done}/{progress.total}
            </span>
          </div>
          <div className="agent-hud-bar">
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>
      )}
      {boxes.map((b) => (
        <div
          key={b.id}
          className="agent-box"
          data-drawn={b.drawn}
          data-done={b.done}
          style={{
            left: b.x - 4,
            top: b.y - 4,
            width: b.w + 8,
            height: b.h + 8,
            ["--agent" as string]: AGENTS[b.agent].color,
          }}
        >
          <span>{b.label}</span>
        </div>
      ))}
      {cursors.map((c, i) => (
        <div
          key={AGENTS[i].name}
          className="agent-cursor"
          data-visible={c.visible}
          data-drag={c.drag ?? false}
          style={{
            transform: `translate(${c.x}px, ${c.y}px)`,
            ["--agent" as string]: AGENTS[i].color,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M4 2l16 9.5-7 1.6-3.6 6.9z"
              fill="var(--agent)"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span>{AGENTS[i].name}</span>
        </div>
      ))}
    </div>
  );
}

// Desktop only: clicking the theme toggle sends an agent to flip it, so the
// switch plays out on screen. Uses viewport coordinates since the header is sticky.
export function ThemeAgent() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
    click: false,
  });
  const [box, setBox] = useState<{
    rect: Rect;
    label: string;
    drawn: boolean;
    done: boolean;
  } | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!desktop || reduced) return;

    let running = false;
    let bypass = false;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));

    const run = async (toggle: HTMLElement, from: { x: number; y: number }) => {
      running = true;
      const r = toggle.getBoundingClientRect();
      const toLight = document.documentElement.classList.contains("dark");
      setCursor({ x: from.x, y: from.y + 120, visible: false, click: false });
      await sleep(30);
      setCursor((c) => ({ ...c, visible: true, x: r.left + r.width / 2, y: r.top + r.height / 2 }));
      await sleep(480);
      setBox({
        rect: { left: r.left, top: r.top, width: r.width, height: r.height },
        label: toLight ? "→ light theme" : "→ dark theme",
        drawn: false,
        done: false,
      });
      requestAnimationFrame(() => setBox((b) => (b ? { ...b, drawn: true } : b)));
      await sleep(360);
      setCursor((c) => ({ ...c, click: true }));
      bypass = true;
      toggle.click();
      bypass = false;
      await sleep(450);
      setBox((b) => (b ? { ...b, done: true } : b));
      setCursor((c) => ({ ...c, click: false }));
      await sleep(500);
      setCursor((c) => ({ ...c, visible: false }));
      await sleep(400);
      setBox(null);
      running = false;
    };

    // Capture phase, so the agent runs before React's own click handler.
    const onClick = (event: MouseEvent) => {
      if (bypass) return;
      const toggle = (event.target as Element | null)?.closest<HTMLElement>(
        ".theme-toggle",
      );
      if (!toggle) return;
      event.preventDefault();
      event.stopPropagation();
      if (!running) run(toggle, { x: event.clientX, y: event.clientY });
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!cursor.visible && !box) return null;

  return (
    <div className="theme-agent-layer" aria-hidden="true">
      {box && (
        <div
          className="agent-box"
          data-drawn={box.drawn}
          data-done={box.done}
          style={{
            left: box.rect.left - 4,
            top: box.rect.top - 4,
            width: box.rect.width + 8,
            height: box.rect.height + 8,
            ["--agent" as string]: THEME_AGENT.color,
          }}
        >
          <span>{box.label}</span>
        </div>
      )}
      <div
        className="agent-cursor"
        data-visible={cursor.visible}
        data-click={cursor.click}
        style={{
          transform: `translate(${cursor.x}px, ${cursor.y}px)`,
          ["--agent" as string]: THEME_AGENT.color,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M4 2l16 9.5-7 1.6-3.6 6.9z"
            fill="var(--agent)"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span>{THEME_AGENT.name}</span>
      </div>
    </div>
  );
}
