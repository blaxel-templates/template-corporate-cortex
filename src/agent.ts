import { blModel, blTools } from "@blaxel/langgraph";
import { AIMessageChunk, HumanMessage } from "@langchain/core/messages";
import { PromptTemplate } from "@langchain/core/prompts";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { getContextTool } from "./functions/context";
import { systemPrompt, userPrompt } from "./prompt";

interface Stream {
  write: (data: string) => void;
  end: () => void;
}

const promptTemplate = PromptTemplate.fromTemplate(userPrompt);

export async function agent(
  thread_id: string,
  input: string,
  stream: Stream
): Promise<void> {
  const prompt = await promptTemplate.format({
    input: input,
  });
  const platformTools = await blTools(["exa"]);
  const streamResponse = await createReactAgent({
    // Load model API dynamically from Blaxel:
    llm: await blModel("gpt-4o"),
    prompt: systemPrompt,
    // Load tools dynamically from Blaxel:
    tools: [...platformTools, getContextTool],
  }).stream(
    {
      messages: [new HumanMessage(prompt)],
    },
    {
      configurable: {
        thread_id: thread_id,
      },
      streamMode: "messages",
    }
  );

  for await (const chunk of streamResponse) {
    try {
      // Parse chunk if it's a string
      if (chunk[0] instanceof AIMessageChunk) {
        if (
          chunk[0].content &&
          (!chunk[0].tool_calls || chunk[0].tool_calls?.length === 0)
        ) {
          stream.write(chunk[0].content.toString());
        }
      }
    } catch (error: any) {
      console.error(`Error processing chunk: ${error.message}`);
      // Don't send raw chunks - just log the error
    }
  }

  stream.end();
}
