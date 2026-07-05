import { Suspense } from "react";
import ProjectsServer from "~/components/projects-server";
import Contact from "~/components/contact";
import HeadNav from "~/components/headnav";
import Footer from "~/components/footer";
import { ProjectsGridSkeleton, SkillsSkeleton } from "~/components/ui/skeleton";
import SkillsClient from "~/components/skills-client";
import { getSkills } from "~/server/github";
import Hero from "~/components/hero";
import Experience from "~/components/experience";
import { ErrorBoundary } from "~/components/error-boundary";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        <HeadNav />
        <main id="main-content">
          <Hero />

          <ErrorBoundary sectionName="skills">
            <Suspense fallback={<SkillsSkeleton />}>
              <SkillsServerWrapper />
            </Suspense>
          </ErrorBoundary>

          <Experience />

          <ErrorBoundary sectionName="projects">
            <Suspense fallback={<ProjectsGridSkeleton />}>
              <ProjectsServer />
            </Suspense>
          </ErrorBoundary>

          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

// Async Server Component that fetches aggregated skill languages
async function SkillsServerWrapper() {
  const languages = await getSkills();
  return <SkillsClient languages={languages} />;
}
