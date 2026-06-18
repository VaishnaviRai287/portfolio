"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code, Cpu, FileCode2, ArrowRight } from "lucide-react";

type ActiveTab = "models" | "views" | "serializers" | "urls";

export default function APIForgeVisual() {
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("models");
  const [compilerStep, setCompilerStep] = useState<string>("idle");
  const [parseLogs, setParseLogs] = useState<string[]>([]);
  const [astTree, setAstTree] = useState<boolean>(false);
  const [graphProgress, setGraphProgress] = useState<number>(0);

  // Schema DSL definition
  const schemaDSL = `model User {
  username: String
  email: String
  is_active: Boolean
}

model ModelProfile {
  user: ForeignKey(User)
  name: String
  framework: String
  version: String
}`;

  // Generated django code mapping
  const generatedCode = {
    models: `from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField()
    is_active = models.BooleanField(default=True)

class ModelProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    framework = models.CharField(max_length=50)
    version = models.CharField(max_length=20)`,
    views: `from rest_framework import viewsets
from .models import User, ModelProfile
from .serializers import UserSerializer, ModelProfileSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ModelProfileViewSet(viewsets.ModelViewSet):
    queryset = ModelProfile.objects.all()
    serializer_class = ModelProfileSerializer`,
    serializers: `from rest_framework import serializers
from .models import User, ModelProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ModelProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelProfile
        fields = '__all__'`,
    urls: `from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ModelProfileViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('modelprofiles', ModelProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]`,
  };

  const handleCompile = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setAstTree(false);
    setGraphProgress(0);
    setCompilerStep("lexing");
    setParseLogs(["[LEX] Scanning stream for identifiers...", "[LEX] Found model declarations: User, ModelProfile"]);

    setTimeout(() => {
      setCompilerStep("parsing");
      setParseLogs(prev => [...prev, "[PARSE] Reconstructing Abstract Syntax Tree (AST)", "[AST] Node identified: user -> ForeignKey relation"]);
      setAstTree(true);
    }, 1200);

    setTimeout(() => {
      setCompilerStep("traversal");
      setParseLogs(prev => [...prev, "[GRAPH] Traversing relational dependency passes (O(V+E))", "[GRAPH] Resolved ForeignKey link cascades: ModelProfile -> User"]);
      setGraphProgress(1);
    }, 2400);

    setTimeout(() => {
      setCompilerStep("generation");
      setParseLogs(prev => [...prev, "[GEN] Building Django models and views...", "[GEN] Compilation complete! Output generated in 4.82ms"]);
      setIsCompiling(false);
    }, 3600);
  };

  // Run initial compile
  useEffect(() => {
    handleCompile();
  }, []);

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-xl overflow-hidden shadow-sm flex flex-col font-sans h-full">
      {/* Visual Header */}
      <div className="px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between bg-[#FAF8F3]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#EA580C]" />
          <h3 className="text-sm font-semibold tracking-tight text-[#111111] font-mono">apiforge_compiler --compile</h3>
        </div>
        <button
          onClick={handleCompile}
          disabled={isCompiling}
          className={`text-[10px] font-mono border px-3 py-1 rounded bg-[#2563EB] text-white hover:bg-[#2563EB]/90 transition duration-200 ${
            isCompiling ? "opacity-55 cursor-not-allowed" : ""
          }`}
        >
          {isCompiling ? "COMPILING..." : "TRIGGER COMPILE"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        {/* Column 1: Schema DSL Editor */}
        <div className="lg:col-span-4 p-5 flex flex-col border-r border-[#E7E2D8]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] mb-2">DSL input schema</span>
          <div className="flex-1 bg-[#FAF8F3] border border-[#E7E2D8] rounded p-4 font-mono text-[10px] text-[#111111] overflow-auto whitespace-pre leading-relaxed shadow-inner select-all">
            {schemaDSL}
          </div>
        </div>

        {/* Column 2: AST Parser & Dependency Pipeline */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between border-r border-[#E7E2D8] bg-[#FAF8F3]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] mb-2">Compiler Pipeline</span>

          <div className="space-y-4 my-auto relative">
            {/* Parser Node */}
            <div className={`p-2.5 rounded border transition-all duration-300 ${
              compilerStep === "lexing" || compilerStep === "parsing" ? "bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB]" : "bg-[#FFFFFF] border-[#E7E2D8] text-[#111111]"
            }`}>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold">Lexer & AST Parser</span>
              </div>
              <AnimatePresence>
                {astTree && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-[9px] font-mono bg-white/70 border border-[#E7E2D8] rounded p-1.5 leading-normal space-y-0.5 text-[#5C5C5C]"
                  >
                    <div>ASTNode(type=model, name=User)</div>
                    <div>&nbsp;├─ Field(name=username, type=String)</div>
                    <div>ASTNode(type=model, name=ModelProfile)</div>
                    <div>&nbsp;└─ RelField(name=user, ref=User)</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Traversal Node */}
            <div className={`p-2.5 rounded border transition-all duration-300 ${
              compilerStep === "traversal" ? "bg-[#16A34A]/10 border-[#16A34A] text-[#16A34A]" : "bg-[#FFFFFF] border-[#E7E2D8] text-[#111111]"
            }`}>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold">Relational Dependency Graph</span>
              </div>
              {graphProgress > 0 && (
                <div className="mt-2 flex items-center gap-2 text-[9px] font-mono text-[#5C5C5C]">
                  <span>Dependency:</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#E7E2D8] font-bold text-[#16A34A]">ModelProfile &rarr; User</span>
                </div>
              )}
            </div>

            {/* Generator Node */}
            <div className={`p-2.5 rounded border transition-all duration-300 ${
              compilerStep === "generation" ? "bg-[#EA580C]/10 border-[#EA580C] text-[#EA580C]" : "bg-[#FFFFFF] border-[#E7E2D8] text-[#111111]"
            }`}>
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4" />
                <span className="text-[11px] font-mono font-bold">Django Code Generator</span>
              </div>
            </div>
          </div>

          {/* Compilation logger trace */}
          <div className="mt-6 border border-[#E7E2D8] bg-[#111111] text-[#E7E2D8] rounded p-2.5 font-mono text-[8px] h-24 overflow-y-auto select-none">
            {parseLogs.map((log, idx) => (
              <div key={idx} className={log.includes("[GEN] Compilation complete") ? "text-[#16A34A] font-bold" : "text-[#A8A29E]"}>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Generated Django Files */}
        <div className="lg:col-span-4 p-5 flex flex-col">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C5C5C] mb-2">Generated output</span>
          
          <div className="flex flex-col flex-1 border border-[#E7E2D8] rounded overflow-hidden bg-[#FAF8F3]">
            {/* Tabs */}
            <div className="flex border-b border-[#E7E2D8] bg-[#FFFFFF] text-[10px] font-mono text-[#5C5C5C]">
              {(["models", "views", "serializers", "urls"] as ActiveTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-center border-r border-[#E7E2D8] last:border-r-0 hover:bg-[#FAF8F3] transition duration-200 ${
                    activeTab === tab ? "bg-[#FAF8F3] font-bold text-[#111111] border-b-2 border-b-[#EA580C]" : ""
                  }`}
                >
                  {tab}.py
                </button>
              ))}
            </div>

            {/* Code editor view */}
            <div className="flex-1 p-4 font-mono text-[9px] text-[#111111] overflow-auto whitespace-pre leading-relaxed select-all">
              {generatedCode[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
