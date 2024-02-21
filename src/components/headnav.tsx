import type { NextComponentType } from "next";

const HeadNav: NextComponentType = () => {
  return (
    <header className="sticky top-0 z-50 w-full ">
      <div className="container mx-auto flex flex-col flex-wrap items-center  p-5 md:flex-row ">
        <nav className="mx-auto flex flex-wrap items-center justify-center text-lg">
          <button
            className="h-10 rounded-lg  px-5 text-black transition-colors hover:bg-teal-500 dark:text-white dark:hover:bg-teal-900 lg:mr-10"
            onClick={() => window.location.replace("/#about")}
          >
            About
          </button>
          <button
            className="h-10 rounded-lg px-5 text-black transition-colors hover:bg-teal-500 dark:text-white dark:hover:bg-teal-900 lg:mr-10"
            onClick={() => window.location.replace("/#projects")}
          >
            Projects
          </button>
          <button
            className="h-10 rounded-lg px-5 text-black transition-colors hover:bg-teal-500 dark:text-white dark:hover:bg-teal-900"
            onClick={() => window.location.replace("/#contact")}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HeadNav;
