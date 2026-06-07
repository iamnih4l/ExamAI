"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 20, z: -100, scale: 0.9 }}
      animate={{ opacity: 1, rotateX: 0, z: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.5
      }}
      className="w-full h-full perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <div style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export function ScrollReveal({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        type: "spring", 
        bounce: 0.4 
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
