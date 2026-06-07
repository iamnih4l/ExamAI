"use client";

import { useState, useEffect } from "react";
import { FileText, ShieldCheck, Key, Printer, Lock } from "lucide-react";
import { PageTransition, ScrollReveal } from "@/components/PageTransition";
import { TiltCard } from "@/components/TiltCard";

type LogEvent = {
  id: number;
  time: string;
  type: string;
  message: string;
  icon: any;
  color: string;
  border: string;
};

const initialLogs: LogEvent[] = [
  { id: 5, time: "08:05:30 AM", type: "PRINT", message: "Print sequence completed. 500 payload units instantiated at MYS-42.", icon: Printer, color: "text-blue-400", border: "border-blue-400/50" },
  { id: 4, time: "08:02:22 AM", type: "PRINT", message: "Print directive active. Steganographic mesh injection initiated.", icon: Printer, color: "text-blue-500", border: "border-blue-500/50" },
  { id: 3, time: "08:01:15 AM", type: "UNLOCK", message: "Payload decrypted. 3/3 cryptographic keys verified.", icon: Key, color: "text-emerald-400", border: "border-emerald-400/50" },
  { id: 2, time: "08:00:12 AM", type: "AUTH", message: "Consensus key registered from Independent Auditor.", icon: ShieldCheck, color: "text-primary", border: "border-primary/50" },
  { id: 1, time: "08:00:01 AM", type: "ENCRYPT", message: "Payload encrypted with AES-256 Quantum Lattice. Key rotation complete.", icon: Lock, color: "text-yellow-400", border: "border-yellow-400/50" },
];

export default function AuditLogPage() {
  const [logs, setLogs] = useState<LogEvent[]>(initialLogs);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [
        { 
          id: Date.now(), 
          time: now, 
          type: "SYS_MON", 
          message: "Automated network perimeter handshake validated. Entropy normal.", 
          icon: ShieldCheck, 
          color: "text-primary",
          border: "border-primary/50"
        },
        ...prev
      ].slice(0, 50));
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageTransition>
      <div className="space-y-6 pb-12 pt-4 max-w-4xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-glow text-primary uppercase flex items-center gap-3">
              <FileText className="h-10 w-10 text-primary" />
              Immutable Ledger
            </h1>
            <p className="text-primary/70 mt-2 font-mono tracking-widest text-sm uppercase">Cryptographically signed live event stream</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-panel rounded-xl p-10 cyber-border">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-primary/30">
              <h2 className="text-xl font-black text-primary flex items-center gap-3 uppercase tracking-widest text-glow">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 shadow-[0_0_15px_rgba(0,240,255,1)]"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </span>
                Active Data Stream
              </h2>
              <button className="bg-primary/10 border border-primary hover:bg-primary/30 px-5 py-2 rounded-lg text-xs font-bold text-primary transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] uppercase tracking-widest">
                Export JSON Hash
              </button>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
              {logs.map((log, idx) => {
                const Icon = log.icon;
                return (
                  <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,240,255,0.4)] z-10`}>
                      <Icon className={`h-4 w-4 ${log.color}`} />
                    </div>
                    {/* Content */}
                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-background/80 border ${log.border} p-5 rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 backdrop-blur-sm relative overflow-hidden`}>
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-primary/70">{log.time}</span>
                        <span className={`text-[10px] font-black ${log.color} bg-background/50 px-2 py-1 rounded border border-current tracking-widest uppercase shadow-[0_0_10px_currentColor]`}>{log.type}</span>
                      </div>
                      <p className="text-sm font-mono text-foreground/90">{log.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
