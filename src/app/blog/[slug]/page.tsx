import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { getBlogBySlug } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Go-To Friend",
    };
  }

  // Use custom SEO overrides if specified, otherwise fall back to standard fields
  const title = blog.seoTitle || `${blog.title} | Go-To Friend`;
  const description = blog.seoDescription || blog.summary || "";
  const ogImage = blog.seoOgImage || blog.featuredImage || "";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.gotofriend.in/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans flex flex-col pt-24">
      {/* Dynamic typography styling for blog HTML content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 { font-size: 1.75rem; font-weight: 900; text-transform: uppercase; margin-top: 2.5rem; margin-bottom: 1.25rem; color: white; letter-spacing: -0.025em; line-height: 1.2; }
        .blog-content h3 { font-size: 1.35rem; font-weight: 800; text-transform: uppercase; margin-top: 2rem; margin-bottom: 1rem; color: white; letter-spacing: -0.025em; line-height: 1.3; }
        .blog-content p { margin-bottom: 1.5rem; line-height: 1.8; color: #a3a3a3; font-weight: 300; }
        .blog-content ul, .blog-content ol { padding-left: 1.5rem; margin-bottom: 1.5rem; color: #a3a3a3; font-weight: 300; }
        .blog-content ul { list-style-type: square; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content li { margin-bottom: 0.5rem; line-height: 1.7; }
        .blog-content a { color: #6366f1; text-decoration: underline; text-underline-offset: 4px; }
        .blog-content a:hover { color: #818cf8; }
        .blog-content strong { color: white; font-weight: 700; }
        .blog-content blockquote { border-l-4 border-indigo-500 pl-4 italic my-6 text-neutral-400; }
      `}} />

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        
        {/* Category & Date */}
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">
          {blog.category && (
            <span className="text-white border border-white/20 px-3 py-1 rounded-full bg-neutral-950">
              {blog.category}
            </span>
          )}
          <span>
            {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8 text-white">
          {blog.title}
        </h1>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-neutral-900 mb-12 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
        )}

        {/* Article Summary Intro */}
        {blog.summary && (
          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed italic border-l-2 border-indigo-500/50 pl-6 mb-10">
            {blog.summary}
          </p>
        )}

        {/* Content Body */}
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-neutral-900">
            {blog.tags.split(",").map((tag: string, index: number) => (
              <span 
                key={index}
                className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-neutral-950 border border-neutral-900 px-3 py-1.5 rounded-lg"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Back to Blog Link */}
        <div className="mt-16 pt-8 border-t border-neutral-900">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest hover:underline underline-offset-4"
          >
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Back to Journal
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
