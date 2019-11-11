//Line Chart Displays Temperature and Years

import * as d3 from 'd3';

export default class LineDisplay {
    constructor(graphData, lnHolder, lnHeight, lnWidth) {
        this.h = lnHeight;
        this.w = lnWidth;
        this.holder = lnHolder;
        this.temp = graphData;
        this.lineFun = d3.line()
            .x(d => (d.year-1970)*31.3)
            .y(d => (this.h/2) - (d.temp*54))
            .curve(d3.curveMonotoneX)
        this.buildLineChart();
    }

    buildLineChart() {
        let svg = d3.select(this.holder)
            .attr("width", this.w +400)
            .attr("height", this.h/2 +70)
        let viz = svg.append("path")
            .attr("d", this.lineFun(this.temp.data))
            .attr("stroke-width","3")
            .attr("stroke","hotpink")
            .attr("fill", "none")
            .attr('transform', 'translate(60, -150)');
        let labels = svg.selectAll("text")
            .data(this.temp.data)
            .enter()
            .append("text")
            .attr('transform', 'translate(60, -150)')
            .text(d => d.temp)
            .attr("x",d => (d.year -1970)  *31.3 +10)
            .attr("y",d => (this.h/2 - d.temp * 54)-20)
            .attr("font-size", "17px")
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "start")
            .attr("dy", "0.35em")
            .attr("font-weight","bold")
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
            .range([0,1400])
            .paddingInner(0.05);

        let yScale = d3.scaleLinear()
            .domain(d3.extent(tempData))
            .range([this.h/2 + 50,0])

        //create the x axis at the bottom and y axis on left side
        let xAxis = d3
            .axisBottom(xScale);

        let yAxis = d3
            .axisLeft(yScale);

        //define the min data for temp value
        let minVal = d3.min(tempData);
        //define the max data for year value
        let maxVal = d3.max(yearData);

        //add the prescription for xscale
        svg.append("g")
            .attr('class','xScale')
            .attr('transform', 'translate(20, ' + yScale(minVal)+")")
            //call the x axis
            .call(xAxis)
            .style("font-size","13px")
            //add the prescription for xscale
            .append("text")
                .attr('transform', 'translate(700,50)')
                .attr("font-size", "20px")
                .style("text-anchor", "end")
                .style("fill", "#454545")
                .text("Year");
            
        // append the group of nums and insert y axis
        svg.append('g')
            .attr('class','ylabel')
            .attr('transform', 'translate(20, 0)')
            .call(yAxis)
            //add the prescription for yscale
            .append("text")
                .attr("transform", "rotate(-90), translate(-200,-40)")
                .attr("font-size", "20px")
                .style("text-anchor", "end")
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
}
