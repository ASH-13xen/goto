import { MetadataRoute } from "next";
import { getControlPanelApi, fetchWithTimeout } from "@/lib/api";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const CONTROL_PANEL_API = getControlPanelApi();
  const baseUrl = "https://www.gotofriend.in";

  try {
    const res = await fetchWithTimeout(`${CONTROL_PANEL_API}/robots?siteId=gotolatest`, {
      next: { revalidate: 3600 } // Cache robots config for 1 hour
    });
    
    if (res.ok) {
      const data = await res.json();
      const rule = data.rules?.[0]; // Fetch first rule mapping
      
      if (rule) {
        return {
          rules: {
            userAgent: rule.userAgent || "*",
            allow: rule.allowPaths ? rule.allowPaths.split(',') : "/",
            disallow: rule.disallowPaths ? rule.disallowPaths.split(',') : undefined,
          },
          sitemap: `${baseUrl}/sitemap.xml`,
        };
      }
    }
  } catch (err) {
    console.warn('[SEO] Failed to fetch robots config from API, falling back to static defaults.');
  }

  // Default fallback
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
