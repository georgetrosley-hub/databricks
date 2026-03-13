import OpenAI from "openai";
import type { ChatMessage } from "../types";

const DEFAULT_MODEL =
  process.env.DATABRICKS_MODEL || "databricks-meta-llama-3-1-70b-instruct";

function getBaseUrl(): string {
  const url = process.env.DATABRICKS_OPENAI_BASE_URL;
  if (!url) {
    throw new Error(
      "DATABRICKS_OPENAI_BASE_URL not set. Set it for Databricks, e.g. https://<workspace>.cloud.databricks.com/serving-endpoints/<endpoint>/openai/v1"
    );
  }
  return url;
}

export async function* streamDatabricks(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 4096
): AsyncGenerator<string> {
  const client = new OpenAI({
    apiKey,
    baseURL: getBaseUrl(),
  });

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

export async function completeDatabricks(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 512
): Promise<string> {
  const client = new OpenAI({
    apiKey,
    baseURL: getBaseUrl(),
  });

  const response = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    max_tokens: maxTokens,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  return response.choices[0]?.message?.content ?? "";
}
