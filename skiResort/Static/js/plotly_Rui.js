
    d3.csv('clean_skiResortsNA.csv').then(function(data){
     
      // x is each object of data
      const ids = data.map((x)=>{
        // console.log(y + " ---- " + JSON.stringify(x));
        return x.ID;
      });
      const names = data.map((x)=>{return x.ResortName});
      const sizes = data.map((x)=>{return x.ResortSize});
      const adult_price = data.map((x)=>{return x.Adult});
      const lat = data.map((x)=>{return x.Latitude});
      // const canada_
      // id vs size
      // Build a Bubble Chart
      var bubbleLayout_1 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "ID" },
        yaxis:{title: "Size"}
      };
      var bubbleData_1 = [
        {
          x: ids,   
          y: sizes,
          text: names,
          mode: "markers",
          marker: {
            size: sizes**3,
            color: ids,
            colorscale: "Earth"
          }
        }
      ];
      // size vs price
      var bubbleLayout_2 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "size" },
        yaxis:{title: "price - adult"}
      };
      var bubbleData_2 = [
        {
          x: sizes,   
          y: adult_price,
          text: names,
          mode: "markers",
          marker: {
            size: adult_price**0.2,
            color: sizes,
            colorscale: "Earth"
          }
        }
      ];

      // // bar chart
      var bubbleLayout_3 = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "size" },
        yaxis:{title: "latitude"}
      };
      var bubbleData_3 = [
        {
          x: sizes,   
          y: lat,
          text: names,
          mode: "markers",
          marker: {
            size: lat,
            color: sizes,
            colorscale: "Earth"
          }
        }
      ];

    Plotly.plot("scatter", bubbleData_1, bubbleLayout_1);  

    let button = document.getElementById("toggle");
    let toggle = 1;
    button.addEventListener("click",() =>{
     switch(++toggle%3) {
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
      break;}
    })
  });
  