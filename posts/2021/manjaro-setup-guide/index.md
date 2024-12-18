---
title: "Manjaro Linuxをインストールしたら行うこと（旧）"
author: "takuyaw-w"
category: "Tech"
tags:
  - "linux"
  - "manjaro linux"
summary: "Manjaro Linuxの初期設定手順を簡潔にまとめたガイド。"
license: "CC BY-NC-SA 4.0"
created_at: 2021-11-22T01:12:32.0+09:00
updated_at: 2021-11-22T01:12:32.0+09:00
image: ""
published: true
---

- [ミラーサーバーの変更](#ミラーサーバーの変更)
- [pacman の出力のカラー化](#pacman-の出力のカラー化)
- [リポジトリとソフトウェアのアップデート](#リポジトリとソフトウェアのアップデート)
- [日本語入力の設定](#日本語入力の設定)
  - [Fcitx、mozc のインストール](#fcitxmozc-のインストール)
  - [~/.xprofile に追記](#xprofile-に追記)
- [AUR ヘルパーのインストール](#aur-ヘルパーのインストール)
- [ホームディレクトリ配下のディレクトリ名を英語表記に変更](#ホームディレクトリ配下のディレクトリ名を英語表記に変更)
  - [必要なソフトのインストール](#必要なソフトのインストール)
  - [変更コマンド](#変更コマンド)
- [フォントのインストール](#フォントのインストール)
  - [コード用](#コード用)
- [参考資料](#参考資料)

一週間ぐらい使ってみて、特別不便に感じないので、常用する予定。  
環境構築に関して、いろんなサイトに掲載されているけど、自分用に書いておきます。  
気が向いたときに更新する。

### ミラーサーバーの変更

```sh
sudo pacman-mirrors --fasttrack && sudo pacman -Syy
```

### pacman の出力のカラー化

これは気分。

```sh
sudo nano /etc/pacman.conf
```

#Color とコメントアウトされている箇所があるので、そこを修正。

```diff
- #Color
+ Color
```

### リポジトリとソフトウェアのアップデート

```sh
sudo pacman -Syyu
```

### 日本語入力の設定

#### Fcitx、mozc のインストール

```sh
sudo pacman -S fcitx-im fcitx-mozc
```

#### ~/.xprofile に追記

```sh
export LANG="ja_JP.UTF-8"
export XMODIFIERS="@im=fcitx"
export XMODIFIER="@im=fcitx"
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export DefaultIMModule=fcitx
```

### AUR ヘルパーのインストール

```sh
sudo pacman -S yay
```

### ホームディレクトリ配下のディレクトリ名を英語表記に変更

#### 必要なソフトのインストール

```sh
sudo pacman -S xdg-user-dirs-gtk
```

#### 変更コマンド

```sh
LANG=C xdg-user-dirs-gtk-update
```

コマンド実行後、確認のポップアップが出てくるので、アップデートを実行する。

`reboot`コマンドなどで再起動を行う。

### フォントのインストール

#### コード用

```sh
yay -S otf-source-han-code-jp
```

### 参考資料

- [Pacman-mirrors コマンドによるミラーサーバーリストの更新](https://wiki.manjaro.org/index.php?title=Pacman-mirrors%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AB%E3%82%88%E3%82%8B%E3%83%9F%E3%83%A9%E3%83%BC%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AA%E3%82%B9%E3%83%88%E3%81%AE%E6%9B%B4%E6%96%B0)
- [Manjaro Linux のインストール後の初期設定](http://haruka0000.hatenablog.com/entry/2016/09/09/130400)
- [Manjaro インストール直後にやること 12 選](https://in-my-mind.hatenablog.jp/entry/12things-to-do-after-installing-manjaro-2020-04-18)
- [Ubuntu でホームディレクトリの中身を英語にする](https://qiita.com/taiko19xx/items/d1a001bfc25245b91354)
- [blog.livewing.net](https://blog.livewing.net/install-arch-linux)
