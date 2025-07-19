import { useChat } from "ai/react";

export function useAIChat(provider: "openai" | "gemini" = "openai") {
  return useChat({
    api: "/api/stream",
    body: { provider }, // Pass provider to route
  });
}
