"use client";

import { motion } from "motion/react";
import { FloatingNav } from "@/components/landing/FloatingNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Cloud, Cpu, Database, Link as LinkIcon, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function ArchitecturePage() {
  const stack = [
    {
      title: "Google Cloud Platform",
      desc: "Hosted on scalable Cloud Run containers with auto-scaling to handle peak harvest season traffic effortlessly.",
      icon: Cloud,
      color: "#4285F4"
    },
    {
      title: "Gemini AI & Vertex AI",
      desc: "Powering smart negotiation, multilingual voice recognition, image quality grading, and crop demand forecasting.",
      icon: Cpu,
      color: "#EA4335"
    },
    {
      title: "Firebase & Firestore",
      desc: "Real-time NoSQL database ensuring live updates for active bids, chat logs, and order tracking across devices.",
      icon: Database,
      color: "#FBBC05"
    },
    {
      title: "Gov API Integrations",
      desc: "Deep integration with data.gov.in APIs for live APMC mandi rates and regional market analysis.",
      icon: LinkIcon,
      color: "#34A853"
    },
    {
      title: "Enterprise Security",
      desc: "End-to-end encryption, strict role-based access control (RBAC), and token-based authentication via Firebase Auth.",
      icon: Lock,
      color: "#8E8E93"
    },
    {
      title: "Edge Performance",
      desc: "Next.js App Router with React Server Components, delivering blazingly fast load times even on 3G networks.",
      icon: Zap,
      color: "#007AFF"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[#007AFF] selection:text-white">
      <FloatingNav activeTab="cloud-stack" />
      
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="text-center mb-20">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Built on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#34A853]">Modern Cloud Architecture</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Annapurna is engineered for massive scale, low latency, and uncompromising security, leveraging the best of Google Cloud and Next.js.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl border border-[var(--separator)] hover:bg-[var(--fill-secondary)] transition-colors duration-300"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}30`, borderWidth: '1px' }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center border-t border-[var(--separator)]">
        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--tint-blue)] font-medium transition-colors">
          &larr; Back to Home
        </Link>
      </footer>
    </div>
  );
}
