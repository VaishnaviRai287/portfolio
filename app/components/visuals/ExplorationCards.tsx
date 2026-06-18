"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldAlert, FileCode, HardDrive, ArrowRight, Check } from "lucide-react";

interface DomainCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  projects: string[];
  technologies: string[];
  research: string[];
  color: string;
  visualSnippet: React.ReactNode;
  summary: string;
}

export default function ExplorationCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards: DomainCard[] = [
    {
      id: "ai_ml",
      title: "AI & Machine Learning Systems",
      icon: <Cpu className="w-5 h-5" />,
      projects: ["ModelMesh", "ML Visualizer", "PowerGrid Forecasting", "PDF QA Systems"],
      technologies: ["PyTorch", "TensorFlow", "Scikit-Learn", "FastAPI", "Pandas"],
      research: ["Model Observability", "Drift Detection Algorithms", "Feature Attribution Maps"],
      color: "#2563EB", // Blue
      summary: "Ingest, fingerprint, and observe model latency profiles and coordinate drifts.",
      visualSnippet: (
        <svg className="w-full h-12" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="4" fill="#2563EB" />
          <circle cx="50" cy="15" r="4" fill="#16A34A" />
          <circle cx="85" cy="15" r="4" fill="#EA580C" />
          <line x1="19" y1="15" x2="46" y2="15" stroke="#E7E2D8" strokeWidth="1" />
          <line x1="54" y1="15" x2="81" y2="15" stroke="#E7E2D8" strokeWidth="1" />
          <circle cx="50" cy="15" r="8" stroke="#16A34A" strokeWidth="1" fill="none" className="animate-ping" />
        </svg>
      )
    },
    {
      id: "cyber",
      title: "Cybersecurity & Digital Forensics",
      icon: <ShieldAlert className="w-5 h-5" />,
      projects: ["File Recovery Tool", "Email Phishing Detection", "NewsFeed Bias Analyzer"],
      technologies: ["XFS Forensics", "Heuristic Classifiers", "OCR parsing", "Docker"],
      research: ["Inode Reconstruction", "Domain Reputation Heuristics", "Phishing Vector Identification"],
      color: "#EA580C", // Orange
      summary: "Trace deleted file blocks and verify envelope signatures against threats.",
      visualSnippet: (
        <div className="grid grid-cols-8 gap-[2px] w-24 mx-auto my-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 ${
                i === 5 || i === 12 ? "bg-[#EA580C] animate-pulse" : i === 7 ? "bg-[#16A34A]" : "bg-[#E7E2D8]"
              }`}
            />
          ))}
        </div>
      )
    },
    {
      id: "pl",
      title: "Programming Languages & Compilers",
      icon: <FileCode className="w-5 h-5" />,
      projects: ["APIForge (Django Compiler)", "Language Tooling", "Schema Generators"],
      technologies: ["AST Parsing", "Lexers", "Code-Gen Pipelines", "Python click CLI"],
      research: ["Weighted Heuristic Renaming", "Directed Dependency Cascades ($O(V+E)$)"],
      color: "#16A34A", // Green
      summary: "Engineered declarative compilers to parse and synthesize REST schemas.",
      visualSnippet: (
        <div className="font-mono text-[8px] text-[#5C5C5C] text-center leading-normal">
          <div>DSL &rarr; [AST Tree] &rarr; django.py</div>
          <div className="text-[#16A34A] font-bold">Compiled in 4.82ms</div>
        </div>
      )
    },
    {
      id: "infra",
      title: "Data Infrastructure & Intelligent Systems",
      icon: <HardDrive className="w-5 h-5" />,
      projects: ["RAG Index pipelines", "Vector Database Syncs", "Observability Daemons"],
      technologies: ["FAISS Index", "Redis Cache", "PostgreSQL schema", "WebSockets"],
      research: ["Semantic Retrieval Latency", "Distributed System Health Tracing"],
      color: "#8B5CF6", // Purple
      summary: "Analyze pipeline latencies and coordinate vector searches.",
      visualSnippet: (
        <svg className="w-full h-12" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="80" height="4" rx="2" fill="#E7E2D8" />
          <motion.rect
            x="10"
            y="8"
            width="25"
            height="4"
            rx="2"
            fill="#8B5CF6"
            animate={{ x: [0, 55, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <circle cx="20" cy="22" r="3" fill="#8B5CF6" />
          <circle cx="50" cy="22" r="3" fill="#8B5CF6" />
          <circle cx="80" cy="22" r="3" fill="#8B5CF6" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 select-none">
      {cards.map(card => {
        const isHovered = hoveredCard === card.id;
        return (
          <motion.div
            key={card.id}
            layout
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="border border-[#E7E2D8] bg-[#FFFFFF] rounded-xl overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#FAF8F3] hover:shadow-md h-[270px] relative"
            style={{
              boxShadow: isHovered ? `0 10px 25px -5px ${card.color}10` : "none"
            }}
          >
            {/* Base Header Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-lg border border-[#E7E2D8] flex items-center justify-center transition-all duration-300"
                  style={{
                    color: isHovered ? "#FFFFFF" : card.color,
                    backgroundColor: isHovered ? card.color : "transparent",
                    borderColor: isHovered ? card.color : "#E7E2D8"
                  }}
                >
                  {card.icon}
                </div>
                <span className="text-[9px] font-mono text-[#5C5C5C] font-bold uppercase tracking-wider">explore</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold tracking-tight text-[#111111] font-tight">{card.title}</h3>
                <p className="text-[11px] text-[#5C5C5C] leading-relaxed line-clamp-2">{card.summary}</p>
              </div>
            </div>

            {/* Visual preview box */}
            <div className="bg-[#FAF8F3] border border-[#E7E2D8]/50 rounded-lg p-2 flex items-center justify-center h-16 overflow-hidden">
              {card.visualSnippet}
            </div>

            {/* Unfolding sub-panel absolute/expanded overlays */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-white p-6 flex flex-col justify-between z-20 border border-[#E7E2D8] rounded-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-2">
                      <h4 className="text-xs font-bold font-mono tracking-tight text-[#111111]" style={{ color: card.color }}>
                        {card.title.split(" ")[0]} Systems
                      </h4>
                      <span className="text-[8px] font-mono text-[#5C5C5C]">Specs</span>
                    </div>

                    <div className="space-y-3">
                      {/* Projects sub-list */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-[#5C5C5C] uppercase block">Featured Systems</span>
                        <div className="flex flex-wrap gap-1.5">
                          {card.projects.slice(0, 3).map(p => (
                            <span key={p} className="text-[9px] font-mono bg-[#FAF8F3] border border-[#E7E2D8] px-1.5 py-0.25 rounded text-[#111111]">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-[#5C5C5C] uppercase block">Core Tech Stack</span>
                        <div className="flex flex-wrap gap-1">
                          {card.technologies.slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] font-mono text-[#5C5C5C]">
                              {t} •
                            </span>
                          ))}
                          <span className="text-[9px] font-mono text-[#5C5C5C]">more</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
