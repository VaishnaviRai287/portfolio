"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Github, ExternalLink, Cpu, ShieldAlert, FileCode, Database, MessageSquare } from "lucide-react";

interface Blueprint {
  id: string;
  title: string;
  category: string;
  nodes: string[];
  metrics: string[];
  technologies: string[];
  challenges: string;
  decisions: string;
  codeLink?: string;
  demoLink?: string;
  color: string;
  renderBlueprintSVG: () => React.ReactNode;
}

export default function SystemArchitectureGallery() {
  const [activeBlueprint, setActiveBlueprint] = useState<Blueprint | null>(null);
  const [hoveredBlueprintId, setHoveredBlueprintId] = useState<string | null>(null);

  const blueprints: Blueprint[] = [
    {
      id: "modelmesh",
      title: "ModelMesh Observability",
      category: "AI & MLOps",
      nodes: ["Model Upload", "Fingerprint Engine", "Drift Detection", "Explainability", "Report Generation"],
      metrics: ["Models Profiled: 14", "Inference Latency: 12.4ms", "Alerts: 0"],
      technologies: ["PyTorch", "FastAPI", "PostgreSQL", "statsmodels"],
      challenges: "Calculating high-dimensional statistical drift (PSI) dynamically at edge runtime without introducing query block latencies.",
      decisions: "Used Kolmogorov-Smirnov tests and asynchronous background workers to run data distribution analysis off the main event loop.",
      codeLink: "https://github.com/VaishnaviRai287/behavioral-model-observability-platform",
      color: "#2563EB",
      renderBlueprintSVG: () => (
        <svg className="w-full h-24" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#FAF8F3" strokeWidth="1">
            <rect x="5" y="20" width="30" height="15" rx="2" fill="#2563EB" opacity="0.1" stroke="#2563EB" />
            <rect x="45" y="20" width="30" height="15" rx="2" fill="#2563EB" opacity="0.1" stroke="#2563EB" />
            <rect x="85" y="20" width="30" height="15" rx="2" fill="#2563EB" opacity="0.1" stroke="#2563EB" />
            <rect x="125" y="20" width="30" height="15" rx="2" fill="#2563EB" opacity="0.1" stroke="#2563EB" />
            <rect x="165" y="20" width="30" height="15" rx="2" fill="#2563EB" opacity="0.1" stroke="#2563EB" />
          </g>
          <path d="M 35,27 L 45,27 M 75,27 L 85,27 M 115,27 L 125,27 M 155,27 L 165,27" stroke="#E7E2D8" strokeWidth="1" />
          <g fontFamily="monospace" fontSize="5" fill="#5C5C5C" textAnchor="middle">
            <text x="20" y="29">Ingest</text>
            <text x="60" y="29">Embed</text>
            <text x="100" y="29">Drift</text>
            <text x="140" y="29">SHAP</text>
            <text x="180" y="29">Report</text>
          </g>
          {/* Animated data packet */}
          <motion.circle
            cx="20"
            cy="27"
            r="1.5"
            fill="#2563EB"
            animate={{ cx: [20, 180] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </svg>
      )
    },
    {
      id: "mlvisualizer",
      title: "ML Visualizer",
      category: "Deep Learning",
      nodes: ["Dataset", "Training Loop", "Neural Network", "Decision Boundary", "Metrics Dashboard"],
      metrics: ["Dataset size: 80 points", "Accuracy: 98.4%", "Loss: 0.040"],
      technologies: ["React", "Django Channels", "WebSockets", "Scikit-Learn"],
      challenges: "Streaming high-frequency epoch metrics and classification boundary updates to client browsers without lagging UI frame refreshes.",
      decisions: "Implemented WebSocket protocol loops using Django Channels to push weights datasets and rendered boundaries on HTML5 Canvas.",
      codeLink: "https://github.com/VaishnaviRai287/MLVisualizer",
      color: "#EA580C",
      renderBlueprintSVG: () => (
        <svg className="w-full h-24" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          {/* Neural Net Nodes sketch */}
          <circle cx="20" cy="15" r="4" fill="#EA580C" opacity="0.2" stroke="#EA580C" />
          <circle cx="20" cy="45" r="4" fill="#EA580C" opacity="0.2" stroke="#EA580C" />
          <circle cx="60" cy="15" r="4" fill="#EA580C" opacity="0.2" stroke="#EA580C" />
          <circle cx="60" cy="30" r="4" fill="#EA580C" opacity="0.2" stroke="#EA580C" />
          <circle cx="60" cy="45" r="4" fill="#EA580C" opacity="0.2" stroke="#EA580C" />
          <circle cx="100" cy="30" r="4" fill="#EA580C" opacity="0.2" stroke="#EA580C" />
          
          <line x1="24" y1="15" x2="56" y2="15" stroke="#E7E2D8" strokeWidth="0.5" />
          <line x1="24" y1="15" x2="56" y2="30" stroke="#E7E2D8" strokeWidth="0.5" />
          <line x1="24" y1="15" x2="56" y2="45" stroke="#E7E2D8" strokeWidth="0.5" />
          <line x1="24" y1="45" x2="56" y2="15" stroke="#E7E2D8" strokeWidth="0.5" />
          <line x1="24" y1="45" x2="56" y2="30" stroke="#E7E2D8" strokeWidth="0.5" />
          <line x1="24" y1="45" x2="56" y2="45" stroke="#E7E2D8" strokeWidth="0.5" />
          
          <line x1="64" y1="15" x2="96" y2="30" stroke="#E7E2D8" strokeWidth="0.5" />
          <line x1="64" y1="30" x2="96" y2="30" stroke="#E7E2D8" strokeWidth="0.5" />
          <line x1="64" y1="45" x2="96" y2="30" stroke="#E7E2D8" strokeWidth="0.5" />
          
          <path d="M 104,30 L 140,30" stroke="#E7E2D8" strokeWidth="1" strokeDasharray="2,2" />
          <rect x="140" y="20" width="45" height="20" rx="2" fill="#FAF8F3" stroke="#E7E2D8" />
          <text x="162.5" y="32" fontFamily="monospace" fontSize="5" fill="#5C5C5C" textAnchor="middle">Boundary Map</text>
        </svg>
      )
    },
    {
      id: "apiforge",
      title: "APIForge (Django Compiler)",
      category: "Languages & Compilers",
      nodes: ["DSL Schema", "AST Parser", "Dependency Graph", "Code Generator"],
      metrics: ["Compile Latency: 4.82ms", "Test Coverage: 87%", "Models Parsed: 14"],
      technologies: ["Python Click CLI", "AST Analysis", "Pytest", "Django REST"],
      challenges: "Safely resolving relational cascades and ForeignKeys during migrations without generating cyclic database dependencies.",
      decisions: "Designed directed graph cycle detection passes ($O(V+E)$) to linearize dependency order before invoking models generator compiler.",
      codeLink: "https://github.com/VaishnaviRai287/Django-Rest-Synthesizer",
      color: "#16A34A",
      renderBlueprintSVG: () => (
        <svg className="w-full h-24" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="30" height="20" rx="2" fill="#FAF8F3" stroke="#E7E2D8" />
          <text x="25" y="32" fontFamily="monospace" fontSize="5" fill="#5C5C5C" textAnchor="middle">DSL Schema</text>
          
          <path d="M 40,30 L 70,30" stroke="#E7E2D8" strokeWidth="1" />
          <circle cx="70" cy="30" r="3" fill="#16A34A" />
          
          <rect x="90" y="10" width="40" height="40" rx="2" fill="#16A34A" opacity="0.1" stroke="#16A34A" />
          <text x="110" y="25" fontFamily="monospace" fontSize="4.5" fill="#16A34A" textAnchor="middle" fontWeight="bold">AST & Graph</text>
          <text x="110" y="35" fontFamily="monospace" fontSize="4" fill="#5C5C5C" textAnchor="middle">Dependency check</text>
          <text x="110" y="43" fontFamily="monospace" fontSize="3.5" fill="#5C5C5C" textAnchor="middle">O(V + E)</text>
          
          <path d="M 130,30 L 160,30" stroke="#E7E2D8" strokeWidth="1" />
          <circle cx="160" cy="30" r="3" fill="#16A34A" />
          
          <rect x="165" y="20" width="30" height="20" rx="2" fill="#FAF8F3" stroke="#E7E2D8" />
          <text x="180" y="32" fontFamily="monospace" fontSize="5" fill="#5C5C5C" textAnchor="middle">models.py</text>
        </svg>
      )
    },
    {
      id: "pdfchatbot",
      title: "RAG PDF Chatbot",
      category: "Data Infrastructure",
      nodes: ["Document", "Chunking", "Embedding", "FAISS Search", "LLM Context", "Response"],
      metrics: ["FAISS Search Latency: 2.4ms", "LLM Overhead: 185ms", "Vector Dim: 1536"],
      technologies: ["FAISS Index", "OpenAI Embeddings", "LlamaIndex", "Django"],
      challenges: "Reducing retrieval latency while avoiding context truncation inside prompts under strict model token constraints.",
      decisions: "Used sliding window chunk overlaps (100 tokens overlap) and nearest neighbor embeddings caching.",
      color: "#8B5CF6",
      renderBlueprintSVG: () => (
        <svg className="w-full h-24" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#FAF8F3" strokeWidth="1">
            <rect x="5" y="20" width="25" height="15" rx="2" fill="#8B5CF6" opacity="0.1" stroke="#8B5CF6" />
            <rect x="40" y="20" width="25" height="15" rx="2" fill="#8B5CF6" opacity="0.1" stroke="#8B5CF6" />
            <rect x="75" y="20" width="25" height="15" rx="2" fill="#8B5CF6" opacity="0.1" stroke="#8B5CF6" />
            <rect x="110" y="20" width="30" height="15" rx="2" fill="#8B5CF6" opacity="0.1" stroke="#8B5CF6" />
            <rect x="150" y="20" width="45" height="15" rx="2" fill="#8B5CF6" opacity="0.1" stroke="#8B5CF6" />
          </g>
          <path d="M 30,27 L 40,27 M 65,27 L 75,27 M 100,27 L 110,27 M 140,27 L 150,27" stroke="#E7E2D8" strokeWidth="1" />
          <g fontFamily="monospace" fontSize="4" fill="#5C5C5C" textAnchor="middle">
            <text x="17.5" y="29">PDF</text>
            <text x="52.5" y="29">Chunk</text>
            <text x="87.5" y="29">Embed</text>
            <text x="125" y="29">FAISS Index</text>
            <text x="172.5" y="29">Llama Prompt</text>
          </g>
          {/* Flow packet */}
          <motion.circle
            cx="17.5"
            cy="27"
            r="1"
            fill="#8B5CF6"
            animate={{ cx: [17.5, 172.5] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          />
        </svg>
      )
    },
    {
      id: "filerecovery",
      title: "File Recovery Forensics",
      category: "Cybersecurity & Forensics",
      nodes: ["Disk Image", "Sector Scan", "Signature Match", "Fragment Trace", "File Restore"],
      metrics: ["Sectors Scanned: 1,048,576", "Files Carver: 42", "Accuracy: 98.6%"],
      technologies: ["XFS Forensics", "Inode Traversal", "File Carving", "C/Python"],
      challenges: "Reassembling highly fragmented files when sector headers do not align with consecutive cluster bounds.",
      decisions: "Utilized multi-weighted block pattern scanning heuristics to match file trailers and headers.",
      codeLink: "https://github.com/VaishnaviRai287/File-Recovery",
      color: "#EA580C",
      renderBlueprintSVG: () => (
        <svg className="w-full h-24" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          {/* Sector sweep graphic */}
          <rect x="10" y="10" width="80" height="40" rx="3" fill="#FAF8F3" stroke="#E7E2D8" />
          <line x1="10" y1="10" x2="90" y2="50" stroke="#E7E2D8" strokeWidth="0.5" />
          
          {/* Sweeping line */}
          <motion.line
            x1="10"
            y1="10"
            x2="10"
            y2="50"
            stroke="#EA580C"
            strokeWidth="1.5"
            animate={{ x: [0, 80, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          <path d="M 90,30 L 120,30" stroke="#E7E2D8" strokeWidth="1" />
          <rect x="125" y="15" width="65" height="30" rx="2" fill="#EA580C" opacity="0.1" stroke="#EA580C" />
          <g fontFamily="monospace" fontSize="4.5" fill="#5C5C5C" textAnchor="middle">
            <text x="157.5" y="28" fill="#EA580C" fontWeight="bold">Signature Match</text>
            <text x="157.5" y="38">Recovering files...</text>
          </g>
        </svg>
      )
    },
    {
      id: "emailphishing",
      title: "Email Phishing Detection",
      category: "Cybersecurity & Forensics",
      nodes: ["Email", "Header Scan", "URL Check", "Feature Extraction", "ML Prediction", "Report"],
      metrics: ["Threat Score Accuracy: 94%", "Scan Overhead: 329.4ms", "SPF check: Fail"],
      technologies: ["CountVectorizer", "SPF/DKIM parser", "Heuristic Classifiers", "Flask"],
      challenges: "Detecting highly complex homograph URL attacks and newly registered domain profiles.",
      decisions: "Constructed deep envelope checkers that compute WHOIS domain age logs and match homograph chars dynamically.",
      codeLink: "https://github.com/VaishnaviRai287/Email-Phishing-Detection",
      color: "#EA580C",
      renderBlueprintSVG: () => (
        <svg className="w-full h-24" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="20" width="30" height="20" rx="2" fill="#FAF8F3" stroke="#E7E2D8" />
          <text x="20" y="32" fontFamily="monospace" fontSize="4.5" fill="#5C5C5C" textAnchor="middle">Raw Email</text>
          
          <path d="M 35,30 L 60,30" stroke="#E7E2D8" strokeWidth="1" />
          
          <rect x="65" y="15" width="70" height="30" rx="2" fill="#EA580C" opacity="0.1" stroke="#EA580C" />
          <g fontFamily="monospace" fontSize="4.5" fill="#5C5C5C" textAnchor="middle">
            <text x="100" y="28" fill="#EA580C" fontWeight="bold">Heuristic Scan</text>
            <text x="100" y="38">Domain / SPF checks</text>
          </g>

          <path d="M 135,30 L 160,30" stroke="#E7E2D8" strokeWidth="1" />
          
          <rect x="165" y="20" width="30" height="20" rx="2" fill="#FAF8F3" stroke="#E7E2D8" />
          <text x="180" y="32" fontFamily="monospace" fontSize="4.5" fill="#EA580C" textAnchor="middle" fontWeight="bold">Risk Report</text>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Wall Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-[#E7E2D8] rounded-2xl overflow-hidden">
        {blueprints.map(bp => {
          const isHovered = hoveredBlueprintId === bp.id;
          return (
            <motion.div
              key={bp.id}
              layout
              onMouseEnter={() => setHoveredBlueprintId(bp.id)}
              onMouseLeave={() => setHoveredBlueprintId(null)}
              onClick={() => setActiveBlueprint(bp)}
              className="border-r border-b border-[#E7E2D8] bg-[#FFFFFF] p-5 flex flex-col justify-between h-[19.5rem] hover:bg-[#FAF8F3]/30 transition duration-300 shadow-sm cursor-pointer relative"
              style={{
                boxShadow: isHovered ? `0 10px 30px -10px ${bp.color}15` : "none"
              }}
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#5C5C5C] font-bold uppercase tracking-wider bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E7E2D8]">
                    {bp.category}
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-[#5C5C5C] hover:text-[#111111] transition duration-200" />
                </div>
                <h3 className="text-sm font-bold tracking-tight text-[#111111] font-tight">{bp.title}</h3>
              </div>

              {/* Blueprint SVG Representation */}
              <div className="border border-[#E7E2D8] bg-[#FAF8F3] rounded p-2 flex items-center justify-center relative shadow-inner overflow-hidden select-none">
                {/* Dotted grid lines inside SVG */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                  backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
                  backgroundSize: "8px 8px"
                }} />
                {bp.renderBlueprintSVG()}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1 border-t border-[#E7E2D8] pt-2.5">
                {bp.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[9px] font-mono text-[#5C5C5C]">
                    {tech} •
                  </span>
                ))}
                <span className="text-[9px] font-mono text-[#5C5C5C] font-bold">Trace Specs</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Details Modal Drawer */}
      <AnimatePresence>
        {activeBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#FFFFFF] border border-[#E7E2D8] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[#E7E2D8] bg-[#FAF8F3] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">{activeBlueprint.category}</span>
                  <h4 className="text-base font-bold font-tight text-[#111111]">{activeBlueprint.title} Blueprint</h4>
                </div>
                <button
                  onClick={() => setActiveBlueprint(null)}
                  className="p-1 rounded-full border border-[#E7E2D8] bg-[#FFFFFF] hover:bg-[#FAF8F3] transition text-[#5C5C5C] hover:text-[#111111]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                
                {/* SVG Blueprint */}
                <div className="border border-[#E7E2D8] bg-[#FAF8F3] rounded-xl p-4 flex items-center justify-center relative overflow-hidden shadow-inner select-none">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
                    backgroundSize: "12px 12px"
                  }} />
                  {activeBlueprint.renderBlueprintSVG()}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Challenges & Design */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Engineering Challenges</span>
                      <p className="text-xs text-[#5C5C5C] leading-relaxed">{activeBlueprint.challenges}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Design Decisions</span>
                      <p className="text-xs text-[#5C5C5C] leading-relaxed">{activeBlueprint.decisions}</p>
                    </div>
                  </div>

                  {/* Right Column: Tech & Metrics */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Pipeline Nodes</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeBlueprint.nodes.map(node => (
                          <span key={node} className="text-[10px] font-mono bg-[#FAF8F3] border border-[#E7E2D8] px-2 py-0.5 rounded text-[#111111]">
                            {node}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Telemetry Benchmarks</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {activeBlueprint.metrics.map(met => (
                          <div key={met} className="text-[10.5px] font-mono bg-[#FAF8F3] border border-[#E7E2D8] px-2 py-1 rounded text-[#111111] font-bold">
                            {met}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack checklist */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Technology Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeBlueprint.technologies.map(tech => (
                      <span key={tech} className="text-[10px] font-mono bg-[#FFFFFF] border border-[#E7E2D8] px-2.5 py-1 rounded-full text-[#111111] font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="px-6 py-4 border-t border-[#E7E2D8] bg-[#FAF8F3] flex items-center justify-end gap-3">
                {activeBlueprint.codeLink && (
                  <a
                    href={activeBlueprint.codeLink}
                    target="_blank"
                    className="flex items-center gap-1.5 px-4 py-2 border border-[#E7E2D8] bg-[#FFFFFF] text-[#5C5C5C] hover:text-[#111111] text-xs font-mono font-bold rounded-lg shadow-sm hover:bg-[#FAF8F3] transition duration-200"
                  >
                    <Github className="w-3.5 h-3.5" /> Source Code
                  </a>
                )}
                {activeBlueprint.demoLink && (
                  <a
                    href={activeBlueprint.demoLink}
                    target="_blank"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-[#FFFFFF] hover:bg-[#2563EB]/90 text-xs font-mono font-bold rounded-lg shadow transition duration-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
