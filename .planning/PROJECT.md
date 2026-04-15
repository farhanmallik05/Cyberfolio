# Neural Architect — Portfolio

## Identity
- **Name**: Farhan Mallik
- **Title**: AI Engineer & Fullstack Builder
- **Brand**: Neural Architect (Cyberpunk/Mechanical aesthetic)
- **Tagline**: "Engineering the future, one neural system at a time"
- **Hero Tagline (Live)**: "Engineering the future, one neural system at a time"

## Bio
Computer Science Engineer and Neural Architect specializing in the intersection of Artificial Intelligence and immersive UI systems. I craft high-fidelity digital experiences using wave-based cinematic orchestration (GSAP) and autonomous agent frameworks. Currently pursuing B.Tech at KCC Institute of Technology (2024–2028). Consistent open-source contributor. Hackathon finalist (12+ events). Freelance web development and automation services.

## Stats (Live in `src/data/stats.ts`)
- **Projects**: 10+
- **Years of Experience**: 2+
- **Hackathons**: 12+

## Tech Stack (from `package.json` + actual codebase)
- **Framework**: Next.js 16.1.6 (App Router + Turbopack)
- **UI Layer**: React 19.2.4, TypeScript 5, Tailwind CSS 3, Framer Motion 12
- **3D/Animation**: Three.js 0.183 (@react-three/fiber 9), GSAP 3.14.2 (ScrollTrigger Orchestration)
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions — Project: snyvarunuobcpfadkpmc)
- **Typography**: Orbitron (Headings, loaded via Next Font), Inter (Body), Share Tech Mono (Labels)
- **Icons**: Lucide React 0.575 (Centralized Registry: `src/lib/icons.ts`)
- **Deployment**: Netlify (Static + Edge Functions)

## Themes (Live in `src/data/themes.ts`)
Six switchable themes: **CYBER** (default), **ARCTIC**, **INFERNO**, **GHOST**, **BIO**, **VOID**.
Managed via `ThemeContext` + `ThemeHUD` component. Theme persisted in `localStorage`.

## Services (from `src/data/services.ts`)
| Service | Starting Price |
|---------|---------------|
| Web Development | ₹6,999 |
| Automation | ₹3,999 |
| UI/UX Design | ₹2,999 |
| AI Integration | ₹9,999 |

## Social Links
- **GitHub**: https://github.com/farhanmallik05
- **LinkedIn**: https://linkedin.com/in/farhanmallik
- **Twitter**: https://twitter.com/farhanmallik
- **Email**: mallikfarhan10@gmail.com

## Design System Lock
- **Base Environment**: #070C1A (Deep Space Black — `--bg`)
- **Primary Interface**: #00F5FF (Mech Cyan — `--neon`)
- **Secondary Pulse**: #BF5FFF (Neural Purple — `--neon2`)
- **Panel Matrix**: rgba(13, 20, 37, 0.85) with `backdrop-filter: blur(20px)`
- **Aesthetic**: Cyber-mechanical — scan lines, blueprint grids, neon glows, glassmorphism

## Content Ledger (`src/data/`)
| File | Purpose |
|------|---------|
| `stats.ts` | Hero stats strip (projects, years, hackathons) |
| `availability.ts` | Live availability status badge |
| `services.ts` | Service cards and pricing |
| `testimonials.ts` | Marquee testimonial data |
| `themes.ts` | Theme palette definitions |
| `skills.ts` / `skills.json` | Skill constellation data |
| `about.json` | Bio, timeline, education, experience |
| `certificates.json` | Certificate flip-card wall data |
| `now.json` | Now page content |
| `uses.json` | Uses/Stack page content |

## Milestone Status
- M0–M2: ✅ Complete
- **M3 (Cinematic Core)**: ⏳ In Progress — Phase 11 Done, Phase 12 next
- M4–M6: 📋 Planned
