import { getDefaultThread, wrapAgent } from "@blaxel/sdk";
import { HumanMessage } from "@langchain/core/messages";
import { PromptTemplate } from "@langchain/core/prompts";
import { CompiledGraph } from "@langchain/langgraph";
import { FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { userPrompt, systemPrompt } from "./prompt";

type InputType = {
  input?: string;
  inputs?: string;
};

type AgentType = {
  agent: CompiledGraph<any, any, any, any, any, any>;
};

const promptTemplate = PromptTemplate.fromTemplate(userPrompt);

export const req = async (request: FastifyRequest, args: AgentType) => {
  const { agent } = args;
  const body = (await request.body) as InputType;
  const thread_id = getDefaultThread(request) || uuidv4();
  const input = body.input || body.inputs || "";
  
  // Format the prompt with just the user's input
  const formattedPrompt = await promptTemplate.format({ 
    input: input,
  });
  
  const responses: any[] = [];

  const stream = await agent.stream(
    { messages: [new HumanMessage(formattedPrompt)] },
    { configurable: { thread_id } }
  );

  for await (const chunk of stream) {
    responses.push(chunk);
  }
  const content = responses[responses.length - 1];
  return content.agent.messages[content.agent.messages.length - 1].content;
};

export const agent = wrapAgent(req, {
  agent: {
    metadata: {
      name: "template-corporate-cortex",
    },
    spec: {
      model: "gpt-4o",
      description: "You are a helpful assistant that can answer questions and help with tasks.",
      prompt: systemPrompt,
      runtime: {
        envs: [
          {
            name: "QDRANT_URL",
            value: "$secrets.QDRANT_URL",
          },
          {
            name: "QDRANT_API_KEY",
            value: "$secrets.QDRANT_API_KEY",
          },
          {
            name: "QDRANT_COLLECTION_NAME",
            value: process.env.QDRANT_COLLECTION_NAME,
          },
          {
            name: "EMBEDDING_MODEL",
            value: process.env.EMBEDDING_MODEL,
          },
          {
            name: "EMBEDDING_MODEL_TYPE",
            value: process.env.EMBEDDING_MODEL_TYPE,
          },
        ],
      },
    },
  },
  remoteFunctions: ["exa"]
});
