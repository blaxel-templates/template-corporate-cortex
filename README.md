# Blaxel Corporate Cortex Agent

<p align="center">
  <img src="https://blaxel.ai/logo.png" alt="Blaxel" width="200"/>
</p>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 20+](https://img.shields.io/badge/node-20+-blue.svg)](https://nodejs.org/downloads/)
[![TypeScript](https://img.shields.io/badge/TypeScript-enabled-blue.svg)](https://www.typescriptlang.org/)
[![LangChain](https://img.shields.io/badge/LangChain-powered-brightgreen.svg)](https://langchain.com/)
[![Qdrant](https://img.shields.io/badge/Qdrant-vector_database-orange.svg)](https://qdrant.tech/)

</div>

A template implementation of a Corporate Knowledge Agent built using Blaxel SDK and LangChain. This agent serves as an expert AI assistant deeply embedded within your organization, providing accurate, contextually relevant, and actionable responses to internal inquiries regarding IT services, resources, and processes by leveraging a comprehensive knowledge base.

<p align="center">
  <img src="./assets/illustration.jpeg" width="600" alt="Corporate Cortex Agent">
</p>

## 🎬 See It In Action

<p align="center">
  <a href="https://www.tella.tv/video/setting-up-your-first-knowledge-base-template-hu22" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/▶️_Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch Demo" width="200"/>
  </a>
</p>

<p align="center">
  <i>Watch our quick demo to see how Corporate Cortex transforms your organization's knowledge into actionable insights!</i>
</p>

## 📑 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Running Locally](#running-the-server-locally)
  - [Testing](#testing-your-agent)
  - [Deployment](#deploying-to-blaxel)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

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
- 🎯 Sophisticated retrieval and response generation system
- 📄 Document chunking and embedding for optimal retrieval
- 🔧 Customizable prompts and agent behavior

## 🚀 Quick Start

For those who want to get up and running quickly:

```bash
# Clone the repository
git clone https://github.com/blaxel-ai/template-corporate-cortex.git

# Navigate to the project directory
cd template-corporate-cortex

# Install dependencies
npm install

# Configure environment variables
cp .env-sample .env
# Edit .env with your Qdrant, OpenAI, and Exa API credentials

# Populate the knowledge base
npm run fill-knowledge-base

# Start the server
bl serve --hotreload

# In another terminal, test the agent
bl chat template-corporate-cortex --local
```

## 📋 Prerequisites

- **Node.js:** 20.0 or later
- **[NPM](https://www.npmjs.com/):** Node package manager
- **Qdrant Account:** Sign up for a free account at [Qdrant Cloud](https://cloud.qdrant.io/)
- **Exa API Key:** Visit [Exa.ai](https://exa.ai) and create an account for search capabilities
- **Blaxel Platform Setup:** Complete Blaxel setup by following the [quickstart guide](https://docs.blaxel.ai/Get-started#quickstart)
  - **[Blaxel CLI](https://docs.blaxel.ai/Get-started):** Ensure you have the Blaxel CLI installed. If not, install it globally:
    ```bash
    curl -fsSL https://raw.githubusercontent.com/blaxel-ai/toolkit/main/install.sh | BINDIR=/usr/local/bin sudo -E sh
    ```
  - **Blaxel login:** Login to Blaxel platform
    ```bash
    bl login YOUR-WORKSPACE
    ```

## 💻 Installation

**Clone the repository and install dependencies:**

```bash
git clone https://github.com/blaxel-ai/template-corporate-cortex.git
cd template-corporate-cortex
npm install
```

**Configure environment variables:**

```bash
cp .env-sample .env
```

Update the following values with your own credentials:
- **Qdrant configuration**:
  - Create a new cluster and copy your `QDRANT_URL`
  - Generate an API key from your cluster settings for `QDRANT_API_KEY`
  - Choose a name for your collection (`QDRANT_COLLECTION_NAME`)
- **Exa API key**:
  - Create an account and subscribe to a plan
  - Generate an API key from your dashboard for `EXA_API_KEY`
- **Embedding model configuration**:
  - Set `EMBEDDING_MODEL` to your preferred embedding model (e.g., "text-embedding-3-small")
  - Set `EMBEDDING_MODEL_TYPE` to the appropriate type (e.g., "openai")

**Set up knowledge base:**

1. Place your organizational documents in the `company-documents` directory
2. Run the knowledge base population script:
   ```bash
   npm run fill-knowledge-base
   ```

**Verify installation:**

```bash
npm run build
```

This command should complete without errors, confirming that TypeScript compilation and all dependencies are properly configured.

## 🔧 Usage

### Running Locally

Start the development server with hot reloading:

```bash
bl serve --hotreload
```

For production run:

```bash
bl serve
```

_Note:_ The development server automatically restarts when you make changes to the source code.

### Testing

You can test your corporate cortex agent locally:

```bash
# Using the Blaxel CLI chat interface
bl chat template-corporate-cortex --local
```

**Example inquiries to test:**

```
Can we buy tool XY for our department?
```

```
What is the process for requesting additional resources for project Z?
```

```
Who is responsible for managing our cloud infrastructure?
```

```
What is our incident management process?
```

You can also run it directly with specific input:

```bash
bl run agent template-corporate-cortex --local --data '{"input": "What is our IT service architecture?"}'
```

### Deployment

When you are ready to deploy your agent:

```bash
bl deploy
```

This command uses your code and the configuration files under the `.blaxel` directory to deploy your corporate cortex agent on the Blaxel platform.

## 🛠️ Customization

To customize the agent for your organization:

1. **Replace sample documents** in `company-documents/` with your actual organizational documents
2. **Adjust prompts** in `src/prompt.ts` to match your organization's tone and style
3. **Modify agent configuration** in `src/agent.ts` to customize retrieval and response generation
4. **Update Blaxel configurations** in `.blaxel/` to change the agent's behavior: embedding and model used for instance
5. **Configure embedding settings** to optimize for your document types and use cases

## 📁 Project Structure

- **src/** - Source code directory
  - **agent.ts** - Main agent configuration and request handling
  - **prompt.ts** - System and user prompt templates
  - **knowledgebase.ts** - Knowledge base integration with Qdrant
  - **embeddings.ts** - Embedding model configuration
  - **error.ts** - Error handling utilities
  - **functions/** - Custom functions for the agent
- **.blaxel/** - Blaxel configuration directory
  - **agents/** - Agent configurations
  - **functions/** - Function definitions
  - **models/** - Model configurations
- **company-documents/** - Sample organizational documents
- **fillKnowledgeBase.ts** - Script to populate the knowledge base
- **index.ts** - Application entry point
- **package.json** - Node.js package configuration with scripts and dependencies
- **tsconfig.json** - TypeScript configuration
- **blaxel.toml** - Blaxel deployment configuration
- **.env-sample** - Environment variables template
- **LICENSE** - MIT license file

## ❓ Troubleshooting

### Common Issues

1. **Blaxel Platform Issues**:
   - Ensure you're logged in to your workspace: `bl login MY-WORKSPACE`
   - Verify models are available: `bl get models`
   - Check that functions exist: `bl get functions`

2. **Knowledge Base Population Problems**:
   - Ensure documents are placed in the `company-documents` directory
   - Check that all API keys are correctly configured in `.env`
   - Verify Qdrant cluster is accessible and running
   - Monitor the fill-knowledge-base script output for errors

3. **Qdrant Connection Issues**:
   - Verify `QDRANT_URL` and `QDRANT_API_KEY` are correct
   - Check that your Qdrant cluster is active and accessible
   - Ensure the collection name matches your configuration
   - Test connection using Qdrant's web console

4. **Node.js and TypeScript Issues**:
   - Make sure you have Node.js 20+
   - Try `npm install` to reinstall dependencies
   - Run `npx tsc --noEmit` to check for type errors
   - Clear npm cache: `npm cache clean --force`

5. **Embedding and Retrieval Issues**:
   - Verify embedding model configuration in `.env`
   - Check that the specified model is available through Blaxel
   - Monitor embedding generation during knowledge base population
   - Ensure embedding dimensions match Qdrant collection configuration

For more help, please [submit an issue](https://github.com/blaxel-templates/template-corporate-cortex/issues) on GitHub.

## 👥 Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Submit** a Pull Request

Please make sure to update tests as appropriate and follow the TypeScript code style of the project.

## 🆘 Support

If you need help with this template:

- [Submit an issue](https://github.com/blaxel-templates/template-corporate-cortex/issues) for bug reports or feature requests
- Visit the [Blaxel Documentation](https://docs.blaxel.ai) for platform guidance
- Check the [LangChain Documentation](https://js.langchain.com/) for framework-specific help
- Check the [Qdrant Documentation](https://qdrant.tech/documentation/) for vector database help
- Join our [Discord Community](https://discord.gg/G3NqzUPcHP) for real-time assistance

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

