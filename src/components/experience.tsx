"use client";

import { memo } from "react";
import { motion } from "framer-motion";

/* ── Data ───────────────────────────────────────────────────── */

interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  current: boolean;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    company: "Microsoft",
    location: "Seattle, WA",
    role: "Software Engineer",
    period: "Sep 2024 – Present",
    current: true,
    bullets: [
      "Working on Microsoft Defender for Endpoint (MDE), protecting billions of devices worldwide",
      "Migrating MDE services to Microsoft Cobalt, enhancing ARM performance",
      "Modernizing services to be silicon-agnostic for cross-hardware compatibility",
      "Transitioning services to Kubernetes for improved scalability and deployment efficiency",
      "Improved developer productivity with >50% build time reduction and cost savings across the portfolio",
    ],
  },
  {
    company: "Amazon Web Services",
    location: "Seattle, WA",
    role: "Software Development Engineer",
    period: "Jun 2022 – May 2023",
    current: false,
    bullets: [
      "Developed tooling for AWS Aurora MySQL clusters to reduce customer downtime and diagnose issues",
      "Collaborated across teams to create automation in Bash, Python, and SQL, reducing mean time to resolve by over 80%",
    ],
  },
  {
    company: "ADP",
    location: "Roseland, NJ",
    role: "Software Engineer Intern",
    period: "Jun 2021 – Aug 2021",
    current: false,
    bullets: [
      "Built a user management platform using Java Struts and Hibernate ORM, onboarding 1,000+ ADP customers",
      "Streamlined the user management process for the data exchange platform, increasing developer productivity",
    ],
  },
  {
    company: "New Jersey Institute of Technology",
    location: "Newark, NJ",
    role: "Teaching Assistant",
    period: "Sep 2019 – May 2021",
    current: false,
    bullets: [
      "Held weekly recitation sessions and graded Python programming assignments for 80+ students per semester",
    ],
  },
];

const education = {
  school: "New Jersey Institute of Technology",
  location: "Newark, NJ",
  degree: "B.S. in Computer Science",
  year: "May 2022",
};

/* ── Animation variants ─────────────────────────────────────── */

const smoothEase = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

/* ── Timeline Entry ─────────────────────────────────────────── */

function TimelineEntry({
  entry,
  isLast,
}: {
  entry: Experience;
  isLast: boolean;
}) {
  return (
    <motion.div
      className="relative grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6"
      variants={itemVariants}
    >
      {/* Left column — period & location (visible on sm+) */}
      <div className="hidden pt-1 text-right sm:block">
        <p
          className="text-sm font-semibold"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          {entry.period}
        </p>
        <p
          className="mt-1 text-xs"
          style={{ color: "rgb(var(--color-text-muted) / 0.7)" }}
        >
          {entry.location}
        </p>
      </div>

      {/* Center column — dot & connector line */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className={`relative z-10 mt-1.5 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
            entry.current
              ? "border-primary-500 bg-primary-500"
              : "border-primary-400/50 bg-[rgb(var(--color-surface))]"
          }`}
        >
          {entry.current && (
            <span
              className="bg-primary-400 absolute inset-0 animate-ping rounded-full opacity-40"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className="w-px grow"
            style={{
              background:
                "linear-gradient(to bottom, rgb(var(--color-text-muted) / 0.3), rgb(var(--color-text-muted) / 0.08))",
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Right column — content card */}
      <div className="pb-10 sm:pb-12">
        {/* Mobile-only: period & location */}
        <div className="mb-2 sm:hidden">
          <p
            className="text-xs font-semibold"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            {entry.period}
          </p>
          <p
            className="text-xs"
            style={{ color: "rgb(var(--color-text-muted) / 0.7)" }}
          >
            {entry.location}
          </p>
        </div>

        <div
          className={`glass-subtle rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl sm:p-6 ${
            entry.current ? "border-primary-500/30" : ""
          }`}
          style={{
            borderColor: entry.current
              ? undefined
              : "rgb(var(--color-surface-elevated))",
          }}
        >
          {/* Company & role */}
          <div>
            <h3 className="text-base font-bold tracking-tight sm:text-lg">
              {entry.company}
            </h3>
            <p
              className="mt-0.5 text-sm font-medium"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              {entry.role}
            </p>
            {entry.current && (
              <span className="bg-primary-500/10 text-primary-600 dark:text-primary-400 mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold">
                Current
              </span>
            )}
          </div>

          {/* Bullets */}
          <ul className="mt-4 space-y-2.5">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5">
                <span
                  className="bg-primary-500/60 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "rgb(var(--color-text-muted))" }}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Education Entry ────────────────────────────────────────── */

function EducationEntry() {
  return (
    <motion.div
      className="relative grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6"
      variants={itemVariants}
    >
      {/* Left column — year (visible on sm+) */}
      <div className="hidden pt-1 text-right sm:block">
        <p
          className="text-sm font-semibold"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          {education.year}
        </p>
        <p
          className="mt-1 text-xs"
          style={{ color: "rgb(var(--color-text-muted) / 0.7)" }}
        >
          {education.location}
        </p>
      </div>

      {/* Center column — dot (terminal, no line below) */}
      <div className="relative flex flex-col items-center">
        <div
          className="border-primary-400/50 relative z-10 mt-1.5 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2"
          style={{ backgroundColor: "rgb(var(--color-surface))" }}
        />
      </div>

      {/* Right column — education card */}
      <div className="pb-4">
        {/* Mobile-only: year & location */}
        <div className="mb-2 sm:hidden">
          <p
            className="text-xs font-semibold"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            {education.year}
          </p>
          <p
            className="text-xs"
            style={{ color: "rgb(var(--color-text-muted) / 0.7)" }}
          >
            {education.location}
          </p>
        </div>

        <div
          className="glass-subtle rounded-xl border p-4 shadow-sm sm:rounded-2xl sm:p-6"
          style={{ borderColor: "rgb(var(--color-surface-elevated))" }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="text-primary-500 h-4 w-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
            </svg>
            <span
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              Education
            </span>
          </div>
          <h3 className="mt-2 text-base font-bold tracking-tight sm:text-lg">
            {education.school}
          </h3>
          <p
            className="mt-0.5 text-sm font-medium"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            {education.degree}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

const Experience = memo(function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="flex flex-col justify-center py-16 sm:py-20 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            id="experience-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: smoothEase }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: smoothEase }}
          >
            A timeline of my professional journey and the impact I&apos;ve made
            along the way.
          </motion.p>
        </div>

        {/* Timeline */}
        <motion.div
          className="mx-auto mt-12 max-w-3xl sm:mt-14 md:mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experiences.map((entry) => (
            <TimelineEntry key={entry.company} entry={entry} isLast={false} />
          ))}

          {/* Education — final node on the timeline */}
          <EducationEntry />
        </motion.div>
      </div>
    </section>
  );
});

export default Experience;
