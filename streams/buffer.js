const buff = Buffer.from("hello world");
console.log(Buffer.from(buff.toJSON().data).toString());
