# TypeScript による Redis PubSub サンプルコード

## 前提

```
yarn global add typescript
```

## 便利なコマンドメモ

```
tsc -w
```

ウォッチモードになるので自動でコンパイルしてくれる。

## Socket.IO エンドポイントの変更

server:

```typescript
let http = require("http").Server(app);
let io = require("socket.io")(http, {path: "/ws"});
```

client:

```javascript
<script>
  const socket = io("http://localhost:3000", {path: "/ws"});

 ...
```
