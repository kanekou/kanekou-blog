import Alert from "./alert";
import Header from "./header";
import Footer from "./footer";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};
// TODO: previewは不要なので、リファクタリング時に削除
const Layout = ({ preview = false, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header />
      {preview && <Alert />}

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
