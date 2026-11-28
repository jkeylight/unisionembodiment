# UNISON EMBODIMENT — Design & Build Specification

**Project:** UNISON EMBODIMENT  
**Design concept:** THE ART OF WHOLENESS  
**Visual direction:** White editorial / botanical minimalism / quiet cinematic movement  
**Status:** Approved build direction

## 1. Design intent

Rebuild the existing multi-page website as a distinctive, international-quality digital experience. Preserve the existing practice information, page structure, enquiry pathways, legal content, SEO metadata and accessibility. Do not turn the site into a generic wellness template.

The experience should feel calm, human, precise, tactile and quietly premium. White space and typography lead; photography provides emotional depth; motion is deliberate and never ornamental for its own sake.

## 2. Colour system

- **Paper / primary background:** #FFFFFF
- **Warm surface:** #F8F6F2
- **Primary text:** #171614
- **Secondary text:** #68635F
- **Antique gold / primary accent:** #B79A62
- **Soft gold line:** #D9C9A7
- **Muted lavender:** #B8A9C9
- **Dusty rose:** #D8AEB7
- **Pale lavender surface:** #F3EFF6
- **Pale rose surface:** #F8F0F1

Gold is a fine accent, not a large colour field. Purple and pink appear as restrained supporting tones in details, backgrounds and photography. Avoid saffron, saturated purple, bright pink, heavy gradients and dark full-page sections.

## 3. Typography

- Editorial display: Cormorant Garamond (light / regular / italic).
- Interface and body: Inter (light / regular / medium).
- Large headlines use measured line breaks and generous leading.
- Body copy remains readable, plain-language and comfortably sized.
- Use small uppercase labels with tracking for section markers.
- Keep text contrast accessible; never use pale gold for long-form text.

## 4. Signature lotus identity and animation

Create a refined, original lotus mark using inline SVG paths. The mark should be botanical and elegant rather than religious or decorative. Use fine antique-gold strokes on white.

Opening sequence:
1. White canvas appears.
2. Central lotus outline draws in using SVG stroke animation.
3. Petal groups unfold in a slow, balanced sequence.
4. A subtle soft-gold glow resolves briefly around the flower.
5. UNISON EMBODIMENT wordmark appears.
6. The intro exits cleanly into the homepage.

The animation must be short, skippable, non-blocking and shown at most once per browser session where practical. Respect prefers-reduced-motion and never prevent access to page content if JavaScript or GSAP fails. Do not use particles.

## 5. Site architecture and content

Retain and redesign the current pages and navigation:
- Home
- Approach
- Sessions
- Founder
- Notebook / Journal
- Case Studies
- Enquire
- Privacy
- Disclaimer
- Terms
- Consent / Scope

Preserve existing copy and factual claims unless a clear design/layout adjustment requires only moving or grouping content. Do not invent testimonials, credentials, client outcomes, session prices or guarantees. Keep the complementary-practice / non-medical scope clear.

## 6. Homepage composition

1. Minimal header with animated lotus wordmark, clear navigation and enquiry action.
2. Hero with strong editorial headline, concise introduction and one clear primary CTA. Pair with cinematic, naturally lit imagery.
3. Philosophy / approach statement with large type and generous white space.
4. Five dimensions presented as an editorial sequence, not generic cards.
5. Recognition / process section with restrained numbering and fine gold rules.
6. Image-led horizontal gallery on desktop; accessible stacked/swipe-friendly layout on mobile.
7. Founder introduction with portrait and link to full profile.
8. Enquiry close with a clear, welcoming invitation.
9. Footer with existing contact, social and legal links.

## 7. Photography direction

Use calm, high-quality, natural-light editorial photography:
- white linen, translucent fabric, soft window light and subtle shadows
- botanical details and lotus imagery used sparingly
- human presence shown respectfully and naturally
- restrained blush and lavender tones in selected images
- tactile surfaces, quiet interiors and thoughtful compositions

Avoid stock-looking yoga poses, temple imagery, religious symbols, chakra graphics, astrology motifs, hands with glowing energy, excessive flowers, staged wellness clichés and overly airbrushed portraits. Existing site imagery should be audited before replacement; do not break image paths.

## 8. Motion and interaction

- GSAP 3.12.5 for intentional entrance and scroll sequences.
- Lenis for smooth scrolling, with native-scroll fallback.
- Barba-style transitions only where compatible with all existing pages, forms, links and browser history.
- Image reveal masks, restrained parallax, staggered text reveals and fine-line drawing.
- No excessive cursor gimmicks; disable custom cursor on touch devices.
- Keep motion performant and avoid layout shifts.
- Respect reduced-motion preferences across all effects.

## 9. Responsive and accessibility requirements

Mobile is a first-class design target, not a reduced desktop layout.
- Fully functional navigation and forms on mobile.
- No horizontal overflow.
- Touch targets at least 44px where practical.
- Responsive typography with readable line lengths.
- Images use appropriate sizing and loading behaviour.
- Semantic landmarks, keyboard focus, skip link, descriptive alt text and visible focus states.
- Reduced-motion support and progressive enhancement.
- Maintain contrast for all text and controls.

## 10. Technical constraints

- Preserve the current static multi-page architecture unless repository inspection proves otherwise.
- Keep existing URL paths and internal links stable.
- Reuse existing GSAP, ScrollTrigger, Lenis and Barba dependencies already loaded by the site; do not add a framework without need.
- Keep CSS organised with shared tokens and component-level sections.
- Avoid unnecessary dependencies and heavy assets.
- Maintain canonical URLs, Open Graph metadata, structured data and page titles/descriptions.
- Validate every page, image path, navigation item, CTA and enquiry form before release.

## 11. Build acceptance criteria

- A complete, coherent redesign across all existing pages.
- White background, black typography, restrained antique gold with subtle lavender and dusty-rose accents.
- Signature animated lotus intro and refined lotus brand mark.
- High-quality image direction with no broken assets.
- GSAP motion, smooth scrolling and page transitions that do not break navigation.
- Fully responsive desktop, tablet and mobile experience.
- Accessibility and reduced-motion fallback.
- Existing content, contact details, legal pages and SEO essentials retained.
- No placeholder labels, unfinished sections, console errors or misleading claims.
