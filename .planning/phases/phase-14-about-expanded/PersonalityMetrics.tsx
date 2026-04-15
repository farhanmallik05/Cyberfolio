"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WorkStyleCard {
  id: string;
  code: string;
  label: string;
  description: string;
  icon: string;
  accent: "neon" | "neon2";
}

interface Hobby {
  icon: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const WORK_STYLE: WorkStyleCard[] = [
  {
    id: "mbti",
    code: "INTJ",
    label: "Architect",
    description:
      "Strategic, systems-thinking, independent. Driven by long-term vision over short-term noise.",
    icon: "◈",
    accent: "neon",
  },
  {
    id: "focus",
    code: "DEEP WORK",
    label: "Flow-state builder",
    description:
      "4–6 hour uninterrupted blocks beat fragmented sprints every time. Distraction is the enemy.",
    icon: "⟁",
    accent: "neon2",
  },
  {
    id: "collab",
    code: "ASYNC-FIRST",
    label: "Async communicator",
    description:
      "Thoughtful written responses over real-time interruptions. Clarity over speed.",
    icon: "⇌",
    accent: "neon",
  },
  {
    id: "schedule",
    code: "NIGHT OWL",
    label: "Late-night coder",
    description:
      "Peak creative output hits after midnight. The quieter the world, the louder the ideas.",
    icon: "◑",
    accent: "neon2",
  },
];

const PERSONALITY_BADGES = [
  { label: "INTJ-A", category: "MBTI" },
  { label: "Enneagram 5w4", category: "TYPE" },
  { label: "Deep Work", category: "STYLE" },
  { label: "Systems Thinker", category: "MODE" },
  { label: "Night Shift", category: "SCHEDULE" },
  { label: "Solo Builder", category: "COLLAB" },
  { label: "Async-First", category: "COMMS" },
  { label: "Minimalist UI", category: "TASTE" },
];

const HOBBIES: Hobby[] = [
  { icon: "🎮", label: "Gaming" },
  { icon: "📚", label: "Reading" },
  { icon: "🎵", label: "Music Production" },
  { icon: "🌙", label: "Night Drives" },
  { icon: "⚗️", label: "Tinkering" },
  { icon: "🎨", label: "Digital Art" },
  { icon: "🤖", label: "AI Research" },
  { icon: "☕", label: "Coffee Rituals" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PersonalityMetrics() {
  return (
    <div className="pm-root">

      {/* ── Section: Working Style ──────────────────────────────────────────── */}
      <div className="pm-section">
        <div className="pm-section-header">
          <span className="pm-mono-label">// WORKING_STYLE</span>
          <h3 className="pm-section-title">How I operate</h3>
        </div>

        <div className="pm-style-grid">
          {WORK_STYLE.map((card) => (
            <div
              key={card.id}
              className={`pm-style-card pm-style-card--${card.accent}`}
            >
              <div className="pm-card-top">
                <span className="pm-card-icon">{card.icon}</span>
                <div>
                  <span className={`pm-card-code pm-card-code--${card.accent}`}>
                    {card.code}
                  </span>
                  <p className="pm-card-label">{card.label}</p>
                </div>
              </div>
              <p className="pm-card-desc">{card.description}</p>
              <div className={`pm-card-glow pm-card-glow--${card.accent}`} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Personality Badges ────────────────────────────────────── */}
      <div className="pm-section">
        <div className="pm-section-header">
          <span className="pm-mono-label">// PERSONALITY_MATRIX</span>
          <h3 className="pm-section-title">Trait stack</h3>
        </div>

        <div className="pm-badges">
          {PERSONALITY_BADGES.map((badge, i) => (
            <div key={i} className="pm-badge">
              <span className="pm-badge-cat">{badge.category}</span>
              <span className="pm-badge-label">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Outside of Code ────────────────────────────────────────── */}
      <div className="pm-section">
        <div className="pm-section-header">
          <span className="pm-mono-label">// OUTSIDE_OF_CODE</span>
          <h3 className="pm-section-title">When I close the laptop</h3>
        </div>

        <div className="pm-hobbies-grid">
          {HOBBIES.map((hobby, i) => (
            <div key={i} className="pm-hobby-card">
              <span className="pm-hobby-icon">{hobby.icon}</span>
              <span className="pm-hobby-label">{hobby.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Root ── */
        .pm-root {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          width: 100%;
        }

        /* ── Section header ── */
        .pm-section-header {
          margin-bottom: 1.25rem;
        }
        .pm-mono-label {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.68rem;
          color: var(--neon);
          letter-spacing: 0.15em;
          opacity: 0.7;
          display: block;
          margin-bottom: 0.25rem;
        }
        .pm-section-title {
          font-family: "Orbitron", sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-weight: 700;
          color: var(--text);
          margin: 0;
          letter-spacing: 0.04em;
        }

        /* ── Working style grid ── */
        .pm-style-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .pm-style-card {
          position: relative;
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.25rem;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: border-color 0.25s, transform 0.2s;
        }
        .pm-style-card:hover {
          transform: translateY(-2px);
        }
        .pm-style-card--neon:hover {
          border-color: rgba(0, 245, 255, 0.5);
        }
        .pm-style-card--neon2:hover {
          border-color: rgba(167, 0, 255, 0.5);
        }

        .pm-card-top {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .pm-card-icon {
          font-size: 1.4rem;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pm-card-code {
          display: block;
          font-family: "Orbitron", sans-serif;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .pm-card-code--neon {
          color: var(--neon);
          text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
        }
        .pm-card-code--neon2 {
          color: var(--neon2);
          text-shadow: 0 0 8px rgba(167, 0, 255, 0.5);
        }
        .pm-card-label {
          font-family: "Rajdhani", sans-serif;
          font-size: 0.78rem;
          color: var(--dim);
          margin: 0;
          letter-spacing: 0.03em;
        }
        .pm-card-desc {
          font-family: "Rajdhani", sans-serif;
          font-size: 0.85rem;
          color: var(--dim);
          line-height: 1.5;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Corner glow */
        .pm-card-glow {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          right: -20px;
          bottom: -20px;
          pointer-events: none;
        }
        .pm-card-glow--neon {
          background: radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, transparent 70%);
        }
        .pm-card-glow--neon2 {
          background: radial-gradient(circle, rgba(167, 0, 255, 0.08) 0%, transparent 70%);
        }

        /* ── Personality badges ── */
        .pm-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .pm-badge {
          display: flex;
          align-items: center;
          gap: 0;
          border-radius: 5px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--glass);
        }
        .pm-badge-cat {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.57rem;
          letter-spacing: 0.1em;
          padding: 4px 7px;
          background: rgba(0, 245, 255, 0.08);
          color: var(--neon);
          border-right: 1px solid var(--border);
        }
        .pm-badge-label {
          font-family: "Rajdhani", sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 9px;
          color: var(--text);
          letter-spacing: 0.02em;
        }

        /* ── Hobbies grid ── */
        .pm-hobbies-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        .pm-hobby-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 0.5rem;
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 8px;
          text-align: center;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .pm-hobby-card:hover {
          border-color: rgba(0, 245, 255, 0.3);
          transform: translateY(-3px);
        }
        .pm-hobby-icon {
          font-size: 1.5rem;
          line-height: 1;
        }
        .pm-hobby-label {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          color: var(--dim);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .pm-style-grid {
            grid-template-columns: 1fr;
          }
          .pm-hobbies-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 480px) {
          .pm-hobbies-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
