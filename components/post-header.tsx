import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  tags: string[];
};

const PostHeader = ({ title, coverImage, date, tags }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="container mb-6 mx-auto max-w-4xl text-right">
        <DateFormatter dateString={date} />
      </div>
      <div className="container mx-auto max-w-4xl">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            <a href={`/tags/${encodeURIComponent(tag)}`}>{tag}</a>
          </span>
        ))}
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} src={coverImage} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
