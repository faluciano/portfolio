import {
  PythonLogo,
  JavaLogo,
  TSLogo,
  ReactLogo,
  JSLogo,
  TailwindLogo,
} from "components/images/logos";
import { Fade } from "react-awesome-reveal";

const Skills = () => {
  return (
    <div>
      <div className="text-center text-5xl">Skills</div>
      <Fade>
        <div className=" p-10 text-center">
          <a
            href="https://www.javascript.com/"
            className="mr-4 inline-flex h-20 w-20"
          >
            <JSLogo />
          </a>

          <a
            href="https://www.react.dev/"
            className="mr-4 inline-flex h-20 w-20"
          >
            <ReactLogo />
          </a>
          <a
            href="https://www.typescriptlang.org/"
            className="mr-4 inline-flex h-20 w-20"
          >
            <TSLogo />
          </a>
          <a
            href="https://www.java.com/en/"
            className="mr-4 inline-flex h-20 w-20"
          >
            <JavaLogo />
          </a>
          <a
            href="https://www.python.org/"
            className="mr-4 inline-flex h-20 w-20"
          >
            <PythonLogo />
          </a>
          <a
            href="https://tailwindcss.com/"
            className="mr-4 inline-flex h-20 w-20"
          >
            <TailwindLogo />
          </a>
        </div>
      </Fade>
    </div>
  );
};

export default Skills;
