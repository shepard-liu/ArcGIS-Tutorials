require(["esri/config", "esri/Map", "esri/views/MapView"], function (esriConfig, Map, MapView) {

    esriConfig.apiKey = "AAPK3ee8962475e24e548bddf1e58ceec808hY6UFLsHuUIcbaa2lbGVcICnrnCwGcKfCPc_SNCxqgv088mqfUaM5JgIZaZHwNdv";

    var map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });

    var view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });
})