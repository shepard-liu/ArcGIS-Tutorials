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
     * A hosted feature layer can contain a large number of 
     * features. To display a subset of the features, you 
     * can filter features on the server-side with a definition 
     * expression. Definition expressions are different than 
     * feature layer queries: they only support a SQL where 
     * clause without a geometry (spatial) parameter, and are 
     * only used to filter features at the time they are 
     * displayed in a map or scene. They cannot be used to get 
     * features like a feature layer query.
     * 
     * In this tutorial, you apply a server-side SQL query with 
     * a definitionExpression to filter the LA County Parcels 
     * feature layer .
     */

    // SQL query array
    const sqlExpressions = [
        "Choose a SQL where clause...",
        "Roll_LandValue < 200000",
        "TaxRateArea = 10853",
        "Bedrooms5 > 0",
        "UseType = 'Residential'",
        "Roll_RealEstateExemp > 0"
    ];

    let whereClause = sqlExpressions[0];

    //Create a select box widget
    const selectElem = document.createElement("select", "");
    selectElem.setAttribute("class", "esri-widget esri-select");
    selectElem.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
    sqlExpressions.forEach(function (query) {
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
        definitionExpression: "1=0",
        outFields: ["*"],
        popupTemplate: {
            title: "{UseType}",
            content: "Description: {UseDescription}. Land value: {Roll_LandValue}"
        },
    });
    map.add(parcelLayer);

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

    function setFilterExpression() {
        //define a query
        parcelLayer.definitionExpression = whereClause;
    }

    selectElem.addEventListener('change', event => {
        whereClause = event.target.value;
        setFilterExpression(view.extent);
    });
})