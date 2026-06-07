"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex h-20 shrink-0 items-center justify-between border-b border-primary/30 bg-background/60 px-8 backdrop-blur-xl z-10 sticky top-0 shadow-[0_4px_30px_rgba(0,240,255,0.05)]">
      <div className="flex flex-1">
        <form className="flex w-full max-w-lg relative" action="#" method="GET">
          <div className="absolute inset-0 bg-primary/5 blur-md rounded-full pointer-events-none"></div>
          <div className="relative w-full flex items-center border border-primary/40 bg-background/50 rounded-full px-4 focus-within:border-primary focus-within:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
            <Search
              className="h-5 w-5 text-primary/70"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-12 w-full border-0 bg-transparent py-0 pl-3 pr-0 text-primary focus:ring-0 sm:text-sm font-mono placeholder:text-primary/40 uppercase tracking-widest"
              placeholder="Query active nodes or streams..."
              type="search"
              name="search"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-x-6 lg:gap-x-8">
        <button type="button" className="p-2 text-primary/70 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all">
          <span className="sr-only">View alerts</span>
          <div className="relative">
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive border-2 border-background shadow-[0_0_10px_var(--destructive)] animate-pulse" />
          </div>
        </button>

        <div className="hidden lg:block lg:h-8 lg:w-[1px] lg:bg-primary/30" aria-hidden="true" />

        <div className="flex items-center gap-x-4 cursor-pointer group">
          <UserCircle className="h-10 w-10 text-primary/70 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all" />
          <span className="hidden lg:flex lg:items-center">
            <span className="text-sm font-bold tracking-widest uppercase text-primary/90 group-hover:text-primary group-hover:text-glow transition-all" aria-hidden="true">
              Admin Node 01
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
