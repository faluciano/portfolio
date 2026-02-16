export interface Category {
  label: string;
  topic: string;
}

export const CATEGORIES: Category[] = [
  { label: "Web Apps", topic: "web-app" },
  { label: "Mobile Apps", topic: "mobile-app" },
  { label: "Embedded / IoT", topic: "embedded" },
  { label: "Libraries", topic: "library" },
  { label: "CLI Tools / Bots", topic: "cli-tool" },
  { label: "Browser Extensions", topic: "browser-extension" },
  { label: "Games", topic: "game" },
];
