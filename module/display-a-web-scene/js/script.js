var moduleNames = [
    "esri/config",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/widgets/Legend"
];

require(moduleNames, function (
    esriConfig,
    WebScene,
    SceneView,
    Legend,
) {
    //API Key setting up
    esriConfig.apiKey = "AAPK3ee8962475e24e548bddf1e58ceec808hY6UFLsHuUIcbaa2lbGVcICnrnCwGcKfCPc_SNCxqgv088mqfUaM5JgIZaZHwNdv";

    const webScene = new WebScene({
        portalItem: {
            id: "579f97b2f3b94d4a8e48a5f140a6639b"
        }
    });

    const view = new SceneView({
        map: webScene,
        container: "viewDiv"
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, "top-right");
})