import type { MetadataRoute } from "next";

const siteUrl = "https://camposdp.github.io/daniel-campos-research";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
