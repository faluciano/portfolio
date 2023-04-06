import type { NextComponentType } from "next";
import { useRouter } from "next/router";

const HeadNav: NextComponentType = () => {
  const router = useRouter();
  return (
    <header className="w-full">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row ">
        <button
          className="title-font flex h-10 items-center rounded-lg px-5 text-lg font-bold transition-colors hover:bg-teal-900"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <nav className="mx-auto flex flex-wrap items-center justify-center text-lg">
          <button
            className="h-10 rounded-lg  px-5 transition-colors hover:bg-teal-900 lg:mr-10"
            onClick={() => window.location.replace("/#about")}
          >
            About
          </button>
          <button
            className="h-10 rounded-lg px-5 transition-colors hover:bg-teal-900 lg:mr-10"
            onClick={() => window.location.replace("/#projects")}
          >
            Projects
          </button>
          <button
            className="h-10 rounded-lg px-5 transition-colors hover:bg-teal-900"
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
