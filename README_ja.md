# TypeScript による Redis PubSub サンプルコード

## 前提

```
yarn global add typescript
```

## コマンドメモ

```
tsc -w
```

ウォッチモードになるので自動でコンパイルしてくれる。

```
yarn run watch2
```

開発用。tsコンパイルとnode再起動とes-lintを実行してくれる。内容的には `package.json` 記載の通り。

```
docker build -t sample-ts-redis-pubsub:0.1.0 .  
docker-compose up
```

ビルド & run

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
