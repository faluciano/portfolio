"use client";

import ProjectCard from "./projectcard";
import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { ClientProject } from "~/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "~/constants/categories";
import { updateUrl } from "~/lib/url";

type SortOption = "featured" | "recent" | "stars" | "name";

/** How many projects to show before "Show more" is needed. */
const INITIAL_VISIBLE = 6;

interface ProjectsClientProps {
  initialData: ClientProject[];
}

const ProjectsClient = ({ initialData }: ProjectsClientProps) => {
  const searchParams = useSearchParams();
  const selectedTech = searchParams.get("tech");
  const selectedCategory = searchParams.get("category");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  // Remember which filter combination was expanded so changing filters
  // (including from the Skills section) collapses the list again.
  const filterKey = `${selectedCategory}-${selectedTech}`;
  const [expandedFor, setExpandedFor] = useState<string | null>(null);
  const expanded = expandedFor === filterKey;

  const handleCategoryFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateUrl({ category: e.target.value || null });
    },
    [],
  );

  const handleTechFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateUrl({ tech: e.target.value || null });
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    updateUrl({ category: null, tech: null });
  }, []);

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

  // Only offer categories that at least one project is tagged with
  const availableCategories = useMemo(() => {
    const topics = new Set(initialData.flatMap((project) => project.topics));
    return CATEGORIES.filter((c) => topics.has(c.topic));
  }, [initialData]);

  const filteredProjects = useMemo(() => {
    // First filter by category
    let filtered = selectedCategory
      ? initialData.filter((project) =>
          project.topics.includes(selectedCategory),
        )
      : initialData;

    // Then filter by tech
    filtered = selectedTech
      ? filtered.filter((project) =>
          project.languages.some((lang) => lang.language === selectedTech),
        )
      : filtered;

    const byRecent = (a: ClientProject, b: ClientProject) =>
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();

    // Then sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "featured":
          // Featured projects first, in configured order; the rest by recency
          return (
            (a.featuredRank ?? Infinity) - (b.featuredRank ?? Infinity) ||
            byRecent(a, b)
          );
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "name":
          return a.name.localeCompare(b.name);
        case "recent":
          return byRecent(a, b);
      }
    });
  }, [initialData, selectedCategory, selectedTech, sortBy]);

  const hasMore = filteredProjects.length > INITIAL_VISIBLE;
  const visibleProjects =
    expanded || !hasMore
      ? filteredProjects
      : filteredProjects.slice(0, INITIAL_VISIBLE);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="flex flex-col justify-center py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="projects-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            Selected projects
          </h2>
          <p className="text-muted mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg">
            A mix of personal and open-source work. Filter by category,
            technology, or sort by what matters to you.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 md:mt-12">
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={selectedCategory ?? ""}
            onChange={handleCategoryFilter}
            className="focus:ring-primary-500 border-surface-elevated bg-surface text-foreground min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 md:flex-initial"
          >
            <option value="">All Categories</option>
            {availableCategories.map((c) => (
              <option key={c.topic} value={c.topic}>
                {c.label}
              </option>
            ))}
          </select>

          <label htmlFor="tech-filter" className="sr-only">
            Filter by technology
          </label>
          <select
            id="tech-filter"
            value={selectedTech ?? ""}
            onChange={handleTechFilter}
            className="focus:ring-primary-500 border-surface-elevated bg-surface text-foreground min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 md:flex-initial"
          >
            <option value="">All Technologies</option>
            {allTechnologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          <label htmlFor="sort-select" className="sr-only">
            Sort projects
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="focus:ring-primary-500 border-surface-elevated bg-surface text-foreground min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 md:flex-initial"
          >
            <option value="featured">Featured</option>
            <option value="recent">Most recent</option>
            <option value="stars">Most stars</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="text-muted mt-4 text-center text-xs font-medium sm:mt-6 sm:text-sm">
          Showing {filteredProjects.length} project
          {filteredProjects.length === 1 ? "" : "s"}
          {selectedCategory
            ? ` in ${CATEGORIES.find((c) => c.topic === selectedCategory)?.label ?? selectedCategory}`
            : ""}
          {selectedTech ? ` with ${selectedTech}` : ""}
        </div>

        {/* Asymmetric gap — horizontal wider than vertical (Pillar 4) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedTech}-${sortBy}`}
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:mt-10 sm:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:mt-12 lg:grid-cols-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: (index % INITIAL_VISIBLE) * 0.03,
                  ease: "easeOut",
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <motion.button
              type="button"
              onClick={() => setExpandedFor(expanded ? null : filterKey)}
              aria-expanded={expanded}
              className="focus:ring-primary-500 hover:border-primary-500 border-surface-elevated bg-surface text-foreground inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {expanded
                ? "Show less"
                : `Show ${filteredProjects.length - INITIAL_VISIBLE} more`}
              <motion.span
                className="flex"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            </motion.button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div role="status" className="mt-8 text-center sm:mt-12">
            <p className="text-muted text-sm sm:text-base">
              No projects match these filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-primary-600 dark:text-primary-400 mt-3 min-h-[44px] text-sm font-semibold underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsClient;
