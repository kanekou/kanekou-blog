import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-yellow-900">
      <div className="text-xl md:text-2xl font-kosugiMaru mb-20 h-16 text-white flex flex-wwap items-center justify-between px-3">
        <div>
          <Link href="/">パンうめえ🥯</Link>
        </div>
        <div className="relative space-x-8 font-mono">
          <Link href="/tags" className="hover:underline">
            Tags
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
