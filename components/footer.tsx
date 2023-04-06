import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mx-auto grid grid-cols-10 gap-5 p-11">
      <a href="https://www.github.com/faluciano" className="col-span-5">
        <FaGithub color="black" size={"5em"} />
      </a>
      <a
        href="https://www.linkedin.com/in/felix-luciano-salomon-6266021b6/"
        className="col-span-5"
      >
        <FaLinkedin color="#0077b5" size={"5em"} />
      </a>
    </div>
  );
};

export default Footer;