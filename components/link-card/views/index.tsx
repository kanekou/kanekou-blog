import { Suspense } from "react";
import LinkCardInner from "./link-card-inner";
import LinkCardError from "./link-card-error";
import LinkCardSkeleton from "./link-card-skeleton";

type Props = {
  href: string;
  children: string;
};

// 参考:
// https://zenn.dev/dl10yr/articles/b49e70fe595c14
// https://github.com/y-hiraoka/stin-blog/blob/main/src/components/shared/RichLinkCard.tsx
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

  // NOTE: 目次の場合、同じtab内で遷移するようにする
  if (href.startsWith("#toc-")) {
    return <a href={href}>{children}</a>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default LinkCard;
