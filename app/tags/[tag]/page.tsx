import Container from "../../../components/container";
import MoreStories from "../../../components/more-stories";
import Post from "../../../interfaces/post";
import Layout from "../../../components/layout";
import Head from "next/head";
import { getAllTags, getPostsByTag } from "../../../lib/api";

type Props = {
  params: {
    tag: string;
  };
};

export default async function Index({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostWithTag(tag);
  return (
    <>
      <Layout>
        <Head>
          <title>Tag: {tag}</title>
        </Head>
        <Container>
          <MoreStories posts={posts} title={tag} />
        </Container>
      </Layout>
    </>
  );
}

const getPostWithTag = async (tag: string): Promise<Post[]> => {
  // FIXME: 型ガードする
  return getPostsByTag(tag, [
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ]) as unknown as Post[];
};

export async function generateStaticParams() {
  const tags = getAllTags();
  const paths = tags.map((tag) => {
    return {
      tag: encodeURIComponent(tag),
    };
  });
  return paths;
}
