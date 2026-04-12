# SEED-018: Public API (/api/*)

## Concept
Public JSON endpoints exposing portfolio data. Developer-focused easter egg that shows technical depth. Other developers can integrate your availability or stats.

## Target Milestone: M5 (Phase 20)
## Trigger: Built inside Phase 20 (Admin Dashboard)

## Endpoints

### GET /api/available
```json
{
  "available": true,
  "message": "Open to freelance projects",
  "nextDate": "May 1, 2026",
  "responseTime": "Within 24 hours",
  "updatedAt": "2026-04-01"
}
```

### GET /api/stats
```json
{
  "projects": 10,
  "blogPosts": 14,
  "toolsBuilt": 3,
  "yearsBuilding": 2,
  "updatedAt": "2026-04-01"
}
```

### GET /api/now
```json
{
  "building": ["Neural Architect portfolio"],
  "learning": ["GSAP ScrollTrigger", "RAG systems"],
  "reading": "Deep Work — Cal Newport",
  "location": "Greater Noida, India (IST)",
  "updatedAt": "2026-04-01"
}
```

## Theme Notes
API responses are JSON only — no UI. Document the API at /uses or in README. Add link in footer: "Public API →". Attracts developer curiosity.
