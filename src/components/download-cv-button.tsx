"use client";

import { track } from "@vercel/analytics";

interface DownloadCVButtonProps {
  location: "homepage" | "contact";
  className?: string;
}

export default function DownloadCVButton({ location, className }: DownloadCVButtonProps) {
  return (
    <a
      href="/resume.pdf"
      download="Felix-Luciano.pdf"
      onClick={() => track("download_cv", { location })}
      className={className}
      aria-label="Download Felix's resume as a PDF"
    >
      Download CV
    </a>
  );
}

