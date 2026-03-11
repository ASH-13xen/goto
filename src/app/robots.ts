import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: '/private-admin-route/', (Use this if you have pages you want hidden)
    },
    sitemap: "https://www.gotofriend.com/sitemap.xml",
  };
}
