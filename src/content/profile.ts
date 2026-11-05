// Header of public/resume.pdf — keep in sync. The PDF has no summary; the
// summary below is shown only on the /resume page.
export const profile = {
  name: "Felix Luciano",
  headline: "Software Engineer",
  focus: ["Backend Infrastructure", "Distributed Systems", "Cloud Services"],
  location: "Seattle, WA",
  email: "felixluciano.a@gmail.com",
  website: "https://faluciano.com",
  summary:
    "Backend software engineer building and operating large-scale production systems at Microsoft and AWS. At Microsoft, led a regional migration and production cutover for a Defender service processing approximately 3.5 billion protection samples daily. The cutover had zero service errors, and the migration reduced p50 latency by 26% and p90 latency by 7%. Previously built Amazon Aurora MySQL diagnostic tooling and operational automation that reduced mean time to resolution by 80%+.",
} as const;
