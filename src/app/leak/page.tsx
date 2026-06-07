"use client";

import { useState } from "react";
import { ShieldAlert, Upload, Search, AlertTriangle, Crosshair, Users, Printer, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, ScrollReveal } from "@/components/PageTransition";
import { TiltCard } from "@/components/TiltCard";

export default function LeakSimulatorPage() {
  const [step, setStep] = useState<"upload" | "analyzing" | "detected">("upload");

  const handleSimulate = () => {
    setStep("analyzing");
    setTimeout(() => {
      setStep("detected");
    }, 4000);
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12 pt-4 max-w-5xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-glow-destructive text-destructive uppercase flex items-center gap-3">
              <ShieldAlert className="h-10 w-10 text-destructive" />
              Threat Analyzer
            </h1>
            <p className="text-destructive/70 mt-2 font-mono tracking-widest text-sm uppercase">Forensic source tracing & leak simulation node</p>
          </div>
        </ScrollReveal>

        {step === "upload" && (
          <ScrollReveal delay={0.2}>
            <TiltCard className="p-12 border-destructive/30 flex flex-col items-center justify-center text-center shadow-[inset_0_0_50px_rgba(255,0,60,0.05)]">
              <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mb-8 border border-destructive/50 shadow-[0_0_30px_rgba(255,0,60,0.2)]">
                <Upload className="h-12 w-12 text-destructive drop-shadow-[0_0_10px_rgba(255,0,60,0.8)]" />
              </div>
              <h2 className="text-2xl font-black text-destructive mb-3 uppercase tracking-widest text-glow-destructive">Upload Suspect Payload</h2>
              <p className="text-primary/70 mb-10 max-w-lg font-mono text-sm">
                Insert a raw image or document scan. The system will reverse-engineer steganographic meshes to identify origin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <button className="flex-1 bg-background/50 border border-primary/30 hover:border-primary/80 hover:bg-primary/10 text-primary py-4 px-6 rounded-lg transition-all font-bold uppercase tracking-widest text-sm shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                  Browse Hash...
                </button>
                <button 
                  onClick={handleSimulate}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground py-4 px-6 rounded-lg transition-all font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,0,60,0.5)] hover:shadow-[0_0_30px_rgba(255,0,60,0.8)] hover:scale-105"
                >
                  Force Demo Inject
                </button>
              </div>
            </TiltCard>
          </ScrollReveal>
        )}

        {step === "analyzing" && (
          <ScrollReveal delay={0}>
            <div className="glass-panel rounded-xl p-12 cyber-border border-destructive/50 flex flex-col items-center justify-center min-h-[400px] shadow-[inset_0_0_50px_rgba(255,0,60,0.1)]">
              <div className="relative mb-6">
                <Search className="h-24 w-24 text-destructive absolute opacity-20 drop-shadow-[0_0_20px_rgba(255,0,60,0.8)]" />
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                >
                  <Crosshair className="h-24 w-24 text-destructive drop-shadow-[0_0_15px_rgba(255,0,60,1)]" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-black text-destructive mt-8 mb-2 uppercase tracking-widest text-glow-destructive">Deep Scanning Matrix</h2>
              
              <div className="w-full max-w-lg mt-8 space-y-5 font-mono text-sm bg-background/80 p-6 rounded-lg border border-destructive/30 shadow-[inset_0_0_20px_rgba(255,0,60,0.1)]">
                <div className="flex justify-between text-primary/70 border-b border-destructive/20 pb-2">
                  <span>Extracting steganographic mesh...</span>
                  <span className="text-emerald-400 font-bold">DONE</span>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex justify-between text-primary/70 border-b border-destructive/20 pb-2"
                >
                  <span>Reconstructing error-corrected bits...</span>
                  <span className="text-emerald-400 font-bold">DONE</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="flex justify-between text-primary/70 pb-2"
                >
                  <span>Querying root forensic database...</span>
                  <span className="text-destructive font-black animate-pulse text-glow-destructive">MATCH LOCATED</span>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {step === "detected" && (
          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-destructive/20 border-l-8 border-destructive p-8 rounded-r-xl border-y border-r border-destructive/50 flex flex-col sm:flex-row items-center gap-6 shadow-[0_0_30px_rgba(255,0,60,0.3)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-destructive to-transparent"></div>
                <AlertTriangle className="h-16 w-16 text-destructive shrink-0 drop-shadow-[0_0_15px_rgba(255,0,60,0.8)] animate-pulse" />
                <div>
                  <h2 className="text-3xl font-black text-destructive tracking-widest uppercase text-glow-destructive">Critical: Leak Verified</h2>
                  <p className="text-destructive/80 mt-2 font-mono text-sm uppercase">Forensic mesh matched with 97.4% accuracy. Trace complete.</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={0.2}>
                <TiltCard className="p-8 border-destructive/30 shadow-[inset_0_0_30px_rgba(255,0,60,0.05)] h-full">
                  <h3 className="text-xl font-black text-destructive border-b border-destructive/30 pb-4 mb-6 uppercase tracking-widest text-glow-destructive">Origin Trace</h3>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center p-4 bg-background/80 border border-destructive/30 rounded-lg shadow-[inset_0_0_10px_rgba(255,0,60,0.1)]">
                      <span className="text-primary/70 flex items-center gap-3 text-xs uppercase tracking-widest font-bold"><Crosshair className="h-5 w-5 text-destructive" /> Node Origin</span>
                      <span className="font-black text-foreground text-right text-sm">Mysore Center 42<br/><span className="text-destructive text-glow-destructive">MYS-42</span></span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/80 border border-destructive/30 rounded-lg shadow-[inset_0_0_10px_rgba(255,0,60,0.1)]">
                      <span className="text-primary/70 flex items-center gap-3 text-xs uppercase tracking-widest font-bold"><Printer className="h-5 w-5 text-destructive" /> Terminal</span>
                      <span className="font-bold text-destructive font-mono text-glow-destructive">PR-009-SEC</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/80 border border-destructive/30 rounded-lg shadow-[inset_0_0_10px_rgba(255,0,60,0.1)]">
                      <span className="text-primary/70 flex items-center gap-3 text-xs uppercase tracking-widest font-bold"><Clock className="h-5 w-5 text-destructive" /> UTC Marker</span>
                      <span className="font-bold text-primary font-mono">08:02:22 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-destructive/10 border border-destructive/50 rounded-lg shadow-[0_0_15px_rgba(255,0,60,0.2)]">
                      <span className="text-primary/70 flex items-center gap-3 text-xs uppercase tracking-widest font-bold"><ShieldAlert className="h-5 w-5 text-destructive animate-pulse" /> Match Score</span>
                      <span className="font-black text-2xl text-destructive text-glow-destructive">97.4%</span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <TiltCard className="p-8 border-destructive/30 shadow-[inset_0_0_30px_rgba(255,0,60,0.05)] h-full flex flex-col">
                  <h3 className="text-xl font-black text-destructive border-b border-destructive/30 pb-4 mb-6 uppercase tracking-widest text-glow-destructive">Custody Chain Logs</h3>
                  <div className="space-y-5 flex-1">
                    <div className="flex justify-between items-center p-4 bg-background/80 border border-primary/20 rounded-lg">
                      <span className="text-primary/70 flex items-center gap-3 text-xs uppercase tracking-widest font-bold"><Users className="h-5 w-5 text-primary" /> Center Head</span>
                      <span className="font-bold text-foreground font-mono">Dr. Ramesh Kumar</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/80 border border-primary/20 rounded-lg">
                      <span className="text-primary/70 flex items-center gap-3 text-xs uppercase tracking-widest font-bold"><Users className="h-5 w-5 text-primary" /> Govt Observer</span>
                      <span className="font-bold text-foreground font-mono">Smt. Anita Desai</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/80 border border-primary/20 rounded-lg">
                      <span className="text-primary/70 flex items-center gap-3 text-xs uppercase tracking-widest font-bold"><Users className="h-5 w-5 text-primary" /> Ind. Auditor</span>
                      <span className="font-bold text-foreground font-mono">Mr. Vikram Singh</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-destructive/30">
                    <button className="w-full bg-destructive/20 hover:bg-destructive text-destructive hover:text-destructive-foreground border border-destructive py-4 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(255,0,60,0.3)] hover:shadow-[0_0_30px_rgba(255,0,60,0.8)] uppercase tracking-widest text-sm">
                      Execute Lockdown Protocol
                    </button>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
