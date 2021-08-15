var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer"
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,
    Sketch,
    GraphicsLayer,
    FeatureLayer
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

    const graphicsLayerSketch = new GraphicsLayer();
    const sketch = new Sketch({
        layer: graphicsLayerSketch,
        view: view,
        creationMode: 'update'
    })
    view.ui.add(sketch, 'top-right');
    map.add(graphicsLayerSketch);

    //add a event for sketch update
    sketch.on('update', event => {
        if (event.state === "start")
            queryFeaturelayer(event.graphics[0].geometry);
        if (event.state === "complete")
            graphicsLayerSketch.remove(event.graphics[0]);
        //When graphics changes
        if (event.toolEventInfo &&
            (event.toolEventInfo.type === 'scale-stop' || event.toolEventInfo.type === 'move-stop' || event.toolEventInfo.type === 'reshape-stop'))
            queryFeaturelayer(event.graphics[0].geometry);
    });

    //the layer to be queried
    const parcelLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0"
    });


    function queryFeaturelayer(geometry) {
        const parcelQuery = {
            spatialRelationship: "intersects", // Relationship operation to apply
            geometry: geometry,  // The sketch feature geometry
            outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"], // Attributes to return
            returnGeometry: true
        };

        parcelLayer.queryFeatures(parcelQuery)
            .then((results) => {
                displayResults(results);
            }).catch((error) => {
                console.log(error);
            });
    }

    function displayResults(results) {
        // Create a blue polygon
        const symbol = {
            type: "simple-fill",
            color: [20, 130, 200, 0.5],
            outline: {
                color: "white",
                width: .5
            },
        };
        const popupTemplate = {
            title: "Parcel {APN}",
            content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
        };
        // Set symbol and popup
        results.features.map((feature) => {
            feature.symbol = symbol;
            feature.popupTemplate = popupTemplate;
            return feature;
        });

        // Clear display
        view.popup.close();
        view.graphics.removeAll();
        // Add features to graphics layer
        view.graphics.addMany(results.features);
    }

})