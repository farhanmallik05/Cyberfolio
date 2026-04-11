# SEED-023: Visitor Location Lookup (Admin Dashboard feature)

### Context
- **Target Phase**: Phase 20 (Admin Dashboard)
- **Goal**: Provide geographic context for leads and tool usage without invasive tracking.

### Implementation
- **Feature**: When a contact form is submitted or a payment is made, capture the `IP` (if not opted out) and run a secure edge lookup.
- **Service**: Use `Vercel` request headers (`x-vercel-ip-country`, `x-vercel-ip-city`) or an external GeoIP API.
- **Storage**: Store the city/country in the `leads` table.

### Technical Notes
- Respect GDPR. Only store the location if the visitor accepts "Functional Cookies".
- Use the location data to automatically set the "Suggested Contact Time" in the admin panel based on the visitor's local timezone vs IST.
