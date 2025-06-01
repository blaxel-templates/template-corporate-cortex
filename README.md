# 🤖 Corporate Cortex Agent

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

This repository implements a Corporate Knowledge Agent using [Blaxel SDK](https://blaxel.ai) and [LangChain](https://langchain.com). The agent provides accurate, contextually relevant responses to internal IT inquiries by leveraging a structured knowledge base.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Core Knowledge Base Setup](#core-knowledge-base-setup)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Enterprise knowledge management with advanced AI models
- Qdrant vector database integration for document storage
- Contextual retrieval and organization of knowledge
- Annotated responses with source references
- Interactive conversational agent interface

## Quick Start

Watch our quick demo:

![Watch Demo](assets/watch-demo.gif)

## Prerequisites

- Node.js v20+
- Blaxel CLI:
  ```bash
  curl -fsSL https://raw.githubusercontent.com/blaxel-ai/toolkit/main/install.sh | BINDIR=$HOME/.local/bin sh
  ```
- Authenticate:
  ```bash
  bl login YOUR-WORKSPACE
  ```

## Installation

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/blaxel-templates/template-corporate-cortex.git
   cd template-corporate-cortex
   npm install
   ```

2. Copy and update environment variables:
   ```bash
   cp .env-sample .env
   ```

## Configuration

Update `.env` with:

- Qdrant:
  - `QDRANT_URL` and `QDRANT_API_KEY`
- OpenAI:
  - `OPENAI_API_KEY`
- Exa.ai:
  - `EXA_API_KEY`
- Embeddings:
  - `EMBEDDING_MODEL` (e.g., `text-embedding-3-small`)
  - `EMBEDDING_MODEL_TYPE` (`openai`)

## Core Knowledge Base Setup

Place your docs in `company-documents/`. Sample docs include:

- IT Service Architecture
- Contact Information
- Roles & Responsibilities
- Processes & Operating Model
- Enterprise Architecture Guidelines
- Organizational Structure

Populate the knowledge base:
```bash
npm run fill-knowledge-base
```

## Examples

**Simple query**
```bash
# Who manages our cloud infrastructure?
```

**Advanced query**
```bash
# Process to request additional resources for project Z
```

## API Reference

| Endpoint                         | Description                         |
|----------------------------------|-------------------------------------|
| POST /agents/{agent_id}/run      | Run the agent with input            |
| GET /agents/{agent_id}/info      | Retrieve agent capabilities         |
| GET /health                      | Health check                        |

## Architecture

1. Query embedding with configured model
2. Similarity search in Qdrant vector DB
3. Document chunk retrieval and categorization
4. Response synthesis with source citations

## Deployment

Deploy to Blaxel:
```bash
bl deploy
```

## Project Structure

```
├── src/
│   ├── main.ts           # Agent config & request handling
│   ├── prompt.ts         # Prompt templates
│   ├── knowledgebase.ts  # Qdrant integration
│   └── ...
├── company-documents/     # Organizational docs
├── functions/            # Custom agent functions
├── models/               # Model settings
├── examples/             # Sample docs & queries
└── ...
```

## Contributing

1. Fork repo
2. Create branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE).
