import type { Project } from "~/types";

export const byDate = (a: Project, b: Project): number => {
  const dateA = new Date(a.pushed_at);
  const dateB = new Date(b.pushed_at);
  return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
};

export const byName = (a: Project, b: Project): number => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
};

export const byDateReverse = (a: Project, b: Project): number => {
  const dateA = new Date(a.pushed_at);
  const dateB = new Date(b.pushed_at);
  return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
};
