import Container from "../../components/container";
import Link from "next/link";
import Head from "next/head";
import { getTagsCount } from "../../lib/api";
import { getTitleClass } from "../../components/more-stories";

type TagProps = {
  name: string;
  count: number;
};

type RankedTagProps = TagProps & {
  rank: number;
  tie: boolean;
};

export default async function Tags() {
  const tags = await getTags();
  const rankedTagsMap = getRankedTagsMap(tags);

  // 件数が上位3つのtagは，1位から順に大きなボタンサイズにする
  const getButtonStyle = (rank: number) => {
    const defaultButtonStyle =
      "bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-whitepl-2 px-4 border border-yellow-700 hover:border-transparent rounded-full";
    if (rank === 1) return `text-6xl ${defaultButtonStyle}`;
    if (rank === 2) return `text-4xl ${defaultButtonStyle}`;
    if (rank === 3) return `text-2xl ${defaultButtonStyle}`;

    return defaultButtonStyle;
  };

  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>
      <Container>
        <section className="max-w-4xl align-center mx-auto">
          <h2 className={getTitleClass()}>Tags</h2>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {rankedTagsMap.size > 0 &&
              Array.from(rankedTagsMap).map((tagInfo) => {
                const tagName = tagInfo[0];
                const rank = tagInfo[1];
                return (
                  <Link
                    key={tagName}
                    href={`/tags/${encodeURIComponent(tagName)}`}
                    className={getButtonStyle(rank)}
                  >
                    {tagName}
                  </Link>
                );
              })}
          </div>
        </section>
      </Container>
    </>
  );
}

const getTags = async (): Promise<TagProps[]> => {
  return getTagsCount();
};

const getRankedTagsMap = (tags: TagProps[]): Map<string, number> => {
  const orderedTags = tags
    .slice()
    .sort((a, b) => {
      return b.count - a.count;
    })
    .map((tag, index) => {
      return {
        name: tag.name,
        count: tag.count,
        rank: index + 1,
        tie: false,
      };
    });

  const orderdTagsWithTie = getRankWithTie(orderedTags);

  const orderdTagsMap = new Map();
  orderdTagsWithTie.forEach((tags) => orderdTagsMap.set(tags.name, tags.rank));

  return orderdTagsMap;
};

// add tie
const getRankWithTie = (orderedTags: RankedTagProps[]): RankedTagProps[] => {
  for (let k = 0; k < orderedTags.length; k++) {
    for (let h = 1; h < orderedTags.length + 1; h++) {
      if (orderedTags[k + h] === undefined) continue;
      if (orderedTags[k + h].tie === true) continue;

      if (orderedTags[k].count === orderedTags[h + k].count) {
        orderedTags[k].rank = k + 1;
        orderedTags[h + k].rank = k + 1;
        orderedTags[k].tie = true;
        orderedTags[h + k].tie = true;
      }
    }
  }
  return orderedTags;
};
