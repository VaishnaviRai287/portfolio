"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Mail, Globe, Check, AlertTriangle, Cpu, BarChart2 } from "lucide-react";

type ActiveTab = "raw" | "features";

export default function EmailPhishingVisual() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("raw");
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanStep, setScanStep] = useState<number>(0);
  const [threatScore, setThreatScore] = useState<number>(12); // starts low, increments during scan
  const [indicatorHighlight, setIndicatorHighlight] = useState<string | null>(null);

  // Email parameters
  const emailData = {
    sender: "security@paypal-verification-secure.com",
    replyTo: "billing-support@gmail.com",
    subject: "URGENT: Confirm Your Billing Details Immediately",
    body: "Dear User, we detected suspicious login activity on your account. You must click the verification link below to authorize your session, or your account will be suspended within 24 hours.",
    url: "http://paypal-verification-secure.com/auth/login.php"
  };

  const threatIndicators = [
    { id: "sender", label: "Sender/Reply-To mismatch", value: "Flagged", status: "high" },
    { id: "spf", label: "SPF Authentication", value: "FAIL", status: "high" },
    { id: "dkim", label: "DKIM Signature Check", value: "PASS", status: "neutral" },
    { id: "urgency", label: "Urgency Indicators", value: "Detected", status: "high" },
    { id: "domain", label: "Domain Age (Created <24h ago)", value: "Suspicious", status: "high" },
    { id: "url", label: "Embedded URL Mismatch", value: "Flagged", status: "high" }
  ];

  // Scan loop simulation
  useEffect(() => {
    if (!isScanning) return;
    
    setThreatScore(12);
    setScanStep(0);
    setIndicatorHighlight(null);

    const timeouts = [
      setTimeout(() => { setScanStep(1); setThreatScore(34); setIndicatorHighlight("sender"); }, 1000),
      setTimeout(() => { setScanStep(2); setThreatScore(58); setIndicatorHighlight("spf"); }, 2000),
      setTimeout(() => { setScanStep(3); setThreatScore(72); setIndicatorHighlight("urgency"); }, 3000),
      setTimeout(() => { setScanStep(4); setThreatScore(89); setIndicatorHighlight("url"); }, 4000),
      setTimeout(() => { setScanStep(5); setThreatScore(94); setIndicatorHighlight(null); setIsScanning(false); }, 5200)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [isScanning]);

  const restartScan = () => {
    setIsScanning(true);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#EA580C]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">threat_intelligence_parser.bin</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(activeTab === "raw" ? "features" : "raw")}
            className="text-[10px] font-mono border border-[#E7E2D8] px-2.5 py-1 rounded bg-[#FFFFFF] hover:bg-[#FAF8F3] transition duration-200"
          >
            MODE: {activeTab === "raw" ? "EMAIL ANATOMY" : "FEATURES GRAPH"}
          </button>
          <button
            onClick={restartScan}
            disabled={isScanning}
            className={`text-[10px] font-mono border px-3 py-1 rounded bg-[#2563EB] text-white hover:bg-[#2563EB]/90 transition duration-200 ${
              isScanning ? "opacity-55 cursor-not-allowed" : ""
            }`}
          >
            {isScanning ? "SCANNING..." : "TRIGGER SCAN"}
          </button>
        </div>
      </div>

      {/* Main visual panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        
        {/* Left Side Tab 1: Email Anatomy View */}
        {activeTab === "raw" ? (
          <div className="lg:col-span-8 p-6 flex flex-col justify-between border-r border-[#E7E2D8] relative">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] mb-3">Raw Envelope Decomposition</span>
            
            {/* Email Header */}
            <div className="border border-[#E7E2D8] bg-[#FAF8F3] rounded p-4 font-mono text-[10px] space-y-2.5 leading-normal relative overflow-hidden shadow-inner">
              <div className={`p-1.5 rounded transition duration-300 ${indicatorHighlight === "sender" ? "bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C]" : ""}`}>
                <span className="text-[#5C5C5C]">From:</span> {emailData.sender}
                <div className="text-[8px] text-[#5C5C5C] pl-9 italic font-sans">(reply-to: {emailData.replyTo})</div>
              </div>
              <div className="border-t border-[#E7E2D8]/50 pt-2">
                <span className="text-[#5C5C5C]">Subject:</span> <strong className="text-[#111111]">{emailData.subject}</strong>
              </div>
              
              {/* Email Body */}
              <div className={`border-t border-[#E7E2D8]/50 pt-2.5 font-sans leading-relaxed text-[#111111] p-1.5 rounded transition ${indicatorHighlight === "urgency" ? "bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C]" : ""}`}>
                {emailData.body}
              </div>

              {/* Suspicious URL link */}
              <div className={`border-t border-[#E7E2D8]/50 pt-2.5 p-1.5 rounded transition ${indicatorHighlight === "url" ? "bg-[#EA580C]/15 border border-[#EA580C]/35 font-bold" : ""}`}>
                <span className="text-[#5C5C5C] font-sans">Verification Link:</span>{" "}
                <span className="text-[#2563EB] underline break-all cursor-pointer">{emailData.url}</span>
              </div>
            </div>

            {/* Inbound analysis flow bar */}
            <div className="mt-6 pt-4 border-t border-[#E7E2D8]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] block mb-3">Threat Detection Sequence</span>
              <div className="grid grid-cols-7 gap-1 text-center text-[8.5px] font-mono select-none">
                <div className={`p-1 border rounded ${scanStep >= 0 ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB] font-bold" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                  Mail Inbound
                </div>
                <div className={`p-1 border rounded ${scanStep >= 1 ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB] font-bold" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                  Header Check
                </div>
                <div className={`p-1 border rounded ${scanStep >= 2 ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB] font-bold" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                  SPF/DKIM
                </div>
                <div className={`p-1 border rounded ${scanStep >= 3 ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB] font-bold" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                  URL Extraction
                </div>
                <div className={`p-1 border rounded ${scanStep >= 4 ? "bg-[#EA580C]/10 border-[#EA580C] text-[#EA580C] font-bold" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                  NLP Weights
                </div>
                <div className={`p-1 border rounded ${scanStep >= 5 ? "bg-[#EA580C]/15 border-[#EA580C] text-white font-bold animate-pulse" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                  Classifier
                </div>
                <div className={`p-1 border rounded ${scanStep >= 5 ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB]" : "bg-[#FAF8F3] border-[#E7E2D8] text-[#5C5C5C]"}`}>
                  Alert Dispatch
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Left Side Tab 2: Feature Matrix / Graph */
          <div className="lg:col-span-8 p-6 flex flex-col justify-between border-r border-[#E7E2D8] bg-[#FAF8F3]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] mb-3">Extraction Pipeline Vectors</span>
            
            <div className="my-auto space-y-4 max-w-lg mx-auto w-full">
              <div className="border border-[#E7E2D8] bg-white rounded p-4 relative overflow-hidden flex items-center justify-between h-44 shadow-sm">
                <div className="flex flex-col justify-around h-full font-mono text-[9px] text-[#5C5C5C]">
                  <span>raw_mail</span>
                  <span>headers</span>
                  <span>url_domain</span>
                </div>
                <div className="flex flex-col justify-around h-full font-mono text-[9px] text-[#5C5C5C]">
                  <span>char_count</span>
                  <span>spf_flag</span>
                  <span>entropy_score</span>
                </div>
                <div className="w-16 h-16 rounded-full border border-[#E7E2D8] flex items-center justify-center font-mono text-xs text-[#2563EB] font-bold relative animate-pulse">
                  <Cpu className="w-5 h-5" />
                  <span className="absolute inset-0 rounded-full border border-[#2563EB]/30 animate-ping" />
                </div>
                <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 50,25 L 200,80" fill="none" stroke="#2563EB" strokeWidth="1" />
                  <path d="M 50,60 L 200,80" fill="none" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M 50,95 L 200,80" fill="none" stroke="#2563EB" strokeWidth="1" />
                  <path d="M 120,25 L 200,80" fill="none" stroke="#EA580C" strokeWidth="1.5" />
                  <path d="M 120,60 L 200,80" fill="none" stroke="#EA580C" strokeWidth="1" />
                  <path d="M 120,95 L 200,80" fill="none" stroke="#EA580C" strokeWidth="2" />
                </svg>
              </div>

              {/* Vector array presentation */}
              <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-2.5 font-mono text-[9.5px] text-[#5C5C5C] leading-relaxed shadow-sm">
                <span className="font-bold text-[#111111]">Feature Vector [X]:</span> [0.12, 1, 0, 1.482, 0.948, 1, 0.62]
              </div>
            </div>
            
            <div className="text-[9px] font-mono text-[#5C5C5C] text-center pt-2">
              * Text features parsed using Custom CountVectorizer structures.
            </div>
          </div>
        )}

        {/* Right Side: Threat Score & Indicators */}
        <div className="lg:col-span-4 p-6 bg-[#FAF8F3] flex flex-col justify-between min-h-[300px]">
          
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Risk Scorecard</span>
              <h4 className="text-sm font-bold font-tight text-[#111111] mt-0.5">Automated Classifier Matrix</h4>
            </div>

            {/* Threat Gauge */}
            <div className="border border-[#E7E2D8] bg-[#FFFFFF] rounded p-4 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#5C5C5C] uppercase">PHISHING PROBABILITY</span>
                <div className={`text-2xl font-bold font-mono transition duration-300 ${threatScore > 70 ? "text-[#EA580C]" : "text-[#2563EB]"}`}>
                  {threatScore}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-[#5C5C5C] uppercase">THREAT LEVEL</span>
                <div className={`text-xs font-mono font-bold px-2 py-0.5 rounded border mt-1 ${
                  threatScore > 70
                    ? "bg-[#EA580C]/10 border-[#EA580C]/20 text-[#EA580C]"
                    : "bg-[#2563EB]/10 border-[#2563EB]/20 text-[#2563EB]"
                }`}>
                  {threatScore > 70 ? "CRITICAL RISK" : "MINIMAL"}
                </div>
              </div>
            </div>

            {/* Checklist of parsed indicators */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Heuristic Indicator Logs</span>
              
              <div className="space-y-1.5">
                {threatIndicators.map((ind, idx) => {
                  const isActive = indicatorHighlight === ind.id || scanStep > idx;
                  return (
                    <div
                      key={ind.id}
                      className={`p-2 rounded border text-[10px] font-mono flex items-center justify-between transition duration-300 ${
                        isActive && ind.status === "high"
                          ? "bg-[#EA580C]/10 border-[#EA580C]/20 text-[#EA580C] font-semibold"
                          : isActive && ind.status === "neutral"
                          ? "bg-[#16A34A]/10 border-[#16A34A]/20 text-[#16A34A]"
                          : "bg-white border-[#E7E2D8] text-[#5C5C5C]"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isActive && ind.status === "high" && <AlertTriangle className="w-3.5 h-3.5 text-[#EA580C]" />}
                        {isActive && ind.status === "neutral" && <Check className="w-3.5 h-3.5 text-[#16A34A]" />}
                        {stretchingSpaces(ind.label)}
                      </span>
                      <span className="font-bold">{ind.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E7E2D8] text-[9.5px] font-mono text-[#5C5C5C] leading-normal flex items-start gap-1 select-none">
            <span>*</span>
            <span>SPF validations verify outbound IP signatures against PayPal authorization profiles.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// Simple label layout padding tool to avoid text wrap formatting collapses
function stretchingSpaces(str: string): string {
  if (str.length > 25) return str.slice(0, 24) + "...";
  return str;
}
