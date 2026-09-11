# SIH 2026 Idea Submission Content

*Below is the exact content mapped to the 6 slides required for the new SIH 2026 template. Copy this directly into the PPTX. Keep it concise as requested by the instructions.*

---

## Slide 1: TITLE PAGE
*   **Problem Statement ID:** 26033
*   **Problem Statement Title:** Direct Farm-to-Fork Marketplace for Eliminating Middlemen
*   **Theme:** Agriculture, FoodTech & Rural Development
*   **PS Category:** Software
*   **Team ID:** [Your Team ID]
*   **Team Name:** [Your Team Name]

---

## Slide 2: IDEA TITLE
**Idea Title:** Annapurna Marketplace - AI-Powered Direct Farm-to-Fork Trading Platform

*   **Proposed Solution:** A zero-commission digital marketplace connecting 14 crore Indian farmers directly with end consumers and bulk buyers, completely eliminating intermediaries.
*   **Detailed Explanation:** The platform allows farmers to list crops securely. Buyers place bids, and our autonomous AI broker (Gemini 2.5) negotiates on the farmer's behalf in real-time, matching supply with demand while dynamically calculating logistics (distance + quantity). 
*   **How it addresses the problem:** Resolves the ₹92,000 Crore annual agricultural loss by ensuring 100% direct trade, increasing farmer realization from 15-25% to over 60%, and preventing post-harvest waste.
*   **Innovation & Uniqueness:** 
    *   **AI Negotiation Engine:** Google Gemini negotiates live, protecting the Minimum Support Price (MSP) floor.
    *   **Live Mandi Integration:** Syncs with `data.gov.in` for real-time market transparency.
    *   **Algorithmic Bid Security:** Rate limiting (max 20 bids/hr) and dynamic buyer reputation scoring (0-100) prevents market manipulation.

---

## Slide 3: TECHNICAL APPROACH

*   **Technologies to be used:**
    *   *Frontend:* Next.js 15, React 19, Tailwind CSS v4, Framer Motion
    *   *Backend & Database:* Google Cloud Firestore (Real-time DB), Node.js Serverless APIs
    *   *AI & Cloud:* Vertex AI (Gemini 2.5 Flash), Google Cloud Run
    *   *Security:* Custom JWT Auth, Middleware Guards, HTTP-only Cookies
*   **Methodology & Process (Flowchart to recreate/screenshot):**
    *   Farmer ➔ Next.js App ➔ Firestore DB ➔ (Live Mandi Data API Sync)
    *   Buyer ➔ Places Bid ➔ Next.js App ➔ Vertex AI (Negotiation/MSP Check)
    *   Vertex AI ➔ Counter-Offer ➔ Checkout & Logistics Calculation
    *   *(Note: Add the screenshots of your Buyer AI Chat and Farmer Dashboard on this slide as requested by the instructions for "Images/working prototype").*

---

## Slide 4: FEASIBILITY AND VIABILITY

*   **Feasibility Analysis:** Highly feasible. Leverages highly scalable, serverless Google Cloud architecture (Cloud Run + Firestore) which ensures zero downtime and handles real-time WebSocket traffic efficiently even in low-bandwidth rural areas.
*   **Potential Challenges and Risks:**
    *   *Digital Literacy:* Farmers may struggle with complex UI or English interfaces.
    *   *Logistics Reliability:* First-mile and last-mile delivery tracking in remote villages.
    *   *Market Manipulation:* Unfair bulk-bidding by coordinated buyers.
*   **Strategies for Overcoming Challenges:**
    *   *Multilingual Voice Support:* Implementing AI Speech-to-Text so farmers can trade natively.
    *   *Platform Logistics:* Integrating reliable third-party regional trucking APIs.
    *   *Security Guards:* Already implemented rate-limiting (max 5 bids per listing) and automated suspicious activity detection to ban bad actors.

---

## Slide 5: IMPACT AND BENEFITS

*   **Potential Impact on Target Audience:**
    *   Empowers **14 crore+ farmers** with direct market access.
    *   Provides millions of consumers with fresh, traceable produce at lower costs.
*   **Benefits of the Solution:**
    *   *Economic:* Eradicates middleman commissions; boosts average farmer earnings by **~40%**.
    *   *Social:* Empowers rural farming communities with true price discovery and prevents distress selling below MSP.
    *   *Environmental:* Significantly reduces the 35% post-harvest waste by utilizing AI for rapid, localized demand-supply matching (less transit time, less spoilage).

---

## Slide 6: RESEARCH AND REFERENCES

*   **Govt of India Data API:** Real-time Mandi Prices & MSP Guidelines retrieved from [data.gov.in](https://data.gov.in)
*   **Agricultural Supply Chain Loss Data:** Ministry of Consumer Affairs, Food & Public Distribution reports on post-harvest waste.
*   **Vertex AI Documentation:** Google Cloud documentation for implementing Gemini 2.5 Flash for real-time negotiation bots.
*   **Next.js 15 App Router:** Vercel documentation for implementing highly performant, edge-rendered web applications.
