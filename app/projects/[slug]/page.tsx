import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import PipelineGraph from "@/app/components/visuals/PipelineGraph";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#F5EFEB] min-h-screen">
      <Header project={project} />

      <div className="max-w-3xl mx-auto px-4 pt-12">
        <PipelineGraph slug={project.slug} />
      </div>

      <article className="px-4 py-12 mx-auto prose prose-stone prose-quoteless text-stone-850">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
