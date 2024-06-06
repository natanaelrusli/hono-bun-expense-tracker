import app from "./app";

const server = Bun.serve({
  fetch: app.fetch,
  port: 8080 || process.env.PORT,
  hostname: "0.0.0.0" || process.env.HOST,
});

console.log(`Server running on port ${server.port}`);
