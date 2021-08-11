var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/SceneView"
];
require(moduleNames, function (esriConfig, Map, SceneView) {

    esriConfig.apiKey = "AAPK3ee8962475e24e548bddf1e58ceec808hY6UFLsHuUIcbaa2lbGVcICnrnCwGcKfCPc_SNCxqgv088mqfUaM5JgIZaZHwNdv";

    //Create a Map and set the basemap property to arcgis-topographic 
    //and the ground property to world-elevation
    const map = new Map({
        basemap: "arcgis-topographic", //Basemap layer service
        ground: "world-elevation", //Elevation service
    });

    /*
    Use a SceneView class to set the map and layers to draw, as 
    well as to define the camera position. The camera is the point
    from which the visible extent of the SceneView is determined.
    The tilt property refers to the number of degrees from the
    surface that the camera is pointed.
    */
    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                x: -118.808, //Longitude
                y: 33.961, //Latitude
                z: 2000 //Meters
            },
            tilt: 75
        }
    });
});