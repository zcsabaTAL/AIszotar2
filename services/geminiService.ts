
import { GoogleGenAI, Type } from "@google/genai";
import { Term, Scenario, ScenarioResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const dictionaryContext = `
  You are an expert AI dictionary assistant for Hungarian users. 
  Your primary knowledge base is a predefined list of AI terms.
  When answering, always prioritize information from this list.
  Your goal is to standardize Hungarian AI discourse and provide intelligent knowledge discovery.
  Always respond in Hungarian.
`;

export const clarifyTerm = async (term: Term) => {
  const model = "gemini-2.5-flash";
  const prompt = `
    A felhasználó a következő AI fogalomra keresett rá:
    - Magyar kifejezés: "${term.term_hu}"
    - Angol kifejezés: "${term.term_en}"
    - Alap definíció: "${term.definition}"
    - Kategória: "${term.category}"
    - Példa: "${term.example}"

    A feladatod a következő struktúrában kiegészíteni ezt az információt, Google Search adatok alapján frissítve ahol szükséges:
    1.  **Absztrakt definíció (2 mondat):** Fogalmazd újra a definíciót közérthetően, de szakmailag pontosan.
    2.  **Magyar példa:** Adj egy rövid, gyakorlatias példát magyar kontextusban.
    3.  **EU/HU médiatrend relevancia:** Említsd meg, hogy a fogalom mennyire releváns jelenleg az Európai Unió szabályozásában vagy a magyar sajtóban. Ha nincs konkrét említés, írd, hogy általánosan fontos a területen.
    4.  **Kapcsolódó fogalmak:** Javasolj 3 kapcsolódó fogalmat a szótárból, amelyek segítik a kontextus megértését. Csak a fogalmak magyar nevét add meg, vesszővel elválasztva.

    A válaszod legyen egy JSON objektum a következő kulcsokkal: "abstractDefinition", "hungarianExample", "relevance", "relatedTerms". A "relatedTerms" egy string tömb legyen.
  `;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        }
    });
    const text = response.text.trim();
    // Sometimes the model wraps the JSON in markdown backticks
    const cleanJson = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(cleanJson);
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
    const model = 'gemini-2.5-pro';
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

export const evaluateScenario = async (scenario: Scenario, userPrompt: string): Promise<ScenarioResult> => {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
        Te egy profi AI Prompt Engineer oktató vagy.
        
        A felhasználó egy szituációs feladatot old meg (Szituációs Labor).
        
        **A szcenárió:**
        - Cím: ${scenario.title}
        - Feladat: ${scenario.task}
        - Az AI szerepe, amit játszania kellene: ${scenario.role}
        
        **A felhasználó promptja:**
        "${userPrompt}"
        
        **A te feladatod (kettős):**
        1. SZIMULÁLD le, hogy mit válaszolna az AI a felhasználó promptjára (az AI szerepében maradva).
        2. ÉRTÉKELD a felhasználó promptjának minőségét 1-5 skálán, és adj építő kritikát (magyarul).
        
        Válaszolj JSON formátumban a következő struktúrában:
        {
          "aiResponse": "Az AI szimulált válasza...",
          "critique": "Rövid visszajelzés a prompt erősségeiről és hiányosságairól...",
          "score": 3 (szám 1 és 5 között)
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        aiResponse: { type: Type.STRING },
                        critique: { type: Type.STRING },
                        score: { type: Type.NUMBER }
                    }
                }
            }
        });
        
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error evaluating scenario:", error);
        return {
            aiResponse: "Hiba történt a szimuláció során.",
            critique: "Nem sikerült kiértékelni a promptot.",
            score: 0
        };
    }
};
