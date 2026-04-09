#!/usr/bin/env node
/**
 * Webhook listener for AIAIAI static site rebuild.
 * Listens on port 9001 for POST /rebuild requests.
 *
 * Accepts requests from:
 *   - localhost (WP Deploy button via PHP proxy)
 *   - External with valid token (GitHub Actions)
 *
 * Usage: WEBHOOK_PORT=9001 WEBHOOK_TOKEN=xxx node webhook.js
 */

const http = require("http");
const { execFile } = require("child_process");
const path = require("path");

const PORT = process.env.WEBHOOK_PORT || 9001;
const TOKEN = process.env.WEBHOOK_TOKEN || "";
const REBUILD_SCRIPT = path.join(__dirname, "rebuild.sh");

let isBuilding = false;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/rebuild") {
    // Auth check: localhost always allowed, external needs token
    const remote = req.socket.remoteAddress || "";
    const isLocal = remote === "127.0.0.1" || remote === "::1" || remote === "::ffff:127.0.0.1";

    if (!isLocal) {
      // Check token from Authorization header or query param
      const authHeader = req.headers.authorization || "";
      const bearerToken = authHeader.replace(/^Bearer\s+/i, "");
      if (!TOKEN || bearerToken !== TOKEN) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, message: "Forbidden" }));
        return;
      }
    }

    if (isBuilding) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, message: "Build already in progress" }));
      return;
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      console.log(`[${new Date().toISOString()}] Rebuild triggered`, body);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, message: "Rebuild started" }));

      isBuilding = true;
      execFile("bash", [REBUILD_SCRIPT], { timeout: 300000 }, (err, stdout, stderr) => {
        isBuilding = false;
        if (err) {
          console.error(`[${new Date().toISOString()}] Rebuild FAILED:`, err.message);
          console.error(stderr);
        } else {
          console.log(`[${new Date().toISOString()}] Rebuild SUCCESS`);
          console.log(stdout);
        }
      });
    });
    return;
  }

  // Health check (no auth needed)
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, building: isBuilding }));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

// Listen on all interfaces (0.0.0.0) so external requests can reach
server.listen(PORT, "0.0.0.0", () => {
  console.log(`[AIAIAI Webhook] Listening on http://0.0.0.0:${PORT}`);
  console.log(`[AIAIAI Webhook] Token: ${TOKEN ? "enabled" : "disabled (localhost only)"}`);
  console.log(`[AIAIAI Webhook] Rebuild script: ${REBUILD_SCRIPT}`);
});
