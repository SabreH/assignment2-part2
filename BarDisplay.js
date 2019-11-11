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

    // set the width and height of the svg
    //create the svg as the graph
    let svg = d3.select(this.barHolder)
        .attr("width", this.w+300)
        //add extra height to show negative values
        .attr("height", this.h);
    
    //get the precip and year values from data.json
    let precipData = this.graphData.data.map(d=>d.precip);
    let yearData = this.graphData.data.map(d=>d.year);

    //add the scale to the x axis
    let xScale = d3.scaleBand()
        .domain(yearData)
        .range([0,1200])
        .paddingInner(0.05);
        
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

    // append the new group of the rect (bars)
    svg.append('g')
        .attr('transform', 'translate(30, 0)')
        //create the rects
        .selectAll("rect")
            //usse the data
            .data(this.graphData.data)
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
                    return `rgb(${Math.abs(d.precip)*255},77,190)`;
                    
                } else {
                    //if its less than 0 change the colour to darker colours - orange/fall
                    return `rgb(${Math.abs(d.precip)*1},201,161)`;
                }
            });

    // append the group of labels 
    svg.append('g')
        //create the classes for the labels
        .attr('class','labels')
        //get all the text
        .selectAll("text")
            //get the data
            .data(this.graphData.data)
            .enter()
            //make the text go to the proper positions
            .append("text")
                //move the text over to be on top the bar - the middle of the bar
                .attr('transform', 'translate(60, 0)')
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
                .attr("fill", "#454545")
                //change the font size
                .attr("font-size", "17px");
    
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
            .attr('transform', 'translate('+ (xScale(maxVal)+80)+ ',15)')
            .attr("font-size", "18px")
            .style("text-anchor", "end")
            .style("fill", "#454545")
            .text("Year");
        

    // append the group of nums and insert y axis
    svg.append("g")
        .attr('class','yScale')
        .attr('transform', 'translate(50, 0)')
        .call(yAxis)
        //add the prescription for yscale
        .append("text")
            .attr("transform", "rotate(-90), translate(-120,-40)")
            .attr("font-size", "18px")
            .style("text-anchor", "start")
            .style("fill", "#454545")
            .text("Precipitation (%)");
    
    //add legend for precipitation
    //background
    svg.append("rect")
        .attr("x",100).
        attr("y", 5)
        .attr("width", 250)
        .attr("height", 80)
        .attr("fill","#cdcdcd")
    //2 small circles
    svg.append("circle")
        .attr("cx",125)
        .attr("cy",30)
        .attr("r", 6)
        .style("fill", "#ff4dbe")
    svg.append("circle")
        .attr("cx",125)
        .attr("cy",60)
        .attr("r", 6)
        .style("fill", "#01c9a1")
    //text display
    svg.append("text")
        .attr("x", 150)
        .attr("y", 30)
        .text("Positive Precipitation (%)")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
    svg.append("text")
        .attr("x", 150)
        .attr("y", 60)
        .text("Negative Precipitation (%)")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
    
    //END OF START CHART
    }

 // END OF BAR DISPLAY
}
