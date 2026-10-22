import { geoMap } from "@/content/geo-map";
import { geoRegions } from "@/content/geo-regions";
import { home } from "@/content/home";
import { GeoPanel } from "./geo-panel";

// Карта России по субъектам (правки Ника 22.10): регионы с городами проектов подсвечены целиком,
// по наведению или фокусу (Tab) регион загорается, справа — его название и города.
// Без JavaScript регионы подсвечены, полный список городов — под картой (details «Все города списком»).
export function GeoMap() {
  const g = geoRegions;
  const moCount = geoMap.inset.cities.length - 1;
  const total = geoMap.cities.length + moCount;
  const covered = g.regions.filter((r) => r.name);

  return (
    <div data-reveal className="geo">
      {/* Охват в цифрах — считается из списка городов на карте */}
      <dl className="mb-4 grid gap-px border bg-border sm:grid-cols-4">
        {home.geo.stats.map((st) => (
          <div key={st.label} className="flex flex-col-reverse bg-background p-5 sm:p-6">
            <dt className="label mt-2 text-muted-foreground">{st.label}</dt>
            <dd className="display text-5xl leading-none">{st.value === "{total}" ? total : st.value}</dd>
          </div>
        ))}
        <div className="flex flex-col-reverse bg-background p-5 sm:p-6">
          <dt className="label mt-2 text-muted-foreground">регионов с проектами</dt>
          <dd className="display text-5xl leading-none">{covered.length}</dd>
        </div>
      </dl>
      <div className="geo-map grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="relative border bg-background p-3 sm:p-6">
          <svg viewBox={`0 0 ${g.width} ${g.height}`} className="h-auto w-full" role="group" aria-label={`Карта России: ${covered.length} регионов, где работает ECO-PRO`}>
            {g.regions.map((r) =>
              r.name ? (
                <path
                  key={r.id}
                  d={r.d}
                  className="geo-reg is-on"
                  tabIndex={0}
                  role="img"
                  aria-label={`${r.name}: ${r.cities!.join(", ")}`}
                  data-name={r.name}
                  data-cities={r.cities!.join(", ")}
                />
              ) : (
                <path key={r.id} d={r.d} className="geo-reg" aria-hidden="true" />
              ),
            )}
            {g.labels.map((l) => (
              <text key={l.name} x={l.x} y={l.y} className="geo-label" textAnchor={l.x > 600 ? "end" : "start"} dx={l.x > 600 ? -6 : 6} aria-hidden="true">{l.name}</text>
            ))}
          </svg>
        </div>
        <GeoPanel defaultTitle={`${covered.length} регионов`} defaultText={`${total} городов от Калининграда до Владивостока. Наведите на регион, чтобы увидеть города.`} />
      </div>
    </div>
  );
}
