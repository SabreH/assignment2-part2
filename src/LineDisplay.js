//Line Chart Displays Temperature and Years

import * as d3 from 'd3';

export default class LineDisplay {
    //create the line chart - taking parameters from the index.js
    constructor(graphData, lnHolder, lnHeight, lnWidth) {
        this.h = lnHeight;
        this.w = lnWidth;
        this.holder = lnHolder;
        this.temp = graphData;
        //creating the line based on years and temperature
        this.lineFun = d3.line()
            .x(d => (d.year-1970)*30)
            .y(d => (this.h/2) - (d.temp*108))
            .curve(d3.curveMonotoneX)
        this.buildLineChart();
    }

    buildLineChart() {
        //create the holder for the line chart
        let svg = d3.select(this.holder)
            .attr("width", this.w +300)
            .attr("height", this.h)
        //create the path that the line follows (created above)
        let viz = svg.append("path")
            .attr("d", this.lineFun(this.temp.data))
            //adding css attributes 
            .attr("stroke-width","3")
            .attr("stroke","hotpink")
            .attr("fill", "none")
            .attr('transform', 'translate(60, 50)');
        //create the labels for the chart and position them in the correct spots
        let labels = svg.selectAll("text")
            .data(this.temp.data)
            .enter()
            .append("text")
            .attr('transform', 'translate(60, 50)')
            .text(d => d.temp)
             //x axis = the years (display all years)
            .attr("x",d => (d.year -1970)  *30 +10)
            //y axis = the temp
            .attr("y",d => (this.h/2 - d.temp * 108)-10)
            //css for the label text
            .attr("font-size", "17px")
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "start")
            .attr("dy", "0.35em")
            //change the font and colour based on the position (0 temp)
            .attr("font-weight",(d, i) => {
                if (i === 0 || i === (this.temp.data.length - 1)) {
                    return "bold";
                } else {
                    return "normal";
                }
            })
            .attr("fill",d => {
                if (d.temp > 0) {
                    //return positive colour
                    return `blue`;
                } else {
                    //return negative colour
                    return `red`;
                }
            });
            
        //get the value of temp and year
        let tempData = this.temp.data.map(d=>d.temp);
        let yearData = this.temp.data.map(d=>d.year);
        /*
        add the scale to the x axis and y axis
        the range : the width and height of the graphData
        domain: data of x
        */
        let xScale = d3.scaleBand()
            .domain(yearData)
            .range([0,1200])
            .paddingInner(0.05);

        let yScale = d3.scaleLinear()
            .domain(d3.extent(tempData))
            .range([this.h,0])

        //create the x axis at the bottom and y axis on left side
        let xAxis = d3
            .axisBottom(xScale);

        let yAxis = d3
            .axisLeft(yScale);

        //define the min data for temp value
        let minVal = d3.min(tempData);
        //define the max data for year value
        let maxVal = d3.max(yearData);

        //append the group of nums and insert x axis
        svg.append('g')
            .attr('class','xScale')
            .attr('transform', 'translate(50, ' + yScale(minVal) +")")
            .call(xAxis);
        //add the prescription for xscale
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
        svg.append('g')
            .attr('class','ylabel')
            .attr('transform', 'translate(50, 0)')
            .call(yAxis)
            //add the prescription for yscale
            .append("text")
                .attr("transform", "rotate(-90), translate(-140,-40)")
                .attr("font-size", "18px")
                .style("text-anchor", "start")
                .style("fill", "#454545")
                .text("Temperature (ºC)");

        //add legend for precipitation
        //background
        svg.append("rect")
            .attr("x",100)
            .attr("y", 5)
            .attr("width", 250)
            .attr("height", 80)
            .attr("fill","#cdcdcd")
        //2 small circles
        svg.append("circle")
            .attr("cx",125)
            .attr("cy",30)
            .attr("r", 6)
            .style("fill", "#0000ff")
        svg.append("circle")
            .attr("cx",125)
            .attr("cy",60)
            .attr("r", 6)
            .style("fill", "#ff0000")
        //text display
        svg.append("text")
            .attr("x", 150)
            .attr("y", 30)
            .text("Positive Temperature (ºC)")
            .style("font-size", "15px")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 150)
            .attr("y", 60)
            .text("Negative Temperature (ºC)")
            .style("font-size", "15px")
            .attr("alignment-baseline","middle")
        
    }
    //END buildLineChart :)
};
