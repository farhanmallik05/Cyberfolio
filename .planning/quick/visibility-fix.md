# Quick Task: Fix Home Tab Name Visibility

The user reported that "Farhan Mallik" is not visible properly in the home tab. This is likely due to low contrast against the dynamic `AICore` background or lack of visual emphasis.

## Proposed Changes

### [MODIFY] [HeroSection.module.css](file:///d:/Antigravity/Projects/Portfolio/src/components/home/HeroSection.module.css)
- Increase text contrast by adding a subtle glow/shadow.
- Slightly reduce background opacity to ensure foreground clarity.
- Ensure the title font weight and visibility are maximized.

## Execution Steps
1. Add `text-shadow` to `.title` in `HeroSection.module.css`.
2. Reduce `.background` opacity from `0.6` to `0.4` or `0.3`.
3. Add a background blur or semi-transparent overlay if needed (optional).

## Verification Plan
- Manual verification of the code changes.
- Browser check (if requested/possible) to see the visual result.
