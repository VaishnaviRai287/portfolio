"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PipelineGraph({ slug }: { slug: string }) {
  const renderArrowMarker = () => (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="6"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#888888" />
      </marker>
      <linearGradient id="pink-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
      <linearGradient id="green-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="orange-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
  );

  const renderModelMesh = () => (
    <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 560" xmlns="http://www.w3.org/2000/svg">
      {renderArrowMarker()}

      {/* Layer 1: Data Scientist / Entry point */}
      <rect x="190" y="20" width="120" height="28" rx="14" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
      <text x="250" y="37" fill="#E4E4E7" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Data Scientist</text>

      {/* Lines down to Layer 2 */}
      <line x1="230" y1="48" x2="150" y2="100" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="270" y1="48" x2="350" y2="100" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Labels on lines */}
      <g>
        <rect x="135" y="62" width="110" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="190" y="72" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">pip install datascope-ml</text>
      </g>
      <g>
        <rect x="285" y="62" width="50" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="310" y="72" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Web Login</text>
      </g>

      {/* Layer 2: SDK and Web UI */}
      <rect x="100" y="100" width="100" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="150" y="118" fill="#18181B" fontSize="9.5" fontWeight="bold" textAnchor="middle">Python PyPI SDK</text>

      <rect x="300" y="100" width="100" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="350" y="118" fill="#18181B" fontSize="9.5" fontWeight="bold" textAnchor="middle">Next.js Web UI</text>

      {/* Lines down to Layer 3 (Gateway) */}
      <line x1="150" y1="130" x2="220" y2="190" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="350" y1="130" x2="280" y2="190" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Labels on lines */}
      <g>
        <rect x="142" y="152" width="86" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="185" y="162" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Bearer Token Auth</text>
      </g>
      <g>
        <rect x="282" y="152" width="66" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="315" y="162" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Session Auth</text>
      </g>

      {/* Layer 3: Gateway */}
      <rect x="190" y="190" width="120" height="32" rx="4" fill="url(#pink-grad)" stroke="#EC4899" strokeWidth="1" />
      <text x="250" y="210" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">Next.js API Gateway</text>

      {/* Lines down to Layer 4 (Databases & Backend) */}
      <line x1="210" y1="222" x2="150" y2="282" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="290" y1="222" x2="350" y2="285" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Labels on lines */}
      <g>
        <rect x="155" y="244" width="50" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="180" y="254" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Prisma ORM</text>
      </g>
      <g>
        <rect x="282" y="244" width="76" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="320" y="254" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Concurrent REST</text>
      </g>

      {/* Layer 4: Neon DB and FastAPI */}
      {/* Cylinder Database */}
      <ellipse cx="150" cy="290" rx="50" ry="8" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
      <path d="M 100,290 L 100,315 A 50,8 0 0 0 200,315 L 200,290 Z" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
      <ellipse cx="150" cy="290" rx="50" ry="8" fill="#FFFFFF" opacity="0.3" />
      <text x="150" y="308" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Neon Postgres DB</text>

      {/* FastAPI ML Backend */}
      <rect x="290" y="285" width="120" height="32" rx="4" fill="url(#green-grad)" stroke="#10B981" strokeWidth="1" />
      <text x="350" y="305" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">FastAPI ML Backend</text>

      {/* Lines down from FastAPI to Engines */}
      <line x1="310" y1="317" x2="160" y2="375" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="350" y1="317" x2="350" y2="375" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="390" y1="317" x2="470" y2="375" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 5: Evaluation Engines */}
      <rect x="100" y="375" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="160" y="393" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Governance Scoring</text>

      <rect x="290" y="375" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="350" y="393" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Statistical Leakage</text>

      <rect x="410" y="375" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="470" y="390" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Drift Engine &amp;</text>
      <text x="470" y="400" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Pipeline Engine</text>

      {/* Down to Outlier Consensus */}
      <line x1="160" y1="405" x2="160" y2="445" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Outlier Consensus Engine */}
      <rect x="100" y="445" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="160" y="463" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Outlier Consensus</text>

      {/* Down to consensus details */}
      <line x1="160" y1="475" x2="160" y2="515" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Outlier algorithms label */}
      <g>
        <rect x="100" y="515" width="120" height="24" rx="2" fill="#27272A" stroke="#3F3F46" strokeWidth="0.5" />
        <text x="160" y="527" fill="#D4D4D8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Z-Score, MAD, iForest,</text>
        <text x="160" y="534" fill="#D4D4D8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">DBSCAN</text>
      </g>
    </svg>
  );

  const renderMLVisualizer = () => (
    <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      {renderArrowMarker()}

      {/* Layer 1: Developer */}
      <rect x="190" y="20" width="120" height="28" rx="14" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
      <text x="250" y="37" fill="#E4E4E7" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Developer UI User</text>

      <line x1="250" y1="48" x2="250" y2="95" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      
      <g>
        <rect x="220" y="62" width="60" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="72" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Interact/Click</text>
      </g>

      {/* Layer 2: React Frontend */}
      <rect x="190" y="95" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="113" fill="#18181B" fontSize="9" fontWeight="bold" textAnchor="middle">Next.js Web Client</text>

      <line x1="250" y1="125" x2="250" y2="175" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="215" y="142" width="70" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="152" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">WS Connection</text>
      </g>

      {/* Layer 3: Django Channels */}
      <rect x="180" y="175" width="140" height="32" rx="4" fill="url(#orange-grad)" stroke="#EA580C" strokeWidth="1" />
      <text x="250" y="195" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">Django Channels (WS)</text>

      {/* Split to Redis and ML Engine */}
      <line x1="220" y1="207" x2="160" y2="265" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="280" y1="207" x2="340" y2="265" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="160" y="226" width="46" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="183" y="236" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Pub/Sub</text>
      </g>
      <g>
        <rect x="294" y="226" width="50" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="319" y="236" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Train Msg</text>
      </g>

      {/* Layer 4: Redis Store & Sklearn ML */}
      {/* Redis Cylinder */}
      <ellipse cx="150" cy="270" rx="45" ry="8" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
      <path d="M 105,270 L 105,295 A 45,8 0 0 0 195,295 L 195,270 Z" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
      <ellipse cx="150" cy="270" rx="45" ry="8" fill="#FFFFFF" opacity="0.3" />
      <text x="150" y="288" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Redis Channel Layer</text>

      {/* Model Trainer */}
      <rect x="290" y="265" width="120" height="32" rx="4" fill="url(#green-grad)" stroke="#10B981" strokeWidth="1" />
      <text x="350" y="285" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Scikit-Learn Trainer</text>

      {/* Back connection to Channels for real-time weights */}
      <path d="M 370,265 C 370,230 340,220 322,207" stroke="#34D399" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
      <g>
        <rect x="345" y="228" width="42" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="366" y="238" fill="#34D399" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Epoch Stats</text>
      </g>

      {/* Train outputs down */}
      <line x1="330" y1="297" x2="240" y2="350" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="370" y1="297" x2="410" y2="350" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 5: Mappers */}
      <rect x="170" y="350" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="230" y="368" fill="#18181B" fontSize="8.5" fontWeight="bold" textAnchor="middle">Boundary Grid Mapper</text>

      <rect x="350" y="350" width="110" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="405" y="368" fill="#18181B" fontSize="8.5" fontWeight="bold" textAnchor="middle">Metrics Dashboard</text>

      {/* Down to renderer */}
      <line x1="230" y1="380" x2="230" y2="430" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Render Canvas */}
      <g>
        <rect x="170" y="430" width="120" height="24" rx="2" fill="#27272A" stroke="#3F3F46" strokeWidth="0.5" />
        <text x="230" y="445" fill="#D4D4D8" fontSize="8" fontFamily="monospace" textAnchor="middle">HTML5 Canvas Renderer</text>
      </g>
    </svg>
  );

  const renderAPIForge = () => (
    <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 480" xmlns="http://www.w3.org/2000/svg">
      {renderArrowMarker()}

      {/* Layer 1: Developer */}
      <rect x="190" y="20" width="120" height="28" rx="14" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
      <text x="250" y="37" fill="#E4E4E7" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Developer / CLI</text>

      <line x1="250" y1="48" x2="250" y2="95" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="220" y="62" width="60" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="72" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Write Schema</text>
      </g>

      {/* Layer 2: DSL file */}
      <rect x="190" y="95" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="113" fill="#18181B" fontSize="9" fontWeight="bold" textAnchor="middle">DSL Schema File</text>

      <line x1="250" y1="125" x2="250" y2="175" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 3: AST parser */}
      <rect x="190" y="175" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="193" fill="#18181B" fontSize="9.5" fontWeight="bold" textAnchor="middle">AST Parsing &amp; Lexer</text>

      <line x1="250" y1="205" x2="250" y2="255" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="202" y="222" width="96" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="232" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Verify Relational Tree</text>
      </g>

      {/* Layer 4: Relational solver */}
      <rect x="170" y="255" width="160" height="32" rx="4" fill="url(#orange-grad)" stroke="#EA580C" strokeWidth="1" />
      <text x="250" y="275" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Dependency Graph Resolver</text>

      <line x1="250" y1="287" x2="250" y2="340" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="200" y="304" width="100" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="314" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">O(V + E) Topological Sort</text>
      </g>

      {/* Layer 5: Code gen */}
      <rect x="190" y="340" width="120" height="32" rx="4" fill="url(#green-grad)" stroke="#10B981" strokeWidth="1" />
      <text x="250" y="360" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">Django Code Generator</text>

      {/* Splits to generated output */}
      <line x1="220" y1="372" x2="150" y2="420" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="250" y1="372" x2="250" y2="420" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="280" y1="372" x2="350" y2="420" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 6: Outputs */}
      <rect x="100" y="420" width="85" height="25" rx="3" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="142.5" y="436" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">models.py</text>

      <rect x="207.5" y="420" width="85" height="25" rx="3" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="436" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">views.py</text>

      <rect x="315" y="420" width="85" height="25" rx="3" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="357.5" y="436" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">admin.py</text>
    </svg>
  );

  const renderFileRecovery = () => (
    <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 520" xmlns="http://www.w3.org/2000/svg">
      {renderArrowMarker()}

      {/* Layer 1: Investigator */}
      <rect x="190" y="20" width="120" height="28" rx="14" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
      <text x="250" y="37" fill="#E4E4E7" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Forensics Examiner</text>

      <line x1="250" y1="48" x2="250" y2="95" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="222" y="62" width="56" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="72" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Read Block</text>
      </g>

      {/* Layer 2: Disk image */}
      <ellipse cx="250" cy="103" rx="50" ry="8" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
      <path d="M 200,103 L 200,128 A 50,8 0 0 0 300,128 L 300,103 Z" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
      <ellipse cx="250" cy="103" rx="50" ry="8" fill="#FFFFFF" opacity="0.3" />
      <text x="250" y="121" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">raw Disk Image</text>

      <line x1="250" y1="136" x2="250" y2="190" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 3: Scanner */}
      <rect x="180" y="190" width="140" height="32" rx="4" fill="url(#orange-grad)" stroke="#EA580C" strokeWidth="1" />
      <text x="250" y="210" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Low-Level Sector Scanner</text>

      {/* Splitting scanner results */}
      <line x1="220" y1="222" x2="160" y2="280" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="280" y1="222" x2="340" y2="280" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 4: Header matching and chunk tracing */}
      <rect x="100" y="280" width="110" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="155" y="298" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Signature Matcher</text>

      <rect x="290" y="280" width="110" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="345" y="298" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Cluster Chain Tracer</text>

      {/* Merging down to rebuilder */}
      <line x1="155" y1="310" x2="220" y2="370" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="345" y1="310" x2="280" y2="370" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 5: Reconstruction Engine */}
      <rect x="180" y="370" width="140" height="32" rx="4" fill="url(#green-grad)" stroke="#10B981" strokeWidth="1" />
      <text x="250" y="390" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">File Carver Rebuilder</text>

      <line x1="250" y1="402" x2="250" y2="455" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 6: Reassembled Output */}
      <rect x="180" y="455" width="140" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="473" fill="#18181B" fontSize="9" fontWeight="bold" textAnchor="middle">Reconstructed File Out</text>
    </svg>
  );

  const renderEmailPhishing = () => (
    <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 560" xmlns="http://www.w3.org/2000/svg">
      {renderArrowMarker()}

      {/* Layer 1: SMTP server entry */}
      <rect x="190" y="20" width="120" height="28" rx="14" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
      <text x="250" y="37" fill="#E4E4E7" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SMTP Mail Server</text>

      <line x1="250" y1="48" x2="250" y2="95" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="220" y="62" width="60" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="72" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">SMTP Relay</text>
      </g>

      {/* Layer 2: Raw mail */}
      <rect x="195" y="95" width="110" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="113" fill="#18181B" fontSize="9" fontWeight="bold" textAnchor="middle">Raw Email Envelope</text>

      <line x1="250" y1="125" x2="250" y2="180" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 3: Feature Extractor */}
      <rect x="170" y="180" width="160" height="32" rx="4" fill="url(#orange-grad)" stroke="#EA580C" strokeWidth="1" />
      <text x="250" y="200" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Parser &amp; Heuristic Extractor</text>

      {/* Split to specs */}
      <line x1="220" y1="212" x2="160" y2="270" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="280" y1="212" x2="340" y2="270" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 4: Specific scanners */}
      <rect x="90" y="270" width="130" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="156" y="288" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Domain SPF/DKIM Check</text>

      <rect x="280" y="270" width="130" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="345" y="288" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Vectorized URL Checker</text>

      {/* Feed into ML */}
      <line x1="156" y1="300" x2="220" y2="360" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="345" y1="300" x2="280" y2="360" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 5: ML Classifier */}
      <rect x="180" y="360" width="140" height="32" rx="4" fill="url(#green-grad)" stroke="#10B981" strokeWidth="1" />
      <text x="250" y="380" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">ML Classifier Engine</text>

      <line x1="250" y1="392" x2="250" y2="445" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 6: Alert rating */}
      <rect x="180" y="445" width="140" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="463" fill="#18181B" fontSize="9.5" fontWeight="bold" textAnchor="middle">Threat Rating Solver</text>

      <line x1="250" y1="475" x2="250" y2="515" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Admin Alert */}
      <rect x="190" y="515" width="120" height="24" rx="12" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
      <text x="250" y="530" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">Threat Intelligence Alert</text>
    </svg>
  );

  const renderUnixShell = () => (
    <svg className="w-full h-auto max-w-xl mx-auto" viewBox="0 0 500 540" xmlns="http://www.w3.org/2000/svg">
      {renderArrowMarker()}

      {/* Layer 1: Input */}
      <rect x="190" y="20" width="120" height="28" rx="14" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
      <text x="250" y="37" fill="#E4E4E7" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">User stdin CLI</text>

      <line x1="250" y1="48" x2="250" y2="95" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="220" y="62" width="60" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="72" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">Enter Cmd</text>
      </g>

      {/* Layer 2: Input buffer */}
      <rect x="190" y="95" width="120" height="30" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="113" fill="#18181B" fontSize="9" fontWeight="bold" textAnchor="middle">Input Line Buffer</text>

      <line x1="250" y1="125" x2="250" y2="180" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 3: Lexer */}
      <rect x="180" y="180" width="140" height="32" rx="4" fill="url(#orange-grad)" stroke="#EA580C" strokeWidth="1" />
      <text x="250" y="200" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">Lexer &amp; Tokenizer</text>

      <line x1="250" y1="212" x2="250" y2="265" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      <g>
        <rect x="200" y="232" width="100" height="14" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="0.5" />
        <text x="250" y="242" fill="#A1A1AA" fontSize="7" fontFamily="monospace" textAnchor="middle">AST Parsing &amp; Resolution</text>
      </g>

      {/* Layer 4: Execution routing */}
      <line x1="220" y1="297" x2="160" y2="350" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="280" y1="297" x2="340" y2="350" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 5: Handlers */}
      <rect x="90" y="265" width="130" height="32" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="155" y="285" fill="#18181B" fontSize="8" fontWeight="bold" textAnchor="middle">Pipe &amp; Redirect Resolver</text>

      <rect x="280" y="265" width="130" height="32" rx="4" fill="url(#green-grad)" stroke="#10B981" strokeWidth="1" />
      <text x="345" y="285" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">Process Fork Executor</text>

      {/* Convergence back to state */}
      <line x1="155" y1="297" x2="220" y2="360" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="345" y1="297" x2="280" y2="360" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Layer 6: State manager */}
      <rect x="180" y="360" width="140" height="32" rx="4" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
      <text x="250" y="380" fill="#18181B" fontSize="9" fontWeight="bold" textAnchor="middle">State &amp; Env Manager</text>

      <line x1="250" y1="392" x2="250" y2="445" stroke="#52525B" strokeWidth="1" markerEnd="url(#arrow)" />

      {/* Shell History */}
      <g>
        <rect x="180" y="445" width="140" height="24" rx="2" fill="#27272A" stroke="#3F3F46" strokeWidth="0.5" />
        <text x="250" y="460" fill="#D4D4D8" fontSize="8" fontFamily="monospace" textAnchor="middle">History Logs &amp; Env variables</text>
      </g>
    </svg>
  );

  const getGraphContent = () => {
    switch (slug) {
      case "behavioral-model-observability-platform":
        return renderModelMesh();
      case "ml-visualizer":
        return renderMLVisualizer();
      case "django-rest-synthesizer":
        return renderAPIForge();
      case "file-recovery":
        return renderFileRecovery();
      case "email-phishing-detection":
        return renderEmailPhishing();
      case "statful-unix-shell":
        return renderUnixShell();
      default:
        return null;
    }
  };

  const graph = getGraphContent();

  if (!graph) return null;

  return (
    <div className="bg-[#09090B] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden select-none">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
        backgroundSize: "12px 12px"
      }} />

      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">System Pipeline Blueprint</span>
        </div>
        <span className="text-[9px] font-mono text-[#71717A] uppercase bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A]">Active Trace</span>
      </div>

      {/* The SVG Diagram */}
      <div className="relative z-10 flex items-center justify-center">
        {graph}
      </div>
    </div>
  );
}
