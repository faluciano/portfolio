import { skillGroups } from "~/content/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-surface-elevated bg-surface/60 flex flex-col justify-center border-y py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="skills-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
        >
          Skills & tools
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="glass-subtle border-surface-elevated rounded-xl border p-5"
            >
              <h3 className="text-muted text-xs font-semibold tracking-wider uppercase">
                {group.label}
              </h3>
              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={group.label}
              >
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border-surface-elevated bg-surface rounded-lg border px-3 py-1.5 text-sm font-medium"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
