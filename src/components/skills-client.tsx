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

  const handleSkillClick = useCallback(
    (tech: string) => {
      // Navigate to homepage with tech filter
      router.push(`/?tech=${encodeURIComponent(tech)}`);

      // Smooth scroll to projects section
      setTimeout(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          projectsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      // Call optional callback
      onSkillClick?.(tech);
    },
    [router, onSkillClick],
  );
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
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-snap-section flex flex-col justify-center border-y py-12 sm:py-16 md:py-20"
      style={{
        borderColor: "rgb(var(--color-surface-elevated))",
        backgroundColor: "rgb(var(--color-surface) / 0.6)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="skills-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            Skills & tools
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            Technologies inferred from my GitHub projects, updated dynamically
            based on the code I&apos;ve been writing.
          </p>
        </div>
      </div>

      {/* Marquee — full-width, breaks page rhythm (Pillar 4) */}
      <div
        className="mt-12 w-full overflow-hidden sm:mt-14 md:mt-16"
        role="region"
        aria-label="Technology skills showcase"
      >
        <div
          className="animate-marquee-icons flex gap-8 py-4 whitespace-nowrap sm:gap-10 sm:py-6 md:gap-12"
          role="list"
          aria-label="Technologies and programming languages"
          style={{ willChange: "transform" }}
        >
          {/* First set of icons */}
          {aggregatedLanguages.map((lang) => {
            const src = LOGO_URLS[lang.language];
            return (
              <div
                key={`${lang.language}-1`}
                className="flex flex-shrink-0 flex-col items-center justify-center gap-2 sm:gap-3"
                role="listitem"
              >
                {src ? (
                  <motion.button
                    type="button"
                    onClick={() => handleSkillClick(lang.language)}
                    aria-label={`Filter projects by ${lang.language}`}
                    className="hover:border-primary-500 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-transparent p-2.5 shadow-sm backdrop-blur-sm transition-all sm:h-20 sm:w-20 sm:p-3"
                    style={{
                      backgroundColor: "rgb(var(--color-surface) / 0.5)",
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.3 },
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
                      className="hover:border-primary-500 rounded-xl border-2 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all sm:px-4 sm:py-2"
                      style={{
                        borderColor: "rgb(var(--color-surface-elevated))",
                        backgroundColor: "rgb(var(--color-surface) / 0.5)",
                        color: "rgb(var(--color-text-muted))",
                      }}
                      aria-hidden="true"
                    >
                      {lang.language}
                    </span>
                  </motion.button>
                )}
                <span
                  className="text-xs font-medium"
                  style={{ color: "rgb(var(--color-text-muted))" }}
                  aria-hidden="true"
                >
                  {lang.language}
                </span>
              </div>
            );
          })}
          {/* Duplicate set for seamless loop */}
          {aggregatedLanguages.map((lang) => {
            const src = LOGO_URLS[lang.language];
            return (
              <div
                key={`${lang.language}-2`}
                className="flex flex-shrink-0 flex-col items-center justify-center gap-2 sm:gap-3"
                role="listitem"
                aria-hidden="true"
              >
                {src ? (
                  <motion.button
                    type="button"
                    onClick={() => handleSkillClick(lang.language)}
                    aria-label={`Filter projects by ${lang.language}`}
                    className="hover:border-primary-500 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-transparent p-2.5 shadow-sm backdrop-blur-sm transition-all sm:h-20 sm:w-20 sm:p-3"
                    style={{
                      backgroundColor: "rgb(var(--color-surface) / 0.5)",
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.3 },
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
                      className="hover:border-primary-500 rounded-xl border-2 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all sm:px-4 sm:py-2"
                      style={{
                        borderColor: "rgb(var(--color-surface-elevated))",
                        backgroundColor: "rgb(var(--color-surface) / 0.5)",
                        color: "rgb(var(--color-text-muted))",
                      }}
                      aria-hidden="true"
                    >
                      {lang.language}
                    </span>
                  </motion.button>
                )}
                <span
                  className="text-xs font-medium"
                  style={{ color: "rgb(var(--color-text-muted))" }}
                  aria-hidden="true"
                >
                  {lang.language}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsClient;
