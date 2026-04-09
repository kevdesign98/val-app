export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "Chiave API mancante su Vercel!" });
    }

    const { stats } = req.body;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Analizza KD: ${stats.kd}, HS: ${stats.hs}%. Rispondi solo in JSON: {"summary": "...", "tip": "..."}` }] }]
            })
        });

        const data = await response.json();

        // Log di sicurezza per vedere cosa risponde Google nei log di Vercel
        console.log("Risposta Google:", JSON.stringify(data));

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let text = data.candidates[0].content.parts[0].text;
            // Pulizia base se Gemini mette i backtick ```json
            text = text.replace(/```json|```/g, "");
            res.status(200).json(JSON.parse(text));
        } else {
            throw new Error("Formato risposta AI non valido");
        }
    } catch (error) {
        console.error("ERRORE BACKEND:", error);
        res.status(500).json({ error: error.message });
    }
}