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
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `VALORANT STATS: KD ${stats.kd}, HS ${stats.hs}%. Rispondi SOLO in formato JSON: {"summary": "testo", "tip": "testo"}. Non aggiungere altro.` }] }]
            })
        });

        const data = await response.json();

        // Se Google risponde con un errore (es. chiave non valida), lo catturiamo qui
        if (data.error) {
            return res.status(200).json({ summary: "Errore API Google", tip: data.error.message });
        }

        let aiText = data.candidates[0].content.parts[0].text;

        // Pulizia aggressiva del testo per evitare il crash del JSON.parse
        const jsonMatch = aiText.match(/\{.*\}/s); // Prende solo ciò che sta tra le graffe
        const cleanJson = jsonMatch ? jsonMatch[0] : aiText;

        try {
            const parsed = JSON.parse(cleanJson);
            return res.status(200).json(parsed);
        } catch (parseError) {
            // Se il parse fallisce, non mandare 500, manda il testo grezzo così non crasha l'app
            return res.status(200).json({ summary: aiText, tip: "Analisi generata" });
        }

    } catch (error) {
        // Questo log apparirà nei Vercel Logs
        console.error("ERRORE COACH:", error);
        return res.status(200).json({ summary: "Errore interno al serverless", tip: "Controlla i log su Vercel" });
    }
}