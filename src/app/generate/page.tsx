"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, FileCode2, Lock, Shield, Cpu, Key, FileCheck2 } from "lucide-react";
import { cn } from "@/components/Sidebar";
import { PageTransition, ScrollReveal } from "@/components/PageTransition";
import { TiltCard } from "@/components/TiltCard";

export default function GeneratePaperPage() {
  const [step, setStep] = useState<"form" | "generating" | "generated" | "encrypting" | "locked">("form");
  const [examName, setExamName] = useState("NEET-2027");
  const [versionId, setVersionId] = useState("");
  const [packageId, setPackageId] = useState("");

  const handleGenerate = async () => {
    setStep("generating");
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examName, count: 10 })
      });
      const data = await res.json();
      
      setTimeout(() => {
        setVersionId(data.versionId);
        setPackageId(data.packageId); // Store for the lock screen
        setStep("generated");
      }, 2000); // Keep UI delay for aesthetics
    } catch (e) {
      console.error(e);
      setStep("form");
    }
  };

  const handleEncrypt = () => {
    setStep("encrypting");
    setTimeout(() => {
      setStep("locked");
    }, 3000);
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl mx-auto pb-12 pt-4">
        <ScrollReveal delay={0.1}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-glow text-primary uppercase flex items-center gap-3">
              <Bot className="h-10 w-10 text-primary" />
              AI Assembly Core
            </h1>
            <p className="text-primary/70 mt-2 font-mono tracking-widest text-sm uppercase">Generate and encrypt secure payloads</p>
          </div>
        </ScrollReveal>

        {step === "form" && (
          <ScrollReveal delay={0.2}>
            <div className="glass-panel rounded-xl p-8 cyber-border">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-widest">Payload Designation</label>
                    <input 
                      type="text" 
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-mono shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]"
                      placeholder="e.g. NEET-2027"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-widest">Node Count</label>
                    <input 
                      type="number" 
                      defaultValue={100}
                      className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-mono shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-4 uppercase tracking-widest">Subject Matrix</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(subj => (
                      <div key={subj} className="flex items-center gap-3 p-3 border border-primary/20 rounded-lg bg-background/50 hover:border-primary/50 transition-colors">
                        <input type="checkbox" defaultChecked className="text-primary rounded border-primary bg-background focus:ring-primary" />
                        <span className="text-xs font-mono text-primary uppercase">{subj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-4 uppercase tracking-widest">Difficulty Curve</label>
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 bg-background/50 border border-emerald-500/30 rounded-lg p-4 text-center shadow-[inset_0_0_15px_rgba(52,211,153,0.1)]">
                      <span className="text-xs text-emerald-400 block mb-1 uppercase font-bold tracking-widest">Easy</span>
                      <span className="text-2xl font-bold text-emerald-400 text-glow">30%</span>
                    </div>
                    <div className="flex-1 bg-background/50 border border-yellow-500/30 rounded-lg p-4 text-center shadow-[inset_0_0_15px_rgba(234,179,8,0.1)]">
                      <span className="text-xs text-yellow-400 block mb-1 uppercase font-bold tracking-widest">Medium</span>
                      <span className="text-2xl font-bold text-yellow-400 text-glow">50%</span>
                    </div>
                    <div className="flex-1 bg-background/50 border border-destructive/30 rounded-lg p-4 text-center shadow-[inset_0_0_15px_rgba(255,0,60,0.1)]">
                      <span className="text-xs text-destructive block mb-1 uppercase font-bold tracking-widest">Hard</span>
                      <span className="text-2xl font-bold text-destructive text-glow-destructive">20%</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  className="w-full mt-8 flex items-center justify-center gap-3 bg-primary/20 hover:bg-primary/40 text-primary border border-primary py-4 px-4 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] uppercase tracking-widest"
                >
                  <Cpu className="h-6 w-6" />
                  Initialize Core Assembly
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {step === "generating" && (
          <ScrollReveal delay={0}>
            <div className="glass-panel rounded-xl p-12 flex flex-col items-center justify-center cyber-border min-h-[400px]">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="mb-8"
              >
                <Cpu className="h-20 w-20 text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-primary mb-2 uppercase tracking-widest text-glow">Synthesizing Nodes...</h3>
              <p className="text-primary/70 text-center max-w-md font-mono text-sm uppercase">
                Balancing difficulty curves and computing entropy for unique payload generation.
              </p>
              <div className="w-full max-w-md bg-background border border-primary/30 rounded-full h-2 mt-8 overflow-hidden relative shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                  className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_#00F0FF]"
                />
              </div>
            </div>
          </ScrollReveal>
        )}

        {step === "generated" && (
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="glass-panel rounded-xl p-6 border-l-4 border-l-emerald-500 cyber-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-widest text-glow">
                    <FileCheck2 className="h-6 w-6" />
                    Payload Assembled
                  </h3>
                  <p className="text-sm text-emerald-400/70 mt-1 font-mono uppercase">Version Hex: <span className="text-emerald-400 font-bold">{versionId}</span></p>
                </div>
                <button 
                  onClick={handleEncrypt}
                  className="flex items-center gap-2 bg-primary/20 text-primary border border-primary hover:bg-primary/40 py-3 px-6 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] uppercase tracking-widest w-full sm:w-auto"
                >
                  <Lock className="h-5 w-5" />
                  Engage AES-256
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <TiltCard className="p-8 relative overflow-hidden bg-[#F8FAFC] text-black min-h-[500px]">
                <div className="border-b-2 border-black pb-4 mb-6 text-center relative z-10">
                  <h2 className="text-3xl font-extrabold uppercase tracking-wider">{examName}</h2>
                  <p className="font-mono mt-1 text-sm font-bold">Version: {versionId}</p>
                </div>
                <div className="space-y-8 relative z-10">
                  {[1, 2, 3].map(q => (
                    <div key={q}>
                      <p className="font-bold mb-2">Q{q}. A particle moves in a straight line with retardation proportional to its displacement. Its loss of kinetic energy for any displacement x is proportional to:</p>
                      <ol className="list-[lower-alpha] pl-6 space-y-1 font-medium">
                        <li>x</li>
                        <li>e^x</li>
                        <li>x²</li>
                        <li>log x</li>
                      </ol>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        )}

        {step === "encrypting" && (
          <ScrollReveal delay={0}>
            <div className="glass-panel rounded-xl p-12 cyber-border min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-0 bg-background"
              >
                {/* Matrix rain effect */}
                <div className="w-full h-full opacity-40 text-primary font-mono text-sm overflow-hidden leading-tight break-all p-4 text-glow">
                  {Array.from({length: 1500}).map(() => Math.random().toString(36).substring(2)).join("")}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="z-10 bg-card/90 backdrop-blur-xl p-8 rounded-2xl border border-primary shadow-[0_0_30px_rgba(0,240,255,0.5)] flex flex-col items-center"
              >
                <Lock className="h-20 w-20 text-primary mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
                <h3 className="text-2xl font-bold text-primary mb-2 uppercase tracking-widest text-glow">Encrypting Data</h3>
                <p className="text-primary/80 font-mono text-sm uppercase">Applying quantum-resistant lattice locking...</p>
              </motion.div>
            </div>
          </ScrollReveal>
        )}

        {step === "locked" && (
          <ScrollReveal delay={0}>
            <div className="glass-panel rounded-xl p-12 border-2 border-primary border-dashed min-h-[400px] flex flex-col items-center justify-center text-center shadow-[inset_0_0_50px_rgba(0,240,255,0.1)]">
              <div className="h-28 w-28 rounded-full bg-primary/10 flex items-center justify-center mb-8 relative border border-primary/50 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                <Shield className="h-14 w-14 text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                <Lock className="h-6 w-6 text-background absolute bottom-6 right-6" />
              </div>
              <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-widest text-glow uppercase">Payload Secured</h2>
              <p className="text-primary/70 max-w-md mb-10 font-mono text-sm uppercase">
                Data packet is encrypted. Requires multi-node authorization keys to unpack.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
                <div className="bg-background/50 border border-primary/30 p-5 rounded-lg shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]">
                  <span className="text-xs text-primary/60 block mb-2 uppercase tracking-widest font-bold">Node Identity</span>
                  <span className="font-mono font-bold text-primary text-lg">{versionId}</span>
                </div>
                <div className="bg-background/50 border border-primary/30 p-5 rounded-lg shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]">
                  <span className="text-xs text-primary/60 block mb-2 uppercase tracking-widest font-bold">Crypto Hash</span>
                  <span className="font-mono font-bold text-primary text-lg text-glow">{packageId}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </PageTransition>
  );
}
