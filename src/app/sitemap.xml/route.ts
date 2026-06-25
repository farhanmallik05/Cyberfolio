import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";
import { getAllProjects } from "@/lib/projects";

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://farhanmallik.com";

export async function GET() {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/contact",
    "/skills",
    "/resume",
    "/services",
    "/certificates",
    "/now",
    "/tools",
    "/dsa",
    "/courses",
    "/community",
    "/hire",
  ];

  // Fetch dynamic routes
  let posts: any[] = [];
  try {
    posts = await getAllPosts();
  } catch (e) {
    console.error("Error fetching posts for sitemap", e);
  }

  const projects = getAllProjects();

  const blogRoutes = posts.map((post) => `/blog/${post.slug}`);
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutes, ...projectRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map((route) => {
          return `
            <url>
              <loc>${SITE_URL}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${route === "" ? "daily" : "weekly"}</changefreq>
              <priority>${route === "" ? "1.0" : "0.8"}</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  return new NextResponse(sitemap.trim(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
