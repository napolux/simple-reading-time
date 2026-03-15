# @napolux/simple-reading-time

A lightweight TypeScript utility to estimate the reading time of plain text, HTML, and Markdown content.

## Installation

```bash
npm install @napolux/simple-reading-time
```

```bash
yarn add @napolux/simple-reading-time
```

## Usage

```ts
import { readingTime } from "@napolux/simple-reading-time";
```

### Plain text

```ts
const result = readingTime("some plain text");
// => { minutes: 1, seconds: 1, words: 3, text: "1 min read" }
```

### HTML

```ts
const result = readingTime("<p>some html</p>", { format: "html" });
// => { minutes: 1, seconds: 1, words: 2, text: "1 min read" }
```

### Markdown

```ts
const result = readingTime("## some markdown", { format: "markdown" });
// => { minutes: 1, seconds: 1, words: 2, text: "1 min read" }
```

### Custom reading speed

```ts
const result = readingTime("some text", { wordsPerMinute: 250 });
// => { minutes: 1, seconds: 0, words: 2, text: "1 min read" }
```

### Localized output

```ts
readingTime("du texte en francais", { locale: "fr_FR" });
// => { minutes: 1, seconds: 1, words: 4, text: "1 min de lecture" }

readingTime("un testo in italiano", { locale: "it_IT" });
// => { minutes: 1, seconds: 1, words: 4, text: "1 min di lettura" }

readingTime("ein deutscher Text", { locale: "de_DE" });
// => { minutes: 1, seconds: 1, words: 3, text: "1 Min. Lesezeit" }

readingTime("un texto en espanol", { locale: "es_ES" });
// => { minutes: 1, seconds: 1, words: 4, text: "1 min de lectura" }
```

### Next.js blog post component

```tsx
import { readingTime } from "@napolux/simple-reading-time";

interface BlogPostProps {
  title: string;
  content: string;
}

export default function BlogPost({ title, content }: BlogPostProps) {
  const { text } = readingTime(content, { format: "html" });

  return (
    <article>
      <h1>{title}</h1>
      <span>{text}</span>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
```

## API

### `readingTime(text: string, options?: ReadingTimeOptions): ReadingTimeResult`

| Parameter                | Type                                  | Default   | Description                        |
| ------------------------ | ------------------------------------- | --------- | ---------------------------------- |
| `text`                   | `string`                              | -         | The content to analyze.            |
| `options.wordsPerMinute` | `number`                              | `200`     | Reading speed in words per minute. |
| `options.format`         | `"plain"` \| `"html"` \| `"markdown"` | `"plain"` | Content format for preprocessing.  |
| `options.locale`         | `SupportedLocale`                     | `"en_US"` | Locale for the `text` field.       |

### `ReadingTimeResult`

| Property  | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `minutes` | `number` | Estimated reading time (rounded up, minutes). |
| `seconds` | `number` | Estimated reading time in total seconds.      |
| `words`   | `number` | Total word count after preprocessing.         |
| `text`    | `string` | Human-readable string, e.g. `"3 min read"`.   |

### `DEFAULT_WORDS_PER_MINUTE`

Exported constant equal to `200`.

### `SupportedLocale`

Union type of supported locale codes:

| Locale    | Language | Example output       |
| --------- | -------- | -------------------- |
| `"en_US"` | English  | `"3 min read"`       |
| `"it_IT"` | Italian  | `"3 min di lettura"` |
| `"fr_FR"` | French   | `"3 min de lecture"` |
| `"de_DE"` | German   | `"3 Min. Lesezeit"`  |
| `"es_ES"` | Spanish  | `"3 min de lectura"` |

## Works everywhere

- **TypeScript** - full literal types, autocomplete, and type safety
- **JavaScript (ESM)** - `import { readingTime } from "@napolux/simple-reading-time"`
- **JavaScript (CJS)** - `const { readingTime } = require("@napolux/simple-reading-time")`
- **Node.js** - works out of the box, CJS and ESM

## Why 200 words per minute?

The default of **200 words per minute** is based on the average silent reading speed for adults as established in academic literature.

A comprehensive meta-analysis by Marc Brysbaert (2019), ["How many words do we read per minute? A review and meta-analysis of reading rate"](https://doi.org/10.3758/s13423-019-01698-4), reviewed 190 studies involving 18,573 participants and found that the average silent reading rate for non-fiction is **238 wpm**, while fiction averages **260 wpm**. The commonly cited figure of 200 wpm represents a conservative lower bound that accounts for varying text complexity and reader populations.

Popular platforms like **Medium** use higher values such as **275 wpm**. The `wordsPerMinute` option exists precisely to let you tune this to your audience -use a lower value for technical or academic content and a higher value for lighter prose.

## License

MIT
