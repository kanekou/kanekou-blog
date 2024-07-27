import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  className: any;
  children: string;
};

const CodeBlock = ({ className, children, ...rest }: Props) => {
  const match = /language-(\w+)(:.+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  const name = match && match[2] ? match[2].slice(1) : "";

  return match ? (
    <>
      {name && (
        <span className="rounded-md bg-stone-200 py-1 px-2 text-sm dark:bg-stone-600 text-white">
          {name}
        </span>
      )}
      <SyntaxHighlighter
        {...rest}
        style={a11yDark}
        language={lang}
        children={children.replace(/\n$/, "")}
        className="border-2 text-base dark:border-stone-400 md:text-lg"
      />
    </>
  ) : // 改行が含まれている場合、コードブロックで表示。そうでない場合、インラインで表示。
  containNewline(children) ? (
    <code {...rest}>{children}</code>
  ) : (
    <code
      {...rest}
      className="mx-1 rounded-md bg-stone-200 py-1 px-2 text-red-600"
    >
      {children}
    </code>
  );
};

export default CodeBlock;

const containNewline = (str: string): boolean => {
  const newlinePattern = /\r\n|\n|\n/;
  return newlinePattern.test(str);
};
