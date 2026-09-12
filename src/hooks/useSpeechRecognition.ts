"use client";
import { useState, useRef, useCallback } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(() => {
    if (typeof window === "undefined") return true;
    return !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition);
  });
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback((onResult: (text: string) => void) => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    // Stop any existing session
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interim += transcript;
        }
      }
      // Send interim results so user sees text appearing in real-time
      if (interim) onResult(interim);
      if (finalTranscript) onResult(finalTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
      setIsListening(false);
    }
  }, []);

  return { isListening, startListening, stopListening, supported };
}
