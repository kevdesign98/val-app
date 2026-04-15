export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(200).json({ summary: "Errore", tip: "Manca API KEY su Vercel" });

    try {
        const { stats } = req.body;

        // URL TESTATO: v1beta + gemini-1.5-flash
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Agisci come coach di Valorant. Dati giocatore: KD ${stats.kd}, HS ${stats.hs}%, Winrate ${stats.winrate}%. 
                        Fornisci un'analisi brevissima e un consiglio tecnico. 
                        Rispondi ESCLUSIVAMENTE con questo formato JSON: {"summary": "string", "tip": "string"}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            // Se vedi ancora "Not Found", prova a cambiare il nome modello in 'gemini-pro' qui sotto
            return res.status(200).json({
                summary: "Google API Error",
                tip: data.error.message
            });
        }

        // Estrazione sicura: Gemini a volte mette il JSON dentro i ```
        let aiText = data.candidates[0].content.parts[0].text;
        const cleanJson = aiText.replace(/```json|```/g, "").trim();

        return res.status(200).json(JSON.parse(cleanJson));

    } catch (error) {
        return res.status(200).json({
            summary: "Il coach sta analizzando i replay",
            tip: "Riprova tra un istante."
        });
    }
}