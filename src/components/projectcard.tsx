"use client";

import { Badge } from "./ui/badge";
import * as colors from "public/github-lang-colors.json";
import { Github, Star, ExternalLink } from "lucide-react";
import type { ClientProject } from "~/types";
import { memo } from "react";
import { motion } from "framer-motion";
import { timeAgo } from "~/utils/timeago";

const getLanguageColor = (lang: string): string =>
  colors[lang as keyof typeof colors] || "grey";

const ProjectCard = memo(function ProjectCard({
  name,
  description,
  html_url,
  pushed_at,
  languages,
  stargazers_count,
  homepage,
}: ClientProject) {
  return (
    // Entrance animation lives on the wrapper in projects-client
    <article className="group hover:border-primary-500 border-surface-elevated bg-surface block overflow-hidden rounded-xl border p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:p-5 md:p-6">
      <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5 sm:gap-4 md:mb-6">
        <div className="min-w-0 flex-1">
          <h3 className="group-hover:text-primary-600 mb-2 text-lg leading-tight font-bold tracking-tight transition-colors sm:mb-3 sm:text-xl md:text-2xl">
            {name}
          </h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <Star
                className="h-3.5 w-3.5 text-yellow-500 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
              <span className="text-muted text-xs font-medium sm:text-sm">
                {stargazers_count}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0 gap-1.5 sm:gap-2">
          {homepage && (
            <motion.a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 hover:bg-surface-elevated text-muted inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-all"
              aria-label={`Visit ${name} demo website (opens in new tab)`}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ExternalLink
                className="h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
              />
            </motion.a>
          )}
          <motion.a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 hover:bg-surface-elevated text-muted inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-all"
            aria-label={`View ${name} source code on GitHub (opens in new tab)`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Github className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </motion.a>
        </div>
      </div>

      {description && (
        <p className="text-muted mb-4 text-sm leading-relaxed sm:mb-5 sm:text-base md:mb-6">
          {description}
        </p>
      )}

      <motion.div
        className="mb-4 flex flex-wrap gap-1.5 sm:mb-5 sm:gap-2 md:mb-6"
        role="list"
        aria-label="Technologies used"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {languages.map((lang) => (
          <motion.div
            key={lang.language}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge
              style={{ backgroundColor: getLanguageColor(lang.language) }}
              className="transition-shadow hover:shadow-md"
              role="listitem"
            >
              {lang.language}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Relative time can tick over between server render and hydration */}
      <p
        className="text-muted/70 text-xs font-medium sm:text-sm"
        suppressHydrationWarning
      >
        Last updated: {timeAgo(pushed_at)}
      </p>
    </article>
  );
});

export default ProjectCard;
