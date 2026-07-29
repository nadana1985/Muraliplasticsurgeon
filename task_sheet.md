# Step-by-Step AI & UI Revamp Task Sheet (Unified)
## Dr. Murali K – Clinic Portal Revamp

This document provides a consolidated, chronological checklist to implement the clinical AI features and modern premium UI patterns on the Dr. Murali website.

---

### Phase 1: High-Impact Trust & Conversions

#### Task 1.1: Bento Testimonials Grid
- [ ] Update `Testimonials.tsx` to handle extended data model props (`procedure`, `verified`, `date`, `avatar`).
- [ ] Code an asymmetrical bento grid layout (1 large card + 5 smaller cards).
- [ ] Integrate Embla Carousel for smooth touch-dragging momentum support.
- [ ] Add Google rating count badges and verified shields.

#### Task 1.2: Before/After Slider & Gallery
- [ ] Install image comparison comparison library:
  ```bash
  npm install react-compare-image photoswipe react-photoswipe-gallery
  ```
- [ ] Update `ClinicGallery.tsx` to include `react-compare-image` slider next to the gallery.
- [ ] Refactor grid layout to use CSS grid masonry styles.
- [ ] Bind PhotoSwipe lightbox wrapper to photos with pinch-to-zoom support.
- [ ] Code category filter chips (All, Reception, Rooms, Equipment).

#### Task 1.3: Infinite Trust Marquee
- [ ] Replace placeholder images in `TrustBar.tsx` with authentic certification logos (APSI, board seals).
- [ ] Style logo container with infinite horizontal scrolling CSS animation.
- [ ] Apply grayscale-to-color transition and informational tooltip overlay on logo hover.

#### Task 1.4: Unified Conversational Triage Form
- [ ] Install React hook form and zod validator libraries:
  ```bash
  npm install react-hook-form @hookform/resolvers zod react-day-picker date-fns
  ```
- [ ] Rebuild `ContactForm.tsx` into a 4-step wizard.
- [ ] Step 1: Capture concern areas using selectable chips (Gynecomastia, Liposuction, Rhinoplasty, etc.).
- [ ] Dynamic Triage Branching: If Gynecomastia or Liposuction is selected, display specific triage checkboxes (glandular disk feel, symptoms duration, stable weight).
- [ ] Step 2: Integrate calendar date picker (`react-day-picker`) for appointment dates.
- [ ] Step 3: Capture Name, Phone (prefixed for India +91), and Email.
- [ ] Step 4: Display Call and WhatsApp quick action CTAs with prefilled report text parameters.
- [ ] Hook up real-time inline validation using React Hook Form resolver with Zod.

#### Task 1.5: Lead Webhook & WhatsApp Redirection
- [ ] Create Next.js API route `src/app/api/contact/route.ts` to parse lead payloads and dispatch webhook.
- [ ] Setup `WHATSAPP_WEBHOOK_URL` in env variables:
  ```env
  WHATSAPP_WEBHOOK_URL=your_webhook_url_here
  ```
- [ ] On successful submission, trigger client-side redirect:
  ```typescript
  window.open(`https://wa.me/918072582121?text=${encodeURIComponent(formattedTriageText)}`, "_blank");
  ```

---

### Phase 2: Premium Visual Polish & Navigation

#### Task 2.1: Floating Pill Navigation
- [ ] Update `Navigation.tsx` with listener checking scroll positions.
- [ ] On scroll > 80px, animate full header into a glassmorphic floating pill (`backdrop-filter: blur(12px) shadow-lg rounded-full`).
- [ ] Integrate Framer Motion `layoutId` for sliding active link indicators.
- [ ] Build iOS-style right-side mobile drawer panel overlay.
- [ ] Add pulsing CTA glow styles to Book Appointment button.
- [ ] Integrate Search modal trigger button directly in the pill nav.

#### Task 2.2: Rotating Hero Section
- [ ] Rebuild `Hero.tsx` into split layout: 60% text content / 40% visual video block.
- [ ] Code text-rotation keywords (e.g. Sculpting Dreams -> Restoring confidence) using Framer Motion.
- [ ] Apply backdrop filters and shimmer effects on booking CTAs.
- [ ] Include animated bouncing scroll chevron indicator at bottom.

#### Task 2.3: Doctor Profile Timeline
- [ ] Incorporate professional Doctor photo and play trigger button for 60-second clinic tour video in `AboutDoctor.tsx`.
- [ ] Create connected dot timeline layout displaying educational milestones.
- [ ] Display flag emojis alongside languages (English 🇬🇧, Tamil 🇮🇳, Hindi 🇮🇳).

#### Task 2.4: Magazine Blog Preview
- [ ] Rebuild `BlogPreview.tsx` to feature 1 large prominent article card and 3 secondary cards.
- [ ] Show reading times, author profiles, and hover zoom scales.
- [ ] Integrate inline category filter chips.

---

### Phase 3: Micro-Interactions, Design Tokens, & Base Elements

#### Task 3.1: Design Token Extensions
- [ ] Update `design-tokens.ts` (or Tailwind config) to export:
  - Gold accent highlight hex (`#D4AF37`)
  - Glow card shadows (`0 0 40px rgba(62,113,178,0.15)`)
  - Custom scrollbar configuration rules.

#### Task 3.2: Reusable Floating Input
- [ ] Update `Input.tsx` to animate input labels floating upwards when field is focused or contains values.

#### Task 3.3: Glassmorphism Service Showcase
- [ ] Update card elements in `ServicesShowcase.tsx` with backdrop filter variables.
- [ ] Program mouse hover event tracking custom CSS properties `--x` and `--y` to render radial glow border highlights.

#### Task 3.4: Framer Motion Animation Wrapper
- [ ] Install Framer Motion:
  ```bash
  npm install framer-motion
  ```
- [ ] Refactor `AnimatedSection.tsx` to use Framer Motion `motion.div` with spring physics and staggered children transitions.

---

### Phase 4: AI Copilot & Semantic Search

#### Task 4.1: Create Chat Endpoint
- [ ] Create Next.js API Route: `src/app/api/chat/route.ts`.
- [ ] Import `doctorInfo`, `clinicAddress`, and `allServices` from `src/data/content.ts` (production source of truth).
- [ ] Ground Llama 3.1 8B prompt using Groq API completions endpoint.
- [ ] Enforce greedy decoding parameters (`temperature: 0.0` and `top_p: 0.1`).

#### Task 4.2: Implement Medical AI Prompt tests
- [ ] Setup Jest testing config:
  ```bash
  npm install -D jest @types/jest ts-jest
  ```
- [ ] Code tests in `src/app/api/chat/__tests__/chat.test.ts` to assert guardrails:
  - Verify off-topic recipe queries return standard redirection message.
  - Verify self-prescribing drug queries redirect to clinical phone/emergency lines.
  - Verify lipo/gynecomastia pricing requests return general consultation prompt.
  - Verify circumcision discount requests refer properly to the ₹20,000 package.
- [ ] Run test runner:
  ```bash
  npm run test
  ```

#### Task 4.3: Chatbot Floating Widget UI
- [ ] Create floating chatbot UI widget `src/components/ui/ChatBot.tsx` styled with clinic brand colors (`#3e71b2`).
- [ ] Integrate screen reader aria-live attributes and retry connection button handlers.
- [ ] Map medical disclaimers in the chat scroll container.
- [ ] Automatically links users to recovery/post-op blogs containing `DoDontGrid` or `MythFactCard` when asked.
- [ ] Mount `<ChatBot />` inside body in `src/app/layout.tsx`.

#### Task 4.4: RAG Semantic Search & Analytics
- [ ] Create Next.js search Route Handler `/api/search/route.ts` matching queries to `src/data/content.ts`.
- [ ] Program analytics logging events (`Chat_Opened`, `Quiz_Completed`, `WhatsApp_Click_Redirect`).
