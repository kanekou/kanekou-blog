import { Meta } from "../app/posts/[slug]/page";
import { parse } from "node-html-parser";
import { Suspense } from "react";

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
          <LinkCardInner href={url.href} />
        </Suspense>
      </>
    );
  }

  return (
    <a href={href} target="_blank" rel="norefferer">
      {children}
    </a>
  );
};

export default LinkCard;

const LinkCardInner = async ({
  href,
}: LinkCardErrorProps): Promise<JSX.Element> => {
  const meta = await getMetaData(href);
  if (!meta) {
    return <LinkCardError href={href} />;
  }
  return (
    <a
      href={href}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row"
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex flex-col justify-between p-4 leading-normal overflow-hidden">
        <div className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          {meta.title}
        </div>
        <div className="truncate mb-3 font-normal text-gray-700">
          {meta.description}
        </div>
      </div>
      {meta.image && (
        <img
          className="object-cover w-full md:h-full md:w-48 "
          src={meta.image}
          alt={meta.title}
        />
      )}
    </a>
  );
};

type LinkCardErrorProps = {
  href: string;
};

const LinkCardError = ({ href }: LinkCardErrorProps): JSX.Element => {
  return (
    <a href={href} target="_blank" rel="norefferer">
      <p>ページを読み込めませんでした</p>
    </a>
  );
};

// urlのメタデータを取得
const getMetaData = async (url: string): Promise<Meta | null> => {
  const metaData: Meta = { url, title: "", description: "", image: "" };
  // FIXME: Error Boundary使えるかも
  try {
    const res = await fetch(url);
    const text = await res.text();
    const doms = parse(text);
    const metas = doms.getElementsByTagName("meta");

    for (const meta of metas) {
      const np = meta.getAttribute("property");
      if (typeof np !== "string") continue;
      if (np === "og:title") {
        metaData.title = meta.getAttribute("content") ?? "";
      }
      if (np === "og:description") {
        metaData.description =
          meta.getAttribute("content")?.slice(0, 100) ?? "";
      }
      if (np === "og:image") {
        metaData.image = meta.getAttribute("content") ?? "";
      }
    }
  } catch (e) {
    console.error(e);
    return null;
  }
  return metaData;
};
