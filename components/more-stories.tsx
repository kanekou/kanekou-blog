import PostPreview from "./post-preview";
import type Post from "../interfaces/post";

type Props = {
  posts: Post[];
  title: string;
  fromHome?: boolean;
};

const getTitleClass = (fromHome: boolean) => {
  return fromHome
    ? "mb-8 text-5xl md:text-7xl font-kosugiMaru tracking-tighter leading-tight content-center"
    : "mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight";
};

const MoreStories = ({ posts, title, fromHome = true }: Props) => {
  return (
    <section className="max-w-7xl mx-auto">
      <h2 className={getTitleClass(fromHome)}>{title}</h2>
      {/* FIXME: responsiveが働いていない　 */}
      <div className="grid grid-cols-2 gap-4 w-full mb-12">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
