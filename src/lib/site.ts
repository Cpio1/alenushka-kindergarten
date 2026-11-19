/** Единый источник контактных данных и ссылок. */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alenushka-landing.vercel.app";

export const site = {
  legalName: "ТОО «Детский ясли-сад „Алёнушка“»",
  brand: "Алёнушка",
  phones: [
    { display: "+7 747 367 24 81", e164: "+77473672481", wa: "77473672481" },
    { display: "+7 705 700 34 45", e164: "+77057003445", wa: "77057003445" },
  ],
  instagram: {
    handle: "@alenushka_balabaksha",
    url: "https://www.instagram.com/alenushka_balabaksha/",
  },
  hours: "07:30–18:00",
  /**
   * Точные координаты здания (широта / долгота) и ID организации в 2GIS.
   * Пока не подтверждены — на сайте используется поиск по адресу,
   * чтобы не поставить на карте случайную точку.
   * Когда точка будет проверена, заполните, например:
   *   geo: { lat: 43.xxxxx, lon: 77.xxxxx }
   */
  geo: null as null | { lat: number; lon: number },
  /** ID карточки организации в 2GIS (из ссылки 2gis.kz/.../firm/<ID>). Включает встроенную карту. */
  twoGisFirmId: null as null | string,
} as const;

/** Адрес для поиска в картах (на казахском — так он записан в 2GIS). */
const ADDRESS_QUERY = "Алматы облысы, Еңбекшіқазақ ауданы, Өрікті, Самұрық көшесі, 57";

export function telHref(e164: string) {
  return `tel:${e164}`;
}

export function waHref(wa: string, text?: string) {
  return `https://wa.me/${wa}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function twoGisHref() {
  if (site.twoGisFirmId) return `https://2gis.kz/firm/${site.twoGisFirmId}`;
  const g = site.geo;
  if (g) return `https://2gis.kz/geo/${g.lon},${g.lat}?m=${g.lon},${g.lat}/17`;
  return `https://2gis.kz/search/${encodeURIComponent(ADDRESS_QUERY)}`;
}

/** Маршрут: по точке в 2GIS, а пока точки нет — построение маршрута по тексту адреса. */
export function routeHref() {
  const g = site.geo;
  if (g) {
    const to = site.twoGisFirmId ? `${g.lon}%2C${g.lat}%3B${site.twoGisFirmId}` : `${g.lon}%2C${g.lat}`;
    return `https://2gis.kz/directions/points/%7C${to}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`;
}

/** Встраиваемая карта 2GIS — только когда известны координаты и карточка организации. */
export function twoGisEmbed() {
  const g = site.geo;
  if (!g || !site.twoGisFirmId) return null;
  const options = {
    pos: { lat: g.lat, lon: g.lon, zoom: 16 },
    opt: { city: "almaty" },
    org: site.twoGisFirmId,
  };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}
