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

        // URL STABILE: Versione v1 e modello gemini-1.5-flash
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-pro-preview:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `VALORANT COACH: Analizza KD ${stats.kd}, HS ${stats.hs}%. Rispondi SOLO JSON: {"summary": "Analisi", "tip": "Consiglio"}`
                    }]
                }]
            })
        });

        const data = await response.json();

        // Se Google risponde con errore, proviamo il fallback automatico a gemini-pro (v1)
        if (data.error) {
            console.error("Google Error:", data.error.message);
            return res.status(200).json({
                summary: "Google API Error",
                tip: "Prova a rigenerare tra un istante."
            });
        }

        const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        return res.status(200).json(JSON.parse(aiText));

    } catch (error) {
        return res.status(200).json({
            summary: "Il coach sta riflettendo",
            tip: "Riprova il tasto tra 5 secondi."
        });
    }
}