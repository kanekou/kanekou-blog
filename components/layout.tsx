import Alert from "./alert";
import Meta from "./meta";
import Header from "./header";
import { SITE_OG_IMAGE } from "../lib/constants";

type Props = {
  preview?: boolean;
  ogImage?: string;
  children: React.ReactNode;
};

const Layout = ({ preview, ogImage = SITE_OG_IMAGE, children }: Props) => {
  return (
    <>
      <Meta
        title="パンうめえ"
        description="kanekouの技術ブログです"
        url="https://kanekou-blog.web.app"
        type="blog"
        ogImage={ogImage}
      />
      <div className="min-h-screen">
        <Header />
        {preview && <Alert />}

        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
