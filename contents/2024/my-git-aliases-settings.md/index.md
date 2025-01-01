---
title: "Git aliasesの設定"
author: "takuyaw-w"
category: "Tech"
tags:
  - "git"
  - "alias"
  - "shell"
  - "config"
summary: "私のGitエイリアスの設定例紹介"
license: "CC BY-NC-SA 4.0"
created_at: 2024-12-24T23:14:33.919364096+09:00
updated_at: 2024-12-24T23:14:33.919364096+09:00
image: ""
published: true
---

git を日常的によく使っています。仕事でも、日常でも。
git 自体は素晴らしいソフトウェアだと思うんですが、コマンドのオプションが覚えられなかったりする。（私だけ？）

## Git aliases とは

あるコマンドの別名を設定することができる機能です。
例えば、`git status` を `git st`などと設定し、それを呼び出すなど。
またオプションを入れ込んだり、複数のコマンドの組み合わせの設定も可能です。

### 設定方法

`git config` コマンドを使って設定します。

```shell
$ git config --global alias.st status
```

上記を設定することで、`~/.gitconfig` に以下のような設定が追加されます。

```ini
[alias]
    st = status
```

## 自分の設定例

自分の設定例を以下に記載します。

```ini
[alias]
  st = status
  cm = commit
  sw = switch
  new = switch -c
  cp = cherry-pick
  cm = commit -m
  br = branch
  rbr = branch -a
  save = stash save -u
  load = stash pop
  la = log --oneline --decorate --graph --branches --tags --remotes --all
  wip = !"git commit -m 'wip'"
  aliases = !"git config --get-regexp '^alias\\.' | colrm 1 6 | sed 's/[ ]/ = /'"
  merged = branch --merged
  delete = branch -d
  force-delete = branch -D
  last = log -1 HEAD --stat
  current = !"git rev-parse --abbrev-ref HEAD"
  fixit = commit --amend --no-edit
  please = push --force-with-lease --force-if-includes
  root = !git show-branch | grep \"*\" | grep -v \"$(git rev-parse --abbrev-ref HEAD)\" | head -n 1 | sed \"s/.*\\\\[\\\\([^]]*\\\\)\\\\].*/\\\\1/\"
```

### ポイント

`aliases` は、設定されているエイリアスを表示するエイリアスです。
linux コマンドの `alias` で設定されているエイリアスを表示するのと同じような感じです。
このコマンドを設定することで、他者に git aliases の設定を共有する際などに便利です。

また、ブランチの親切および切り替えも通常時では`git switch -c`を使いますが、`git new`としてまとめて使っています。
非常によく使うので、お気に入りのエイリアスです。
