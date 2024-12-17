import { dedent } from '@qnighy/dedent'

// ファイル名: generate-article-template.ts
function generateArticleTemplate() {
    const now = new Date();
    const jstOffset = 9 * 60 * 60 * 1000; // 日本時間 (UTC+9:00) のオフセット
    const jst = new Date(now.getTime() + jstOffset).toISOString().replace(
        "Z",
        "+09:00",
    );

    return dedent`\
        ---
        title: ""
        author: "takuyaw-w"
        category: ""
        tags:
          - a
        summary: ""
        license: "CC BY-NC-SA 4.0"
        created_at: ${jst}
        updated_at: ${jst}
        image: ""
        published: false
        ---`;
};

// 記事テンプレート生成
const articleTemplate = generateArticleTemplate();

// ファイルに保存
const fileName = `posts/new-article.md`;

await Deno.writeTextFile(fileName, articleTemplate);

console.log(`created successfully: ${fileName}`);
