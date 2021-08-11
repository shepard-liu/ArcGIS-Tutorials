var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    //a widget provided for switching between basemaps
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery"
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,
    BasemapToggle,
    BasemapGallery
) {
    //API Key setting up
    esriConfig.apiKey = "AAPK3ee8962475e24e548bddf1e58ceec808hY6UFLsHuUIcbaa2lbGVcICnrnCwGcKfCPc_SNCxqgv088mqfUaM5JgIZaZHwNdv";

    //create a Map object
    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });

    //create a MapView object
    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });

    //create a BasemapToggle widget
    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
    });

    //add the widget on the bottom-right area of the view
    view.ui.add(basemapToggle, "bottom-right");

    const basemapGallery = new BasemapGallery({
        view: view,
        source: {
            query: {
                title: '"World Basemaps for Developers" AND owner:esri'
            }
        }
    });

    view.ui.add(basemapGallery, "top-right");

})