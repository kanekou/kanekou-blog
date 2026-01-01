---
title: "個人ブログをPages RouterからApp Routerに移行しました"
excerpt: "個人ブログをApp Routerに移行したので、移行方法を共有します。"
coverImage: "/assets/blog/fromPagesToApp/cover.png"
date: "2024-09-22"
ogImage:
  url: "/assets/blog/fromPagesToApp/cover.png"
tags:
  - "個人ブログ"
  - "フロントエンド"
---

## 目次

## はじめに

個人ブログを App Router に移行したので、移行方法を大まかに共有します。

モチベとしては、App Router や React Server Component がどういうものなのか触ってみたかったのと、今後 Next.js は App Router をベースに機能が追加されると思うので早めに対応しておきたかったからです。

## 方針

公式サイトを参考に移行しました。

[From Pages to App](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration)

プルリクはこちらとなります。

https://github.com/kanekou/kanekou-blog/pull/59

## 手順

### [app ディレクトリの作成](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-1-creating-the-app-directory)

Next.js を最新 version にアップグレードします。

```bash
npm install next@latest
```

ルートディレクトリに`/app`ディレクトリを作成します。これから、こちらのディレクトリにファイルを移行していきます。

### [ルートレイアウトの作成](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-2-creating-a-root-layout)

app ディレクトリ内に`app/layout.tsx`ファイルを作成します。こちらは、app 内のルート全てに適応されるルートレイアウトになります。ルートレイアウトは  `pages/_app.tsx`  と  `pages/_document.tsx`  ファイルを置き換えるため、それぞれのファイルの内容を移動します。

実際に作成した layout.tsx は以下となります。

```tsx:app/layout.tsx
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../lib/constants";
import "../styles/globals.css"; // グローバルなスタイルをインポート

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// メタデータ設定
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    images: "/image.png",
  },
  twitter: { card: "summary_large_image" },
};
```

**メタデータ**

App Router ではメタデータ(HTML 要素内のタグ`meta`など)を設定できる [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) が提供されています。直感的に設定できるので便利です。サイト全体で設定したい Metadata をこちらで記載します。なお、Metadata API への移行時に不要と判断した一部メタデータを削除しました(詳細は[こちら](https://github.com/kanekou/kanekou-blog/pull/59#issuecomment-2351649562))

favicon 等の画像に関しては、App Router 直下にファイルを直接記載すると Metadata として認識されます。 実際に以下のように`apple-icon.png`と`icon.ico`を配置しました。meta tag に自動設定されます。

```bash:
app
├── apple-icon.png //apple-touch-iconのmeta情報が設定される
├── icon.ico // iconのmeta情報が設定される
```

生成された HTML

```html:
<link
  rel="icon"
  href="/icon.ico?25f013661ec03646"
  type="image/x-icon"
  sizes="16x16"
/>
<link
  rel="apple-touch-icon"
  href="/apple-icon.png?abfc61e631cb7fe9"
  type="image/png"
  sizes="180x180"
/>
```

https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

ページ毎に meta 情報を設定したい場合、対象画面のページファイルで Metadata API を記載します。静的、または動的に Meta 情報を設定できます。下記に実装箇所のリンクを貼っておきます。

- [実装箇所 1 (静的に Meta 情報を設定)](https://github.com/kanekou/kanekou-blog/blob/fec7245b768cdf82951227919eb605b5446bd657/app/page.tsx#L8)

- [実装箇所 2 (動的に Meta 情報を設定)](https://github.com/kanekou/kanekou-blog/blob/fec7245b768cdf82951227919eb605b5446bd657/app/posts/[slug]/page.tsx#L13)

### [next/head の移行](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-3-migrating-nexthead)

pages ディレクトリでの next/head の React コンポーネントは、前述した MetadataAPI に置き換えられます。

実際に移行すると以下になります（一部記載を省略）

Pages Router

```tsx:pages/index.tsx
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <Head> // Before
          <title>{"yummy yummy bread"}</title>
        </Head>
        :
      </Layout>
    </>
  );
};
：
```

App Router

```tsx:app/page.tsx
import type { Metadata } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Post from "../interfaces/post";
import Layout from "../components/layout";

// After: Headの代わりとなる
export const metadata: Metadata = {
  title: "yummy yummy bread",
};

export default async function Page() {
  ：
};
：
```

### [ページの移行](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-4-migrating-pages)

本格的に各ページを App Router に入れ替えていきます。

[公式](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration)だと下記のように移行することが推奨されています

> Step 1: Move the default exported Page Component into a new Client Component.

> Step 2: Import the new Client Component into a new `page.js` file inside the `app` directory.

これは以下を指します。

- STEP1: pages ディレクトリにあった Page Component をクライアントコンポーネントとして定義
- STEP2: 新しく app ディレクトリ内に page.js を作成し、STEP1 で定義したクライアントコンポーネントを import

pages ディレクトリのコンポーネントは Cliant Component と同様の動きをするため、Cliant Compoent として定義し、ServerComponent から呼び出すことで移行コストを抑えられます。ただし、データ取得部分(`getServerSideProps`  と  `getStaticProps`)に関しては Server Compoent 側にロジックを移動する必要があります。データ取得部分の移動に関しては後述します。

今回の場合それほど画面の数が多くなかったので、移行コストはそれほどかからないと考え、全部のページファイルを app ディレクトリにｴｲﾔ！と移動し Server Component として定義しました。[公式サイト](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-4-migrating-pages)のファイルパスルーティングに則り、ファイルを以下のように移動しました。

Pages Router

```bash
pages
├── index.tsx
├── posts
│   └── [slug].tsx
└── tags
    ├── [tag].tsx
    └── index.tsx
```

App Router

```bash
app
├── page.tsx
├── posts
│   └── [slug]
│       └── page.tsx
└── tags
    ├── [tag]
    │   └── page.tsx
    └── page.tsx
```

[**ルーティング Hook の移動**](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks)

ルーティング関連の処理について、app ディレクトリだと`next/navigation`  からインポートされた 下記 3 つの新しいフックに置き換えられます。

- [useRouter()](https://ja.next-community-docs.dev/docs/app-router/api-reference/functions/use-router)
- [usePathname()](https://ja.next-community-docs.dev/docs/app-router/api-reference/functions/use-pathname)
- [useSearchParams()](https://ja.next-community-docs.dev/docs/app-router/api-reference/functions/use-search-params)

`useRouter()`フックは pages ディレクトリで使用できたものから新しくなりました。[公式](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks)では下記のように述べられています。

> The new `useRouter` hook is imported from `next/navigation` and has different behavior to the `useRouter` hook in `pages` which is imported from `next/router`.
>
> - The [`useRouter` hook imported from `next/router`](https://nextjs.org/docs/pages/api-reference/functions/use-router) is not supported in the `app` directory but can continue to be used in the `pages` directory.

pages で利用できる useRouter()は`next/router`  からインポートします。一方、新しく App Router で利用できる useRouter()は`next/navigation`  から import できます。

useRouter()の変更点の 1 つとして、`isFallback`メソッドが廃止されました(詳細な説明は[公式](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#replacing-fallback)をご覧ください)。移行作業において、この変更に対応する必要がありました。

本ブログの App Router 移行前の記事ページでは、getStaticPaths で設定できる `fallback` プロパティを使用して、ビルド時にプリレンダリングされないページの動作を定義していました。

Pages Router

```tsx:pages/posts/[slug].tsx
export default function Post({ post, preview }: Props) {
  const router = useRouter();
  ：
  // build時にレンダリングされていないページ、かつ記事データが存在しない場合にエラーページ表示。
  // そもそものfallback=falseの動きとして、
  // build時にレンダリングされていないページにアクセスした時点で404に飛ぶので、
  // 下記の判定文は不要だったかも？
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;　
  }
  ：
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false, // build時にレンダリングされていないページにアクセスすると404ページに飛ぶ
  };
}
```

今回の移行で、`next/router`から import した useRouter()の処理を削除しました。代わりとなるのが[config.dynamicParam](https://ja.next-community-docs.dev/docs/app-router/api-reference/file-conventions/route-segment-config#dynamicparams)プロパティです。

`config.dynamicParam=true`の場合、generateStaticParams で生成されたパラメータ以外のページにアクセスした際に動的にページが生成されます。false の場合、generateStaticParams に含まれていないパラメータのページにアクセスした場合は、404 ページにアクセスします。

よって、getStaticPaths の`fallback=false`は、`config.dynamicParam=false`に対応します。

しかし今回は`config.dynamicParam=true`で設定しました。理由は、将来的に ISR を使って記事情報を一定時間おきに自動取得したいからです。なお`config.dynamicParam=true`はデフォルト値なので、コード上の記述は省略しました。

[**データフェッチメソッドの移行**](https://ja.next-community-docs.dev/docs/app-router/building-your-application/upgrading/app-router-migration?_highlight=page#ステップ-6-データフェッチメソッドの移行)

App Router では、データの取得方法が変わりました。それに伴い各ページで対応付を行いました。

pages ディレクトリでは SSG の際、getStaticProps を使用してページのデータを取得します。一方 app ディレクトリでは、ServerComponent 内で getStaticProps 無しにデータ取得の処理を記載することができます。

Pages Router

```tsx:pages/posts/[slug].tsx
type Props = {
  post: PostType;
  preview?: boolean;
};

export default function Post({ post, preview }: Props) {
	 ：
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "tags",
  ]);
  const content = post.content;

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}
```

App Router

```tsx:app/posts/[slug]/page.tsx
type Props = {
  params: { slug: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
	// データの取得
  const post = await getPost(params.slug);
  ：
}

// データ取得メソッドの定義(Next側で関数名の指定はないです)
const getPost = async (slug: string): Promise<PostType> => {
  const post = getPostBySlug(slug, [
	  "title",
	  "date",
	  "slug",
	  "author",
	  "content",
	  "ogImage",
	  "coverImage",
	  "tags",
	]) as unknown as PostType;

	return post;
};
```

[**動的パス生成関数の移行**](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#dynamic-paths-getstaticpaths)

pages ディレクトリでは getStaticPaths 関数を使用し、ビルド時にプリレンダリングするパスを定義します。

app ディレクトリでは、getStaticPaths 関数が  [generateStaticParams](https://ja.next-community-docs.dev/docs/app-router/api-reference/functions/generate-static-params) 関数に置き換えられます。getStaticPaths 関数の返り値はプロパティに`params`を含みますが、 generateStaticParams 関数では省略されます。

Pages Router

```tsx:pages/posts/[slug].tsx
export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
```

App Router

```tsx:app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  const paths = posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
  return paths;
}
```

### [Tailwind CSS の設定](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#tailwind-css)

TailwindCSS を使用する場合、tailwind.config.js ファイルに app ディレクトリを追加する必要があります。

```tsx:tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 追加
    "./components/**/*.tsx",
    "./pages/**/*.tsx",
  ],
  ：
}
```

また、layout ファイルでグローバルスタイルをインポートする必要があります。

```tsx:app/layout.tsx
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../lib/constants";
import "../styles/globals.css"; // グローバルなスタイルをインポート
```

#### (補足)tailwind の読み込みエラー

移行中、layout ファイル内でグローバルスタイルが読み込めないエラーが発生しました。

```bash
./styles/globals.css
 ⨯ ./styles/globals.css.webpack[javascript/auto]!=!./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[12].use[2]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[12].use[3]!./styles/globals.css
TypeError: Cannot read properties of undefined (reading '700')
    at Array.reduce (<anonymous>)
Import trace for requested module:
./styles/globals.css.webpack[javascript/auto]!=!./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[12].use[2]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[12].use[3]!./styles/globals.css
```

グローバルスタイルのファイルをみると、tailwind の設定が読み込めていないようでした。

```css:globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

調べてみると、どうやら`@tailwindcss/typography`のバージョンが低いと Tailwind CSS v3 が上手く動かないと[issue](https://github.com/tailwindlabs/tailwindcss-intellisense/issues/587) で述べられており、`@tailwindcss/typography `を update すると解決しました。

ちなみに@tailwindcss/typography は、マークダウン記法に対応した HTML 要素をいい感じに綺麗に見せてくれる公式プラグインです。

https://github.com/tailwindlabs/tailwindcss-typography

---

以上が移行作業の大まかな流れとなります。

## おわりに

手順そのものは思ったよりシンプルでしたが、改めて Pages Router で何が行われているのか調べていると思ったより時間がかかりました。ですが Next.js の動きを知るいい機会になりました(Next.js は黒魔術的なものが多いようにも感じる。。。)。

小規模アプリということもあり、パフォーマンス面で App Router に移ったメリットは今のところ感じられていません。ですが、データ取得の処理がコロケーションで記載できることでコードの見通しがよくなったと感じます。

これから Suspense 機能や、キャッシュ機能を利用した[Request Memoization](https://nextjs.org/docs/app/building-your-application/caching#request-memoization) 等いろいろ実験的に使っていけたらな〜と思います。
