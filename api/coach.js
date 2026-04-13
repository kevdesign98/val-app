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

        // PROVA QUESTO URL: È il più compatibile in assoluto al momento
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Analizza KD:${stats.kd}, HS:${stats.hs}%. Rispondi SOLO in JSON: {"summary": "Analisi", "tip": "Consiglio"}`
                    }]
                }]
            })
        });

        const data = await response.json();

        // Se Google continua a fare i capricci col nome modello, qui catturiamo il messaggio
        if (data.error) {
            return res.status(200).json({
                summary: "Google non accetta il modello",
                tip: "Prova a cambiare il nome del modello in gemini-1.5-flash-latest nel codice."
            });
        }

        // Estrazione pulita
        let aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        return res.status(200).json(JSON.parse(aiText));

    } catch (error) {
        return res.status(200).json({ summary: "Errore tecnico", tip: "Verifica la sintassi del JSON" });
    }
}