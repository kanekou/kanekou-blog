import type { Metadata } from "next";
import {
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "../lib/constants";
import "../styles/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// TODO: meta.tsxと情報を合わせる
export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    images: [SITE_OG_IMAGE],
  },
  twitter: { card: "summary_large_image" },
};
