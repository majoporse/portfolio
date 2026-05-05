import { useLoaderData, Link } from "react-router";
import { projects } from "../constants/projects";
import { motion } from "framer-motion";
import { useEffect } from "react";
import type { Route } from "./+types/projects.$id";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.project) {
    return [
      { title: "Project Not Found | Mário Hatalčík" },
    ];
  }
  return [
    { title: `${data.project.title} | Mário Hatalčík` },
    { name: "description", content: data.project.description },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  console.log("Loading project with ID:", params.id);
  const project = projects.find((p) => p.id === params.id);
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  return { project };
}

export default function Project() {
  const { project } = useLoaderData<typeof loader>();

  return (
    <motion.article
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen theme-bg-primary max-w-5xl mx-auto"
    >
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 theme-text-muted hover:theme-text-primary transition-colors text-sm font-medium tracking-wide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex gap-3 mb-6 flex-wrap">
            {project.skills.map((skill) => (
              <span key={skill} className="text-[10px] theme-text-accent uppercase tracking-[0.15em] font-semibold">
                {skill}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold theme-text-primary mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl theme-text-muted leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      </header>

      {/* Featured Image Placeholder */}
      {project.images && project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto px-6 mb-16"
        >
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center theme-border-medium border">
            <span className="theme-text-muted text-sm uppercase tracking-wider">Featured Image</span>
          </div>
        </motion.div>
      )}

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        {project.blogContent?.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-lg leading-relaxed theme-text-primary mb-8"
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Project Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t theme-border-medium"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] font-black tracking-[0.4em] uppercase theme-text-primary border-b-2 theme-border-accent pb-1 theme-hover-text-accent transition-colors"
          >
            {project.linkText} →
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
