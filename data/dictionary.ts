import { Term, Category } from '../types';

/**
 * Az alkalmazás a szócikkeket a lenti `csvData` string-ből olvassa be.
 * A szótár központi forrása a `data/Konszolidalt_AI_Szotar_2025.csv` fájl.
 * Ha a CSV fájlt módosítod, másold át a tartalmát ide, hogy a változások megjelenjenek az alkalmazásban.
 */
const csvData = `Betű,Angol kifejezés,Magyar megfelelő,Definíció,Példa,Kategória,Részletes források
A,AI (Artificial Intelligence),Mesterséges intelligencia / MI,"Olyan számítógépes rendszer képessége, amely emberi kognitív funkciókat tud utánozni, mint a tanulás, problémamegoldás és döntéshozatal.","ChatGPT, Google Gemini, virtuális asszisztensek",Alapfogalom,"Microsoft Azure AI dokumentáció (azure.microsoft.com), EU MI-stratégia (digital-strategy.ec.europa.eu), Qubit.hu 2025-07-11, Mivers.hu 2024-11-08"
A,Active Learning,Aktív tanulás,"Olyan tréning megközelítés, ahol a modell kéri a leginformatívabb adatpontok címkézését, csökkentve ezzel a címkézési erőfeszítést.",Orvosi képek annotálása ahol az AI kiválasztja a legfontosabb eseteket,Gépi tanulás,AI Glossary for Directors & Leaders PDF
A,AGI (Artificial General Intelligence),Általános mesterséges intelligencia / Erős AI,"Olyan AI, amely képes meghaladni az emberi teljesítményt bármilyen intellektuális feladatban, tudatos gondolatokkal és saját célokkal.",Jelenleg csak elméletben létezik; sci-fi filmekben látható robotok,AI típusok,"Microsoft Azure AI dokumentáció, AI Glossary PDF, Torokbalazs.com 2025-05-22"
A,AI Agent,AI ügynök,"Olyan szoftver, amely önállóan tervezi meg és hajtja végre a feladatokat eszközök vagy adatforrások használatával, szabályok és emberi felügyelet mellett.",Automatizált ügyfélszolgálati rendszer amely több eszközt is használ,Alkalmazások,"AI Glossary PDF, Torokbalazs.com 2025-05-24, Codebreeder.hu 2024-2025"
A,AI Adoption,AI bevezetés,"A mesterséges intelligencia üzleti működésbe történő beépítésének folyamata, amely hatással van a folyamatokra, kultúrára és teljesítményre.",Vállalat ChatGPT bevezetése az ügyfélszolgálaton,Üzleti,"AI Glossary PDF, EU MI-stratégia 2025-10-07, PwC AI Readiness Index 2025-09-23"
A,Algoritmus,Algoritmus,"Strukturált utasításkészlet, amelyet a számítógépek követnek a bemenetek feldolgozására és kimenetek generálására.","Keresési algoritmus, rendezési algoritmus",Alapfogalom,"AI Glossary PDF, MarketingBox.hu 2025-04-05"
A,ASI (Artificial Superintelligence),Mesterséges szuperintelligencia,"Olyan számítógép, amely képes lenne az embert csaknem minden területen túlszárnyalni, beleértve a kreativitást és társadalmi készségeket.",Jelenleg elméleti koncepció,AI típusok,Microsoft Azure AI dokumentáció
B,Bias (Statistical/Algorithmic),Elfogultság / Torzítás,"Szisztematikus hiba, amely igazságtalan eredményeket produkál bizonyos egyének vagy csoportok számára, adatokból vagy modellezési döntésekből eredően.","Arcfelismerő rendszer, amely kevésbé pontosan ismeri fel bizonyos bőrszínű embereket",Etika,"AI Glossary PDF, 12 Essential GenAI Terms infografika (Luis Rodrigues), MarketingBox.hu 2025-04-05"
B,Big Data,Nagy adat,"Hatalmas mennyiségű strukturált és strukturálatlan adat, amelyet AI rendszerek elemzésére használnak.",Milliárd felhasználói interakció közösségi médián,Adatok,"MarketingBox.hu 2025-04-05, Alfaugynokseg.hu 2023-08-27"
C,ChatGPT,ChatGPT,"Az OpenAI által fejlesztett nagy nyelvi modell alapú konverzációs AI, amely szöveges kérésekre válaszol.","Beszélgetés, kódírás, szöveggenerálás",Termékek/Platformok,"Index.hu, Telex.hu 2025-08-31, Origo.hu 2025-09-19, 24.hu, Webnode.com 2025-07-14, Hir36.hu 2025-09-21"
C,Chatbot,Csevegőrobot / Chatbot,"Szoftver alkalmazás, amely képes szöveges vagy hangbeszélgetést folytatni emberekkel.",Ügyfélszolgálati robot weboldalakon,Alkalmazások,"Microsoft Azure AI dokumentáció, 24.hu, Aiszaki.hu 2023-06-14"
C,Computer Vision,Számítógépes látás / Képfelismerés,"Gépek olyan képességekkel való felruházása, hogy képeket vagy videókat értelmezzenek és feldolgozzanak.","Önvezető autók forgalomfelismerése, arcfelismerés",AI alkalmazások,"12 Essential GenAI Terms infografika, MarketingBox.hu 2025-04-05, Alfaugynokseg.hu 2023-08-27"
C,Context Window,Kontextus ablak / Beszélgetési memória,"A maximális információmennyiség (tokenekben mérve), amelyet egy AI modell egyszerre képes látni vagy emlékezni egy beszélgetésben.","GPT-4: 32k token, Claude 3.5: 200k token",Technikai,"12 Essential GenAI Terms infografika, Nebius.com 2024-11-27, IBM.com 2024-11-06, Hopsworks.ai 2024-10-31"
D,DALL-E,DALL-E,"Az OpenAI által fejlesztett AI képgeneráló rendszer, amely szöveges leírásból hoz létre képeket.",Kép generálása 'egy macska az űrben' promptból,Termékek/Platformok,"Dreamworldphoto.hu 2023-12-19, ITBazis.hu 2023-11-12, JustBeeDigital.hu 2025-04-01"
D,Dataset,Adatkészlet / Adathalmaz,"Strukturált adatgyűjtemény, amelyet AI modellek tanításához és teszteléséhez használnak.",ImageNet (14 millió képből álló adatkészlet),Adatok,"MarketingBox.hu 2025-04-05, Alfaugynokseg.hu 2023-08-27"
D,Deep Learning,Mélytanulás,"A gépi tanulás fejlett típusa, amely neurális hálózatokat használ komplex mintázatok felismerésére. Az emberi agy szerkezete által ihletett.","Képfelismerés, beszédfelismerés, természetes nyelvi feldolgozás",Gépi tanulás,"12 Essential GenAI Terms infografika, Microsoft Azure, Torokbalazs.com 2025-05-24, MarketingBox.hu 2025-04-05"
D,Drift (Data/Concept),Sodródás / Modell-elcsúszás,"A bemeneti adatok vagy valós kapcsolatok változása idővel, ami rontja a modell teljesítményét.","COVID utáni vásárlási minták megváltoztak, régi modellek pontatlanok lettek",Modell menedzsment,AI Glossary PDF
E,Embedding,Beágyazás / Vektoros ábrázolás,"Szavak, mondatok vagy más adatok numerikus reprezentációja, amely megragadja azok jelentését és szemantikai kapcsolatait.",A 'király' és 'királyné' szavak hasonló vektorokkal reprezentálva,Technikai,"12 Essential GenAI Terms infografika, AI Glossary PDF"
E,Explainability,Magyarázhatóság,"Az a mérték, ameddig egy AI rendszer belső működése és döntéshozatali folyamata megérthető az emberek számára.","LIME vagy SHAP eszközök, amelyek megmutatják, miért hozott egy AI egy döntést",Etika/Governance,"AI Glossary PDF, EU MI-stratégia 2025-10-07"
F,Fine-tuning,Finomhangolás / Modell specializáció,"Egy általános alapmodell további tanítása kisebb, célzott adatkészleten, hogy specifikus feladatra vagy területre specializálódjon.",GPT-4 finomhangolása orvosi dokumentumok elemzésére,Gépi tanulás,"12 Essential GenAI Terms infografika, AI Glossary PDF, Shifton.com 2025-08-12"
F,Foundational Model,Alapmodell / Foundációs modell,"Nagy, előre betanított AI modell (pl. GPT-5, Claude 4, Deepseek), amely erőteljes alapként szolgál számos különböző feladathoz.","GPT-4, Claude 3.5, Llama 3",Modell típusok,"12 Essential GenAI Terms infografika, AI Glossary PDF"
G,GenAI (Generative AI),Generatív AI / Generatív mesterséges intelligencia,"AI rendszerek, amelyek teljesen új tartalmat hoznak létre - szöveget, képeket, zenét, videót vagy kódot. Nagy mennyiségű létező adatból tanulnak.","ChatGPT (szöveg), DALL-E (kép), Suno (zene), Runway (videó)",AI típusok,"12 Essential GenAI Terms infografika, EU GenAI4EU kezdeményezés 2024-01, Shifton.com 2025-08-12, Webnode.com 2025-07-14"
G,Gemini (Google),Gemini,"A Google multimodális nagy nyelvi modellje, amely képes szöveget, képet, hangot és videót is feldolgozni.",Google Gemini chatbot,Termékek/Platformok,"Origo.hu 2025-09-19, Torokbalazs.com 2025-05-18"
G,Gépi tanulás (Machine Learning / ML),Gépi tanulás,"Az a folyamat, amelyet számítógépes rendszerek használnak AI eléréséhez. Algoritmusokkal azonosít mintákat adatokban, amelyekkel modellt készít és előrejelzéseket végez.","Netflix ajánlórendszere, banki csalásfelismerés",Alapfogalom,"12 Essential GenAI Terms infografika, Microsoft Azure, MarketingBox.hu 2025-04-05"
G,GPT (Generative Pre-trained Transformer),GPT / Generatív előre betanított transzformátor,"Az OpenAI által fejlesztett nagy nyelvi modell architektúra, amely a Transformer modellre épül.","GPT-3.5, GPT-4, GPT-4o",Modell típusok,"Webnode.com 2025-07-14, Torokbalazs.com 2025-05-18"
H,Hallucination,Hallucináció / AI kitalálás,"Amikor az AI magabiztosan generál információt, amely ténylegesen helytelen vagy teljesen kitalált. Az AI megbízhatóság kritikus kihívása.","ChatGPT hamis tudományos hivatkozásokat gyárt,Kockázatok,"12 Essential GenAI Terms infografika, AI Glossary PDF, MarketingBox.hu 2025-04-05, Telex.hu 2025-08-13"
I-J,Jailbreak,Védelem megkerülés / Jailbreak,"Olyan támadás, amely arra kényszeríti a modellt, hogy megkerülje a biztonsági óvintézkedéseket és szabálysértő vagy veszélyes kimeneteket produkáljon.","Prompt injection technikák, amelyek megkerülik a content filtereket",Biztonság,AI Glossary PDF
L,LLM (Large Language Model),Nagy nyelvi modell,"Hatalmas neurális hálózatok, amelyek szövegen tanulnak, hogy emberi nyelvhez hasonló tartalmat értsenek és generáljanak. A ChatGPT és Gemini alapját képezik.","GPT-4, Claude 3.5, Llama 3, Gemini",Modell típusok,"12 Essential GenAI Terms infografika, Torokbalazs.com 2025-05-24, MarketingBox.hu 2025-04-05, Telex.hu 2025-07-06"
M,Midjourney,Midjourney,"Magas minőségű AI képgeneráló platform, amely Discord-on keresztül működik és művészi stílusú képeket hoz létre.","Digitális artwork, illusztrációk generálása",Termékek/Platformok,"Dreamworldphoto.hu 2023-12-19, Aiszaki.hu 2023-07-12, Teahouseconsulting.hu 2023-06-02"
M,MI (Mesterséges Intelligencia),Mesterséges Intelligencia,"Az AI magyar rövidítése. Kevésbé elterjedt a magyar interneten az 'AI' rövidítésnél, kereshetőségi problémák miatt ('mi' névmás).",EU hivatalos dokumentumokban gyakoribb,Alapfogalom,"EU MI-stratégia 2025-10-07, Telex.hu 2025-06-15, Qubit.hu 2025-07-11, Mivers.hu 2024-11-08"
M,Model Risk Management (MRM),Modell-kockázat menedzsment,"Szabályozások és kontrollok a modell fejlesztés, validálás, telepítés és monitorozás irányítására az operációs és szabályozási kockázatok kezelése érdekében.",Bankok AI modell validációs keretrendszere,Governance,AI Glossary PDF
M,Multimodal AI,Multimodális AI / Több formátumú feldolgozás,"Olyan AI, amely több adattípust képes feldolgozni és generálni - szöveget, képeket, hangot és videót. Zökkenőmentesen kombinálja ezeket a bemeneteket és kimeneteket.","GPT-4V (Vision), Gemini, Claude 3",AI típusok,"12 Essential GenAI Terms infografika, Codebreeder.hu 2024-2025, MarketingBox.hu 2025-04-05"
N,Neural Network,Neurális hálózat,"Az emberi agy szerkezete által ihletett algoritmus-hálózat, amely beágyazott neurális csomópontokból áll.",Convolutional Neural Network (CNN) képfelismeréshez,Technikai,"Microsoft Azure, AI Glossary PDF"
N,NLP (Natural Language Processing),Természetes nyelvi feldolgozás,Emberi nyelv feldolgozása és megértése számítógépek által. Magában foglalja a szöveg- és beszédelemzést.,"Google Translate, sentiment analysis, chatbotok",AI alkalmazások,"12 Essential GenAI Terms infografika, MarketingBox.hu 2025-04-05, Webnode.com 2025-07-14"
P,Prompt,Prompt / Utasítás / Kérés,"Utasítás vagy kérdés, amelyet az AI-nak adunk. Az elsődleges módszer a modell kimenetének irányítására.",'Írj egy motivációs levelet magyarul marketinges pozícióra',Használat,"12 Essential GenAI Terms infografika, Webnode.com 2025-07-14, MarketingBox.hu 2025-04-05, Undetectable.ai 2025-08-05"
P,Prompt Engineering,Prompt tervezés / AI utasítás tervezés,"Világos és hatékony utasítások vagy promptok készítésének képessége, hogy a legjobb eredményeket kapjuk az AI-tól.","Chain-of-thought prompting, few-shot learning promptok",Használat,"12 Essential GenAI Terms infografika, Torokbalazs.com 2025-05-24, MarketingBox.hu 2025-04-05"
P,Prompt Injection,Prompt befecskendezés,"Olyan támadás, amikor manipulált bemenetek eltérítik a modell működését vagy eszközhasználatát.","Rejtett utasítások egy PDF-ben, amelyek befolyásolják az AI válaszát",Biztonság,AI Glossary PDF
R,RAG (Retrieval Augmented Generation),Lekérdezéssel bővített generálás / Adatlekéréssel kibővített generálás,"Olyan technika, amely egy LLM-et külső információforrással (pl. keresőmotorral vagy adatbázissal) kombinál. Ez lehetővé teszi, hogy a modell aktuális tényekhez férjen hozzá és csökkenti a hallucinációkat.","Chatbot, amely válaszadás előtt keres a vállalati dokumentumokban",Technikai,"12 Essential GenAI Terms infografika, InterSystems.com 2025-08-12, Torokbalazs.com 2025-07-30, Microsoft Azure Databricks, Lexiq.hu, SRG.hu"
R,Responsible AI,Felelős AI,"Az AI rendszerek etikus, átlátható, fair és elszámoltatható tervezésének, fejlesztésének és telepítésének gyakorlata.",Microsoft Responsible AI Standard,Etika/Governance,"AI Glossary PDF, EU MI-stratégia 2025-10-07"
R,RLHF (Reinforcement Learning from Human Feedback),Erősítéses tanulás emberi visszajelzéssel,"Gépi tanulási technika, ahol emberi visszajelzések irányítják a tanulási folyamatot, így a modell kimenete összhangban van az emberi értékekkel.","ChatGPT finomhangolása emberi értékelők visszajelzései alapján,Gépi tanulás,Shifton.com 2025-08-12"
S,Stable Diffusion,Stable Diffusion,"Nyílt forráskódú AI képgeneráló rendszer, amely lehetővé teszi a teljes kontroll megtartását a generálási folyamat felett.",Lokálisan futtatható képgenerálás egyedi modellek használatával,Termékek/Platformok,"Dreamworldphoto.hu 2023-12-19, Torokbalazs.com 2025-05-18"
S,Szintetikus adatok,Szintetikus adatok / Mesterségesen generált adatok,"Mesterségesen előállított adatok, amelyeket tesztelésre, modelltréningre vagy adatvédelmi okokból használnak.",Virtuális baleset-szimulációk autógyártók számára,Adatok,"Shifton.com 2025-08-12, MarketingBox.hu 2025-04-05"
S,Szűk AI (Narrow AI),Szűk mesterséges intelligencia / Gyenge AI,"Olyan számítógépes rendszer, amely egy szűken meghatározott feladatot képes az embernél hatékonyabban elvégezni. Ez a legmagasabb AI-szint, amelyet az emberiség máig elért.","Sakk program, spam filter, ajánlórendszerek",AI típusok,Microsoft Azure
T,Token,Token / Szövegegység,"Szöveg alapegysége - például szó vagy szórész -, amelyet az AI modell feldolgoz. A kontextus ablak és az API költségek is tokenekben mérhetők.",'Mesterséges intelligencia' = 2-3 token; 1 token ≈ 0.75 szó angolul,Technikai,"12 Essential GenAI Terms infografika, AI Glossary PDF"
T,Transformer,Transzformátor / Transformer modell,"Neurális hálózat architektúra, amely az attention mechanizmust használja. A modern LLM-ek alapja (GPT, BERT, T5).",A 'Attention is All You Need' paper alapján működik,Technikai,AI Glossary PDF
V-Z,Vector Database,Vektor adatbázis,"Olyan adatbázis, amely vektoros reprezentációkat (embedding-eket) tárol és lehetővé teszi a szemantikai keresést.","Pinecone, Weaviate, Chroma - RAG rendszerekhez",Technikai,AI Glossary PDF
V-Z,Zero-Shot Learning,Azonnali általánosítás / Nullpontos tanulás,"Az AI azon képessége, hogy olyan feladatot hajtson végre, amelyre explicit módon nem tanították. Hatalmas tudását új problémákra tudja általánosítani, kizárólag a prompt alapján.","GPT-4 képes új nyelven fordítani anélkül, hogy azon a nyelven tanították volna",Gépi tanulás,"12 Essential GenAI Terms infografika, AI Glossary PDF"
`;

/**
 * Segédfüggvény a CSV-ben található magyar kategóriák összerendeléséhez a Category enumnal.
 */
function mapCategory(cat: string): Category {
  const c = cat.toLowerCase().trim();
  
  if (c === 'alapfogalom') return Category.Technical;
  if (c === 'gépi tanulás' || c.includes('gépi tanulás')) return Category.ML;
  if (c === 'ai típusok' || c.includes('ai típusok') || c.includes('modellek')) return Category.Models;
  if (c === 'alkalmazások' || c.includes('alkalmazások') || c === 'üzleti' || c.includes('alkalmazás')) return Category.Applications;
  if (c === 'etika' || c === 'etika és governance' || c.includes('etika') || c === 'modell menedzsment' || c === 'governance') return Category.Ethics;
  if (c === 'technikai' || c === 'technikai fogalmak' || c === 'adatok') return Category.Technical;
  if (c === 'termékek/platformok' || c === 'platformok és eszközök' || c === 'használat' || c.includes('platform')) return Category.Platforms;
  if (c === 'biztonság' || c.includes('biztonság') || c === 'kockázatok') return Category.Security;
  if (c === 'modell típusok') return Category.Models;

  return Category.Technical; // Alapértelmezett
}

/**
 * Segédfüggvény az ID generálásához az angol kifejezésből.
 */
function generateId(termEn: string): string {
    return termEn
        .toLowerCase()
        .replace(/\(.*\)/, '') // Zárójeles rész eltávolítása
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Speciális karakterek törlése
        .replace(/\s+/g, '-'); // Szóközök cseréje kötőjelre
}

/**
 * Robusztus CSV-feldolgozó, amely kezeli az idézőjeles, többsoros mezőket is.
 * @param csv A feldolgozandó CSV tartalom stringként.
 * @returns A szótárkifejezések tömbje (Term[]).
 */
function parseDictionaryCSV(csv: string): Term[] {
  const text = csv.trim();
  // Remove BOM if present
  const safeText = text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
  
  const records = [];
  let currentRecord: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < safeText.length; i++) {
    const char = safeText[i];
    const nextChar = i + 1 < safeText.length ? safeText[i + 1] : null;

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRecord.push(currentField);
        currentField = '';
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') {
          i++; // Skip LF in CRLF
        }
        currentRecord.push(currentField);
        records.push(currentRecord);
        currentRecord = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  // Add the last part if the file doesn't end with a newline
  if (currentField !== '' || currentRecord.length > 0) {
    currentRecord.push(currentField);
    records.push(currentRecord);
  }

  if (records.length < 2) return [];

  const headerRow = records.shift()!;
  const headers = headerRow.map(h => h.trim());
  
  // Detect format based on header content (checking for 'Angol kifejezés')
  const isNewFormat = headers.some(h => h.includes('Angol kifejezés'));

  const dataRows = records.filter(row => row.length > 1 || (row.length === 1 && row[0].trim() !== ''));

  return dataRows.map(values => {
    // Ensure we don't crash on empty trailing rows
    if (values.length === 0) return null;
    
    let termObject: Partial<Term> = {};
    
    if (isNewFormat) {
        // New CSV Format: Betű,Angol kifejezés,Magyar megfelelő,Definíció,Példa,Kategória,Részletes források
        // Indices: 0=Betű, 1=Angol, 2=Magyar, 3=Def, 4=Példa, 5=Kat, 6=Források
        const termEn = values[1]?.trim();
        const termHu = values[2]?.trim();
        
        if (!termEn || !termHu) return null;

        const sourcesRaw = values[6]?.trim() || '';
        // Simple split by comma for sources, filter empty
        const sources = sourcesRaw.split(',').map(s => s.trim()).filter(s => s.length > 0);

        termObject = {
            id: generateId(termEn),
            term_en: termEn,
            term_hu: termHu,
            definition: values[3]?.trim() || '',
            example: values[4]?.trim() || '',
            category: mapCategory(values[5] || ''),
            sources: sources,
            use_score: 0,
            unknown_score: 0,
            search_frequency: 0
        };
    } else {
        // Old Format Fallback
         if (values.length !== headers.length) {
             // Basic error checking for old format
             return null;
         }
         const oldObj = headers.reduce((obj, header, index) => {
            (obj as any)[header] = values[index] || '';
            return obj;
         }, {} as any);
         
         termObject = {
            id: oldObj.id,
            term_en: oldObj.term_en,
            term_hu: oldObj.term_hu,
            definition: oldObj.definition,
            category: oldObj.category as Category,
            example: oldObj.example,
            sources: oldObj.sources ? oldObj.sources.split('|') : [],
            use_score: parseInt(oldObj.use_score, 10) || 0,
            unknown_score: parseInt(oldObj.unknown_score, 10) || 0,
            search_frequency: parseInt(oldObj.search_frequency, 10) || 0,
         };
    }

    return termObject as Term;
  }).filter((term): term is Term => term !== null);
}


export const dictionaryData: Term[] = parseDictionaryCSV(csvData);