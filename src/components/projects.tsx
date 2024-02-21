import { Fade } from "react-awesome-reveal";
import ProjectCard from "./projectcard";

const Projects = ({ projects }: { projects: Prop[] }) => {
  return (
    <>
      <div
        id="projects"
        className="mx-auto p-11 text-center text-5xl text-black dark:text-white"
      >
        Projects
      </div>
      {projects.map((project: Prop) => {
        return (
          <div key={project.name} className="m-4 inline-flex">
            <Fade>
              <ProjectCard
                name={project.name}
                description={project.description}
                html_url={project.html_url}
                pushed_at={project.pushed_at}
                language={project.language}
              />
            </Fade>
          </div>
        );
      })}
    </>
  );
};

export default Projects;
