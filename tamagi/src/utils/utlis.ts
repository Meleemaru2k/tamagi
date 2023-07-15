// https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
// Typescript doesnt have interval-types yet so this is a workaround for number-ranges
export type Ran<T extends number> = number extends T ? number : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R["length"] extends T
  ? R[number]
  : _Range<T, [R["length"], ...R]>;
