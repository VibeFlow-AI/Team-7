import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, provider = "openai" } = await req.json(); // Accept provider: "openai" or "gemini"

  try {
    const model =
      provider === "gemini"
        ? google("models/gemini-1.5-flash-latest")
        : openai("gpt-4o-mini");
    const { text } = await generateText({
      model,
      prompt,
    });
    return NextResponse.json({ text });
  } catch (error) {
    // Log the full error for internal debugging
    console.error("Error in generate API:", error);
    // Return a generic error message to the client
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
