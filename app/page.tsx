"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, Cpu, FileCode2, ArrowUpRight, Network } from "lucide-react";
import { Card } from "./components/card";

// Import custom system visualizers
import ModelMeshVisual from "./components/visuals/ModelMeshVisual";
import MLVisualizerVisual from "./components/visuals/MLVisualizerVisual";
import APIForgeVisual from "./components/visuals/APIForgeVisual";
import FileRecoveryVisual from "./components/visuals/FileRecoveryVisual";
import EmailPhishingVisual from "./components/visuals/EmailPhishingVisual";
import ExplorationCards from "./components/visuals/ExplorationCards";
import SystemArchitectureGallery from "./components/visuals/SystemArchitectureGallery";
import ExperienceLogs from "./components/visuals/ExperienceLogs";
import TechnicalToolbox from "./components/visuals/TechnicalToolbox";
import GithubDashboard from "./components/visuals/GithubDashboard";

const navigation = [
  { name: "Projects Showcase", href: "/projects" },
  { name: "Contact Index", href: "/contact" },
];

const Counter = ({ target, suffix = "", duration = 1000 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const steps = 30;
    const increment = Math.max(1, Math.ceil(end / steps));
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
      start = Math.min(end, start + increment);
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#111111] font-sans selection:bg-[#E7E2D8] flex flex-col justify-between">
      
      {/* Navigation Header */}
      <header className="w-full border-b border-[#E7E2D8] bg-[#FAF8F3]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono font-bold tracking-tight text-xs uppercase hover:opacity-75 transition duration-200">
            vaishnavi_rai.sys
          </Link>
          <nav className="flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-mono font-bold tracking-tight uppercase text-[#5C5C5C] hover:text-[#111111] transition duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24 w-full flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden border border-[#E7E2D8] bg-[#FFFFFF] rounded-2xl p-8 md:p-12 shadow-sm">
          {/* Subtle grid overlay in the hero */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />
          
          <div className="relative space-y-8 max-w-4xl">
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#5C5C5C] uppercase">Computer Science • Machine Learning • Cybersecurity</span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-relaxed" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              I build systems that explain, analyze, and recover information.
            </h1>
            <p className="text-sm md:text-base text-[#5C5C5C] max-w-2xl leading-relaxed" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Hi, I'm Vaishnavi Rai, a Computer Science student at Manipal Institute of Technology, Bengaluru. I explore machine learning systems, digital forensics, compiler design, and intelligent data infrastructure, and enjoy building tools that make complex systems easier to understand.
            </p>
            
            {/* Animated Counters Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#E7E2D8] text-center md:text-left select-none">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">PROJECTS BUILT</div>
                <div className="text-3xl font-extrabold font-tight text-[#111111]">
                  <Counter target={6} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">MODELS ANALYZED</div>
                <div className="text-3xl font-extrabold font-tight text-[#EA580C]">
                  <Counter target={110} suffix="+" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">TECHNOLOGIES</div>
                <div className="text-3xl font-extrabold font-tight text-[#16A34A]">
                  <Counter target={18} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#5C5C5C] uppercase">YEARS CODING</div>
                <div className="text-3xl font-extrabold font-tight text-[#2563EB]">
                  <Counter target={4} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Exploration */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Core Domains</span>
            <h2 className="text-xl sm:text-2xl font-bold font-tight text-[#111111]">Areas of Exploration</h2>
          </div>
          <ExplorationCards />
        </section>

        {/* Selected Work & Interactive Systems Gallery */}
        <section className="space-y-12">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C]">Case Studies & Visual Mocks</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-tight text-[#111111]">Interactive Systems Gallery</h2>
          </div>

          <div className="space-y-16">
            
            {/* Project 1: ModelMesh */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[9px] font-mono text-[#2563EB] font-bold">PROJECT 01</span>
                  <span className="text-xs font-mono text-[#5C5C5C]">MLOps</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-tight text-[#111111]">ModelMesh</h3>
                <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                  An enterprise-grade behavioral model observability platform supporting PyTorch and TensorFlow model ingestion. Enables automated architecture inspection, weight visualization, and deployment readiness checks.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com/VaishnaviRai287/behavioral-model-observability-platform"
                    target="_blank"
                    className="flex items-center gap-1 text-xs font-mono font-bold text-[#111111] hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" /> Repository <ArrowUpRight className="w-3 h-3 text-[#5C5C5C]" />
                  </a>
                  <span className="text-[#E7E2D8]">|</span>
                  <Link href="/projects/behavioral-model-observability-platform" className="text-xs font-mono font-bold text-[#2563EB] hover:underline">
                    Read Case Study
                  </Link>
                </div>
              </div>
              <div className="xl:col-span-8 h-full">
                <ModelMeshVisual />
              </div>
            </div>

            {/* Project 2: ML Visualizer */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/20 text-[9px] font-mono text-[#EA580C] font-bold">PROJECT 02</span>
                  <span className="text-xs font-mono text-[#5C5C5C]">Deep Learning</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-tight text-[#111111]">ML Visualizer</h3>
                <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                  A full-stack machine learning experimentation platform allowing developers to train and evaluate neural networks in real-time, mapping dynamic classification boundaries over geometric quadrant datasets.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com/VaishnaviRai287/MLVisualizer"
                    target="_blank"
                    className="flex items-center gap-1 text-xs font-mono font-bold text-[#111111] hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" /> Repository <ArrowUpRight className="w-3 h-3 text-[#5C5C5C]" />
                  </a>
                  <span className="text-[#E7E2D8]">|</span>
                  <Link href="/projects/ml-visualizer" className="text-xs font-mono font-bold text-[#2563EB] hover:underline">
                    Read Case Study
                  </Link>
                </div>
              </div>
              <div className="xl:col-span-8">
                <MLVisualizerVisual />
              </div>
            </div>

            {/* Project 3: APIForge */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 text-[9px] font-mono text-[#16A34A] font-bold">PROJECT 03</span>
                  <span className="text-xs font-mono text-[#5C5C5C]">APIs & Compilers</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-tight text-[#111111]">APIForge (Django Compiler)</h3>
                <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                  A compiler translating a custom declarative DSL schema into production-ready Django REST backends, complete with O(V+E) dependency graph traversal to cascade ForeignKey structural updates safely.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com/VaishnaviRai287/Django-Rest-Synthesizer"
                    target="_blank"
                    className="flex items-center gap-1 text-xs font-mono font-bold text-[#111111] hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" /> Repository <ArrowUpRight className="w-3 h-3 text-[#5C5C5C]" />
                  </a>
                  <span className="text-[#E7E2D8]">|</span>
                  <Link href="/projects/django-rest-synthesizer" className="text-xs font-mono font-bold text-[#2563EB] hover:underline">
                    Read Case Study
                  </Link>
                </div>
              </div>
              <div className="xl:col-span-8">
                <APIForgeVisual />
              </div>
            </div>

            {/* Project 4: File Recovery Forensics */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/20 text-[9px] font-mono text-[#EA580C] font-bold">PROJECT 04</span>
                  <span className="text-xs font-mono text-[#5C5C5C]">Digital Forensics</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-tight text-[#111111]">File Recovery Forensics</h3>
                <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                  A digital forensics workstation that carves deleted files from storage media by scanning sectors, matching signatures, and reconstructing inode clusters.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com/VaishnaviRai287/File-Recovery"
                    target="_blank"
                    className="flex items-center gap-1 text-xs font-mono font-bold text-[#111111] hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" /> Repository <ArrowUpRight className="w-3 h-3 text-[#5C5C5C]" />
                  </a>
                  <span className="text-[#E7E2D8]">|</span>
                  <Link href="/projects/file-recovery" className="text-xs font-mono font-bold text-[#2563EB] hover:underline">
                    Read Case Study
                  </Link>
                </div>
              </div>
              <div className="xl:col-span-8">
                <FileRecoveryVisual />
              </div>
            </div>

            {/* Project 5: Email Phishing Detection */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/20 text-[9px] font-mono text-[#EA580C] font-bold">PROJECT 05</span>
                  <span className="text-xs font-mono text-[#5C5C5C]">Cybersecurity</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-tight text-[#111111]">Email Phishing Detection</h3>
                <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                  A threat intelligence platform that parses raw mail envelopes, extracts security heuristics, and classifies risk levels via automated transformer/ML algorithms.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com/VaishnaviRai287/Email-Phishing-Detection"
                    target="_blank"
                    className="flex items-center gap-1 text-xs font-mono font-bold text-[#111111] hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" /> Repository <ArrowUpRight className="w-3 h-3 text-[#5C5C5C]" />
                  </a>
                  <span className="text-[#E7E2D8]">|</span>
                  <Link href="/projects/email-phishing-detection" className="text-xs font-mono font-bold text-[#2563EB] hover:underline">
                    Read Case Study
                  </Link>
                </div>
              </div>
              <div className="xl:col-span-8">
                <EmailPhishingVisual />
              </div>
            </div>

          </div>
        </section>

        {/* System Architecture Gallery */}
        <section className="space-y-12">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2563EB]">Engineering Blueprints</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-tight text-[#111111]">System Architecture Gallery</h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
              Hover over blueprint tiles to inspect system paths and live telemetry. Click tiles to open details drawers detailing architecture schemas, challenges, and source repositories.
            </p>
          </div>
          <SystemArchitectureGallery />
        </section>

        {/* Experience Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[9px] font-mono text-[#2563EB] font-bold">TIMELINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-tight text-[#111111]">Experience & Education</h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
              Structured chronological timeline logs showing system builds, academic compilation, and industrial deployments at Powergrid and Manipal Institute.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ExperienceLogs />
          </div>
        </section>

        {/* Technical Toolbox */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/20 text-[9px] font-mono text-[#EA580C] font-bold">SKILLS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-tight text-[#111111]">Technical Toolbox</h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
              Explore my development environment. Hover over tags in the panels to inspect target proficiencies, descriptions, and projects that utilize them.
            </p>
          </div>
          <div className="lg:col-span-8">
            <TechnicalToolbox />
          </div>
        </section>

        {/* GitHub Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 text-[9px] font-mono text-[#16A34A] font-bold">TELEMETRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-tight text-[#111111]">GitHub Activity</h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
              Real-time repository statistics, language densities, and commit history traces for VaishnaviRai287.
            </p>
          </div>
          <div className="lg:col-span-8">
            <GithubDashboard />
          </div>
        </section>

        {/* Contact section */}
        <section className="border border-[#E7E2D8] bg-[#FFFFFF] rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-medium font-tight text-[#111111]">Get in touch.</h2>
            <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
              Interested in discussing projects, research, internships, or engineering ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4 text-center select-all">
            <a href="mailto:vaishnavi.rai287@gmail.com" className="border border-[#E7E2D8] bg-[#FAF8F3] hover:bg-[#FFFFFF] p-5 rounded-xl block transition duration-200 shadow-sm space-y-2">
              <Mail className="w-5 h-5 mx-auto text-[#2563EB]" />
              <div className="text-[9px] font-mono text-[#5C5C5C] uppercase">Email</div>
              <div className="text-xs font-mono font-bold text-[#111111] truncate">vaishnavi.rai287@gmail.com</div>
              <p className="text-[11px] text-[#5C5C5C] leading-normal mt-1">For opportunities, research, and conversations.</p>
            </a>
            
            <a href="https://linkedin.com/in/vaishnavi-rai-" target="_blank" className="border border-[#E7E2D8] bg-[#FAF8F3] hover:bg-[#FFFFFF] p-5 rounded-xl block transition duration-200 shadow-sm space-y-2">
              <Linkedin className="w-5 h-5 mx-auto text-[#EA580C]" />
              <div className="text-[9px] font-mono text-[#5C5C5C] uppercase">LinkedIn</div>
              <div className="text-xs font-mono font-bold text-[#111111] truncate">in/vaishnavi-rai-</div>
              <p className="text-[11px] text-[#5C5C5C] leading-normal mt-1">Experience, projects, and updates.</p>
            </a>
            
            <a href="https://github.com/VaishnaviRai287" target="_blank" className="border border-[#E7E2D8] bg-[#FAF8F3] hover:bg-[#FFFFFF] p-5 rounded-xl block transition duration-200 shadow-sm space-y-2">
              <Github className="w-5 h-5 mx-auto text-[#16A34A]" />
              <div className="text-[9px] font-mono text-[#5C5C5C] uppercase">GitHub</div>
              <div className="text-xs font-mono font-bold text-[#111111] truncate">github.com/VaishnaviRai287</div>
              <p className="text-[11px] text-[#5C5C5C] leading-normal mt-1">Code, experiments, and open-source work.</p>
            </a>
          </div>
        </section>

      </main>

      {/* Footer copyright */}
      <footer className="w-full border-t border-[#E7E2D8] bg-[#FAF8F3] py-8 text-center text-[10px] font-mono text-[#5C5C5C]">
        &copy; {new Date().getFullYear()} Vaishnavi Rai. Built with Next.js, Framer Motion, and Tailwind CSS.
      </footer>
    </div>
  );
}
