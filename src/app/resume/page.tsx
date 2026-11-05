import type { Metadata } from "next";
import HeadNav from "~/components/headnav";
import Footer from "~/components/footer";
import DownloadCVButton from "~/components/download-cv-button";
import PrintButton from "~/components/print-button";
import { profile } from "~/content/profile";
import { experiences, education } from "~/content/experience";
import { resumeProjects } from "~/content/projects";
import { skillGroups } from "~/content/skills";
import { socialLinks } from "~/content/social";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}, ${profile.headline.toLowerCase()} focused on ${profile.focus.join(", ").toLowerCase()}.`,
  alternates: { canonical: "/resume" },
};

const github = socialLinks.find((link) => link.name === "github")!;
const linkedin = socialLinks.find((link) => link.name === "linkedin")!;

const contactLinks = [
  { label: profile.email, href: `mailto:${profile.email}` },
  { label: "github.com/faluciano", href: github.url },
  { label: "linkedin.com/in/faluciano", href: linkedin.url },
  { label: "faluciano.com", href: profile.website },
];

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="border-surface-elevated text-primary-700 dark:text-primary-300 border-b pb-2 text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm print:text-black"
    >
      {children}
    </h2>
  );
}

function Entry({
  title,
  subtitle,
  meta,
  children,
}: {
  title: React.ReactNode;
  subtitle?: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-base font-semibold sm:text-lg">{title}</h3>
        {meta && (
          <p className="text-muted shrink-0 text-sm tabular-nums">{meta}</p>
        )}
      </div>
      {subtitle && <p className="text-muted text-sm">{subtitle}</p>}
      {children}
    </div>
  );
}

const actionClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-primary-500";

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      <HeadNav />
      <main
        id="main-content"
        className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 print:max-w-none print:p-0"
      >
        <div className="mb-6 flex flex-wrap items-center justify-end gap-3 print:hidden">
          <PrintButton
            className={`${actionClass} border-surface-elevated text-foreground hover:bg-surface-elevated border-2`}
          />
          <DownloadCVButton
            location="resume"
            className={`${actionClass} bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white shadow-md hover:shadow-lg`}
          />
        </div>

        <article
          aria-label={`${profile.name} resume`}
          className="glass-subtle border-surface-elevated space-y-8 rounded-2xl border px-5 py-8 shadow-sm sm:px-10 sm:py-12 print:space-y-5 print:rounded-none print:border-0 print:p-0 print:shadow-none"
        >
          <header className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {profile.name}
            </h1>
            <p className="text-sm font-medium sm:text-base">
              {profile.headline}
              <span className="text-muted"> | {profile.focus.join(" · ")}</span>
            </p>
            <p className="text-muted text-sm">{profile.location}</p>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-sm">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-700 dark:text-primary-300 inline-block py-1 hover:underline print:py-0 print:text-black"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <p className="text-muted text-sm leading-relaxed sm:text-base print:text-black">
            {profile.summary}
          </p>

          <section aria-labelledby="resume-experience" className="space-y-5">
            <SectionHeading id="resume-experience">Experience</SectionHeading>
            {experiences.map((entry) => (
              <Entry
                key={entry.company}
                title={`${entry.company} · ${entry.location}`}
                subtitle={entry.role}
                meta={entry.period}
              >
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed marker:text-primary-500 sm:text-[0.95rem]">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </Entry>
            ))}
          </section>

          <section aria-labelledby="resume-projects" className="space-y-5">
            <SectionHeading id="resume-projects">Projects</SectionHeading>
            {resumeProjects.map((project) => (
              <Entry
                key={project.name}
                title={
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
                  >
                    {project.name}
                  </a>
                }
              >
                <p className="mt-1 text-sm leading-relaxed sm:text-[0.95rem]">
                  {project.description}
                </p>
                <p className="text-muted mt-1 text-xs italic sm:text-sm">
                  {project.tech.join(", ")}
                </p>
              </Entry>
            ))}
          </section>

          <section aria-labelledby="resume-skills" className="space-y-4">
            <SectionHeading id="resume-skills">Skills</SectionHeading>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-x-6">
              {skillGroups.map((group) => (
                <div key={group.label} className="contents">
                  <dt className="font-semibold">{group.label}</dt>
                  <dd className="text-muted -mt-2 sm:mt-0 print:text-black">
                    {group.skills.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="resume-education" className="space-y-4">
            <SectionHeading id="resume-education">Education</SectionHeading>
            <Entry
              title={`${education.school} · ${education.location}`}
              subtitle={education.degree}
              meta={education.year}
            />
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
