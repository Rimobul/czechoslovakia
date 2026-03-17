import json
import requests
from osm2geojson import json2geojson
import geopandas as gpd
import matplotlib.pyplot as plt
from shapely.geometry import shape

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

OVERPASS_QUERY = r"""
[out:json][timeout:300];

// oblasti štátov
area["ISO3166-1"="CZ"]->.cz;
area["ISO3166-1"="SK"]->.sk;

// mestá/obce nad 10000 obyvateľov
(
  node["place"~"^(city|town)$"]["population"](if:t["population"] >= 10000)(area.cz);
  node["place"~"^(city|town)$"]["population"](if:t["population"] >= 10000)(area.sk);
)->.big_places;

// hranice štátov
rel["boundary"="administrative"]["admin_level"="2"]["ISO3166-1"="CZ"]->.cz_border;
rel["boundary"="administrative"]["admin_level"="2"]["ISO3166-1"="SK"]->.sk_border;

// historická hranica Čiech
rel["boundary"="administrative"]["admin_level"="4"]["name"="Čechy"]->.bohemia;

// výstup
(.big_places; .cz_border; .sk_border; .bohemia;);
out body;
>;
out skel qt;
"""

def fetch_osm_json():
    print("Sťahujem dáta z Overpass API...")
    resp = requests.post(OVERPASS_URL, data=OVERPASS_QUERY.encode("utf-8"))
    resp.raise_for_status()
    return resp.json()

def osm_to_geojson(osm_data):
    print("Konvertujem OSM JSON na GeoJSON...")
    gj = json2geojson(osm_data)
    return gj

def split_layers(geojson):
    print("Rozdeľujem GeoJSON na vrstvy...")

    features = geojson["features"]

    borders_features = []
    bohemia_features = []
    places_features = []

    for f in features:
        props = f.get("properties", {})
        tags = props.get("tags", {})

        # štátne hranice CZ/SK (admin_level=2)
        if tags.get("boundary") == "administrative" and tags.get("admin_level") == "2":
            borders_features.append(f)
            continue

        # historická hranica Čiech (admin_level=4, name=Čechy)
        if tags.get("boundary") == "administrative" and tags.get("admin_level") == "4" and tags.get("name") == "Čechy":
            bohemia_features.append(f)
            continue

        # mestá/obce (place=city/town)
        if tags.get("place") in ("city", "town"):
            places_features.append(f)
            continue

    def to_gdf(feats):
        if not feats:
            return gpd.GeoDataFrame(columns=["name", "geometry"])
        rows = []
        for f in feats:
            props = f.get("properties", {})
            tags = props.get("tags", {})
            geom = shape(f["geometry"])
            rows.append(
                {
                    "name": tags.get("name"),
                    "tags": tags,
                    "geometry": geom,
                }
            )
        return gpd.GeoDataFrame(rows, crs="EPSG:4326")

    borders_gdf = to_gdf(borders_features)
    bohemia_gdf = to_gdf(bohemia_features)
    places_gdf = to_gdf(places_features)

    return borders_gdf, bohemia_gdf, places_gdf

def plot_map(borders_gdf, bohemia_gdf, places_gdf, output_png="slepa_mapa_cz_sk.png"):
    print("Vykresľujem mapu...")

    fig, ax = plt.subplots(figsize=(8, 6))

    # hranice štátov
    if not borders_gdf.empty:
        borders_gdf.plot(ax=ax, edgecolor="black", facecolor="none", linewidth=1, zorder=1)

    # historická hranica Čiech
    if not bohemia_gdf.empty:
        bohemia_gdf.plot(
            ax=ax,
            edgecolor="black",
            linestyle="--",
            facecolor="none",
            linewidth=1,
            zorder=2,
        )

    # mestá
    if not places_gdf.empty:
        places_gdf.plot(ax=ax, color="black", markersize=10, zorder=3)

        # menovky miest
        for idx, row in places_gdf.iterrows():
            x = row.geometry.x
            y = row.geometry.y
            name = row.get("name", "")
            ax.text(
                x,
                y,
                name,
                fontsize=6,
                ha="left",
                va="bottom",
                zorder=4,
            )

    ax.set_axis_off()
    plt.tight_layout()
    plt.savefig(output_png, dpi=300)
    plt.close(fig)
    print(f"Hotovo. Obrázok uložený ako {output_png}")

def main():
    osm_data = fetch_osm_json()
    geojson = osm_to_geojson(osm_data)
    borders_gdf, bohemia_gdf, places_gdf = split_layers(geojson)
    plot_map(borders_gdf, bohemia_gdf, places_gdf)

if __name__ == "__main__":
    main()
