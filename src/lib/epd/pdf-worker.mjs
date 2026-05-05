#!/usr/bin/env node
// Standalone ESM worker: reads PDF bytes from stdin, writes extracted text to stdout.
// Called as a child process from extractor.ts to bypass Next.js bundler issues.
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const _require = createRequire(import.meta.url);
const pdfDistDir = dirname(_require.resolve("pdfjs-dist/package.json"));

const { getDocument, GlobalWorkerOptions } = await import(
  join(pdfDistDir, "legacy/build/pdf.mjs")
);

GlobalWorkerOptions.workerSrc = join(pdfDistDir, "legacy/build/pdf.worker.mjs");

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
    const lines = [];
    let prevY = null;
    for (const item of content.items) {
      if (!("str" in item) || !item.str.trim()) continue;
      const y = item.transform?.[5] ?? null;
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
