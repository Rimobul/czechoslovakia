import json

def convert_osm_to_geojson(input_file, output_file):
    """Convert Overpass API JSON to GeoJSON format."""
    
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        osm_data = json.load(f)
    
    features = []
    
    for element in osm_data.get('elements', []):
        if element.get('type') == 'way' and 'geometry' in element:
            # Convert geometry from [{lat, lon}, ...] to [[lon, lat], ...]
            coordinates = [
                [point['lon'], point['lat']] 
                for point in element['geometry']
            ]
            
            feature = {
                "type": "Feature",
                "properties": {
                    "id": element.get('id'),
                    **element.get('tags', {})
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": coordinates
                }
            }
            features.append(feature)
        
        elif element.get('type') == 'node' and 'lat' in element and 'lon' in element:
            feature = {
                "type": "Feature",
                "properties": {
                    "id": element.get('id'),
                    **element.get('tags', {})
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [element['lon'], element['lat']]
                }
            }
            features.append(feature)
    
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    print(f"Writing {len(features)} features to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(geojson, f)
    
    print("Done!")

if __name__ == "__main__":
    convert_osm_to_geojson(
        "zeleznice_cz_sk.json",
        "zeleznice_cz_sk.geojson"
    )
