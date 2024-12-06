import geopandas as gpd

def convert_shapefile_to_geojson(input_file, output_file):
    # Load the shapefile
    gdf = gpd.read_file(input_file)
    # Convert it to GeoJSON and write to a file
    gdf.to_file(output_file, driver='GeoJSON')

convert_shapefile_to_geojson("30least_edi.shp", "30least_geojson_output.json")
convert_shapefile_to_geojson("30most_edi.shp", "30most_geojson_output.json")
convert_shapefile_to_geojson("Floodrisk_edi.shp", "floodrisk_geojson_output.json")
convert_shapefile_to_geojson("GS_Floodrisk_edi.shp", "gs_floodrisk_geojson_output.json")
convert_shapefile_to_geojson("rivers_edi.shp", "rivers_geojson_output.json")
convert_shapefile_to_geojson("SIMD_edi.shp", "simd_geojson_output.json")



