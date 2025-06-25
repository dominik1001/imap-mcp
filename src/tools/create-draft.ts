import Imap from "imap"
import { z } from "zod"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

export function registerCreateDraft(client: Imap, server: McpServer) {
  server.tool(
    "create-draft",
    "Creates a draft email message",
    {
      to: z.string(),
      subject: z.string(),
      body: z.string(),
      from: z.string().optional(),
    },
    async ({ to, subject, body, from }) => {
      return new Promise((resolve, reject) => {
        client.once("ready", () => {
          client.openBox("INBOX.Drafts", false, (err) => {
            if (err) {
              // Try opening "Drafts" folder instead
              client.openBox("Drafts", false, (err2) => {
                if (err2) {
                  reject(
                    new Error(`Failed to open drafts folder: ${err2.message}`),
                  )
                  return
                }
                createDraftMessage()
              })
              return
            }
            createDraftMessage()
          })

          function createDraftMessage() {
            const message = [
              `From: ${from || process.env.IMAP_USERNAME || ""}`,
              `To: ${to}`,
              `Subject: ${subject}`,
              "",
              body,
            ].join("\r\n")

            client.append(message, { flags: ["\\Draft"] }, (err) => {
              if (err) {
                reject(new Error(`Failed to create draft: ${err.message}`))
                return
              }
              resolve({
                content: [
                  {
                    type: "text",
                    text: `Draft created successfully for ${to}`,
                  },
                ],
              })
            })
          }
        })

        client.once("error", (err: Error) => {
          reject(new Error(`IMAP connection error: ${err.message}`))
        })

        client.connect()
      })
    },
  )
}
