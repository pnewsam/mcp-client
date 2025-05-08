import { OpenAI } from 'openai';

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

let client: OpenAI | null = null;

const getOpenAIClient = () => {
  if (!client) {
    client = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: OPENAI_API_KEY,
    });
  }
  return client;
};

export default getOpenAIClient;
