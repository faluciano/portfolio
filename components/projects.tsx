import ProjectCard from "./projectcard";

const Projects = () => {
  const ProjectData = [
    {
      title: "Instagram",
      description:
        "Instagram clone for android written in Java with Parse as a backend",
      url: "https://github.com/faluciano/Instagram",
    },
    {
      title: "Flixster",
      description: "Movie browsing app for android that uses TMDB",
      url: "https://github.com/faluciano/Flixster",
    },
  ];
  return (
    <>
      <div id="projects" className="text-center text-5xl">
        Projects
      </div>
      {ProjectData.map((project) => {
        return (
          <div key={project.title} className="mb-4 ml-4 mr-4 mt-4 inline-flex">
            <ProjectCard
              title={project.title}
              description={project.description}
              url={project.url}
            />
          </div>
        );
      })}
    </>
  );
};

export default Projects;
