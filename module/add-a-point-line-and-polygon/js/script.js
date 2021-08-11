var moduleNames = [
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
];

require(moduleNames, function (
    esriConfig,
    Map,
    MapView,
    Graphic,
    GraphicsLayer
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

    //create a GraphicsLayer object
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    //define a point graphic
    //instantiate an object with required properties
    const pointGraphic = new Graphic({
        geometry: {     //type and positioning of geographic feature
            type: "point",
            longitude: -118.80657463861,
            latitude: 34.0005930608889
        },
        symbol: {       //the representation of feature on the map
            type: "simple-marker",
            color: [226, 119, 40], //fill color
            outline: {
                style: "dash-dot",
                color: [255, 255, 255],       //line color
                width: 2
            }
        }
    });

    /*Note: The ArcGIS API has a programming pattern called "Autocasting"
            Autocasting casts JavaScript objects as ArcGIS API for JavaScript
            class types without the need for these classes to be explicity 
            imported by the app developer.
            we only need to set the 'type' property (in some cases, type can be
            implied)
    */

    //define a line graphic
    const lineGraphic = new Graphic({
        geometry: {
            type: "polyline",
            paths: [
                [-118.821527826096, 34.0139576938577], //Longitude, latitude
                [-118.814893761649, 34.0080602407843], //Longitude, latitude
                [-118.808878330345, 34.0016642996246]  //Longitude, latitude
            ]
        },
        symbol: {
            type: "simple-line",
            color: [226, 119, 40], // Orange
            width: 2
        }
    });

    /*  Polygon graphics support a number of Symbol types, such as SimpleFillSymbol,
        PictureFillSymbol, SimpleMarkerSymbol, and TextSymbol.It is also important to
        note that outer polygon ring coordinates should be added in clock - wise 
        order, while inner ring coordinates(islands) should be added in counter
        - clockwise order.*/

    //define a popupTemplate for polygon
    //code a html snippet for the popup content
    let popupHTML =
        "<span style=\"font-weight:bold\">Haoyu Liu</span><span> marked 2 hours ago</span>" +
        "<div>Notes:</div>" + "<div style=\"color:white;background-color:gray\">{description}</div>";

    //The popupTemplate replaces "{...}" with property value of attributes.
    //html is well supported. 
    const polygonPopupTemplate = {
        title: "{featureID}",
        content: popupHTML
    }

    const polygonGraphic = ({
        geometry: {
            type: "polygon",
            rings: [
                [-118.818984489994, 34.0137559967283], //Longitude, latitude
                [-118.806796597377, 34.0215816298725], //Longitude, latitude
                [-118.791432890735, 34.0163883241613], //Longitude, latitude
                [-118.79596686535, 34.008564864635],   //Longitude, latitude
                [-118.808558110679, 34.0035027131376]  //Longitude, latitude
            ]
        },

        symbol: {
            type: "simple-fill",
            color: [227, 139, 79, 0.8],  // Orange, opacity 80%
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        },

        attributes: {
            featureID: "p-osfn287d",
            description: "I'm moving to this area.<br>Lots of people. Good spot to investigate."
        },

        popupTemplate: polygonPopupTemplate,
    });

    //add the graphic object to the layer
    graphicsLayer.add(pointGraphic);
    graphicsLayer.add(lineGraphic);
    graphicsLayer.add(polygonGraphic);
})