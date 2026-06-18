"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Fingerprint, Activity, HelpCircle, FileText, Play, CheckCircle } from "lucide-react";

interface Node {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  details: string[];
}

export default function ModelMeshVisual() {
  const [activeNode, setActiveNode] = useState<string>("ingest");
  const [driftLevel, setDriftLevel] = useState<number>(0.034);
  const [modelCount, setModelCount] = useState<number>(14);
  const [alertCount, setAlertCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "INFO: ModelMesh daemon initialized",
    "INFO: Monitoring active deployment readiness...",
  ]);

  // Nodes definition
  const nodes: Node[] = [
    {
      id: "ingest",
      name: "Model Upload & Ingestion",
      icon: <Upload className="w-5 h-5" />,
      color: "#2563EB", // Blue
      description: "Supports PyTorch, TensorFlow, and ONNX weights ingestion via FastAPI endpoints.",
      details: [
        "Validates model weights and tensors structural shape.",
        "Generates graph representations of network layers.",
        "Extracts metadata: layer count, total parameters, weight distributions.",
      ],
    },
    {
      id: "fingerprint",
      name: "Behavioral Fingerprinting",
      icon: <Fingerprint className="w-5 h-5" />,
      color: "#EA580C", // Orange
      description: "Generates high-dimensional behavioral signatures using reference probe datasets.",
      details: [
        "Runs 10,000+ synthetic reference probe forward passes.",
        "Extracts latent-space embeddings from intermediate layers.",
        "Saves immutable behavioral fingerprint profile to PostgreSQL storage.",
      ],
    },
    {
      id: "drift",
      name: "Drift Detection Engine",
      icon: <Activity className="w-5 h-5" />,
      color: "#16A34A", // Green
      description: "Monitors production inference data distributions against baseline training distributions.",
      details: [
        "Runs Kolmogorov-Smirnov statistical tests on feature vectors.",
        "Computes Population Stability Index (PSI) values on predictions.",
        "Triggers alert pipelines if feature distribution variance crosses threshold.",
      ],
    },
    {
      id: "explain",
      name: "SHAP Explainability",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "#8B5CF6", // Purple
      description: "Generates local and global explanation coefficients to profile feature importances.",
      details: [
        "Simulates Shapley value distributions to quantify feature attribution.",
        "Extracts top-n contributing features for individual inference outputs.",
        "Maps feature attribution trajectories across time series steps.",
      ],
    },
    {
      id: "report",
      name: "Validation Reporting",
      icon: <FileText className="w-5 h-5" />,
      color: "#2563EB", // Blue
      description: "Generates automated markdown / PDF validation certificates for compliance reviews.",
      details: [
        "Compiles performance metrics, latency benchmarks, and dataset health data.",
        "Packages model architecture diagrams into standardized schema formats.",
        "Issues cryptographically signed model deployment readiness status.",
      ],
    },
  ];

  // Random drift & metrics fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      // Small fluctuation
      setDriftLevel(prev => {
        const next = Math.max(0.01, Math.min(0.12, prev + (Math.random() - 0.5) * 0.015));
        if (next > 0.09 && Math.random() > 0.6) {
          setAlertCount(c => c + 1);
          setLogs(l => [`ALERT: Out-of-distribution drift detected! (PSI: ${(next * 1.5).toFixed(3)})`, ...l.slice(0, 7)]);
        }
        return next;
      });
      // Occasional log addition
      if (Math.random() > 0.7) {
        const sampleLogs = [
          "INFO: Ingested PyTorch model signature successfully",
          "INFO: Computed baseline fingerprint (dim=10240)",
          "INFO: Generated compliance report validation ID #948A",
          "INFO: Checking inference profile metrics...",
          "INFO: Connection to Upstash Redis database verified",
        ];
        const randomLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        setLogs(l => [randomLog, ...l.slice(0, 7)]);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeNodeData = nodes.find(n => n.id === activeNode) || nodes[0];

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      {/* Visual Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">modelmesh_orchestrator.service</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-[#5C5C5C]">Version: <span className="text-[#111111]">v2.4.1</span></span>
          <span className="text-[#5C5C5C]">Status: <span className="text-[#16A34A] font-bold">HEALTHY</span></span>
        </div>
      </div>

      {/* Main split dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Left Side: Pipeline visualization */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between border-r border-[#E7E2D8] relative min-h-[350px]">
          {/* Animated background data packets path */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 60,150 L 500,150" fill="none" stroke="#E7E2D8" strokeWidth="2" strokeDasharray="4,4" className="hidden lg:block" />
            </svg>
          </div>

          {/* Interactive Pipeline Nodes */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2 my-auto z-10">
            {nodes.map((node, index) => {
              const isActive = activeNode === node.id;
              return (
                <div key={node.id} className="flex flex-col items-center relative group w-full lg:w-32">
                  {/* Pipeline link line for mobile */}
                  {index > 0 && (
                    <div className="lg:hidden w-0.5 h-6 bg-[#E7E2D8] mb-2" />
                  )}

                  {/* Node Circle */}
                  <button
                    onClick={() => setActiveNode(node.id)}
                    className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-sm"
                    style={{
                      borderColor: isActive ? node.color : "#E7E2D8",
                      backgroundColor: isActive ? `${node.color}15` : "#FFFFFF",
                      color: isActive ? node.color : "#5C5C5C"
                    }}
                  >
                    {node.icon}
                    
                    {/* Pulsing indicator ring */}
                    {isActive && (
                      <span
                        className="absolute inset-[-4px] rounded-full border opacity-50 animate-ping"
                        style={{ borderColor: node.color }}
                      />
                    )}
                  </button>

                  <span className="mt-2 text-xs font-mono font-bold tracking-tight text-[#111111]">
                    {node.name.split(" ")[0]}
                  </span>

                  {/* Flow connection dot for desktop */}
                  {index < nodes.length - 1 && (
                    <div className="hidden lg:block absolute right-[-24px] top-6 pointer-events-none">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: node.color }}
                        animate={{ x: [0, 48] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5,
                          ease: "linear",
                          delay: index * 0.5
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Real-time system diagnostics counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E7E2D8] text-xs font-mono">
            <div className="bg-[#FAF8F3] p-2.5 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[10px]">MODELS PROFILED</div>
              <div className="text-sm font-bold text-[#111111]">{modelCount}</div>
            </div>
            <div className="bg-[#FAF8F3] p-2.5 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[10px]">DRIFT ALERTS</div>
              <div className="text-sm font-bold text-[#EA580C]">{alertCount}</div>
            </div>
            <div className="bg-[#FAF8F3] p-2.5 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[10px]">DRIFT INDEX (PSI)</div>
              <div className="text-sm font-bold text-[#16A34A]">{driftLevel.toFixed(3)}</div>
            </div>
            <div className="bg-[#FAF8F3] p-2.5 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[10px]">LATENCY (P95)</div>
              <div className="text-sm font-bold text-[#2563EB]">12.4ms</div>
            </div>
          </div>
        </div>

        {/* Right Side: Details panel and server logs terminal */}
        <div className="lg:col-span-4 p-6 bg-[#FAF8F3] flex flex-col justify-between min-h-[300px]">
          {/* Active node documentation details */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Pipeline Stage</span>
              <h4 className="text-base font-bold font-tight text-[#111111]">{activeNodeData.name}</h4>
            </div>
            <p className="text-xs text-[#5C5C5C] leading-relaxed">{activeNodeData.description}</p>
            
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Operations</span>
              <ul className="space-y-1.5">
                {activeNodeData.details.map((detail, idx) => (
                  <li key={idx} className="text-[11px] text-[#111111] flex items-start gap-1.5 leading-normal">
                    <span className="text-[#2563EB] mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mini-Terminal Log Output */}
          <div className="mt-6 border border-[#E7E2D8] bg-[#111111] text-[#E7E2D8] rounded p-3 font-mono text-[9px] h-32 overflow-hidden shadow-inner flex flex-col justify-end">
            <div className="flex-1 overflow-y-auto space-y-1 select-none scrollbar-thin">
              <AnimatePresence initial={false}>
                {logs.slice().reverse().map((log, index) => (
                  <motion.div
                    key={index + log}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={log.includes("ALERT") ? "text-[#EA580C] font-bold" : "text-[#A8A29E]"}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-1 text-[9px] border-t border-[#333333] pt-1.5 mt-1.5 text-[#5C5C5C]">
              <span>syslog-listener</span>
              <span className="w-1 h-2 bg-[#16A34A] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
