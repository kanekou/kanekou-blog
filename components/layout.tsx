import Alert from "./alert";
import Meta from "./meta";
import Header from "./header";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta
        title="パンうめえ🥯"
        description="kanekou's dev blog"
        url="https://kanekou-blog.web.app"
        type="blog"
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
