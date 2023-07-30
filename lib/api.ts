import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export const getPostsByTag = (tag: string, fields: string[] = []) => {
  const slugs = getPostSlugs();

  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => post.tags.includes(tag))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

export const getAllTags = (): string[] => {
  const allPostTags = getAllPosts(["tags"])
    .flatMap((post) => post.tags)
    .sort();
  return Array.from(new Set(allPostTags));
};

export const getPostsByTags = () => {
  const allTags = getAllTags();
  const postsByTags = allTags.map((tag) => ({
    name: tag,
    // posts: getPostsByTag(tag, [
    //   "title",
    //   "date",
    //   "slug",
    //   "author",
    //   "coverImage",
    //   "excerpt",
    //   "tags",
    // ]),
    posts: getAllPosts([
      "title",
      "date",
      "slug",
      "author",
      "coverImage",
      "excerpt",
      "tags",
    ]),
  }));

  return postsByTags;
};
