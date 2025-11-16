import * as logos from "./images/logos";

// Footer component with static year
// Using a fixed year to allow static prerendering
// Alternative: make the entire page dynamic or use client component for year
export default function Footer() {
  // Use static year 2024 for now - can be updated manually
  // Or switch to client component if dynamic year is critical
  const currentYear = 2024;
  
  return (
    <footer className="border-t border-gray-200/70 bg-white/60 py-12 dark:border-gray-800/70 dark:bg-gray-900/60" role="contentinfo">
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
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            © {currentYear} Felix Luciano. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
