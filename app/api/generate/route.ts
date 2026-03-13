import { NextRequest } from "next/server";
import { buildAccountContext } from "@/lib/prompts/base";
import { CONTENT_PROMPTS } from "@/lib/prompts/content";
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
    const { type, account, competitors, context } = await req.json();

    const contentPrompt = CONTENT_PROMPTS[type] ?? CONTENT_PROMPTS.strategy_assessment;
    const accountContext = buildAccountContext(account, competitors);

    const userMessage = context
      ? `${accountContext}\n\n## Additional Context\n${context}`
      : accountContext;

    const messages: ChatMessage[] = [
      { role: "system", content: contentPrompt },
      { role: "user", content: userMessage },
    ];

    const stream = streamCompletion(config, messages, 4096);

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
    console.error("Generate API error:", error);
    return new Response(
      JSON.stringify({ error: getLLMErrorMessage(error) }),
      {
        status: getLLMErrorStatus(error),
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
