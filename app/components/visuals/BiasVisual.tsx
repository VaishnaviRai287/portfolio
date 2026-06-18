"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, ShieldCheck, Newspaper, Compass, ArrowRight } from "lucide-react";

export default function BiasVisual() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [biasScore, setBiasScore] = useState<number>(68); // 0-100 score
  const [confidence, setConfidence] = useState<number>(92.4);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(true);

  // Automatically cycle analysis pipeline step highlights
  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = (prev + 1) % 5;
        if (next === 0) {
          // Fluctuate scores slightly on completed cycles
          setBiasScore(Math.floor(60 + Math.random() * 20));
          setConfidence(Number((90 + Math.random() * 8).toFixed(1)));
        }
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      {/* Visual Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#EA580C]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">news_bias_detector.bin</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAnalyzing(!isAnalyzing)}
            className="text-[10px] font-mono border border-[#E7E2D8] px-2.5 py-1 rounded bg-[#FFFFFF] hover:bg-[#FAF8F3] transition duration-200"
          >
            {isAnalyzing ? "PAUSE PIPELINE" : "RUN ANALYSIS"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Left column: OCR Ingestion & Analysis Steps */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between border-r border-[#E7E2D8]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] mb-4">NLP Processing Stages</span>
          
          <div className="space-y-3 relative">
            {/* Step 0: Screenshot OCR */}
            <div className={`p-3 rounded border flex items-center justify-between transition-all duration-300 ${
              activeStep === 0 ? "bg-[#2563EB]/10 border-[#2563EB] translate-x-1" : "bg-[#FAF8F3] border-[#E7E2D8]"
            }`}>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#5C5C5C]" />
                <span className="text-[10.5px] font-mono font-semibold">1. Screenshot OCR Parsing</span>
              </div>
              <span className="text-[9px] font-mono text-[#5C5C5C]">{activeStep === 0 ? "EXTRACTING TEXT..." : "DONE"}</span>
            </div>

            {/* Step 1: Article Extraction */}
            <div className={`p-3 rounded border flex items-center justify-between transition-all duration-300 ${
              activeStep === 1 ? "bg-[#EA580C]/10 border-[#EA580C] translate-x-1" : "bg-[#FAF8F3] border-[#E7E2D8]"
            }`}>
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#5C5C5C]" />
                <span className="text-[10.5px] font-mono font-semibold">2. Named Entity Extraction</span>
              </div>
              <span className="text-[9px] font-mono text-[#5C5C5C]">{activeStep === 1 ? "PARSING ENTITIES..." : "DONE"}</span>
            </div>

            {/* Step 2: Cross-Source Fact-Check */}
            <div className={`p-3 rounded border flex items-center justify-between transition-all duration-300 ${
              activeStep === 2 ? "bg-[#16A34A]/10 border-[#16A34A] translate-x-1" : "bg-[#FAF8F3] border-[#E7E2D8]"
            }`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5C5C5C]" />
                <span className="text-[10.5px] font-mono font-semibold">3. Vector Source Fact Check</span>
              </div>
              <span className="text-[9px] font-mono text-[#5C5C5C]">{activeStep === 2 ? "FACT-CHECKING..." : "DONE"}</span>
            </div>

            {/* Step 3: Partisanship & Sentiment */}
            <div className={`p-3 rounded border flex items-center justify-between transition-all duration-300 ${
              activeStep === 3 ? "bg-[#8B5CF6]/10 border-[#8B5CF6] translate-x-1" : "bg-[#FAF8F3] border-[#E7E2D8]"
            }`}>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#5C5C5C]" />
                <span className="text-[10.5px] font-mono font-semibold">4. Sentiment Bias Analysis</span>
              </div>
              <span className="text-[9px] font-mono text-[#5C5C5C]">{activeStep === 3 ? "CLASSIFYING..." : "DONE"}</span>
            </div>
          </div>

          {/* Quick statement validation logs */}
          <div className="mt-6 border border-[#E7E2D8] bg-[#FAF8F3] rounded p-3 text-[9px] font-mono text-[#5C5C5C] space-y-1 select-none">
            <div className="flex justify-between">
              <span>Verified entities:</span>
              <span className="text-[#111111] font-bold">Government Outage Report</span>
            </div>
            <div className="flex justify-between">
              <span>Source Consensus:</span>
              <span className="text-[#16A34A] font-bold">94% Match (High)</span>
            </div>
            <div className="flex justify-between">
              <span>Hyper-partisan score:</span>
              <span className="text-[#EA580C] font-bold">2.4 / 10.0 (Low-Moderate)</span>
            </div>
          </div>
        </div>

        {/* Right column: Bias Meter Dial, Confidence Score */}
        <div className="lg:col-span-5 p-6 bg-[#FAF8F3] flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Pipeline Outputs</span>
              <h4 className="text-sm font-bold font-tight text-[#111111] mt-0.5">Bias Severity & Integrity Index</h4>
            </div>

            {/* Visual Dial (Scale representation) */}
            <div className="flex flex-col items-center py-4 relative">
              <svg className="w-40 h-24" viewBox="0 0 100 50">
                {/* Arc */}
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#E7E2D8" strokeWidth="6" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 50 50" fill="none" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
                <path d="M 50 50 A 40 40 0 0 1 90 50" fill="none" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
                
                {/* Needle */}
                <motion.line
                  x1="50"
                  y1="50"
                  x2={50 + 35 * Math.cos((Math.PI * (180 - (biasScore / 100) * 180)) / 180)}
                  y2={50 - 35 * Math.sin((Math.PI * (180 - (biasScore / 100) * 180)) / 180)}
                  stroke="#111111"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="4" fill="#111111" />
              </svg>
              
              <div className="text-center mt-2 space-y-1">
                <div className="text-xs font-mono font-bold text-[#111111]">
                  Bias Index: <span className="text-[#EA580C]">{biasScore} / 100</span>
                </div>
                <div className="text-[9px] font-mono uppercase text-[#5C5C5C] tracking-wide">
                  {biasScore < 40 ? "Left-Leaning" : biasScore > 60 ? "Right-Leaning" : "Center / Unbiased"}
                </div>
              </div>
            </div>

            {/* Simulated Confidence Index */}
            <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-3.5 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">CONFIDENCE</div>
                <div className="text-sm font-bold font-mono text-[#16A34A]">{confidence}%</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">FACT CHECK STATUS</div>
                <div className="text-xs font-mono font-bold text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded">CONSISTENT</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E7E2D8] text-[9.5px] font-mono text-[#5C5C5C] leading-normal flex items-start gap-1">
            <span>*</span>
            <span>Source validation compares article claims against 15+ verified global news agencies and public archives.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
