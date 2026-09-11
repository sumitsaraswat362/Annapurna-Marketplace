"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Only load the script once
    if (document.getElementById("google-translate-script")) return;

    const addScript = document.createElement("script");
    addScript.id = "google-translate-script";
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: "en",
          includedLanguages: "en,hi,mr,ta,te,gu,bn,kn,ml,pa", // Major Indian languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      className="fixed bottom-4 left-4 z-[9999] bg-white/80 dark:bg-black/80 backdrop-blur-md p-2 rounded-xl shadow-lg border border-[var(--separator)] overflow-hidden origin-bottom-left"
    ></div>
  );
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}
