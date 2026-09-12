import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Shield, Bot, TrendingUp, ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // -10 to +10 range
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Text fades out first
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // === DEVICE EXIT ANIMATIONS ===
  const scale = useTransform(scrollYProgress, [0, 0.9], [1.1, 1.4]);
  const macX = useTransform(scrollYProgress, [0.4, 0.9], ["0%", "-25%"]);
  const macOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);
  const ipadY = useTransform(scrollYProgress, [0.4, 0.9], ["0%", "-25%"]);
  const ipadOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);
  const iphoneX = useTransform(scrollYProgress, [0.4, 0.9], ["0%", "25%"]);
  const iphoneOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full overflow-x-clip" style={{ zIndex: 10 }}>
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: "radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), rgba(52, 199, 89, 0.15), transparent 80%)",
        }}
        animate={{
          "--mouse-x": `${(mousePosition.x / 20 + 0.5) * 100}%`,
          "--mouse-y": `${(mousePosition.y / 20 + 0.5) * 100}%`,
        } as any}
      />

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-24 px-4 md:px-6" style={{ overflow: "visible" }}>
        
        {/* === HERO TEXT & CTA === */}
        <motion.div 
          className="max-w-5xl mx-auto text-center mt-32 md:mt-48 relative z-20"
          style={{ y: textY, opacity: textOpacity }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--fill-secondary)] border border-[var(--separator)] mb-6 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#34C759] animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide text-[var(--text-secondary)] uppercase">SIH 2026 Finalist • Ministry of Consumer Affairs</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-[var(--text-primary)] leading-[1.1]">
            <span className="block">Direct from Farm.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34C759] to-[#007AFF] drop-shadow-sm">
              Empowered by AI.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminating middlemen. Connecting 14 crore farmers directly to buyers with <strong className="text-[var(--text-primary)]">AI Negotiation</strong>, <strong className="text-[var(--text-primary)]">3PL Logistics</strong>, and <strong className="text-[var(--text-primary)]">Aadhaar Trust</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/login" className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#34C759] to-[#007AFF] rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center justify-center gap-2 px-8 py-4 bg-[var(--bg-primary)] rounded-2xl text-[var(--text-primary)] font-bold text-lg border border-[var(--separator)] shadow-2xl transition-transform group-hover:scale-[1.02]">
                Enter Marketplace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            <a href="#features" className="px-8 py-4 rounded-2xl text-[var(--text-secondary)] font-bold text-lg hover:text-[var(--text-primary)] transition-colors hover:bg-[var(--fill-secondary)]">
              Watch Demo
            </a>
          </div>
        </motion.div>

        {/* === DEVICE MOCKUPS & FLOATING WIDGETS === */}
        <motion.div 
          className="mt-16 md:mt-20 w-full max-w-[1400px] h-[400px] md:h-[600px] mx-auto flex justify-center relative" 
          style={{ zIndex: 10, scale, transformOrigin: "top center" }}
        >
          {/* FLOATING WIDGET 1: Aadhaar Trust */}
          <motion.div
            className="absolute left-[5%] top-[10%] z-30 hidden md:flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--separator)] rounded-2xl shadow-2xl"
            animate={{ 
              x: mousePosition.x * -1.5, 
              y: mousePosition.y * -1.5 + Math.sin(Date.now() / 1000) * 10 
            }}
            transition={{ type: "spring", damping: 20, stiffness: 50 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#34C759]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#34C759]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Identity</p>
              <p className="text-sm font-extrabold text-[var(--text-primary)]">UIDAI Verified ✓</p>
            </div>
          </motion.div>

          {/* FLOATING WIDGET 2: AI Bot */}
          <motion.div
            className="absolute right-[8%] top-[25%] z-30 hidden md:flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--separator)] rounded-2xl shadow-2xl"
            animate={{ 
              x: mousePosition.x * 1.5, 
              y: mousePosition.y * 1.5 + Math.cos(Date.now() / 1000) * 10 
            }}
            transition={{ type: "spring", damping: 20, stiffness: 50 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#007AFF]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Negotiation</p>
              <p className="text-sm font-extrabold text-[var(--text-primary)]">AI Active</p>
            </div>
          </motion.div>

          {/* FLOATING WIDGET 3: Mandi Price */}
          <motion.div
            className="absolute left-[15%] bottom-[30%] z-30 hidden md:flex items-center gap-3 px-4 py-3 bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--separator)] rounded-2xl shadow-2xl"
            animate={{ 
              x: mousePosition.x * -1, 
              y: mousePosition.y * -1 + Math.sin(Date.now() / 800) * 8 
            }}
            transition={{ type: "spring", damping: 20, stiffness: 50 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#FF9500]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#FF9500]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Live Rate</p>
              <p className="text-sm font-extrabold text-[var(--text-primary)]">Tomatoes ₹25/kg</p>
            </div>
          </motion.div>

          {/* DEVICES */}
          <motion.div 
            className="absolute left-0 md:left-[2%] top-[5%] md:top-[15%] w-[100%] md:w-[80%] aspect-[16/9] z-10"
            style={{ x: macX, opacity: macOpacity }}
          >
            <img src="/images/macbook_hardware.png" alt="MacBook Marketplace Dashboard" className="w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.div 
            className="absolute right-[5%] md:right-[5%] bottom-[5%] md:bottom-[10%] w-[60%] md:w-[50%] aspect-[4/3] z-20"
            style={{ y: ipadY, opacity: ipadOpacity }}
          >
            <img src="/images/ipad_hardware.png" alt="iPad Marketplace Dashboard" className="w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.div 
            className="absolute right-[0%] md:right-[0%] bottom-[10%] md:bottom-[5%] w-[35%] md:w-[22%] aspect-[9/16] z-30"
            style={{ x: iphoneX, opacity: iphoneOpacity }}
          >
            <img src="/images/iphone_hardware.png" alt="iPhone Direct Trade App" className="w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
