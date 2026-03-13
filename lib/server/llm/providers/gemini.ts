import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from "../types";

const DEFAULT_MODEL = "gemini-1.5-flash";

function buildPrompt(messages: ChatMessage[]): string {
  return messages
    .map((m) => {
      const prefix = m.role === "system" ? "System: " : m.role === "user" ? "User: " : "Assistant: ";
      return `${prefix}${m.content}`;
    })
    .join("\n\n");
}

export async function* streamGemini(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 4096
): AsyncGenerator<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: DEFAULT_MODEL,
    generationConfig: { maxOutputTokens: maxTokens },
  });

  const prompt = buildPrompt(messages);
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

export async function completeGemini(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 512
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: DEFAULT_MODEL,
    generationConfig: { maxOutputTokens: maxTokens },
  });

  const prompt = buildPrompt(messages);
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text() ?? "";
}
