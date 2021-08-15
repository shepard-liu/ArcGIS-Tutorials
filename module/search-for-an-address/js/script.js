var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/widgets/Search"
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,

    Search
) {
    //API Key setting up
    esriConfig.apiKey = "AAPK3ee8962475e24e548bddf1e58ceec808hY6UFLsHuUIcbaa2lbGVcICnrnCwGcKfCPc_SNCxqgv088mqfUaM5JgIZaZHwNdv";

    //create a Map object
    const map = new Map({
        basemap: "arcgis-navigation" // Basemap layer service
    });

    //create a MapView object
    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });

    //create a Search Widget
    const search = new Search({
        view: view,
    })

    view.ui.add(search, "top-right");
})