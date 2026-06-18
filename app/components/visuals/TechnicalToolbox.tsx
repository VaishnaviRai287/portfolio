"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Database, Shield, Layout, Wrench } from "lucide-react";

interface Skill {
  name: string;
  proficiency: number; // 0-100
  projects: string[];
  description: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export default function TechnicalToolbox() {
  const [activeCategory, setActiveCategory] = useState<string>("languages");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories: Category[] = [
    {
      id: "languages",
      name: "Languages",
      icon: <Terminal className="w-4 h-4" />,
      skills: [
        { name: "Python", proficiency: 96, projects: ["ModelMesh", "ML Visualizer", "APIForge"], description: "Primary systems and research language. Advanced AST and ML architectures." },
        { name: "TypeScript", proficiency: 88, projects: ["ModelMesh", "Portfolio Showcase"], description: "Typed web systems design and application orchestration." },
        { name: "JavaScript", proficiency: 90, projects: ["ML Visualizer", "React Dashboards"], description: "Frontend web interactions and event loops." },
        { name: "C++", proficiency: 82, projects: ["Forensics Tools"], description: "Memory management and performance-critical systems." },
        { name: "C", proficiency: 85, projects: ["Stateful UNIX Shell"], description: "Low-level system calls, fork/exec processing, signal trapping." },
        { name: "SQL", proficiency: 88, projects: ["ModelMesh", "APIForge"], description: "Database schemas, relational matching, transaction queries." }
      ]
    },
    {
      id: "frameworks",
      name: "Frameworks",
      icon: <Layout className="w-4 h-4" />,
      skills: [
        { name: "FastAPI", proficiency: 92, projects: ["ModelMesh"], description: "Async HTTP request parsing, dependency injection, schemas." },
        { name: "React", proficiency: 90, projects: ["ModelMesh", "ML Visualizer"], description: "State sync, context models, and interactive dashboard components." },
        { name: "Django", proficiency: 88, projects: ["ML Visualizer", "APIForge"], description: "MVC Web backends, model schemas, ORM relational cascades." },
        { name: "Django REST Framework", proficiency: 90, projects: ["APIForge"], description: "REST API compiler pipelines and schema serialization." },
        { name: "Next.js", proficiency: 86, projects: ["Portfolio Showcase"], description: "Server components, ISR validation, page route optimization." },
        { name: "TailwindCSS", proficiency: 92, projects: ["ModelMesh", "ML Visualizer"], description: "Responsive layouts, premium layouts, and flex grids." }
      ]
    },
    {
      id: "ml",
      name: "Machine Learning & AI",
      icon: <Cpu className="w-4 h-4" />,
      skills: [
        { name: "PyTorch", proficiency: 90, projects: ["ModelMesh", "ML Visualizer"], description: "Deep learning models, tensor math, layer configuration." },
        { name: "TensorFlow", proficiency: 85, projects: ["ModelMesh"], description: "Neural network ingestion, graph tracing." },
        { name: "Scikit-Learn", proficiency: 92, projects: ["ModelMesh", "ML Visualizer"], description: "Statistical classification, regression, and model evaluations." },
        { name: "FAISS", proficiency: 84, projects: ["PDF Chatbot"], description: "Nearest neighbor search in high-dimensional vector spaces." },
        { name: "NumPy & SciPy", proficiency: 94, projects: ["ModelMesh", "ML Visualizer"], description: "Matrix algebra, numerical approximations, scientific computing." },
        { name: "Pandas", proficiency: 92, projects: ["ModelMesh", "Powergrid EDA"], description: "Dataframes manipulation, seasonal outlines, clean scaling." }
      ]
    },
    {
      id: "databases",
      name: "Databases & Storage",
      icon: <Database className="w-4 h-4" />,
      skills: [
        { name: "PostgreSQL", proficiency: 88, projects: ["ModelMesh", "APIForge"], description: "Relational constraints, composite indexes, JSONB layers." },
        { name: "Redis", proficiency: 84, projects: ["Portfolio Showcase"], description: "Pageview tracking keys, cache stores, session configurations." }
      ]
    },
    {
      id: "tools",
      name: "Developer Tools",
      icon: <Wrench className="w-4 h-4" />,
      skills: [
        { name: "Docker", proficiency: 86, projects: ["ModelMesh Deployment"], description: "Containerized application packaging, isolated environments." },
        { name: "Git & GitHub", proficiency: 92, projects: ["All projects"], description: "Branch merging, action flows, and repository setups." },
        { name: "Linux Systems", proficiency: 88, projects: ["UNIX Shell"], description: "POSIX execution, signal trapping, pipeline redirect filters." },
        { name: "Postman", proficiency: 90, projects: ["APIForge Testing"], description: "REST API testing and collection automation." }
      ]
    }
  ];

  const activeCategoryData = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      {/* Visual Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">systems_toolbox.json</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Left Column: Category Selectors */}
        <div className="lg:col-span-4 border-r border-[#E7E2D8] bg-[#FAF8F3] p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible select-none">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setHoveredSkill(null);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-mono font-bold tracking-tight transition duration-200 w-full text-left whitespace-nowrap lg:whitespace-normal border ${
                  isActive
                    ? "bg-[#FFFFFF] border-[#E7E2D8] text-[#111111] shadow-sm"
                    : "bg-transparent border-transparent text-[#5C5C5C] hover:text-[#111111] hover:bg-[#FFFFFF]/50"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Right Column: Tags & Info details */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between min-h-[300px]">
          {/* Tags Grid */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Interactive System Tags</span>
            
            <div className="flex flex-wrap gap-2.5">
              {activeCategoryData.skills.map(skill => (
                <button
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setHoveredSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition duration-200 ${
                    hoveredSkill?.name === skill.name
                      ? "bg-[#2563EB] border-[#2563EB] text-[#FFFFFF] shadow-sm"
                      : "bg-[#FFFFFF] border-[#E7E2D8] text-[#111111] hover:border-[#2563EB]/50"
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Hover Details Panel */}
          <div className="mt-8 border border-[#E7E2D8] bg-[#FAF8F3] rounded p-4 h-40 flex flex-col justify-between shadow-inner">
            <AnimatePresence mode="wait">
              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-[#E7E2D8] pb-1.5">
                    <h4 className="text-sm font-bold font-mono text-[#111111]">{hoveredSkill.name}</h4>
                    <span className="text-xs font-mono text-[#16A34A] font-bold">Proficiency: {hoveredSkill.proficiency}%</span>
                  </div>
                  <p className="text-xs text-[#5C5C5C] leading-relaxed">{hoveredSkill.description}</p>
                  
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5C5C5C]">
                    <span className="font-bold">Used in:</span>
                    {hoveredSkill.projects.map((proj, idx) => (
                      <span key={proj} className="px-1.5 py-0.25 rounded bg-[#FFFFFF] border border-[#E7E2D8] text-[#111111]">
                        {proj}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-[#5C5C5C] italic font-mono text-xs">
                  Hover over a system tag above to inspect proficiencies, usage logs, and capabilities.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
