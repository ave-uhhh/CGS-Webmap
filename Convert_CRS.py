import geopandas as gpd

def convert_and_reproject_shapefile(input_shp, output_json):
    # Load the shapefile
    data = gpd.read_file(input_shp)
    
    # Set the CRS to OSGB (EPSG:27700) if not set
    if data.crs is None:
        data = data.set_crs("EPSG:27700", allow_override=False)
    
    # Convert the CRS to WGS 84 (EPSG:4326)
    data = data.to_crs(epsg=4326)
    
    # Save the transformed GeoJSON
    data.to_file(output_json, driver='GeoJSON')

    print(f"Converted and reprojected {input_shp} to {output_json}")

# Define the shapefiles and their corresponding output GeoJSON file names
files_to_process = {
    "30least_edi.shp": "30least_geojson_output.json",
    "30most_edi.shp": "30most_geojson_output.json",
    "Floodrisk_edi.shp": "floodrisk_geojson_output.json",
    "GS_Floodrisk_edi.shp": "gs_floodrisk_geojson_output.json",
    "rivers_edi.shp": "rivers_geojson_output.json",
    "SIMD_edi.shp": "simd_geojson_output.json"
}

# Process each file
for shp, json in files_to_process.items():
    convert_and_reproject_shapefile(shp, json)
