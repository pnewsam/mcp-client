import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMCPContext } from "@/contexts/MCPContext";
import type { HistoryItem } from "@/contexts/MCPContext";
import { type ChatCompletionMessageToolCall } from "openai/resources/chat/completions";

export default function Chat() {
  const { sendMessage, message, setMessage, history, callTool } =
    useMCPContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSendMessage = () => {
    sendMessage(message);
  };

  return (
    <div className="border bg-zinc-100 flex flex-col justify-start p-4">
      <div className="bg-white border border-solid border-zinc-300 rounded-md p-2">
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <Input value={message} onChange={onChange} />
          <Button disabled={!message} onClick={onSendMessage}>
            Send
          </Button>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {history.map((message: HistoryItem, index: number) => (
            <div key={index}>
              {message.role === "user" ? (
                <div className="text-sm text-zinc-800">
                  <span className="font-bold">User:</span>
                  <p>{message.content}</p>
                </div>
              ) : (
                <div className="text-sm text-zinc-800">
                  <span className="font-bold">Assistant:</span>
                  <p>{message.content}</p>
                  {message.tool_calls?.map(
                    (
                      tool_call: ChatCompletionMessageToolCall,
                      index: number
                    ) => (
                      <div key={index}>
                        <span className="font-bold">Tool Call:</span>
                        <p>{tool_call.function.name}</p>
                        <Button
                          onClick={() =>
                            callTool(
                              tool_call.id,
                              JSON.parse(tool_call.function.arguments)
                            )
                          }
                        >
                          Call Tool
                        </Button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
