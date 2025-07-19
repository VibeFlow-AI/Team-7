"use client";

import { useAIChat } from "@/hooks/use-ai-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AIChat({
  provider = "openai",
}: {
  provider?: "openai" | "gemini";
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useAIChat(provider);

  return (
    <div className="flex flex-col gap-4">
      <div className="h-64 overflow-y-auto border p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask AI..."
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
