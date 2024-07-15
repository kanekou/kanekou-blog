import Alert from "./alert";
import Meta from "./meta";
import Header from "./header";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  const imageUrl = `${process.env.IMAGE_HOST}/image.png`;
  return (
    <>
      <Meta
        title="パンうめえ"
        description="kanekouの技術ブログです"
        url="https://kanekou-blog.web.app"
        type="blog"
        imageUrl={imageUrl}
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
