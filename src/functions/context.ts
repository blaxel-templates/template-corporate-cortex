import { logger } from "@blaxel/sdk";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getKnowledgebase } from "../knowledgebase";

const getContextSchema = z.object({
  query: z.string(),
});
/**
 * Get the context from the knowledgebase.
 * @param query - The query to get the context from.
 */

export const getContextTool = tool(
  async (args: z.infer<typeof getContextSchema>) => getContext(args),
  {
    name: "getContext",
    description: "Get the context from the knowledgebase.",
    schema: getContextSchema,
  }
);

async function getContext({ query }: { query: string }): Promise<string> {
  // Add people-related search terms if the query doesn't already include them
  let enhancedQuery = query;
  if (
    !query.toLowerCase().includes("contact") &&
    !query.toLowerCase().includes("person") &&
    !query.toLowerCase().includes("team") &&
    !query.toLowerCase().includes("manager") &&
    !query.toLowerCase().includes("director") &&
    !query.toLowerCase().includes("lead")
  ) {
    // Append a search for relevant people/contacts
    enhancedQuery = `${query} contact person team responsible`;
  }

  const knowledgebase = await getKnowledgebase();
  try {
    // Use the content of the latest message to search for relevant memories.
    const documents = await knowledgebase.search(enhancedQuery, {
      limit: 10, // Increased to get more information including people
      scoreThreshold: 0.6, // Slightly lowered threshold to get more diverse results
    });

    if (documents.length > 0) {
      logger.info(`Retrieved ${documents.length} documents from knowledgebase`);

      // Sort documents by similarity score (highest first)
      const sortedDocs = documents.sort(
        (a: { similarity: number }, b: { similarity: number }) =>
          b.similarity - a.similarity
      );

      // Group documents by type/category if metadata is available
      const groupedDocs: Record<
        string,
        Array<{ value: string; similarity: number; metadata?: any }>
      > = {};

      sortedDocs.forEach(
        (doc: { value: string; similarity: number; metadata?: any }) => {
          // If document has category metadata, use it for grouping
          const category = doc.metadata?.category || "General Information";
          if (!groupedDocs[category]) {
            groupedDocs[category] = [];
          }
          groupedDocs[category].push(doc);
        }
      );

      // Format the context with categories and better structure
      let context = "## Relevant Information\n\n";

      // Add each category of documents
      Object.entries(groupedDocs).forEach(([category, docs]) => {
        context += `### ${category}\n`;

        // Add each document in the category
        docs.forEach((doc) => {
          // Extract and format the document content
          let docContent = doc.value.trim();

          // Allow longer content to provide more detailed information
          if (docContent.length > 400) {
            docContent = docContent.substring(0, 397) + "...";
          }

          // Add source information if available
          const source = doc.metadata?.source
            ? ` (Source: ${doc.metadata.source})`
            : "";

          // Add metadata information if available
          let metadataInfo = "";
          if (doc.metadata) {
            // Include author if available
            if (doc.metadata.author) {
              metadataInfo += ` | Author: ${doc.metadata.author}`;
            }
            // Include date if available
            if (doc.metadata.date) {
              metadataInfo += ` | Date: ${doc.metadata.date}`;
            }
            // Include department if available
            if (doc.metadata.department) {
              metadataInfo += ` | Department: ${doc.metadata.department}`;
            }
            // Include contact information if available
            if (doc.metadata.contact) {
              metadataInfo += ` | Contact: ${doc.metadata.contact}`;
            }
            // Include role/title if available
            if (doc.metadata.role || doc.metadata.title) {
              metadataInfo += ` | Role: ${
                doc.metadata.role || doc.metadata.title
              }`;
            }
            // Include email if available
            if (doc.metadata.email) {
              metadataInfo += ` | Email: ${doc.metadata.email}`;
            }
            // Include phone/extension if available
            if (doc.metadata.phone || doc.metadata.extension) {
              metadataInfo += ` | Phone: ${
                doc.metadata.phone || doc.metadata.extension
              }`;
            }
          }

          // Add the formatted document to the context
          context += `- ${docContent}${source}${metadataInfo}\n\n`;
        });
      });

      // Add a special section for people/contacts if they exist
      const peopleCategory = "People and Contacts";
      if (groupedDocs[peopleCategory]) {
        context += `### ${peopleCategory}\n`;
        groupedDocs[peopleCategory].forEach((doc) => {
          context += `- ${doc.value.trim()}\n\n`;
        });
      }

      return context;
    } else {
      logger.info("No relevant documents found in knowledgebase");
      return "No specific information found in our knowledge base for this query.";
    }
  } catch (error) {
    logger.error(`Error getting context: ${error}`);
    return "Error retrieving information from knowledge base.";
  }
}
