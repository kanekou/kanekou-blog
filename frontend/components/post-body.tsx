import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./code-block";

import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import LinkCard from "./link-card/views";
import { TABLE_OF_CONTENTS_PREFIX } from "../lib/constants";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="prose mx-auto pb-8">
      <Markdown
        children={content}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSlug, { prefix: TABLE_OF_CONTENTS_PREFIX }],
        ]}
        remarkPlugins={[
          remarkGfm,
          [
            remarkToc,
            { maxDepth: 2, heading: "目次", prefix: TABLE_OF_CONTENTS_PREFIX },
          ],
        ]}
        components={{ code: CodeBlock, a: LinkCard }}
      />
    </div>
  );
};

export default PostBody;
