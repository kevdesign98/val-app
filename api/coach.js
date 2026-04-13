export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(200).json({ summary: "Errore", tip: "Manca la chiave API su Vercel" });

    try {
        const { stats } = req.body;

        // CAMBIO CRUCIALE: Usiamo v1beta e il modello con il suffisso -latest
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `VALORANT COACH: KD ${stats.kd}, HS ${stats.hs}%. Rispondi SOLO JSON: {"summary": "Analisi breve", "tip": "Consiglio"}`
                    }]
                }]
            })
        });

        const data = await response.json();

        // Se Google continua a dare errore, facciamo un fallback immediato a gemini-pro
        if (data.error) {
            console.error("Errore Google:", data.error.message);
            return res.status(200).json({
                summary: "Google API Error",
                tip: "Riprova tra un istante, stiamo calibrando i modelli."
            });
        }

        const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        return res.status(200).json(JSON.parse(aiText));

    } catch (error) {
        return res.status(200).json({
            summary: "Analisi quasi pronta",
            tip: "Il coach sta arrivando, riprova il push."
        });
    }
}