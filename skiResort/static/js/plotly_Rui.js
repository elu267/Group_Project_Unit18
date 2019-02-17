d3.json('/resorts').then(function(data) {

    // x is each object of data
    const ids = data.map((x) => {
        return x.ID;
    });
    const names = data.map((x) => { return x.ResortName + ", " + x.StateProvince + ", " + x.Country });
    const sizes = data.map((x) => { return x.ResortSize });
    
    const adult_price = data.map((x) => { return x.Adult });
    const youth_price = data.map((x) => {return x.Youth});
    const child_price = data.map((x) => {return x.Child});
    
    const lat = data.map((x) => { return x.Latitude });
    const long = data.map((x) => { return x.Longitude });
    const easy = data.map((x) => { return x.Easy });

    var state = data.map(x => { return x.StateProvince});
    var state_counts ={};
    for(var i = 0; i < state.length; i++){state_counts[state[i]]=1+(state_counts[state[i]] || 0)};
    var state_counts_output = Object.entries(state_counts).map(([key, value])=>({key,value}));
    var state_counts_output = state_counts_output.slice(0,15);
    var state_counts_output_key = state_counts_output.map((x)=>{return x.key});
    var state_counts_output_value = state_counts_output.map((x)=>{return x.value});

    var country = data.map(x => { return x.Country});
    var country_counts ={};
    for(var i = 0; i < country.length; i++){country_counts[country[i]]=1+(country_counts[country[i]] || 0)};
    var country_counts_output = Object.entries(country_counts).map(([key, value])=>({key,value}));
    var country_counts_output_key = country_counts_output.map((x)=>{return x.key});
    var country_counts_output_value = country_counts_output.map((x)=>{return x.value});

    const altitude = data.map((x) => { return x.Altitude });
    
    // Build a Bubble Chart
    // adult lift price vs altitude
    var bubbleLayout_1 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "Altitude" },
        yaxis: { title: "Adult Lift Price" }
    };
    var bubbleData_1 = [{
        x: altitude,
        y: adult_price,
        text: names,
        mode: "markers",
        marker: {
            size: adult_price ** 0.2,
            color: altitude,
            colorscale: "Earth"
        }
    }];

    // size vs adult lift price
    var bubbleLayout_2 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "Resort Size" },
        yaxis: { title: "Adult Lift Price" }
    };
    var bubbleData_2 = [{
        x: sizes,
        y: adult_price,
        text: names,
        mode: "markers",
        marker: {
            size: adult_price ** 0.2,
            color: sizes,
            colorscale: "Earth"
        }
    }];

    // resort size vs latitude
    var bubbleLayout_3 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "Resort Size" },
        yaxis: { title: "Latitude" }
    };
    var bubbleData_3 = [{
        x: sizes,
        y: lat,
        text: names,
        mode: "markers",
        marker: {
            size: lat,
            color: sizes,
            colorscale: "Earth"
        }
    }];

    // longitude vs easy slope
    var bubbleLayout_4 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "Longitude" },
        yaxis: { title: "Easy Slope" }
    };
    var bubbleData_4 = [{
        x: long,
        y: easy,
        text: names,
        mode: "markers",
        marker: {
            size: easy
            // color: easy,
            // colorscale: "Earth"
        }
    }];

    // longitude vs latitude
    var bubbleLayout_5 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "Longtitude" },
        yaxis: { title: "Latitude" }
    };
    var bubbleData_5 = [{
        x: long,
        y: lat,
        text: names,
        mode: "markers",
        // marker: {
        // size: lat,
        // color: sizes,
        // colorscale: "Earth"
        // }
    }];

    // top 15 ski resorts
    var barLayout_1 = {
        yaxis: { title: "Number of ski resorts" }
    };
    
    var barData_1 = [{
        x: state_counts_output_key,
        y: state_counts_output_value,
        type: "bar",
        marker: {color: state_counts_output_value,
        colorscale: "Earth"}
    }];



    // number of ski resort Canada vs US
    var barLayout_2 = {
        yaxis: { title: "Number of ski resorts" }
    };
    var barData_2 = [{
        x: country_counts_output_key,
        y: country_counts_output_value,
        type: bar
    }];

    Plotly.plot("scatter", bubbleData_5, bubbleLayout_5);

    let button = document.getElementById("toggle_1");
    let toggle_1 = 1;
    button.addEventListener("click", () => {
        switch (++toggle_1 % 5) {
            case 0:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_1, bubbleLayout_1); // adult lift price vs altitude
                break;
            case 1:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_2, bubbleLayout_2); // size vs adult lift price
                break;
            case 2:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_3, bubbleLayout_3); // resort size vs latitude
                break;
            case 3:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_4, bubbleLayout_4); // longitude vs easy slope
                break;
            case 4:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_5, bubbleLayout_5); // longitude vs latitude
                break;
        }
    })

    Plotly.plot("bar", barData_1);

    let button2 = document.getElementById("toggle_2");
    let toggle_2 = 1;
    button2.addEventListener("click", () => {
        switch (++toggle_2 % 2) {
            case 0:
                Plotly.purge("bar");
                Plotly.plot("bar", barData_1, barLayout_1); // top 15 ski resorts
                break;
            case 1:
                Plotly.purge("bar");
                Plotly.plot("bar", barData_2, barLayout_2); // number of ski resort Canada vs US
                break;
        }
    })
});
