# Blog Component Specification

This specification documents the current structure, routing, components, styling tokens, and content guidelines of the Blog system in the repository.

---

## Route & File Structure

The blog section is built using Next.js App Router. The files and routes are organized as follows:

| Path | File Type | Purpose |
| :--- | :--- | :--- |
| [/blog](file:///f:/Murali%20Website/src/app/blog/page.tsx) | Page Component | Main blog archive/index page displaying all posts. |
| [/blog/\[slug\]](file:///f:/Murali%20Website/src/app/blog/%5Bslug%5D/page.tsx) | Page Component (Dynamic) | Individual blog post page loaded dynamically via its slug. |
| [content.ts](file:///f:/Murali%20Website/src/data/content.ts) | Data Source | Stores the hardcoded blog post data list (`blogPosts`) and query functions. |
| [BlogContentRenderer.tsx](file:///f:/Murali%20Website/src/components/blog/BlogContentRenderer.tsx) | Component | Core markdown parser and layout orchestrator for dynamic post content. |
| [KeyTakeaways.tsx](file:///f:/Murali%20Website/src/components/blog/KeyTakeaways.tsx) | Component | Highlights key summary points of a blog post. |
| [StickyCTA.tsx](file:///f:/Murali%20Website/src/components/blog/StickyCTA.tsx) | Component (Client) | Floating call/book action bar triggered on scroll. |
| [BlogPreview.tsx](file:///f:/Murali%20Website/src/components/sections/BlogPreview.tsx) | Component | A three-card grid displaying the latest blog posts (used on landing pages). |
| [DoDontGrid.tsx](file:///f:/Murali%20Website/src/components/ui/DoDontGrid.tsx) | UI Component | Two-column grid contrasting recovery recommendations ("Do's" vs. "Don'ts"). |
| [MythFactCard.tsx](file:///f:/Murali%20Website/src/components/ui/MythFactCard.tsx) | UI Component (Client) | Interactive card toggling myth statements with revealed clinical facts. |

---

## Global Layout Rules

Blog pages follow these layout structures:

### 1. Blog Archive Page Layout
*   **Hero Section**: Full-width gradient background (`bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700`) with a display header (`text-4xl sm:text-5xl font-bold font-display`).
*   **Content Section**: Wrapped in `.section-padding` and `.container-custom` classes, rendering a responsive grid of card links (`grid gap-8 sm:grid-cols-2 lg:grid-cols-3`).
*   **Bottom Section**: Full-width grey background section (`bg-gray-50`) hosting the `<NewsletterForm />` container.

### 2. Individual Blog Post Layout
*   **Post Page Wrapper**: Wrapped in standard `<main>` layout enclosing a gradient hero, a centered article, and a bottom sticky CTA.
*   **Hero Header**:
    *   Responsive vertical padding (`py-16 sm:py-20`).
    *   Primary gradient background (`bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800`).
    *   Decorative background image (`/images/hero.png` with `opacity-10`) overlay.
    *   Contains breadcrumb-like "Back to Blog" navigation button and category badge.
*   **Main Body Container**:
    *   Grey background wrapper `.bg-gray-50` with bottom padding `.pb-32`.
    *   Maximum width container `.max-w-4xl` centering the article.
    *   Main Card: A white background box `.bg-white` with `.rounded-3xl`, `.shadow-sm`, and responsive padding (`p-6 sm:p-8 lg:p-10`).
*   **Author Bio Box**:
    *   Located directly below the blog content inside the main white card.
    *   Uses a light grey gradient container `.bg-gradient-to-br.from-gray-50.to-gray-100` with `.rounded-2xl` and padding `p-6`.
*   **Post Navigation**:
    *   A grid of next/previous links below the main card: `.mt-8.grid.gap-4.sm:grid-cols-2`.
*   **Bottom CTA Banner**:
    *   Wide gradient card: `.rounded-3xl.bg-gradient-to-br.from-primary-600.to-primary-700.p-8.sm:p-10.shadow-xl.text-center.text-white`.

---

## Blog Component Spec

### 1. `BlogContentRenderer`
A utility-driven parser component that accepts raw markdown string content and converts it into structured React components.

*   **Location**: `src/components/blog/BlogContentRenderer.tsx`
*   **Props Interface**:
    ```typescript
    interface BlogContentRendererProps {
      content: string;
    }
    ```
*   **Layout & Responsive Behavior**:
    *   Standard wrapper is a vertical stack with `.space-y-6`.
    *   Headings (`h2`, `h3`), lists (`ul`/`li`), and paragraph elements inherit native margins and text sizes.
*   **Rendering Logic (Heuristics)**:
    1.  **Key Takeaways**: Scans lines starting with `- ` or `* ` under 100 characters. If any exist, it extracts up to 5 and renders `<KeyTakeaways />` right before the first `h2` heading.
    2.  **Do's & Don'ts**: Checks for substrings `"The Do's:"` and `"The Don'ts:"`. If both exist, it uses regex (`^\*?\*?(?:\w[\w\s]*:)\s*(.+)`) to extract matching list items and renders a `<DoDontGrid />` before the first `h2` heading (only if `KeyTakeaways` isn't rendered first).
    3.  **Myths & Facts**: Scans if the content contains `"myth"` and `"truth"` keywords. For list sections, it matches items containing `truth:` (case-insensitive) to build a list of `{ myth, fact }` objects and renders `<MythFactCard />`.
    4.  **Inline Formatting**: Splits strings by `**` tags to wrap bold phrases inside a `<strong className="font-semibold text-gray-900">` element.

---

### 2. `KeyTakeaways`
A callout container displaying a summary list of numbered key takeaways.

*   **Location**: `src/components/blog/KeyTakeaways.tsx`
*   **Props Interface**:
    ```typescript
    interface KeyTakeawaysProps {
      title?: string; // Defaults to "Key Takeaways"
      items: string[];
    }
    ```
*   **Layout & Styling**:
    *   **Container**: `.rounded-2xl.border.border-primary-100.bg-gradient-to-br.from-primary-50.to-white.p-6.shadow-sm`.
    *   **Icon Badge**: Light blue box `.flex.h-10.w-10.items-center.justify-center.rounded-xl.bg-primary-100` containing a 💡 emoji.
    *   **Header**: Title styled with `.font-display.text-lg.font-bold.text-primary-900`.
    *   **List Layout**: Spaced list `.space-y-3` using a numbered indicator circle `.flex.h-6.w-6.shrink-0.items-center.justify-center.rounded-full.bg-primary-500.text-xs.font-bold.text-white` alongside text styled with `.text-sm.text-gray-700.leading-relaxed`.

---

### 3. `StickyCTA`
A floating actions panel that appears in the bottom right corner of the screen after the user scrolls down, prompting direct client actions.

*   **Location**: `src/components/blog/StickyCTA.tsx`
*   **Props Interface**: None (Self-contained Client Component).
*   **Layout & Styling**:
    *   **Positioning**: Fixed bottom-right: `.fixed.bottom-6.right-6.z-50`.
    *   **Layout**: Column-direction stacked buttons that wrap into a row on larger viewports: `.flex.flex-col.gap-3.sm:flex-row`.
    *   **Buttons**:
        *   *Call Now*: Primary solid styling (`.bg-primary-600.text-white.px-5.py-3.rounded-full`). Includes slide-up hover animations: `hover:bg-primary-700 hover:shadow-2xl hover:-translate-y-0.5`.
        *   *Book*: Secondary outlined styling (`.border-2.border-primary-600.bg-white.text-primary-600.px-5.py-3.rounded-full`). Includes similar hover transitions.

---

### 4. `DoDontGrid`
A two-column grid structure grouping postoperative recovery rules into "Do's" (green) and "Don'ts" (red).

*   **Location**: `src/components/ui/DoDontGrid.tsx`
*   **Props Interface**:
    ```typescript
    interface DoDontItem {
      text: string;
    }
    interface DoDontGridProps {
      dos: DoDontItem[];
      donts: DoDontItem[];
    }
    ```
*   **Layout & Styling**:
    *   **Layout**: Single column on mobile, widening to a split-pane layout: `.grid.gap-6.sm:grid-cols-2`.
    *   **Do's Card (Green)**:
        *   Box: `.rounded-2xl.border.border-emerald-200.bg-emerald-50.p-6`.
        *   Header Icon: `.flex.h-10.w-10.items-center.justify-center.rounded-full.bg-emerald-100` with a checkmark SVG.
        *   List Item Badge: Circle indicator `.bg-emerald-200.text-emerald-700` containing `✓`.
    *   **Don'ts Card (Red)**:
        *   Box: `.rounded-2xl.border.border-red-200.bg-red-50.p-6`.
        *   Header Icon: `.flex.h-10.w-10.items-center.justify-center.rounded-full.bg-red-100` with a close/cross SVG.
        *   List Item Badge: Circle indicator `.bg-red-200.text-red-700` containing `✕`.

---

### 5. `MythFactCard`
An interactive toggle component revealing factual medical information beneath a common myth statement.

*   **Location**: `src/components/ui/MythFactCard.tsx`
*   **Props Interface**:
    ```typescript
    interface MythFactItem {
      myth: string;
      fact: string;
    }
    interface MythFactCardProps {
      items: MythFactItem[];
    }
    ```
*   **Layout & Styling**:
    *   **Main Card**: `.rounded-2xl.border-2.transition-all.duration-300.overflow-hidden.bg-white`. Toggles border from `border-gray-200` to `border-emerald-200` and adds a larger shadow `.shadow-lg` when expanded.
    *   **Myth Row**: Padding `p-5` with a red highlight box (`.bg-red-100`) displaying `❌` and text labeled with uppercase `text-red-500` ("Myth").
    *   **Divider & Button**: A dashed separator `.border-t.border-dashed.border-gray-200` with a central text button `.text-primary-500.hover:text-primary-600` showing "Reveal Fact ▼" / "Hide Fact ▲".
    *   **Fact Row**: Toggles between `.max-h-0.opacity-0` and `.max-h-[500px].opacity-100` via a CSS transition (`.transition-all.duration-500.ease-in-out`). Displays a green box (`.bg-emerald-100`) with `✅` and label text `text-emerald-500` ("Fact").

---

### 6. `BlogPreview`
A landing page segment showing three preview cards linking to the latest articles.

*   **Location**: `src/components/sections/BlogPreview.tsx`
*   **Props Interface**: None.
*   **Layout & Styling**:
    *   **Layout Grid**: Responsive layout `.grid.gap-6.sm:grid-cols-2.lg:grid-cols-3` inside container padding `.section-padding`.
    *   **Card Links**: Wrapped in `Link` with interactive hover states: `.group.rounded-2xl.border.border-gray-100.bg-white.p-6.shadow-sm.transition-all.duration-300.hover:border-primary-200.hover:shadow-md`.

---

## Unused Components Available for Blogs
The following UI components are fully defined and imported at the top of the blog content renderer, but are not active in the parser flow:

### 1. `Accordion`
*   **Location**: `src/components/ui/Accordion.tsx`
*   **Props Interface**:
    ```typescript
    interface AccordionItem {
      title: string;
      content: string;
      icon?: string;
    }
    interface AccordionProps {
      items: AccordionItem[];
      allowMultiple?: boolean; // Defaults to true
    }
    ```

### 2. `KeyBenefits`
*   **Location**: `src/components/ui/KeyBenefits.tsx`
*   **Props Interface**:
    ```typescript
    interface BenefitItem {
      icon: string;
      title: string;
      description: string;
      color?: "blue" | "green" | "purple" | "orange"; // Defaults to "blue"
    }
    interface KeyBenefitsProps {
      title?: string;
      items: BenefitItem[];
    }
    ```

### 3. `StepTimeline`
*   **Location**: `src/components/ui/StepTimeline.tsx`
*   **Props Interface**:
    ```typescript
    interface StepItem {
      step: number;
      title: string;
      description?: string;
      icon?: string;
    }
    interface StepTimelineProps {
      title?: string;
      steps: StepItem[];
    }
    ```

---

## Design Tokens & Styling Constants

The blog layout styles are bound to the Tailwind configuration and root CSS variables:

### 1. Color Palette Tokens
*   **Primary Accent (Blue)**:
    *   `primary-50` (`#eef3fb`): Light card fills, tag background, secondary background gradients.
    *   `primary-100` (`#d4e1f5`): Light icon highlights, card border lines.
    *   `primary-200` (`#a9c3eb`): Secondary text inside dark headers, border hover actions.
    *   `primary-500` (`#3e71b2`): Core brand color used for primary texts, active buttons, and icons.
    *   `primary-600` (`#325a8e`) & `primary-700` (`#26446b`): Dark blue background gradient fills for heroes and banners.
*   **System Alerts**:
    *   `emerald` / Green (`50`/`100`/`200`/`500`/`800`/`900`): Designated for Do's, Facts, and Success states.
    *   `red` (`50`/`100`/`200`/`500`/`800`/`900`): Designated for Don'ts and Myths.
    *   `gray` (`50`/`100`/`200`/`300`/`400`/`500`/`600`/`900`): Neutral base borders, background canvas fills, and descriptive copy text.

### 2. Typography & Fonts
*   **Display Font**: Playfair Display (`font-display`, Playfair Display, Georgia, serif). Applied to page titles, main headings (`h1`, `h2`, `h3`), and card headers.
*   **Body Font**: Inter (`font-body`, Inter, sans-serif). Applied to article paragraphs, subtext, captions, and details.

### 3. Spacing & Borders
*   **Vertical Spacing**: `.section-padding` (`py-16 sm:py-20`) for top-level pages. `.space-y-6` for parsed markdown sections.
*   **Border Radii**:
    *   `.rounded-xl` (`0.75rem`): Form items and button elements.
    *   `.rounded-2xl` (`1rem`): Sub-components (DoDont Cards, Takeaways Box, Author Bios).
    *   `.rounded-3xl` (`1.5rem` or default Tailwind): Global container borders (main white article card, CTA bottom banner).

---

## Content Guidelines & Schemas

### 1. Data Schema
All blog posts are declared as items in the `blogPosts` array inside [content.ts](file:///f:/Murali%20Website/src/data/content.ts).
The fields must comply with the `BlogPost` type defined at the top of `content.ts`:

```typescript
export interface BlogPost {
  slug: string;       // Unique URL path segment
  title: string;      // Search optimized H1 header
  description: string;// Short article excerpt (used for lists & meta description)
  content: string;    // Raw markdown block
  date: string;       // Human-readable date string (e.g. "October 24, 2025")
  category: string;   // Category classification (e.g. "Breast", "Male", "Circumcision")
}
```

### 2. Formatting Guidelines
*   **Header structure**: Use `## ` for H2 sections and `### ` for H3 subsections.
*   **Highlights**: Bold critical keywords or phrases with double asterisks (`**bold text**`) which are transformed into high-contrast text (`text-gray-900`).
*   **Lists**: Declare bullet lists with a dash followed by a space (`- item`) to render with colored bullet highlights (`bg-primary-400`).

---

## Implementation Gaps & Inconsistencies

During the audit, the following engineering gaps and component mismatches were discovered:

### 1. Inactive `MythFactCard` Component
*   **Inconsistency**: The `BlogContentRenderer` parser logic extracts myths and facts by scanning the list item values of a standard bullet list.
*   **Issue**: In the actual dataset in `content.ts`, the post `"stapler-circumcision-myths-vs-facts"` structures its myths and facts as H2 headings and paragraph elements (e.g., `## Myth 1...` followed by a paragraph starting with `**Truth:**`).
*   **Impact**: Because they are parsed as `heading2` and `paragraph` nodes rather than `list` nodes, the parser never processes them as a myth/fact group. As a result, the interactive `MythFactCard` component **is never rendered on the page**; the content renders as static, raw H2/paragraph text instead.

### 2. Component Collisions in Content Renderer
*   **Inconsistency**: Inside the `heading2` matching logic of the `BlogContentRenderer`, the code inserts the custom components right before the first H2 is written.
*   **Issue**: The code uses a sequential `if-else` return logic:
    ```tsx
    if (index === sections.findIndex((s) => s.type === "heading2") && keyTakeaways.length > 0) {
      return ( ... ); // renders KeyTakeaways + H2
    }
    if (hasDoDonts && sections.findIndex((s) => s.type === "heading2") === index) {
      return ( ... ); // renders DoDontGrid + H2
    }
    ```
*   **Impact**: If an article contains both short lists (interpreted as key takeaways) and Do's/Don'ts blocks, the takeaways conditional block triggers an early return. This completely skips the evaluation of `hasDoDonts`, and the `DoDontGrid` component will not render.

### 3. Duplicate Post Content Rendering
*   **Inconsistency**: The parsing heuristics pull out specific content ranges (e.g., the text matching `"The Do's:"` and `"The Don'ts:"` headings or the short lists representing takeaways) to feed them into custom UI components.
*   **Issue**: However, the parser does not exclude these extracted segments from the global `sections` array.
*   **Impact**: The same content is displayed twice: once in the custom styled card at the top of the article, and a second time as regular text paragraphs/list items further down.

### 4. Mismatched Type Declarations
*   **Inconsistency**: The repository has two distinct declarations for the `BlogPost` type:
    *   **Active**: Declared in [content.ts](file:///f:/Murali%20Website/src/data/content.ts#L16-L23), which includes the mandatory `content`, `date`, and `category` fields.
    *   **Inactive**: Declared in the shared types file [types/index.ts](file:///f:/Murali%20Website/src/types/index.ts#L114-L120) which lists optional parameters (`slug?`, `publishedAt?`, `imageUrl?`) and completely omits the critical `content` field.
*   **Impact**: Developers referencing the generic type in `src/types/index.ts` will face compiler/TypeScript errors if they attempt to access `content` or other blog attributes.

### 5. Unused UI Component Imports
*   **Inconsistency**: `Accordion.tsx`, `KeyBenefits.tsx`, and `StepTimeline.tsx` are imported at the top of `BlogContentRenderer.tsx`, but there is no parsing logic or JSX references to render them.
*   **Impact**: Unnecessary code imports.
