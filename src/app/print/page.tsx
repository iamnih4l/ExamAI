"use client";

import { useState } from "react";
import { Printer, ScanLine, FileCheck2, Fingerprint, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, ScrollReveal } from "@/components/PageTransition";
import { TiltCard } from "@/components/TiltCard";

export default function PrintCenterPage() {
  const [printing, setPrinting] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [copies, setCopies] = useState(500);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
      setPrinted(true);
    }, 4000);
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12 pt-4 max-w-5xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-glow text-primary uppercase flex items-center gap-3">
              <Printer className="h-10 w-10 text-primary" />
              Physical Manifest Node
            </h1>
            <p className="text-primary/70 mt-2 font-mono tracking-widest text-sm uppercase">Secure printing & steganographic watermark injection</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <ScrollReveal delay={0.2}>
            <TiltCard className="p-8 h-full flex flex-col">
              <h2 className="text-xl font-bold text-primary border-b border-primary/30 pb-4 mb-6 uppercase tracking-widest text-glow">Print Directive config</h2>
              
              <div className="space-y-8 flex-1 flex flex-col justify-between">
                <div className="bg-background/80 border border-primary/30 p-5 rounded-lg flex justify-between items-center shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]">
                  <div>
                    <span className="text-xs text-primary/70 uppercase block mb-1 tracking-widest font-bold">Target Hash</span>
                    <span className="font-mono font-bold text-primary text-lg text-glow">NEET-2027-H127</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded text-xs font-black border border-emerald-500/50 shadow-[0_0_10px_rgba(52,211,153,0.3)] tracking-widest uppercase">UNLOCKED</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-primary/70 mb-2 uppercase tracking-widest">Node ID</label>
                    <div className="font-mono text-primary font-bold bg-background/80 border border-primary/30 rounded px-4 py-3 shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]">MYS-42</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary/70 mb-2 uppercase tracking-widest">Terminal ID</label>
                    <div className="font-mono text-primary font-bold bg-background/80 border border-primary/30 rounded px-4 py-3 shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]">PR-009-SEC</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary/70 mb-2 uppercase tracking-widest">Volume (Copies)</label>
                  <input 
                    type="number" 
                    value={copies}
                    onChange={(e) => setCopies(Number(e.target.value))}
                    className="w-full bg-background border border-primary/50 rounded-lg px-5 py-4 text-2xl font-mono text-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
                  />
                </div>

                {!printed && !printing && (
                  <button 
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground py-5 px-6 rounded-xl font-black text-xl transition-all shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] uppercase tracking-widest hover:scale-105"
                  >
                    <Printer className="h-7 w-7" />
                    Engage Print Sequence
                  </button>
                )}

                {printing && (
                  <div className="w-full flex items-center justify-center gap-3 bg-primary/10 text-primary py-5 px-6 rounded-xl font-bold text-lg border border-primary shadow-[0_0_15px_rgba(0,240,255,0.2)] uppercase tracking-widest">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    Injecting Watermark...
                  </div>
                )}
                
                {printed && (
                  <div className="w-full flex items-center justify-center gap-3 bg-emerald-500/20 text-emerald-400 py-5 px-6 rounded-xl font-black text-lg border border-emerald-500/50 shadow-[0_0_20px_rgba(52,211,153,0.3)] uppercase tracking-widest">
                    <FileCheck2 className="h-7 w-7" />
                    Sequence Terminated: Success
                  </div>
                )}
              </div>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="glass-panel rounded-xl p-8 border border-primary/30 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-card to-background/50 h-full cyber-border shadow-[inset_0_0_30px_rgba(0,240,255,0.05)]">
              <div className="absolute top-0 right-0 p-6">
                <ScanLine className="h-8 w-8 text-primary opacity-30" />
              </div>

              <Fingerprint className={`h-32 w-32 mb-8 ${printing ? 'text-primary drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]' : printed ? 'text-emerald-500 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]' : 'text-primary/20'} transition-all duration-500`} />
              
              <h3 className="text-2xl font-bold text-primary mb-3 text-center uppercase tracking-widest text-glow">Invisible Mesh Tracking</h3>
              <p className="text-primary/60 text-center font-mono text-sm mb-10 max-w-sm">
                Payloads embedded with steganographic identifiers mapping to Terminal ID, Node ID, and UTC Timestamp.
              </p>

              {printing && (
                <div className="w-full max-w-sm">
                  <div className="flex justify-between text-xs mb-2 font-mono font-bold text-primary uppercase tracking-widest text-glow">
                    <span>Synthesizing Metadata</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-background border border-primary/30 rounded-full h-1.5 overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4 }}
                      className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_#00F0FF]"
                    />
                  </div>
                </div>
              )}

              {printed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-sm bg-background/80 border border-emerald-500/50 p-5 rounded-lg space-y-3 font-mono text-sm text-primary shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                >
                  <div className="flex justify-between border-b border-primary/20 pb-2">
                    <span className="text-primary/70">UTC Marker</span>
                    <span className="font-bold text-glow">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/20 pb-2">
                    <span className="text-primary/70">Volume Output</span>
                    <span className="font-bold text-glow">{copies} Units</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-primary/70">Mesh Integrity</span>
                    <span className="text-emerald-400 font-black">VERIFIED ✓</span>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
