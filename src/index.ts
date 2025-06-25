#!/usr/bin/env node

import "dotenv/config"
import Imap from "imap"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import { registerCreateDraft } from "./tools"

const server = new McpServer({
  name: "imap-mcp",
  version: "0.1.0",
})

async function main() {
  const imapConfig = {
    user: process.env.IMAP_USERNAME || "",
    password: process.env.IMAP_PASSWORD || "",
    host: process.env.IMAP_HOST || "",
    port: parseInt(process.env.IMAP_PORT || "993"),
    tls: process.env.IMAP_USE_SSL === "true",
    tlsOptions: { rejectUnauthorized: false },
  }

  const client = new Imap(imapConfig)

  registerCreateDraft(client, server)

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main()
