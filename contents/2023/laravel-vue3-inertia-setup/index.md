---
title: "【備忘録】Laravel + Vue3 + Inertia.jsの環境構築方法"
author: "takuyaw-w"
category: "Tech"
tags:
  - "Laravel"
  - "Vue3"
  - "Inertia.js"
  - "SPA"
summary: "Laravel + Vue3 + Inertia.jsの環境構築手順を備忘録としてまとめた記事。"
license: "CC BY-NC-SA 4.0"
created_at: 2023-07-11T01:20:08.0+09:00
updated_at: 2023-07-11T01:20:08.0+09:00
image: ""
published: true
---

最近、Laravel と Vue の組み合わせで苦しいという話があって、Inertia.js がそれを救ってくれるかもしれないという話から Inertia.js を素振りし始めた。  
ただ、[Inertia.js](https://inertiajs.com/)の Installation でつまづいたので、備忘録として、ブログに残しておく

## Laravel の環境構築

sail を使って、Laravel の環境構築を行う。DB は mysql より postgres を利用したいため、with クエリで pgsql を指定する。

```bash
# Laravelの環境構築
curl -s "https://laravel.build/{{ project_name }}?with=pgsql" | bash
# {{ project_name }}に移動
cd {{ project_name }}
```

## サーバーサイド側の設定

Laravel の環境構築が終わったらサーバーサイド側の設定を行っていく。  
sail コマンドは、.bashrc または.zshrc に alias を設定しているものとして、進めていく。

### inertiajs/inertia-laravel のインストール

```bash
sail composer require inertiajs/inertia-laravel
```

インストール完了後は、以下コマンドを実行してミドルウェアを生成する。

```bash
sail artisan inertia:middleware
```

`app/Http/Middleware/HandleInertiaRequests.php` が生成される。

### `app/Http/Kernel.php`の修正

先手順で生成したファイルを、`app/Http/Kernel.php`ファイルに追記する。

```php
<?php
// 省略
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \App\Http\Middleware\HandleInertiaRequests::class, // <- 最後に追記
    ],

    'api' => [
        // 省略
    ],
];
```

### optional1: tightenco/ziggy をインストールする

この手順は公式にもないため、オプションとなるが、設定をすると Vue ファイルから Laravel のルーティングを`route('routing.name')`このように指定可能となるため、便利。  
以下コマンドで、tightenco/ziggy をインストールを行う。

```bash
# インストール
sail composer require tightenco/ziggy
```

### テンプレート追加

エントリポイントとなる、blade ファイルを追加する。  
または既存の welcome.blade.php ファイルをリネームする

```bash
touch resources/views/app.blade.php
# or
mv resources/views/welcome.blade.php resources/views/app.blade.php
```

### テンプレート修正

先手順で追加した app.blade.php ファイルの内容を以下の内容に変更する

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    @routes @vite('resources/js/app.js') @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

@routes については、[optional: tightenco/ziggy をインストールする](#optional-tightencoziggy-をインストールする)の項をスキップした場合は不要となる。

## クライアントサイド側の設定

クライアントサイドの設定を行っていく。  
このあたりの手順でつまづいた。

### 必要なパッケージのインストール

```bash
sail npm install @inertiajs/vue3 vue @vitejs/plugin-vue
```

### vite.config.js の設定

vite.config.js の設定を行う

```javascript
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
});
```

### optional2: plugin を作る

[optional: tightenco/ziggy をインストールする](#optional-tightencoziggy-をインストールする)の項をスキップした場合は不要な手順。

tightenco/ziggy をインストールしただけでは、Vue の template から`route` にはアクセスできないので、プラグインを作成し、Vue の template からアクセスできるようにする。

以下コマンドでディレクトリとファイルを作る

```bash
mkdir resources/js/plugins
touch resources/js/plugins/ziggy.js
```

プラグインを作ると言っても中身は単純で、以下の様に記載すれば良い。

```javascript
export default {
  install(app) {
    app.config.globalProperties.$route = route;
  },
};
```

### app.js を編集

app.js の編集を行う

```javascript
import "./bootstrap";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import ziggy from "./plugins/ziggy";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
    return pages[`./Pages/${name}.vue`];
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ziggy)
      .mount(el);
  },
});
```

## まとめ

こんな感じで環境構築完了できた。  
あとは、Laravel で普通に開発進めていけば SPA の開発が進んでいくので、体感はよいけど MPA の利点を捨てるのがどうなんだろうか…  
SSR できるけど、本番環境に Node.js 必要となるしね

~~ちなみに tightenco/ziggy を利用した際に気づいたんだけど、Laravel のルーティング設定毎に`sail artisan ziggy:generate`を実行しないといけないのがめんどくさい。自動化できないものかな~~

2023/07/19 追記: ziggy が自動的に生成されなくてだるいっていう話は、構築ミスによるものだった。  
[tightenco/ziggy#advanced-setup](https://github.com/tighten/ziggy#advanced-setup)に記載されてる。  
ただ、若干嫌な点として routing の情報が head に全て載る。  
@route 使わないほうがいいかもなぁ。