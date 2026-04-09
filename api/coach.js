export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;

    // TEST 1: La chiave c'è?
    if (!apiKey) {
        return res.status(200).json({
            summary: "Errore di configurazione",
            tip: "Manca la GEMINI_API_KEY su Vercel. Aggiungila e fai Redeploy."
        });
    }

    try {
        const { stats } = req.body || {};
        const kd = stats?.kd || 0;
        const hs = stats?.hs || 0;

        // TEST 2: Chiamata a Google
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Sei un coach di Valorant. Analizza KD: ${kd} e HS: ${hs}%. Rispondi in italiano con un JSON: {"summary": "...", "tip": "..."}` }] }]
            })
        });

        const data = await response.json();

        // TEST 3: Google ha dato errore?
        if (data.error) {
            return res.status(200).json({
                summary: "Errore da Google AI",
                tip: data.error.message
            });
        }

        const aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        res.status(200).json(JSON.parse(aiText));

    } catch (err) {
        // Se tutto fallisce, mandiamo l'errore tecnico come risposta
        res.status(200).json({
            summary: "Errore tecnico nel backend",
            tip: err.message
        });
    }
}