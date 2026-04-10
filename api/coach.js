export default async function handler(req, res) {
    // 1. Controllo Metodo
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ summary: "Errore Configurazione", tip: "Manca la chiave API su Vercel" });
    }

    try {
        const { recent_50_matches } = req.body;

        const prompt = `Agisci come un coach pro di Valorant. Analizza questi dati: 
    KD: ${recent_50_matches.kd}, HS: ${recent_50_matches.hs}%, Winrate: ${recent_50_matches.winrate}%. 
    Rispondi SOLO con un oggetto JSON valido: {"summary": "breve analisi", "tip": "consiglio tecnico"}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ summary: "Gemini Error", tip: data.error?.message });
        }

        let textResponse = data.candidates[0].content.parts[0].text;

        // Pulizia da eventuali blocchi di codice markdown ```json
        const cleanJson = textResponse.replace(/```json|```/g, "").trim();
        const result = JSON.parse(cleanJson);

        return res.status(200).json(result);

    } catch (error) {
        console.error("Crash API Coach:", error);
        return res.status(500).json({
            summary: "Analisi Temporaneamente Offline",
            tip: "Riprova tra qualche istante"
        });
    }
}