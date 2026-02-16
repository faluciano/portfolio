"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Me from "public/Me.jpeg";
import DownloadCVButton from "~/components/download-cv-button";

/* ── Orchestrated entrance variants ─────────────────────────── */

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
} as const;

const ctaVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
    },
  },
} as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 1.08, rotate: 2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
} as const;

/* ── Component ──────────────────────────────────────────────── */

export default function HeroClient() {
  return (
    <motion.div
      id="about"
      className="scroll-snap-section mx-auto flex max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        {/* ── Text column ──────────────────────────────────── */}
        <div className="order-2 flex flex-col justify-center space-y-6 sm:space-y-8 lg:order-1">
          <div className="space-y-6 sm:space-y-8">
            <motion.h1
              className="text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl sm:leading-tight md:text-5xl lg:text-7xl lg:leading-[1.1]"
              style={{ color: "rgb(var(--color-text))" }}
              variants={itemVariants}
            >
              Hi, I&apos;m Felix — Software Engineer
            </motion.h1>
            <motion.p
              className="text-base leading-relaxed sm:text-lg md:text-xl"
              style={{ color: "rgb(var(--color-text-muted))" }}
              variants={itemVariants}
            >
              Software engineer at Microsoft with experience across the full
              stack. I work with diverse technologies—from C++ and C# to
              TypeScript and Python— building scalable systems with a focus on
              performance, developer experience, and maintainable architecture.
            </motion.p>
          </div>
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={itemVariants}
          >
            <p
              className="text-sm leading-relaxed sm:text-base"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              My expertise spans product engineering, internal tooling, and
              system integrations. I thrive working with large codebases and
              adapting quickly to new technologies—whether it&apos;s modern web
              frameworks, cloud platforms, or systems-level programming—building
              solutions that scale across diverse engineering domains.
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {[
                "Web apps with Next.js + TypeScript",
                "REST/automation and cloud integrations",
                "Mobile prototypes with React Native",
                "Testing, CI, and performance tuning",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 sm:gap-3">
                  <span className="bg-primary-500 h-1.5 w-1.5 flex-shrink-0 rounded-full sm:h-2 sm:w-2" />
                  <span
                    className="text-xs font-medium sm:text-sm"
                    style={{ color: "rgb(var(--color-text-muted))" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── CTAs ──────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4"
            variants={ctaVariants}
          >
            <a
              href="#projects"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
              aria-label="View Felix's projects"
            >
              View projects
            </a>
            <DownloadCVButton
              location="homepage"
              className="border-primary-600 text-primary-700 hover:bg-primary-600 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:text-white hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            />
            <a
              href="#contact"
              className="hover:text-primary-600 focus:ring-primary-500 dark:hover:text-primary-400 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold underline-offset-4 transition-all hover:underline focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              Contact
            </a>
          </motion.div>
        </div>

        {/* ── Image column — breaks boundary on lg ─────── */}
        <motion.div
          className="order-1 flex justify-center lg:order-2 lg:-mr-8"
          variants={imageVariants}
        >
          <div className="relative aspect-[3/4] w-full max-w-[320px] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[460px]">
            <div
              className="from-primary-500/40 absolute inset-0 -translate-y-8 rounded-[2.5rem] bg-gradient-to-br via-transparent to-blue-500/40 blur-3xl"
              aria-hidden="true"
            />
            <div className="glass-medium relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-black/10">
              <Image
                priority={true}
                src={Me}
                alt="Portrait of Felix Luciano"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 360px, (max-width: 1200px) 420px, 460px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
