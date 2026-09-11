"use client";

import { motion } from "motion/react";
import { FloatingNav } from "@/components/landing/FloatingNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Gavel, MessageSquare, Shield, Star, Lock, FileText } from "lucide-react";
import Link from "next/link";

export default function BiddingPage() {
  const biddingFeatures = [
    {
      title: "MSP-Protected Bidding",
      desc: "Our AI strictly enforces Minimum Support Price (MSP) rules. Bids below MSP are automatically rejected, ensuring farmers never sell at a loss.",
      icon: Shield,
      color: "#34C759"
    },
    {
      title: "AI Negotiation Agent",
      desc: "When a buyer places a bid, our Gemini-powered AI counters intelligently based on current market rates, transportation costs, and crop quality.",
      icon: MessageSquare,
      color: "#007AFF"
    },
    {
      title: "Buyer Reputation System",
      desc: "Buyers are rated based on successful transactions, payment speed, and dispute history. High-rated buyers get matching priority.",
      icon: Star,
      color: "#FF9500"
    },
    {
      title: "Bid Validation & Rate Limiting",
      desc: "Strict rate limiting and bot protection prevent spam bids and market manipulation.",
      icon: Lock,
      color: "#FF3B30"
    },
    {
      title: "Fair Price Discovery",
      desc: "An open bidding mechanism where current highest bids are visible, fostering healthy competition among wholesale buyers.",
      icon: Gavel,
      color: "#AF52DE"
    },
    {
      title: "Auditable Bidding History",
      desc: "Every bid, counter-offer, and acceptance is permanently recorded on a tamper-proof ledger for complete transparency.",
      icon: FileText,
      color: "#8E8E93"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[#007AFF] selection:text-white">
      <FloatingNav activeTab="bidding" />
      
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
            AI-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--tint-blue)] to-[var(--tint-green)]">Smart Negotiation</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Automated negotiations designed to maximize farmer profits while ensuring fair market prices and secure transactions.
          </motion.p>
        </div>

        {/* Demo AI Interaction Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass max-w-3xl mx-auto rounded-3xl border border-[var(--separator)] overflow-hidden mb-24 shadow-2xl"
        >
          <div className="bg-[var(--fill-secondary)] px-6 py-4 border-b border-[var(--separator)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--tint-blue)] to-[var(--tint-green)] flex items-center justify-center text-white font-bold text-xs">AI</div>
              <span className="font-semibold text-sm">Annapurna Negotiation Engine</span>
            </div>
            <span className="text-xs font-medium text-[var(--tint-green)] bg-[#34C759] bg-opacity-10 px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-start">
              <div className="bg-[var(--fill-secondary)] rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%]">
                <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Buyer: FreshMart Ltd.</p>
                <p className="font-medium">Offering ₹2,200/quintal for 50 quintals of Grade A Wheat.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-[var(--tint-blue)] to-[#005DEB] text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] shadow-md">
                <p className="text-xs font-semibold text-white/80 mb-1">AI Counter-offer</p>
                <p className="font-medium">The current mandi rate is ₹2,450. Factoring in logistics, I propose ₹2,400/quintal to proceed.</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-[var(--fill-secondary)] rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%]">
                <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Buyer: FreshMart Ltd.</p>
                <p className="font-medium">Agreed at ₹2,400/quintal. Initiating escrow.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {biddingFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
              className="glass p-6 rounded-3xl border border-[var(--separator)]"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner"
                style={{ backgroundColor: `${feature.color}15`, borderColor: `${feature.color}30`, borderWidth: '1px' }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {feature.desc}
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
