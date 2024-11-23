import { LinkCardInnerProps } from "../types";

const LinkCardError = ({ href }: LinkCardInnerProps): JSX.Element => {
  return (
    <a href={href} target="_blank" rel="norefferer">
      <p>ページを読み込めませんでした</p>
    </a>
  );
};

export default LinkCardError;
