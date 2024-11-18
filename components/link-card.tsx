import { Meta } from "../app/posts/[slug]/page";
import { parse } from "node-html-parser";
import { Suspense } from "react";
import LinkCardInner from "./link-card-inner";
import { useState } from "react";

type Props = {
  href: string;
  children: string;
};

// 参考：https://zenn.dev/dl10yr/articles/b49e70fe595c14
const LinkCard = ({ children, href }: Props): JSX.Element => {
  if (children === href) {
    const url = new URL(href);
    if (!url) {
      return <LinkCardError href={href} />;
    }

    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
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

type LinkCardInnerProps = {
  href: string;
};

const LinkCardError = ({ href }: LinkCardInnerProps): JSX.Element => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <p>ページを読み込めませんでした</p>
    </a>
  );
};
