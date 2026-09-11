"use client";
import { useState, useEffect, useCallback } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);

  let recognition: any = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSupported(false);
      }
    }
  }, []);

  const startListening = useCallback((onResult: (text: string) => void) => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "hi-IN"; // Defaulting to Hindi for rural context, but it auto-detects quite well

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  return { isListening, startListening, stopListening, supported };
}
