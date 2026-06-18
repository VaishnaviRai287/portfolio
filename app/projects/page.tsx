import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Redis } from "@upstash/redis";
import ProjectShowcase from "./showcase";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const redis = Redis.fromEnv();
  
  const keys = allProjects.length > 0
    ? allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"))
    : [];
    
  let views: Record<string, number> = {};
  if (keys.length > 0) {
    const viewCounts = await redis.mget<number[]>(...keys);
    views = viewCounts.reduce((acc, v, i) => {
      acc[allProjects[i].slug] = v ?? 0;
      return acc;
    }, {} as Record<string, number>);
  }

  // Sort all published projects by date
  const projects = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16 bg-[#F5EFEB] min-h-screen text-stone-900">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-stone-500">
            A showcase of my systems programming, web applications, forensics, and developer tools.
          </p>
        </div>
        <div className="w-full h-px bg-stone-200/80" />

        <ProjectShowcase projects={projects} views={views} />
      </div>
    </div>
  );
}
