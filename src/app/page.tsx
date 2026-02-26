import { Suspense } from "react";
import ProjectsServer from "~/components/projects-server";
import Contact from "~/components/contact";
import HeadNav from "~/components/headnav";
import Footer from "~/components/footer";
import { ProjectsGridSkeleton, SkillsSkeleton } from "~/components/ui/skeleton";
import SkillsClient from "~/components/skills-client";
import { api } from "~/utils/api-server";
import HeroClient from "~/components/hero-client";
import Experience from "~/components/experience";
import { ErrorBoundary } from "~/components/error-boundary";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        <HeadNav />
        <main id="main-content">
          <HeroClient />

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

// Async Server Component that fetches skills data
async function SkillsServerWrapper() {
  const skillsData = await api.github.getProjectsWithLanguages();
  return <SkillsClient initialData={skillsData} />;
}
