#!/usr/bin/env node

import "dotenv/config"
import { CalDAVClient } from "ts-caldav"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import {
  registerCreateEvent,
  registerListEvents,
  registerDeleteEvent,
  registerListCalendars,
} from "./tools"

const server = new McpServer({
  name: "caldav-mcp",
  version: "0.1.0",
})

async function main() {
  const client = await CalDAVClient.create({
    baseUrl: process.env.CALDAV_BASE_URL || "",
    auth: {
      type: "basic",
      username: process.env.CALDAV_USERNAME || "",
      password: process.env.CALDAV_PASSWORD || "",
    },
  })

  registerCreateEvent(client, server)
  registerListEvents(client, server)
  registerDeleteEvent(client, server)
  await registerListCalendars(client, server)

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main()
