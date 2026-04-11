# SEED-015: Password Protected Pages

## Concept
Sensitive client work in case studies and select premium store content hidden behind a password. Share only with serious prospects. Shows professionalism and client discretion.

## Target Milestone: M4 (Phase 17)
## Trigger: When first client case study exists

## Implementation
- Next.js middleware for /projects/[slug] with `protected: true` in data
- Password stored in Supabase (hashed)
- Session cookie set on correct password entry
- Custom password page matching site aesthetic
- Admin can set/change password per page

## Theme Notes
Password page uses existing glass panel style. Input uses existing .form-input styling. Error state uses dim red glow (not --neon2).
