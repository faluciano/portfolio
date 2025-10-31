const Contact = () => {
  return (
    <section id="contact" className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Contact
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Interested in working together or have an opportunity in mind? I&apos;m currently open to new roles and projects.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:felixluciano.a@gmail.com?subject=Inquiry%20from%20Portfolio&body=Hi%20Felix,%20I%27d%20like%20to%20discuss..."
            className="inline-flex items-center rounded-lg bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400"
          >
            Email me
          </a>
          <a
            href="/Felix 2024 Resume.pdf"
            download="Felix-Luciano.pdf"
            className="inline-flex items-center rounded-lg border-2 border-teal-600 px-6 py-3 text-base font-semibold text-teal-700 transition-colors hover:bg-teal-600 hover:text-white dark:border-teal-400 dark:text-teal-300 dark:hover:bg-teal-900"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
