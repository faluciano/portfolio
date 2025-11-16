"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { LOGO_URLS } from "~/constants/logo-urls";
import { motion } from "framer-motion";
import type { Project } from "~/types";

interface SkillsClientProps {
  initialData: Project[];
  onSkillClick?: (tech: string) => void;
}

const SkillsClient = ({ initialData, onSkillClick }: SkillsClientProps) => {
  const router = useRouter();
  
  const handleSkillClick = useCallback((tech: string) => {
    // Navigate to homepage with tech filter
    router.push(`/?tech=${encodeURIComponent(tech)}`);
    
    // Smooth scroll to projects section
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    // Call optional callback
    onSkillClick?.(tech);
  }, [router, onSkillClick]);
  const { data } = api.github.getProjectsWithLanguages.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    initialData,
  });

  const aggregatedLanguages = useMemo(() => {
    const counts: Record<string, number> = {};

    data?.forEach((project: Project) => {
      project.languages.forEach((lang) => {
        counts[lang.language] = (counts[lang.language] ?? 0) + lang.bytes;
      });
    });

    return Object.entries(counts).map(([language, bytes]) => ({
      language,
      bytes,
    }));
  }, [data]);

  return (
    <motion.section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-y border-gray-200/70 bg-white/60 py-12 dark:border-gray-800/70 dark:bg-gray-900/60 sm:py-16 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="skills-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl"
          >
            Skills & tools
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-4 sm:text-base md:text-lg">
            Technologies inferred from my GitHub projects, updated dynamically
            based on the code I&apos;ve been writing.
          </p>
        </div>

        <div className="mt-12 overflow-hidden sm:mt-14 md:mt-16" role="region" aria-label="Technology skills showcase">
          <motion.div
            className="flex gap-8 animate-marquee-icons whitespace-nowrap sm:gap-10 md:gap-12"
            role="list"
            aria-label="Technologies and programming languages"
            style={{ willChange: "transform" }}
          >
            {aggregatedLanguages.map((lang, index) => {
              const src = LOGO_URLS[lang.language];
              return (
                <motion.div
                  key={lang.language}
                  className="flex flex-col items-center justify-center gap-2 sm:gap-3"
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                >
                  {src ? (
                    <motion.button
                      type="button"
                      onClick={() => handleSkillClick(lang.language)}
                      aria-label={`Filter projects by ${lang.language}`}
                      className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-transparent bg-white/50 p-2.5 shadow-sm backdrop-blur-sm transition-all hover:border-primary-500 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:border-primary-400 dark:hover:bg-gray-800/70 sm:h-20 sm:w-20 sm:p-3"
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className="max-h-12 max-w-12 object-contain drop-shadow-sm sm:max-h-14 sm:max-w-14"
                        loading="lazy"
                      />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={() => handleSkillClick(lang.language)}
                      className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Filter projects by ${lang.language}`}
                    >
                      <span
                        className="rounded-xl border-2 border-gray-200 bg-white/50 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm transition-all hover:border-primary-500 hover:bg-white/70 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:border-primary-400 dark:hover:bg-gray-800/70 sm:px-4 sm:py-2"
                        aria-hidden="true"
                      >
                        {lang.language}
                      </span>
                    </motion.button>
                  )}
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400" aria-hidden="true">
                    {lang.language}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsClient;