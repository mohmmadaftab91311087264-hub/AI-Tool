const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");

const toolCategories = [
  {
    id: "core",
    name: "Core Setup",
    tools: [
      {
        name: "GitHub",
        status: "Connected",
        detail: "Repo synced with origin/main",
        command: "git status --short --branch",
      },
      {
        name: "VS Code Insiders",
        status: "Ready",
        detail: "Workspace, tasks, debug configs, and extensions configured",
        command: "code-insiders AI-Tool.code-workspace",
      },
      {
        name: "Git Bash",
        status: "Linked",
        detail: "Shortcut points to the local Git Bash executable",
        command: "git --version",
      },
    ],
  },
  {
    id: "sdk",
    name: "SDKs",
    tools: [
      {
        name: ".NET SDK",
        status: "Linked",
        detail: "Pinned by global.json with latest patch roll-forward",
        command: "dotnet --version",
      },
      {
        name: "Python",
        status: "Ready",
        detail: "Starter app runs from scripts/verify-kit.ps1",
        command: "python StarterProjects/PythonApp/main.py",
      },
      {
        name: "Node.js",
        status: "Ready",
        detail: "WebApp and NodeApp use npm scripts",
        command: "npm test --prefix StarterProjects/WebApp",
      },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft Tools",
    tools: [
      {
        name: "Edge DevTools",
        status: "Linked",
        detail: "Repository shortcut points to the local Microsoft repo",
        command: "git -C \"%USERPROFILE%\\source\\repos\\microsoft\\vscode-edge-devtools\" status",
      },
      {
        name: "Microsoft Store Metadata",
        status: "Tracked",
        detail: "Microsoft.Services.Store.winmd is included in the kit",
        command: "dir Microsoft.Services.Store.winmd",
      },
      {
        name: "Visual Studio Services VSIX",
        status: "Tracked",
        detail: "VSIX package is included for local reference",
        command: "dir Microsoft.VisualStudio.Services.VSIXPackage",
      },
    ],
  },
];

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
  }[extension] || "application/octet-stream";
}

function sendJson(response, data, statusCode = 200) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(data, null, 2));
}

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(response, { error: "Not found" }, 404);
      return;
    }

    response.writeHead(200, {
      "Content-Type": getContentType(filePath),
      "Cache-Control": "no-store",
    });
    response.end(content);
  });
}

function createServer() {
  return http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host || "127.0.0.1"}`);

    if (requestUrl.pathname === "/api/health") {
      sendJson(response, {
        app: "AI-Tool",
        status: "ok",
        checkedAt: new Date().toISOString(),
      });
      return;
    }

    if (requestUrl.pathname === "/api/tools") {
      sendJson(response, { categories: toolCategories });
      return;
    }

    const safePath = requestUrl.pathname === "/"
      ? "index.html"
      : requestUrl.pathname.replace(/^\/+/, "");
    const resolvedPath = path.normalize(path.join(publicDir, safePath));

    if (!resolvedPath.startsWith(publicDir)) {
      sendJson(response, { error: "Invalid path" }, 400);
      return;
    }

    sendFile(response, resolvedPath);
  });
}

if (require.main === module) {
  createServer().listen(port, "127.0.0.1", () => {
    console.log(`AI-Tool app running at http://127.0.0.1:${port}`);
  });
}

module.exports = { createServer, toolCategories };
