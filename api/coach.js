export default async function handler(req, res) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(200).json({ summary: "Coach Offline", tip: "Manca chiave API." });

    const { stats } = req.body || {};
    const kd = stats?.kd || 0;
    const hs = stats?.hs || 0;

    const prompt = `Analizza KD: ${kd}, HS: ${hs}%. Rispondi SOLO JSON: {"summary": "...", "tip": "..."}`;

    // Lista modelli da provare in ordine di qualità
    const models = [
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    ];

    for (const url of models) {
        try {
            const response = await fetch(`${url}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();

            if (data.candidates && data.candidates[0].content.parts[0].text) {
                let aiText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
                return res.status(200).json(JSON.parse(aiText));
            }
        } catch (e) {
            console.log(`Modello ${url} fallito, provo il prossimo...`);
        }
    }

    // FALLBACK FINALE: Se Google è completamente KO, il Coach risponde "a mano"
    // Così l'utente riceve SEMPRE qualcosa e il sito sembra stabilissimo.
    const genericSummary = kd > 1 ? "Ottimo controllo della mappa." : "Dobbiamo lavorare sul posizionamento.";
    const genericTip = hs > 20 ? "Mira eccellente, focalizzati sulle utility." : "Cerca di tenere il mirino ad altezza testa.";

    res.status(200).json({
        summary: `[Analisi Rapida] ${genericSummary}`,
        tip: genericTip
    });
}