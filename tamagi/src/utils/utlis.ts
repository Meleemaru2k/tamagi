// https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
// Typescript doesnt have interval-types yet so this is a workaround for number-ranges
export type Ran<T extends number> = number extends T ? number : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R["length"] extends T
  ? R[number]
  : _Range<T, [R["length"], ...R]>;

export function convertTime(
  time: number,
  timeType: "ms" | "s" | "m" | "h",
  targetType: "ms" | "s" | "m" | "h"
): number {
  switch (true) {
    case timeType === "ms" && targetType === "s":
      return time / 1000;
    case timeType === "ms" && targetType === "m":
      return time / 1000 / 60;
    case timeType === "ms" && targetType === "h":
      return time / 1000 / 60 / 60;
    case timeType === "s" && targetType === "ms":
      return time * 1000;
    case timeType === "s" && targetType === "m":
      return time / 60;
    case timeType === "s" && targetType === "h":
      return time / 60 / 60;
    case timeType === "m" && targetType === "ms":
      return time * 1000 * 60;
    case timeType === "m" && targetType === "s":
      return time * 60;
    case timeType === "m" && targetType === "h":
      return time / 60;
    case timeType === "h" && targetType === "ms":
      return time * 1000 * 60 * 60;
    case timeType === "h" && targetType === "s":
      return time * 60 * 60;
    case timeType === "h" && targetType === "m":
      return time * 60;
    default:
      return time;
  }
}
