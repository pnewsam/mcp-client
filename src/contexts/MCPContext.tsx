import { createContext, useContext } from "react";
import { type ChatCompletionMessageToolCall } from "openai/resources/chat/completions";

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

export type HistoryItem = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
  tool_calls?: ChatCompletionMessageToolCall[];
};

type MCPContextType = {
  loading: boolean;
  resources: Resource[];
  tools: Tool[];
  prompts: Prompt[];
  history: HistoryItem[];
  message: string;
  mcpServerUrl: string;
  setMcpServerUrl: (mcpServerUrl: string) => void;
  setMessage: (message: string) => void;
  sendMessage: (prompt: string) => Promise<void>;
  callTool: (
    tool_call_id: string,
    tool_call_args: Record<string, unknown>
  ) => Promise<void>;
};

export const MCPContext = createContext<MCPContextType>({
  loading: true,
  resources: [],
  tools: [],
  prompts: [],
  history: [],
  message: "",
  mcpServerUrl: "",
  setMcpServerUrl: () => {},
  setMessage: () => {},
  sendMessage: async () => {},
  callTool: async () => {},
});

export const useMCPContext = () => {
  const context = useContext(MCPContext);
  if (!context) {
    throw new Error("useMCPContext must be used within a MCPProvider");
  }
  return context;
};
