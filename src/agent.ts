import { blTools, blModel } from "@blaxel/sdk";
import { HumanMessage }  from "@langchain/core/messages";
import { PromptTemplate } from "@langchain/core/prompts";
import { userPrompt, systemPrompt } from "./prompt";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { getContextTool } from "./functions/context";

interface Stream {
  write: (data: string) => void;
  end: () => void;
}

const promptTemplate = PromptTemplate.fromTemplate(userPrompt);


export async function agent(thread_id: string, input: string, stream: Stream): Promise<void> {
  const prompt = await promptTemplate.format({
    input: input
  });
  const streamResponse = await createReactAgent({
    // Load model API dynamically from Blaxel:
    llm: await blModel("gpt-4o").ToLangChain(),
    prompt: systemPrompt,
    // Load tools dynamically from Blaxel:
    tools: [
      ...await blTools(['exa']).ToLangChain(),
      getContextTool
    ],
  }).stream({
    messages: [new HumanMessage(prompt)],
  }, {
    configurable: {
      thread_id: thread_id
    }
  });

  for await (const chunk of streamResponse) {
    if(chunk.agent) for(const message of chunk.agent.messages) {
      stream.write(message.content)
    }
  }
  stream.end();
}

