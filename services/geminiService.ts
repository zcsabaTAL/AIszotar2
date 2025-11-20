
import { GoogleGenAI, Type } from "@google/genai";
import { Term, Scenario, ScenarioResult, GolfChallenge, GolfResult } from "../types";

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

export const evaluatePromptGolf = async (challenge: GolfChallenge, userPrompt: string): Promise<GolfResult> => {
    const model = 'gemini-2.5-flash';

    const prompt = `
        Szerep: Szigorú AI Bíró a "Prompt Golf" versenyen.
        
        A feladat:
        A felhasználó írt egy promptot: "${userPrompt}"
        
        A CÉL KIMENET KRITÉRIUMA (LEÍRÁS):
        "${challenge.targetDescription}"
        
        1. lépés: Generáld le, mit válaszolna erre a promptra egy sztenderd AI asszisztens. (Ez lesz az "aiOutput").
        
        2. lépés: KIÉRTÉKELÉS - Ellenőrizd, hogy az általad generált "aiOutput" MEGFELEL-E a fenti KRITÉRIUMNAK.
           - A "Cél Kimenet" egy LEÍRÁS (pl. "Egy 3 soros haiku"), NEM feltétlenül a konkrét szöveg, amit vissza kell adni (kivéve, ha idézőjelben konkrét szöveget kér a leírás).
           - Ha a leírás azt kéri, hogy "Magyarázd el X-et", és az aiOutput egy magyarázat X-ről, akkor az SIKERES.
           - Szigorúan vedd a formai követelményeket (pl. "csak a vezetéknév", "json formátum").
           - Ha a kimenet tartalmaz felesleges szöveget (pl. "Itt van a lista:"), és a leírás tiltotta, akkor NEM SIKERES.
        
        Válasz JSON formátumban:
        {
          "aiOutput": "A generált szöveg...",
          "isSuccess": true/false,
          "reasoning": "Rövid magyarázat a felhasználónak (E/2-ben, pl: 'A válaszod helyes volt...'), miért fogadtad el vagy utasítottad el."
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
                        aiOutput: { type: Type.STRING },
                        isSuccess: { type: Type.BOOLEAN },
                        reasoning: { type: Type.STRING }
                    }
                }
            }
        });
        
        const result = JSON.parse(response.text);
        
        // Approximate token count (chars / 4 is a rough estimate for English, Hungarian is denser, but char count is explicit in prompt golf usually)
        // We will return just a number to be used for scoring.
        return {
            ...result,
            tokenCountEstimate: Math.ceil(userPrompt.length / 4)
        };

    } catch (error) {
        console.error("Error evaluating golf:", error);
        return {
            aiOutput: "Hiba a kiértékelésben.",
            isSuccess: false,
            reasoning: "Technikai hiba történt.",
            tokenCountEstimate: 0
        };
    }
};
