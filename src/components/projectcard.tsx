import { Badge } from "./ui/badge";
import * as colors from "public/github-lang-colors.json";

const ProjectCard = ({ name, description, html_url, pushed_at, language}: Prop) => {
  const color: string = colors[language as keyof typeof colors] || "";
  return (
    <a
      href={html_url}
      className="block w-96 rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        Last updated: {pushed_at}
      </p>
      <Badge style={{ backgroundColor: color }}>{language}</Badge>
    </a>
  );
};

export default ProjectCard;
