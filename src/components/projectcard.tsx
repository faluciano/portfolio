import { Badge } from "./ui/badge";
import * as colors from "public/github-lang-colors.json";
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({
  name,
  description,
  html_url,
  pushed_at,
  languages,
}: Project) => {
  const color = (lang: string): string =>
    colors[lang as keyof typeof colors] || "grey";

  return (
    <a
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-teal-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-teal-500 dark:text-white dark:group-hover:text-teal-400">
          {name}
        </h5>
        <FaGithub className="h-6 w-6 text-gray-500 transition-colors group-hover:text-teal-500 dark:text-gray-400 dark:group-hover:text-teal-400" />
      </div>
      
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {languages.map((lang) => (
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
    </a>
  );
};

export default ProjectCard;
