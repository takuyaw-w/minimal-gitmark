---
title: "date-ioっていうライブラリが便利そう。"
author: "takuyaw-w"
category: "Tech"
tags:
  - "Vuetify3"
  - "date-io"
  - "JavaScript"
  - "Vue3"
summary: "Vuetify3のuseDate APIで使用されているdate-ioライブラリの紹介と活用方法。"
license: "CC BY-NC-SA 4.0"
created_at: 2023-06-23T00:40:14.0+09:00
updated_at: 2023-06-23T00:40:14.0+09:00
image: ""
published: true
---

Vuetify3 系のアップデートとかを追ってて、2023 年 06 月 23 日現在、Labs に含まれている[useDate](https://vuetifyjs.com/en/features/dates/)っていう API を見ていて、[date-io](https://github.com/dmtrKovalenko/date-io)という見慣れないライブラリがあった。少し調べたら、Material-UI のデートピッカーとかにも使われていた。

要は、Moment.js とか、date-fns とか、luxon とかの日付操作ライブラリの抽象化を行ってくれるライブラリで、date-io を通すことで各ライブラリで異なる API を吸収してくれるもの。  
手動でインターフェースの拡張可能なので API が案件にフィットしなくても自分で解消できそう

とりあえず date-io と Moment.js 組み合わせてサクッと作って後々いい感じのライブラリに切り替えるっていうのもそんなに負荷かからずにできそうなのかな。

試したリポジトリ: <https://github.com/takuyaw-w/try-date-io>
