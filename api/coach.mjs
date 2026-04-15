import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    // Configurazione Headers CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("Manca la API Key su Vercel");

        // Inizializzazione Client nuova SDK
        const ai = new GoogleGenAI({ apiKey });

        const { stats } = req.body;
        if (!stats) throw new Error("Dati statistiche non ricevuti");

        // Nella nuova SDK (@google/genai) si usa direttamente models.generateContent
        // SENZA chiamare getGenerativeModel prima.
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash", // Nome pulito senza "models/"
            contents: [{
                role: "user",
                parts: [{
                    text: `Sei un coach di Valorant. Analizza: KD ${stats.kd}, HS ${stats.hs}%, Winrate ${stats.winrate}%. 
          Fornisci un'analisi brevissima e un consiglio. 
          Rispondi SOLO in formato JSON: {"summary": "...", "tip": "..."}`
                }]
            }]
        });

        // Estrazione testo (nella nuova SDK è una proprietà, non una funzione)
        const aiText = response.text;

        // Pulizia JSON per sicurezza
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("L'AI non ha risposto con un JSON valido");

        return res.status(200).json(JSON.parse(jsonMatch[0]));

    } catch (error) {
        console.error("Errore Coach:", error.message);

        // Restituiamo 200 con l'errore nel tip per vederlo nella Dashboard
        return res.status(200).json({
            summary: "Errore di configurazione",
            tip: "Dettaglio: " + error.message
        });
    }
}