var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/layers/FeatureLayer",
    "esri/widgets/Editor"
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,
    FeatureLayer,
    Editor
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

    /**
     * You can add, update, and delete features in a feature 
     * layer with the Editor widget. This widget allows you 
     * to edit both geometries and attributes. To use the 
     * widget, you need to ensure that you have the correct 
     * credentials to access and edit the feature layer, and 
     * that the Enable Editing property is set to true in 
     * the feature layer's item page. You can verify 
     * credentials and settings on the item property page 
     * in your ArcGIS account.
     * 
     * In this tutorial, you use the Editor widget to add, 
     * update, and delete features in the My Points feature 
     * layer you had created in the Create a new feature 
     * layer tutorial.
     */

    //Reference a layer to edit
    const myPointsFeatureLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/FSAaj5OS8a6zjW2O/arcgis/rest/services/my_points/FeatureServer/0"
    });

    map.add(myPointsFeatureLayer);

    //Create an Editor widget
    const editor = new Editor({
        view: view
    });

    view.ui.add(editor, 'top-right');
})