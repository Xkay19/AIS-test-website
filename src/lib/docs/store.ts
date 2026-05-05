import type { DocRecord } from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __docStore: Map<string, DocRecord> | undefined;
}

function getStore(): Map<string, DocRecord> {
  if (!global.__docStore) global.__docStore = new Map();
  return global.__docStore;
}

export function saveDoc(doc: DocRecord): DocRecord {
  getStore().set(doc.doc_id, doc);
  return doc;
}

export function getDoc(id: string): DocRecord | undefined {
  return getStore().get(id);
}

export function listDocs(): DocRecord[] {
  return Array.from(getStore().values()).sort(
    (a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
  );
}

export function deleteDoc(id: string): boolean {
  return getStore().delete(id);
}

export function searchDocs(query: string): DocRecord[] {
  const q = query.toLowerCase();
  return listDocs().filter((doc) => {
    const haystack = [
      doc.file_name,
      doc.title ?? "",
      doc.issuer ?? "",
      doc.subject ?? "",
      doc.doc_type_label,
      doc.text_preview ?? "",
      ...(doc.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getExpiringDocs(): { expiring_soon: DocRecord[]; expired: DocRecord[] } {
  const all = listDocs();
  const now = Date.now();
  const ninety = 90 * 24 * 60 * 60 * 1000;

  const expiring_soon = all.filter((d) => {
    if (!d.expiry_date) return false;
    const exp = new Date(d.expiry_date).getTime();
    return exp > now && exp - now <= ninety;
  });

  const expired = all.filter((d) => {
    if (!d.expiry_date) return false;
    return new Date(d.expiry_date).getTime() <= now;
  });

  return { expiring_soon, expired };
}
