export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Chiave mancante" });

    try {
        const { stats } = req.body;
        // Usiamo l'endpoint v1beta per maggiore compatibilità con flash
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Coach Valorant. Dati: KD ${stats.kd}, HS ${stats.hs}%, Winrate ${stats.winrate}%. Agente: ${stats.top_agent}. Fornisci analisi e consiglio tecnico. Rispondi SOLO con JSON: {"summary": "string", "tip": "string"}`
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: 100, // Ridotto drasticamente per velocità
                    temperature: 0.2,    // Più basso è, più veloce e preciso è nel seguire il formato
                }
            })
        });

        const data = await response.json();

        if (!data.candidates || data.candidates.length === 0) {
            console.error("Gemini no candidates:", data);
            return res.status(500).json({ summary: "Gemini non ha risposto", tip: "Riprova" });
        }

        let aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();

        // Validazione extra del JSON per evitare crash nel parse
        try {
            const parsed = JSON.parse(aiText);
            return res.status(200).json(parsed);
        } catch (e) {
            return res.status(200).json({ summary: aiText, tip: "Analisi completata" });
        }

    } catch (error) {
        console.error("Errore serverless:", error);
        return res.status(500).json({ summary: "Errore interno", tip: "Controlla i log di Vercel" });
    }
}