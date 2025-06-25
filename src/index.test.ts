import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import Imap from "imap"

// Mock the dependencies
vi.mock("@modelcontextprotocol/sdk/server/mcp.js")
vi.mock("@modelcontextprotocol/sdk/server/stdio.js")
vi.mock("imap")
vi.mock("./tools/create-draft", () => ({
  registerCreateDraft: vi.fn(),
}))

describe("main", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock environment variables
    process.env.IMAP_USERNAME = "test@example.com"
    process.env.IMAP_PASSWORD = "testpass"
    process.env.IMAP_HOST = "imap.example.com"
    process.env.IMAP_PORT = "993"
    process.env.IMAP_USE_SSL = "true"
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("starts the mcp server", async () => {
    const mockServer = {
      connect: vi.fn().mockResolvedValue(undefined),
    }
    const mockTransport = {}
    const mockImap = {}

    vi.mocked(McpServer).mockImplementation(() => mockServer as McpServer)
    vi.mocked(StdioServerTransport).mockImplementation(
      () => mockTransport as StdioServerTransport,
    )
    vi.mocked(Imap).mockImplementation(() => mockImap as Imap)

    // Import and run main function
    const { main } = await import("./index.js")
    await main()

    // Verify MCP server was created with correct config
    expect(McpServer).toHaveBeenCalledWith({
      name: "imap-mcp",
      version: "0.1.0",
    })

    // Verify IMAP client was created with correct config
    expect(Imap).toHaveBeenCalledWith({
      user: "test@example.com",
      password: "testpass",
      host: "imap.example.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    })

    // Verify transport was created and server connected
    expect(StdioServerTransport).toHaveBeenCalled()
    expect(mockServer.connect).toHaveBeenCalledWith(mockTransport)
  })
})
