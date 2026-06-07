"use client";

import { 
  Building2, 
  FileCheck, 
  ShieldCheck, 
  Activity,
  AlertTriangle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { TiltCard } from "@/components/TiltCard";
import { ScrollReveal, PageTransition } from "@/components/PageTransition";

const data = [
  { time: '08:00', events: 12 },
  { time: '09:00', events: 19 },
  { time: '10:00', events: 3 },
  { time: '11:00', events: 5 },
  { time: '12:00', events: 2 },
  { time: '13:00', events: 0 },
  { time: '14:00', events: 24 },
];

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="space-y-8 pb-12 pt-4">
        <ScrollReveal delay={0.1}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-glow text-primary uppercase">Command Center</h1>
            <p className="text-primary/70 mt-2 font-mono tracking-widest text-sm uppercase">National Examination Security Operations // Node: Alpha</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Stat Cards */}
          <ScrollReveal delay={0.2}>
            <TiltCard className="p-6 relative overflow-hidden group">
              <div className="flex items-center">
                <div className="p-3 bg-primary/20 rounded-lg text-primary shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-xs font-medium text-secondary-foreground uppercase tracking-widest">Active Centers</p>
                  <h3 className="text-3xl font-bold text-foreground text-glow">4,251</h3>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-full origin-left transform scale-x-0 transition-transform group-hover:scale-x-100 box-shadow-[0_0_10px_var(--primary)]" />
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <TiltCard className="p-6 relative overflow-hidden group">
              <div className="flex items-center">
                <div className="p-3 bg-primary/20 rounded-lg text-primary shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-xs font-medium text-secondary-foreground uppercase tracking-widest">Active Exams</p>
                  <h3 className="text-3xl font-bold text-foreground text-glow">12</h3>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-full origin-left transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <TiltCard className="p-6 relative overflow-hidden group">
              <div className="flex items-center">
                <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-xs font-medium text-secondary-foreground uppercase tracking-widest">Generated</p>
                  <h3 className="text-3xl font-bold text-foreground text-glow">14,209</h3>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-full origin-left transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <TiltCard className="p-6 relative overflow-hidden group">
              <div className="flex items-center">
                <div className="p-3 bg-primary/20 rounded-lg text-primary shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-xs font-medium text-secondary-foreground uppercase tracking-widest">Status</p>
                  <h3 className="text-3xl font-bold text-primary text-glow">SECURE</h3>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-full origin-left transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </TiltCard>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScrollReveal delay={0.6}>
            <div className="lg:col-span-2 glass-panel rounded-xl p-6 h-full flex flex-col cyber-border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-foreground tracking-widest uppercase">Network Activity</h2>
                <span className="px-3 py-1 text-xs font-bold bg-primary/20 text-primary rounded-full shadow-[0_0_10px_rgba(0,240,255,0.3)] animate-pulse">LIVE SYS_MON</span>
              </div>
              <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,240,255,0.1)" vertical={false} />
                    <XAxis dataKey="time" stroke="var(--primary)" fontSize={12} tickLine={false} axisLine={false} opacity={0.7} />
                    <YAxis stroke="var(--primary)" fontSize={12} tickLine={false} axisLine={false} opacity={0.7} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(11,17,32,0.9)', border: '1px solid var(--primary)', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,240,255,0.2)' }}
                      itemStyle={{ color: 'var(--primary)' }}
                    />
                    <Area type="monotone" dataKey="events" stroke="var(--primary)" fillOpacity={1} fill="url(#colorEvents)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <TiltCard className="p-6 flex flex-col h-full">
              <h2 className="text-lg font-bold text-foreground mb-4 tracking-widest uppercase">Threat Intel</h2>
              
              <div className="flex-1 flex flex-col gap-4">
                <div className="p-4 rounded-lg bg-card border border-primary/30 flex items-start gap-4 transition-colors hover:bg-primary/5">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Encryption Matrix</h4>
                    <p className="text-xs text-secondary-foreground mt-1">AES-256 Quantum-resistant locking engaged. Key rot: OK.</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card border border-destructive/50 flex items-start gap-4 hover:bg-destructive/10 transition-colors shadow-[inset_0_0_15px_rgba(255,0,60,0.1)]">
                  <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-destructive text-glow-destructive">Intrusion Alert</h4>
                    <p className="text-xs text-secondary-foreground mt-1">3 unauthorized decrypt attempts at Node #402. IP Blacklisted.</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card border border-primary/30 flex items-start gap-4 transition-colors hover:bg-primary/5">
                  <FileCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Forensic Mesh</h4>
                    <p className="text-xs text-secondary-foreground mt-1">Steganographic tracking active on 100% of payloads.</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
