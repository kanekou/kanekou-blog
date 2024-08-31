import type { Metadata } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";

export const metadata: Metadata = {
  title: "yummy yummy bread",
};

async function getPosts(): Promise<Post[]> {
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
}

export default async function Page() {
  const allPosts = await getPosts();
  console.log("allPosts", allPosts);
  return (
    <>
      <Container>
        {allPosts.length > 0 && (
          <MoreStories posts={allPosts} title="Articles" />
        )}
      </Container>
    </>
  );
}
