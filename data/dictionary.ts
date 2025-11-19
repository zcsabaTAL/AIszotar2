import { Term, Category } from '../types';

/**
 * Az alkalmazás a szócikkeket a lenti `csvData` string-ből olvassa be.
 * A szótár központi forrása a `data/Konszolidalt_AI_Szotar_2025.csv` fájl.
 * Ha a CSV fájlt módosítod, másold át a tartalmát ide, hogy a változások megjelenjenek az alkalmazásban.
 */
const csvData = `id,term_en,term_hu,definition,category,example,sources,use_score,unknown_score,search_frequency
artificial-intelligence,"AI (Artificial Intelligence)","Mesterséges intelligencia/MI","Olyan számítógépes rendszer képessége, amely emberi kognitív funkciókat tud utánozni, mint a tanulás, problémamegoldás és döntéshozatal.","Technikai fogalmak","ChatGPT, Google Gemini, virtuális asszisztensek","Azure|EU|Magyar hírportálok",0,0,0
active-learning,"Active Learning","Aktív tanulás","Olyan tréning megközelítés, ahol a modell kéri a leginformativabb adatpontok címkézését, csökkentve ezzel a címkézési erőfeszítést.","Gépi tanulás","Orvosi képek annotálása ahol az Al kiválasztja a legfontosabb eseteket","AI Glossary PDF",0,0,0
agi,"AGI (Artificial General Intelligence)","Általános mesterséges intelligencia/Erős Al","Olyan Al, amely képes meghaladni az emberi teljesítményt bármilyen intellektuális feladatban, tudatos gondolatokkal és saját célokkal.","Modellek és AI típusok","Jelenleg csak elméletben létezik: sci-fi filmekben látható robotok","Azure|Al Glossary",0,0,0
ai-agent,"Al Agent","Al ügynök","Olyan szoftver, amely önállóan tervezi meg és hajtja végre a feladatokat eszközök vagy adatforrások használatával, szabályok és emberi felügyelet mellett.","Alkalmazások","Automatizált ügyfégszolgálati rendszer amely több eszközt is használ","AI Glossary|Magyar blog",0,0,0
ai-adoption,"Al Adoption","Al bevezetés","A mesterséges intelligencia üzleti működésbe történő beépítésének folyamata, amely hatással van a folyamatokra, kultúrára és teljesítményre.","Alkalmazások","Vállalat ChatGPT bevezetése az ügyfélszolgálaton","AI Glossary|EU MI-stratégia",0,0,0
algorithm,"Algoritmus","Algoritmus","Strukturált utasításkészlet, amelyet a számítógépek követnek a bemenetek feldolgozására és kimenetek generálására.","Technikai fogalmak","Keresési algoritmus, rendezési algoritmus","AI Glossary|Magyar online",0,0,0
asi,"ASI (Artificial Superintelligence)","Mesterséges szuperintelligencia","Olyan számítógép, amely képes lenne az embert csaknem minden területen túlszárnyalni, beleértve a kreativitást és társadalmi készségeket.","Modellek és AI típusok","Jelenleg elméleti koncepció","Azure",0,0,0
bias,"Bias (Statistical/Algorithmic)","Elfogultság/Torzítás","Szisztematikus hiba, amely igazságtalan eredményeket produkál bizonyos egyének vagy csoportok számára, adatokból vagy modellezési döntésekből eredően.","Etika és governance","Arcfelismerő rendszer, amely kevésbé pontosan ismeri fel bizonyos bőrszínű embereket","Al Glossary|Infografika|Magyar hírportálok",0,0,0
big-data,"Big Data","Nagy adat","Hatalmas mennyiségű strukturált és strukturálatlan adat, amelyet Al rendszerek elemzésére használnak.","Technikai fogalmak","Milliárd felhasználói interakció közösségi médián","Magyar online",0,0,0
chatgpt,"ChatGPT","ChatGPT","Az OpenAl által fejlesztett nagy nyelvi modell alapú konverzációs Al, amely szöveges kérésekre válaszol.","Platformok és eszközök","Beszélgetés, kódírás, szöveggenerálás","Termékek/Platformok Magyar hírportálok (leggyakoribb említés)",0,0,0
chatbot,"Chatbot","Csevegőrobot/Chatbot","Szoftver alkalmazás, amely képes szöveges vagy hangbeszélgetést folytatni emberekkel.","Alkalmazások","Ügyfélszolgálati robot weboldalakon","Azure|Magyar hírportálok",0,0,0
computer-vision,"Computer Vision","Számítógépes látás / Képfelismerés","Gépek olyan képességekkel való felruházása, hogy képeket vagy videókat értelmezzenek és feldolgozzanak.","Gépi tanulás","Önvezető autók forgalomfelismerése, arcfelismerés","Magyar Al szótár|Infografika",0,0,0
context-window,"Context Window","Kontextus ablak/Beszélgetési memória","A maximális információmennyiség (tokenekben mérve), amelyet egy Al modell egyszerre képes látni vagy emlékezni egy beszélgetésben.","Technikai fogalmak","GPT-4: 32k token, Claude 3.5: 200k token","Infografika|Nemzetközi források|Magyar elemzés",0,0,0
dall-e,"DALL-E","DALL-E","Az OpenAl által fejlesztett Al képgeneráló rendszer, amely szöveges leírásból hoz létre képeket.","Platformok és eszközök","Kép generálása 'egy macska az űrben' promptból","Termékek/Platformok Magyar hírportálok",0,0,0
dataset,"Dataset","Adatkészlet/Adathalmaz","Strukturált adatgyűjtemény, amelyet Al modellek tanításához és teszteléséhez használnak.","Technikai fogalmak","ImageNet (14 millió képből álló adatkészlet)","Magyar Al szótár",0,0,0
deep-learning,"Deep Learning","Mélytanulás","A gépi tanulás fejlett típusa, amely neurális hálózatokat használ komplex mintázatok felismerésére. Az emberi agy szerkezete által ihletett.","Gépi tanulás","Képfelismerés, beszédfelismerés, természetes nyelvi feldolgozás","Infografika|Azure|Magyar hírportálok",0,0,0
drift,"Drift (Data/Concept)","Sodródás/Modell-elcsúszás","A bemeneti adatok vagy valós kapcsolatok változása idővel, ami rontja a modell teljesítményét.","Gépi tanulás","COVID utáni vásárlási minták megváltoztak, régi modellek pontatlanok lettek","Al Glossary",0,0,0
embedding,"Embedding","Beágyazás/Vektoros ábrázolás","Szavak, mondatok vagy más adatok numerikus reprezentációja, amely megragadja azok jelentését és szemantikai kapcsolatait.","Technikai fogalmak","A 'király' és 'királyné' szavak hasonló vektorokkal reprezentálva","Infografika|Al Glossary",0,0,0
explainability,"Explainability","Magyarázhatóság","Az a mérték, ameddig egy Al rendszer belső működése és döntéshozatali folyamata megérthető az emberek számára.","Etika és governance","LIME vagy SHAP eszközök, amelyek megmutatják, miért hozott egy Al egy döntést","Al Glossary|EU MI-stratégia",0,0,0
fine-tuning,"Fine-tuning","Finomhangolás/Modell specializáció","Egy általános alapmodell további tanítása kisebb, célzott adatkészleten, hogy specifikus feladatra vagy területre specializálódjon.","Gépi tanulás","GPT-4 finomhangolása orvosi dokumentumok elemzésére","Infografika|Al Glossary|Magyar blog",0,0,0
foundational-model,"Foundational Model","Alapmodell/Foundációs modell","Nagy, előre betanított Al modell (pl. GPT-4, Claude 3.5, Llama 3), amely erőteljes alapként szolgál számos különböző feladathoz.","Modellek és AI típusok","GPT-4, Claude 3.5, Llama 3","Infografika|Al Glossary",0,0,0
gen-ai,"GenAl (Generative Al)","Generatív Al/Generatív mesterséges intelligencia","Al rendszerek, amelyek teljesen új tartalmat hoznak létre - szöveget, képeket, zenét, videót vagy kódot. Nagy mennyiségű létező adatból tanulnak.","Modellek és AI típusok","ChatGPT (szöveg), DALL-E (kép), Suno (zene), Runway (videó)","Infografika|EU GenAl4EU|Magyar hírportálok",0,0,0
gemini,"Gemini (Google)","Gemini","A Google multimodális nagy nyelvi modellje, amely képes szöveget, képet, hangot és videót is feldolgozni.","Platformok és eszközök","Google Gemini chatbot","Termékek/Platformok Magyar hírportálok",0,0,0
machine-learning,"Gépi tanulás (Machine Learning/ML)","Gépi tanulás","Az a folyamat, amelyet számítógépes rendszerek használnak Al eléréséhez. Algoritmusokkal azonosít mintákat adatokban, amelyekkel modellt készít és előrejelzéseket végez.","Gépi tanulás","Netflix ajánlórendszere, banki csalásfelismerés","Infografika|Azure|Magyar hírportálok",0,0,0
gpt,"GPT (Generative Pre-trained Transformer)","GPT/Generatív előre betanított transzformátor","Az OpenAl által fejlesztett nagy nyelvi modell architektúra, amely a Transformer modellre épül.","Modellek és AI típusok","GPT-3.5, GPT-4, GPT-4o","Magyar hírportálok",0,0,0
hallucination,"Hallucination","Hallucináció / Al kitalálás","Amikor az Al magabiztosan generál információt, amely ténylegesen helytelen vagy teljesen kitalált. Az Al megbízhatóság kritikus kihívása.","Biztonság","ChatGPT hamis tudományos hivatkozásokat gyárt","Infografika|Al Glossary|Magyar hírportálok",0,0,0
jailbreak,"Jailbreak","Védelem megkerülés/Jailbreak","Olyan támadás, amely arra kényszeríti a modellt, hogy megkerülje a biztonsági óvintézkedéseket és szabálysértő vagy veszélyes kimeneteket produkáljon.","Biztonság","Prompt injection technikák, amelyek megkerülik a content filtereket","Al Glossary",0,0,0
llm,"LLM (Large Language Model)","Nagy nyelvi modell","Hatalmas neurális hálózatok, amelyek szövegen tanulnak, hogy emberi nyelvhez hasonló tartalmat értsenek és generáljanak. A ChatGPT és Gemini alapját képezik.","Modellek és AI típusok","GPT-4, Claude 3.5, Llama 3, Gemini","Infografika|Magyar hírportálok (leggyakoribb)",0,0,0
midjourney,"Midjourney","Midjourney","Magas minőségű Al képgeneráló platform, amely Discord-on keresztül működik és művészi stílusú képeket hoz létre.","Platformok és eszközök","Digitális artwork, illusztrációk generálása","Termékek/Platformok Magyar hírportálok",0,0,0
mi,"MI (Mesterséges Intelligencia)","Mesterséges Intelligencia","Az Al magyar rövidítése. Kevésbé elterjedt a magyar interneten az 'Al' rövidítésnél, kereshetőségi problémák miatt ('mi' névmás).","Technikai fogalmak","EU hivatalos dokumentumokban gyakoribb","EU MI-stratégia|Telex.hu használja",0,0,0
mrm,"Model Risk Management (MRM)","Modell-kockázat menedzsment","Szabályozások és kontrollok a modell fejlesztés, validálás, telepítés és monitorozás irányítására az operációs és szabályozási kockázatok kezelése érdekében.","Etika és governance","Bankok Al modell validációs keretrendszere","Al Glossary",0,0,0
multimodal-ai,"Multimodal Al","Multimodális Al/Több formátumú feldolgozás","Olyan Al, amely több adattípust képes feldolgozni és generálni - szöveget, képeket, hangot és videót. Zökkenőmentesen kombinálja ezeket a bemeneteket és kimeneteket.","Modellek és AI típusok","GPT-4V (Vision), Gemini, Claude 3","Infografika|Magyar hírportálok",0,0,0
neural-network,"Neural Network","Neurális hálózat","Az emberi agy szerkezete által ihletett algoritmus-hálózat, amely beágyazott neurális csomópontokból áll.","Technikai fogalmak","Convolutional Neural Network (CNN) képfelismeréshez","Azure|Al Glossary",0,0,0
nlp,"NLP (Natural Language Processing)","Természetes nyelvi feldolgozás","Emberi nyelv feldolgozása és megértése számítógépek által. Magában foglalja a szöveg- és beszédelemzést.","Alkalmazások","Google Translate, sentiment analysis, chatbotok","Infografika|Magyar Al szótár",0,0,0
prompt,"Prompt","Prompt/Utasítás / Kérés","Utasítás vagy kérdés, amelyet az Al-nak adunk. Az elsődleges módszer a modell kimenetének irányítására.","Platformok és eszközök","'Írj egy motivációs levelet magyarul marketinges pozícióra'","Infografika|Magyar hírportálok (nagyon gyakori)",0,0,0
prompt-engineering,"Prompt Engineering","Prompt tervezés/Al utasítás tervezés","Világos és hatékony utasítások vagy promptok készítésének képessége, hogy a legjobb eredményeket kapjuk az Al-tól.","Platformok és eszközök","Chain-of-thought prompting, few-shot learning promptok","Infografika|Magyar Al szótár",0,0,0
prompt-injection,"Prompt Injection","Prompt befecskendezés","Olyan támadás, amikor manipulált bemenetek eltérítik a modell működését vagy eszközhasználatát.","Biztonság","Rejtett utasítások egy PDF-ben, amelyek befolyásolják az Al válaszát","Al Glossary",0,0,0
rag,"RAG (Retrieval Augmented Generation)","Lekérdezéssel bővített generálás/Adatlekéréssel kibővített generálás","Olyan technika, amely egy LLM-et külső információforrással (pl. keresőmotorral vagy adatbázissal) kombinál. Ez lehetővé teszi, hogy a modell aktuális tényekhez férjen hozzá és csökkenti a hallucinációkat.","Technikai fogalmak","Chatbot, amely válaszadás előtt vállalati dokumentumokban keres","Infografika|Magyar blog|Microsoft Azure",0,0,0
responsible-ai,"Responsible Al","Felelős Al","Az Al rendszerek etikus, átlátható, fair és elszámoltatható tervezésének, fejlesztésének és telepítésének gyakorlata.","Etika és governance","Microsoft Responsible Al Standard","Al Glossary|EU MI-stratégia",0,0,0
rlhf,"RLHF (Reinforcement Learning from Human Feedback)","Erősítéses tanulás emberi visszajelzéssel","Gépi tanulási technika, ahol emberi visszajelzések irányítják a tanulási folyamatot, így a modell kimenete összhangban van az emberi értékekkel.","Gépi tanulás","ChatGPT finomhangolása emberi értékelők visszajelzései alapján","Magyar Al szótár",0,0,0
stable-diffusion,"Stable Diffusion","Stable Diffusion","Nyílt forráskódú Al képgeneráló rendszer, amely lehetővé teszi a teljes kontroll megtartását a generálási folyamat felett.","Platformok és eszközök","Lokálisan futtatható képgenerálás egyedi modellek használatával","Termékek/Platformok Magyar hírportálok",0,0,0
synthetic-data,"Synthetic Data","Szintetikus adatok/Mesterségesen generált adatok","Mesterségesen előállított adatok, amelyeket tesztelésre, modelltréningre vagy adatvédelmi okokból használnak.","Technikai fogalmak","Virtuális baleset-szimulációk autógyártók számára","Magyar Al szótár",0,0,0
narrow-ai,"Szűk Al (Narrow Al)","Szűk mesterséges intelligencia / Gyenge Al","Olyan számítógépes rendszer, amely egy szűken meghatározott feladatot képes az embernél hatékonyabban elvégezni. Ez a legmagasabb Al-szint, amelyet az emberiség máig elért.","Modellek és AI típusok","Sakk program, spam filter, ajánlórendszerek","Azure",0,0,0
token,"Token","Token/Szövegegység","Szöveg alapegysége - például szó vagy szórész, amelyet az Al modell feldolgoz. A kontextus ablak és az API költségek is tokenekben mérhetők.","Technikai fogalmak","'Mesterséges intelligencia' - 2-3 token; 1 token ~ 0.75 szó angolul","Infografika|Al Glossary",0,0,0
transformer,"Transformer","Transzformátor/Transformer modell","Neurális hálózat architektúra, amely az 'attention' mechanizmust használja. A modern LLM-ek alapja (GPT, BERT, T5).","Technikai fogalmak","Az 'Attention is All You Need' paper alapján működik","Al Glossary",0,0,0
vector-database,"Vector Database","Vektor adatbázis","Olyan adatbázis, amely vektoros reprezentációkat (embedding-eket) tárol és lehetővé teszi a szemantikai keresést.","Technikai fogalmak","Pinecone, Weaviate, Chroma - RAG rendszerekhez","Al Glossary",0,0,0
zero-shot-learning,"Zero-Shot Learning","Azonnali általánosítás/Nullpontos tanulás","Az Al azon képessége, hogy olyan feladatot hajtson végre, amelyre explicit módon nem tanították. Hatalmas tudását új problémákra tudja általánosítani, kizárólag a prompt alapján.","Gépi tanulás","GPT-4 képes új nyelven fordítani anélkül, hogy azon a nyelven tanították volna","Infografika|Al Glossary",0,0,0`;


/**
 * Robusztus CSV-feldolgozó, amely kezeli az idézőjeles, többsoros mezőket is.
 * @param csv A feldolgozandó CSV tartalom stringként.
 * @returns A szótárkifejezések tömbje (Term[]).
 */
function parseDictionaryCSV(csv: string): Term[] {
  const text = csv.trim();
  const records = [];
  let currentRecord: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = i + 1 < text.length ? text[i + 1] : null;

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

  const dataRows = records.filter(row => row.length > 1 || (row.length === 1 && row[0].trim() !== ''));

  return dataRows.map(values => {
    if (values.length !== headers.length) {
      console.warn(`CSV Parse Warning: Row has ${values.length} fields, but header has ${headers.length}.`, { row: values, headers });
      return null;
    }

    const termObject = headers.reduce((obj, header, index) => {
      (obj as any)[header] = values[index] || '';
      return obj;
    }, {} as { [key: string]: string });

    if (!termObject.id || !termObject.term_en || !termObject.term_hu) {
      console.warn('Skipping row with missing required fields:', termObject);
      return null;
    }

    return {
      id: termObject.id,
      term_en: termObject.term_en,
      term_hu: termObject.term_hu,
      definition: termObject.definition,
      category: termObject.category as Category,
      example: termObject.example,
      sources: termObject.sources ? termObject.sources.split('|') : [],
      use_score: parseInt(termObject.use_score, 10) || 0,
      unknown_score: parseInt(termObject.unknown_score, 10) || 0,
      search_frequency: parseInt(termObject.search_frequency, 10) || 0,
    };
  }).filter((term): term is Term => term !== null);
}


export const dictionaryData: Term[] = parseDictionaryCSV(csvData);