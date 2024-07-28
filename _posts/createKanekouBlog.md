---
title: "Next.jsで個人ブログを作成しました"
excerpt: "フロントエンド技術を学びつつ何か成果物を作りたい！のモチベで技術ブログを作成しました。それがこのサイトです。"
coverImage: "/assets/blog/createKanekouBlog/ogp.png"
date: "2024-07-28"
ogImage:
  url: "/assets/blog/createKanekouBlog/ogp.png"
tags:
  - "フロントエンド"
  - "個人ブログ"
  - "tag1"
---

## 目次

## はじめに

フロントエンド技術を学びつつ何か成果物を作りたい！のモチベで技術ブログを作成しました。それがこのサイトです。サイトとしてはまだまだシンプルですが、これから追加機能を月足していく予定です。

## 仕様技術

- CI/CD: Github Actions
- ホスティング：Firebase Hosting
- ブログ機能：Next.js(SSG)、React、TypeScript
- デザイン：Tailwind CSS

この記事では言及してないのですが、デプロイフローをざっくりいうと下記になります。[エンジニアなら自分でブログを作れ！① 導入編](https://zenn.dev/miketako3/articles/9b2b1a9ec13901)のサイトを参考に実装しました。

- github に push → github actions 上で ssg → firebase に自動テプロイ

## 主な機能

- 記事管理
- tag 機能
- レスポンシブ対応

## 記事管理

主に以下の機能構成になります

- 記事一覧表示(Articles 画面)
  - 日付の降順で記事をソート
  - 画像またはタイトルクリックで記事詳細の画面遷移
  - タグをクリックで tag 別記事一覧画面に遷移
- 記事詳細表示
  - マークダウン記事を HTML で表示
  - 記事内のコードブロックのスタイリング
  - 目次機能
- OGP

### マークダウン記事を HTML で表示

例をこちらの[サンプルページ](https://kanekou-blog.web.app/posts/hello-world/)に載せました。

[react-markdown](https://github.com/remarkjs/react-markdown)を用いてマークダウンを HTML 化しています。react-markdown 採用の理由としては以下となります。

- 拡張性が高い(プラグインが豊富)
- 記述がシンプル
- `dangerouslySetInnerHTML` を使用せずに記載が可能

react-markdown の使用例は以下となります。

```jsx:post-body.tsx(一部抜粋)
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./code-block";

<Markdown
  children={content}
  rehypePlugins={[rehypeRaw, rehypeSlug]}
  remarkPlugins={[remarkGfm, [remarkToc, { maxDepth: 2, heading: "目次" }]]}
  components={{ code: CodeBlock }} //コードブロックを表示する独自コンポーネント
/>;
```

使いたいプラグインを npm install し、rehypePlugins と remarkPlugins に指定することで使用します。

[rehype](https://github.com/rehypejs/rehype) とはプラグインを使用して HTML を変換するツールです。また、[remark](https://github.com/remarkjs/remark)はプラグインを使用してマークダウンを変換するツールです。[Remark で広げる Markdown の世界](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html)という記事に rehype と remark によるマークダウン処理の流れが解説されており、参考になると思います。

それぞれの plugins で指定したプラグインは以下です。

- [rehypeRaw](https://github.com/rehypejs/rehype-raw): マークダウン内で HTML タグを使えるようにする
- [remarkToc](https://github.com/remarkjs/remark-toc): 目次作成に用いるプラグイン
- [rehypeSlug](https://github.com/rehypejs/rehype-slug): 見出しに id 属性を追加(remarkToc を組み合わせて目次作成に用いる)
- [remarkGfm](https://github.com/remarkjs/remark-gfm): Github 風のマークダウン仕様に対応

### 記事内のコードブロックのスタイリング

コードブロックを表示する独自コンポーネントを定義しました。こちらを`post-body.tsx`の reack-markdown コンポーネントの引数に指定することで、コードブロックのスタイリングを実現しています。以下の記事を参考にしました。

- [Next.js でブログを作ってみました](https://zenn.dev/redpanda/articles/ab0832ce800bf3)

- [react-markdown でコードをシンタックスハイライトさせる](https://goodlife.tech/posts/react-markdown-code-highlight.html)

- [react-syntax-highlighter
  /
  react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

```jsx:code-block.tsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  className: any;
  children: string;
};

const CodeBlock = ({ className, children, ...rest }: Props) => {
  const match = /language-(\w+)(:.+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  const name = match && match[2] ? match[2].slice(1) : "";

  return match ? (
    <>
      {name && (
        <span className="rounded-md bg-stone-200 py-1 px-2 text-sm dark:bg-stone-600 text-white">
          {name}
        </span>
      )}
      <SyntaxHighlighter
        {...rest}
        style={a11yDark}
        language={lang}
        children={children.replace(/\n$/, "")}
        className="border-2 text-base dark:border-stone-400 md:text-lg"
        showLineNumbers={true}
      />
    </>
  ) : // 改行が含まれている場合、コードブロックで表示。そうでない場合、インラインで表示。
  containNewline(children) ? (
    <code {...rest}>{children}</code>
  ) : (
    <code
      {...rest}
      className="mx-1 rounded-md bg-stone-200 py-1 px-2 text-red-600"
    >
      {children}
    </code>
  );
};

export default CodeBlock;

const containNewline = (str: string): boolean => {
  const newlinePattern = /\r\n|\n|\n/;
  return newlinePattern.test(str);
};
```

コードブロックは三パターン存在し、それぞれで style を分けています。

1. プログラミング言語とファイル名が指定された場合のコードブロック
2. 上記以外のコードブロック
3. インラインブロック

1 の場合は、React SyntaxHighlighter を用いてシンタックスハイライトをつけました。style は色々指定できますが、私は`a11yDark`を指定しています。

2 と 3 ですが、style を区別させるため、対象コンテンツ内に改行が含まれているかで判定処理を行なっています(23 行目参照)。

### 目次作成

remarkToc と rehypeSlug プラグインを使用して記事の上部に目次を作成しました。

まず remarkToc と rehypeSlug をインストールし、ReactMarkdown の`remarkPlugins`と`rehypePlugins`にそれぞれ追加します。

```jsx:post-body.tsx(一部抜粋)
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./code-block";

<Markdown
  children={content}
  rehypePlugins={[rehypeRaw, rehypeSlug]}
  remarkPlugins={[remarkGfm, [remarkToc, { maxDepth: 2, heading: "目次" }]]}
  components={{ code: CodeBlock }} //コードブロックを表示する独自コンポーネント
/>;
```

導入後、マークダウンで以下のように記載してみます。

```markdown
## 目次

## History

〜

## Lorem Ipsumm

〜
```

すると、下記画像のように出力されます。

![目次](https://kanekou-blog.web.app/assets/blog/createKanekouBlog/tableOfContents.png)

目次を押下すると、対象箇所にジャンプできます。

### OGP

記事毎の OGP のイメージと、それ以外のページの OGP を分けて指定できるようにしました。

↓ 本記事の OPG 表示イメージ(X)
![本記事のOPG](https://kanekou-blog.web.app/assets/blog/createKanekouBlog/homeOGP.png)

↓ 記事以外の OPG 表示イメージ(X)
![記事以外のOPG](https://kanekou-blog.web.app/assets/blog/createKanekouBlog/articleOGP.png)

## tag 管理

主に以下の機能になります。

- tag 一覧画面(Tags)
  - 参照回数に応じてタグの大きさ変動
- tag 別記事一覧画面

### 参照回数に応じてタグの大きさ変動

tag 一覧画面にて、参照回数が多いタグほど、tag ボタンが大きくなるようにしました。「TOP 1,2,3,それ以下」と大きさが変わります。内部で tag の参照回数を降順ソートして算出しています。

```jsx:pages/tags/index.tsx(一部抜粋)
type TagProps = {
  name: string,
  count: number,
};

type TagsProps = {
  tags: TagProps[],
};

export default function Tags({ tags }: TagsProps) {
  // 参照回数毎にTagをランク付け
  const rankedTagsMap = getRankedTagsMap(tags);

  // 件数が上位3つのtagは，1位から順に大きなボタンサイズにする
  const getButtonStyle = (rank: number) => {
    const defaultButtonStyle =
      "bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-whitepl-2 px-4 border border-yellow-700 hover:border-transparent rounded-full";
    if (rank === 1) return `text-6xl ${defaultButtonStyle}`;
    if (rank === 2) return `text-4xl ${defaultButtonStyle}`;
    if (rank === 3) return `text-2xl ${defaultButtonStyle}`;

    return defaultButtonStyle;
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Tags</title>
        </Head>
        <Container>
          <section className="max-w-4xl align-center mx-auto">
            <h2 className={getTitleClass()}>Tags</h2>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              {rankedTagsMap.size > 0 &&
                Array.from(rankedTagsMap).map((tagInfo) => {
                  const tagName = tagInfo[0];
                  const rank = tagInfo[1];
                  return (
                    <Link
                      href={`/tags/${encodeURIComponent(tagName)}`}
                      className={getButtonStyle(rank)}
                    >
                      {tagName}
                    </Link>
                  );
                })}
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
}
```

以下のように表示されます。現状 tag の数が少なく、一位と二位しかないです 🙇‍♂️
![本記事のOPG](https://kanekou-blog.web.app/assets/blog/createKanekouBlog/tags.png)

## レスポンシブ対応

TailwindCSS を使用し、レスポンシブデザインに対応しています。具体的には css の class を指定する際に、`sm`や`md`などと指定することで画面の大きさに応じてデザインが変更するようにしています。

例として、記事一覧画面では以下のように class が指定されており、width が 640px 以上で`grid-cols-2`が適応されます。

```jsx:more-stories.tsx(一部抜粋)
<div className="grid sm:grid-cols-2 gap-4 mb-12 w-full">
```

↓ 640px 以上の場合
![640px以上](https://kanekou-blog.web.app/assets/blog/createKanekouBlog/responsive640OrMore.png)
↓ 640px 未満の場合
![640px未満](https://kanekou-blog.web.app/assets/blog/createKanekouBlog/responsiveUnder640.png)

tailwindcss のこちらのサイトを参考にしました。

- [Responsive Design](https://tailwindcss.com/docs/responsive-design)

## 今後追加したい機能

- 記事毎に OGP を動的生成
- さまざまなブログサービスを記事一覧にまとめて表示
- profile ページ作成
- SEO 対策
- いいね！機能
- microCMS と組み合わせた JamStack 構成
- dark mode
- URL のプレビュー表示

## 最後に

使用者が自分しかいないので、色々機能を考えて試せるのがとても面白いです。これからさらに鬼カスタマイズしていきたい気持ちです。

## 参考サイト

- [エンジニアなら自分でブログを作れ！① 導入編](https://zenn.dev/miketako3/articles/9b2b1a9ec13901)

- [エンジニアなら自分でブログを作れ！② テンプレ理解編](https://zenn.dev/miketako3/articles/bfdc1b09ba8ed3)

- [エンジニアなら自分でブログを作れ！③Markdown のカスタマイズ編](https://zenn.dev/miketako3/articles/66e1cc17193168)

- [エンジニアなら自分でブログを作れ！④ レイアウト変更編](https://zenn.dev/miketako3/articles/2afb29824e578d)

- [エンジニアなら自分でブログを作れ！⑤ タグ機能実装編](https://zenn.dev/miketako3/articles/519f5fbd1f5042)

- [Next.js でブログを作ってみました](https://zenn.dev/redpanda/articles/ab0832ce800bf3)

- [react-markdown でコードをシンタックスハイライトさせる](https://goodlife.tech/posts/react-markdown-code-highlight.html)

- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

- [rehype-raw](https://github.com/rehypejs/rehype-raw)

- [rehype-slug](https://github.com/rehypejs/rehype-slug)

- [rehype-toc](https://github.com/Microflash/rehype-toc)

- [remark-gfm](https://github.com/remarkjs/remark-gfm)

- [react-markdown と react-syntax-highlighter を利用して、コードブロックをカスタマイズする](https://www.newt.so/docs/tutorials/customize-code-block-using-react-markdown)

- [Remark で広げる Markdown の世界](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html)

- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
