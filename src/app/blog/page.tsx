import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/content";
import JsonLd from "@/components/seo/JsonLd";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Plastic Surgery Blog – Expert Tips & Updates Chennai",
  description: "Stay informed with the latest plastic surgery updates, expert tips, and patient guides from Dr. Murali K, Consultant Aesthetic & Plastic Surgeon in Chennai.",
  openGraph: {
    title: "Plastic Surgery Updates – Dr. Murali K Blog",
    description: "Expert tips, patient guides, and the latest updates in plastic surgery and aesthetic treatments.",
    url: "https://drmuraliplastic.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://drmuraliplastic.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd page="blog" />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-16 text-white">
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Plastic Surgery Updates
            </h1>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Expert insights and patient guides from Dr. Murali K
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="section-padding bg-white">
          <div className="container-custom mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <span className="text-xl">📝</span>
                  </div>
                  <span className="inline-block mt-3 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600">
                    {post.category}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-semibold text-gray-900 group-hover:text-primary-500">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span className="text-sm font-medium text-primary-500">Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Get the latest plastic surgery tips and updates delivered to your inbox.
            </p>
            <div className="mt-8 mx-auto max-w-md relative">
              <NewsletterForm />
              <p className="mt-3 text-sm text-gray-500">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
