import * as logos from "./images/logos";

const Footer = () => {
  return (
    <div className="p-5">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-8">
        {Object.keys(logos).map((logo) => {
          const Logo = logos[logo as keyof typeof logos]();
          return Logo.social ? Logo.jsx : null;
        })}
      </div>
    </div>
  );
};

export default Footer;
