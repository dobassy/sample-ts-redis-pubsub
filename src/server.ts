import express from "express";
import path from "path";
import http from "http";
import wsserver from "./socket";
import SubscribeCapture from "./subscribeCapture";

const app = express();
const WS_PORT = process.env.WS_PORT || 3000;
const httpServer = new http.Server(app);
const ws = new wsserver(httpServer);
const capture = new SubscribeCapture();
capture.start();

app.get("/client/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

httpServer.listen(WS_PORT, function() {
  console.log(`listening on *:${WS_PORT}`);
});
