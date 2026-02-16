"use client";

import { memo } from "react";
import { motion } from "framer-motion";

/* ── Data ───────────────────────────────────────────────────── */

interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  current: boolean;
}

const experiences: ExperienceEntry[] = [
  {
    company: "Microsoft",
    location: "Seattle, WA",
    role: "Software Engineer",
    period: "Sep 2024 – Present",
    current: true,
  },
  {
    company: "Amazon Web Services",
    location: "Seattle, WA",
    role: "Software Development Engineer",
    period: "Jun 2022 – May 2023",
    current: false,
  },
  {
    company: "ADP",
    location: "Roseland, NJ",
    role: "Software Engineer Intern",
    period: "Jun 2021 – Aug 2021",
    current: false,
  },
  {
    company: "NJIT",
    location: "Newark, NJ",
    role: "Teaching Assistant",
    period: "Sep 2019 – May 2021",
    current: false,
  },
];

const education = {
  school: "New Jersey Institute of Technology",
  degree: "B.S. in Computer Science",
  year: "May 2022",
  location: "Newark, NJ",
};

/* ── Animation variants ─────────────────────────────────────── */

const smoothEase = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
} as const;

/* ── Card Components ────────────────────────────────────────── */

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <motion.div
      className={`glass-subtle rounded-xl border p-4 transition-shadow hover:shadow-md ${
        entry.current ? "border-primary-500/40" : ""
      }`}
      style={{
        borderColor: entry.current
          ? undefined
          : "rgb(var(--color-surface-elevated))",
      }}
      variants={cardVariants}
    >
      <div className="flex items-start gap-2">
        {entry.current && (
          <span
            className="bg-primary-500 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
            aria-label="Current role"
          />
        )}
        <h3 className="text-sm font-bold tracking-tight sm:text-base">
          {entry.company}
        </h3>
      </div>

      <p
        className="mt-1 text-xs font-medium sm:text-sm"
        style={{ color: "rgb(var(--color-text-muted))" }}
      >
        {entry.role}
      </p>

      <p
        className="mt-2 text-xs"
        style={{ color: "rgb(var(--color-text-muted) / 0.7)" }}
      >
        {entry.period}
      </p>

      <p
        className="text-xs"
        style={{ color: "rgb(var(--color-text-muted) / 0.5)" }}
      >
        {entry.location}
      </p>
    </motion.div>
  );
}

function EducationCard() {
  return (
    <motion.div
      className="glass-subtle rounded-xl border p-4 transition-shadow hover:shadow-md"
      style={{ borderColor: "rgb(var(--color-surface-elevated))" }}
      variants={cardVariants}
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

      <h3 className="mt-2 text-sm font-bold tracking-tight sm:text-base">
        {education.school}
      </h3>

      <p
        className="mt-1 text-xs font-medium sm:text-sm"
        style={{ color: "rgb(var(--color-text-muted))" }}
      >
        {education.degree}
      </p>

      <p
        className="mt-2 text-xs"
        style={{ color: "rgb(var(--color-text-muted) / 0.7)" }}
      >
        {education.year}
      </p>

      <p
        className="text-xs"
        style={{ color: "rgb(var(--color-text-muted) / 0.5)" }}
      >
        {education.location}
      </p>
    </motion.div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

const Experience = memo(function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="flex flex-col justify-center py-16 sm:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experiences.map((entry) => (
            <ExperienceCard key={entry.company} entry={entry} />
          ))}

          <EducationCard />
        </motion.div>
      </div>
    </section>
  );
});

export default Experience;
