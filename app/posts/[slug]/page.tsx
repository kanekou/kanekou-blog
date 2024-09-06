import Container from "../../../components/container";
import PostBody from "../../../components/post-body";
import PostHeader from "../../../components/post-header";
import Layout from "../../../components/layout";
import { getPostBySlug, getAllPosts } from "../../../lib/api";
import Head from "next/head";
import type PostType from "../../../interfaces/post";

export default async function Post({ params }: any) {
  const post = await getPost(params.slug);
  const ogImage = `${process.env.NEXT_PUBLIC_IMAGE_HOST}${post.ogImage.url}`;
  if (!post?.slug) {
    // TODO: 後に404pageを追加する
    return "not found page";
  }
  return (
    <Layout ogImage={ogImage}>
      <Container>
        <>
          <Head>
            <title>{post.title}</title>
          </Head>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            tags={post.tags}
          />
          <PostBody content={post.content} />
        </>
      </Container>
    </Layout>
  );
}

const getPost = async (slug: string): Promise<PostType> => {
  const post = getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "tags",
  ]) as unknown as PostType;

  return post;
};

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  const paths = posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
  return paths;
}
