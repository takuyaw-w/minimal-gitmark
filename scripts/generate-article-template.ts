import { dedent } from "@qnighy/dedent";

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

const articleTemplate = generateArticleTemplate();
const fileName = `contents/new-article/index.md`;

await Deno.mkdir("contents/new-article");
await Deno.writeTextFile(fileName, articleTemplate);

console.log(`created successfully: ${fileName}`);
