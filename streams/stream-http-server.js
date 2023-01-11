import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    const buff = Buffer.from(String(transformed));

    console.log(transformed);

    callback(null, buff);
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullContent = Buffer.concat(buffers).toString();

  console.log(fullContent);
  return res.end(fullContent);
  // return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334, () => console.log("Server is running on port 3334"));
