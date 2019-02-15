var url = '/'

// Define variables for our base layers
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" + "access_token=pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ");

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ");

// Layers for skiresorts data.
var skiresorts = new L.LayerGroup();

// Create a map object
var myMap = L.map("map", {
    center: [53.2996011, -100.7059685],
    zoom: 8,
    layers: [graymap, skiresorts],
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
});

// Add base layers
var baseMaps = {
    Gray: graymap.addTo(myMap),
    Satellite: satellite
};

// Add overlay
var overLay = {
    "Ski Resorts": skiresorts
};

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overLay, {
    collapsed: false
}).addTo(myMap);

// Query variables
var data = "https://raw.githubusercontent.com/elu267/Group_Project_Unit18/master/Resources/skiResorts_geojson.json";
var coordinates = "Coordinates";
var resortname = "ResortName";
var stateprovince = "StateProvince";
var country = "Country";

// Assemble query
var skiinfo = data;

// Grab the data with d3
d3.json(skiinfo, function(response) {

    // - - - - - - - - - - - - - - - - - - - 
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            color: "black",
            fillColor: "black",
            radius: 10,
            stroke: true,
            weight: 0.5
        };
    }

    // add GeoJSON layer to the map
    L.geoJson(data, {
            pointToLayer: function(feature, coordinates) {
                return L.circleMarker(coordinates);
            },
            style: styleInfo,
            onEachFeature: function(feature, layer) {
                layer.bindPopup("ResortName: " + feature.properties.ResortName + "<br>StateProvince: " + feature.properties.StateProvince + "<br>Country" + feature.properties.Country);
            }

        }).addTo(skiresorts),

        skiresorts.addTo(myMap);
});