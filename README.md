# 🧠 Corporate Cortex Agent

[![npm version](https://img.shields.io/npm/v/@blaxel/corporate-cortex-agent)](https://www.npmjs.com/package/@blaxel/corporate-cortex-agent) [![Node.js version](https://img.shields.io/node/v/20?logo=node.js)](https://nodejs.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)]

> Expert AI assistant for corporate knowledge, providing secure, context-aware responses.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Features

- Retrieval of organizational knowledge from Qdrant vector database
- Contextual responses using OpenAI and customizable embedding models
- Secure, private deployment with Blaxel SDK integration
- Modular architecture: easy to extend with custom components

## Prerequisites

- Node.js v20 or later
- npm (v9+)
- Qdrant Cloud account
- OpenAI account

## Installation

```bash
# Clone repository
git clone https://github.com/blaxel-templates/template-corporate-cortex.git
cd template-corporate-cortex

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the project root with the following variables:

| Variable                 | Description                                  | Required |
|--------------------------|----------------------------------------------|----------|
| QDRANT_CLOUD_URL         | Qdrant Cloud endpoint                        | Yes      |
| QDRANT_API_KEY           | API key for Qdrant Cloud                     | Yes      |
| OPENAI_API_KEY           | API key for OpenAI                           | Yes      |
| EXAMPLE_EMBEDDING_MODEL  | (Optional) Embedding model name              | No       |
| EMBEDDING_MODEL_TYPE     | (Optional) e.g., `openai`                    | No       |

## Usage

```bash
# Run the agent locally
defaultAgent --config .env
```

Example code:

```js
import { CorporateCortexAgent } from '@blaxel/corporate-cortex-agent';

async function main() {
  const agent = new CorporateCortexAgent();
  await agent.init();
  const response = await agent.ask('How do I deploy updates?');
  console.log(response);
}

main();
```

## API Reference

See the [API documentation](docs/API.md) for detailed endpoints and usage.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<small>Built with ❤️ using Blaxel SDK and LangChain.</small>
