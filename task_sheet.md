# Step-by-Step AI Integration Task Sheet (Revised - Groq API)
## Dr. Murali K – Clinic Portal Revamp (2025-2026)

This document provides a revised, granular checklist to implement the clinical AI features using the **Groq API Cloud** (running Llama 3.1 8B).

---

### Wave 1: Foundation & API Groundwork

#### Task 1.1: Dependency Installation
- [ ] Install testing assertions library for AI validation tests:
  ```bash
  npm install -D jest @types/jest
  ```

#### Task 1.2: Environment Configurations
- [ ] Add the following configuration keys to `.env.local`:
  ```env
  GROQ_API_KEY=your_groq_api_key_here
  WHATSAPP_WEBHOOK_URL=your_whatsapp_webhook_url_here
  ```

---

### Wave 2: Factual API Route (Zero-Hallucination Chat via Groq)

#### Task 2.1: Create Chat Endpoint
- [ ] Create Next.js API Route: `src/app/api/chat/route.ts`.
- [ ] Import `doctorInfo`, `clinicAddress`, and `allServices` from `src/data/content.ts` (established as the production source of truth).
- [ ] Build the prompt grounding instruction using standard **Llama 3.1 8B** definitions.
- [ ] Formulate a fetch request to `https://api.groq.com/openai/v1/chat/completions`.
- [ ] Force greedy decoding (`temperature: 0.0` and `top_p: 0.1`).

#### Task 2.2: Implement Medical AI Test Suite
- [ ] Create test suite file: `src/app/api/chat/__tests__/chat.test.ts`.
- [ ] Code prompt guardrail unit tests:
  *   Verify off-topic prompts (biryani recipes, coding instructions) trigger redirection.
  *   Verify diagnostic prompts (self-prescribing amoxicillin) trigger emergency/phone consult redirects.
- [ ] Code integration tests for pricing:
  *   Verify requests for liposuction/gynaecomastia prices trigger the "pricing varies" consult prompt.
  *   Verify requests for circumcision discounts successfully refer to the ₹20,000 package.
- [ ] Run test runner:
  ```bash
  npm run test
  ```

---

### Wave 3: Chatbot Floating Widget UI

#### Task 3.1: Create ChatBot Component
- [ ] Create UI component: `src/components/ui/ChatBot.tsx`.
- [ ] Build floating bubble button fixed to the bottom-right viewport.
- [ ] Build chat viewport panel styled with clinic brand colors (`#3e71b2`).
- [ ] Integrate explicit medical disclaimers in the chat scroll box.
- [ ] Reference recent visual features: if users ask about post-op recovery, automatically render links to the relevant blog post to display the corresponding `DoDontGrid` or `MythFactCard`.

#### Task 3.2: Integrate ChatBot into Root Layout
- [ ] Add `<ChatBot />` to the body inside `src/app/layout.tsx`.

---

### Wave 4: Interactive AI Triage & Suitability Quiz

#### Task 4.1: Create Suitability Quiz Component
- [ ] Create component: `src/components/sections/SuitabilityQuiz.tsx`.
- [ ] Code multi-step screening questionnaire with the following branches:
  *   **Gynecomastia**: Collect duration of swelling, presence of disk behind nipple (suitability indicator), and weight gain profile.
  *   **Liposuction**: Collect stable weight indicators (BMI < 30) and skin elasticity response.
- [ ] Style visual progress indicators.

#### Task 4.2: Triage API & WhatsApp Redirection
- [ ] Create API Route: `src/app/api/triage/route.ts`.
- [ ] Send parameters to Llama 3.1 8B via Groq to yield a candidacy recommendation.
- [ ] Post structured message details to `WHATSAPP_WEBHOOK_URL` containing patient name, concern, answers, and clinical advice.
- [ ] On submit success, trigger client-side redirect:
  ```typescript
  window.open(`https://wa.me/918072582121?text=${formattedAssessmentText}`, "_blank");
  ```

---

### Wave 5: RAG Semantic Search & ROI Tracking

#### Task 5.1: Indexing & Search API
- [ ] Create Route Handler: `src/app/api/search/route.ts`.
- [ ] Code keyword/semantic parser matching user queries to `src/data/content.ts` (blogs/services).
- [ ] Hook up search input overlay inside `Navigation.tsx`.

#### Task 5.2: Analytics Integration
- [ ] Create utility helper for analytics event dispatch.
- [ ] Bind events `Chat_Opened`, `Quiz_Completed`, and `WhatsApp_Redirect` to dispatch standard log requests.
