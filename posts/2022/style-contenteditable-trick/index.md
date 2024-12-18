---
title: "【小ネタ】style要素にcontenteditableつけるとブラウザでリアルタイムにスタイリングできる"
author: "takuyaw-w"
category: "Tech"
tags:
  - "HTML"
  - "contenteditable"
  - "CSS"
  - "Frontend"
  - "Browser Tricks"
summary: "style要素にcontenteditableをつけるとブラウザでリアルタイムにスタイリング可能な小ネタを紹介。"
license: "CC BY-NC-SA 4.0"
created_at: 2022-11-1T22:11:03.0+09:00
updated_at: 2022-11-1T22:11:03.0+09:00
image: ""
published: true
---

これ元ネタは Twitter で見たんだけど、いいねもブックマークもしていなかったのでどこかに流れてしまった。
備忘録含めてこちらにメモ。

body 要素内に style 要素を配置して、contenteditable 属性を付与。style 要素に `display: block; white-space: pre;`のスタイルをあててあげると不思議とブラウザ上でリアルタイムにスタイリング可能な領域ができあがります。

<https://github.com/takuyaw-w/style-contenteditable>

上記 clone 後、index.html をブラウザで開くとなんとなく言ってること分かると思う。

## 仕様的な部分ってどうなの。

body 内に style 要素を含めるのは適切じゃないので、飽くまでお遊びです。  
参考：[HTML Standard 日本語訳](https://momdo.github.io/html/semantics.html#the-style-element)

でも contenteditable 含むグローバル属性は指定可みたい。draggable とか autofucus とか要らなくね？なんとなく雑感。

実務では恐らく役に立たないけど、覚えとくと少しドヤれる…かも

## 追記

[Twitter リンク](https://twitter.com/wesbos/status/1586360039174209536?s=20&t=M5RI0qkeWC2CoUkQNFZWpQ)

見つけた。これこれ。
