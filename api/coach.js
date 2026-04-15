import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    // Configurazione Headers CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Il client prende automaticamente GEMINI_API_KEY dalle variabili d'ambiente
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    try {
        const { stats } = req.body;

        if (!stats) {
            return res.status(400).json({ summary: "Errore", tip: "Dati statistiche mancanti." });
        }

        // Utilizziamo il modello indicato nella tua guida
        // Nota: se "gemini-3-flash-preview" desse errore, usa "gemini-1.5-flash"
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: `Agisci come coach di Valorant. Dati giocatore: KD ${stats.kd}, HS ${stats.hs}%, Winrate ${stats.winrate}%. 
                       Fornisci un'analisi brevissima e un consiglio tecnico. 
                       Rispondi rigorosamente in formato JSON: {"summary": "...", "tip": "..."}`,
        });

        // Pulizia della risposta per sicurezza
        let aiText = response.text;
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("L'AI non ha restituito un JSON valido");
        }

        const finalData = JSON.parse(jsonMatch[0]);
        return res.status(200).json(finalData);

    } catch (error) {
        console.error("Coach Error:", error);
        return res.status(500).json({
            summary: "Il coach è offline per manutenzione",
            tip: "Errore tecnico: " + error.message
        });
    }
}