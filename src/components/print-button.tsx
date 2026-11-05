"use client";

import { track } from "@vercel/analytics";

export default function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        track("print_resume");
        window.print();
      }}
      className={className}
    >
      Print
    </button>
  );
}
