import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const apiKey = process.env['GEMINI_API_KEY'];
    const { stats } = req.body;

    // Questo prompt istruisce Gemini a rispondere ESATTAMENTE in formato JSON
    const prompt = `Agisci come un coach professionista di Valorant. 
    Analizza queste statistiche medie degli ultimi match: 
    K/D Ratio: ${stats.kd}, Headshot %: ${stats.hs}, Win Rate: ${stats.wr}%. 
    Scrivi un'analisi breve e tecnica (max 250 caratteri) e un consiglio pratico (max 50 caratteri).
    Rispondi SOLO con un oggetto JSON valido in questo formato:
    {"summary": "testo dell'analisi", "tip": "consiglio breve"}`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { response_mime_type: "application/json" } // Forza il formato JSON
            })
        });

        const data = await response.json();

        // Estraiamo il testo JSON generato da Gemini
        const aiRawResponse = data.candidates[0].content.parts[0].text;
        const cleanResponse = JSON.parse(aiRawResponse);

        res.status(200).json(cleanResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore durante l\'analisi tattica' });
    }
}