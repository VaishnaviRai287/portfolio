import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import ProjectShowcase from "./showcase";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {

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

        <ProjectShowcase projects={projects} />
      </div>
    </div>
  );
}
