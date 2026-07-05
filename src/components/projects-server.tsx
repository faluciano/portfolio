import { getProjects } from "~/server/github";
import ProjectsClient from "./projects-client";

export default async function ProjectsServer() {
  const data = await getProjects();
  return <ProjectsClient initialData={data} />;
}