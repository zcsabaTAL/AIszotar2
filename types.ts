
export interface Term {
  id: string;
  term_en: string;
  term_hu: string;
  definition: string;
  category: Category;
  example: string;
  sources: string[];
  use_score: number;
  unknown_score: number;
  search_frequency: number;
}

export enum Category {
  Technical = "Technikai fogalmak",
  Models = "Modellek és AI típusok",
  ML = "Gépi tanulás",
  Ethics = "Etika és governance",
  Security = "Biztonság",
  Platforms = "Platformok és eszközök",
  Applications = "Alkalmazások",
}

export interface AIAnalysis {
  abstractDefinition: string;
  hungarianExample: string;
  relevance: string;
  relatedTerms: string[];
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export interface Scenario {
    id: string;
    title: string;
    description: string;
    task: string;
    role: string;
}

export interface ScenarioResult {
    aiResponse: string;
    critique: string;
    score: number;
}

export interface GolfChallenge {
    id: string;
    level: 'Kezdő' | 'Haladó' | 'Mester';
    title: string;
    targetDescription: string; // What the output should look like
    forbiddenWords?: string[]; // Constraints
    par?: number; // Target word count for prompt
}

export interface GolfResult {
    isSuccess: boolean;
    aiOutput: string;
    reasoning: string;
    tokenCountEstimate: number;
}
