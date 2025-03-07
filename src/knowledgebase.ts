import { KnowledgebaseFactory } from "@blaxel/sdk/knowledgebases/factory";

export const getKnowledgebase = async () => {
  return await KnowledgebaseFactory.create({
    type: "qdrant",
    knowledgeBase: {
      spec: {
        collectionName: process.env.QDRANT_COLLECTION_NAME,
        embeddingModel: process.env.EMBEDDING_MODEL,
        embeddingModelType: process.env.EMBEDDING_MODEL_TYPE,
      },
    },
    connection: {
      config: {
        url: process.env.QDRANT_URL,
        collectionName: process.env.QDRANT_COLLECTION_NAME,
      },
      secrets: {
        apiKey: process.env.QDRANT_API_KEY,
      },
    },
  });
};