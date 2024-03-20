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
        description="kanekouの技術ブログです"
        url="https://kanekou-blog.web.app"
        type="blog"
        imageUrl="https://kanekou-blog.web.app/image.jpg"
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
