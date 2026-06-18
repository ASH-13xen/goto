import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const CONTROL_PANEL_API = process.env.NEXT_PUBLIC_SEO_API_URL || 'http://localhost:3000/api';
  const baseUrl = "https://www.gotofriend.in";

  try {
    const res = await fetch(`${CONTROL_PANEL_API}/sitemap?siteId=gotolatest`, {
      next: { revalidate: 1800 } // Cache sitemap array query for 30 minutes
    });

    if (res.ok) {
      const data = await res.json();
      return data.urls.map((item: any) => ({
        url: item.url,
        lastModified: new Date(item.updatedAt),
        changeFrequency: item.changeFrequency || 'weekly',
        priority: item.priority || 0.7,
      }));
    }
  } catch (err) {
    console.warn('[SEO] Failed to fetch dynamic sitemap from Control Panel. Using fallback.');
  }

  // Fallback default list
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
  ];
}
