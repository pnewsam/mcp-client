import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

export class MCPClient {
  private MCP_SERVER_URL: URL;
  private connected: boolean;
  private transport: SSEClientTransport;
  private client: Client;

  constructor() {
    this.MCP_SERVER_URL = new URL('http://127.0.0.1:47337/sse');
    this.connected = false;
    this.transport = new SSEClientTransport(this.MCP_SERVER_URL);
    this.client = new Client(
      {
        name: 'mindsdb-mcp-client',
        version: '1.0.0',
      },
      {
        capabilities: {
          prompts: true,
          resources: true,
          tools: true,
        },
      }
    );
  }

  async connect() {
    try {
      await this.client.connect(this.transport);
      this.connected = true;
    } catch (error) {
      console.error('Error connecting client', error);
    }
  }

  async execute(action: string) {
    if (!this.connected) await this.connect();
    return await this.client[action as keyof Client]();
  }

  async listResources() {
    return (await this.execute('listResources'))?.resources || [];
  }

  async listPrompts() {
    return (await this.execute('listPrompts'))?.prompts || [];
  }

  async listTools() {
    return (await this.execute('listTools'))?.tools || [];
  }

  async callTool(tool_call_id: string, tool_call_args: any) {
    return await this.execute('callTool', { tool_call_id, tool_call_args });
  }
}

let mcpClient: MCPClient | null = null  ;

export const getMCPClient = async () => {
  if (!mcpClient) {
    mcpClient = new MCPClient();
    await mcpClient.connect();
  }
  return mcpClient;
};
