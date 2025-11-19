
import { GoogleGenAI } from "@google/genai";
import { Term, AIAnalysis, GroundingSource } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// 1. In-Memory Cache Implementation
const analysisCache = new Map<string, AIAnalysis>();

const dictionaryContext = `
  You are an expert AI dictionary assistant for Hungarian users. 
  Your primary knowledge base is a predefined list of AI terms.
  When answering, always prioritize information from this list.
  Your goal is to standardize Hungarian AI discourse and provide intelligent knowledge discovery.
  Always respond in Hungarian.
`;

export const clarifyTerm = async (term: Term): Promise<AIAnalysis> => {
  // Check Cache First
  if (analysisCache.has(term.id)) {
    console.log(`Serving analysis for ${term.term_hu} from cache.`);
    return analysisCache.get(term.id)!;
  }

  const model = "gemini-2.5-flash";
  
  // Since we use Google Search Grounding, we CANNOT use responseSchema (per SDK rules).
  // We must instruct the model via prompt to return JSON.
  const prompt = `
    A felhasználó a következő AI fogalomra keresett rá:
    - Magyar kifejezés: "${term.term_hu}"
    - Angol kifejezés: "${term.term_en}"
    - Alap definíció: "${term.definition}"
    - Kategória: "${term.category}"
    
    Használd a Google Keresést (Google Search), hogy naprakész információkat találj erről a fogalomról.
    
    A válaszod KIZÁRÓLAG egy érvényes JSON objektum legyen (Markdown formázás nélkül), a következő struktúrában:
    {
      "abstractDefinition": "A definíció közérthető, de szakmailag pontos újrafogalmazása (2 mondat).",
      "hungarianExample": "Rövid, gyakorlatias példa magyar kontextusban.",
      "relevance": "A fogalom relevanciája az EU szabályozásban vagy a magyar sajtóban (a keresési találatok alapján).",
      "relatedTerms": ["kapcsolódó fogalom 1", "kapcsolódó fogalom 2", "kapcsolódó fogalom 3"]
    }
    
    A "relatedTerms" tömbben csak a fogalmak magyar nevét add meg.
  `;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }], // 2. Deep Grounding Integration
            // responseSchema is NOT allowed when using tools
        }
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("No content generated");
    }

    // Clean up potential Markdown code blocks if the model ignores "no markdown" instruction
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData: AIAnalysis = JSON.parse(jsonString);

    // Extract Grounding Metadata (Sources)
    const groundingSources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
        chunks.forEach(chunk => {
            if (chunk.web) {
                groundingSources.push({
                    title: chunk.web.title || 'Online forrás',
                    uri: chunk.web.uri || '#'
                });
            }
        });
    }

    const finalResult: AIAnalysis = {
        ...parsedData,
        groundingSources: groundingSources.length > 0 ? groundingSources : undefined
    };

    // Save to Cache
    analysisCache.set(term.id, finalResult);

    return finalResult;

  } catch (error) {
    console.error("Error clarifying term with Gemini:", error);
    return {
        abstractDefinition: "Az AI nem tudott kiegészítő információt generálni.",
        hungarianExample: "Nincs elérhető példa.",
        relevance: "Nem elemezhető.",
        relatedTerms: []
    };
  }
};

export const getChatbotResponse = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
    const model = 'gemini-2.5-flash';
    const chat = ai.chats.create({ 
        model, 
        history,
        config: {
            systemInstruction: dictionaryContext
        }
    });
    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
};

export const compareTerms = async (term1: Term, term2: Term) => {
    const model = 'gemini-3-pro-preview';
    const prompt = `
        Hasonlítsd össze a következő két mesterséges intelligencia fogalmat magyar felhasználók számára.
        A válaszod legyen világos, strukturált és közérthető.

        Fogalom 1:
        - Név: ${term1.term_hu} (${term1.term_en})
        - Definíció: ${term1.definition}

        Fogalom 2:
        - Név: ${term2.term_hu} (${term2.term_en})
        - Definíció: ${term2.definition}
        
        Térj ki a következőkre:
        1.  **Fő különbség:** Mi a legfontosabb megkülönböztető jegyük?
        2.  **Hasonlóságok:** Milyen közös pontjaik vannak?
        3.  **Gyakorlati példa:** Hozz egy példát, ami bemutatja a kettő viszonyát vagy különbségét.
        4.  **Melyiket mikor használjuk:** Röviden, milyen kontextusban releváns az egyik és a másik.
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 32768 }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error comparing terms with Gemini:", error);
        return "Hiba történt a fogalmak összehasonlítása során.";
    }
};
