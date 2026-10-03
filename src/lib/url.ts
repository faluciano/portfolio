/**
 * Update query params in place. Next.js syncs native History API calls with
 * `useSearchParams`, so the URL is the single source of truth for filters.
 */
export const updateUrl = (
  params: Record<string, string | null>,
  mode: "push" | "replace" = "replace",
) => {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  }
  if (mode === "push") {
    window.history.pushState(null, "", url.toString());
  } else {
    window.history.replaceState(null, "", url.toString());
  }
};
