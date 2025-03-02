# 🏢 Corporate Cortex Agent

This repository is a template implementation of a Corporate Knowledge Agent built using the [Blaxel SDK](https://blaxel.ai) and [LangChain](https://langchain.com). The agent serves as an expert AI assistant deeply embedded within your organization, providing accurate, contextually relevant, and actionable responses to internal inquiries regarding IT services, resources, and processes by leveraging a comprehensive knowledge base.

<div align="center">
  <video src="assets/demo.mp4" width="400" />
</div>


## 🚀 Prerequisites

- **Node.js:** v20 or later
- **Blaxel CLI:** Install globally:
  ```bash
  curl -fsSL https://raw.githubusercontent.com/beamlit/toolkit/main/install.sh | BINDIR=$HOME/.local/bin sh
  ```
- **Blaxel login:** Login to your workspace:
  ```bash
  bl login YOUR-WORKSPACE
  ```

## ⚙️ Installation

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/beamlit/template-corporate-cortex.git
   cd template-corporate-cortex
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env-sample env
   ```
   Update the following in your `.env`:
   - Qdrant configuration:
     - Sign up for a free account at [Qdrant Cloud](https://cloud.qdrant.io/)
     - Create a new cluster and copy your `QDRANT_URL`
     - Generate an API key from your cluster settings for `QDRANT_API_KEY`
     - Choose a name for your collection (`QDRANT_COLLECTION_NAME`)
   - OpenAI API key:
     - Sign up at [OpenAI Platform](https://platform.openai.com/)
     - Navigate to API keys section
     - Create a new API key for `OPENAI_API_KEY`
   - Exa API key:
     - Visit Exa.ai
     - Create an account and subscribe to a plan
     - Generate an API key from your dashboard for EXA_API_KEY
   - Embedding model configuration:
     - Set `EMBEDDING_MODEL` to your preferred embedding model (e.g., "text-embedding-3-small")
     - Set `EMBEDDING_MODEL_TYPE` to the appropriate type (e.g., "openai")

3. Register your Blaxel components:
   ```bash
   bl apply -R -f .blaxel
   ```

## 📚 Knowledge Base Setup

The agent leverages a Qdrant vector database to store and retrieve your organization's knowledge. To populate the knowledge base:

1. Place your organizational documents in the `company-documents` directory. The template includes sample documents covering:
   - IT Service Architecture
   - Contact Information
   - Roles and Responsibilities
   - Processes and Operating Model
   - Enterprise Architecture Guidelines
   - Organizational Structure

2. Run the knowledge base population script:
   ```bash
   npm run fill-knowledge-base
   ```

This script will:
- Read all documents from the `company-documents` directory
- Split them into manageable chunks with appropriate overlap
- Embed these chunks using your configured embedding model
- Store them in your Qdrant collection with relevant metadata

## ✨ Features

- 🤖 Enterprise knowledge management with advanced AI models
- 🗄️ Integration with Qdrant vector database for knowledge storage
- 📚 Contextual retrieval of relevant information from your knowledge base
- 🔍 Intelligent categorization and organization of retrieved documents
- 📋 Comprehensive understanding of your organization's:
  - IT Service Architecture
  - Ownership and Contact Information
  - Roles and Responsibilities
  - Established Processes
  - Operating Model
  - Enterprise Architecture Design Guidelines

## 💻 Development

Start the development server with hot reloading:

```bash
bl serve --hotreload
```

To test the agent, open a new terminal and run:

```bash
bl chat template-corporate-cortex --local
```

This will open an interactive chat session with your local agent where you can test inquiries about your organization's IT services and processes.

## 🗣️ Example Inquiries

The repository includes a comprehensive set of example inquiries in `company-documents/example-inquiries.md`. Here are some examples to get started:

- ```
  Can we buy tool XY for our department?
  ```

- ```
  What is the process for requesting additional resources for project Z?
  ```

- ```
  Who is responsible for managing our cloud infrastructure?
  ```

- ```
  What is our incident management process?
  ```

- ```
  How do we request changes to our enterprise architecture?
  ```

Each inquiry will trigger the agent to search your knowledge base for relevant information, organize it by category, and provide a comprehensive response following your organization's guidelines and processes.

## 🧠 How It Works

The agent uses a sophisticated retrieval and response generation system:

1. **Knowledge Retrieval**: When a user asks a question, the agent:
   - Converts the query into an embedding using the configured model
   - Searches the Qdrant vector database for semantically similar content
   - Retrieves the most relevant document chunks

2. **Information Organization**: The agent then:
   - Groups documents by category
   - Prioritizes information based on relevance
   - Formats the information in a structured, readable format

3. **Response Generation**: Finally, the agent:
   - Synthesizes a comprehensive response using the retrieved information
   - Follows your organization's guidelines and processes
   - Includes source information when available

## 🚀 Deployment

Deploy to Blaxel:

```bash
bl deploy
```

## 📁 Project Structure

- **src/**
  - `agent.ts` - Main agent configuration and request handling
  - `prompt.ts` - System and user prompt templates
  - `knowledgebase.ts` - Knowledge base integration with Qdrant
  - `functions/` - Custom functions for the agent
- **.blaxel/**
  - `agents/` - Agent configurations
  - `functions/` - Function definitions
  - `models/` - Model configurations
- **company-documents/** - Sample organizational documents
- **fillKnowledgeBase.ts** - Script to populate the knowledge base
- **index.ts** - Application entry point

## 🛠️ Customization

To customize the agent for your organization:

1. Replace the sample documents in `company-documents/` with your actual organizational documents
2. Adjust the prompts in `src/prompt.ts` to match your organization's tone and style
3. Modify the agent configuration in `src/agent.ts` to customize the retrieval and response generation
4. Update the Blaxel configurations in `.blaxel/` to change the agent's behavior

## 📄 License

MIT Licensed. See [LICENSE](LICENSE) for details.
