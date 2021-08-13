var moduleNames = [
    "esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend"
];

require(moduleNames, function (
    esriConfig,
    MapView,
    WebMap,
    ScaleBar,
    Legend
) {
    //API Key setting up
    esriConfig.apiKey = "AAPK3ee8962475e24e548bddf1e58ceec808hY6UFLsHuUIcbaa2lbGVcICnrnCwGcKfCPc_SNCxqgv088mqfUaM5JgIZaZHwNdv";

    //create a Map object
    const webmap = new WebMap({
        portalItem: {
            id: "41281c51f9de45edaf1c8ed44bb10e30"
        }
    });

    //create a MapView object
    const view = new MapView({
        map: webmap,
        container: "viewDiv" // Div element
    });
})