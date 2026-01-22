#!/usr/bin/env python3
"""
Reproject GeoJSON from EPSG:5514 to EPSG:4326 (WGS84)
"""

import geopandas as gpd
import os

def reproject_geojson(input_path, output_path, target_crs='EPSG:4326'):
    """
    Reproject a GeoJSON file to a different coordinate reference system
    
    Args:
        input_path (str): Path to the input GeoJSON file
        output_path (str): Path for the output GeoJSON file
        target_crs (str): Target coordinate reference system (default: EPSG:4326 - WGS84)
    """
    try:
        print(f"Reading GeoJSON file: {input_path}")
        
        # Read the GeoJSON file
        gdf = gpd.read_file(input_path)
        
        # Print current CRS information
        print(f"✓ Successfully loaded GeoJSON")
        print(f"  - Current CRS: {gdf.crs}")
        print(f"  - Number of features: {len(gdf)}")
        
        # Get current bounds
        bounds = gdf.total_bounds
        print(f"  - Current bounds: [{bounds[0]:.2f}, {bounds[1]:.2f}, {bounds[2]:.2f}, {bounds[3]:.2f}]")
        
        # Reproject to target CRS
        print(f"\nReprojecting to {target_crs}...")
        gdf_reprojected = gdf.to_crs(target_crs)
        
        # Get new bounds
        new_bounds = gdf_reprojected.total_bounds
        print(f"✓ Successfully reprojected!")
        print(f"  - New CRS: {gdf_reprojected.crs}")
        print(f"  - New bounds (lat/lon): [{new_bounds[0]:.6f}, {new_bounds[1]:.6f}, {new_bounds[2]:.6f}, {new_bounds[3]:.6f}]")
        
        # Save the reprojected data
        print(f"\nSaving reprojected GeoJSON: {output_path}")
        gdf_reprojected.to_file(output_path, driver='GeoJSON')
        
        print(f"✓ Successfully saved reprojected file!")
        print(f"  - Output file: {output_path}")
        print(f"  - File size: {os.path.getsize(output_path) / 1024:.1f} KB")
        
        # Display coordinate system information
        print(f"\n📍 Coordinate System Information:")
        print(f"   - Original: EPSG:5514 (S-JTSK - Czech/Slovak national grid)")
        print(f"   - New: EPSG:4326 (WGS84 - World Geodetic System 1984)")
        print(f"   - Usage: Perfect for web maps, GPS, and international applications")
        
    except Exception as e:
        print(f"❌ Error during reprojection: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    # Define file paths
    input_file = "OKRESY_P.geojson"
    output_file = "OKRESY_P_WGS84.geojson"
    
    # Reproject the file
    success = reproject_geojson(input_file, output_file)
    
    if success:
        print(f"\n🎉 Reprojection completed successfully!")
        print(f"   Your WGS84 GeoJSON file is ready: {output_file}")
        print(f"   This file can now be used in web mapping applications like:")
        print(f"   - Leaflet, OpenLayers, Mapbox")
        print(f"   - Google Maps, ArcGIS Online")
        print(f"   - QGIS, ArcGIS Desktop")
    else:
        print(f"\n❌ Reprojection failed. Please check the error messages above.")