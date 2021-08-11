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

    // Define a pop-up for Trailheads
    // The fields used in the content property will be queried from the server
    const popupTrailheads = {
        "title": "Trailhead",
        "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    }

    const trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        //outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
        popupTemplate: popupTrailheads
    });

    map.add(trailheads);

    // Define a popup for Trails
    /**
     * You can display different types of charts, also known as media 
     * content, in pop-ups. Charts are created by defining the type 
     * and fields (attributes) values. Use the PopupTemplate class 
     * to define a bar chart that shows the minimum and maximum 
     * elevation for the Trails feature layer.
     */
    const popupTrails = {
        title: "Trail Information",
        content: [{
            type: "media",
            mediaInfos: [{
                type: "column-chart",
                caption: "",
                value: {
                    fields: ["ELEV_MIN", "ELEV_MAX"],
                    normalizeField: true,
                    tooltipField: "Min and max elevation values"
                }
            }]
        }]
    }

    const trails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
        //outFields: ["TRL_NAME", "ELEV_GAIN"],
        popupTemplate: popupTrails
    });

    map.add(trails, 0);


    /**
     * Feature attributes can also be displayed in a table. Use the 
     * PopupTemplate and fieldInfos classes to display attribute 
     * names and values in a table for the Parks and Open Spaces 
     * feature layer. One of the advantages of using a table with 
     * fieldInfos is the ability to format field values in different 
     * ways, for example, to show currency or the number of decimal places.
     */

    // Define popup for Parks and Open Spaces
    const popupOpenspaces = {
        "title": "{PARK_NAME}",
        "content": [{
            "type": "fields",
            "fieldInfos": [
                {
                    "fieldName": "AGNCY_NAME",
                    "label": "Agency",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "TYPE",
                    "label": "Type",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },
                {
                    "fieldName": "ACCESS_TYP",
                    "label": "Access",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                },

                {
                    "fieldName": "GIS_ACRES",
                    "label": "Acres",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },

                    "stringFieldOption": "text-box"
                }
            ]
        }]
    }

    const openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
        outFields: ["TYPE", "PARK_NAME", "AGNCY_NAME", "ACCESS_TYP", "GIS_ACRES", "TRLS_MI", "TOTAL_GOOD", "TOTAL_FAIR", "TOTAL_POOR"],
        popupTemplate: popupOpenspaces
    });

    map.add(openspaces, 0);
})