import { Suspense } from "react";
import Image from "next/image";
import Me from "public/Me.jpeg";
import ProjectsServer from "~/components/projects-server";
import Contact from "~/components/contact";
import HeadNav from "~/components/headnav";
import Footer from "~/components/footer";
import { ProjectsGridSkeleton } from "~/components/ui/skeleton";
import SkillsClient from "~/components/skills-client";
import { api } from "~/utils/api-server";

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <HeadNav />
        <main id="main-content">
          <HomeContent />
          
          <Suspense fallback={<SkillsSkeleton />}>
            <SkillsServerWrapper />
          </Suspense>

          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsServer />
          </Suspense>

          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

// Async Server Component that fetches skills data
async function SkillsServerWrapper() {
  const skillsData = await api.github.getProjectsWithLanguages();
  return <SkillsClient initialData={skillsData} />;
}

function HomeContent() {
  return (
    <div
      id="about"
      className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 flex flex-col justify-center space-y-6 sm:space-y-8 lg:order-1">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl lg:leading-tight">
              Hi, I&apos;m Felix — Software Engineer
            </h1>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl">
              Software engineer at Microsoft with experience across the full stack.
              I work with diverse technologies—from C++ and C# to TypeScript and Python—
              building scalable systems with a focus on performance, developer experience,
              and maintainable architecture.
            </p>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
              My expertise spans product engineering, internal tooling, and system
              integrations. I thrive working with large codebases and adapting quickly
              to new technologies—whether it's modern web frameworks, cloud platforms,
              or systems-level programming—building solutions that scale across diverse
              engineering domains.
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              <li className="flex items-center gap-2 sm:gap-3">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500 sm:h-2 sm:w-2" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">Web apps with Next.js + TypeScript</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500 sm:h-2 sm:w-2" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">REST/automation and cloud integrations</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500 sm:h-2 sm:w-2" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">Mobile prototypes with React Native</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500 sm:h-2 sm:w-2" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">Testing, CI, and performance tuning</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#projects"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-offset-gray-900 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
              aria-label="View Felix's projects"
            >
              View projects
            </a>
            <a
              href="Felix 2024 Resume.pdf"
              download="Felix-Luciano.pdf"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-primary-600 px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm transition-all hover:bg-primary-600 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900 dark:focus:ring-offset-gray-900 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
              aria-label="Download Felix's resume as a PDF"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-gray-700 underline-offset-4 transition-all hover:text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:text-gray-200 dark:hover:text-primary-400 dark:focus:ring-offset-gray-900 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative aspect-[3/4] w-full max-w-[320px] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[460px]">
            <div className="absolute inset-0 -translate-y-8 rounded-[2.5rem] bg-gradient-to-br from-primary-500/40 via-transparent to-emerald-500/40 blur-3xl" aria-hidden="true" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/40 bg-gray-900/80 shadow-2xl ring-1 ring-black/10 dark:border-white/10 dark:bg-gray-900/90">
              <Image
                priority={true}
                src={Me}
                alt="Portrait of Felix Luciano"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 360px, (max-width: 1200px) 420px, 460px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsSkeleton() {
  return (
    <section className="border-y border-gray-200/70 bg-white/60 py-12 dark:border-gray-800/70 dark:bg-gray-900/60 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-8 w-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="mt-4 h-4 w-96 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="mt-12 flex gap-8 justify-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}