var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/Basemap",
    "esri/layers/VectorTileLayer",
    "esri/layers/TileLayer",
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,
    Basemap,
    VectorTileLayer,
    TileLayer
) {
    //API Key setting up
    esriConfig.apiKey = "AAPK3ee8962475e24e548bddf1e58ceec808hY6UFLsHuUIcbaa2lbGVcICnrnCwGcKfCPc_SNCxqgv088mqfUaM5JgIZaZHwNdv";

    //Create and style a vector layer for the basemap
    const vectorTileLayer = new VectorTileLayer({
        portalItem: {
            id: "d2ff12395aeb45998c1b154e25d680e5",
        },
        opacity: 0.75,
    })

    //Create and style a image layer for the basemap
    const imageTileLayer = new TileLayer({
        portalItem: {
            id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
        }
    });

    const map = new Map({
        basemap: {
            baseLayers: [imageTileLayer, vectorTileLayer]
        }
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-100, 40],
        zoom: 3
    });



})