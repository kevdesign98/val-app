export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // Deve corrispondere al nome su Vercel senza spazi!
        const apiKey = process.env.Gemini_API_Key;
        if (!apiKey) throw new Error("Manca GEMINI_API_KEY su Vercel");
        console.log("API Key trovata:", apiKey.substring(0, 5) + "...");

        const { stats } = req.body;

        // Usiamo l'endpoint v1 (più stabile) invece di v1beta
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Sei un coach di Valorant. Dati: KD ${stats.kd}, HS ${stats.hs}%. 
            Rispondi SOLO con un JSON: {"summary": "...", "tip": "..."}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        // Estrazione sicura del testo
        const aiText = data.candidates[0].content.parts[0].text;
        const cleanJson = aiText.replace(/```json|```/g, "").trim();

        return res.status(200).json(JSON.parse(cleanJson));

    } catch (error) {
        return res.status(200).json({
            summary: "Errore di connessione",
            tip: "Dettaglio: " + error.message
        });
    }
}