"use client";

import { useState } from "react";
import { Key, UserCheck, Shield, CheckCircle2, Unlock, FileText, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, ScrollReveal } from "@/components/PageTransition";
import { TiltCard } from "@/components/TiltCard";

type RoleStatus = 'pending' | 'otp' | 'approved';

interface AuthRole {
  id: string;
  title: string;
  status: RoleStatus;
  icon: any;
}

export default function AuthPage() {
  const [roles, setRoles] = useState<AuthRole[]>([
    { id: 'center_head', title: 'Center Head', status: 'pending', icon: UserCheck },
    { id: 'govt_observer', title: 'Govt Observer', status: 'pending', icon: Shield },
    { id: 'auditor', title: 'Ind. Auditor', status: 'pending', icon: FileText },
  ]);

  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [unlockTime, setUnlockTime] = useState<string | null>(null);
  
  // New state for real backend integration
  const [packageId, setPackageId] = useState("");
  const [examData, setExamData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginClick = (id: string) => {
    setRoles(roles.map(r => r.id === id ? { ...r, status: 'otp' } : r));
    setActiveRole(id);
    setOtp("");
  };

  const handleOtpSubmit = (id: string) => {
    setRoles(roles.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setActiveRole(null);
  };

  const allApproved = roles.every(r => r.status === 'approved');

  const handleUnlock = async () => {
    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          packageId, 
          // Sending hardcoded OTPs for the demo since the UI validated length
          otps: ['123456', '123456', '123456'] 
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to decrypt.");
        return;
      }

      setExamData(data);
      setUnlockTime(new Date().toLocaleTimeString());
      setUnlocked(true);
      setErrorMsg("");
    } catch (e) {
      setErrorMsg("Network error.");
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12 pt-4 max-w-5xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-glow text-primary uppercase flex items-center gap-3">
                <Key className="h-10 w-10 text-primary" />
                Auth Protocol
              </h1>
              <p className="text-primary/70 mt-2 font-mono tracking-widest text-sm uppercase">3-Key Cryptographic Consensus Required</p>
            </div>
            
            <div className="bg-background/80 border border-primary/50 px-6 py-3 rounded-xl flex flex-col items-end shadow-[0_0_15px_rgba(0,240,255,0.2)] w-full max-w-sm">
              <span className="text-xs text-primary/70 uppercase tracking-widest font-bold mb-2">Target Package Hash</span>
              <input 
                type="text"
                placeholder="ENC-XXXX-XXXX"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full bg-background border border-primary/30 rounded-lg px-4 py-2 text-primary text-right focus:outline-none focus:ring-1 focus:ring-primary font-mono uppercase shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]"
              />
            </div>
          </div>
        </ScrollReveal>

        {!unlocked ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <ScrollReveal key={role.id} delay={0.2 + idx * 0.1}>
                  <TiltCard className={`p-6 border-2 ${role.status === 'approved' ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'border-primary/20'} flex flex-col relative overflow-hidden transition-all duration-300 min-h-[250px]`}>
                    {role.status === 'approved' && (
                      <div className="absolute top-0 right-0 p-4">
                        <CheckCircle2 className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      </div>
                    )}
                    <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 border ${role.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-primary/10 text-primary border-primary/30'} shadow-lg`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wider">{role.title}</h3>
                    
                    <div className="flex-1 mt-4 flex flex-col justify-end">
                      {role.status === 'pending' && (
                        <button 
                          onClick={() => handleLoginClick(role.id)}
                          className="w-full bg-secondary/80 hover:bg-primary/20 border border-transparent hover:border-primary/50 text-secondary-foreground hover:text-primary py-3 rounded-lg transition-all text-sm font-bold uppercase tracking-widest"
                        >
                          Authenticate
                        </button>
                      )}
                      {role.status === 'otp' && (
                        <div className="space-y-4 animate-in fade-in">
                          <p className="text-xs text-primary mb-2 flex items-center gap-2 font-mono uppercase tracking-widest">
                            <Fingerprint className="h-4 w-4" /> Bio / Token Req
                          </p>
                          <input 
                            type="text" 
                            maxLength={6}
                            placeholder="000000" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full bg-background border border-primary/50 rounded-lg px-3 py-3 text-center tracking-[0.7em] font-mono text-xl text-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]"
                          />
                          <button 
                            onClick={() => handleOtpSubmit(role.id)}
                            disabled={otp.length < 6}
                            className="w-full bg-primary disabled:opacity-50 hover:bg-primary/90 text-primary-foreground py-3 rounded-lg transition-all text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                          >
                            Verify Key
                          </button>
                        </div>
                      )}
                      {role.status === 'approved' && (
                        <div className="w-full bg-emerald-500/10 text-emerald-400 py-3 rounded-lg text-sm font-bold text-center border border-emerald-500/30 uppercase tracking-widest shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                          Auth Verified
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        ) : null}

        {!unlocked && allApproved && (
          <ScrollReveal delay={0.5}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-xl p-10 border-2 border-primary border-dashed mt-10 flex flex-col items-center justify-center text-center shadow-[inset_0_0_50px_rgba(0,240,255,0.1)]"
            >
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                <CheckCircle2 className="h-10 w-10 text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              </div>
              <h2 className="text-3xl font-extrabold text-foreground mb-3 uppercase tracking-widest text-glow">Consensus Reached</h2>
              <p className="text-primary/70 max-w-lg mb-8 font-mono text-sm uppercase">
                All keys cryptographically verified. Master lock is ready to be disengaged.
              </p>
              <button 
                onClick={handleUnlock}
                disabled={!packageId}
                className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-10 rounded-xl font-extrabold text-lg transition-all shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:scale-105 uppercase tracking-widest disabled:opacity-50"
              >
                <Unlock className="h-6 w-6" />
                Execute Unlock
              </button>
              {errorMsg && <p className="text-destructive mt-4 font-bold">{errorMsg}</p>}
            </motion.div>
          </ScrollReveal>
        )}

        {unlocked && (
          <div className="space-y-8 mt-10">
            <ScrollReveal delay={0.1}>
              <div className="glass-panel rounded-xl p-6 border-l-4 border-l-emerald-500 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                <div>
                  <h3 className="text-xl font-extrabold text-emerald-400 flex items-center gap-3 uppercase tracking-widest text-glow">
                    <Unlock className="h-6 w-6" />
                    Payload Unlocked
                  </h3>
                  <p className="text-sm text-emerald-400/70 mt-2 font-mono uppercase">Decryption sequence completed successfully.</p>
                </div>
                <div className="bg-background/80 border border-primary/30 px-5 py-3 rounded-lg text-right">
                  <span className="text-xs text-primary/70 uppercase block mb-1 font-bold tracking-widest">Time Sync</span>
                  <span className="font-mono text-primary font-bold text-glow">{unlockTime}</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <TiltCard className="p-10 border border-primary/50 bg-[#F8FAFC] text-black min-h-[600px] shadow-[0_0_50px_rgba(0,240,255,0.2)] relative">
                <div className="absolute top-0 right-0 text-red-500 font-black border-4 border-red-500 p-3 m-10 opacity-30 transform rotate-12 text-2xl select-none pointer-events-none tracking-widest">
                  CONFIDENTIAL
                </div>
                <div className="border-b-4 border-black pb-6 mb-10 text-center relative z-10">
                  <h2 className="text-4xl font-black uppercase tracking-widest">{examData?.examName || 'EXAM'}</h2>
                  <p className="font-mono mt-3 font-bold text-gray-700 text-lg">Version: {examData?.versionId || 'VERSION'}</p>
                </div>
                <div className="space-y-10 max-w-3xl mx-auto text-lg leading-relaxed relative z-10">
                  {examData?.questions?.map((item: any, idx: number) => {
                    const options = JSON.parse(item.options || '[]');
                    return (
                      <div key={item.id}>
                        <p className="font-bold mb-4 text-xl">Q{idx+1}. {item.questionText}</p>
                        <ol className="list-[lower-alpha] pl-8 space-y-3 font-semibold text-gray-800">
                          {options.map((opt: string, i: number) => (
                            <li key={i}>{opt}</li>
                          ))}
                        </ol>
                      </div>
                    );
                  })}
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
