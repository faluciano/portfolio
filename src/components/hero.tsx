import DownloadCVButton from "~/components/download-cv-button";
import HeroSphere from "~/components/hero-sphere";

const HIGHLIGHTS = [
  "Billions of devices protected through Microsoft Defender for Endpoint",
  ">50% build time reduction across the Microsoft MDE portfolio",
  "80% faster incident resolution at AWS Aurora",
  "Open-source frameworks published to npm (@couch-kit/*)",
] as const;

export default function Hero() {
  return (
    <div
      id="about"
      className="mx-auto flex max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        {/* ── Text column ──────────────────────────────────── */}
        <div className="order-2 flex flex-col justify-center space-y-6 sm:space-y-8 lg:order-1">
          <div className="space-y-6 sm:space-y-8">
            <h1
              className="animate-rise-in text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl sm:leading-tight md:text-5xl lg:text-7xl lg:leading-[1.1]"
              style={{ color: "rgb(var(--color-text))" }}
            >
              Felix Luciano
            </h1>
            <p
              className="animate-rise-in text-base leading-relaxed sm:text-lg md:text-xl"
              style={{ color: "rgb(var(--color-text-muted))", animationDelay: "0.08s" }}
            >
              Software engineer at Microsoft, working on Defender for
              Endpoint&mdash;security infrastructure that runs on billions of
              devices. I collaborate across teams to ship platform migrations,
              reduce build times by over 50%, and modernize services for ARM and
              Kubernetes. Previously at AWS, where I built tooling that cut
              incident resolution time by 80%.
            </p>
          </div>
          <div
            className="animate-rise-in space-y-4 sm:space-y-6"
            style={{ animationDelay: "0.16s" }}
          >
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {HIGHLIGHTS.map((item) => (
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
          </div>

          {/* ── CTAs ──────────────────────────────────────── */}
          <div
            className="animate-rise-in flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4"
            style={{ animationDelay: "0.24s" }}
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
          </div>
        </div>

        {/* ── Particle sphere column ─────────────────────────── */}
        <div className="animate-rise-in order-1 flex items-center justify-center lg:order-2">
          <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[460px]">
            <div
              className="from-primary-500/20 absolute inset-0 -translate-y-4 rounded-[2.5rem] bg-gradient-to-br via-transparent to-blue-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="relative h-full w-full"
              aria-label="Interactive 3D particle sphere"
              role="img"
            >
              <HeroSphere />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
