import { logger } from "@blaxel/sdk";
import { randomUUID } from "crypto";
import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { getKnowledgebase } from "./src/knowledgebase";

config();

const CHUNK_SIZE = 1000; // Characters per chunk
const CHUNK_OVERLAP = 200; // Overlap between chunks to maintain context

/**
 * List the file names in a given directory.
 * @param dir - The directory to list files from.
 * @returns An array of file names.
 */
const listFiles = async (dir: string): Promise<string[]> => {
    const dirents = await fs.readdir(dir, { withFileTypes: true, recursive: true });
    return dirents
        .filter(dirent => dirent.isFile())
        .map(dirent => {
            // Use relative path instead of absolute path to avoid duplication
            const relativePath = dirent.path ? dirent.path.replace(`${dir}/`, '') : '';
            return path.join(relativePath, dirent.name);
        });
};

/**
 * Splits text into overlapping chunks of approximately equal size
 */
const splitIntoChunks = (text: string): string[] => {
    const chunks: string[] = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        const chunk = text.slice(
            startIndex,
            Math.min(startIndex + CHUNK_SIZE, text.length)
        );
        chunks.push(chunk);
        startIndex += CHUNK_SIZE - CHUNK_OVERLAP;
    }

    return chunks;
};

/**
 * Adds a delay between operations
 * @param ms Milliseconds to wait
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    try {
        const knowledgebase = await getKnowledgebase();
        const companyDocsDir = path.join(__dirname, "company-documents");
        
        // Get all markdown files from the company-documents directory
        const files = await listFiles(companyDocsDir);
        logger.info(`Found ${files.length} files in company-documents directory`);

        // Process each file in the company documents
        for (const fileName of files) {
            const filePath = path.resolve(companyDocsDir, fileName);
            try {
                const content = await fs.readFile(filePath, "utf-8");
                const chunks = splitIntoChunks(content);
                
                logger.info(`Processing ${fileName} - ${chunks.length} chunks`);

                // Process chunks sequentially with delay instead of in parallel
                for (let index = 0; index < chunks.length; index++) {
                    const chunk = chunks[index];
                    await knowledgebase.add(randomUUID(), chunk, {
                        documentName: `company_docs_${fileName}_chunk_${index + 1}`,
                        metadata: {
                            source: fileName,
                            chunkIndex: index + 1,
                            totalChunks: chunks.length
                        }
                    });
                    logger.info(`Added chunk ${index + 1} of ${chunks.length} for ${fileName}`);
                    // Add a 100ms delay between chunks to prevent rate limiting
                    await delay(100);
                }
            } catch (error) {
                logger.warn(`Failed to read file ${fileName}: ${error}`);
                continue;
            }
        }
        logger.info("Company documents successfully stored in knowledge base.");
    } catch (error) {
        logger.error(`Error storing documents in knowledge base: ${error}`);
    }
};

main();