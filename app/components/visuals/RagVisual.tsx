"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, Database, MessageSquare, ArrowRight, Play, AlertCircle } from "lucide-react";

export default function RagVisual() {
  const [pipelineState, setPipelineState] = useState<"idle" | "ingesting" | "chunking" | "embedding" | "retrieval" | "llm" | "complete">("idle");
  const [queryInput, setQueryInput] = useState<string>("What is the system's drift threshold?");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [latencyMetrics, setLatencyMetrics] = useState({
    ingest: "0ms",
    chunk: "0ms",
    vectorize: "0ms",
    faiss: "0ms",
    generation: "0ms",
    total: "0ms"
  });

  const runRagPipeline = () => {
    if (pipelineState !== "idle" && pipelineState !== "complete") return;
    
    setPipelineState("ingesting");
    setChatResponse("");
    setLatencyMetrics({
      ingest: "...ms",
      chunk: "...ms",
      vectorize: "...ms",
      faiss: "...ms",
      generation: "...ms",
      total: "...ms"
    });

    // Step 1: Ingest
    setTimeout(() => {
      setPipelineState("chunking");
      setLatencyMetrics(m => ({ ...m, ingest: "45ms" }));
    }, 1000);

    // Step 2: Chunking
    setTimeout(() => {
      setPipelineState("embedding");
      setLatencyMetrics(m => ({ ...m, chunk: "12ms" }));
    }, 2000);

    // Step 3: Embeddings
    setTimeout(() => {
      setPipelineState("retrieval");
      setLatencyMetrics(m => ({ ...m, vectorize: "85ms" }));
    }, 3200);

    // Step 4: FAISS Search
    setTimeout(() => {
      setPipelineState("llm");
      setLatencyMetrics(m => ({ ...m, faiss: "2.4ms" }));
    }, 4500);

    // Step 5: LLM Generation
    setTimeout(() => {
      setPipelineState("complete");
      setChatResponse("The system's drift threshold is set to a Population Stability Index (PSI) of 0.100. Any variance crossing this threshold triggers a critical alert.");
      setLatencyMetrics(m => ({
        ...m,
        generation: "185ms",
        total: "329.4ms"
      }));
    }, 6000);
  };

  useEffect(() => {
    runRagPipeline();
  }, []);

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      {/* Visual Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">rag_pipeline_agent.ts</h3>
        </div>
        <button
          onClick={runRagPipeline}
          disabled={pipelineState !== "idle" && pipelineState !== "complete"}
          className={`text-[10px] font-mono border px-3 py-1 rounded bg-[#2563EB] text-white hover:bg-[#2563EB]/90 transition duration-200 ${
            pipelineState !== "idle" && pipelineState !== "complete" ? "opacity-55 cursor-not-allowed" : ""
          }`}
        >
          {pipelineState !== "idle" && pipelineState !== "complete" ? "QUERYING..." : "QUERY PIPELINE"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Left column: Pipeline visual stream */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between border-r border-[#E7E2D8] relative min-h-[350px]">
          {/* Animated SVG Path for RAG steps */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 60,80 L 160,80 L 160,180 L 320,180 L 320,80 L 480,80" fill="none" stroke="#E7E2D8" strokeWidth="2" strokeDasharray="4,4" className="hidden lg:block" />
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center my-auto z-10">
            {/* Step 1: PDF Ingest */}
            <div className={`p-3 rounded border flex flex-col items-center text-center transition-all duration-300 ${
              pipelineState === "ingesting" || pipelineState === "chunking" ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#111111]"
            }`}>
              <FileText className="w-6 h-6 mb-1.5" />
              <span className="text-[10px] font-mono font-bold">PDF Ingestion</span>
              <span className="text-[8px] text-[#5C5C5C] font-mono mt-0.5">threshold_config.pdf</span>
            </div>

            {/* Step 2: Vector Embeddings */}
            <div className={`p-3 rounded border flex flex-col items-center text-center transition-all duration-300 ${
              pipelineState === "embedding" ? "bg-[#EA580C]/10 border-[#EA580C] text-[#EA580C]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#111111]"
            }`}>
              <Search className="w-6 h-6 mb-1.5" />
              <span className="text-[10px] font-mono font-bold">Vectorization</span>
              <span className="text-[8px] text-[#5C5C5C] font-mono mt-0.5">Ada-002: 1536 dim</span>
            </div>

            {/* Step 3: FAISS Index Store */}
            <div className={`p-3 rounded border flex flex-col items-center text-center transition-all duration-300 ${
              pipelineState === "retrieval" ? "bg-[#16A34A]/10 border-[#16A34A] text-[#16A34A]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#111111]"
            }`}>
              <Database className="w-6 h-6 mb-1.5" />
              <span className="text-[10px] font-mono font-bold">FAISS Retrieval</span>
              <span className="text-[8px] text-[#5C5C5C] font-mono mt-0.5">Top K=3 chunks</span>
            </div>

            {/* Step 4: LLM Generation */}
            <div className={`p-3 rounded border flex flex-col items-center text-center transition-all duration-300 ${
              pipelineState === "llm" ? "bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#111111]"
            }`}>
              <MessageSquare className="w-6 h-6 mb-1.5" />
              <span className="text-[10px] font-mono font-bold">LLM Ingestion</span>
              <span className="text-[8px] text-[#5C5C5C] font-mono mt-0.5">Llama-3-70B-Instruct</span>
            </div>
          </div>

          {/* Latency statistics row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-6 border-t border-[#E7E2D8] text-xs font-mono">
            <div className="bg-[#FAF8F3] p-2 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[9px]">INGESTION</div>
              <div className="text-xs font-bold text-[#111111]">{latencyMetrics.ingest}</div>
            </div>
            <div className="bg-[#FAF8F3] p-2 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[9px]">CHUNKING</div>
              <div className="text-xs font-bold text-[#111111]">{latencyMetrics.chunk}</div>
            </div>
            <div className="bg-[#FAF8F3] p-2 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[9px]">EMBEDDINGS</div>
              <div className="text-xs font-bold text-[#111111]">{latencyMetrics.vectorize}</div>
            </div>
            <div className="bg-[#FAF8F3] p-2 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[9px]">FAISS SEARCH</div>
              <div className="text-xs font-bold text-[#16A34A]">{latencyMetrics.faiss}</div>
            </div>
            <div className="bg-[#FAF8F3] p-2 rounded border border-[#E7E2D8]">
              <div className="text-[#5C5C5C] text-[9px]">LLM LATENCY</div>
              <div className="text-xs font-bold text-[#2563EB]">{latencyMetrics.generation}</div>
            </div>
          </div>
        </div>

        {/* Right column: Query and RAG Output stream */}
        <div className="lg:col-span-4 p-6 bg-[#FAF8F3] flex flex-col justify-between min-h-[300px]">
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Pipeline Query</span>
              <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-2.5 font-mono text-[10.5px] text-[#111111] leading-relaxed shadow-sm">
                {queryInput}
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">System Response</span>
              <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-3 font-sans text-xs text-[#111111] leading-relaxed min-h-[120px] relative shadow-sm">
                <AnimatePresence mode="wait">
                  {chatResponse ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {chatResponse}
                    </motion.div>
                  ) : (
                    <div className="text-[#5C5C5C] italic font-mono text-[10px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-ping" />
                      Streaming response context...
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Performance indicator info */}
          <div className="mt-4 pt-4 border-t border-[#E7E2D8] flex items-center justify-between text-[10px] font-mono text-[#5C5C5C]">
            <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Pipeline Overhead</span>
            <span className="text-[#111111] font-bold">Total execution time: {latencyMetrics.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
