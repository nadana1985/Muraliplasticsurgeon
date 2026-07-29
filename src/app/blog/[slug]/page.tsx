import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, blogPosts, doctorInfo } from "@/data/content";
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";
import StickyCTA from "@/components/blog/StickyCTA";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: doctorInfo.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://drmuraliplastic.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [doctorInfo.name],
      tags: [post.category],
    },
    alternates: {
      canonical: `https://drmuraliplastic.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" />
        <div className="container-custom relative mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 mb-6"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm mb-4">
            {post.category}
          </span>

          <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl max-w-4xl leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-200">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                MK
              </div>
              <span>{doctorInfo.name}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-primary-300" />
            <time>{post.date}</time>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding bg-gray-50 pb-32">
        <div className="container-custom mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            {/* Reading indicator */}
            <div className="mb-8 flex items-center gap-3 text-sm text-gray-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>5 min read</span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{post.category}</span>
            </div>

            {/* Content */}
            <BlogContentRenderer content={post.content} />

            {/* Divider */}
            <div className="my-10 border-t border-gray-100" />

            {/* Author Box */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600">
                  MK
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-gray-900">{doctorInfo.name}</p>
                  <p className="text-sm text-primary-500">{doctorInfo.title}</p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {doctorInfo.bio}
                  </p>
                  <a
                    href="tel:+918072582121"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    📞 Book a Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Post Navigation */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-200 hover:shadow-md"
              >
                <p className="text-sm text-gray-400">← Previous Post</p>
                <p className="mt-2 font-medium text-gray-900 group-hover:text-primary-500 line-clamp-2">
                  {prevPost.title}
                </p>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 text-right transition-all hover:border-primary-200 hover:shadow-md sm:col-start-2"
              >
                <p className="text-sm text-gray-400">Next Post →</p>
                <p className="mt-2 font-medium text-gray-900 group-hover:text-primary-500 line-clamp-2">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-center text-white shadow-xl sm:p-10">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Have Questions?</h3>
            <p className="mt-3 text-primary-100 max-w-xl mx-auto">
              Schedule a personalized consultation with Dr. Murali K to discuss your concerns and treatment options.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="tel:+918072582121" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-primary-600 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl">
                📞 Call +91-8072582121
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10">
                📅 Book Online
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      {/* Sticky CTA */}
      <StickyCTA />
    </main>
  );
}
