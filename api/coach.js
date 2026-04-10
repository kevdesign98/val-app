export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(200).json({
            summary: "Configurazione incompleta",
            tip: "Manca la chiave GEMINI_API_KEY su Vercel."
        });
    }

    try {
        const { stats } = req.body || {};
        const kd = stats?.kd || 0;
        const hs = stats?.hs || 0;
        const wr = stats?.wr || 0;

        const prompt = `Agisci come un coach esperto di Valorant. Analizza queste stats: KD ${kd}, Headshot ${hs}%, Win Rate ${wr}%. Rispondi SOLO in formato JSON con questo schema: {"summary": "un riassunto breve", "tip": "un consiglio tecnico"}`;

        // URL preso dalla tua guida rapida
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey // Usiamo l'header come nel curl!
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(200).json({
                summary: "Errore API Google",
                tip: data.error.message
            });
        }

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let aiText = data.candidates[0].content.parts[0].text;
            // Rimuoviamo eventuali blocchi di codice markdown che Gemini a volte aggiunge
            aiText = aiText.replace(/```json|```/g, "").trim();
            res.status(200).json(JSON.parse(aiText));
        } else {
            res.status(200).json({ summary: "Analisi non disponibile", tip: "L'AI non ha generato una risposta valida." });
        }

    } catch (err) {
        res.status(200).json({
            summary: "Errore tecnico backend",
            tip: err.message
        });
    }
}