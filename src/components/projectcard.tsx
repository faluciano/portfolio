"use client";

import { Badge } from "./ui/badge";
import * as colors from "public/github-lang-colors.json";
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "~/types";
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
  fork,
  homepage,
}: Project) {
  return (
    <motion.article
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 hover:border-primary-500 hover:shadow-xl hover:scale-[1.02] dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400 sm:p-5 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5 sm:gap-4 md:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="mb-2 text-lg font-bold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 sm:mb-3 sm:text-xl md:text-2xl">
            {name}
          </h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <FaStar className="h-3.5 w-3.5 text-yellow-500 sm:h-4 sm:w-4" aria-hidden="true" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                {stargazers_count}
              </span>
            </div>
            {fork && (
              <div className="flex items-center gap-1.5">
                <FaCodeBranch className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 sm:h-4 sm:w-4" aria-hidden="true" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">Fork</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-shrink-0 gap-1.5 sm:gap-2">
          {homepage && (
            <motion.a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400"
              aria-label={`Visit ${name} demo website (opens in new tab)`}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaExternalLinkAlt className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </motion.a>
          )}
          <motion.a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400"
            aria-label={`View ${name} source code on GitHub (opens in new tab)`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <FaGithub className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
      
      <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:mb-5 sm:text-base md:mb-6">
        {description}
      </p>
      
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
              staggerChildren: 0.05
            }
          }
        }}
      >
        {languages.map((lang) => (
          <motion.div
            key={lang.language}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
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
      
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
        Last updated: {timeAgo(pushed_at)}
      </p>
    </motion.article>
  );
});

export default ProjectCard;
