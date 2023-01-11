import http from "node:http";

const server = http.createServer((req, res) => {
  return res.end("Hello world");
});

server.listen(3333, () => console.log("Server is running on port 3333."));
