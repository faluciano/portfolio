"use client";

import ProjectCard from "./projectcard";
import FilterButton from "./filter-button";
import { useState, useMemo, useCallback } from "react";
import type { Project } from "~/types";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

type SortOption = "recent" | "stars" | "name";

interface ProjectsClientProps {
  initialData: Project[];
}

const ProjectsClient = ({ initialData }: ProjectsClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTech = searchParams?.get("tech") ?? null;
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const handleClearFilter = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleTechFilter = useCallback(
    (tech: string) => {
      router.push(`/?tech=${encodeURIComponent(tech)}`);
    },
    [router],
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as SortOption);
    },
    [],
  );

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    initialData.forEach((project) => {
      project.languages.forEach((lang) => techs.add(lang.language));
    });
    return Array.from(techs).sort();
  }, [initialData]);

  const filteredProjects = useMemo(() => {
    const filtered = selectedTech
      ? initialData.filter((project) =>
          project.languages.some((lang) => lang.language === selectedTech),
        )
      : initialData;

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "name":
          return a.name.localeCompare(b.name);
        case "recent":
        default:
          return (
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          );
      }
    });
  }, [initialData, selectedTech, sortBy]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-snap-section flex flex-col justify-center py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="projects-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            Selected projects
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            A mix of personal and open-source work. Filter by technology or sort
            by what matters to you.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:mt-10 md:mt-12 md:flex-row md:items-center md:gap-6">
          <div className="w-full md:w-auto">
            <span
              className="mb-2 block text-xs font-semibold tracking-wider uppercase sm:mb-3 md:mr-3 md:mb-0 md:inline"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              Filter by tech
            </span>
            <div className="flex max-w-full flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
              <FilterButton active={!selectedTech} onClick={handleClearFilter}>
                All
              </FilterButton>
              {allTechnologies.map((tech) => (
                <FilterButton
                  key={tech}
                  active={selectedTech === tech}
                  onClick={() => handleTechFilter(tech)}
                >
                  {tech}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <label
              htmlFor="sort-select"
              className="flex-shrink-0 text-xs font-semibold tracking-wider uppercase"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className="focus:ring-primary-500 min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 md:flex-initial"
              style={{
                borderColor: "rgb(var(--color-surface-elevated))",
                backgroundColor: "rgb(var(--color-surface))",
                color: "rgb(var(--color-text))",
              }}
            >
              <option value="recent">Most recent</option>
              <option value="stars">Most stars</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div
          className="mt-4 text-center text-xs font-medium sm:mt-6 sm:text-sm"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          Showing {filteredProjects.length} project
          {filteredProjects.length === 1 ? "" : "s"}
          {selectedTech ? ` with ${selectedTech}` : ""}
        </div>

        {/* Asymmetric gap — horizontal wider than vertical (Pillar 4) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTech}-${sortBy}`}
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:mt-10 sm:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:mt-12 lg:grid-cols-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div role="status" className="mt-8 text-center sm:mt-12">
            <p
              className="text-sm sm:text-base"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              No projects match your filters. Try selecting a different
              technology.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsClient;
