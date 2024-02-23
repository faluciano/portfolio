import * as logos from "./images/logos";

const Footer = () => {
  return (
    <div className="p-5 text-center items-center">
      {Object.keys(logos).map((logo) => {
        const Logo = logos[logo as keyof typeof logos]();
        return Logo.social ? (Logo.jsx) : null;
      })}
    </div>
  );
};

export default Footer;
