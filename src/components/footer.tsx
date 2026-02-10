import * as logos from "./images/logos";
import CurrentYear from "./ui/current-year";

export default function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{
        borderColor: "rgb(var(--color-surface-elevated))",
        backgroundColor: "rgb(var(--color-surface) / 0.6)",
      }}
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap items-center justify-center gap-8"
          aria-label="Social media links"
        >
          {Object.keys(logos).map((logo) => {
            const Logo = logos[logo as keyof typeof logos]();
            return Logo.social ? Logo.jsx : null;
          })}
        </nav>
        <div className="mt-8 text-center">
          <p
            className="text-sm font-medium"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            &copy; <CurrentYear /> Felix Luciano. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
