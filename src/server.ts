import express from "express";
import path from "path";
import http from "http";
import socket from "./socket";
import SubscribeCapture from "./subscribeCapture";

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = new http.Server(app);
const io = socket(httpServer);
const capture = new SubscribeCapture();
capture.start();

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

httpServer.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
