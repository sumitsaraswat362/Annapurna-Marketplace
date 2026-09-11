"use client";

import { motion } from "motion/react";
import { FloatingNav } from "@/components/landing/FloatingNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Bot, TrendingUp, ShieldCheck, LineChart, Truck, Camera, Search, Globe } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      title: "AI-Powered Price Negotiation",
      desc: "Gemini AI acts as a smart mediator, analyzing market trends to make fair counter-offers automatically.",
      icon: Bot,
      color: "#007AFF"
    },
    {
      title: "Real-time Mandi Prices",
      desc: "Live data integration from the data.gov.in API ensures you always know the current market value.",
      icon: LineChart,
      color: "#FF9500"
    },
    {
      title: "MSP Protection",
      desc: "A guaranteed Minimum Support Price floor on all trades, ensuring farmers never sell at a loss.",
      icon: ShieldCheck,
      color: "#34C759"
    },
    {
      title: "Smart Demand Forecasting",
      desc: "AI predicts crop demand weeks in advance, helping farmers plant and harvest at the perfect time.",
      icon: TrendingUp,
      color: "#AF52DE"
    },
    {
      title: "Direct Farm-to-Fork",
      desc: "Eliminate middlemen and connect directly with buyers to earn up to 40% better returns on harvest.",
      icon: Truck,
      color: "#FF3B30"
    },
    {
      title: "Quality Grading System",
      desc: "Computer vision analyzes crop photos to assign FSSAI-compliant Grade A/A+/B ratings instantly.",
      icon: Camera,
      color: "#5AC8FA"
    },
    {
      title: "Government Scheme Finder",
      desc: "Our AI chatbot matches farmers with applicable local and national agricultural subsidies.",
      icon: Search,
      color: "#FF2D55"
    },
    {
      title: "Multilingual Support",
      desc: "Full platform accessibility in Hindi, Marathi, Tamil, Telugu, Kannada, and more via voice & text.",
      icon: Globe,
      color: "#00C7BE"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[#007AFF] selection:text-white">
      <FloatingNav activeTab="features" />
      
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
            Powerful Features for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--tint-blue)] to-[var(--tint-green)]">Modern Farming</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover how Annapurna empowers farmers with AI-driven insights, fair pricing, and direct market access.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-6 rounded-3xl border border-[var(--separator)] hover:scale-[1.02] transition-transform duration-300"
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
