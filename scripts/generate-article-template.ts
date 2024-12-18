import { dedent } from "@qnighy/dedent";

// ファイル名: generate-article-template.ts
function generateArticleTemplate() {
  const jst = Temporal.Now.instant().toString({ timeZone: "Asia/Tokyo" });

  return dedent`\
    ---
    title: ""
    author: "takuyaw-w"
    category: ""
    tags:
      - ""
    summary: ""
    license: "CC BY-NC-SA 4.0"
    created_at: ${jst}
    updated_at: ${jst}
    image: ""
    published: false
    ---
    `;
}

// 記事テンプレート生成
const articleTemplate = generateArticleTemplate();

// ファイルに保存
const fileName = `posts/new-article/index.md`;

await Deno.mkdir('posts/new-article')
await Deno.writeTextFile(fileName, articleTemplate);

console.log(`created successfully: ${fileName}`);
