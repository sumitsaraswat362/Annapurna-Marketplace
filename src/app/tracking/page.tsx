"use client";

import { motion } from "motion/react";
import { FloatingNav } from "@/components/landing/FloatingNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Package, Truck, CheckCircle, Snowflake, MapPin, Bell } from "lucide-react";
import Link from "next/link";

export default function TrackingPage() {
  const steps = [
    { title: "Order Placed", desc: "Buyer payment verified and held securely in escrow.", icon: Package, time: "Day 1", active: true },
    { title: "Confirmed & Graded", desc: "Quality checked and verified against FSSAI standards.", icon: CheckCircle, time: "Day 2", active: true },
    { title: "In Transit", desc: "En route via optimized delivery network.", icon: Truck, time: "Day 3", active: true },
    { title: "Delivered", desc: "Funds released to farmer's account instantly.", icon: MapPin, time: "Pending", active: false },
  ];

  const logistics = [
    {
      title: "Cold Chain Monitoring",
      desc: "Real-time temperature and humidity tracking for perishable goods using IoT sensors.",
      icon: Snowflake,
      color: "#5AC8FA"
    },
    {
      title: "Delivery Route Optimization",
      desc: "AI calculates the fastest and safest routes to reduce transit time and spoilage.",
      icon: MapPin,
      color: "#007AFF"
    },
    {
      title: "SMS & WhatsApp Alerts",
      desc: "Instant notifications sent to farmers and buyers at every stage of the journey.",
      icon: Bell,
      color: "#34C759"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[#007AFF] selection:text-white">
      <FloatingNav activeTab="tracking" />
      
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-32 md:py-48">
        <div className="text-center mb-20">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transparent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--tint-blue)] to-[var(--tint-green)]">Farm-to-Fork Logistics</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Track your produce in real-time. Our smart logistics network ensures quality and timely delivery while keeping you informed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass p-8 rounded-3xl border border-[var(--separator)]"
          >
            <h3 className="text-2xl font-bold mb-8">Live Tracking Timeline</h3>
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx !== steps.length - 1 && (
                    <div className={`absolute top-10 left-6 w-0.5 h-16 ${step.active ? 'bg-[var(--tint-blue)]' : 'bg-[var(--separator)]'}`} />
                  )}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${step.active ? 'bg-[var(--tint-blue)] text-white shadow-lg' : 'bg-[var(--fill-secondary)] text-[var(--text-secondary)]'}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`font-bold ${step.active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{step.title}</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--fill-secondary)] text-[var(--text-secondary)]">{step.time}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {logistics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                className="glass p-6 rounded-3xl border border-[var(--separator)] flex gap-4 items-start"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
