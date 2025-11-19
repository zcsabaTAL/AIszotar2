
import React from 'react';
import { TokenIllustration } from './illustrations/TokenIllustration';
import { NeuralNetworkIllustration } from './illustrations/NeuralNetworkIllustration';
import { LLMPredictionIllustration } from './illustrations/LLMPredictionIllustration';
import { ContextWindowIllustration } from './illustrations/ContextWindowIllustration';
import { MLRegressionIllustration } from './illustrations/MLRegressionIllustration';
import { DeepLearningIllustration } from './illustrations/DeepLearningIllustration';

// Map dictionary IDs to React Components
const illustrationMap: Record<string, { title: string, component: React.FC }> = {
  // 1. Token
  'token': {
    title: 'Interaktív Tokenizáló',
    component: TokenIllustration
  },
  // 2. LLM
  'llm': {
    title: 'Hogyan generál szöveget az LLM?',
    component: LLMPredictionIllustration
  },
  // 3. Context Window
  'context-window': {
      title: 'A "Kontextus Ablak" működése',
      component: ContextWindowIllustration
  },
  // 4. Neural Network
  'neural-network': {
    title: 'Neurális Hálózat Szimuláció',
    component: NeuralNetworkIllustration
  },
  // 5. Deep Learning
  'deep-learning': {
    title: 'Mélytanulás Rétegei',
    component: DeepLearningIllustration
  },
  // 6. Machine Learning
  'machine-learning': {
      title: 'Gépi Tanulás: Illesztés (Fitting)',
      component: MLRegressionIllustration
  }
};

export const getIllustration = (termId: string) => {
  return illustrationMap[termId] || null;
};

export const hasIllustration = (termId: string): boolean => {
  return !!illustrationMap[termId];
};
