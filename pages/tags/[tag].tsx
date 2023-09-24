import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import Post from "../../interfaces/post";
import Layout from "../../components/layout";
import Head from "next/head";
import { getAllTags, getPostsByTag } from "../../lib/api";

type Props = {
  posts: Post[];
  tag: string;
};

export default function Index({ posts, tag }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Tag: {tag}</title>
        </Head>
        <Container>
          <MoreStories posts={posts} title={tag} fromHome={false} />
        </Container>
      </Layout>
    </>
  );
}

type Params = {
  params: { tag: string };
};

export async function getStaticProps({ params }: Params) {
  const posts = getPostsByTag(params.tag, [
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ]);

  return {
    props: {
      posts: posts,
      tag: params.tag,
    },
  };
}

export async function getStaticPaths() {
  const tags = getAllTags();
  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag: tag,
        },
      };
    }),
    fallback: false,
  };
}
