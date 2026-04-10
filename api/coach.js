export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(200).json({ summary: "Errore Configurazione", tip: "Manca API Key." });

    const { stats } = req.body || {};
    const prompt = `Analizza queste statistiche di Valorant: KD ${stats?.kd}, HS ${stats?.hs}%, WinRate ${stats?.wr}%. 
  Fornisci un'analisi tecnica da coach professionista e un consiglio pratico. 
  Rispondi esclusivamente in formato JSON: {"summary": "...", "tip": "..."}`;

    try {
        // Usiamo gemini-1.5-pro per massima qualità e stabilità
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-goog-api-key': apiKey },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();

        if (data.error) {
            // Se il modello è sovraccarico, proviamo a dare una risposta generica di "standby"
            if (data.error.code === 503 || data.error.status === "UNAVAILABLE") {
                return res.status(200).json({
                    summary: "Il Coach sta analizzando troppi match...",
                    tip: "I server AI sono carichi. Riprova tra 30 secondi per un'analisi dettagliata!"
                });
            }
            throw new Error(data.error.message);
        }

        let aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        res.status(200).json(JSON.parse(aiText));

    } catch (err) {
        res.status(200).json({ summary: "Analisi in pausa", tip: "Stiamo ricollegando il coach. Ricarica la pagina." });
    }
}