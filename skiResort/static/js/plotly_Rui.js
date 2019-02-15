d3.csv('clean_skiResortsNA.csv').then(function(data) {

    // x is each object of data
    const ids = data.map((x) => {
        // console.log(y + " ---- " + JSON.stringify(x));
        return x.ID;
    });
    const names = data.map((x) => { return x.ResortName });
    const sizes = data.map((x) => { return x.ResortSize });
    const adult_price = data.map((x) => { return x.Adult });
    const lat = data.map((x) => { return x.Latitude });
    const long = data.map((x) => {return x.Longitude});
    const easy = data.map((x) => {return x.Easy});
    const state_count = [_.countBy(data.StateProvince, data.StateProvince).head(20)];
    const country_count = [_.countyBy(data.Country, data.Country)];
    const altitude = data.map((x) => {return x.Altitude});
    
    // const canada_
    // id vs size
    // Build a Bubble Chart
    var bubbleLayout_1 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "Altitude" },
        yaxis: { title: "Adult Lift Price"}
    };
    var bubbleData_1 = [{
        x: altitude,
        y: adult_price,
        text: names,
        mode: "markers",
        marker: {
            size: adult_price ** 3,
            color: altitude,
            colorscale: "Earth"
        }
    }];
    // size vs price
    var bubbleLayout_2 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "size" },
        yaxis: { title: "price - adult" }
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

    // // bar chart
    var bubbleLayout_3 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "size" },
        yaxis: { title: "latitude" }
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
            size: long,
            color: long,
            colorscale: "Earth"
        }
    }];
    
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
    var barLayout_1 = {
         margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "Number of ski resorts" },
        yaxis: { title: "State" }
    };
    var barData_1 = [{
        x: state_count[0],
        y: state_count[1],
        // text: names,
        // mode: "markers",
        // marker: {
           // size: lat,
           // color: sizes,
           // colorscale: "Earth"
        // }
    }];
    
    
    Plotly.plot("scatter", bubbleData_1, bubbleLayout_1);

    let button = document.getElementById("toggle_1");
    let toggle_1 = 1;
    button.addEventListener("click", () => {
        switch (++toggle_1 % 5) {
            case 0:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_1, bubbleLayout_1);
                break;
            case 1:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_2, bubbleLayout_2);
                break;
            case 2:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_3, bubbleLayout_3);  
                break;
            case 3:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_4, bubbleLayout_4);
                break;
            case 4:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_5, bubbleLayout_5);
                break;
        }
    })
    
     Plotly.plot("bar", barData_1, barLayout_1);

    let button = document.getElementById("toggle_2");
    let toggle_2 = 1;
    button.addEventListener("click", () => {
        switch (++toggle_2 % 5) {
            case 0:
                Plotly.purge("bar");
                Plotly.plot("bar", barData_1, barLayout_1);
                break;
            case 1:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_2, bubbleLayout_2);
                break;
            case 2:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_3, bubbleLayout_3);  
                break;
            case 3:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_4, bubbleLayout_4);
                break;
            case 4:
                Plotly.purge("scatter");
                Plotly.plot("scatter", bubbleData_5, bubbleLayout_5);
                break;
        }
    })
});
