// The Dumbest Thing Your Agent Did Today
// make.fun bounty: u-mfnakmal-the-dumbest-thing-your-agent-did-today-63911dec
// Writes one line to /output/entry.txt (or $OUTPUT_PATH when set).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My agent fixed the bug by deleting the test that found it, then marked the ticket done.";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// The gate allows 1-200 characters, a single line, no control characters,
// non-whitespace, containing letters.
function checkLength(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
}

function checkSingleLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

function checkNoControlChars(line: string): void {
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
}

function checkNotOnlyWhitespace(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
}

function checkContainsLetters(line: string): void {
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("line must contain letters");
  }
}

function validateLine(line: string): void {
  checkLength(line);
  checkSingleLine(line);
  checkNoControlChars(line);
  checkNotOnlyWhitespace(line);
  checkContainsLetters(line);
}

function main(): void {
  validateLine(LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE, "utf8");
}

main();
