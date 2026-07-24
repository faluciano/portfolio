"use client";

import ProjectCard from "./projectcard";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { ClientProject } from "~/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "~/constants/categories";

type SortOption = "recent" | "stars" | "name";

/** How many projects to show before "Show more" is needed. */
const INITIAL_VISIBLE = 6;

interface ProjectsClientProps {
  initialData: ClientProject[];
}

const updateUrl = (params: Record<string, string | null>) => {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  }
  window.history.replaceState({}, "", url.toString());
};

const ProjectsClient = ({ initialData }: ProjectsClientProps) => {
  const searchParams = useSearchParams();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setSelectedTech(searchParams.get("tech"));
    setSelectedCategory(searchParams.get("category"));
  }, [searchParams]);

  const handleCategoryFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const category = e.target.value || null;
      setSelectedCategory(category);
      setExpanded(false);
      updateUrl({ category, tech: selectedTech });
    },
    [selectedTech],
  );

  const handleTechFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const tech = e.target.value || null;
      setSelectedTech(tech);
      setExpanded(false);
      updateUrl({ tech, category: selectedCategory });
    },
    [selectedCategory],
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
    // First filter by category
    let filtered = selectedCategory
      ? initialData.filter((project) =>
          project.topics?.includes(selectedCategory),
        )
      : initialData;

    // Then filter by tech
    filtered = selectedTech
      ? filtered.filter((project) =>
          project.languages.some((lang) => lang.language === selectedTech),
        )
      : filtered;

    // Then sort
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
          <p
            className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
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
            className="focus:ring-primary-500 min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 md:flex-initial"
            style={{
              borderColor: "rgb(var(--color-surface-elevated))",
              backgroundColor: "rgb(var(--color-surface))",
              color: "rgb(var(--color-text))",
            }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
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
            className="focus:ring-primary-500 min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4 md:flex-initial"
            style={{
              borderColor: "rgb(var(--color-surface-elevated))",
              backgroundColor: "rgb(var(--color-surface))",
              color: "rgb(var(--color-text))",
            }}
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

        <div
          className="mt-4 text-center text-xs font-medium sm:mt-6 sm:text-sm"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
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
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="focus:ring-primary-500 hover:border-primary-500 inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
              style={{
                borderColor: "rgb(var(--color-surface-elevated))",
                backgroundColor: "rgb(var(--color-surface))",
                color: "rgb(var(--color-text))",
              }}
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
