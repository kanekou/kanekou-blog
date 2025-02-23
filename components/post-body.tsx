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
  const linkPrefix: string = "toc-";
  return (
    <div className="prose mx-auto pb-8">
      <Markdown
        children={content}
        rehypePlugins={[rehypeRaw, [rehypeSlug, { prefix: linkPrefix }]]}
        remarkPlugins={[
          remarkGfm,
          [remarkToc, { maxDepth: 2, heading: "目次", prefix: linkPrefix }],
        ]}
        components={{ code: CodeBlock, a: LinkCard }}
      />
    </div>
  );
};

export default PostBody;
