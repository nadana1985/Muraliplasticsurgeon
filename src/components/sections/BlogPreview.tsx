import Link from "next/link";
import { blogPosts } from "@/data/content";

export default function BlogPreview() {
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
            Latest Updates
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Plastic Surgery Updates
          </h2>
          <p className="mt-3 text-gray-500">
            Stay informed with the latest from Dr. Murali&apos;s blog
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-primary-500">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {post.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-primary-500">
                Read more →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="btn-secondary">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
