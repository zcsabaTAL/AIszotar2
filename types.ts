
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
