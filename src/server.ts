import express from "express";
import socketio from "socket.io";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

let http = require("http").Server(app);
let io = require("socket.io")(http, {path: "/ws"});

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

io.on("connection", function(socket: any) {
  console.log("connected");
  console.log(socket)

  socket.on("message", function(message: any) {
    console.log(message);

    socket.emit("message", `pong ${message}`);
  });

});

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
