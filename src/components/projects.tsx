import { Fade } from "react-awesome-reveal";
import ProjectCard from "./projectcard";
import { useState, useMemo } from "react";
import type { Project, Language } from "~/types";

type SortOption = "recent" | "stars" | "name";

const Projects = ({ projects }: { projects: Project[] }) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((project: Project) => {
      project.languages.forEach((lang: Language) => techs.add(lang.language));
    });
    return Array.from(techs).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    
    // Filter by technology if selected
    if (selectedTech) {
      filtered = filtered.filter((project: Project) => 
        project.languages.some((lang: Language) => lang.language === selectedTech)
      );
    }

    // Sort projects
    return filtered.sort((a: Project, b: Project) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "name":
          return a.name.localeCompare(b.name);
        case "recent":
        default:
          return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      }
    });
  }, [projects, selectedTech, sortBy]);

  return (
    <div className="min-h-screen bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Fade triggerOnce>
          <div
            id="projects"
            className="mb-12 text-center text-5xl font-bold text-black dark:text-white"
          >
            Projects
          </div>
        </Fade>

        <div className="mb-8 space-y-4">
          {/* Sort options */}
          <div className="flex flex-wrap justify-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <option value="recent">Most Recent</option>
              <option value="stars">Most Stars</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Technology filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTech(null)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                !selectedTech
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              All Technologies
            </button>
            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  selectedTech === tech
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project) => (
            <Fade key={project.id} triggerOnce>
              <ProjectCard {...project} />
            </Fade>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No projects found matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
