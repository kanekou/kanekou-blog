import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ className, children, ...rest }) => {
  const match = /language-(\w+)(:.+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  const name = match && match[2] ? match[2].slice(1) : "";

  return match ? (
    <>
      {name && (
        <span className="rounded-md bg-stone-200 py-1 px-2 text-sm dark:bg-stone-600 text-black">
          {name}
        </span>
      )}
      <SyntaxHighlighter
        {...rest}
        style={a11yDark}
        language={lang}
        children={String(children).replace(/\n$/, "")}
        className="border-2 text-base dark:border-stone-400 md:text-lg"
      />
    </>
  ) : (
    <>
      <code
        {...rest}
        className="mx-1 rounded-md bg-stone-200 py-1 px-2 text-red-600 dark:bg-stone-600 dark:text-red-300"
      >
        {children}
      </code>
    </>
  );
};

export default CodeBlock;
