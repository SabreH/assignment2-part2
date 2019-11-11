/*
    Bar & line charts based off of the Arctic Mountains &
    Fiords dlimate data from Stats Canada using es6 classes,
    d3, and chart.js

    Created for CWD3500 - Web Application Frameworks
    
    Created by:

    Sabre Harrisson - 100725581
    Sophie - 100724844
    Melissa Khan - 100708543
*/
//IMPORT BAR AND LINE DISPLAYS
import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';

//BAR DISPLAY GRAPH INFORMATION
let graphData;
let graphHolder;
let lineHolder;
let barWidth = 1000;
let barHeight = 800;
let barPadding = 2;
let barHolder = "#barSpace";

//LINE DISPLAY CHART INFORMATION
let lnHolder = "#lineSpace";
let lnHeight = 900;
let lnWidth = 1000;


//function start the charts
function startChart(){
    console.log('lets make a chart');
    graphHolder = new BarDisplay(graphData, barHolder, barWidth, barHeight, barPadding);
    lineHolder = new LineDisplay(graphData,lnHolder, lnHeight, lnWidth);
}

//external data
fetch('data.json')
    .then(data => data.json())
    .then(data => {
        graphData = data;
        // console.log(graphData);
        startChart();
});
