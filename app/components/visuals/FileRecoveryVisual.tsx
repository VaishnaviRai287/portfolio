"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, ShieldAlert, Cpu, CheckCircle, Search, Compass, RefreshCw } from "lucide-react";

type Stage = "idle" | "signatures" | "fragmentation" | "chaining" | "validation" | "restored";

export default function FileRecoveryVisual() {
  const [stage, setStage] = useState<Stage>("idle");
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [sectors, setSectors] = useState<{ status: "healthy" | "deleted" | "recovered"; id: number }[]>([]);
  const [sweepIndex, setSweepIndex] = useState<number>(0);
  const [metrics, setMetrics] = useState({
    recovered: 0,
    successRate: 0,
    scanned: 0,
    size: "0 GB",
    corrupted: 0
  });

  // Generate initial sector grid (16x16 = 256 sectors to keep it highly performant and responsive)
  useEffect(() => {
    const list: { id: number; status: "healthy" | "deleted" | "recovered" }[] = [];
    for (let i = 0; i < 256; i++) {
      // Randomly assign some deleted files fragments
      const isDeleted = i > 40 && i < 60 || i > 120 && i < 135 || i > 200 && i < 215;
      list.push({
        id: i,
        status: isDeleted ? "deleted" : "healthy"
      });
    }
    setSectors(list);
  }, []);

  // Run scanner loop simulation
  useEffect(() => {
    if (!isScanning) return;

    let idx = 0;
    const interval = setInterval(() => {
      // Sweep row by row
      setSweepIndex(idx);
      
      // Update sector status as sweep crosses them
      setSectors(prev => {
        return prev.map((sec, i) => {
          // If the sweep cursor passes the index and it was deleted, change it to recovered!
          if (i <= idx && sec.status === "deleted") {
            return { ...sec, status: "recovered" };
          }
          return sec;
        });
      });

      // Update scanned counter
      setMetrics(m => {
        const nextScanned = Math.min(1048576, Math.floor((idx / 256) * 1048576));
        const numRecovered = Math.floor((idx / 256) * 42);
        const nextCorrupted = Math.floor((idx / 256) * 3);
        const nextSize = ((idx / 256) * 12.8).toFixed(1);
        return {
          scanned: nextScanned,
          recovered: numRecovered,
          successRate: idx > 10 ? Math.min(98.6, 90 + (idx / 256) * 8.6) : 0,
          corrupted: nextCorrupted,
          size: `${nextSize} GB`
        };
      });

      // Update pipeline stage based on scanner position
      if (idx === 0) setStage("signatures");
      else if (idx === 60) setStage("fragmentation");
      else if (idx === 140) setStage("chaining");
      else if (idx === 200) setStage("validation");
      else if (idx === 255) {
        setStage("restored");
        setIsScanning(false);
      }

      idx = (idx + 1) % 256;
    }, 60);

    return () => clearInterval(interval);
  }, [isScanning]);

  const restartRecovery = () => {
    // Reset sectors
    setSectors(prev => prev.map(sec => ({
      ...sec,
      status: (sec.id > 40 && sec.id < 60 || sec.id > 120 && sec.id < 135 || sec.id > 200 && sec.id < 215) ? "deleted" : "healthy"
    })));
    setSweepIndex(0);
    setStage("signatures");
    setIsScanning(true);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      
      {/* Forensic Workstation Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">forensic_workstation_xfs.sh</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className="text-[10px] font-mono border border-[#E7E2D8] px-2.5 py-1 rounded bg-[#FFFFFF] hover:bg-[#FAF8F3] transition duration-200"
          >
            {isScanning ? "HALT" : "RESUME"}
          </button>
          <button
            onClick={restartRecovery}
            className="text-[10px] font-mono border border-[#E7E2D8] p-1 rounded bg-[#FFFFFF] hover:bg-[#FAF8F3] transition duration-200"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#5C5C5C]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        
        {/* Left Side: Interactive Sector Map Grid */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between border-r border-[#E7E2D8] relative">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Interactive Sector Grid</span>
              <div className="flex items-center gap-3 text-[9px] font-mono text-[#5C5C5C]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#E7E2D8]" /> Healthy</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#EA580C]" /> Deleted</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#16A34A] animate-pulse" /> Recovered</span>
              </div>
            </div>

            {/* Grid of 256 sectors */}
            <div className="grid gap-[2px] bg-[#FAF8F3] border border-[#E7E2D8] p-2.5 rounded relative shadow-inner" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
              {sectors.map((sec, idx) => {
                const isSweep = idx === sweepIndex;
                return (
                  <div
                    key={sec.id}
                    className={`aspect-square rounded-sm transition-all duration-300 ${
                      isSweep
                        ? "bg-[#2563EB] scale-110 shadow-md ring-1 ring-[#2563EB]"
                        : sec.status === "deleted"
                        ? "bg-[#EA580C]"
                        : sec.status === "recovered"
                        ? "bg-[#16A34A]"
                        : "bg-[#FFFFFF] border border-[#E7E2D8]"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Core pipeline hero diagram details */}
          <div className="mt-6 pt-4 border-t border-[#E7E2D8]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] block mb-3">Ingestion & Analysis Pipeline</span>
            <div className="grid grid-cols-6 gap-1 md:gap-2 text-center text-[8px] sm:text-[9px] font-mono select-none">
              <div className={`p-1 border rounded ${stage === "signatures" ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                Disk Image
              </div>
              <div className={`p-1 border rounded ${stage === "fragmentation" ? "bg-[#EA580C]/10 border-[#EA580C] text-[#EA580C]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                Sector Scan
              </div>
              <div className={`p-1 border rounded ${stage === "chaining" ? "bg-[#16A34A]/10 border-[#16A34A] text-[#16A34A]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                Signatures
              </div>
              <div className={`p-1 border rounded ${stage === "validation" ? "bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                Chaining
              </div>
              <div className={`p-1 border rounded ${stage === "restored" ? "bg-[#16A34A]/10 border-[#16A34A] text-[#16A34A] font-bold animate-pulse" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                Rebuilt
              </div>
              <div className={`p-1 border rounded ${stage === "restored" ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                Recovered
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Recovery Process Stages & Metrics */}
        <div className="lg:col-span-4 p-6 bg-[#FAF8F3] flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Analysis Console</span>
              <h4 className="text-sm font-bold font-tight text-[#111111] mt-0.5">XFS Partition Inode Carver</h4>
            </div>

            {/* Stages visualization */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Carver Progress Logs</span>
              
              <div className="space-y-2">
                {[
                  { key: "signatures", label: "Stage 1: Scan for Magic Signatures" },
                  { key: "fragmentation", label: "Stage 2: Trace Fragmented Blocks" },
                  { key: "chaining", label: "Stage 3: Reconstruct Inode Chain" },
                  { key: "validation", label: "Stage 4: Verify MD5/SHA256 Hash" },
                  { key: "restored", label: "Stage 5: Restore Target File" }
                ].map((st, i) => {
                  const isCurrent = stage === st.key;
                  const isPassed = ["signatures", "fragmentation", "chaining", "validation", "restored"].indexOf(stage) >= i;
                  return (
                    <div
                      key={st.key}
                      className={`p-2 rounded border text-[10.5px] font-mono transition duration-300 flex items-center justify-between ${
                        isCurrent
                          ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB] font-bold"
                          : isPassed
                          ? "bg-[#16A34A]/5 border-[#16A34A]/20 text-[#16A34A]"
                          : "bg-white border-[#E7E2D8] text-[#5C5C5C]"
                      }`}
                    >
                      <span>{st.label}</span>
                      {isPassed && !isCurrent ? (
                        <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                      ) : isCurrent ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Workstation Metrics */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Session Statistics</span>
              
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-2.5 rounded text-center">
                  <div className="text-[8.5px] text-[#5C5C5C] uppercase">Files Carver</div>
                  <div className="text-sm font-bold text-[#111111]">{metrics.recovered} / 42</div>
                </div>
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-2.5 rounded text-center">
                  <div className="text-[8.5px] text-[#5C5C5C] uppercase">Success Rate</div>
                  <div className="text-sm font-bold text-[#16A34A]">{metrics.successRate.toFixed(1)}%</div>
                </div>
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-2.5 rounded text-center col-span-2">
                  <div className="text-[8.5px] text-[#5C5C5C] uppercase">Sectors Scanned</div>
                  <div className="text-xs font-bold text-[#111111]">{metrics.scanned.toLocaleString()} / 1,048,576</div>
                </div>
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-2.5 rounded text-center">
                  <div className="text-[8.5px] text-[#5C5C5C] uppercase">Size Recovered</div>
                  <div className="text-xs font-bold text-[#2563EB]">{metrics.size}</div>
                </div>
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-2.5 rounded text-center">
                  <div className="text-[8.5px] text-[#5C5C5C] uppercase">Corrupted</div>
                  <div className="text-xs font-bold text-[#EA580C]">{metrics.corrupted}</div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-[#E7E2D8] text-[9.5px] font-mono text-[#5C5C5C] leading-normal flex items-start gap-1 select-none">
            <span>*</span>
            <span>Signature mapping supports PDF, SQLite, ELF, JPEG, and ZIP headers.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
