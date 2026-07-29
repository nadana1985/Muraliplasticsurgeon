"use client";

import React from "react";
import Accordion from "@/components/ui/Accordion";
import DoDontGrid from "@/components/ui/DoDontGrid";
import MythFactCard from "@/components/ui/MythFactCard";
import KeyBenefits from "@/components/ui/KeyBenefits";
import StepTimeline from "@/components/ui/StepTimeline";
import KeyTakeaways from "@/components/blog/KeyTakeaways";

interface BlogContentRendererProps {
  content: string;
}

interface RawNode {
  type: "h2" | "h3" | "paragraph" | "ul" | "ol";
  content: string;
  items?: string[];
}

type Block =
  | { type: "heading2"; content: string }
  | { type: "heading3"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "key-takeaways"; title: string; items: string[] }
  | { type: "dodont-grid"; dos: { text: string }[]; donts: { text: string }[] }
  | { type: "myth-fact-card"; items: { myth: string; fact: string }[] }
  | {
      type: "key-benefits";
      title: string;
      items: { icon: string; title: string; description: string; color?: "blue" | "green" | "purple" | "orange" }[];
    }
  | {
      type: "step-timeline";
      title: string;
      steps: { step: number; title: string; description?: string; icon?: string }[];
    }
  | { type: "accordion"; items: { title: string; content: string }[] };

function parseMarkdownToRawNodes(content: string): RawNode[] {
  const lines = content.split("\n");
  const rawNodes: RawNode[] = [];
  let currentParagraph: string[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join("\n").trim();
      if (text) {
        rawNodes.push({ type: "paragraph", content: text });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      rawNodes.push({ type: currentList.type, content: "", items: [...currentList.items] });
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      rawNodes.push({ type: "h2", content: trimmed.substring(3).trim() });
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      rawNodes.push({ type: "h3", content: trimmed.substring(4).trim() });
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      const itemText = trimmed.replace(/^[-*]\s*/, "");
      if (currentList && currentList.type === "ul") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      }
    } else {
      const olMatch = trimmed.match(/^\d+[\.\)]\s*(.+)/);
      if (olMatch) {
        flushParagraph();
        const itemText = olMatch[1];
        if (currentList && currentList.type === "ol") {
          currentList.items.push(itemText);
        } else {
          flushList();
          currentList = { type: "ol", items: [itemText] };
        }
      } else {
        if (currentList) {
          flushList();
        }
        currentParagraph.push(trimmed);
      }
    }
  }

  flushParagraph();
  flushList();
  return rawNodes;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function compileRawNodesToBlocks(rawNodes: RawNode[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  const getBenefitIcon = (title: string, index: number): string => {
    const lower = title.toLowerCase();
    if (lower.includes("natural") || lower.includes("look") || lower.includes("feel")) return "✨";
    if (lower.includes("safe") || lower.includes("safety") || lower.includes("fda") || lower.includes("care")) return "🛡️";
    if (lower.includes("shape") || lower.includes("retention") || lower.includes("contour")) return "📐";
    if (lower.includes("scar") || lower.includes("minimal")) return "🩹";
    if (lower.includes("fast") || lower.includes("recovery") || lower.includes("short")) return "⚡";
    if (lower.includes("permanent") || lower.includes("long")) return "⏳";
    if (lower.includes("hygiene") || lower.includes("clean")) return "🧼";
    if (lower.includes("expert") || lower.includes("surgeon") || lower.includes("specialist")) return "🩺";

    const defaultIcons = ["✨", "🛡️", "📐", "⚡", "🩺", "⏳", "🩹"];
    return defaultIcons[index % defaultIcons.length];
  };

  while (i < rawNodes.length) {
    const node = rawNodes[i];

    // Heuristic 1: Key Takeaways block
    if (
      node.type === "h2" &&
      (node.content.toLowerCase().includes("takeaway") ||
        node.content.toLowerCase() === "summary" ||
        node.content.toLowerCase() === "quick summary")
    ) {
      const nextNode = rawNodes[i + 1];
      if (nextNode && nextNode.type === "ul") {
        blocks.push({
          type: "key-takeaways",
          title: node.content,
          items: nextNode.items || [],
        });
        i += 2;
        continue;
      }
    }

    // Heuristic 2: Do's and Don'ts Grid
    if (
      node.type === "h2" &&
      (node.content.toLowerCase().startsWith("the do's") ||
        node.content.toLowerCase().startsWith("do's") ||
        node.content.toLowerCase().startsWith("do’s") ||
        node.content.toLowerCase().startsWith("the do’s"))
    ) {
      let dontsHeaderIndex = -1;
      for (let j = i + 1; j < rawNodes.length; j++) {
        const scan = rawNodes[j];
        if (
          scan.type === "h2" &&
          (scan.content.toLowerCase().startsWith("the don't") ||
            scan.content.toLowerCase().startsWith("don't") ||
            scan.content.toLowerCase().startsWith("don’t") ||
            scan.content.toLowerCase().startsWith("the don’t"))
        ) {
          dontsHeaderIndex = j;
          break;
        }
      }

      if (dontsHeaderIndex !== -1) {
        const dosItems: { text: string }[] = [];
        const dontsItems: { text: string }[] = [];
        const preGridBlocks: Block[] = [];
        const postGridBlocks: Block[] = [];

        // Collect Do's items
        let j = i + 1;
        while (j < dontsHeaderIndex) {
          const scan = rawNodes[j];
          if (scan.type === "paragraph") {
            const match = scan.content.match(/^\*\*?([^*:]+)(?::\*\*?|\*\*?:?)\s*(.+)/);
            if (match) {
              dosItems.push({ text: match[2].trim() });
            } else {
              preGridBlocks.push({ type: "paragraph", content: scan.content });
            }
          } else if (scan.type === "ul") {
            for (const item of scan.items || []) {
              const match = item.match(/^\*\*?([^*:]+)(?::\*\*?|\*\*?:?)\s*(.+)/);
              dosItems.push({ text: match ? match[2].trim() : item.trim() });
            }
          } else {
            preGridBlocks.push(scan as any);
          }
          j++;
        }

        // Collect Don'ts items
        let k = dontsHeaderIndex + 1;
        while (k < rawNodes.length) {
          const scan = rawNodes[k];
          if (scan.type === "h2") {
            break;
          }
          if (scan.type === "paragraph") {
            const match = scan.content.match(/^\*\*?([^*:]+)(?::\*\*?|\*\*?:?)\s*(.+)/);
            if (match) {
              dontsItems.push({ text: match[2].trim() });
            } else {
              postGridBlocks.push({ type: "paragraph", content: scan.content });
            }
          } else if (scan.type === "ul") {
            for (const item of scan.items || []) {
              const match = item.match(/^\*\*?([^*:]+)(?::\*\*?|\*\*?:?)\s*(.+)/);
              dontsItems.push({ text: match ? match[2].trim() : item.trim() });
            }
          } else {
            postGridBlocks.push(scan as any);
          }
          k++;
        }

        if (dosItems.length > 0 || dontsItems.length > 0) {
          blocks.push({ type: "heading2", content: node.content });
          blocks.push(...preGridBlocks);
          blocks.push({ type: "dodont-grid", dos: dosItems, donts: dontsItems });
          blocks.push(...postGridBlocks);
          i = k;
          continue;
        }
      }
    }

    // Heuristic 3: MythFactCard
    if (
      node.type === "h2" &&
      (node.content.toLowerCase().startsWith("myth") || node.content.toLowerCase().startsWith("myth:"))
    ) {
      const nextNode = rawNodes[i + 1];
      if (
        nextNode &&
        nextNode.type === "paragraph" &&
        (nextNode.content.toLowerCase().startsWith("**truth:") ||
          nextNode.content.toLowerCase().startsWith("**fact:"))
      ) {
        const mythFactItems: { myth: string; fact: string }[] = [];
        let currentIdx = i;

        while (currentIdx < rawNodes.length) {
          const mythNode = rawNodes[currentIdx];
          const factNode = rawNodes[currentIdx + 1];

          if (
            mythNode &&
            mythNode.type === "h2" &&
            mythNode.content.toLowerCase().startsWith("myth") &&
            factNode &&
            factNode.type === "paragraph" &&
            (factNode.content.toLowerCase().startsWith("**truth:") ||
              factNode.content.toLowerCase().startsWith("**fact:"))
          ) {
            const cleanMyth = mythNode.content.replace(/^myth\s*\d*\s*:\s*/i, "").trim();
            const cleanFact = factNode.content.replace(/^\*\*?(?:truth|fact):\s*\*\*?/i, "").trim();
            mythFactItems.push({
              myth: cleanMyth,
              fact: cleanFact,
            });
            currentIdx += 2;
          } else {
            break;
          }
        }

        if (mythFactItems.length > 0) {
          blocks.push({ type: "myth-fact-card", items: mythFactItems });
          i = currentIdx;
          continue;
        }
      }
    }

    // Heuristic 4: KeyBenefits
    if (
      node.type === "h2" &&
      (node.content.toLowerCase().includes("advantages") ||
        node.content.toLowerCase().includes("benefits") ||
        node.content.toLowerCase().includes("why choose") ||
        node.content.toLowerCase().includes("why consider"))
    ) {
      const benefitItems: { icon: string; title: string; description: string; color?: "blue" | "green" | "purple" | "orange" }[] = [];
      let j = i + 1;
      const colors: ("blue" | "green" | "purple" | "orange")[] = ["blue", "green", "purple", "orange"];
      let colorIdx = 0;

      while (j < rawNodes.length) {
        const scan = rawNodes[j];
        if (scan.type === "h2") {
          break;
        }

        if (scan.type === "h3") {
          const nextPara = rawNodes[j + 1];
          if (nextPara && nextPara.type === "paragraph") {
            const cleanTitle = scan.content.replace(/^\d+[\.\s\-]+\s*/, "").trim();
            benefitItems.push({
              title: cleanTitle,
              description: nextPara.content,
              icon: getBenefitIcon(cleanTitle, benefitItems.length),
              color: colors[colorIdx % colors.length],
            });
            colorIdx++;
            j += 2;
            continue;
          }
        }

        if (scan.type === "ul") {
          for (const item of scan.items || []) {
            const match = item.match(/^\*\*?([^*:]+)(?::\*\*?|\*\*?:?)\s*(.+)/);
            if (match) {
              const cleanTitle = match[1].trim();
              benefitItems.push({
                title: cleanTitle,
                description: match[2].trim(),
                icon: getBenefitIcon(cleanTitle, benefitItems.length),
                color: colors[colorIdx % colors.length],
              });
            } else {
              benefitItems.push({
                title: item.trim(),
                description: "",
                icon: getBenefitIcon(item, benefitItems.length),
                color: colors[colorIdx % colors.length],
              });
            }
            colorIdx++;
          }
          j++;
          continue;
        }
        j++;
      }

      if (benefitItems.length > 0) {
        blocks.push({ type: "heading2", content: node.content });
        blocks.push({ type: "key-benefits", title: "", items: benefitItems });
        i = j;
        continue;
      }
    }

    // Heuristic 5: Step Timeline
    if (
      node.type === "h2" &&
      (node.content.toLowerCase().includes("procedure") ||
        node.content.toLowerCase().includes("process") ||
        node.content.toLowerCase().includes("steps") ||
        node.content.toLowerCase().includes("treatment options") ||
        node.content.toLowerCase().includes("surgical planning"))
    ) {
      const steps: { step: number; title: string; description?: string }[] = [];
      let j = i + 1;

      while (j < rawNodes.length) {
        const scan = rawNodes[j];
        if (scan.type === "h2") {
          break;
        }

        if (scan.type === "ol") {
          (scan.items || []).forEach((item, idx) => {
            const match = item.match(/^\*\*?([^*:]+)(?::\*\*?|\*\*?:?)\s*(.+)/);
            steps.push({
              step: idx + 1,
              title: match ? match[1].trim() : item.trim(),
              description: match ? match[2].trim() : undefined,
            });
          });
          j++;
          continue;
        }

        if (scan.type === "ul") {
          let stepNum = 1;
          for (const item of scan.items || []) {
            const cleanItem = item.replace(/^\d+[\.\s\-]+\s*/, "").trim();
            const match = cleanItem.match(/^\*\*?([^*:]+)(?::\*\*?|\*\*?:?)\s*(.+)/);
            steps.push({
              step: stepNum,
              title: match ? match[1].trim() : cleanItem,
              description: match ? match[2].trim() : undefined,
            });
            stepNum++;
          }
          j++;
          continue;
        }
        j++;
      }

      if (steps.length > 0) {
        blocks.push({ type: "heading2", content: node.content });
        blocks.push({ type: "step-timeline", title: "", steps });
        i = j;
        continue;
      }
    }

    // Heuristic 6: Accordion
    if (
      node.type === "h2" &&
      (node.content.toLowerCase().includes("faq") ||
        node.content.toLowerCase().includes("questions"))
    ) {
      const faqItems: { title: string; content: string }[] = [];
      let j = i + 1;

      while (j < rawNodes.length) {
        const scan = rawNodes[j];
        if (scan.type === "h2") {
          break;
        }

        if (scan.type === "h3") {
          const nextPara = rawNodes[j + 1];
          if (nextPara && nextPara.type === "paragraph") {
            faqItems.push({
              title: scan.content,
              content: nextPara.content,
            });
            j += 2;
            continue;
          }
        }
        j++;
      }

      if (faqItems.length > 0) {
        blocks.push({ type: "heading2", content: node.content });
        blocks.push({ type: "accordion", items: faqItems });
        i = j;
        continue;
      }
    }

    // Fallbacks
    if (node.type === "h2") {
      blocks.push({ type: "heading2", content: node.content });
    } else if (node.type === "h3") {
      blocks.push({ type: "heading3", content: node.content });
    } else if (node.type === "paragraph") {
      blocks.push({ type: "paragraph", content: node.content });
    } else if (node.type === "ul") {
      blocks.push({ type: "list", items: node.items || [], ordered: false });
    } else if (node.type === "ol") {
      blocks.push({ type: "list", items: node.items || [], ordered: true });
    }

    i++;
  }

  return blocks;
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const rawNodes = parseMarkdownToRawNodes(content);
  const blocks = compileRawNodesToBlocks(rawNodes);

  // Extract takeaways block to render at the top
  const takeawaysBlock = blocks.find((b) => b.type === "key-takeaways") as
    | { type: "key-takeaways"; title: string; items: string[] }
    | undefined;

  const contentBlocks = blocks.filter((b) => b.type !== "key-takeaways");

  return (
    <div className="space-y-6">
      {takeawaysBlock && (
        <div className="mb-8">
          <KeyTakeaways title={takeawaysBlock.title} items={takeawaysBlock.items} />
        </div>
      )}

      {contentBlocks.map((block, index) => {
        switch (block.type) {
          case "heading2":
            return (
              <h2 key={index} className="font-display text-2xl font-bold text-gray-900 mt-10 mb-4">
                {block.content}
              </h2>
            );

          case "heading3":
            return (
              <h3 key={index} className="font-display text-xl font-semibold text-gray-900 mt-8 mb-3">
                {block.content}
              </h3>
            );

          case "paragraph":
            return (
              <p key={index} className="text-gray-600 leading-relaxed">
                {renderInlineMarkdown(block.content)}
              </p>
            );

          case "list":
            if (block.ordered) {
              return (
                <ol key={index} className="list-decimal pl-6 space-y-2 text-gray-600 leading-relaxed">
                  {block.items.map((item, i) => (
                    <li key={i}>{renderInlineMarkdown(item)}</li>
                  ))}
                </ol>
              );
            } else {
              return (
                <ul key={index} className="space-y-2 pl-1">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-400" />
                      <span className="text-gray-600 leading-relaxed">
                        {renderInlineMarkdown(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }

          case "dodont-grid":
            return (
              <div key={index} className="my-6">
                <DoDontGrid dos={block.dos} donts={block.donts} />
              </div>
            );

          case "myth-fact-card":
            return (
              <div key={index} className="my-6">
                <MythFactCard items={block.items} />
              </div>
            );

          case "key-benefits":
            return (
              <div key={index} className="my-6">
                <KeyBenefits items={block.items} />
              </div>
            );

          case "step-timeline":
            return (
              <div key={index} className="my-6">
                <StepTimeline steps={block.steps} />
              </div>
            );

          case "accordion":
            return (
              <div key={index} className="my-6">
                <Accordion items={block.items} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
