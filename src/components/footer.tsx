import { SocialLinks } from "./images/logos";
import CurrentYear from "./ui/current-year";

export default function Footer() {
  return (
    <footer
      className="border-surface-elevated bg-surface/60 border-t py-12"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap items-center justify-center gap-8"
          aria-label="Social media links"
        >
          <SocialLinks />
        </nav>
        <div className="mt-8 text-center">
          <p className="text-muted text-sm font-medium">
            &copy; <CurrentYear /> Felix Luciano. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
