"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, BarChart2, ShieldAlert } from "lucide-react";

export default function MLVisualizerVisual() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [epoch, setEpoch] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(76.2);
  const [loss, setLoss] = useState<number>(0.54);
  const [datasetType, setDatasetType] = useState<"circle" | "xor">("circle");
  const [lossHistory, setLossHistory] = useState<number[]>([0.54]);

  // Handle epoch loop training simulation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setEpoch(prev => {
        const nextEpoch = prev + 1;
        
        // Calculate dynamic accuracy and loss based on epoch count
        let targetAcc = 98.4;
        let targetLoss = 0.04;
        if (datasetType === "xor") {
          targetAcc = 94.2;
          targetLoss = 0.08;
        }

        // Asymptotic convergence
        const factor = Math.min(1, nextEpoch / 150);
        const nextAcc = 75 + factor * (targetAcc - 75) + (Math.random() - 0.5) * 0.8;
        const nextLoss = 0.6 - factor * (0.6 - targetLoss) + (Math.random() - 0.5) * 0.015;

        setAccuracy(Math.min(100, Math.max(0, nextAcc)));
        setLoss(Math.max(0, nextLoss));
        setLossHistory(h => [...h.slice(-20), nextLoss]);

        // Reset loop after 300 epochs
        if (nextEpoch >= 300) {
          setLossHistory([0.6]);
          return 0;
        }
        return nextEpoch;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, datasetType]);

  // Restart training simulation
  const handleRestart = () => {
    setEpoch(0);
    setAccuracy(75.0);
    setLoss(0.6);
    setLossHistory([0.6]);
  };

  // Generate dataset points
  const points = React.useMemo(() => {
    const arr = [];
    const numPoints = 80;
    for (let i = 0; i < numPoints; i++) {
      if (datasetType === "circle") {
        // Circle dataset: inner class A, outer class B
        const r = i < numPoints / 2 ? Math.random() * 35 : 45 + Math.random() * 35;
        const theta = Math.random() * Math.PI * 2;
        const x = 100 + r * Math.cos(theta);
        const y = 80 + r * Math.sin(theta);
        arr.push({ x, y, label: i < numPoints / 2 ? 0 : 1 });
      } else {
        // XOR dataset: quadrants
        const x = Math.random() * 160 + 20;
        const y = Math.random() * 120 + 20;
        const xCent = x - 100;
        const yCent = y - 80;
        const label = (xCent * yCent > 0) ? 0 : 1;
        arr.push({ x, y, label });
      }
    }
    return arr;
  }, [datasetType]);

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      {/* Visual Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">neural_network_trainer.py</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDatasetType(prev => prev === "circle" ? "xor" : "circle")}
            className="text-[10px] font-mono border border-[#E7E2D8] px-2 py-1 rounded bg-[#FFFFFF] hover:bg-[#FAF8F3] transition duration-200"
          >
            Dataset: {datasetType.toUpperCase()}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[10px] font-mono border border-[#E7E2D8] px-2.5 py-1 rounded bg-[#FFFFFF] hover:bg-[#FAF8F3] transition duration-200"
          >
            {isPlaying ? "PAUSE" : "TRAIN"}
          </button>
          <button
            onClick={handleRestart}
            className="text-[10px] font-mono border border-[#E7E2D8] p-1.5 rounded bg-[#FFFFFF] hover:bg-[#FAF8F3] transition duration-200"
          >
            <RotateCcw className="w-3 h-3 text-[#5C5C5C]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Left column: Live Decision Boundary Space */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-center items-center border-r border-[#E7E2D8]">
          <div className="relative w-full aspect-[4/3] max-w-[340px] border border-[#E7E2D8] bg-[#FAF8F3] rounded overflow-hidden shadow-inner">
            {/* Live shifting decision boundary SVG outline */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 160">
              {/* Dynamic boundary based on epoch Convergence */}
              {datasetType === "circle" ? (
                // Shifting circular boundary
                <motion.circle
                  cx="100"
                  cy="80"
                  r={Math.min(90, Math.max(30, 42 + (1 - Math.min(1, epoch / 150)) * 24))}
                  fill="rgba(37, 99, 235, 0.06)"
                  stroke="#2563EB"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
              ) : (
                // Shifting XOR division paths
                <g>
                  <motion.path
                    d={`M 100 0 L 100 160 M 0 80 L 200 80`}
                    stroke="#EA580C"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    animate={{
                      opacity: [0.3, 0.7, 0.5],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <rect x="0" y="0" width="100" height="80" fill="rgba(37, 99, 235, 0.03)" />
                  <rect x="100" y="80" width="100" height="80" fill="rgba(37, 99, 235, 0.03)" />
                  <rect x="100" y="0" width="100" height="80" fill="rgba(234, 88, 12, 0.03)" />
                  <rect x="0" y="80" width="100" height="80" fill="rgba(234, 88, 12, 0.03)" />
                </g>
              )}

              {/* Data points */}
              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r="3.5"
                  fill={p.label === 0 ? "#2563EB" : "#EA580C"}
                  opacity="0.85"
                />
              ))}
            </svg>
            
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#FFFFFF]/90 border border-[#E7E2D8] text-[9px] font-mono text-[#5C5C5C] select-none">
              Epoch: <span className="text-[#111111] font-bold">{epoch}</span>
            </div>
          </div>
        </div>

        {/* Right column: Loss curve & Neural Network node weights */}
        <div className="lg:col-span-5 p-6 bg-[#FAF8F3] flex flex-col justify-between">
          {/* Active stats */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Model Diagnostics</span>
              <h4 className="text-sm font-bold font-tight text-[#111111] mt-0.5">Shallow Feedforward Classifier</h4>
            </div>

            {/* Simulated Live Loss / Acc counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-3 text-center">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">ACCURACY</div>
                <div className="text-lg font-bold font-mono text-[#16A34A]">{accuracy.toFixed(1)}%</div>
              </div>
              <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-3 text-center">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">LOSS</div>
                <div className="text-lg font-bold font-mono text-[#2563EB]">{loss.toFixed(4)}</div>
              </div>
            </div>

            {/* Neural Net connections representation */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Layer Weight Strengths</span>
              
              <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-3 flex items-center justify-between relative h-20">
                {/* Visualizing neural weights path */}
                <div className="flex flex-col justify-around h-full">
                  <div className="w-3 h-3 rounded-full bg-[#2563EB] relative" />
                  <div className="w-3 h-3 rounded-full bg-[#2563EB] relative" />
                </div>

                {/* Hidden layer nodes */}
                <div className="flex flex-col justify-around h-full">
                  <div className="w-3 h-3 rounded-full bg-[#EA580C] relative" />
                  <div className="w-3 h-3 rounded-full bg-[#EA580C] relative" />
                  <div className="w-3 h-3 rounded-full bg-[#EA580C] relative" />
                </div>

                {/* Output layer node */}
                <div className="w-3 h-3 rounded-full bg-[#16A34A] relative animate-pulse" />

                {/* Animated svg connections */}
                <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 15,15 L 75,10 M 15,15 L 75,32 M 15,15 L 75,55" fill="none" stroke="#2563EB" strokeWidth="1" opacity={isPlaying ? 0.6 : 0.2} />
                  <path d="M 15,45 L 75,10 M 15,45 L 75,32 M 15,45 L 75,55" fill="none" stroke="#2563EB" strokeWidth="1.5" opacity={isPlaying ? 0.8 : 0.2} />
                  
                  <path d="M 85,10 L 155,32" fill="none" stroke="#16A34A" strokeWidth="2" opacity={isPlaying ? 0.7 : 0.2} />
                  <path d="M 85,32 L 155,32" fill="none" stroke="#E7E2D8" strokeWidth="0.5" opacity={0.3} />
                  <path d="M 85,55 L 155,32" fill="none" stroke="#16A34A" strokeWidth="1" opacity={isPlaying ? 0.5 : 0.2} />
                </svg>
              </div>
            </div>
          </div>

          {/* Loss sparkline graph */}
          <div className="mt-4 pt-4 border-t border-[#E7E2D8] flex items-center justify-between gap-4">
            <span className="text-[10px] font-mono text-[#5C5C5C] uppercase flex items-center gap-1"><BarChart2 className="w-3.5 h-3.5" /> Convergence Trace</span>
            <div className="h-6 flex-1 flex items-end justify-end gap-[2px]">
              {lossHistory.map((lh, idx) => (
                <div
                  key={idx}
                  className="w-1.5 bg-[#2563EB] rounded-t transition-all duration-300"
                  style={{ height: `${Math.max(15, Math.min(100, lh * 100))}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
