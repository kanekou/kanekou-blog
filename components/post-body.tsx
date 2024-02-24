import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./code-block";

import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="prose max-w-2xl mx-auto">
      <Markdown
        children={content}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        remarkPlugins={[
          remarkGfm,
          [remarkToc, { maxDepth: 2, heading: "目次" }],
        ]}
        components={{ code: CodeBlock }}
      />
    </div>
  );
};

export default PostBody;
