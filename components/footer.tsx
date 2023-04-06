import { GithubLogo, LinkedinLogo } from "./images/logos";

const Footer = () => {
  return (
    <div className="p-10 text-center">
      <a
        href="https://www.github.com/faluciano"
        className="mr-4 inline-flex items-center text-center"
      >
        <GithubLogo />
      </a>
      <a
        href="https://www.linkedin.com/in/felix-luciano-salomon-6266021b6/"
        className="mr-4 inline-flex items-center text-center"
      >
        <LinkedinLogo />
      </a>
    </div>
  );
};

export default Footer;
