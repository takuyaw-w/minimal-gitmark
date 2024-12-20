---
title: "Laravel sailのシェルスクリプトの中身を見てみる。"
author: "takuyaw-w"
category: "Tech"
tags:
  - "Laravel"
  - "Sail"
  - "Docker"
  - "Shell Script"
  - "PHP"
summary: "Laravel Sailのシェルスクリプトを調査し、バージョン指定可能な形に改良した記録。"
license: "CC BY-NC-SA 4.0"
created_at: 2023-07-13T02:12:53.0+09:00
updated_at: 2023-07-13T02:12:53.0+09:00
image: ""
published: false
---

Laravel の環境構築に便利な sail。`curl`コマンド一発で呼び出せて、with である程度好きな構成で立ち上げられる。  
しかし、バージョンを指定して構築できない。

適当に素振りする程度だとあまり困らないが、ハンズオン的な資料を見つつやるとディレクトリ構成などがバージョン毎に異なっていて戸惑うことがある。  
バージョン指定できない理由がわからないため、とりあえずシェルスクリプトの中身を見てみることにしてみた。

## シェルスクリプトを覗いてみる

以下の URL をクリックすることで、ブラウザ上でシェルスクリプトの中身が見れる。  
[https://laravel.build/project_name]

または、`curl`コマンドを利用してローカル上にファイルを作成する  
`curl https://laravel.build/project_name -o laravelsail.sh`

とりあえず以下に展開してみる。あまり中身難しくなくてホッとした。  
わかる範囲で、コメントを付けてみた。

```sh
# Dockerの有無確認
docker info > /dev/null 2>&1

# Ensure that Docker is running...
if [ $? -ne 0 ]; then
    echo "Docker is not running."

    exit 1
fi

docker run --rm \
    --pull=always \
    -v "$(pwd)":/opt \
    -w /opt \
    laravelsail/php82-composer:latest \
    bash -c "laravel new project_name && cd project_name && php ./artisan sail:install --with=mysql,redis,meilisearch,mailpit,selenium " # laravel/installerを利用してLaravelを構築して、sailをインストールしている

# プロジェクトフォルダに移動
cd project_name

# ここはよくわからない。なぜこの条件…？
# Allow build with no additional services..
if [ "mysql redis meilisearch mailpit selenium" == "none" ]; then
    ./vendor/bin/sail build
else
    ./vendor/bin/sail pull mysql redis meilisearch mailpit selenium
    ./vendor/bin/sail build
fi

CYAN='\033[0;36m'
LIGHT_CYAN='\033[1;36m'
BOLD='\033[1m'
NC='\033[0m'

echo ""

# 構築したディレクトリ配下の所有者を$USER変更
if sudo -n true 2>/dev/null; then
    sudo chown -R $USER: .
    echo -e "${BOLD}Get started with:${NC} cd project_name && ./vendor/bin/sail up"
else
    echo -e "${BOLD}Please provide your password so we can make some final adjustments to your application's permissions.${NC}"
    echo ""
    sudo chown -R $USER: .
    echo ""
    echo -e "${BOLD}Thank you! We hope you build something incredible. Dive in with:${NC} cd project_name && ./vendor/bin/sail up"
fi
```

Laravel のインストールには[laravel/installer](https://github.com/laravel/installer)を利用している。  
この laravel/installer がバージョン指定できず、必ず最新の Laravel のバージョンを取得しているよう。なんでだろう。

Laravel の特定のバージョンを指定してインストールしたい場合には、laravel/installer を利用せず、composer 経由でインストールを行えば良い。  
コマンドとしては以下のようになる。  
`composer create-project "laravel/laravel={{ version_number }}" dirname`

## シェルスクリプトをバージョン指定できるように変更してみる。

先程の項で、シェルスクリプトを覗いた結果、どこの部分を変更すれば Laravel の特定のバージョンを指定できるかがわかったので、それを反映してみる。

```sh
docker info >/dev/null 2>&1

# Ensure that Docker is running...
if [ $? -ne 0 ]; then
    echo "Docker is not running."

    exit 1
fi

docker run --rm \
    --pull=always \
    -v "$(pwd)":/opt \
    -w /opt \
    laravelsail/php82-composer:latest \
    bash -c "composer create-project 'laravel/laravel={{ version }}'  {{ project_name }} && cd {{ project_name }} && php ./artisan sail:install --with=mysql,redis,meilisearch,mailpit,selenium "

cd {{ project_name }}

# Allow build with no additional services..
if [ "mysql redis meilisearch mailpit selenium" == "none" ]; then
    ./vendor/bin/sail build
else
    ./vendor/bin/sail pull mysql redis meilisearch mailpit selenium
    ./vendor/bin/sail build
fi

CYAN='\033[0;36m'
LIGHT_CYAN='\033[1;36m'
BOLD='\033[1m'
NC='\033[0m'

echo ""

if sudo -n true 2>/dev/null; then
    sudo chown -R $USER: .
    echo -e "${BOLD}Get started with:${NC} cd project_name && ./vendor/bin/sail up"
else
    echo -e "${BOLD}Please provide your password so we can make some final adjustments to your application's permissions.${NC}"
    echo ""
    sudo chown -R $USER: .
    echo ""
    echo -e "${BOLD}Thank you! We hope you build something incredible. Dive in with:${NC} cd project_name && ./vendor/bin/sail up"
fi
```

大した変更はしてなくて、`laravel new`しているところを`composer create-project`としただけ。
使う機会あるかわからないけど、自分向けに。  
with の部分や devcontainer はお好きなように。
