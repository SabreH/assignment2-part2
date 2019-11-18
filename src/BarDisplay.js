//Bar Chart Displays Precipitation and Years

import * as d3 from "d3";

//creating the barDisplay - Bar Chart
export default class BarDisplay {
    //taking the information/properties from index.js
    constructor(graphData, barHolder, barWidth, barHeight, padding){
        this.w = barWidth;
        this.h = barHeight;
        this.padding = padding;
        this.barHolder = barHolder;
        this.graphData = graphData;
        this.buildChart();
    }
    
    //starting to build the chart
    buildChart() {
    let data = this.graphData;
    console.log(data);

    let seasonsName = 0;
    seasonsName = parseInt(seasonsName);
    console.log(seasonsName);

    let dataset = data.seasons[seasonsName].seasonData;
    //this is the fall data
    let dataset1 = data.seasons[0].seasonData;
    console.log(dataset1);

    //winter data
    let dataset2 = data.seasons[1].seasonData;
    console.log(dataset2);
    // set the width and height of the svg
    //create the svg as the graph
    let svg = d3.select(this.barHolder)
        .attr("width", this.w+300)
        //add extra height to show negative values
        .attr("height", this.h);
    
    
    //get the precip and year values from data.json
    let precipData = dataset.map(d=>d.precip);
    console.log(precipData);

    let yearData = dataset.map(d=>d.year);
    console.log(yearData);   

    //add the scale to the x axis
    let xScale = d3.scaleBand()
        .domain(yearData)
        .range([0,1200])
        .paddingInner(0.07);
        
        
    // add the y scale/numbers to the y axis
    let yScale = d3.scaleLinear()
        .domain(d3.extent(precipData))
        .range([this.h,0])

    //create the x axis using the scale of the xScale
    let xAxis = d3
        .axisBottom(xScale);

    //creating the y axis using the precip nums
    let yAxis = d3
        .axisLeft(yScale)
        .ticks(20);
        // .tickFormat(d => d + ' Precip');

    // let fallButton = d3.selectAll('body').append('button').text('fall').on('click').data(dataset1).remove().buildChart();
    // let winterButton = d3.selectAll('body').append('button').text('winter').on('click').data(dataset2).remove().buildChart();



    // append the new group of the rect (bars)
    svg.append('g')
        .attr('transform', 'translate(30, 0)')
        //create the rects
        .selectAll("rect")
            //usse the data
            .data(data.seasons[0].seasonData)
            .enter()
            .append("rect")
            //the width position
            .attr("x", d => xScale(d.year)+25)
            //the height is the precipitation 
            .attr("y", d =>{
                //get the height by using an if statement in case of neg nums
                if(d.precip>=0){
                    return yScale(d.precip)
                }
                else{
                    return yScale(0);	
                }
            })
            //the width plus the padding
            .attr("width", xScale.bandwidth)
            //change the height by finding the absolute number of the height
            .attr("height", d => Math.abs(yScale(0) - yScale(d.precip)))
            //changing the colours of the bars
            .attr("fill",d => {
                if (d.precip > 0) {
                    //change it to a brighter colours - pinks
                    return `#C35300`;
                    
                } else {
                    //if its less than 0 change the colour to darker colours - orange/fall
                    return `rgb(${Math.abs(d.precip)*1},131,121)`;
                }
            });
    
    // append the group of labels 
    svg.append('g')
        //create the classes for the labels
        .attr('class','labels')
        //get all the text
        .selectAll("text")
            //get the data
            .data(data.seasons[seasonsName].seasonData)
            .enter()
            //make the text go to the proper positions
            .append("text")
                //move the text over to be on top the bar - the middle of the bar
                .attr('transform', 'translate(60, 0)')
                .attr("align-content","center")
                //make the text be the label of the precipitation its on
                .text(d => d.precip)
                //get the x attribute to be 10 higher than the bar
                .attr("x",(d ,i)=> i * (this.w / precipData.length + 4.85 ))
                .attr("y",(d) => {
                    if (d.precip > 0) {
                        //make the label 20px lower
                        return yScale(d.precip)+20;
                    } else {
                        //make the label 10 px higher
                        return yScale(d.precip)-10;
                    }
                })
                //change the fill of the labels
                .attr("fill", "black")
                //change the font size
                .attr("font-size", "15px")
                //change the font-weight for visual purposes
                .attr("font-weight", "700");
    
    //define the min data for precip value
    let minVal = d3.min(precipData);
    //define the max data for year value
    let maxVal = d3.max(yearData);

    // append the group of nums and insert x axis
    svg.append("g")
        .attr('class','xScale')
        .attr('transform', 'translate(50, ' + yScale(minVal)+")")
        //call the x axis
        .call(xAxis)
        //add the prescription for xscale
        .append("text")
            .attr('transform', 'translate(600,40)')
            .attr("font-size", "23px")
            .style("text-anchor", "end")
            .style("fill", "#0A8379")
            .attr("font-weight","600")
            .text("Year");
        

    // append the group of nums and insert y axis
    svg.append("g")
        .attr('class','yScale')
        .attr('transform', 'translate(50, 0)')
        .call(yAxis)
        //add the prescription for yscale
        .append("text")
            .attr("transform", "rotate(-90), translate(-500,-40)")
            .attr("font-size", "23px")
            .style("text-anchor", "start")
            .style("fill", "#0A8379")
            .attr("font-weight","600")
            .text("Precipitation (%)");
    
    //add legend for precipitation
    //background
    svg.append("rect")
        .attr("x",100)
        .attr("y", 5)
        .attr("width", 300)
        .attr("height", 85)
        .attr("fill","#E5E5E5")
    //2 small circles
    svg.append("circle")
        .attr("cx",125)
        .attr("cy",30)
        .attr("r", 6)
        .style("fill", "#C35300")
    svg.append("circle")
        .attr("cx",125)
        .attr("cy",60)
        .attr("r", 6)
        .style("fill", "#0D8379")
    //text display
    svg.append("text")
        .attr("x", 150)
        .attr("y", 35)
        .text("Positive Precipitation (%)")
        .style("font-size", "20px")
        .attr("alignment-baseline","middle")
    svg.append("text")
        .attr("x", 150)
        .attr("y", 70)
        .text("Negative Precipitation (%)")
        .style("font-size", "20px")
        .attr("alignment-baseline","middle")
    //END OF START CHART
    }
 // END OF BAR DISPLAY
}
