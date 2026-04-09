export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;
    const { stats } = req.body;

    const prompt = `Agisci come un coach professionista di Valorant. 
    Analizza queste statistiche: K/D: ${stats.kd}, HS%: ${stats.hs}, WR: ${stats.wr}%. 
    Fornisci un'analisi tecnica veloce e un consiglio pratico in formato JSON:
    {"summary": "testo", "tip": "consiglio"}`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { response_mime_type: "application/json" }
            })
        });

        const data = await response.json();
        const aiContent = JSON.parse(data.candidates[0].content.parts[0].text);
        res.status(200).json(aiContent);
    } catch (error) {
        res.status(500).json({ error: 'Errore AI' });
    }
}