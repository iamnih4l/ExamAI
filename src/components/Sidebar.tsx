"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard,
  BookOpen,
  FileCode,
  Printer,
  ShieldAlert,
  FileText,
  Shield,
  Key
} from "lucide-react";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Question Matrix", href: "/questions", icon: BookOpen },
  { name: "AI Assembly", href: "/generate", icon: FileCode },
  { name: "Auth Protocol", href: "/auth", icon: Key },
  { name: "Print Node", href: "/print", icon: Printer },
  { name: "Audit Stream", href: "/audit", icon: FileText },
  { name: "Leak Simulator", href: "/leak", icon: ShieldAlert },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-background/80 border-r border-primary/30 shadow-[4px_0_20px_rgba(0,240,255,0.05)] backdrop-blur-xl z-20">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-primary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        <Shield className="h-10 w-10 text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
        <span className="ml-3 text-xl font-black text-primary tracking-widest text-glow uppercase">EXAMSHIELD</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-8 pb-4">
        <nav className="flex-1 space-y-3 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-primary/20 text-primary border-l-4 border-primary shadow-[inset_0_0_15px_rgba(0,240,255,0.2)] text-glow"
                    : "text-primary/60 hover:bg-primary/10 hover:text-primary border-l-4 border-transparent hover:border-primary/50 transition-all",
                  "group flex items-center px-4 py-3 text-xs font-bold rounded-r-lg transition-all tracking-widest uppercase font-mono"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" : "text-primary/50 group-hover:text-primary",
                    "mr-4 h-5 w-5 flex-shrink-0 transition-all"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-primary/30 bg-primary/5">
        <div className="flex items-center text-[10px] text-primary/80 font-mono tracking-widest uppercase font-bold">
          <div className="h-2 w-2 rounded-full bg-primary mr-3 shadow-[0_0_8px_var(--primary)] animate-ping" />
          SYSTEM SECURE
        </div>
      </div>
    </div>
  );
}
