---
title: "Vue3向けのコンポーザブルライブラリ作ってみた。"
author: "takuyaw-w"
category: "Tech"
tags:
  - "Vue3"
  - "Composable"
  - "JavaScript"
  - "npm"
summary: "Vue3向けのコンポーザブルライブラリ「useList」を作成し、学びを得た記録。"
license: "CC BY-NC-SA 4.0"
created_at: 2023-09-12T23:55:16.0+09:00
updated_at: 2023-09-12T23:55:16.0+09:00
image: ""
published: true
---

React 向けのカスタムフックライブラリを見てみると、[useList](https://usehooks.com/uselist)というカスタムフックがあった。  
Vue3 向けにこういうライブラリ作れそうだなーと思ったので、ライブラリの作成の練習としてやってみた。

とりあえず、結果としてできたのが以下です。npm へのリンクと GitHub へのリンクを貼ります。

<https://www.npmjs.com/package/@takuyaw-w/uselist>

<https://github.com/takuyaw-w/useList>

とりあえず、ライブラリ作成に関しての知見がゼロなので、Vue のコミュニティで「参考記事ないですかー」と問うたら、[@kazupon](https://twitter.com/kazu_pon)さん（[Vue-I18n](https://vue-i18n.intlify.dev/)というライブラリを作られている方）から、[参考となる記事](https://dev.to/nickap/exit-intent-pop-up-how-to-publish-on-npm-vue-3-3bhm)をいただいた。  
Vue のコミュニティの暖かさに感謝。

参考となる記事をベースに、自分でライブラリを作ってみたら、かなり簡単にできた。  
また作ろ
