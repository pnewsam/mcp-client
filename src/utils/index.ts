export const remapToolForOpenAI = (tool: any) => ({
  type: 'function',
  function: {
    name: tool.name, // must be unique
    description: tool.description,
    parameters: tool.parameters, // should be a JSON Schema
  },
});
