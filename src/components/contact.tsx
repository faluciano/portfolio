"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import DownloadCVButton from "./download-cv-button";

const Contact = memo(function Contact() {
  return (
    <section
      id="contact"
      className="scroll-snap-section container mx-auto flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <motion.div
        className="glass-medium mx-auto max-w-3xl rounded-2xl border px-6 py-10 text-center shadow-lg sm:rounded-3xl sm:px-10 sm:py-14 md:px-12 md:py-16"
        style={{ borderColor: "rgb(var(--color-surface-elevated))" }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2
          id="contact-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
        >
          Get in Touch
        </h2>
        <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
          <p
            className="text-sm leading-relaxed sm:text-base md:text-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            I&apos;m always interested in discussing new projects, technical
            challenges, and collaboration opportunities. Feel free to reach out
            via LinkedIn or download my resume to learn more about my
            experience.
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <a
            href="https://www.linkedin.com/in/faluciano/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            aria-label="Visit Felix's LinkedIn profile"
          >
            LinkedIn Profile
          </a>
          <DownloadCVButton
            location="contact"
            className="border-primary-600 text-primary-700 hover:bg-primary-600 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:text-white hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
          />
        </div>
      </motion.div>
    </section>
  );
});

export default Contact;
