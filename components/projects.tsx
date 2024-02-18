import { Fade } from "react-awesome-reveal";
import ProjectCard from "./projectcard";

const Projects = ({ projects }: { projects: Prop[] }) => {
  // const ProjectData = [
  //   {
  //     title: "Instagram",
  //     description:
  //       "Instagram clone for android written in Java with Parse as a backend",
  //     url: "https://github.com/faluciano/Instagram",
  //     lastUpdated: "5d ago",
  //   },
  //   {
  //     title: "Flixster",
  //     description: "Movie browsing app for android that uses TMDB",
  //     url: "https://github.com/faluciano/Flixster",
  //     lastUpdated: "5d ago",
  //   },
  //   {
  //     title: "Talking Head BLE",
  //     description:
  //       "Cross platform app that uses BLE to interface with an Arduino powered talking head. Written in React Native and Arduino programmed in C++",
  //     url: "public/Felix 2024 Resume.pdf",
  //     lastUpdated: "5d ago",
  //   },
  //   {
  //     title: "Music Randomizer",
  //     description:
  //       "Web App written using flask as a backend as well as the Spotify and Genius API. You can search any artist and a random song from their top songs will be displayed as well as information about the artist, lyrics, preview and album image for the song",
  //     url: "https://github.com/NJIT-CS490-SP21/project1-fal6",
  //     lastUpdated: "5d ago",
  //   },
  //   {
  //     title: "Anime Bot",
  //     description:
  //       "Discord bot that tells you quotes from different anime as well as what episode a picture from an anime is from",
  //     url: "https://github.com/faluciano/anime-go-bot",
  //     lastUpdated: "5d ago",
  //   },
  //   {
  //     title: "Online Checkers Site",
  //     description: "Online checkers site made using websockets",
  //     url: "https://github.com/donovan-westwater/Online-Checkers-Site",
  //     lastUpdated: "5d ago",
  //   },
  //   {
  //     title: "Portfolio",
  //     description:
  //       "Portfolio website writen in typescript using tailwindcss and Next.js. This site!",
  //     url: "https://github.com/faluciano/portfolio",
  //     lastUpdated: "5d ago",
  //   },
  // ];
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
              />
            </Fade>
          </div>
        );
      })}
    </>
  );
};

export default Projects;
