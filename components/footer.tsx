import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="p-10">
      <a
        href="https://www.github.com/faluciano"
        className=" mb-1 mr-1 inline-flex items-center rounded-full border border-white bg-white p-2 text-center"
      >
        <FaGithub size={"2em"} className="self-center text-center text-black" />
      </a>
      <a
        href="https://www.linkedin.com/in/felix-luciano-salomon-6266021b6/"
        className=" mb-1 mr-1 inline-flex items-center rounded-full border border-white bg-white p-2 text-center"
      >
        <FaLinkedin
          size={"2em"}
          className="self-center text-center text-[#0077b5]"
        />
      </a>
    </div>
  );
};

export default Footer;
