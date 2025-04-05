import { type NextPage } from "next";
import Image from "next/image";
import Me from "public/Me.jpeg";
import { Fade } from "react-awesome-reveal";
import Projects from "~/components/projects";
import Contact from "~/components/contact";
import Skills from "~/components/skills";
import { api } from "~/utils/api";
import { timeAgo } from "~/utils/timeago";
import { useMemo } from "react";
import { byDate } from "~/utils/orders";
import { LoadingScreen } from "~/components/ui/loading-spinner";

const Home: NextPage = () => {
  const { data, error, isLoading, isFetching } = api.github.getProjectsWithLanguages.useQuery(
    undefined,
    {
      staleTime: 60 * 60 * 1000, // Consider data fresh for 1 hour
    }
  );

  const cachedProjects = useMemo(() => {
    if (error) return [];
    if (!data) return [];

    return data
      .map(project => ({
        ...project,
        description: project.description ?? "",
      }))
      .sort(byDate)
      .map(project => ({
        ...project,
        pushed_at: timeAgo(project.pushed_at),
      }));
  }, [data, error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <HomeContent />
      <Skills />
      <div id="projects" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingScreen />
        ) : error ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-red-500 dark:text-red-400">
              Error loading projects
            </p>
          </div>
        ) : !data?.length ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No projects found
            </p>
          </div>
        ) : (
          <Projects projects={cachedProjects} />
        )}
        {isFetching && !isLoading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Refreshing projects...
          </div>
        )}
      </div>
      <Contact />
    </div>
  );
};

const HomeContent = () => {
  return (
    <div
      id="about"
      className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center space-y-8 lg:order-1">
          <Fade triggerOnce={true} cascade damping={0.1}>
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
                Hi, I&apos;m Felix
              </h1>
              <h2 className="mt-4 text-3xl font-semibold text-teal-500 dark:text-teal-400 sm:text-4xl">
                Software Engineer
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              <p className="leading-relaxed">
                I&apos;m a passionate Software Engineer with a love for solving complex problems and building innovative solutions. 
                I specialize in fullstack web development, mobile apps, and automation.
              </p>
              <p className="leading-relaxed">
                When I&apos;m not coding, you can find me playing bass, enjoying board games, or tinkering with microcontrollers.
              </p>
              <p className="leading-relaxed">
                This portfolio was built with Next.js and Tailwind CSS to showcase my work and skills.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="Felix 2024 Resume.pdf"
                download="Felix-Luciano.pdf"
                className="inline-flex items-center rounded-lg bg-teal-500 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-teal-600 dark:bg-teal-900 dark:hover:bg-teal-800"
              >
                Download CV
              </a>
              <a
                href="#projects"
                className="inline-flex items-center rounded-lg border-2 border-teal-500 px-6 py-3 text-lg font-semibold text-teal-500 transition-all hover:bg-teal-500 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900"
              >
                View Projects
              </a>
            </div>
          </Fade>
        </div>
        
        <div className="order-1 flex justify-center lg:order-2">
          <Fade triggerOnce={true} delay={500}>
            <div className="relative h-[600px] w-[450px] overflow-hidden rounded-2xl shadow-2xl sm:h-[700px] sm:w-[525px] lg:h-[800px] lg:w-[600px]">
              <Image
                priority={true}
                src={Me}
                alt="My Picture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 450px, (max-width: 1200px) 525px, 600px"
              />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Home;
