import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });

    // CAMBIA QUI: Usa solo il nome del modello senza "models/"
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { stats } = req.body;
    
    // Generazione contenuto
    const result = await model.generateContent(`Agisci come coach di Valorant. Analizza: KD ${stats.kd}, HS ${stats.hs}%. Rispondi solo JSON: {"summary": "...", "tip": "..."}`);
    
    const response = await result.response;
    const text = response.text();

    // Pulizia e invio
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return res.status(200).json(JSON.parse(jsonMatch[0]));

  } catch (error) {
    // Questo è quello che vedi ora nello screenshot
    return res.status(200).json({
      summary: "Errore del Coach",
      tip: `Dettaglio: ${error.message}`
    });
  }
}