// Генерирует src/content/geo-map.ts: контур России (Natural Earth 50m, Крым включён по требованиям к картам в РФ) + проекции городов
import fs from "node:fs";
import { geoConicEqualArea, geoPath, geoMercator } from "d3-geo";
import * as topo from "topojson-client";
import * as simp from "topojson-simplify";
import pc from "polygon-clipping";

const world = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const feats = topo.feature(world, world.objects.countries).features;
const ru = feats.find((f) => f.properties.name === "Russia");
const ua = feats.find((f) => f.properties.name === "Ukraine");
const crimeaBox = [[[32.3, 44.2], [36.8, 44.2], [36.8, 46.12], [32.3, 46.12], [32.3, 44.2]]];
const crimea = pc.intersection(ua.geometry.coordinates.length && ua.geometry.type === "MultiPolygon" ? ua.geometry.coordinates : [ua.geometry.coordinates], [crimeaBox]);
// Крым — отдельные полигоны (с Россией он не граничит по суше, объединять не нужно).
// polygon-clipping отдаёт внешние кольца против часовой (RFC 7946), d3-geo ждёт по часовой — разворачиваем.
const merged = [...(ru.geometry.type === "MultiPolygon" ? ru.geometry.coordinates : [ru.geometry.coordinates]), ...crimea.map((poly) => poly.map((ring) => ring.slice().reverse()))];

// Отбрасываем мелкие острова, чтобы контур был чище и легче
const W = 1000;
const proj = geoConicEqualArea().rotate([-100, 0]).parallels([52, 64]);
let geom = { type: "MultiPolygon", coordinates: merged };
proj.fitWidth(W, geom);
const p0 = geoPath(proj);
const polys = merged.filter((poly) => p0.area({ type: "Polygon", coordinates: poly }) > 6);
geom = { type: "MultiPolygon", coordinates: polys };

// Упрощение через topojson
let t = (await import("topojson-server")).topology({ ru: geom });
t = simp.presimplify(t);
t = simp.simplify(t, simp.quantile(t, 0.12));
const simple = topo.feature(t, t.objects.ru);

proj.fitWidth(W - 12, simple);
{ const [tx, ty] = proj.translate(); proj.translate([tx + 6, ty + 6]); }
const b = geoPath(proj).bounds(simple);
const H = Math.ceil(b[1][1] + 6);
const path = geoPath(proj).digits(1)(simple);

const cities = [
  ["Москва", 55.756, 37.617], ["Санкт-Петербург", 59.939, 30.316], ["Екатеринбург", 56.838, 60.605], ["Казань", 55.796, 49.106],
  ["Нижний Новгород", 56.327, 44.006], ["Самара", 53.195, 50.1], ["Уфа", 54.735, 55.959], ["Челябинск", 55.16, 61.403],
  ["Пермь", 58.01, 56.229], ["Киров", 58.603, 49.668], ["Тюмень", 57.153, 65.534], ["Омск", 54.989, 73.369],
  ["Иркутск", 52.287, 104.305], ["Владивосток", 43.116, 131.882], ["Белгород", 50.596, 36.588], ["Брянск", 53.243, 34.364],
  ["Воронеж", 51.661, 39.2], ["Волгоград", 48.708, 44.513], ["Ростов-на-Дону", 47.236, 39.713], ["Краснодар", 45.035, 38.975],
  ["Сочи", 43.585, 39.723], ["Псков", 57.819, 28.332], ["Великий Новгород", 58.521, 31.275], ["Тверь", 56.859, 35.912],
  ["Калуга", 54.513, 36.261], ["Рязань", 54.63, 39.736], ["Тула", 54.193, 37.618], ["Липецк", 52.609, 39.599],
  ["Тамбов", 52.721, 41.452], ["Саранск", 54.187, 45.184], ["Йошкар-Ола", 56.634, 47.89], ["Чебоксары", 56.146, 47.251],
  ["Ижевск", 56.853, 53.212], ["Глазов", 58.139, 52.658], ["Воткинск", 57.051, 54.0], ["Соликамск", 59.648, 56.771],
  ["Курган", 55.441, 65.341], ["Нижневартовск", 60.939, 76.57], ["Сургут", 61.254, 73.396], ["Тобольск", 58.198, 68.254],
  ["Ялуторовск", 56.654, 66.312], ["Калининград", 54.71, 20.511],
];
const mo = [
  ["Зеленоград", 55.991, 37.214], ["Химки", 55.889, 37.445], ["Королёв", 55.922, 37.854], ["Мытищи", 55.911, 37.731],
  ["Балашиха", 55.796, 37.938], ["Люберцы", 55.676, 37.898], ["Реутов", 55.761, 37.857], ["Жуковский", 55.597, 38.12],
  ["Фрязино", 55.96, 38.045], ["Долгопрудный", 55.938, 37.502], ["Лобня", 56.009, 37.483], ["Красногорск", 55.831, 37.33],
  ["Одинцово", 55.678, 37.278], ["Подольск", 55.431, 37.545], ["Чехов", 55.143, 37.455], ["Серпухов", 54.913, 37.416],
  ["Коломна", 55.079, 38.778], ["Воскресенск", 55.317, 38.652], ["Егорьевск", 55.383, 39.036], ["Зарайск", 54.762, 38.885],
  ["Ногинск", 55.855, 38.441], ["Электросталь", 55.785, 38.445], ["Орехово-Зуево", 55.806, 38.962], ["Ступино", 54.886, 38.078],
  ["Домодедово", 55.441, 37.754], ["Раменское", 55.567, 38.23], ["Пущино", 54.833, 37.621], ["Сергиев Посад", 56.315, 38.135],
  ["Дмитров", 56.344, 37.52], ["Клин", 56.331, 36.729], ["Солнечногорск", 56.185, 36.977], ["Истра", 55.915, 36.86],
  ["Волоколамск", 56.036, 35.958], ["Дедовск", 55.87, 37.124],
];
const r1 = (n) => Math.round(n * 10) / 10;
const pts = cities.map(([name, lat, lon]) => { const [x, y] = proj([lon, lat]); return { name, x: r1(x), y: r1(y) }; });

// Врезка «Москва и Подмосковье»: своя проекция
const IW = 360, IH = 300;
const all = [["Москва", 55.756, 37.617], ...mo];
const mp = geoMercator().fitExtent([[24, 24], [IW - 24, IH - 24]], { type: "MultiPoint", coordinates: all.map(([, la, lo]) => [lo, la]) });
const inset = all.map(([name, lat, lon]) => { const [x, y] = mp([lon, lat]); return { name, x: r1(x), y: r1(y) }; });

const out = `// Сгенерировано скриптом scripts/geo-map.mjs — не править руками.
// Контур: Natural Earth 50m (public domain), коническая равновеликая проекция. Крым — в составе России (требования к картам в РФ).
export const geoMap = {
  width: ${W},
  height: ${H},
  path: ${JSON.stringify(path)},
  cities: ${JSON.stringify(pts)},
  inset: { width: ${IW}, height: ${IH}, cities: ${JSON.stringify(inset)} },
};
`;
fs.writeFileSync(process.argv[2], out);
console.log("ok", W, H, "path chars", path.length, "cities", pts.length, "+ mo", mo.length);
