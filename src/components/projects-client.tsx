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

  const handleTechFilter = useCallback((tech: string) => {
    router.push(`/?tech=${encodeURIComponent(tech)}`);
  }, [router]);

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
    <motion.section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-950"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="projects-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl"
          >
            Selected projects
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-4 sm:text-base md:text-lg">
            A mix of personal and open-source work. Filter by technology or
            sort by what matters to you.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:mt-10 md:mt-12 md:flex-row md:items-center md:gap-6">
          <div className="w-full md:w-auto">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 sm:mb-3 md:mb-0 md:inline md:mr-3">
              Filter by tech
            </span>
            <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2 md:pb-0">
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
            <label htmlFor="sort-select" className="flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className="min-h-[44px] flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900 sm:px-4 md:flex-initial"
            >
              <option value="recent">Most recent</option>
              <option value="stars">Most stars</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-center text-xs font-medium text-gray-600 dark:text-gray-400 sm:mt-6 sm:text-sm">
          Showing {filteredProjects.length} project
          {filteredProjects.length === 1 ? "" : "s"}
          {selectedTech ? ` with ${selectedTech}` : ""}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTech}-${sortBy}`}
            className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:mt-12 lg:grid-cols-3"
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
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div role="status" className="mt-8 text-center sm:mt-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              No projects match your filters. Try selecting a different technology.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ProjectsClient;