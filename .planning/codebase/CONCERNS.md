# System Concerns & Risks

Monitoring potential bottlenecks and architectural friction.

## Data Density (High Level)
- **Skills Module**: Now rendering 70+ skills in a single view. While performant under static generation, visual hierarchy may require future pagination or filter categories to maintain scannability.
- **Certificate Ledger**: Scaling past 30 certificates may impact the "wall" layout readability.

## Architectural Friction
- **Git Blockade**: Local `MechRedesign` branch currently holds substantial uncommitted data-sync and hardening work. This must be resolved through a combined commit strategy before further multi-branch GSD workflows can proceed safely.

## Visual Performance
- **CSS Module Migration**: Ongoing effort to move remaining background effects out of global and inline styles. 100% completion is necessary for perfect lighthouse scores and dev-exp.

## Planned Improvements
- **Pagination / Virtualization**: Required if the Certificate or Projects ledger grows significantly.
- **Supabase Integration**: Transitioning from static JSON to a Supabase-managed Content API for easier remote updates.
