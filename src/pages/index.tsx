import { type NextPage } from "next";
import Image from "next/image";
import Me from "public/Me.jpeg";
import { Fade } from "react-awesome-reveal";
import Footer from "components/footer";
import Projects from "components/projects";
import Contact from "components/contact";
import Skills from "components/skills";
// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    <div>
      <HomeContent />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

const HomeContent = () => {
  return (
    <div id="about" className="mx-auto grid grid-cols-12 gap-5 p-11">
      <div className="col-span-12 rounded-lg p-8 text-left align-top sm:col-span-7">
        <Fade>
          <div className="text-6xl">Hi, I&apos;m Felix</div>
        </Fade>
        <Fade duration={3000}>
          <div className="mt-2 text-xl text-gray-400">Software Engineer</div>
        </Fade>
        <Fade duration={7000}>
          <div className="ml-5 text-xl">
            Hi, my name is Felix and I&apos;m a passionate Software Engineer
            with a love for solving complex problems and building cool ideas. I
            graduated from the New Jersey Institute of Technology with a B.S. in
            Computer Science. Feel free to look around my portfolio!
          </div>
        </Fade>
        <a href="Resume-Revised-Felix.pdf" download="Felix-Luciano.pdf">
          <button className="mt-5 h-10 rounded-lg bg-teal-900 px-5">CV</button>
        </a>
      </div>
      <div className="col-span-12 rounded-lg p-16 sm:col-span-5">
        <Image src={Me} alt="My Picture" className="rounded-lg" />
      </div>
    </div>
  );
};

export default Home;
