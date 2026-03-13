import Anthropic from "@anthropic-ai/sdk";
import type { ChatMessage } from "../types";

const DEFAULT_MODEL = "claude-sonnet-4-20250514";

export async function* streamAnthropic(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 4096
): AsyncGenerator<string> {
  const anthropic = new Anthropic({ apiKey });
  const systemMessage = messages.find((m) => m.role === "system")?.content ?? "";
  const chatMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  const stream = anthropic.messages.stream({
    model: DEFAULT_MODEL,
    max_tokens: maxTokens,
    system: systemMessage,
    messages: chatMessages,
  });

  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      yield event.delta.text;
    }
  }
}

export async function completeAnthropic(
  apiKey: string,
  messages: ChatMessage[],
  maxTokens = 512
): Promise<string> {
  const anthropic = new Anthropic({ apiKey });
  const systemMessage = messages.find((m) => m.role === "system")?.content ?? "";
  const chatMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  const response = await anthropic.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: maxTokens,
    system: systemMessage,
    messages: chatMessages,
  });

  const block = response.content.find((c) => c.type === "text");
  return block && block.type === "text" ? block.text : "";
}
