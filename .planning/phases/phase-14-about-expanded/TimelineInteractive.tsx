"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  org: string;
  description: string;
  type: "experience" | "education";
  tags?: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Replace with your real aboutData imports once wired up

const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: "1",
    year: "2020",
    title: "Started B.Tech CSE",
    org: "GL Bajaj Institute of Technology",
    description:
      "Began Computer Science & Engineering, diving deep into data structures, algorithms and system design.",
    type: "education",
    tags: ["CS Fundamentals", "Algorithms", "Systems"],
  },
  {
    id: "2",
    year: "2022",
    title: "First Freelance Project",
    org: "Self-Employed",
    description:
      "Delivered a full-stack web application for a local business — first real-world production deployment.",
    type: "experience",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "3",
    year: "2023",
    title: "AI & Automation Pivot",
    org: "Personal R&D",
    description:
      "Shifted focus toward AI pipelines, n8n workflows and GPT-4 integrations. Built and shipped 5+ automation tools.",
    type: "experience",
    tags: ["n8n", "GPT-4", "LangChain"],
  },
  {
    id: "4",
    year: "2023",
    title: "UI/UX Design Specialisation",
    org: "Self-Directed",
    description:
      "Obsessively studied design systems, motion design and glassmorphism aesthetics. Defined the Neural Architect visual language.",
    type: "education",
    tags: ["Figma", "GSAP", "Design Systems"],
  },
  {
    id: "5",
    year: "2024",
    title: "Full-Stack Product Dev",
    org: "Neural Architect Studio",
    description:
      "Expanded into full product development — Next.js apps, Supabase backends, and AI-powered SaaS prototypes.",
    type: "experience",
    tags: ["Next.js", "Supabase", "SaaS"],
  },
  {
    id: "6",
    year: "2025",
    title: "B.Tech Graduation",
    org: "GL Bajaj Institute of Technology",
    description:
      "Completing the degree while simultaneously shipping the Neural Architect portfolio and client projects.",
    type: "education",
    tags: ["Capstone", "Research", "Graduation"],
  },
];

const CARD_WIDTH = 320;
const CARD_GAP = 24;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimelineInteractive() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const totalTrackWidth =
    TIMELINE_DATA.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;

  useGSAP(
    () => {
      if (!trackRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const maxDrag = -(totalTrackWidth - containerWidth);

      // Entrance stagger
      gsap.fromTo(
        trackRef.current.querySelectorAll(".tl-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      // Draggable setup
      draggableRef.current = Draggable.create(trackRef.current, {
        type: "x",
        bounds: {
          minX: Math.min(maxDrag, 0),
          maxX: 0,
        },
        inertia: true,
        edgeResistance: 0.85,
        dragResistance: 0.05,
        cursor: "grab",
        activeCursor: "grabbing",
        onDrag() {
          gsap.set(trackRef.current, { willChange: "transform" });
        },
        onDragEnd() {
          gsap.set(trackRef.current, { willChange: "auto" });
        },
      });
    },
    { scope: containerRef }
  );

  const scrollToCard = (index: number) => {
    if (!containerRef.current || !draggableRef.current[0]) return;
    const containerWidth = containerRef.current.offsetWidth;
    const targetX = -(index * (CARD_WIDTH + CARD_GAP));
    const maxDrag = -(totalTrackWidth - containerWidth);
    const clampedX = Math.max(Math.min(targetX, 0), maxDrag);

    gsap.to(trackRef.current, {
      x: clampedX,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div className="tl-root" ref={containerRef}>
      {/* Header */}
      <div className="tl-header">
        <span className="tl-label">// TIMELINE</span>
        <h3 className="tl-title">Journey.log</h3>
        <p className="tl-hint">
          <span className="tl-hint-icon">⟵</span> drag to explore{" "}
          <span className="tl-hint-icon">⟶</span>
        </p>
      </div>

      {/* Filter dots */}
      <div className="tl-dots">
        {TIMELINE_DATA.map((entry, i) => (
          <button
            key={entry.id}
            className={`tl-dot tl-dot--${entry.type}`}
            aria-label={`Jump to ${entry.title}`}
            onClick={() => {
              setActiveId(entry.id);
              scrollToCard(i);
            }}
          />
        ))}
      </div>

      {/* Track */}
      <div className="tl-viewport">
        <div className="tl-track" ref={trackRef}>
          {TIMELINE_DATA.map((entry) => (
            <article
              key={entry.id}
              className={`tl-card tl-card--${entry.type} ${
                activeId === entry.id ? "tl-card--active" : ""
              }`}
              onClick={() => setActiveId(entry.id === activeId ? null : entry.id)}
            >
              {/* Year chip */}
              <div className="tl-year">
                <span className="tl-year-text">{entry.year}</span>
                <span className={`tl-type-badge tl-type-badge--${entry.type}`}>
                  {entry.type === "experience" ? "EXP" : "EDU"}
                </span>
              </div>

              {/* Connector line */}
              <div className="tl-connector">
                <div className="tl-connector-dot" />
                <div className="tl-connector-line" />
              </div>

              {/* Card body */}
              <div className="tl-card-body">
                <h4 className="tl-card-title">{entry.title}</h4>
                <p className="tl-card-org">{entry.org}</p>
                <p className="tl-card-desc">{entry.description}</p>
                {entry.tags && (
                  <div className="tl-tags">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="tl-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Edge fades */}
        <div className="tl-fade tl-fade--left" />
        <div className="tl-fade tl-fade--right" />
      </div>

      <style jsx>{`
        .tl-root {
          width: 100%;
          padding: 2rem 0;
          user-select: none;
        }

        /* ── Header ── */
        .tl-header {
          padding: 0 1.5rem 1.5rem;
        }
        .tl-label {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.7rem;
          color: var(--neon);
          letter-spacing: 0.15em;
          opacity: 0.7;
          display: block;
          margin-bottom: 0.25rem;
        }
        .tl-title {
          font-family: "Orbitron", sans-serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 0.5rem;
          letter-spacing: 0.05em;
        }
        .tl-hint {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.72rem;
          color: var(--dim);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .tl-hint-icon {
          color: var(--neon);
          opacity: 0.6;
        }

        /* ── Dots nav ── */
        .tl-dots {
          display: flex;
          gap: 0.5rem;
          padding: 0 1.5rem 1.25rem;
        }
        .tl-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
          background: var(--dim);
          opacity: 0.4;
        }
        .tl-dot--experience {
          background: var(--neon);
        }
        .tl-dot--education {
          background: var(--neon2);
        }
        .tl-dot:hover {
          transform: scale(1.5);
          opacity: 1;
        }

        /* ── Viewport & Track ── */
        .tl-viewport {
          position: relative;
          overflow: hidden;
          padding: 1rem 1.5rem 2rem;
        }
        .tl-track {
          display: flex;
          gap: ${CARD_GAP}px;
          width: max-content;
          cursor: grab;
        }
        .tl-track:active {
          cursor: grabbing;
        }

        /* ── Edge fades ── */
        .tl-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          pointer-events: none;
          z-index: 2;
        }
        .tl-fade--left {
          left: 0;
          background: linear-gradient(to right, var(--bg), transparent);
        }
        .tl-fade--right {
          right: 0;
          background: linear-gradient(to left, var(--bg), transparent);
        }

        /* ── Cards ── */
        .tl-card {
          width: ${CARD_WIDTH}px;
          flex-shrink: 0;
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          position: relative;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s;
          backdrop-filter: blur(12px);
        }
        .tl-card:hover,
        .tl-card--active {
          border-color: var(--neon);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.12),
            0 0 0 1px rgba(0, 245, 255, 0.15);
        }
        .tl-card--education:hover,
        .tl-card--education.tl-card--active {
          border-color: var(--neon2);
          box-shadow: 0 0 20px rgba(167, 0, 255, 0.12),
            0 0 0 1px rgba(167, 0, 255, 0.15);
        }

        /* ── Year row ── */
        .tl-year {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .tl-year-text {
          font-family: "Orbitron", sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--neon);
          letter-spacing: 0.05em;
        }
        .tl-card--education .tl-year-text {
          color: var(--neon2);
        }
        .tl-type-badge {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .tl-type-badge--experience {
          background: rgba(0, 245, 255, 0.1);
          color: var(--neon);
          border: 1px solid rgba(0, 245, 255, 0.3);
        }
        .tl-type-badge--education {
          background: rgba(167, 0, 255, 0.1);
          color: var(--neon2);
          border: 1px solid rgba(167, 0, 255, 0.3);
        }

        /* ── Connector ── */
        .tl-connector {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 1rem;
        }
        .tl-connector-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 6px var(--neon);
          flex-shrink: 0;
        }
        .tl-card--education .tl-connector-dot {
          background: var(--neon2);
          box-shadow: 0 0 6px var(--neon2);
        }
        .tl-connector-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(to right, var(--neon), transparent);
          opacity: 0.4;
        }
        .tl-card--education .tl-connector-line {
          background: linear-gradient(to right, var(--neon2), transparent);
        }

        /* ── Card body ── */
        .tl-card-title {
          font-family: "Orbitron", sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 0.3rem;
          letter-spacing: 0.03em;
          line-height: 1.3;
        }
        .tl-card-org {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.7rem;
          color: var(--dim);
          margin: 0 0 0.75rem;
          letter-spacing: 0.08em;
        }
        .tl-card-desc {
          font-family: "Rajdhani", sans-serif;
          font-size: 0.88rem;
          color: var(--dim);
          line-height: 1.55;
          margin: 0 0 1rem;
        }

        /* ── Tags ── */
        .tl-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .tl-tag {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          padding: 2px 7px;
          background: var(--glass2);
          border: 1px solid var(--border);
          border-radius: 3px;
          color: var(--dim);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .tl-card {
            width: 280px;
          }
          .tl-fade {
            width: 40px;
          }
        }
        @media (max-width: 480px) {
          .tl-card {
            width: 260px;
            padding: 1.25rem;
          }
          .tl-year-text {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
