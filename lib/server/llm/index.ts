import type { LLMConfig, ChatMessage, LLMProvider } from "./types";
import * as anthropic from "./providers/anthropic";
import * as openai from "./providers/openai";
import * as databricks from "./providers/databricks";
import * as gemini from "./providers/gemini";

const MISSING_KEY = "API key missing. Add it from the API Key button in the top right.";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Failed to get response from the model.";
}

function getErrorStatus(error: unknown): number {
  const msg = getErrorMessage(error).toLowerCase();
  if (
    msg.includes("api key") ||
    msg.includes("authentication") ||
    msg.includes("unauthorized") ||
    msg.includes("invalid") ||
    msg.includes("401")
  ) {
    return 400;
  }
  return 500;
}

export { getErrorMessage as getLLMErrorMessage, getErrorStatus as getLLMErrorStatus };

export async function* streamCompletion(
  config: LLMConfig,
  messages: ChatMessage[],
  maxTokens = 4096
): AsyncGenerator<string> {
  if (!config.apiKey?.trim()) throw new Error(MISSING_KEY);

  switch (config.provider) {
    case "anthropic":
      yield* anthropic.streamAnthropic(config.apiKey, messages, maxTokens);
      break;
    case "openai":
      yield* openai.streamOpenAI(config.apiKey, messages, maxTokens);
      break;
    case "google":
      yield* gemini.streamGemini(config.apiKey, messages, maxTokens);
      break;
    case "databricks":
      yield* databricks.streamDatabricks(config.apiKey, messages, maxTokens);
      break;
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

export async function getCompletion(
  config: LLMConfig,
  messages: ChatMessage[],
  maxTokens = 512
): Promise<string> {
  if (!config.apiKey?.trim()) throw new Error(MISSING_KEY);

  switch (config.provider) {
    case "anthropic":
      return anthropic.completeAnthropic(config.apiKey, messages, maxTokens);
    case "openai":
      return openai.completeOpenAI(config.apiKey, messages, maxTokens);
    case "google":
      return gemini.completeGemini(config.apiKey, messages, maxTokens);
    case "databricks":
      return databricks.completeDatabricks(config.apiKey, messages, maxTokens);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

export function parseLLMConfig(req: Request): LLMConfig {
  const apiKey =
    req.headers.get("x-llm-api-key")?.trim() ??
    req.headers.get("x-databricks-api-key")?.trim() ??
    "";

  const provider = (req.headers.get("x-llm-provider")?.trim() ?? "databricks") as LLMProvider;
  const valid: LLMProvider[] = ["anthropic", "openai", "google", "databricks"];
  const resolvedProvider = valid.includes(provider) ? provider : "databricks";

  return {
    provider: resolvedProvider,
    apiKey,
  };
}
