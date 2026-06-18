import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { getBlogs, getSeoConfig } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfig("/blog");
  if (!seo) {
    return {
      title: "Blog | Go-To Friend",
      description: "Read our latest experiential marketing and brand strategy articles.",
    };
  }
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonicalUrl || "https://www.gotofriend.in/blog",
    },
    robots: seo.robots,
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
  };
}

export default async function BlogIndexPage() {
  const data = await getBlogs(1, 12);
  const blogs = data?.blogs || [];

  return (
    <div className="bg-black text-white min-h-screen font-sans flex flex-col pt-24">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 border-b border-neutral-900 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
            Insights & Strategy //
          </p>
          <h1 className="text-[8vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none mb-6">
            The Go-To
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] block md:inline md:ml-3">
              Journal
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-neutral-400 font-light leading-relaxed">
            Deep dives, industry analysis, and creative blueprints for experiential brand dominance.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 font-light">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <a
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all duration-300 h-full shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                  {blog.featuredImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-700 font-bold bg-neutral-900">
                      GO-TO FRIEND
                    </div>
                  )}
                  {blog.category && (
                    <span className="absolute top-4 left-4 bg-white text-black font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
                      {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mt-2 group-hover:text-neutral-300 transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h2>
                    {blog.summary && (
                      <p className="text-neutral-400 text-sm font-light mt-3 leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest mt-6 group-hover:underline decoration-white underline-offset-4">
                    Read Article
                    <svg
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
