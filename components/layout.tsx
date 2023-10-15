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
      <Meta />
      <div className="min-h-screen bg-blue-100">
        <Header />
        {preview && <Alert />}

        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
