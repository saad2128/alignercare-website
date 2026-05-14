import type { MetadataRoute } from "next";

const baseUrl = "https://www.kamfesmilecarelab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/aligners", "/about", "/contact", "/privacy-policy"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
