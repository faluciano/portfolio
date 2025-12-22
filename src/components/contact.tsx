"use client";

import { memo } from "react";
import { motion } from "framer-motion";

const Contact = memo(function Contact() {
  return (
    <motion.section
      id="contact"
      className="scroll-snap-section container mx-auto px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 flex flex-col justify-center"
      aria-labelledby="contact-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mx-auto max-w-3xl rounded-2xl border border-gray-200/70 bg-white/80 px-6 py-10 text-center shadow-lg backdrop-blur-sm dark:border-gray-800/70 dark:bg-gray-900/80 sm:rounded-3xl sm:px-10 sm:py-14 md:px-12 md:py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <h2
          id="contact-heading"
          className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl"
        >
          Get in Touch
        </h2>
        <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base md:text-lg">
            I&apos;m always interested in discussing new projects, technical challenges,
            and collaboration opportunities. Feel free to reach out via LinkedIn or
            download my resume to learn more about my experience.
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <motion.a
            href="https://www.linkedin.com/in/faluciano/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-offset-gray-900 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            aria-label="Visit Felix's LinkedIn profile"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            LinkedIn Profile
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download="Felix-Luciano.pdf"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-primary-600 px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm transition-all hover:bg-primary-600 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900 dark:focus:ring-offset-gray-900 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            aria-label="Download Felix's resume as a PDF"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Download CV
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
});

export default Contact;
