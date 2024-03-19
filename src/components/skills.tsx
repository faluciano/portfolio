import * as logos from "./images/logos";
import { Fade } from "react-awesome-reveal";

const Skills = () => {
  return (
    <div>
      <div className="text-center text-5xl text-black dark:text-white">
        Skills
      </div>
      <Fade>
        <div className=" p-10 text-center">
          {Object.keys(logos).map((logo) => {
            const Logo = logos[logo as keyof typeof logos]();
            return Logo.social ? null : Logo.jsx;
          })}
        </div>
      </Fade>
    </div>
  );
};

export default Skills;
