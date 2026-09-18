import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    const safePath = normalize(pathname).replace(/^([.][.][/\\])+/, "");
    let filePath = join(root, safePath);
    try {
      if ((await stat(filePath)).isDirectory()) filePath = join(filePath, "index.html");
    } catch {
      filePath = join(root, "404.html");
      response.statusCode = 404;
    }
    const body = await readFile(filePath);
    response.setHeader("Content-Type", mime[extname(filePath).toLowerCase()] || "application/octet-stream");
    response.end(body);
  } catch {
    response.statusCode = 500;
    response.end("Internal Server Error");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Beauty by Kyrin preview: http://127.0.0.1:${port}`);
});
