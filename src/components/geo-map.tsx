import { geoMap } from "@/content/geo-map";
import { coverMap } from "@/content/cover-map";
import { home } from "@/content/home";
import { GeoPanel } from "./geo-panel";

// Карта охвата по файлу клиента: регионы присутствия — красным, по наведению справа появляется регион и его города.
// Точки городов убраны (правки Сергея 30.10: по точкам кажется, что в остальной России мы не работаем).
// Без JavaScript полный список городов — под картой (details «Все города списком»).
export function GeoMap() {
  const g = coverMap;
  const moCount = geoMap.inset.cities.length - 1;
  const total = geoMap.cities.length + moCount;
  const covered = g.regions.filter((r) => r.name);

  return (
    <div data-reveal className="geo">
      <dl className="mb-4 grid gap-4 sm:grid-cols-3">
        {home.geo.stats.map((st) => (
          <div key={st.label} className="flex flex-col-reverse border bg-background p-5 sm:p-6">
            <dt className="mt-1 text-sm text-muted-foreground">{st.label}</dt>
            <dd className="text-4xl font-black tracking-tight tabular-nums">{st.value === "{total}" ? total : st.value}</dd>
          </div>
        ))}
        <div className="flex flex-col-reverse border bg-background p-5 sm:p-6">
          <dt className="mt-1 text-sm text-muted-foreground">регионов присутствия</dt>
          <dd className="text-4xl font-black tracking-tight tabular-nums">{covered.length}</dd>
        </div>
      </dl>
      <div className="geo-map grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="relative border bg-background p-3 sm:p-6">
          <svg viewBox={`0 0 ${g.width} ${g.height}`} className="h-auto w-full" role="group" aria-label={`Карта России: ${covered.length} регионов присутствия ECO-PRO`}>
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
          </svg>
        </div>
        <GeoPanel defaultTitle={`${covered.length} регионов`} defaultText={`Проекты от Калининграда до Владивостока, ${total} городов. Наведите на регион, чтобы увидеть города.`} />
      </div>
    </div>
  );
}
