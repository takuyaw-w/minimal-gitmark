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

Vuetify3系のアップデートとかを追ってて、2023年06月23日現在、Labsに含まれている[useDate](https://vuetifyjs.com/en/features/dates/)っていうAPIを見ていて、[date-io](https://github.com/dmtrKovalenko/date-io)という見慣れないライブラリがあった。少し調べたら、Material-UIのデートピッカーとかにも使われていた。

要は、Moment.jsとか、date-fnsとか、luxonとかの日付操作ライブラリの抽象化を行ってくれるライブラリで、date-ioを通すことで各ライブラリで異なるAPIを吸収してくれるもの。  
手動でインターフェースの拡張可能なのでAPIが案件にフィットしなくても自分で解消できそう

とりあえずdate-ioとMoment.js組み合わせてサクッと作って後々いい感じのライブラリに切り替えるっていうのもそんなに負荷かからずにできそうなのかな。

試したリポジトリ： <https://github.com/takuyaw-w/try-date-io>
