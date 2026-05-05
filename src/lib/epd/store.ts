import type { EpdRecord } from "./schema";

// In-memory store — survives across requests in a single process.
// In production replace with Redis or PostgreSQL.
declare global {
  // eslint-disable-next-line no-var
  var __epdStore: Map<string, EpdRecord> | undefined;
}

// Use global to survive Next.js hot-reload
function getStore(): Map<string, EpdRecord> {
  if (!global.__epdStore) global.__epdStore = new Map();
  return global.__epdStore;
}

export function saveEpd(epd: EpdRecord): void {
  getStore().set(epd.epd_id, epd);
}

export function getEpd(id: string): EpdRecord | null {
  return getStore().get(id) ?? null;
}

export function listEpds(): EpdRecord[] {
  return Array.from(getStore().values()).sort(
    (a, b) => new Date(b.extracted_at).getTime() - new Date(a.extracted_at).getTime()
  );
}

export function deleteEpd(id: string): boolean {
  return getStore().delete(id);
}
