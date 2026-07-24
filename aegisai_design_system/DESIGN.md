---
name: AegisAI Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#00505f'
  on-tertiary: '#ffffff'
  tertiary-container: '#006a7c'
  on-tertiary-container: '#93e8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 57px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style
The design system is built on a foundation of **Empathetic Futurism**. For a women's safety application, the interface must project absolute reliability and "Aegis" (protection) while remaining approachable and modern. 

The aesthetic merges the structured logic of **Material 3** with the ethereal, calming qualities of **Glassmorphism**. By using translucent layers and soft background blurs, the UI feels lightweight and non-threatening. The emotional response should be one of "calm confidence"—a high-tech guardian that is always present but never intrusive. 

**Key Principles:**
- **Clarity over Complexity:** High-stakes environments require zero friction.
- **Luminous Depth:** Use of mesh gradients and glass effects to signify a "living" intelligence.
- **Protective Geometry:** Soft, oversized radii to communicate safety and accessibility.

## Colors
The palette utilizes high-chroma indigos and purples to signify premium technology, while the cyan accent provides a "pulse" of active monitoring.

- **Primary (Indigo):** The core brand color, used for primary actions and brand presence.
- **Secondary (Purple):** Used for auxiliary features and depth-building gradients.
- **Tertiary (Cyan):** Reserved for "Active" states, AI indicators, and safety-critical status updates.
- **Backgrounds:** Light mode uses a base of `#FFFFFF` with `#F8FAFC` surfaces. Dark mode shifts to a deep Navy-Gray (`#0F172A`) to maintain readability in low-light emergency situations.
- **Mesh Gradients:** Subtle blends of Primary and Secondary colors (at 5-10% opacity) should be used in the background to create a sense of depth and movement.

## Typography
This design system employs **Inter** for its exceptional legibility and neutral, systematic character. 

- **Scale:** Following the Material 3 type scale, we prioritize clear hierarchy. Large display type is reserved for status summaries.
- **Readability:** Body text uses a standard 16px base to ensure ease of reading under stress. 
- **Icons:** Use **Material Symbols Rounded**. The rounded corner style of the icons mirrors the 24px+ radius of the UI containers, creating a cohesive visual language.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous white space to reduce cognitive load.

- **Grid:** A 12-column grid for desktop, a 6-column grid for tablet, and a 4-column grid for mobile.
- **Rhythm:** Spacing follows an 8px baseline. Use `lg` (24px) for most internal padding to create an airy, premium feel.
- **Safe Areas:** Ensure all critical actions (like "SOS" buttons) are within the natural thumb-reach zone on mobile devices (bottom 1/3 of the screen).

## Elevation & Depth
Elevation is achieved through a combination of **Ambient Shadows** and **Glassmorphism**.

1.  **Surfaces:** Use "Glass" containers for non-critical information. These feature a `backdrop-filter: blur(12px)` and a `1px` semi-transparent border (`rgba(255, 255, 255, 0.2)`).
2.  **Shadows:** Shadows are highly diffused and tinted with the primary indigo color. 
    - *Level 1 (Cards):* `0px 4px 20px rgba(79, 70, 229, 0.08)`
    - *Level 2 (Modals/Overlays):* `0px 12px 40px rgba(79, 70, 229, 0.15)`
3.  **Tonal Layers:** In dark mode, elevation is also communicated via surface color lightening—higher elevation surfaces are slightly lighter navy than the background.

## Shapes
The shape language is characterized by **extreme roundedness**. 

- **Containers:** All primary cards and containers use a minimum of `24px` radius. 
- **Buttons:** Use fully "Pill-shaped" buttons for a modern, friendly feel.
- **Inputs:** Input fields should use a `12px` or `16px` radius to maintain a distinct but complementary look to the larger card containers.
- **Interaction:** On hover/active states, shapes can subtly expand or increase their shadow spread to provide tactile feedback.

## Components
- **Buttons:** 
    - *Primary:* Pill-shaped, solid Indigo fill, white text. High elevation on hover.
    - *SOS:* Large, circular floating action button (FAB) with a Danger red-to-orange gradient and a pulsing Cyan outer glow.
- **Cards:** 
    - Features a 24px corner radius.
    - Uses glassmorphism (`blur: 16px`) when placed over background mesh gradients. 
- **Inputs:**
    - Understated background (`#F1F5F9`). 
    - On focus, the border transitions to Primary Indigo with a soft outer glow.
- **Chips/Badges:**
    - Used for status indicators (e.g., "Safe", "Monitoring"). 
    - Soft, semi-transparent fills with high-contrast text.
- **Lists:**
    - Items are separated by generous 16px gaps rather than dividers to maintain the "airy" feel. Each list item is essentially a low-elevation card.
- **AI Feedback:** 
    - A specific "Aegis Pulse" component—a glowing Cyan orb or line—indicates when the AI is processing or listening.