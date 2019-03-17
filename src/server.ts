import express from "express";
import path from "path";
import http from "http";
import socket from "./socket";

const app = express();
const PORT = process.env.PORT || 3000;
const http_server = new http.Server(app);
const io = socket(http_server);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

http_server.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
