import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./code-block";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="prose max-w-2xl mx-auto">
      <Markdown
        children={content}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{ code: CodeBlock }}
      />
    </div>
  );
};

export default PostBody;
