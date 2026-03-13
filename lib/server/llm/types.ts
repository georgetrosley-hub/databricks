export type LLMProvider = "anthropic" | "openai" | "google" | "databricks";

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  /** For Databricks: optional override of server env base URL */
  databricksBaseUrl?: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const PROVIDER_DISPLAY_NAMES: Record<LLMProvider, string> = {
  anthropic: "Claude (Anthropic)",
  openai: "ChatGPT (OpenAI)",
  google: "Gemini (Google)",
  databricks: "Databricks",
};

export const PROVIDER_PLACEHOLDERS: Record<LLMProvider, string> = {
  anthropic: "sk-ant-...",
  openai: "sk-...",
  google: "AIza...",
  databricks: "dapi...",
};
