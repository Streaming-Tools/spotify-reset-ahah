import eol from "eol";
import { readFileSync } from "fs";

/**
 * Read the lines of a file
 *
 * Fuck Outlawz
 */
export function readLine(path: string): string[] {
  return eol
    .lf(readFileSync(path).toString())
    .split("\n")
    .map((acc) => acc.trim());
}
