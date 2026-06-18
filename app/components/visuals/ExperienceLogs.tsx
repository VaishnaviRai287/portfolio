"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Calendar, Award, CheckCircle } from "lucide-react";

interface LogEntry {
  timestamp: string;
  category: "work" | "education";
  action: string;
  details: string;
  node: string;
}

export default function ExperienceLogs() {
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");
  const [bootSequence, setBootSequence] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(0);

  const logs: LogEntry[] = [
    {
      timestamp: "2023-07",
      category: "education",
      action: "System Initialization",
      details: "B.Tech in Computer Science launched at Manipal Institute of Technology.",
      node: "MIT-CS-Node1"
    },
    {
      timestamp: "2024-06",
      category: "education",
      action: "Algorithms Compilation",
      details: "Successfully compiled DSA coursework (Object-Oriented Programming, DBMS).",
      node: "MIT-CS-Node1"
    },
    {
      timestamp: "2025-02",
      category: "education",
      action: "Security Policies Activated",
      details: "Declared Cyber Security minor specialization.",
      node: "MIT-SEC-Node2"
    },
    {
      timestamp: "2025-05",
      category: "work",
      action: "Powergrid Internship Mount",
      details: "Mounted Computer Science Intern role at Powergrid Corporation of India.",
      node: "POWERGRID-Intern-0"
    },
    {
      timestamp: "2025-05",
      category: "work",
      action: "Dataset Ingestion Completed",
      details: "Processed multi-year transmission datasets and completed exploratory data analysis (EDA).",
      node: "POWERGRID-DB-1"
    },
    {
      timestamp: "2025-06",
      category: "work",
      action: "Forecasting Pipeline Developed",
      details: "Built demand forecasting models on grid datasets using PyTorch & statsmodels.",
      node: "POWERGRID-ML-2"
    },
    {
      timestamp: "2025-07",
      category: "work",
      action: "Demand Modeling Deployed",
      details: "Deployed pipelines supporting distribution planning and power load balancing.",
      node: "POWERGRID-PROD-3"
    },
    {
      timestamp: "2027-05",
      category: "education",
      action: "Final System Release",
      details: "B.Tech Program completion, graduation scheduled. Cum CGPA: 8.58.",
      node: "MIT-GRAD-4"
    }
  ];

  // Boot sequence animation
  useEffect(() => {
    if (!bootSequence) return;
    setVisibleCount(0);
    const interval = setInterval(() => {
      setVisibleCount(c => {
        if (c >= logs.length) {
          clearInterval(interval);
          setBootSequence(false);
          return c;
        }
        return c + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [bootSequence]);

  const filteredLogs = logs.slice(0, bootSequence ? visibleCount : logs.length).filter(
    log => filter === "all" || log.category === filter
  );

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans">
      {/* Terminal Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#111111]" />
          <span className="text-sm font-semibold tracking-tight text-[#111111] font-mono">system_logs --chronological</span>
        </div>
        <div className="flex items-center gap-2">
          {(["all", "work", "education"] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`text-[9px] font-mono border px-2 py-0.5 rounded transition duration-200 uppercase ${
                filter === type
                  ? "bg-[#111111] border-[#111111] text-[#FFFFFF]"
                  : "bg-white border-[#E7E2D8] text-[#5C5C5C] hover:bg-[#FAF8F3]"
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => setBootSequence(true)}
            className="text-[9px] font-mono border border-[#E7E2D8] px-2 py-0.5 rounded bg-white text-[#5C5C5C] hover:bg-[#FAF8F3] transition"
          >
            BOOT
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 bg-[#111111] text-[#E7E2D8] font-mono text-xs overflow-auto h-96 shadow-inner relative flex flex-col justify-between">
        <div className="space-y-4">
          <AnimatePresence>
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.timestamp + log.action}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-1"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#5C5C5C]">[{log.timestamp}]</span>
                  <span className="text-[#8B5CF6] font-bold">&lt;{log.node}&gt;</span>
                  <span className={`px-1.5 py-0.25 rounded text-[9px] font-bold uppercase ${
                    log.category === "work"
                      ? "bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30"
                      : "bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/30"
                  }`}>
                    {log.category}
                  </span>
                  <span className="text-[#FAF8F3] font-bold tracking-tight">{log.action}</span>
                </div>
                <div className="pl-6 text-[#A8A29E] text-[11px] leading-relaxed border-l border-[#333333] ml-[38px] py-0.5">
                  {log.details}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {bootSequence && (
            <div className="text-[10px] text-[#5C5C5C] italic flex items-center gap-1.5 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-ping" />
              Compiling system timeline variables...
            </div>
          )}
        </div>

        {/* Terminal Footer Info */}
        <div className="mt-8 border-t border-[#333333] pt-3 text-[10px] text-[#5C5C5C] flex flex-wrap items-center justify-between gap-2">
          <span>Entries: {filteredLogs.length} matching</span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" /> System verified (CGPA 8.58)
          </span>
        </div>
      </div>
    </div>
  );
}
