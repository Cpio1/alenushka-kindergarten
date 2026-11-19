import { localDocuments } from "./media";

/**
 * Официальные документы детского сада.
 *
 * Два способа добавить документ:
 *
 * 1) Положить файл в `public/documents/` — он появится автоматически
 *    (название берётся из имени файла). Чтобы задать красивое название и категорию,
 *    опишите файл в `manualDocuments` с тем же путём `url: "/documents/<имя файла>"`.
 *
 * 2) Ссылка на Google Drive или другой сервис:
 *    {
 *      id: "license",
 *      category: "license",
 *      title: { ru: "Лицензия", kk: "Лицензия" },
 *      url: "https://drive.google.com/file/d/<ID>/view",
 *      source: "drive",
 *    }
 *    Для Google Drive кнопка «Скачать» строится автоматически.
 *
 * Локальные файлы, которых нет в public/documents, на сайте не показываются —
 * поэтому неработающих ссылок не бывает.
 */
export type DocumentCategory = "license" | "organization" | "founding" | "other";
export type DocumentSource = "local" | "drive" | "link";

export type DocumentItem = {
  id: string;
  category: DocumentCategory;
  title: { ru: string; kk: string };
  url: string;
  source: DocumentSource;
  /** Прямая ссылка для скачивания (необязательно). */
  downloadUrl?: string;
  /** Формат для подписи: PDF, DOCX, JPG… */
  format?: string;
  size?: number;
};

const manualDocuments: DocumentItem[] = [];

const ext = (name: string) => (name.split(".").pop() ?? "").toUpperCase();
const prettify = (name: string) => decodeURIComponent(name).replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();

function driveDownload(url: string) {
  const id = url.match(/\/d\/([^/]+)/)?.[1] ?? new URL(url).searchParams.get("id");
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : undefined;
}

function build(): DocumentItem[] {
  const localSrc = new Set(localDocuments.map((d) => decodeURIComponent(d.src)));
  const manual = manualDocuments
    .filter((d) => d.source !== "local" || localSrc.has(decodeURIComponent(d.url)))
    .map((d) => {
      const local = localDocuments.find((l) => decodeURIComponent(l.src) === decodeURIComponent(d.url));
      return {
        ...d,
        format: d.format ?? (d.source === "local" ? ext(d.url) : undefined),
        size: d.size ?? local?.size,
        downloadUrl: d.downloadUrl ?? (d.source === "local" ? d.url : d.source === "drive" ? driveDownload(d.url) : undefined),
      };
    });
  const described = new Set(manual.filter((d) => d.source === "local").map((d) => decodeURIComponent(d.url)));
  const auto: DocumentItem[] = localDocuments
    .filter((l) => !described.has(decodeURIComponent(l.src)))
    .map((l) => ({
      id: l.name,
      category: "other",
      title: { ru: prettify(l.name), kk: prettify(l.name) },
      url: l.src,
      source: "local",
      downloadUrl: l.src,
      format: ext(l.name),
      size: l.size,
    }));
  return [...manual, ...auto];
}

export const documents: DocumentItem[] = build();
