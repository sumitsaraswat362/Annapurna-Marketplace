import { NextResponse } from "next/server";
import { ai, DEFAULT_MODEL } from "@/lib/vertex-client";

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
  let message = "";
  let history = [];
  try {
    const body = await req.json();
    message = body.message;
    history = body.history;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const safeHistory = Array.isArray(history) ? history : [];

    const systemInstruction = `You are the Annapurna AI Assistant, helping farmers and buyers on a direct farm-to-fork marketplace.

RULES:
1. Keep answers SHORT. Maximum 3 sentences per reply.
2. Be direct and practical. No fluff. No repetition.
3. Use emojis sparingly (🌾, 📦, 💰).
4. If asked about mandi prices, say they can check the "Mandi Prices" section in their dashboard.
5. If asked about listing produce, explain they can click "+ List New Produce" on their dashboard.
6. You represent the Annapurna platform for SIH Problem Statement 26033.`;

    const formattedHistory = safeHistory
      .filter((msg: any) => msg && msg.role && msg.content)
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    const reply = response.text || "I'm sorry, I couldn't process that request.";
    return NextResponse.json({ response: reply });

  } catch (error: any) {
    console.error("AI Help Bot Error (Primary):", error.message || error);
    
    // --- SECONDARY FALLBACK: gemini-1.5-flash (separate quota bucket usually) ---
    try {
      if (message) {
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: [{ role: 'user', parts: [{ text: `You are the Annapurna AI Assistant for farmers/buyers. Keep it short. User asks: ${message}` }] }],
          config: { temperature: 0.3 }
        });
        if (fallbackRes.text) return NextResponse.json({ response: fallbackRes.text });
      }
    } catch (fallbackError) {
      console.warn("AI Help Bot Error (Fallback 1.5):", fallbackError);
    }

    // --- TERTIARY FALLBACK: Offline Smart Rules (Never show a broken UI) ---
    const msgLower = message?.toLowerCase() || "";
    let offlineReply = "I am currently experiencing high traffic, but I'm still here to help! What do you need assistance with?";
    
    if (msgLower.includes("mandi") || msgLower.includes("price") || msgLower.includes("rate")) {
      offlineReply = "You can check real-time Mandi prices directly from the 'Mandi Prices' section on your dashboard! 🌾";
    } else if (msgLower.includes("list") || msgLower.includes("sell") || msgLower.includes("add")) {
      offlineReply = "To sell your crop, just click the '+ List New Produce' button on your dashboard. It takes less than a minute! 📦";
    } else if (msgLower.includes("transport") || msgLower.includes("delivery") || msgLower.includes("logistics")) {
      offlineReply = "Annapurna handles logistics automatically! When a buyer orders, a truck is dispatched directly to your farm. 🚚";
    } else if (msgLower.includes("annapurna") || msgLower.includes("sih") || msgLower.includes("what is")) {
      offlineReply = "Annapurna is a revolutionary direct farm-to-fork marketplace built for SIH 2026. We empower farmers with AI negotiation and platform logistics!";
    } else if (msgLower.includes("hello") || msgLower.includes("hi")) {
      offlineReply = "Hello! I am the Annapurna AI Assistant. How can I help you today?";
    }

    return NextResponse.json({ response: offlineReply });
  }
}
