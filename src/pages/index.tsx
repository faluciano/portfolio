import { type NextPage } from "next";
import Image from "next/image";
import Me from "public/Me.jpeg";
import { Fade } from "react-awesome-reveal";
import Footer from "components/footer";
import Projects from "components/projects";
import Contact from "components/contact";
import Skills from "components/skills";
//import { api } from "~/utils/api";

const Home: NextPage = () => {
  //const github = api.projects;
  return (
    <div>
      <HomeContent />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

const HomeContent = () => {
  return (
    <div
      id="about"
      className="mx-auto grid grid-cols-12 gap-5 p-11 text-black dark:text-white"
    >
      <div className="col-span-12 rounded-lg p-8 text-left align-top sm:col-span-7">
        <Fade triggerOnce={true}>
          <div className="text-6xl">Hi, I&apos;m Felix</div>
        </Fade>
        <Fade duration={3000}>
          <div className="mt-2 text-xl dark:text-gray-400">
            Software Engineer
          </div>
        </Fade>
        <Fade duration={7000}>
          <div className="ml-5 text-xl">
            <p>
              Hi, my name is Felix and I&apos;m a passionate Software Engineer
              with a love for solving complex problems and building cool ideas.
              I enjoy buiding fullstack web apps, mobile apps as well as
              automation scripts to simplify day to day tasks.
            </p>
            <p className="mt-6">
              Outside of my carrer I enjoy music and play the bass! I also enjoy
              boardgames and videogames as well as creating small projects with
              microcontrollers.
            </p>
            <p className="mt-6">
              Feel free to look around my portfolio which was built with Next.js
              and Tailwind!
            </p>
          </div>
        </Fade>
        <a href="Felix 2024 Resume.pdf" download="Felix-Luciano.pdf">
          <button className="mt-5 h-10 rounded-lg bg-teal-500 px-5 dark:bg-teal-900">
            CV
          </button>
        </a>
      </div>
      <div className="col-span-12 rounded-lg p-16 sm:col-span-5 md:max-h-96 md:max-w-md">
        <Image src={Me} alt="My Picture" className="rounded-lg" />
      </div>
    </div>
  );
};

export default Home;
