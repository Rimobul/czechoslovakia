import json
from pathlib import Path
import requests
from osm2geojson import json2geojson
import geopandas as gpd
import matplotlib.pyplot as plt
from shapely.geometry import LineString, shape
from shapely.ops import polygonize, unary_union

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OVERPASS_CACHE_FILE = Path("overpass_response.json")
OVERPASS_HTTP_TIMEOUT_SECONDS = 180

# Dotaz:
# - big_places: všetky obce nad 3000 obyvateľov
# - hranice CZ/SK
OVERPASS_QUERY = r"""
[out:json][timeout:300];

// oblasti štátov
area["ISO3166-1"="CZ"]->.cz;
area["ISO3166-1"="SK"]->.sk;

// obce nad 3000 obyvateľov
(
  node["place"]["population"](if:t["population"] >= 3000)(area.cz);
  node["place"]["population"](if:t["population"] >= 3000)(area.sk);
)->.big_places;

// hranice štátov
rel["boundary"="administrative"]["admin_level"="2"]["ISO3166-1"="CZ"]->.cz_border;
rel["boundary"="administrative"]["admin_level"="2"]["ISO3166-1"="SK"]->.sk_border;

// výstup
(.big_places; .cz_border; .sk_border;);
out body;
>;
out skel qt;
"""

# Historická hranica Čiech (rok 1900)
BOHEMIA_URL = "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/1900.geojson"


def fetch_osm_json():
    if OVERPASS_CACHE_FILE.exists():
        print(f"Načítavam lokálne dáta z {OVERPASS_CACHE_FILE}...")
        with OVERPASS_CACHE_FILE.open("r", encoding="utf-8") as fh:
            return json.load(fh)

    print("Sťahujem dáta z Overpass API...")
    try:
        resp = requests.post(
            OVERPASS_URL,
            data=OVERPASS_QUERY.encode("utf-8"),
            timeout=OVERPASS_HTTP_TIMEOUT_SECONDS,
        )
        resp.raise_for_status()
    except requests.exceptions.Timeout:
        raise SystemExit("Overpass API timeout. Skript sa ukončuje.")

    osm_json = resp.json()
    with OVERPASS_CACHE_FILE.open("w", encoding="utf-8") as fh:
        json.dump(osm_json, fh, ensure_ascii=False)

    print(f"Overpass odpoveď uložená do {OVERPASS_CACHE_FILE}")
    return osm_json


def osm_to_geojson(osm_data):
    print("Konvertujem OSM JSON na GeoJSON...")
    gj = json2geojson(osm_data)
    return gj


def fetch_bohemia():
    print("Sťahujem historické hranice z OpenHistoricalMap (rok 1932)...")

    ohm_overpass_url = "https://overpass-api.openhistoricalmap.org/api/interpreter"
    ohm_query = r"""
[out:json][timeout:180];
(
    relation["boundary"="administrative"]["name"~"Země Česká|Země Moravskoslezská",i];
    relation["boundary"="administrative"]["name:cs"~"Země Česká|Země Moravskoslezská",i];
);
out body;
>;
out skel qt;
"""

    resp = requests.post(
        ohm_overpass_url,
        data=ohm_query.encode("utf-8"),
        timeout=OVERPASS_HTTP_TIMEOUT_SECONDS,
    )
    resp.raise_for_status()

    target_year = 1932
    osm_json = resp.json()
    elements = osm_json.get("elements", [])

    def extract_year(date_str):
        if not date_str:
            return None
        try:
            return int(str(date_str)[:4])
        except ValueError:
            return None

    nodes = {el["id"]: (el.get("lon"), el.get("lat")) for el in elements if el.get("type") == "node"}
    ways = {el["id"]: el.get("nodes", []) for el in elements if el.get("type") == "way"}

    best_relations = {}
    for rel in (el for el in elements if el.get("type") == "relation"):
        tags = rel.get("tags", {})
        name = (tags.get("name") or tags.get("name:cs") or "").strip()
        name_lower = name.lower()
        start_year = extract_year(tags.get("start_date"))
        end_year = extract_year(tags.get("end_date"))

        if "země česká" in name_lower:
            region_name = "Země Česká"
        elif "země moravskoslezská" in name_lower:
            region_name = "Země Moravskoslezská"
        else:
            continue

        if start_year and start_year > target_year:
            continue
        if end_year and end_year < target_year:
            continue

        prev = best_relations.get(region_name)
        prev_start = prev[0] if prev else None
        curr_start = start_year if start_year is not None else -9999
        prev_start_cmp = prev_start if prev_start is not None else -9999
        if (prev is None) or (curr_start > prev_start_cmp):
            best_relations[region_name] = (start_year, rel)

    rows = []

    for region_name, (_, rel) in best_relations.items():
        outer_lines = []
        for member in rel.get("members", []):
            if member.get("type") != "way":
                continue
            if member.get("role") not in {"outer", ""}:
                continue

            node_ids = ways.get(member.get("ref"), [])
            coords = [nodes[nid] for nid in node_ids if nid in nodes]
            coords = [xy for xy in coords if xy[0] is not None and xy[1] is not None]
            if len(coords) >= 2:
                outer_lines.append(LineString(coords))

        if not outer_lines:
            continue

        merged = unary_union(outer_lines)
        polys = list(polygonize(merged))
        if not polys:
            continue

        rows.append({"name": region_name, "geometry": unary_union(polys)})

    if not rows:
        raise ValueError(
            "OpenHistoricalMap nevrátil hranice Země České ani Země Moravskoslezské pre rok 1932."
        )

    return gpd.GeoDataFrame(rows, geometry="geometry", crs="EPSG:4326")


def split_layers(geojson):
    print("Rozdeľujem GeoJSON na vrstvy...")

    features = geojson["features"]

    borders = []
    big_places = []

    for f in features:
        props = f.get("properties", {})
        tags = props.get("tags", {})
        geom = shape(f["geometry"])

        # hranice CZ/SK
        if tags.get("boundary") == "administrative" and tags.get("admin_level") == "2":
            borders.append({"name": tags.get("name"), "geometry": geom})
            continue

        # obce nad 3000
        if tags.get("place") in ("city", "town") and tags.get("population"):
            try:
                if int(tags["population"]) >= 3000:
                    big_places.append({"name": tags.get("name"), "geometry": geom})
            except:
                pass

    def to_gdf(rows):
        if not rows:
            return gpd.GeoDataFrame(
                {"name": []},
                geometry=gpd.GeoSeries([], crs="EPSG:4326"),
                crs="EPSG:4326",
            )
        return gpd.GeoDataFrame(rows, geometry="geometry", crs="EPSG:4326")

    borders_gdf = to_gdf(borders)
    big_places_gdf = to_gdf(big_places)

    return borders_gdf, big_places_gdf


def plot_map(borders, bohemia, big_places, output="slepa_mapa_cz_sk.png"):
    print("Vykresľujem mapu...")

    fig, ax = plt.subplots(figsize=(8, 6))

    # hranice štátov
    borders.plot(ax=ax, edgecolor="black", facecolor="none", linewidth=1, zorder=1)

    # historická hranica Čiech
    bohemia.plot(
        ax=ax,
        edgecolor="black",
        linestyle="--",
        facecolor="none",
        linewidth=1,
        zorder=2,
    )

    # obce nad 3000 obyvateľov
    big_places.plot(ax=ax, color="black", markersize=8, zorder=3)

    ax.set_axis_off()
    plt.tight_layout()
    plt.savefig(output, dpi=300)
    plt.close(fig)

    print(f"Hotovo. Obrázok uložený ako {output}")


def main():
    osm_data = fetch_osm_json()
    geojson = osm_to_geojson(osm_data)

    borders, big_places = split_layers(geojson)
    bohemia = fetch_bohemia()

    plot_map(borders, bohemia, big_places)


if __name__ == "__main__":
    main()
