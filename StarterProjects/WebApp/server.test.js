const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("./server");

async function withServer(run) {
  const server = createServer();

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  try {
    const { port } = server.address();
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test("serves the AI-Tool dashboard", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(baseUrl);

    assert.equal(response.status, 200);
    assert.match(await response.text(), /AI-Tool/);
  });
});

test("serves tool data", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/tools`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.ok(data.categories.length > 0);
    assert.equal(data.categories[0].tools[0].name, "GitHub");
  });
});

test("serves health status", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.app, "AI-Tool");
    assert.equal(data.status, "ok");
  });
});
