var margin = { left: 90, top: 90, right: 90, bottom: 90 },
    width = 1000 - margin.left - margin.right, // more flexibility: Math.min(window.innerWidth, 1000)
    height = 1000 - margin.top - margin.bottom, // same: Math.min(window.innerWidth, 1000)
    innerRadius = Math.min(width, height) * .39,
    outerRadius = innerRadius * 1.1;

var names = ["Big Sky", "Park City", "Snowmass", "Vail", "Whistler Blackcomb", "Steamboat", "Breckenridge", "Beaver Creek", "Winter Park", "Fernie", "Lake Louise", "Sun Peaks", "Keystone", "Aspen Highlands", "Powder Mountain", "Killington", "Copper Mountain", "Crested Butte", "Red Mountain", "Sugarloaf", "Easy ", "Intermediate", "Difficult"],
    colors = ["493829", "816C5B", "A9A18C", "613318", "855723", "B99C6B", "8F3B1B", "D57500", "DBCA69", "404F24", "668D3C", "BDD09F", "4E6172", "83929F", "A3ADB8", "493829", "8F3B1B", "668D3C", "4E6172", "D57500", "65B32E", "006BAC", "1D1D1B"],
    opacityDefault = 0.8;

var matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 69, 126], //big-sky-resort//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 152, 71], //park-city//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14.2, 111, 111], //snowmass//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 84, 93], //vail//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 110, 50], //whistler-blackcomb//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 95, 45], //steamboat//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 60, 65], //breckenridge//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28.5, 64.5, 57], //beaver-creek//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 53, 79], //winter-park-resort//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 58, 42], //fernie//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 62, 42], //lake-louise//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13.5, 78, 43.5], //sun-peaks//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 65, 45], //keystone//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24.3, 40.5, 70.2], //aspen-highlands//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 50, 55], //powder-mountain//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37.4, 43, 46], //killington//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 40, 56], //copper-mountain//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 69, 25], //crested-butte//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 50, 50], //red-mountain-resort-rossland//
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 40, 51], //sugarloaf//
    [55, 27, 14.2, 57, 40, 25, 28, 28.5, 11, 42, 35, 13.5, 25, 24.3, 30, 37.4, 30, 27, 20, 28, 0, 0, 0], //easy//
    [69, 152, 111, 84, 110, 95, 60, 64.5, 53, 58, 62, 78, 65, 40.5, 50, 43, 40, 69, 50, 40, 0, 0, 0], //intermediate//
    [126, 71, 111, 93, 50, 45, 65, 57, 79, 42, 42, 43.5, 45, 70.2, 55, 46, 56, 25, 50, 51, 0, 0, 0] //hard//
];

////////////////////////////////////////////////////////////
/////////// Create scale and layout functions //////////////
////////////////////////////////////////////////////////////

var colors = d3.scaleOrdinal()
    .domain(d3.range(names.length))
    .range(colors);

var chord = d3.chord()
    .padAngle(.15)
    .sortChords(d3.descending)

var arc = d3.arc()
    .innerRadius(innerRadius * 1.01)
    .outerRadius(outerRadius);

var path = d3.ribbon()
    .radius(innerRadius);

////////////////////////////////////////////////////////////
////////////////////// Create SVG //////////////////////////
////////////////////////////////////////////////////////////

var svg = d3.select("#chord").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")")
    .datum(chord(matrix));

////////////////////////////////////////////////////////////
////////////////// Draw outer Arcs /////////////////////////
////////////////////////////////////////////////////////////

var outerArcs = svg.selectAll("g.group")
    .data(function(chords) { return chords.groups; })
    .enter().append("g")
    .attr("class", "group")
    .on("mouseover", fade(.1))
    .on("mouseout", fade(opacityDefault))

// text popups
.on("click", mouseoverChord)
    .on("mouseout", mouseoutChord);


////////////////////////////////////////////////////////////
////////////////////// Append names ////////////////////////
////////////////////////////////////////////////////////////

//Append the label names INSIDE outside
outerArcs.append("path")
    .style("fill", function(d) { return colors(d.index); })
    .attr("id", function(d, i) { return "group" + d.index; })
    .attr("d", arc);


outerArcs.append("text")
    .attr("x", 6)
    .attr("dx", 60)
    .attr("dy", 18)
    .append("textPath")
    .attr("href", function(d) { return "#group" + d.index; })
    .text(function(chords, i) { return names[i]; })
    .style("fill", "white");

////////////////////////////////////////////////////////////
////////////////// Draw inner chords ///////////////////////
////////////////////////////////////////////////////////////

svg.selectAll("path.chord")
    .data(function(chords) { return chords; })
    .enter().append("path")
    .attr("class", "chord")
    .style("fill", function(d) { return colors(d.source.index); })
    .style("opacity", opacityDefault * .50)
    .attr("d", path);


////////////////////////////////////////////////////////////
////////////////// Extra Functions /////////////////////////
////////////////////////////////////////////////////////////

function popup() {
    return function(d, i) {
        console.log("love");
    };
} //popup

//Returns an event handler for fading a given chord group.
function fade(opacity) {
    return function(d, i) {
        svg.selectAll("path.chord")
            .filter(function(d) { return d.source.index != i && d.target.index != i; })
            .transition()
            .style("opacity", opacity);
    };
} //fade

//Highlight hovered over chord
function mouseoverChord(d, i) {

    //Decrease opacity to all
    svg.selectAll("path.chord")
        .transition()
        .style("opacity", 0.1);
    //Show hovered over chord with full opacity
    d3.select(this)
        .transition()
        .style("opacity", 1);

    //Define and show the tooltip over the mouse location
    $(this).popover({
        placement: 'auto top',
        placement: 'right',
        container: 'body',
        animation: false,
        offset: "20px -100px",
        followMouse: true,
        trigger: 'click',
        html: true,
    });
    $(this).popover('show');
}
//Bring all chords back to default opacity
function mouseoutChord(d) {
    //Hide the tooltip
    $('.popover').each(function() {
            $(this).remove();
        })
        //Set opacity back to default for all
    svg.selectAll("path.chord")
        .transition()
        .style("opacity", opacityDefault);
} //function mouseoutChord