"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Github, ArrowRight, Activity, Cpu, Binary } from "lucide-react";
import { Card } from "../components/card";

type Project = {
	slug: string;
	title: string;
	description: string;
	date?: string;
	repository?: string;
	url?: string;
};

type Props = {
	projects: Project[];
	views: Record<string, number>;
};

export default function ProjectShowcase({ projects, views }: Props) {
	// Find the projects in the list
	const modelObservability = projects.find(p => p.slug === "behavioral-model-observability-platform");
	const restSynthesizer = projects.find(p => p.slug === "django-rest-synthesizer");
	const mlVisualizer = projects.find(p => p.slug === "ml-visualizer");

	// Setup display list
	const showcaseProjects = [
		{
			id: "observability",
			project: modelObservability || projects[0],
			tabLabel: "ModelMesh",
			icon: <Activity className="w-4 h-4" />,
			renderVisual: () => (
				<div className="flex flex-col h-full bg-[#1e1915]/90 border border-stone-800 rounded-lg p-4 font-mono text-xs text-stone-300 shadow-2xl relative overflow-hidden">
					<div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
						<span className="text-orange-400 font-bold flex items-center gap-1.5">
							<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
							modelmesh-daemon.sh
						</span>
						<span className="text-stone-500">MLOps Node-4</span>
					</div>
					<div className="space-y-2.5 flex-1">
						<div className="flex justify-between bg-stone-900/60 p-2 border border-stone-800/40 rounded">
							<span className="text-stone-400">Target Model:</span>
							<span className="text-stone-200">behavioral_fingerprint_v4</span>
						</div>
						<div className="flex justify-between bg-stone-900/60 p-2 border border-stone-800/40 rounded">
							<span className="text-stone-400">Fingerprint Latent Space:</span>
							<span className="text-stone-200">10,240 dimensions</span>
						</div>
						<div className="flex justify-between bg-stone-900/60 p-2 border border-stone-800/40 rounded">
							<span className="text-stone-400">Latent Shift (Δd):</span>
							<span className="text-amber-400 font-bold">0.084 (OK)</span>
						</div>
						
						{/* SVG Coordinate drift visual */}
						<div className="mt-4 border border-stone-800/60 bg-stone-950/80 rounded h-28 relative flex items-center justify-center">
							<svg className="w-full h-full p-2" viewBox="0 0 200 100">
								{/* Decision boundary line */}
								<path d="M 10 50 Q 80 20, 120 80 T 190 40" fill="none" stroke="#78716c" strokeWidth="1" strokeDasharray="3,3" />
								{/* Training centroids */}
								<circle cx="50" cy="35" r="4" fill="#a8a29e" opacity="0.5" />
								<circle cx="65" cy="45" r="4" fill="#a8a29e" opacity="0.5" />
								<circle cx="150" cy="65" r="4" fill="#a8a29e" opacity="0.5" />
								
								{/* Live Drift Probe points */}
								<circle cx="55" cy="32" r="3" fill="#10b981" />
								<circle cx="70" cy="50" r="3" fill="#10b981" />
								<circle cx="145" cy="68" r="3" fill="#eab308" className="animate-ping" />
								<circle cx="145" cy="68" r="3" fill="#eab308" />
								
								{/* Vector line */}
								<line x1="150" y1="65" x2="145" y2="68" stroke="#f59e0b" strokeWidth="1" />
								
								<text x="10" y="90" fill="#78716c" fontSize="8">Drift Status: Healthy</text>
								<text x="120" y="20" fill="#f59e0b" fontSize="8">Probe Drift Δd</text>
							</svg>
						</div>
					</div>
				</div>
			)
		},
		{
			id: "synthesizer",
			project: restSynthesizer || projects[1],
			tabLabel: "APIForge",
			icon: <Cpu className="w-4 h-4" />,
			renderVisual: () => (
				<div className="flex flex-col h-full bg-[#1e1915]/90 border border-stone-800 rounded-lg p-4 font-mono text-xs text-stone-300 shadow-2xl relative overflow-hidden">
					<div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
						<span className="text-orange-400 font-bold flex items-center gap-1.5">
							apiforge_compiler.py
						</span>
						<span className="text-stone-500">v1.2.0</span>
					</div>
					<div className="space-y-2 flex-1 justify-center flex flex-col">
						<div className="text-stone-500 font-semibold">// Running compiler ...</div>
						<div className="space-y-1 mt-1">
							<div className="flex gap-2">
								<span className="text-emerald-500">[+]</span>
								<span>Parse AST Schema: 14 models found</span>
							</div>
							<div className="flex gap-2">
								<span className="text-emerald-500">[+]</span>
								<span>Resolve cascade migrations: 3 relations</span>
							</div>
							<div className="flex gap-2">
								<span className="text-emerald-500">[+]</span>
								<span>Perform heuristic renames... Done</span>
							</div>
							<div className="flex gap-2">
								<span className="text-orange-400">[~]</span>
								<span>Synthesizing API endpoints...</span>
							</div>
						</div>
						
						<div className="mt-4 border border-stone-800/80 bg-stone-950/80 rounded p-2 text-[10px] text-stone-400">
							<div className="flex justify-between mb-1 border-b border-stone-900 pb-1 text-stone-500">
								<span>Endpoint</span>
								<span>Latency</span>
							</div>
							<div className="flex justify-between">
								<span className="text-stone-300">GET /api/v1/users/</span>
								<span className="text-emerald-400 font-bold">4.82ms</span>
							</div>
							<div className="flex justify-between">
								<span className="text-stone-300">POST /api/v1/models/</span>
								<span className="text-emerald-400 font-bold">3.94ms</span>
							</div>
							<div className="flex justify-between">
								<span className="text-stone-300">PUT /api/v1/observability/</span>
								<span className="text-emerald-400 font-bold">4.12ms</span>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			id: "visualizer",
			project: mlVisualizer || projects[2],
			tabLabel: "ML Visualizer",
			icon: <Binary className="w-4 h-4" />,
			renderVisual: () => (
				<div className="flex flex-col h-full bg-[#1e1915]/90 border border-stone-800 rounded-lg p-4 font-mono text-xs text-stone-300 shadow-2xl relative overflow-hidden">
					<div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2">
						<span className="text-orange-400 font-bold">KNN Decision Boundaries</span>
						<span className="text-stone-500">Accuracy: 98.4%</span>
					</div>
					
					{/* Interactive Grid visualization */}
					<div className="flex-1 border border-stone-800 bg-stone-950/90 rounded relative overflow-hidden flex items-center justify-center h-48">
						{/* Contour divisions */}
						<div className="absolute top-0 left-0 w-1/2 h-full bg-emerald-500/5 border-r border-stone-800/40" />
						<div className="absolute top-0 right-0 w-1/2 h-full bg-red-500/5" />
						
						<svg className="w-full h-full p-2" viewBox="0 0 200 120">
							{/* Grid lines */}
							<line x1="0" y1="40" x2="200" y2="40" stroke="#2e2724" strokeWidth="0.5" />
							<line x1="0" y1="80" x2="200" y2="80" stroke="#2e2724" strokeWidth="0.5" />
							<line x1="66" y1="0" x2="66" y2="120" stroke="#2e2724" strokeWidth="0.5" />
							<line x1="133" y1="0" x2="133" y2="120" stroke="#2e2724" strokeWidth="0.5" />

							{/* Decision boundaries */}
							<path d="M 100 0 L 105 45 L 85 80 L 100 120" fill="none" stroke="#f97316" strokeWidth="1.5" />

							{/* Data class A (Emerald) */}
							<circle cx="45" cy="30" r="4.5" fill="#10b981" />
							<circle cx="30" cy="75" r="4.5" fill="#10b981" />
							<circle cx="70" cy="50" r="4.5" fill="#10b981" />
							<circle cx="55" cy="95" r="4.5" fill="#10b981" />
							
							{/* Data class B (Red) */}
							<circle cx="155" cy="40" r="4.5" fill="#ef4444" />
							<circle cx="170" cy="85" r="4.5" fill="#ef4444" />
							<circle cx="130" cy="25" r="4.5" fill="#ef4444" />
							<circle cx="140" cy="70" r="4.5" fill="#ef4444" />

							{/* Query point (Orange) */}
							<polygon points="100,55 104,63 113,63 106,68 108,76 100,71 92,76 94,68 87,63 96,63" fill="#f97316" className="animate-pulse" />
							
							<text x="110" y="62" fill="#f97316" fontSize="7" fontWeight="bold">Query (K=3)</text>
						</svg>
					</div>
				</div>
			)
		}
	];

	// Manage selected active tab
	const [activeId, setActiveId] = useState("observability");
	const activeDetails = showcaseProjects.find(sp => sp.id === activeId) || showcaseProjects[0];

	return (
		<div className="space-y-8">
			{/* Showcase Tabs */}
			<div className="flex flex-wrap items-center justify-start gap-2 border-b border-stone-200/60 pb-3 md:justify-center">
				{showcaseProjects.map((sp) => (
					<button
						key={sp.id}
						onClick={() => setActiveId(sp.id)}
						className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide duration-300 border ${
							activeId === sp.id
								? "bg-stone-900 border-stone-900 text-[#FAF8F5] shadow-sm"
								: "bg-white/50 border-stone-200/60 text-stone-600 hover:text-stone-950 hover:bg-white hover:border-stone-300"
						}`}
					>
						{sp.icon}
						{sp.tabLabel}
					</button>
				))}
			</div>

			{/* Main Showcase Panel */}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-12 bg-white/40 border border-stone-200/60 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
				
				{/* Left Side: Details */}
				<div className="flex flex-col md:col-span-5 space-y-5 justify-between">
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-xs text-stone-500">
							{activeDetails.project?.date && (
								<time dateTime={new Date(activeDetails.project.date).toISOString()}>
									{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
										new Date(activeDetails.project.date),
									)}
								</time>
							)}
							<span>•</span>
							<span className="flex items-center gap-1">
								<Eye className="w-3.5 h-3.5" />
								{Intl.NumberFormat("en-US", { notation: "compact" }).format(
									views[activeDetails.project?.slug || ""] ?? 0,
								)} views
							</span>
						</div>

						<h3 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
							{activeDetails.project?.title || activeDetails.tabLabel}
						</h3>

						<p className="text-sm leading-relaxed text-stone-600">
							{activeDetails.project?.description}
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-3 mt-6">
						<Link
							href={`/projects/${activeDetails.project?.slug}`}
							className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-[#FAF8F5] text-xs font-bold rounded-lg shadow hover:bg-stone-850 duration-200"
						>
							Read Case Study
							<ArrowRight className="w-3.5 h-3.5" />
						</Link>

						{activeDetails.project?.repository && (
							<Link
								target="_blank"
								href={`https://github.com/${activeDetails.project.repository}`}
								className="flex items-center gap-1.5 px-4 py-2 border border-stone-200 bg-white/80 text-stone-700 text-xs font-bold rounded-lg shadow-sm hover:bg-stone-50 hover:border-stone-300 hover:text-stone-950 duration-200"
							>
								<Github className="w-3.5 h-3.5" />
								GitHub
							</Link>
						)}
					</div>
				</div>

				{/* Right Side: Interactive Visual */}
				<div className="md:col-span-7 flex flex-col justify-stretch min-h-[260px] md:h-full">
					{activeDetails.renderVisual()}
				</div>
			</div>

			{/* Divider */}
			<div className="w-full h-px bg-stone-200/80 my-12" />

			{/* Grid: All other projects */}
			<div className="space-y-6">
				<h4 className="text-lg font-bold tracking-tight text-stone-900 font-display">
					All Open Source Repositories
				</h4>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{projects
						.filter(p => !showcaseProjects.some(sp => sp.project?.slug === p.slug))
						.map((project) => (
							<Card key={project.slug}>
								<Link href={`/projects/${project.slug}`}>
									<article className="p-5 flex flex-col justify-between h-full space-y-4">
										<div className="space-y-2">
											<div className="flex justify-between gap-2 items-center">
												<span className="text-xs text-stone-500">
													{project.date ? (
														<time dateTime={new Date(project.date).toISOString()}>
															{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
																new Date(project.date),
															)}
														</time>
													) : (
														<span>SOON</span>
													)}
												</span>
												<span className="text-stone-400 text-xs flex items-center gap-1">
													<Eye className="w-3.5 h-3.5" />{" "}
													{Intl.NumberFormat("en-US", { notation: "compact" }).format(
														views[project.slug] ?? 0,
													)}
												</span>
											</div>
											<h5 className="text-md font-bold text-stone-850 group-hover:text-stone-950 font-display">
												{project.title}
											</h5>
											<p className="text-xs text-stone-600 group-hover:text-stone-850 leading-relaxed line-clamp-2">
												{project.description}
											</p>
										</div>
										{project.repository && (
											<div className="text-stone-400 hover:text-stone-700 duration-200 inline-flex items-center gap-1 text-[10px] font-mono">
												<Github className="w-3 h-3" />
												{project.repository}
											</div>
										)}
									</article>
								</Link>
							</Card>
						))}
				</div>
			</div>
		</div>
	);
}
