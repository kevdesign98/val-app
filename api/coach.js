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

        // CORREZIONE QUI: Usiamo v1 invece di v1beta
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Analizza KD:${stats.kd}, HS:${stats.hs}%. Rispondi SOLO JSON: {"summary": "Analisi", "tip": "Consiglio"}`
                    }]
                }]
            })
        });

        const data = await response.json();

        // Se Google risponde con un errore (anche con 200 a livello di rete), lo gestiamo
        if (data.error) {
            return res.status(200).json({
                summary: "Configurazione Google Errata",
                tip: data.error.message
            });
        }

        // Estrazione sicura del testo
        const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        return res.status(200).json(JSON.parse(aiText));

    } catch (error) {
        return res.status(200).json({
            summary: "Errore durante l'analisi",
            tip: "Riprova tra poco."
        });
    }
}