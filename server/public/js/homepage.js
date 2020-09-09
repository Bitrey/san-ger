const map = L.map("map-elem").setView([44.561, 11.034], 15);
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
            "pk.eyJ1IjoiYml0cmV5IiwiYSI6ImNrZXNkbGNqczJkZnEyem1xNGozd2RwdnoifQ.Yj6zQBEIOStApU1yrt8A3Q"
    }
).addTo(map);

// Add points
const sanGerMarker = L.marker([44.561, 11.034]).addTo(map);
sanGerMarker.bindTooltip("San Cesario sul Panaro");

let areCordsNew = true;
let currentLayerGroup = null;

async function getDirections(inputCoords = null) {
    try {
        const coords = areCordsNew ? (await getPosition()).coords : inputCoords;

        // No coords = directions are already displayed
        if (!coords) return;

        const geoJSON = await getGeoJSON(coords);
        if (currentLayerGroup) {
            map.removeLayer(currentLayerGroup);
            currentLayerGroup = null;
        }
        currentLayerGroup = new L.LayerGroup();
        currentLayerGroup.addTo(map);
        const feature = L.geoJSON(geoJSON).addTo(map);
        currentLayerGroup.addLayer(feature);
        // Zoom out to fit direction lines if coords are new
        if (areCordsNew) map.fitBounds(feature.getBounds());

        if (areCordsNew) {
            const coordsMarker = L.marker([coords.latitude, coords.longitude], {
                draggable: true
            }).addTo(map);
            coordsMarker
                .bindTooltip("La tua posizione (trascinami)")
                .openTooltip();
            coordsMarker.on("drag", () => updatePosition(coordsMarker, false));
            coordsMarker.on("dragend", () =>
                updatePosition(coordsMarker, true)
            );
        }
        areCordsNew = false;
    } catch (err) {
        console.error(err);
        // alert(err);
    }
}

// Limit requests to prevent a 429
const LIMIT_IN_MILLISECONDS = 500;
let lastUpdate = new Date();

const updatePosition = (marker, forceUpdate) => {
    if (!forceUpdate) {
        const past = new Date(lastUpdate).getTime();
        const isPast = new Date().getTime() - past < LIMIT_IN_MILLISECONDS;
        if (!isPast) lastUpdate = new Date();
        // Less than the limit in milliseconds has passed
        else return;
    }

    const { lat, lng } = marker.getLatLng();
    getDirections({ latitude: lat, longitude: lng });

    lastUpdate = new Date();
};

const getPosition = options => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        } else {
            reject("Geolocalization not supported or disabled");
        }
    });
};

const showPosition = position => {
    x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;
};

const getGeoJSON = async inputCoords => {
    return new Promise(async (resolve, reject) => {
        try {
            const { latitude, longitude } = inputCoords;
            const coords = { latitude, longitude };
            const { data } = await axios.get("/api/directions", {
                params: { coords }
            });
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};
