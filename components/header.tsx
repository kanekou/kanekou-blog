import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-yellow-900 mb-10">
      <div className="text-xl md:text-2xl font-kosugiMaru h-16 text-white flex flex-wwap items-center justify-between px-3">
        <div>
          <Link href="/">パンうめえ🥯</Link>
        </div>
        <div className="relative space-x-8 font-mono">
          <Link href="/tags">Tags</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
