import { api } from "~/utils/api-server";
import SkillsClient from "./skills-client";

// Server Component that fetches skills data and passes to client component
export default async function SkillsServer() {
  const data = await api.github.getProjectsWithLanguages();
  return <SkillsClient initialData={data} />;
}