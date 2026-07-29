"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, FileText } from "lucide-react";
import { blogPosts } from "@/data/content";

const CATEGORIES = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

function estimateReadTime(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, "");
  const words = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function FeaturedCard({ post }: { post: typeof blogPosts[0] }) {
  const readTime = estimateReadTime(post.content);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative col-span-1 overflow-hidden rounded-3xl bg-gray-900 shadow-lg transition-all duration-500 hover:shadow-2xl md:col-span-2"
    >
      {/* Background gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-gray-900 opacity-80" />
      <div className="relative p-8 sm:p-10 flex flex-col justify-between min-h-[320px]">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {post.category}
            </span>
            <span className="text-xs text-white/60">Featured</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl leading-tight group-hover:text-primary-200 transition-colors">
            {post.title}
          </h3>
          <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-2">
            {post.description}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
              DM
            </div>
            <div>
              <p className="text-sm font-medium text-white">Dr. Murali K</p>
              <p className="text-xs text-white/50">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readTime} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  const readTime = estimateReadTime(post.content);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Thumbnail with hover zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-gray-100 transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="h-12 w-12 text-primary-300" />
        </div>
        {/* Category tag */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-primary-600 backdrop-blur-sm shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {post.description}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[10px] font-semibold text-primary-600">
              DM
            </div>
            <span className="text-xs text-gray-500">{post.date}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            {readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPreview() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1, 4);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
            Latest Updates
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Plastic Surgery Insights
          </h2>
          <p className="mt-3 text-gray-500">
            Stay informed with expert guidance from Dr. Murali K
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter blog posts by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-gray-400">No posts found for this category.</p>
        )}

        {/* Magazine Grid */}
        {filtered.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured: spans 2 cols */}
            {featured && <FeaturedCard post={featured} />}

            {/* Secondary cards */}
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* View All */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
          >
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
