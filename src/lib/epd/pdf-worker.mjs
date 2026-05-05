#!/usr/bin/env node
// Standalone ESM worker: reads PDF bytes from stdin, writes extracted text to stdout.
// Called as a child process from extractor.ts to bypass Next.js bundler issues.
import { getDocument, GlobalWorkerOptions } from "/Users/morrisishoka/Desktop/circuland/node_modules/pdfjs-dist/legacy/build/pdf.mjs";

// Use the bundled worker source directly
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = join(
  "/Users/morrisishoka/Desktop/circuland/node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"
);
GlobalWorkerOptions.workerSrc = workerPath;

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const buffer = Buffer.concat(chunks);
const data = new Uint8Array(buffer);

try {
  const loadTask = getDocument({
    data,
    useWorkerFetch:   false,
    isEvalSupported:  false,
    useSystemFonts:   true,
    disableFontFace:  true,
  });
  const pdf = await loadTask.promise;
  const pages = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page    = await pdf.getPage(p);
    const content = await page.getTextContent();
    // Each item is a separate text element — join with newline so extractors see distinct lines.
    // pdfjs already clusters characters into words; a newline here keeps the line structure.
    const lines = [];
    let prevY = null;
    for (const item of content.items) {
      if (!("str" in item) || !item.str.trim()) continue;
      const y = item.transform?.[5] ?? null;
      // Same Y coordinate = same visual line, different = new line
      if (prevY !== null && Math.abs(y - prevY) > 2) {
        lines.push("\n");
      }
      lines.push(item.str);
      prevY = y;
    }
    pages.push(lines.join(" ").replace(/ \n /g, "\n"));
  }

  process.stdout.write(pages.join("\n"));
  process.exit(0);
} catch (err) {
  process.stderr.write(String(err));
  process.exit(1);
}
