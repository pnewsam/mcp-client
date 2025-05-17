import { getMCPClient } from "@/services/MCPClient";
import { useEffect } from "react";
import { useState } from "react";
import { remapToolForOpenAI } from "@/utils";
import getOpenAIClient from "@/services/OpenAIClient";
import {
  type ChatCompletionTool,
  type ChatCompletionMessageParam,
  type ChatCompletionSystemMessageParam,
  type ChatCompletionUserMessageParam,
  type ChatCompletionAssistantMessageParam,
  type ChatCompletionToolMessageParam,
} from "openai/resources/chat/completions";
import { MCPContext } from "./MCPContext";
import type { HistoryItem } from "./MCPContext";

export const MCPProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      role: "system",
      name: "system",
      content:
        "Use the tools provided to answer the user's question. If you need to use a tool, call it with the tool_call_id and tool_call_args.",
    },
  ]);

  const [resources, setResources] = useState([]);
  const [tools, setTools] = useState([]);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchMcpData = async () => {
      const mcpClient = await getMCPClient();
      setLoading(true);
      const tools = await mcpClient.listTools();
      setTools(tools);
      const resources = await mcpClient.listResources();
      setResources(resources);
      const prompts = await mcpClient.listPrompts();
      setPrompts(prompts);
      setLoading(false);
    };
    fetchMcpData();
  }, []);

  const sendMessage = async (prompt: string) => {
    const openai = getOpenAIClient();
    const openAITools = tools.map(remapToolForOpenAI);
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      tools: openAITools as ChatCompletionTool[],
      tool_choice: "auto",
    });
    const content = response.choices[0].message.content ?? "";
    const tool_calls = response.choices[0].message.tool_calls;

    const assistantMessage: HistoryItem =
      tool_calls && tool_calls.length > 0
        ? {
            role: "assistant",
            content: content,
            tool_calls,
          }
        : { role: "assistant", content: content };

    setHistory([
      ...history,
      { role: "user", content: prompt },
      assistantMessage,
    ]);
  };

  const callTool = async (
    tool_call_id: string,
    tool_call_args: Record<string, unknown>
  ) => {
    const mcpClient = await getMCPClient();
    const result = await mcpClient.callTool(tool_call_id, tool_call_args);

    const openai = getOpenAIClient();
    const messages: ChatCompletionMessageParam[] = history.map((msg) => {
      switch (msg.role) {
        case "system":
          return {
            role: "system",
            content: msg.content,
            ...(msg.name && { name: msg.name }),
          } as ChatCompletionSystemMessageParam;
        case "user":
          return {
            role: "user",
            content: msg.content,
            ...(msg.name && { name: msg.name }),
          } as ChatCompletionUserMessageParam;
        case "assistant":
          return {
            role: "assistant",
            content: msg.content,
            ...(msg.name && { name: msg.name }),
            ...(msg.tool_calls && { tool_calls: msg.tool_calls }),
          } as ChatCompletionAssistantMessageParam;
        case "tool":
          return {
            role: "tool",
            content: msg.content,
            ...(msg.name && { name: msg.name }),
          } as ChatCompletionToolMessageParam;
      }
    });

    messages.push({
      role: "tool",
      name: tool_call_id,
      tool_call_id: tool_call_id,
      content: JSON.stringify(result),
    } as ChatCompletionToolMessageParam);

    const followup = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages,
    });

    const followupContent = followup.choices[0].message.content ?? "";
    const followupToolCalls = followup.choices[0].message.tool_calls;

    const followupMessage: HistoryItem =
      followupToolCalls && followupToolCalls.length > 0
        ? {
            role: "assistant",
            content: followupContent,
            tool_calls: followupToolCalls,
          }
        : { role: "assistant", content: followupContent };

    setHistory([...history, followupMessage]);

    console.log({ result });
  };

  return (
    <MCPContext.Provider
      value={{
        loading,
        resources,
        tools,
        prompts,
        history,
        message,
        setMessage,
        sendMessage,
        callTool,
      }}
    >
      {children}
    </MCPContext.Provider>
  );
};
