export default async function handler(req, res) {
    // 1. Check chiave
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.length < 5) {
        console.error("ERRORE: La chiave API è vuota o mancante nei settings di Vercel!");
        return res.status(500).json({ error: "Configurazione Chiave API mancante" });
    }

    // 2. Lettura sicura del body
    let stats;
    try {
        stats = (typeof req.body === 'string') ? JSON.parse(req.body).stats : req.body.stats;
        if (!stats) throw new Error("Stats non trovate nel body");
    } catch (e) {
        console.warn("WARN: Parsing fallito, uso dati demo per evitare crash");
        stats = { kd: 1.0, hs: 15, wr: 50 };
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Analizza KD: ${stats.kd}, HS: ${stats.hs}%. Rispondi in italiano con un JSON: {"summary": "...", "tip": "..."}` }] }]
            })
        });

        const data = await response.json();

        // Se Google ci dà errore (es. chiave invalida)
        if (data.error) {
            console.error("ERRORE GOOGLE:", data.error.message);
            return res.status(500).json({ error: "Google dice: " + data.error.message });
        }

        const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        res.status(200).json(JSON.parse(aiText));

    } catch (error) {
        console.error("CRASH TOTALE:", error.message);
        res.status(500).json({ error: "Il server è esploso: " + error.message });
    }
}