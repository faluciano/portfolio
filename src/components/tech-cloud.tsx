"use client";

import type { Language } from "~/types";
import { memo, useMemo } from "react";

interface TechCloudProps {
  languages: Language[];
}

const languageOrder = [
  "TypeScript",
  "JavaScript",
  "Go",
  "Python",
  "Java",
  "C++",
  "C",
  "HTML",
  "CSS",
];

const TechCloud = memo(function TechCloud({ languages }: TechCloudProps) {
  const topLanguages = useMemo(() => {
    if (!languages.length) return [];

    const sorted = [...languages].sort((a, b) => {
      const ia = languageOrder.indexOf(a.language);
      const ib = languageOrder.indexOf(b.language);
      if (ia === -1 && ib === -1) return b.bytes - a.bytes;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });

    return sorted.slice(0, 9);
  }, [languages]);

  if (!topLanguages.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {topLanguages.map((lang) => (
        <span
          key={lang.language}
          className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-teal-500" />
          {lang.language}
        </span>
      ))}
    </div>
  );
});

export default TechCloud;
