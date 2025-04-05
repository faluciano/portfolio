import { Badge } from "./ui/badge";
import * as colors from "public/github-lang-colors.json";
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";
import type { Project, Language } from "~/types";

const ProjectCard = ({
  name,
  description,
  html_url,
  pushed_at,
  languages,
  stargazers_count,
  fork,
  homepage,
}: Project) => {
  const color = (lang: string): string =>
    colors[lang as keyof typeof colors] || "grey";

  return (
    <div className="group block overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-teal-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-teal-500 dark:text-white dark:group-hover:text-teal-400">
            {name}
          </h5>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaStar className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {stargazers_count}
              </span>
            </div>
            {fork && (
              <div className="flex items-center gap-1">
                <FaCodeBranch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Fork</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400"
            >
              <FaExternalLinkAlt className="h-5 w-5" />
            </a>
          )}
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400"
          >
            <FaGithub className="h-6 w-6" />
          </a>
        </div>
      </div>
      
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {languages.map((lang: Language) => (
          <Badge
            key={lang.language}
            style={{ backgroundColor: color(lang.language) }}
            className="transition-transform group-hover:scale-105"
          >
            {lang.language}
          </Badge>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Last updated: {pushed_at}
      </p>
    </div>
  );
};

export default ProjectCard;
