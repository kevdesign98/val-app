import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(200).json({ summary: "Errore", tip: "Manca API KEY" });

    try {
        const { stats } = req.body;
        const genAI = new GoogleGenerativeAI(apiKey);

        // Definiamo lo schema della risposta per non avere errori di parsing
        const schema = {
            description: "Valorant Coach Analysis",
            type: SchemaType.OBJECT,
            properties: {
                summary: { type: SchemaType.STRING, description: "Breve analisi delle prestazioni" },
                tip: { type: SchemaType.STRING, description: "Consiglio tecnico specifico" },
            },
            required: ["summary", "tip"],
        };

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Nome esatto come da documentazione
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const prompt = `Agisci come coach di Valorant. Dati giocatore: KD ${stats.kd}, HS ${stats.hs}%, Winrate ${stats.winrate}%. 
                        Fornisci un'analisi brevissima e un consiglio tecnico per migliorare.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Con responseSchema, text è GIÀ un JSON valido
        return res.status(200).json(JSON.parse(text));

    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(200).json({
            summary: "Il coach sta ricaricando le abilità",
            tip: "C'è stato un problema di connessione con l'API di Google. Riprova."
        });
    }
}