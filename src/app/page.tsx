import { Suspense } from "react";
import ProjectsServer from "~/components/projects-server";
import Contact from "~/components/contact";
import HeadNav from "~/components/headnav";
import Footer from "~/components/footer";
import { ProjectsGridSkeleton } from "~/components/ui/skeleton";
import SkillsClient from "~/components/skills-client";
import { api } from "~/utils/api-server";
import HeroClient from "~/components/hero-client";
import Experience from "~/components/experience";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        <HeadNav />
        <main id="main-content">
          <HeroClient />

          <Suspense fallback={<SkillsSkeleton />}>
            <SkillsServerWrapper />
          </Suspense>

          <Experience />

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

function SkillsSkeleton() {
  return (
    <section
      className="border-y py-12 sm:py-16 md:py-20"
      style={{
        borderColor: "rgb(var(--color-surface-elevated))",
        backgroundColor: "rgb(var(--color-surface) / 0.6)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto h-8 w-48 animate-pulse rounded"
            style={{ backgroundColor: "rgb(var(--color-surface-elevated))" }}
          />
          <div
            className="mx-auto mt-4 h-4 w-96 animate-pulse rounded"
            style={{ backgroundColor: "rgb(var(--color-surface-elevated))" }}
          />
        </div>
        <div className="mt-12 flex justify-center gap-8">
          {[...Array<undefined>(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 animate-pulse rounded-xl sm:h-20 sm:w-20"
                style={{
                  backgroundColor: "rgb(var(--color-surface-elevated))",
                }}
              />
              <div
                className="h-3 w-12 animate-pulse rounded"
                style={{
                  backgroundColor: "rgb(var(--color-surface-elevated))",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
