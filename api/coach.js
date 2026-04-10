export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(200).json({ summary: "Errore Configurazione", tip: "Manca la chiave API." });

    // 1. Recuperiamo i dati complessi inviati dal Frontend
    const { recent_50_matches } = req.body || {};

    if (!recent_50_matches) {
        return res.status(200).json({ summary: "Dati insufficienti", tip: "Il coach ha bisogno di più match per un'analisi elite." });
    }

    // 2. Costruiamo un prompt super dettagliato usando i nuovi dati
    const prompt = `
    Agisci come un Coach Professionista di Valorant (livello VCT). 
    Analizza queste statistiche avanzate delle ultime 50 partite dell'utente:
    - K/D Ratio: ${recent_50_matches.kd}
    - Headshot %: ${recent_50_matches.hs}%
    - Orario Migliore: ${recent_50_matches.best_hours}
    - Distribuzione Ruoli: ${JSON.stringify(recent_50_matches.role_distribution)}
    - Performance Server: ${recent_50_matches.server_performance}
    - Arma Principale: ${recent_50_matches.top_weapons[0]?.name} (Kills: ${recent_50_matches.top_weapons[0]?.kills}, Deaths: ${recent_50_matches.top_weapons[0]?.deaths})

    REGOLE DI RISPOSTA:
    1. Analizza lo stile di gioco (es. se gioca molto duelist ed è efficace o meno).
    2. Commenta l'orario e il server per suggerire quando giocare.
    3. Dai un consiglio tecnico sull'arma usata.
    4. Rispondi ESCLUSIVAMENTE in formato JSON con questa struttura: 
    {"summary": "riassunto dettagliato stile e performance", "tip": "consiglio tecnico specifico"}
    5. Usa un tono professionale e motivante. Lingua: ITALIANO.
  `;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
            res.status(200).json(JSON.parse(aiText));
        } else {
            throw new Error("Risposta AI non valida");
        }

    } catch (err) {
        res.status(200).json({
            summary: "Analisi Elite in pausa",
            tip: "Il coach sta ricalcolando le traiettorie. Riprova tra un attimo."
        });
    }
}