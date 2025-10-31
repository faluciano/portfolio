import type { NextComponentType } from "next";
import Link from "next/link";

const HeadNav: NextComponentType = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent/10 bg-white/70 backdrop-blur dark:bg-gray-900/70">
      <div className="container mx-auto flex items-center justify-start p-5">
        <div className="flex items-center gap-8">
          <Link href="/#about" className="text-lg font-semibold text-gray-800 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400">
            About
          </Link>
          <Link href="/#projects" className="text-lg font-semibold text-gray-800 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400">
            Projects
          </Link>
          <Link href="/#contact" className="text-lg font-semibold text-gray-800 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeadNav;
