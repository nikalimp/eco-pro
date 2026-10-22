import { geoMap } from "@/content/geo-map";
import { coverMap } from "@/content/cover-map";
import { home } from "@/content/home";
import { GeoPanel } from "./geo-panel";

// Карта охвата по файлу клиента (правки Ника 22.10): регионы присутствия — красным, по наведению загораются,
// поверх — города проектов. Справа — название региона или города. Без JavaScript полный список городов —
// под картой (details «Все города списком»).
export function GeoMap() {
  const g = coverMap;
  const moCount = geoMap.inset.cities.length - 1;
  const total = geoMap.cities.length + moCount;
  const covered = g.regions.filter((r) => r.name);

  return (
    <div data-reveal className="geo">
      {/* Охват в цифрах */}
      <dl className="mb-4 grid gap-px border bg-border sm:grid-cols-4">
        {home.geo.stats.map((st) => (
          <div key={st.label} className="flex flex-col-reverse bg-background p-5 sm:p-6">
            <dt className="label mt-2 text-muted-foreground">{st.label}</dt>
            <dd className="display text-5xl leading-none">{st.value === "{total}" ? total : st.value}</dd>
          </div>
        ))}
        <div className="flex flex-col-reverse bg-background p-5 sm:p-6">
          <dt className="label mt-2 text-muted-foreground">регионов присутствия</dt>
          <dd className="display text-5xl leading-none">{covered.length}</dd>
        </div>
      </dl>
      <div className="geo-map grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="relative border bg-background p-3 sm:p-6">
          <svg viewBox={`0 0 ${g.width} ${g.height}`} className="h-auto w-full" role="group" aria-label={`Карта России: ${covered.length} регионов присутствия и ${total} городов проектов ECO-PRO`}>
            {g.regions.map((r, i) =>
              r.name ? (
                <path
                  key={i}
                  d={r.d}
                  className="geo-reg is-on"
                  tabIndex={0}
                  role="img"
                  aria-label={r.cities?.length ? `${r.name}: ${r.cities.join(", ")}` : r.name}
                  data-name={r.name}
                  data-cities={r.cities?.join(", ") ?? ""}
                />
              ) : (
                <path key={i} d={r.d} className="geo-reg" aria-hidden="true" />
              ),
            )}
            {g.cities.map((c) => (
              <g key={c.name} className="geo-city" data-name={c.name} data-cities="" data-kind="город">
                <circle cx={c.x} cy={c.y} r="7" fill="transparent" />
                <rect x={c.x - 2.2} y={c.y - 2.2} width="4.4" height="4.4" className="geo-city-dot" />
              </g>
            ))}
          </svg>
        </div>
        <GeoPanel defaultTitle={`${covered.length} регионов`} defaultText={`${total} городов проектов от Калининграда до Владивостока. Наведите на регион или город.`} />
      </div>
    </div>
  );
}
