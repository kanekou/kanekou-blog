import { Meta } from "../app/posts/[slug]/page";
import { parse } from "node-html-parser";

type LinkCardInnerProps = {
  href: string;
};

const LinkCardInner = async ({ href }: LinkCardInnerProps) => {
  const meta = await getMetaData(href);
  if (!meta) {
    return <LinkCardError href={href} />;
  }
  return (
    <a
      href={href}
      className="flex items-center bg-white border border-gray-200 rounded-lg shadow no-underline"
      target="_blank"
      rel="noreferrer"
    >
      <div className="justify-between p-4 leading-normal overflow-hidden">
        <div className="text-lg font-bold tracking-tight text-gray-900 line-clamp-2">
          {meta.title}
        </div>
        <div className="truncate mb-3 font-normal text-gray-700">
          {meta.description}
        </div>
      </div>
      {meta.image && (
        <img
          className="object-cover w-full h-full w-48"
          src={meta.image}
          alt={meta.title}
        />
      )}
    </a>
  );
};

export default LinkCardInner;

const LinkCardError = ({ href }: LinkCardInnerProps): JSX.Element => {
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
