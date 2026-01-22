#!/usr/bin/env python3
"""
Convert SHP file to GeoJSON format
"""

import geopandas as gpd
import os

def convert_shp_to_geojson(shp_path, output_path):
    """
    Convert a shapefile to GeoJSON format
    
    Args:
        shp_path (str): Path to the input shapefile
        output_path (str): Path for the output GeoJSON file
    """
    try:
        print(f"Reading shapefile: {shp_path}")
        
        # Read the shapefile
        gdf = gpd.read_file(shp_path)
        
        # Print some basic information about the data
        print(f"✓ Successfully loaded shapefile")
        print(f"  - Number of features: {len(gdf)}")
        print(f"  - Coordinate Reference System: {gdf.crs}")
        print(f"  - Columns: {list(gdf.columns)}")
        print(f"  - Geometry types: {gdf.geometry.geom_type.unique()}")
        
        # Convert to GeoJSON and save
        print(f"Converting to GeoJSON: {output_path}")
        gdf.to_file(output_path, driver='GeoJSON')
        
        print(f"✓ Successfully converted to GeoJSON!")
        print(f"  - Output file: {output_path}")
        print(f"  - File size: {os.path.getsize(output_path) / 1024:.1f} KB")
        
    except Exception as e:
        print(f"❌ Error during conversion: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    # Define file paths
    shp_file = "OKRESY_P.shp"
    geojson_file = "OKRESY_P.geojson"
    
    # Convert the file
    success = convert_shp_to_geojson(shp_file, geojson_file)
    
    if success:
        print(f"\n🎉 Conversion completed successfully!")
        print(f"   Your GeoJSON file is ready: {geojson_file}")
    else:
        print(f"\n❌ Conversion failed. Please check the error messages above.")