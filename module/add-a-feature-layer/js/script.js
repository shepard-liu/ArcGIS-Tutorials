var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/layers/FeatureLayer"
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,

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

    /*
    A feature layer is a dataset in a hosted feature service.
    Each feature layer contains features with a single geometry
    type(point, line, or polygon), and a set of attributes.You
    can use feature layers to store, access, and manage large
    amounts of geographic data for your applications.You get
    features from a feature layer by accessing its URL.
    */

    /*
    Point features are typically displayed in a feature 
    layer on top of all other layers. Use the FeatureLayer 
    class to reference the Trailheads URL and add features 
    to the map.
    */

    //Trailheads feature layer (points)
    const trailHeadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0"
    })
    map.add(trailHeadsLayer);

    /*
    Line features are typically displayed in a feature layer
    before points. Use the FeatureLayer class to reference 
    the Trails URL and add features to the map.
    */
    const trailsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0"
    });
    /*
    Add trailsLayer to the map with an index of 0.
    This ensures that the layer is added to the top
    of the array and is drawn before trailheadsLayer.
    */
    map.add(trailsLayer, 0);

    /*
    Polygon features are typically displayed in a feature
    layer before lines. Use the FeatureLayer class to 
    reference the Parks and Open Spaces URL and add features to the map.
    */
    const parksLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0"
    });
    map.add(parksLayer, 0);

})