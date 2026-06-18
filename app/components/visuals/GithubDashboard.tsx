"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitCommit, Users, Archive, BarChart } from "lucide-react";

export default function GithubDashboard() {
  const [commits, setCommits] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [repos, setRepos] = useState<number>(0);
  const [languages, setLanguages] = useState([
    { name: "Python", percent: 50, color: "#2563EB", bytes: "250k" },
    { name: "JavaScript", percent: 17, color: "#8B5CF6", bytes: "85k" },
    { name: "TypeScript", percent: 17, color: "#EA580C", bytes: "85k" },
    { name: "C", percent: 16, color: "#16A34A", bytes: "80k" }
  ]);

  // Fetch and animate stats counter on entry
  useEffect(() => {
    let targetCommits = 494;
    let targetStars = 2;
    let targetRepos = 8;

    async function fetchGithubStats() {
      try {
        const res = await fetch("https://api.github.com/users/VaishnaviRai287");
        if (res.ok) {
          const data = await res.json();
          targetStars = typeof data.followers === "number" ? data.followers : targetStars;
          targetRepos = typeof data.public_repos === "number" ? data.public_repos : targetRepos;
        }
      } catch (err) {
        console.error("Failed to fetch GitHub stats:", err);
      } finally {
        startAnimation();
      }
    }

    let interval: NodeJS.Timeout;

    function startAnimation() {
      let c = 0;
      let s = 0;
      let r = 0;

      interval = setInterval(() => {
        c = Math.min(targetCommits, c + Math.ceil(targetCommits / 20));
        s = targetStars > 0 ? Math.min(targetStars, s + Math.ceil(targetStars / 20)) : 0;
        r = targetRepos > 0 ? Math.min(targetRepos, r + Math.ceil(targetRepos / 20)) : 0;

        setCommits(c);
        setStars(s);
        setRepos(r);

        if (c === targetCommits && s === targetStars && r === targetRepos) {
          clearInterval(interval);
        }
      }, 45);
    }

    fetchGithubStats();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      {/* Visual Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <BarChart className="w-4 h-4 text-[#111111]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">github_telemetry_agent.sh</h3>
        </div>
        <div className="text-[10px] font-mono text-[#5C5C5C]">
          @VaishnaviRai287
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Left column: Grid metrics display */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between border-r border-[#E7E2D8]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] mb-4">Telemetry Diagnostics</span>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-[#E7E2D8] bg-[#FAF8F3] rounded p-4 text-center">
              <GitCommit className="w-5 h-5 mx-auto mb-2 text-[#2563EB]" />
              <div className="text-[9px] font-mono text-[#5C5C5C] uppercase">Contributions</div>
              <div className="text-base font-bold font-mono text-[#111111] mt-1">{commits}</div>
            </div>
            <div className="border border-[#E7E2D8] bg-[#FAF8F3] rounded p-4 text-center">
              <Users className="w-5 h-5 mx-auto mb-2 text-[#EA580C]" />
              <div className="text-[9px] font-mono text-[#5C5C5C] uppercase">Followers</div>
              <div className="text-base font-bold font-mono text-[#111111] mt-1">{stars}</div>
            </div>
            <div className="border border-[#E7E2D8] bg-[#FAF8F3] rounded p-4 text-center">
              <Archive className="w-5 h-5 mx-auto mb-2 text-[#16A34A]" />
              <div className="text-[9px] font-mono text-[#5C5C5C] uppercase">Repositories</div>
              <div className="text-base font-bold font-mono text-[#111111] mt-1">{repos}</div>
            </div>
          </div>

          {/* Dotted grid preview details */}
          <div className="mt-6 border border-[#E7E2D8] bg-[#FAF8F3] rounded p-3 text-[9px] font-mono text-[#5C5C5C] space-y-1.5 select-none">
            <div className="flex justify-between">
              <span>Main Active Branch:</span>
              <span className="text-[#111111] font-bold">origin/main</span>
            </div>
            <div className="flex justify-between">
              <span>Webhook Telemetry status:</span>
              <span className="text-[#16A34A] font-bold">LISTENING</span>
            </div>
            <div className="flex justify-between">
              <span>Continuous Integration (CI):</span>
              <span className="text-[#2563EB] font-bold">12 tests passing</span>
            </div>
          </div>
        </div>

        {/* Right column: Stacked language bar & metrics detail */}
        <div className="lg:col-span-5 p-6 bg-[#FAF8F3] flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Language Distribution</span>
              <h4 className="text-sm font-bold font-tight text-[#111111] mt-0.5">Codebase Volume Breakdown</h4>
            </div>

            {/* Stacked Percentage bar */}
            <div className="w-full h-3 bg-[#E7E2D8] rounded-full overflow-hidden flex">
              {languages.map(lang => (
                <div
                  key={lang.name}
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${lang.percent}%`,
                    backgroundColor: lang.color
                  }}
                  title={`${lang.name}: ${lang.percent}%`}
                />
              ))}
            </div>

            {/* Language legend checklist */}
            <div className="space-y-2">
              {languages.map(lang => (
                <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-[#111111] font-bold">{lang.name}</span>
                  </div>
                  <div className="text-[#5C5C5C] text-[10px] flex gap-2">
                    <span>{lang.percent}%</span>
                    <span>({lang.bytes})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E7E2D8] text-[9.5px] font-mono text-[#5C5C5C] flex items-center justify-between">
            <span>* Git Telemetry metrics sync dynamically.</span>
            <span>API v3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
