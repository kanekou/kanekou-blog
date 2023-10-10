import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  slug: string;
  tags: string[];
};

const PostPreview = ({ title, coverImage, date, slug, tags }: Props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <CoverImage slug={slug} title={title} src={coverImage} />
      <div className="px-6 py-4">
        <Link
          as={`/posts/${encodeURIComponent(slug)}`}
          href="/posts/[slug]"
          aria-label={title}
        >
          <div className="font-bold text-xl mb-2">{title}</div>
        </Link>
        <p className="text-gray-700 text-base">
          <DateFormatter dateString={date} />
        </p>
      </div>
      <div className="px-6 pb-2">
        {tags.map((tag) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <a href={`/tags/${encodeURIComponent(tag)}`}>{tag}</a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostPreview;
