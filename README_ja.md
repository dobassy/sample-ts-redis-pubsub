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

## 環境変数

- `NODE_ENV`: log出力に違いあり
- `WS_PORT`: Socketサーバーのポート変更 (default: `3000`)
- `REDIS_HOST`: Redisサーバーのホスト (default: `127.0.0.1`)

portは現状デフォルト6379で固定している

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
