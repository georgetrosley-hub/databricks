import { NextRequest } from "next/server";
import { CHAT_SYSTEM_PROMPT, buildAccountContext } from "@/lib/prompts/base";
import {
  streamCompletion,
  parseLLMConfig,
  getLLMErrorMessage,
  getLLMErrorStatus,
} from "@/lib/server/llm";
import type { ChatMessage } from "@/lib/server/llm/types";

export async function POST(req: NextRequest) {
  try {
    const config = parseLLMConfig(req);
    const { messages, account, competitors, section } = await req.json();

    const accountContext = account
      ? buildAccountContext(account, competitors)
      : "";

    const systemPrompt = `${CHAT_SYSTEM_PROMPT}

${accountContext ? `\n## Current Account Context\n${accountContext}` : ""}
${section ? `\nThe seller is currently viewing the "${section}" section of the platform.` : ""}`;

    const messagesWithSystem: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
        content: m.content,
      })),
    ];

    const stream = streamCompletion(config, messagesWithSystem, 4096);

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of stream) {
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: getLLMErrorMessage(error) }),
      {
        status: getLLMErrorStatus(error),
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
