let smoothedRate: number | undefined; // progress per ms
const alpha = 0.2; // smoothing factor, tune to taste

/**
 * Get the remaining time of the current operation
 * @param progress the current progress, from 0 to 1
 * @param start the date the conversion has started
 * @returns the formatted HH:MM:SS remaining time
 */
export default function updateEta(progress: number, start: number) {
  const elapsed = Date.now() - start;
  if (progress <= 0 || elapsed <= 0) return "00:00:00";
  const currentRate = progress / elapsed;
  smoothedRate = typeof smoothedRate === "undefined" ? currentRate : alpha * currentRate + (1 - alpha) * smoothedRate;
  const remainingProgress = 1 - progress;
  let remainingSeconds = Math.floor(remainingProgress / smoothedRate / 1000);
  let hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds -= (hours * 3600);
  let minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds -= (minutes * 60);
  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
