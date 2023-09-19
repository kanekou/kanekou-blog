import PostPreview from "./post-preview";
import type Post from "../interfaces/post";

type Props = {
  posts: Post[];
  title: string;
};

const MoreStories = ({ posts, title = "パンうめえ🥯" }: Props) => {
  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="mb-8 text-5xl md:text-7xl font-kosugiMaru tracking-tighter leading-tight content-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 pb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
