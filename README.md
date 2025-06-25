# imap-mcp

<div align="center">

📧 An IMAP Model Context Protocol (MCP) server to expose IMAP operations as tools for AI assistants.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.io)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

</div>

## ✨ Features

- **Email Draft Creation**: Create draft emails that are saved to your IMAP server's drafts folder
- **IMAP Integration**: Connect to any IMAP-compatible email server (Gmail, Outlook, etc.)
- **Secure Authentication**: Uses environment variables for secure credential management
- **MCP Compatible**: Works with Claude and other AI assistants that support the Model Context Protocol
- **TypeScript**: Full TypeScript support with proper type definitions

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
        "IMAP_USERNAME": "<IMAP username>",
        "IMAP_PASSWORD": "<IMAP password>",
        "IMAP_USE_SSL": "<true or false>"
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
node dist/index.js
```

## Available Tools

### `create-draft`

Creates a draft email message and saves it to the IMAP server's drafts folder.

**Parameters:**
- `to` (string, required): The recipient's email address
- `subject` (string, required): The email subject line
- `body` (string, required): The email body content
- `from` (string, optional): The sender's email address (defaults to IMAP_USERNAME)

**Example:**
```json
{
  "to": "recipient@example.com",
  "subject": "Meeting Reminder",
  "body": "Don't forget about our meeting tomorrow at 2 PM.",
  "from": "sender@example.com"
}
```

The tool will attempt to save the draft to either "INBOX.Drafts" or "Drafts" folder, depending on your email server's folder structure.

## License

MIT