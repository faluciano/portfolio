import { Fade } from "react-awesome-reveal";
import ProjectCard from "./projectcard";
import { useState, useMemo } from "react";

const Projects = ({ projects }: { projects: Project[] }) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.languages.forEach(lang => techs.add(lang.language));
    });
    return Array.from(techs);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects;
    return projects.filter(project => 
      project.languages.some(lang => lang.language === selectedTech)
    );
  }, [projects, selectedTech]);

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

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTech(null)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              !selectedTech
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            All Projects
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project) => (
            <Fade key={project.name} triggerOnce>
              <div className="transform transition-all hover:scale-105">
                <ProjectCard
                  name={project.name}
                  description={project.description}
                  html_url={project.html_url}
                  pushed_at={project.pushed_at}
                  languages={project.languages.sort((a, b) => b.bytes - a.bytes)}
                  owner={project.owner}
                />
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
