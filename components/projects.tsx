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
    {
      title: "Music Randomizer",
      description:
        "Web App written using flask as a backend as well as the Spotify and Genius API. You can search any artist and a random song from their top songs will be displayed as well as information about the artist, lyrics, preview and album image for the song",
      url: "https://github.com/NJIT-CS490-SP21/project1-fal6",
    },
    {
      title: "Anime Bot",
      description:
        "Discord bot that tells you quotes from different anime as well as what episode a picture from an anime is from",
      url: "https://github.com/faluciano/anime-go-bot",
    },
    {
      title: "Online Checkers Site",
      description: "Online checkers site made using websockets",
      url: "https://github.com/donovan-westwater/Online-Checkers-Site",
    },
    {
      title: "Portfolio",
      description:
        "Portfolio website writen in typescript using tailwindcss and Next.js. This site!",
      url: "https://github.com/faluciano/portfolio",
    },
  ];
  return (
    <>
      <div id="projects" className="text-center text-5xl">
        Projects
      </div>
      {ProjectData.map((project) => {
        return (
          <div key={project.title} className="m-4 inline-flex">
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
