# caldav-mcp

<div align="center">

📧 An IMAP Model Context Protocol (MCP) server to expose IMAP operations as tools for AI assistants.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.io)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

</div>

## ✨ Features

- tbd

## Setup

```
{
  "mcpServers": {
    ...,
    "imap": {
      "command": "npx",
      "args": [
        "imap-mcp"
      ],
      "env": {
        "IMAP_HOST": "<IMAP host>",
        "IMAP_PORT": "<IMAP port>",
        "IMAP_USERNAME": "<IMAP username>"
        "IMAP_PASSWORD": "<IMAP password>"
        "IMAP_USE_SSL": "<IMAP ssl option>"
      }
    }
  }
}
```

## Usage

1. Compile TypeScript to JavaScript:
```bash
npx tsc
```

2. Run the MCP server:
```bash
node index.js
```

## Available Tools

### tbd

## License

MIT