#!/usr/bin/env node
/**
 * Webhook listener for AIAIAI static site rebuild.
 * Listens on port 9000 for POST /rebuild requests.
 * Triggered by WordPress "Deploy" button.
 *
 * Usage: node webhook.js
 * Or with PM2: pm2 start webhook.js --name aiaiai-webhook
 */

const http = require("http");
const { execFile } = require("child_process");
const path = require("path");

const PORT = process.env.WEBHOOK_PORT || 9000;
const REBUILD_SCRIPT = path.join(__dirname, "rebuild.sh");

let isBuilding = false;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/rebuild") {
    if (isBuilding) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, message: "Build already in progress" }));
      return;
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      console.log(`[${new Date().toISOString()}] Rebuild triggered`, body);

      // Respond immediately
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, message: "Rebuild started" }));

      // Run rebuild in background
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

  // Health check
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, building: isBuilding }));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[AIAIAI Webhook] Listening on http://127.0.0.1:${PORT}`);
  console.log(`[AIAIAI Webhook] Rebuild script: ${REBUILD_SCRIPT}`);
});
