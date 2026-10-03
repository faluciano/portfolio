import { cacheLife } from "next/cache";

/**
 * Cached so the footer can be part of the static shell; reading the clock
 * directly would force the whole route to render at request time.
 */
// eslint-disable-next-line @typescript-eslint/require-await -- "use cache" requires async
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
