import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt, provider = "openai" } = await req.json();

  const model =
    provider === "gemini"
      ? google("models/gemini-1.5-flash-latest")
      : openai("gpt-4o-mini");
  const result = await streamText({
    model,
    prompt,
  });

  return result.toDataStreamResponse();
}
