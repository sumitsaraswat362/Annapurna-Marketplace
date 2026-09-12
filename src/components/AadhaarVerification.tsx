"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, X, Fingerprint } from "lucide-react";

interface AadhaarVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  userName: string;
}

export function AadhaarVerification({ isOpen, onClose, onVerified, userName }: AadhaarVerificationProps) {
  const [step, setStep] = useState<"enter" | "otp" | "verifying" | "done">("enter");
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    const cleaned = aadhaar.replace(/\s/g, "");
    if (cleaned.length !== 12 || !/^\d+$/.test(cleaned)) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setError("");
    setStep("verifying");
    // Simulate UIDAI verification
    setTimeout(() => {
      setStep("done");
      setTimeout(() => {
        onVerified();
        onClose();
      }, 2000);
    }, 2500);
  };

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12);
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.2 }}
          className="bg-[var(--bg-primary)] rounded-3xl shadow-2xl border border-[var(--separator)] w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--separator)] flex items-center justify-between bg-gradient-to-r from-[#FF6B00]/5 to-[#E65100]/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#E65100] flex items-center justify-center shadow-lg">
                <Fingerprint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Aadhaar Verification</h3>
                <p className="text-xs text-[var(--text-tertiary)]">UIDAI Sandbox • Secure Identity</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[var(--fill-secondary)] flex items-center justify-center hover:bg-[var(--fill-tertiary)] transition-colors">
              <X className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {step === "enter" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">Aadhaar Number</label>
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
                    placeholder="XXXX XXXX XXXX"
                    maxLength={14}
                    className="w-full bg-[var(--fill-secondary)] border border-[var(--separator)] rounded-2xl px-5 py-4 text-center text-2xl font-mono tracking-[0.3em] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all"
                  />
                </div>
                <p className="text-xs text-[var(--text-tertiary)] text-center">An OTP will be sent to the mobile number linked with your Aadhaar</p>
                {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}
                <button
                  onClick={handleSendOtp}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#E65100] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Send OTP →
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <p className="text-sm text-[var(--text-secondary)]">OTP sent to mobile ending in <span className="font-bold">****7890</span></p>
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full bg-[var(--fill-secondary)] border border-[var(--separator)] rounded-2xl px-5 py-4 text-center text-3xl font-mono tracking-[0.5em] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] placeholder:text-base placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all"
                />
                {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}
                <button
                  onClick={handleVerify}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#34C759] to-[#30D158] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Verify Identity ✓
                </button>
              </div>
            )}

            {step === "verifying" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[var(--separator)] border-t-[#FF6B00] animate-spin" />
                <p className="text-lg font-bold text-[var(--text-primary)]">Verifying with UIDAI...</p>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">Validating biometric identity</p>
              </div>
            )}

            {step === "done" && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#34C759]/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#34C759]" />
                </motion.div>
                <p className="text-xl font-bold text-[#34C759]">Aadhaar Verified!</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{userName} is now a verified user</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20">
                  <Shield className="w-4 h-4 text-[#007AFF]" />
                  <span className="text-sm font-bold text-[#007AFF]">Trust Score +20</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
