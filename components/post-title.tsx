import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-5xl md:text-7xl font-kosugiMaru tracking-tighter leading-tight md:leading-none mb-12 text-center">
      {children}
    </h1>
  );
};

export default PostTitle;
