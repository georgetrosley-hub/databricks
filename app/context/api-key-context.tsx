"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LLMProvider } from "@/lib/server/llm/types";

const API_KEY_STORAGE_KEY = "databricks-gtm-api-key";
const PROVIDER_STORAGE_KEY = "databricks-gtm-llm-provider";

const DEFAULT_PROVIDER: LLMProvider = "databricks";

interface ApiKeyContextValue {
  apiKey: string;
  provider: LLMProvider;
  hasApiKey: boolean;
  isReady: boolean;
  setApiKey: (apiKey: string) => void;
  setProvider: (provider: LLMProvider) => void;
  clearApiKey: () => void;
  getRequestHeaders: () => { "x-llm-api-key"?: string; "x-llm-provider"?: string };
}

const ApiKeyContext = createContext<ApiKeyContextValue | null>(null);

function normalizeApiKey(apiKey: string) {
  return apiKey.trim();
}

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState("");
  const [provider, setProviderState] = useState<LLMProvider>(DEFAULT_PROVIDER);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedApiKey = window.localStorage.getItem(API_KEY_STORAGE_KEY) ?? "";
    const storedProvider = (window.localStorage.getItem(PROVIDER_STORAGE_KEY) ?? DEFAULT_PROVIDER) as LLMProvider;
    const valid: LLMProvider[] = ["anthropic", "openai", "google", "databricks"];
    setApiKeyState(storedApiKey);
    setProviderState(valid.includes(storedProvider) ? storedProvider : DEFAULT_PROVIDER);
    setIsReady(true);
  }, []);

  const setApiKey = useCallback((nextApiKey: string) => {
    const normalizedKey = normalizeApiKey(nextApiKey);
    setApiKeyState(normalizedKey);
    window.localStorage.setItem(API_KEY_STORAGE_KEY, normalizedKey);
  }, []);

  const setProvider = useCallback((nextProvider: LLMProvider) => {
    setProviderState(nextProvider);
    window.localStorage.setItem(PROVIDER_STORAGE_KEY, nextProvider);
  }, []);

  const clearApiKey = useCallback(() => {
    setApiKeyState("");
    window.localStorage.removeItem(API_KEY_STORAGE_KEY);
  }, []);

  const getRequestHeaders = useCallback(() => {
    if (!apiKey) return {};
    return {
      "x-llm-api-key": apiKey,
      "x-llm-provider": provider,
    };
  }, [apiKey, provider]);

  const value = useMemo(
    () => ({
      apiKey,
      provider,
      hasApiKey: apiKey.length > 0,
      isReady,
      setApiKey,
      setProvider,
      clearApiKey,
      getRequestHeaders,
    }),
    [apiKey, provider, clearApiKey, getRequestHeaders, isReady, setApiKey, setProvider]
  );

  return (
    <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);

  if (!context) {
    throw new Error("useApiKey must be used within ApiKeyProvider");
  }

  return context;
}
