import { parse } from "node-html-parser";

export type Meta = {
  url: string;
  title: string;
  description: string;
  image: string;
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

export default getMetaData;
