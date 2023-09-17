import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-blue-600">
      <div className="text-xl md:text-2xl font-bold mb-20 h-16 text-white flex flex-wwap items-center justify-between px-3">
        <div>パンうめえ🥯</div>
        <div className="relative space-x-8 ">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/tags" className="hover:underline">
            Tags
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
