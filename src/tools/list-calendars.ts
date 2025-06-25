import { CalDAVClient } from "ts-caldav"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

export async function registerListCalendars(
  client: CalDAVClient,
  server: McpServer,
) {
  const calendars = await client.getCalendars()

  server.tool(
    "list-calendars",
    "List all calendars returning both name and URL",
    {},
    async () => {
      const data = calendars.map((c) => ({ name: c.displayName, url: c.url }))
      return { content: [{ type: "text", text: JSON.stringify(data) }] }
    },
  )
}
