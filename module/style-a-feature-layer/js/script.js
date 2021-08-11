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
     Each feature layer contains features with a single 
     geometry type (point, line, or polygon), and a set of 
     attributes. Feature layers can be styled on the client-side 
     with a renderer. Renderers are responsible for using 
     attribute values to apply the appropriate symbol to each 
     feature when the layer is drawn. Renderers can be used with 
     visual variables and expressions to create more complex, 
     data-driven visualizations.
    */

    //defining a renderer for the trail head layer
    const trailheadsRenderer = {
        "type": "simple",
        "symbol": { //the symbol property defines the type, source, size... for the visualization
            "type": "picture-marker",
            "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            "width": "18px",
            "height": "18px"
        }
    }
    //defining the label style for the trail head layer
    const trailheadsLabels = {
        symbol: {   //white text with halo effect
            type: "text",
            color: "#FFFFFF",
            haloColor: "#5E8D74",
            haloSize: "2px",
            font: {
                size: "12px",
                family: "Noto Sans",
                style: "italic",
                weight: "normal"
            }
        },

        labelPlacement: "above-center",
        labelExpressionInfo: {
            //specify the label text by accessing attribute's fields in Arcade Expression Language
            //the available field can be found at the URL below
            expression: "$feature.TRL_NAME + ' OF ' + $feature.PARK_NAME"
        }
    };

    // Create the layer and set the renderer
    // FeatureLayer autocasts Renderer and LabelingInfo
    const trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
        renderer: trailheadsRenderer,
        labelingInfo: [trailheadsLabels]
    });

    map.add(trailheads);

    /**
     * Use the SimpleRenderer and VisualVariable classes to style trails
     * in the Trails feature layer. Visual variables define the attribute
     * to use to style trails with a greater elevation gain wider compared 
     * to trails with smaller elevation changes. This is one form of 
     * data-driven visualization.
     */
    const trailsRenderer = {
        type: "simple",
        symbol: {
            color: "#BA55D3",
            type: "simple-line",
            style: "solid"
        },
        visualVariables: [
            {
                type: "size",
                field: "ELEV_GAIN",
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxSize: "7px"
            }
        ]
    }

    const trailsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: trailsRenderer,
        opacity: .75
    });

    // Add the layer
    map.add(trailsLayer, 0);

    // Add bikes only trails
    const bikesOnlyTrailsRenderer = {
        type: "simple",
        symbol: {
            type: "simple-line",
            style: "short-dot",
            color: "#FFFFFF",
            width: "5px"
        }
    };

    const bikesOnlyTrailsLayer = new FeatureLayer({
        url:
            "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: bikesOnlyTrailsRenderer,
        definitionExpression: "USE_BIKE = 'YES'"
    });

    map.add(bikesOnlyTrailsLayer, 1);

    //function to create symbol for different parks
    function createFillSymbolForParks(parkType, fillColor) {
        return {
            "value": parkType,
            "symbol": {
                "color": fillColor,
                "type": "simple-fill",
                "style": "solid",
                "outline": {
                    "style": "none"
                }
            },
            "label": parkType
        }
    }

    /**      
     * Use renderers to style feature layer data by unique
     * attribute values. Use the UniqueValueRenderer and
     * SimpleFillSymbol classes to style polygon features
     * with different fill colors, based on the TYPE attribute
     * in the Parks and Open Spaces feature layer.
     */
    const openSpacesRenderer = {
        /**
         * UniqueValueRenderer allows you to symbolize features in 
         * a Layer based on one or more matching string attributes. 
         * This is typically done by using unique colors, fill styles, 
         * or images to represent features with equal values in a string field.
         */
        type: "unique-value",
        field: "TYPE",
        uniqueValueInfos: [
            createFillSymbolForParks("Natural Areas", "#9E559C"),
            createFillSymbolForParks("Regional Open Space", "#A7C636"),
            createFillSymbolForParks("Local Park", "#149ECE"),
            createFillSymbolForParks("Regional Recreation Park", "#ED5151")
        ]
    };

    // Create the layer and set the renderer
    const openSpacesLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
        renderer: openSpacesRenderer,
        opacity: 0.2
    });

    map.add(openSpacesLayer, 0);
})