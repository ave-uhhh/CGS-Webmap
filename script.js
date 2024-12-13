// Initialize the map
const map = L.map('map').setView([55.9250, -3.1599], 16); // Center around Inch Park

// Add ESRI Satellite tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoIQ, and the GIS User Community'
}).addTo(map);

// Layer storage
var layers = {};

// Function to load GeoJSON layers
async function loadGeoJSON(layerName) {
    const url = `https://raw.githubusercontent.com/ave-uhhh/CGS-Webmap/main/geojson_digitisation/${layerName}_geojson.json`;
    console.log(`Fetching GeoJSON from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
        console.error(`Failed to load ${layerName}: ${response.statusText}`);
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return L.geoJSON(data);
}

// Function to show only the selected layer
async function showLayer(layerName) {
    // Remove all existing layers
    for (const layer in layers) {
        if (layers[layer]) {
            map.removeLayer(layers[layer]);
        }
    }
    // Load and add the selected layer
    layers[layerName] = await loadGeoJSON(layerName);
    layers[layerName].addTo(map);
}

// Event listeners for button clicks
document.getElementById('outlineTab').onclick = () => showLayer('inchpark_outline');
document.getElementById('floodWallTab').onclick = () => showLayer('inchpark_floodwall');
document.getElementById('waterGateTab').onclick = () => showLayer('inchpark_watergate');
document.getElementById('riverTab').onclick = () => showLayer('inchpark_river');
document.getElementById('treesTab').onclick = () => showLayer('inchpark_trees');
document.getElementById('grassTab').onclick = () => showLayer('inchpark_grass');
document.getElementById('impermeableTab').onclick = () => showLayer('inchpark_impermeable');