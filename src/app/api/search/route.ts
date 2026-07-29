import { NextResponse } from "next/server";
import { allServices, blogPosts } from "@/data/content";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim().toLowerCase();

    if (!query) {
      return NextResponse.json([]);
    }

    const matchedServices = allServices
      .filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      )
      .map((s) => ({
        type: "service" as const,
        title: s.name,
        description: `${s.category} Aesthetic Procedure`,
        href: `/services#${s.name.toLowerCase().replace(/\s+/g, "-")}`,
      }));

    const matchedBlogs = blogPosts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query)
      )
      .map((p) => ({
        type: "blog" as const,
        title: p.title,
        description: p.description,
        href: `/blog/${p.slug}`,
      }));

    const results = [...matchedServices, ...matchedBlogs];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in search route:", error);
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 });
  }
}
