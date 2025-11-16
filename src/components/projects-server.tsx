import { api } from "~/utils/api-server";
import ProjectsClient from "./projects-client";

export default async function ProjectsServer() {
  const data = await api.github.getProjectsWithLanguages();
  return <ProjectsClient initialData={data} />;
}