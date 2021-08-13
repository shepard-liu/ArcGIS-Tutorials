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

    /**
     * A feature layer can contain a large number of features 
     * stored in ArcGIS. To access a subset of the features, 
     * you can execute either a SQL or spatial query, or both 
     * at the same time. You can return feature attributes, 
     * geometry, or both attributes and geometry for each 
     * record. SQL and spatial queries are useful when you 
     * want to access only a subset of your hosted data.
     */

    // SQL query array
    const parcelLayerSQL = [
        "Choose a SQL where clause...",
        "UseType = 'Residential'",
        "UseType = 'Government'",
        "UseType = 'Irrigated Farm'",
        "TaxRateArea = 10853",
        "TaxRateArea = 10860",
        "TaxRateArea = 08637",
        "Roll_LandValue > 1000000",
        "Roll_LandValue < 1000000"];
    let whereClause = parcelLayerSQL[0];

    //Create a select box widget
    const selectElem = document.createElement("select", "");
    selectElem.setAttribute("class", "esri-widget esri-select");
    selectElem.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
    parcelLayerSQL.forEach(function (query) {
        let optionElem = document.createElement("option");
        optionElem.innerHTML = query;
        optionElem.value = query;
        selectElem.appendChild(optionElem);
    });

    //add widget to the view
    view.ui.add(selectElem, "top-right");

    //create a feature layer
    const parcelLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    });

    /**
     * Use the queryFeatures method to perform a SQL query 
     * against the feature layer. The Query task will be 
     * autocast when the method is called.
     * 
     * The maximum number of features returned by a query 
     * for hosted feature layers is 2000. To return more, 
     * you need to detect the request exceeded the maximum 
     * feature amount with exceededTransferLimit, and then 
     * use the resultOffset parameter to make multiple 
     * requests with the appropriate offset values. To 
     * learn more, visit Query Layer.
     */

    function queryFeatureLayer(extent) {
        //define a query
        const parcelQuery = {
            where: whereClause,
            geometry: extent,
            spatialRelationship: 'intersects',
            outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"],
            returnGeometry: true
        };

        parcelLayer.queryFeatures(parcelQuery).then(results => {
            diplayResults(results);
        }).catch(error => {
            console.log(error.error);
        });
    }

    function diplayResults(results) {
        //Create a blue polygon
        const symbol = {
            type: "simple-fill",
            color: [20, 130, 200, 0.5],
            outline: {
                color: "white",
                width: 0.5
            },
        };

        const popupTemplate = {
            title: "Parcel {APN}",
            content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
        }

        results.features.forEach(feature => {
            feature.symbol = symbol;
            feature.popupTemplate = popupTemplate;
        });

        view.popup.close();
        view.graphics.removeAll();
        view.graphics.addMany(results.features);
    }

    selectElem.addEventListener('change', event => {
        whereClause = event.target.value;
        queryFeatureLayer(view.extent);
    });
})