import { createContext, useContext } from 'react';

type Resource = {
  id: string;
  name: string;
  description: string;
};

type Tool = {
  id: string;
  name: string;
  description: string;
};

type Prompt = {
  id: string;
  name: string;
  description: string;
};

type HistoryItem = {
  role: string;
  content: string;
};

type MCPContextType = {
  loading: boolean;
  resources: Resource[];
  tools: Tool[];
  prompts: Prompt[];
  history: HistoryItem[];
};

export const MCPContext = createContext<MCPContextType>({
  loading: true,
  resources: [],
  tools: [],
  prompts: [],
  history: [],
});

export const useMCPContext = () => {
  const context = useContext(MCPContext);
  if (!context) {
    throw new Error('useMCPContext must be used within a MCPProvider');
  }
  return context;
};
