import { Suspense } from "react";
import ProjectsServer from "~/components/projects-server";
import Contact from "~/components/contact";
import HeadNav from "~/components/headnav";
import Footer from "~/components/footer";
import { ProjectsGridSkeleton } from "~/components/ui/skeleton";
import Skills from "~/components/skills";
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

          <Skills />

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
