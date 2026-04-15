import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("Manca GEMINI_API_KEY");

        // Inizializzazione client (la versione 1.50.1 vuole l'oggetto con apiKey)
        const ai = new GoogleGenAI({ apiKey });

        const { stats } = req.body;
        if (!stats) throw new Error("Stats non ricevute");

        // Utilizziamo gemini-1.5-flash che è il più compatibile con gli account gratuiti
        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{
                role: "user",
                parts: [{
                    text: `Sei un coach di Valorant. Analizza questi dati: KD ${stats.kd}, HS ${stats.hs}%, Winrate ${stats.winrate}%. 
                    Fornisci un'analisi e un consiglio breve. 
                    Rispondi rigorosamente in formato JSON: {"summary": "...", "tip": "..."}`
                }]
            }]
        });

        // NOTA: Con @google/genai il testo si estrae così
        const aiText = result.text;

        // Pulizia per sicurezza
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);
        const finalJson = jsonMatch ? JSON.parse(jsonMatch[0]) : { summary: "Errore formato", tip: aiText };

        return res.status(200).json(finalJson);

    } catch (error) {
        console.error("Crash dettagliato:", error.message);
        // Rispondiamo con 200 ma con l'errore nel tip così lo vedi sulla Dashboard!
        return res.status(200).json({
            summary: "Errore del Coach",
            tip: "Dettaglio: " + error.message
        });
    }
}