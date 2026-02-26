export function timeAgo(timestamp: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(timestamp).getTime()) / 1000,
  );

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [secs, label] of intervals) {
    const interval = Math.floor(seconds / secs);
    if (interval >= 1) {
      return `${interval} ${label}${interval !== 1 ? "s" : ""} ago`;
    }
  }

  return `${Math.floor(seconds)} second${Math.floor(seconds) !== 1 ? "s" : ""} ago`;
}
