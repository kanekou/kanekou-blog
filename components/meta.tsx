import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "../lib/constants";

type Props = {
  title: string;
  description: string;
  url: string;
  type: string;
  imageUrl?: string;
};

// SEO改善のために適切に設定する
const Meta = ({
  title,
  description,
  url,
  type,
  imageUrl = HOME_OG_IMAGE_URL,
}: Props) => {
  return (
    <Head>
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" /> */}
      {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      <title>{title}</title>
      <meta name="description" content={`The kanekou's dev blog.`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
    </Head>
  );
};

export default Meta;
