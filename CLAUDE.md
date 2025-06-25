# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is an IMAP Model Context Protocol (MCP) server to expose IMAP operations as tools for AI assistants. It uses:

- MCP SDK: Model Context Protocol for creating tools that can be used by AI assistants
- IMAP client libraries for interacting with email servers

## Environment Setup

The project requires the following environment variables:

```
IMAP_HOST=<IMAP host>
IMAP_PORT=<IMAP port>
IMAP_USERNAME=<IMAP username>
IMAP_PASSWORD=<IMAP password>
IMAP_USE_SSL=<IMAP ssl option>
```

## Common Commands

```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npx tsc

# Run the MCP server
node index.js
```

## Project Architecture

The codebase is an MCP server implementation that:

1. Connects to an IMAP server using credentials from environment variables
2. Exposes IMAP operations as MCP tools for AI assistants
3. Available tools: TBD (to be determined)

The MCP server uses the StdioServerTransport to communicate through stdin/stdout, making it suitable for integration with Claude or other AI assistants that support the Model Context Protocol.