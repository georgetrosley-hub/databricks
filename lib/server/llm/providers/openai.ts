import OpenAI from "openai";
import type { ChatMessage } from "../types";

const DEFAULT_MODEL = "gpt-4o";

export async function* streamOpenAI(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 4096
): AsyncGenerator<string> {
  const client = new OpenAI({ apiKey });
  const stream = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    max_tokens: maxTokens,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content ?? "";
    if (text) yield text;
  }
}

export async function completeOpenAI(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 512
): Promise<string> {
  const client = new OpenAI({ apiKey });
  const response = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    max_tokens: maxTokens,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  return response.choices[0]?.message?.content ?? "";
}
