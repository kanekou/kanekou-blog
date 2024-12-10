---
title: "個人ブログにリンクカードを追加しました"
excerpt: "個人ブログにリンクカード追加したので、実装内容を共有します。"
coverImage: "/assets/blog/addLinkCard/cover.png"
date: "2024-12-10"
ogImage:
  url: "/assets/blog/addLinkCard/cover.png"
tags:
  - "個人ブログ"
  - "フロントエンド"
---

## 目次

## はじめに

下記のような LinkCard を実装しました(当該実装の PR となります)。URL を 1 段落に記載すると、その URL のメタデータを取得してリンクカードとして表示されます。

https://github.com/kanekou/kanekou-blog/pull/66

## ファイル構成

```bash
components/link-card/
├── types
│   └── index.ts
└── views
    ├── index.tsx              //LinkCardコンポーネント。メインの呼び出し。
    ├── link-card-error.tsx    //LinkCardErrorコンポーネント。データの取得失敗時の描写。
    ├── link-card-inner.tsx    //LinkCardInnerコンポーネント。データ取得処理と、取得後の描写。
    └── link-card-skeleton.tsx //LinkCardSkeltonコンポーネント。データ取得中の描写。
```

## コンポーネントの相関図

![コンポーネント相関図](https://private-user-images.githubusercontent.com/23465233/394255883-eef9a280-79f2-4146-a5b3-7d8d5b5ef2b3.svg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM4MzIyOTcsIm5iZiI6MTczMzgzMTk5NywicGF0aCI6Ii8yMzQ2NTIzMy8zOTQyNTU4ODMtZWVmOWEyODAtNzlmMi00MTQ2LWE1YjMtN2Q4ZDViNWVmMmIzLnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjEwVDExNTk1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNhN2MzNGZiODE0NWJhOTU0NDYzNWExMTJhY2I1OTI4Y2M4NDRkYzQyMGUxMDQ0MGYzNzIzZDJkOTBiYzdjMjAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.uvCacp0rSnPvxxQMrgKbZ9IKFIW_DqpJh78JOI710cI)

## 実装内容

主な使用されているコンポーネントを取り上げます。

### PostBody Component

- markdown を表示する Component です。react-markdown を用いて markdown を HTML に変更しています。
- components に自作の LinkCard コンポーネントを指定することで、マークダウンの URL を解析してリンクカードに変換しています。

```jsx:components/post-body.tsx:
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./code-block";

import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import LinkCard from "./link-card/views";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="prose mx-auto pb-8">
      <Markdown
        children={content}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        remarkPlugins={[
          remarkGfm,
          [remarkToc, { maxDepth: 2, heading: "目次" }],
        ]}
        // LinkCard Componentを指定
        components={{ code: CodeBlock, a: LinkCard }}
      />
    </div>
  );
};
export default PostBody;

```

#### LinkCard Component

- リンクカードを表示するメインコンポーネントです。

```jsx:components/link-card/views/index.tsx
import { Suspense } from "react";
import LinkCardInner from "./link-card-inner";
import LinkCardError from "./link-card-error";
import LinkCardSkeleton from "./link-card-skeleton";

type Props = {
  href: string;
  children: string;
};

const LinkCard = ({ children, href }: Props): JSX.Element => {
  if (children === href) {
    const url = new URL(href);
    if (!url) {
      return <LinkCardError href={href} />;
    }

    return (
      <>
        <Suspense fallback={<LinkCardSkeleton />}>
          {/* @ts-ignore Server Component */}
          <LinkCardInner href={url.href} />
        </Suspense>
      </>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default LinkCard;
```

- ServerComponent を利用することで、非同期処理(async, await)を直感的に記載することができます。呼び出し元は suspense を用いることによりフェッチ中とフェッチ後の描写を行います。
- suspense を利用し、データを取得中はローディング状態としてスケルトン状態のリンクカードを表示するようにしています。データが取得されたのち、LinkCardInner コンポーネント内でリンクカードを描写しています。データ取得処理は LinkCardInner コンポーネント内で記述されています。
- 実装時点では typescript が非同期処理に対応していないため、`ts-ignore`で型チェックを無効化しています。
  https://github.com/vercel/next.js/issues/42292

### LinkCardInner Component

- リンクカードの中身を表示するコンポーネントです。
- データ取得処理もこちらに記載されています。

```jsx:components/link-card/views/link-card-inner.tsx
import getFavicon from "../../../lib/getFavicon";
import getMetaData from "../../../lib/getMetaData";
import LinkCardError from "./link-card-error";

type LinkCardInnerProps = {
  href: string;
};

const LinkCardInner = async ({
  href,
}: LinkCardInnerProps): Promise<JSX.Element> => {
	// データ取得処理
  const meta = await getMetaData(href);
  if (!meta) {
    return <LinkCardError href={href} />;
  }
  const url = new URL(href);
  return (
    <a
      href={href}
      className="flex bg-white border border-gray-200 rounded-lg shadow no-underline"
      target="_blank"
      rel="noreferrer"
    >
      <div className="justify-between p-4 leading-normal overflow-hidden">
        <div className="text-lg font-bold tracking-tight text-gray-900 line-clamp-2">
          {meta.title}
        </div>
        <div className="truncate font-normal text-gray-700">
          {meta.description}
        </div>
        <div className="text-[0.78em] flex mt-2 items-center overflow-hidden whitespace-nowrap">
          <img
            className="m-1"
            // favicon画像を取得
            src={getFavicon(url.hostname)}
            alt={meta.title}
          />
          <span className="text-gray-700 ml-1">{url.hostname}</span>
        </div>
      </div>
      {meta.image && (
        <img
          className="object-cover w-48 m-0 rounded-r-lg"
          src={meta.image}
          alt={meta.title}
        />
      )}
    </a>
  );
};

export default LinkCardInner;
```

## 感想

ServerComponent を用いると、データフェッチ処理を useEffect を用いず簡潔に記載することが可能です。useEffect を使用した場合、ステート管理と副作用に気を使う必要がありましたが、それらから解消され直感的に記載できるようになったのはかなり嬉しいポイントだと思います。

## 参考サイト

https://ja.react.dev/reference/rsc/server-components

https://zenn.dev/dl10yr/articles/b49e70fe595c14

https://github.com/y-hiraoka/stin-blog/blob/main/src/components/shared/RichLinkCard.tsx

https://blog.stin.ink/articles/update-blog-site-with-next-app-router
