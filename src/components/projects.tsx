import { Fade } from "react-awesome-reveal";
import ProjectCard from "./projectcard";
import { api } from "~/utils/api";

const Projects = ({ projects }: { projects: Project[] }) => {
  const processLanguages = (project: Project) => {
    const { data, error } = api.languages.getLanguages.useQuery(
      { owner: project.owner.login, repo: project.name },
      {
        refetchOnWindowFocus: false,
      }
    );
    if (error) {
      return [] as Language[];
    }
    return (data as Language[]) || ([] as Language[]);
  };

  return (
    <>
      <div
        id="projects"
        className="mx-auto p-11 text-center text-5xl text-black dark:text-white"
      >
        Projects
      </div>
      {projects.map((project: Project) => {
        const languages = processLanguages(project);
        return (
          <div key={project.name} className="m-4 inline-flex">
            <Fade>
              <ProjectCard
                name={project.name}
                description={project.description}
                html_url={project.html_url}
                pushed_at={project.pushed_at}
                languages={languages.sort((a, b) => b.bytes - a.bytes)}
                owner={project.owner}
              />
            </Fade>
          </div>
        );
      })}
    </>
  );
};

export default Projects;
