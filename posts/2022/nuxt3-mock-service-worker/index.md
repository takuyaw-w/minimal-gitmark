---
title: "nuxt3にmock service workerを導入する"
author: "takuyaw-w"
category: "Tech"
tags:
  - "Web"
  - "JavaScript"
  - "Frontend"
  - "Mock Service Worker"
summary: "Nuxt3でMock Service Workerを導入し、簡単な設定手順をまとめたガイド。"
license: "CC BY-NC-SA 4.0"
created_at: 2022-09-11T02:40:13.0+09:00
updated_at: 2022-09-11T02:40:13.0+09:00
image: ""
published: true
---

nuxt3 の素振りついでに、最近よく zenn などで見る mock service worker を導入してみた。

mock service worker については以下参照。
[Mock Service Worker - API mocking library for browser and Node.js](https://mswjs.io/)

## nuxt3 環境構築

`npx nuxi init YOUR-PROJECT-NAME`

## msw をインストール

`npm i -D msw`

## msw 関連ファイル追加

### ./mocks/handlers.ts

```typescript
import { rest } from "msw";

export const handlers = [
  rest.get("/users", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          {
            id: 1,
            name: "hogehoge",
          },
          {
            id: 2,
            name: "fugafuga",
          },
          {
            id: 3,
            name: "piyopiyo",
          },
        ],
      })
    );
  }),
];
```

### ./mocks/browser.ts

```typescript
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
```

### Service Worker を生成

```shell
npx msw init public/ --save
```

多分、save オプションはつけなくても問題ない。

### ./plugins/mock.client.ts

```typescript
import { worker } from "@/mocks/browser";

export default defineNuxtPlugin(async () => {
  if (process.env.DEBUG) {
    // NODE_ENVのが適切かもしれない
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
});
```

### 呼び出し側

```html
<template>
  <div>
    <template v-if="pending"> <p>loading...</p></template>
    <template v-else-if="error"> <p>{{ error }}</p></template>
    <template v-else>
      <ul>
        <li v-for="user in data.users">{{ user.id }}: {{ user.name }}</li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
  const { data, pending, error } = useFetch("/users", {
    server: false,
  });
</script>
```

## 参考リポジトリ

作ってみた。

<https://github.com/takuyaw-w/nuxt3-with-msw>

設定数少なく利用できて最高です。
nuxt2 もほぼ変わらずこれで設定可能なはず。
