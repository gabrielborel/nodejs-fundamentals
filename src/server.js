import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, role } = req.body;

    const user = database.insert("users", { id: randomUUID(), name, role });

    return res.writeHead(201).end(JSON.stringify(user));
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => console.log("Server is running on port 3333."));
