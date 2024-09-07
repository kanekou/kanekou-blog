import Alert from "./alert";
import Header from "./header";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview = false, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header />
      {preview && <Alert />}

      <main>{children}</main>
    </div>
  );
};

export default Layout;
