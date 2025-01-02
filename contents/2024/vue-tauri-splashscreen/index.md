---
title: "Vue + Tauriでスプラッシュスクリーンを実装する方法"
author: "takuyaw-w"
category: "Tech"
tags:
  - "Tauri"
  - "Vue"
  - "Splashscreen"
summary: "Vue.jsを使用したTauriアプリケーションのスプラッシュスクリーンを実装する方法を解説"
license: "CC BY-NC-SA 4.0"
created_at: 2025-01-02T01:38:49.49654195209:00
updated_at: 2025-01-02T01:38:49.49654195209:00
image: ""
published: true
---

[Tauri](https://v2.tauri.app/)でのスプラッシュスクリーンの設定方法について。

[Tauri](https://v2.tauri.app/)の公式サイトには、[スプラッシュスクリーンの実装方法](https://v2.tauri.app/learn/splashscreen/)はあれど、VueやReactを使った場合の実装方法が記載されていない。

今回、Vueを使ったスプラッシュスクリーンの実装方法をここに記載する。

## そもそもスプラッシュスクリーンとは

スプラッシュスクリーンとは、アプリケーションが起動する間に表示される画面のこと。
アプリの立ち上げに時間がかかる場合、ユーザーに対して待機中であることを伝えるために表示される。[^1]

[A5:SQL Mk-2](https://a5m2.mmatsubara.com/)や、[X](https://x.com/home)のモバイル版アプリを立ち上げた際に観測ができる。

[^1]: [スプラッシュスクリーン - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%83%E3%82%B7%E3%83%A5%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3)

## Vueでのスプラッシュスクリーンの実装方法

### プロジェクトの作成

Tauriの公式サイト通りにプロジェクトを作成する。
構築の際、フロントエンドのフレームワークはVueを選択する。

```bash
$ npm create tauri-app@latest my-app
```

### スプラッシュスクリーンの実装

基本的には公式サイト通りにスプラッシュスクリーンの実装をするが、その場合、スプラッシュスクリーン用のHTMLは素のHTMLを記載することになる。
せっかく、Vueを利用しているので、Vueの再利用性を活用したくなる。その場合にどうすべきか。

#### vite.config.tsの設定

まず、`vite.config.ts`に`build`の設定を追加する。
mainとは別で、スプラッシュスクリーン用のエンドポイントをもたせる。

```diff
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'node:path'

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],

  clearScreen: false,
  server: {
    // 省略
  },
+ build: {
+   rollupOptions: {
+     input: {
+       main: resolve(import.meta.dirname, 'index.html'),
+       splash: resolve(import.meta.dirname, 'splashscreen.html')
+     }
+   }
+ }
}));
```

#### splashscreen.htmlの作成

`root`ディレクトリに`splashscreen.html`を作成する。
`script`の`src`に`splashscreen.ts`を指定する。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tauri + Vue + Typescript App</title>
  </head>

  <body>
    <div id="app"></div>
   <script type="module" src="/src/splashscreen.ts"></script>
  </body>
</html>
```

#### Splashscreen.vueの作成

`src`ディレクトリに`Splashscreen.vue`を作成する。

```vue
<script setup lang="ts">
</script>

<template>
  <main class="container">
    <h1>SPLASH SCREEN</h1>
  </main>
</template>

<style scoped>
.container {
  display: grid;
  place-content: center;
  background-color: darkblue;
  color: white;
  height: 100vh;
}

h1 {
  font-size: 64px
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
```

#### splashscreen.tsの作成

`src`ディレクトリに`splashscreen.ts`を作成する。
`Splashscreen.vue`をインポートし、`createApp`でマウントする。

```typescript
import { createApp } from "vue";
import Splashscreen from "./Splashscreen.vue";

createApp(Splashscreen).mount("#app");
```

#### tauri.conf.jsonの設定

`tauri.conf.json`に`splashscreen`の設定を追加する。
メインとなるウィンドウの設定とは別に、スプラッシュスクリーン用の設定を追加する。
メインウィンドウについては、初期値を非表示としたいため、`visible`を非活性にする。
スプラッシュスクリーン用の設定はお好みで。

```json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "splash-testing",
  "version": "0.1.0",
  "identifier": "com.splash-testing.app",
  "build": {
    "beforeDevCommand": "npm run dev",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "npm run build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "splash-testing",
        "width": 800,
        "height": 600,
        "visible": false
      },
      {
        "label": "splashscreen",
        "url": "splashscreen.html",
        "resizable": false,
        "width": 600,
        "height": 400,
        "alwaysOnTop": true,
        "browserExtensionsEnabled": false,
        "center": true,
        "hiddenTitle": true,
        "title": "splash-testing",
        "decorations": false
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
```

### まとめ

Vueを使ったスプラッシュスクリーンの実装方法について記載した。
特に難しいことはなく、スプラッシュスクリーン用にエンドポイントを追加することで、Vueを利用したスプラッシュスクリーンを実装できた。
いつかTauriを使ったアプリを作る際に、スプラッシュスクリーンを実装する際に振り返りたい。
