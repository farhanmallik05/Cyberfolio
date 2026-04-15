"use client";

import { useRef, useState, useEffect } from "react";

// ─── Props ────────────────────────────────────────────────────────────────────

interface BioVideoPulseProps {
  /** Direct video URL (.mp4) or a Loom embed URL */
  src: string;
  /** "loom" | "native" — defaults to "native" */
  type?: "loom" | "native";
  /** Poster image shown before video loads */
  poster?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BioVideoPulse({
  src,
  type = "native",
  poster,
}: BioVideoPulseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Update progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () =>
      setProgress((video.currentTime / (video.duration || 1)) * 100);
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // ── Loom embed ──────────────────────────────────────────────────────────────
  if (type === "loom") {
    // Convert loom share URL → embed URL if needed
    const embedSrc = src.includes("/embed/")
      ? src
      : src.replace("share", "embed") + "?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true";

    return (
      <div className="bvp-root">
        <div className="bvp-pulse-ring bvp-pulse-ring--1" />
        <div className="bvp-pulse-ring bvp-pulse-ring--2" />
        <div className="bvp-pulse-ring bvp-pulse-ring--3" />

        <div className="bvp-frame">
          <div className="bvp-scanline" />
          <div className="bvp-corner bvp-corner--tl" />
          <div className="bvp-corner bvp-corner--tr" />
          <div className="bvp-corner bvp-corner--bl" />
          <div className="bvp-corner bvp-corner--br" />

          <div className="bvp-label">
            <span className="bvp-label-dot" />
            <span>INTRO.STREAM</span>
          </div>

          <div className="bvp-loom-wrapper">
            <iframe
              src={embedSrc}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen"
              title="Introduction video"
              className="bvp-iframe"
            />
          </div>
        </div>

        <BvpStyles />
      </div>
    );
  }

  // ── Native video ─────────────────────────────────────────────────────────────
  return (
    <div className="bvp-root">
      {/* Pulse rings */}
      <div className={`bvp-pulse-ring bvp-pulse-ring--1 ${playing ? "bvp-pulse-ring--active" : ""}`} />
      <div className={`bvp-pulse-ring bvp-pulse-ring--2 ${playing ? "bvp-pulse-ring--active" : ""}`} />
      <div className={`bvp-pulse-ring bvp-pulse-ring--3 ${playing ? "bvp-pulse-ring--active" : ""}`} />

      <div className="bvp-frame">
        {/* Scanline overlay */}
        <div className="bvp-scanline" />

        {/* Corner brackets */}
        <div className="bvp-corner bvp-corner--tl" />
        <div className="bvp-corner bvp-corner--tr" />
        <div className="bvp-corner bvp-corner--bl" />
        <div className="bvp-corner bvp-corner--br" />

        {/* Status label */}
        <div className="bvp-label">
          <span className={`bvp-label-dot ${playing ? "bvp-label-dot--live" : ""}`} />
          <span>{playing ? "LIVE.STREAM" : "INTRO.STREAM"}</span>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          className="bvp-video"
          onCanPlay={() => setLoaded(true)}
          onEnded={() => setPlaying(false)}
        />

        {/* Loading shimmer */}
        {!loaded && <div className="bvp-loading">LOADING.VIDEO...</div>}

        {/* Play overlay (only when paused) */}
        {!playing && loaded && (
          <button className="bvp-play-btn" onClick={togglePlay} aria-label="Play video">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {/* Controls bar */}
        {loaded && (
          <div className="bvp-controls">
            <button
              className="bvp-ctrl-btn"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="bvp-progress-track">
              <div
                className="bvp-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              className="bvp-ctrl-btn"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      <BvpStyles />
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

function BvpStyles() {
  return (
    <style jsx>{`
      /* ── Root ── */
      .bvp-root {
        position: relative;
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
      }

      /* ── Pulse rings ── */
      .bvp-pulse-ring {
        position: absolute;
        inset: -8px;
        border-radius: 16px;
        border: 1px solid rgba(0, 245, 255, 0.15);
        pointer-events: none;
        transition: opacity 0.4s;
        animation: bvp-idle-pulse 4s ease-in-out infinite;
      }
      .bvp-pulse-ring--1 { animation-delay: 0s; }
      .bvp-pulse-ring--2 { inset: -16px; animation-delay: 0.6s; opacity: 0.6; }
      .bvp-pulse-ring--3 { inset: -24px; animation-delay: 1.2s; opacity: 0.3; }

      .bvp-pulse-ring--active {
        animation: bvp-active-pulse 2s ease-in-out infinite;
      }
      .bvp-pulse-ring--active.bvp-pulse-ring--2 { animation-delay: 0.3s; }
      .bvp-pulse-ring--active.bvp-pulse-ring--3 { animation-delay: 0.6s; }

      @keyframes bvp-idle-pulse {
        0%, 100% { opacity: 0.15; }
        50% { opacity: 0.4; }
      }
      @keyframes bvp-active-pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.01); }
      }

      /* ── Frame ── */
      .bvp-frame {
        position: relative;
        border-radius: 12px;
        border: 1px solid var(--neon);
        overflow: hidden;
        background: var(--bg2);
        box-shadow:
          0 0 30px rgba(0, 245, 255, 0.15),
          0 0 60px rgba(0, 245, 255, 0.05),
          inset 0 0 20px rgba(0, 245, 255, 0.03);
      }

      /* ── Scanline ── */
      .bvp-scanline {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.03) 2px,
          rgba(0, 0, 0, 0.03) 4px
        );
        pointer-events: none;
        z-index: 3;
      }

      /* ── Corner brackets ── */
      .bvp-corner {
        position: absolute;
        width: 16px;
        height: 16px;
        z-index: 4;
      }
      .bvp-corner--tl {
        top: 8px; left: 8px;
        border-top: 2px solid var(--neon);
        border-left: 2px solid var(--neon);
      }
      .bvp-corner--tr {
        top: 8px; right: 8px;
        border-top: 2px solid var(--neon);
        border-right: 2px solid var(--neon);
      }
      .bvp-corner--bl {
        bottom: 38px; left: 8px;
        border-bottom: 2px solid var(--neon);
        border-left: 2px solid var(--neon);
      }
      .bvp-corner--br {
        bottom: 38px; right: 8px;
        border-bottom: 2px solid var(--neon);
        border-right: 2px solid var(--neon);
      }

      /* ── Label ── */
      .bvp-label {
        position: absolute;
        top: 10px;
        right: 32px;
        display: flex;
        align-items: center;
        gap: 5px;
        font-family: "Share Tech Mono", monospace;
        font-size: 0.6rem;
        letter-spacing: 0.12em;
        color: var(--neon);
        z-index: 5;
        opacity: 0.8;
      }
      .bvp-label-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--neon);
        opacity: 0.5;
      }
      .bvp-label-dot--live {
        opacity: 1;
        animation: bvp-blink 1s ease-in-out infinite;
        box-shadow: 0 0 6px var(--neon);
      }
      @keyframes bvp-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
      }

      /* ── Video ── */
      .bvp-video {
        width: 100%;
        display: block;
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }
      .bvp-iframe {
        width: 100%;
        aspect-ratio: 16 / 9;
        display: block;
        border: none;
      }
      .bvp-loom-wrapper {
        width: 100%;
      }

      /* ── Loading ── */
      .bvp-loading {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Share Tech Mono", monospace;
        font-size: 0.7rem;
        letter-spacing: 0.15em;
        color: var(--neon);
        background: var(--bg2);
        opacity: 0.7;
        z-index: 6;
        animation: bvp-blink 1.5s ease-in-out infinite;
      }

      /* ── Play overlay ── */
      .bvp-play-btn {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        border: none;
        cursor: pointer;
        color: var(--neon);
        z-index: 7;
        transition: background 0.2s;
      }
      .bvp-play-btn:hover {
        background: rgba(0, 0, 0, 0.55);
      }
      .bvp-play-btn svg {
        filter: drop-shadow(0 0 8px var(--neon));
      }

      /* ── Controls ── */
      .bvp-controls {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 34px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 0.75rem;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(4px);
        z-index: 8;
      }
      .bvp-ctrl-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--neon);
        display: flex;
        align-items: center;
        padding: 2px;
        flex-shrink: 0;
        transition: opacity 0.15s;
      }
      .bvp-ctrl-btn:hover { opacity: 0.7; }

      .bvp-progress-track {
        flex: 1;
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
      }
      .bvp-progress-fill {
        height: 100%;
        background: var(--neon);
        border-radius: 2px;
        transition: width 0.1s linear;
        box-shadow: 0 0 6px var(--neon);
      }

      /* ── Mobile ── */
      @media (max-width: 768px) {
        .bvp-root { max-width: 100%; }
      }
    `}</style>
  );
}
