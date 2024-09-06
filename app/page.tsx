import type { Metadata } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";
import Layout from "../components/layout";

export const metadata: Metadata = {
  title: "yummy yummy bread",
};

export default async function Page() {
  const allPosts = await getPosts();
  return (
    <>
      <Layout>
        <Container>
          {allPosts.length > 0 && (
            <MoreStories posts={allPosts} title="Articles" />
          )}
        </Container>
      </Layout>
    </>
  );
}

const getPosts = async (): Promise<Post[]> => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ]) as unknown as Post[];

  return allPosts;
};
