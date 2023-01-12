import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select("users", {
        name: search,
        role: search,
      });

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, role } = req.body;
      const user = database.insert("users", { id: randomUUID(), name, role });
      return res.writeHead(201).end(JSON.stringify(user));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, role } = req.body;

      database.update("users", id, { name, role });

      return res.writeHead(204).end();
    },
  },
];
