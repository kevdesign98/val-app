export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;

    // Se non c'è la chiave, esplodiamo subito con un messaggio chiaro
    if (!apiKey) {
        console.error("LOG: Chiave API mancante nelle Environment Variables!");
        return res.status(500).json({ error: "Configurazione server errata (Chiave mancante)" });
    }

    // Angular manda un JSON, ma proviamo a prenderlo in modo sicuro
    let stats;
    try {
        stats = typeof req.body === 'string' ? JSON.parse(req.body).stats : req.body.stats;
        console.log("LOG: Statistiche ricevute correttamente:", stats);
    } catch (e) {
        console.error("LOG: Errore nel parsing dei dati ricevuti:", e);
        stats = { kd: 0, hs: 0, wr: 0 }; // Default per non far crashare tutto
    }

    try {
        const prompt = `Agisci come un coach Radiant di Valorant. Analizza: KD ${stats.kd}, HS ${stats.hs}%, WinRate ${stats.wr}%. Rispondi SOLO con un JSON: {"summary": "...", "tip": "..."}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        console.log("LOG: Risposta da Google ricevuta");

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
            res.status(200).json(JSON.parse(aiText));
        } else {
            console.error("LOG: Google ha risposto con errore:", data);
            res.status(500).json({ error: "L'AI non ha prodotto risultati" });
        }
    } catch (error) {
        console.error("LOG: Errore fatale nella funzione:", error);
        res.status(500).json({ error: error.message });
    }
}