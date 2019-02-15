var URL = "https://raw.githubusercontent.com/elu267/Group_Project_Unit18/master/Resources/skiResorts_geojson.json"

// Perform a GET request to the query URL
d3.json(URL, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

// function that creates the circle markers and gets colors plus size based on altitude
function createFeatures(skiData) {

    var resorts = L.geoJSON(skiData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.Altitude),
                fillColor: getColor(feature.properties.Altitude),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        // creates the pop up information when a marker is clicked by the user
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.ResortName +
            //    "</h3><hr><p>" + feature.properties.URL + "</p>");
                "</h3> <hr><a href=" + feature.properties.URL + ">" + feature.properties.URL + "</a>");
        }
    });

    // Sending our reorts layer to the createMap function
    createMap(resorts);
};

// function increases the size of the markers using a multiplier of 3
function markerSize(size) {
    return size * 3 / 1000;
};

// function that sets the colors and is utilized for the circle markers and legend
function getColor(d) {
    return d > 3500 ? '#b10026' :
        d > 3000 ? '#e31a1c' :
        d > 2500 ? '#fc432a' :
        d > 2000 ? '#fd8d3c' :
        d > 1500 ? '#feb24c' :
        d > 1000 ? '#f7fcb9' :
        d >= 0 ? '#78c679' :
        '#238443';
};

function createMap(resorts) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ"
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ"
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Resorts: resorts
    };

    // Create our map, giving it the streetmap and resort layer to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 3,
        layers: [streetmap, resorts]
    });

    // Setting up the legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(myMap) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1000, 1500, 2000, 2500, 3000, 3500],
            labels = [];
        // labels = ["#238443", "#78c679", "##f7fcb9", "#feb24c", "#feb24c", "#fc432a", "#e31a1c", "#b10026"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);


};