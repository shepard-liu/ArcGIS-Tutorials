var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/widgets/Locate",
    "esri/widgets/Track",
    "esri/Graphic"
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,

    Locate,
    Track,
    Graphic
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
        center: [-40, 28], // Longitude, latitude
        zoom: 2, // Zoom level
        container: "viewDiv" // Div element
    });

    /**
     * The Locate widget uses HTML5 to find your device location
     * and zoom the map. Add this widget to the map to find and
     * display your current location.
     */
    //create a locate widget

    /**
     * At the end of the code in the main function, create 
     * the Locate widget and set useHeadingEnabled to false
     * so it does not change the rotation of the map. Use 
     * the goToOverride to provide your own custom zoom 
     * functionality for the widget. In this case, it will 
     * zoom the map to a scale of 1500. Add the widget to 
     * the top left of the view.
     */
    const locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function (view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    });

    view.ui.add(locate, "bottom-right");

    /**
     * The Track widget animates the view to your current location.
     * Tracking is activated by toggling the widget on and off. 
     * By default it will automatically rotate the view according 
     * to your direction of travel. You generally only use one 
     * geolocation widget, so remove the Locate widget and add 
     * the Track widget.
     */

    const track = new Track({
        view: view,
        graphic: new Graphic({
            symbol: {
                type: "simple-marker",
                size: "12px",
                color: "green",
                outline: {
                    color: "#efefef",
                    width: "1.5px"
                }
            }
        }),
        useHeadingEnabled: false
    });
    view.ui.add(track, "bottom-right");
})