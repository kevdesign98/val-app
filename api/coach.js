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

        // Prova 'gemini-1.5-flash-latest' invece di solo 'gemini-1.5-flash'
        // Se continua a fallire, usa 'gemini-pro' (che è il fallback universale)
        const model = "gemini-1.5-flash";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Agisci come coach di Valorant. Dati giocatore: KD ${stats.kd}, HS ${stats.hs}%, Winrate ${stats.winrate}%. 
                        Fornisci un'analisi brevissima e un consiglio tecnico. 
                        Rispondi ESCLUSIVAMENTE con un oggetto JSON valido. 
                        Esempio: {"summary": "Ottima mira", "tip": "Migliora il posizionamento"}`
                    }]
                }],
                // Aggiungiamo parametri per forzare una risposta pulita
                generationConfig: {
                    temperature: 0.7,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 200,
                    responseMimeType: "application/json" // Questo forza Gemini a rispondere in JSON (se supportato dal modello)
                }
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(200).json({
                summary: `Errore Modello: ${model}`,
                tip: data.error.message
            });
        }

        if (!data.candidates || !data.candidates[0]) {
            throw new Error("Nessuna risposta dal coach");
        }

        let aiText = data.candidates[0].content.parts[0].text;

        // Pulizia avanzata per estrarre solo il JSON
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Risposta AI non valida");

        const finalJson = JSON.parse(jsonMatch[0]);
        return res.status(200).json(finalJson);

    } catch (error) {
        console.error("Coach Error:", error);
        return res.status(200).json({
            summary: "Il coach è in pausa tattica",
            tip: "Controlla la console o prova a cambiare modello in gemini-pro."
        });
    }
}