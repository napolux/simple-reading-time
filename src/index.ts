import striptags from "striptags";
import { remark } from "remark";
import stripMarkdown from "strip-markdown";

/**
 * Supported content formats for preprocessing before word counting.
 *
 * - `"plain"` — no preprocessing, raw text is counted as-is.
 * - `"html"` — HTML tags are stripped before counting words.
 * - `"markdown"` — Markdown syntax is removed before counting words.
 */
export type ContentFormat = "plain" | "html" | "markdown";

/**
 * Options for the {@link readingTime} function.
 *
 * @example
 * ```ts
 * const options: ReadingTimeOptions = {
 *   wordsPerMinute: 250,
 *   format: "html",
 * };
 * ```
 */
export interface ReadingTimeOptions {
  /**
   * Reading speed in words per minute. Defaults to {@link DEFAULT_WORDS_PER_MINUTE} (200).
   */
  wordsPerMinute?: number;

  /**
   * The format of the input content. Determines how the text is preprocessed
   * before word counting.
   *
   * - `"plain"` (default) — no preprocessing.
   * - `"html"` — strips HTML tags.
   * - `"markdown"` — strips Markdown syntax.
   */
  format?: ContentFormat;
}

/**
 * The result returned by the {@link readingTime} function.
 *
 * @example
 * ```ts
 * const result: ReadingTimeResult = {
 *   minutes: 3,
 *   seconds: 180,
 *   words: 600,
 *   text: "3 min read",
 * };
 * ```
 */
export interface ReadingTimeResult {
  /** Estimated reading time rounded up to the nearest minute. */
  minutes: number;

  /** Estimated reading time in total seconds. */
  seconds: number;

  /** Total number of words counted after preprocessing. */
  words: number;

  /** Human-readable reading time string, e.g. `"3 min read"`. */
  text: string;
}

/**
 * Default reading speed in words per minute.
 *
 * Based on the average silent reading speed for adults as reported in
 * academic literature. See Brysbaert (2019) for a comprehensive meta-analysis.
 *
 * @see {@link https://doi.org/10.3758/s13423-019-01698-4}
 */
export const DEFAULT_WORDS_PER_MINUTE = 200;

/**
 * Strips Markdown syntax from the given text using remark and strip-markdown.
 * @internal
 */
function stripMarkdownContent(text: string): string {
  const result = remark().use(stripMarkdown).processSync(text);
  return String(result);
}

/**
 * Counts the number of words in a string by splitting on whitespace.
 * @internal
 */
function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Estimates the reading time of a given text.
 *
 * Supports plain text, HTML, and Markdown content. The input is preprocessed
 * based on the specified `format` option before words are counted.
 *
 * @param text - The text content to estimate reading time for.
 * @param options - Optional configuration for reading speed and content format.
 * @returns A {@link ReadingTimeResult} with estimated minutes, seconds, word count, and a human-readable string.
 *
 * @example Plain text
 * ```ts
 * import { readingTime } from "@napolux/simple-reading-time";
 *
 * const result = readingTime("some plain text");
 * // => { minutes: 1, seconds: 1, words: 3, text: "1 min read" }
 * ```
 *
 * @example HTML content
 * ```ts
 * const result = readingTime("<p>some html</p>", { format: "html" });
 * ```
 *
 * @example Markdown content
 * ```ts
 * const result = readingTime("## some markdown", { format: "markdown" });
 * ```
 *
 * @example Custom reading speed
 * ```ts
 * const result = readingTime("some text", { wordsPerMinute: 250 });
 * ```
 */
export function readingTime(
  text: string,
  options: ReadingTimeOptions = {},
): ReadingTimeResult {
  const { wordsPerMinute = DEFAULT_WORDS_PER_MINUTE, format = "plain" } =
    options;

  let processedText = text;

  if (format === "html") {
    processedText = striptags(text);
  } else if (format === "markdown") {
    processedText = stripMarkdownContent(text);
  }

  const words = countWords(processedText);
  const minutes = Math.ceil(words / wordsPerMinute);
  const seconds = Math.round((words / wordsPerMinute) * 60);

  return {
    minutes,
    seconds,
    words,
    text: `${minutes} min read`,
  };
}
