import { Fade } from "react-awesome-reveal";
import ProjectCard from "./projectcard";

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <div
        id="projects"
        className="mx-auto p-11 text-center text-5xl text-black dark:text-white"
      >
        Projects
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {projects.map((project: Project) => (
          <Fade key={project.name}>
            <div className="w-full max-w-sm sm:w-[400px]">
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
    </>
  );
};

export default Projects;
