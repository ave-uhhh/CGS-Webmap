// Check if Leaflet is loaded
if (typeof L === 'undefined') {
    console.error("Leaflet not loaded. Check if the script is included correctly.");
} else {
    // Initialize the map
    const map = L.map('map').setView([55.9432, -3.1579], 15); // Center around Inch Park

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Layer storage
    var layers = {};

    // Function to load GeoJSON layers
    async function loadGeoJSON(layerName) {
        return new Promise((resolve, reject) => {
            const url = `inchparkgeojson/${layerName}.geojson`; // Path to GeoJSON files
            console.log(`Fetching GeoJSON from: ${url}`); // Log the URL
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(`Loaded GeoJSON data for ${layerName}:`, data); // Log loaded data
                    const layer = L.geoJSON(data);
                    resolve(layer);
                })
                .catch(error => {
                    console.error(`Error fetching GeoJSON for ${layerName}:`, error);
                    reject(error);
                });
        });
    }

    // Function to toggle layers
    async function toggleLayer(layerName) {
        console.log(`Toggling layer: ${layerName}`);
        if (layers[layerName]) {
            map.removeLayer(layers[layerName]);
            layers[layerName] = null;
        } else {
            layers[layerName] = await loadGeoJSON(layerName);
            layers[layerName].addTo(map);
        }
    }

    // Event listeners for button clicks
    document.getElementById('treesTab').onclick = () => toggleLayer('trees');
    document.getElementById('grassTab').onclick = () => toggleLayer('grass');
    document.getElementById('floodWallTab').onclick = () => toggleLayer('floodWall');
    document.getElementById('impermeableTab').onclick = () => toggleLayer('impermeable');
    document.getElementById('outlineTab').onclick = () => toggleLayer('outline');
    document.getElementById('riverTab').onclick = () => toggleLayer('river');
    document.getElementById('waterGateTab').onclick = () => toggleLayer('waterGate');
}