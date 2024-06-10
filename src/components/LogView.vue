<template>
    <div id="logview" class="container" ref="containerRef"> 
        <div> 
            <svg id="knowledge" ></svg>
        </div>

        <div id="logContainer" class="overflow-x-auto">
            <svg id="log" style="min-width:100%;"></svg>
        </div>

        <div>
            <svg id="line" style="width: 100%;" ref="lineRef"></svg>
        </div>
        
    </div>
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, ref, watch } from "vue";
import getKnowledgeColor from '../utils/index'; 
import data from '../assets/log.json'

const lineData = [
      [10, 20, 30, 40, 50],
      [30, 40, 10, 20, 50],
      [20, 10, 30, 50, 40],
      [15, 20, 27, 32, 35],
      [10, 20, 30, 40, 45],
      [0, 5, 15, 20, 40],
      [0, 10, 25, 30, 45],
      [0, 15, 20, 35, 50]
];

var selectedKnowledge = -1;


const knowledge = ["r8S3g", "t5V9e", "m3D1v", "s8Y2f", "k4W1c", "g7R2j", "b3C9s", "y9W5d"]

const containerRef = ref()
const lineRef = ref()
const intervalX = 1;
const intervalY = 3;
const cellWidth = 16 + intervalX;
const cellHeight = 16 + intervalY;

const highlightColor = "yellow"
const highlightWidth = 2

const lineWidth = 1;
const newLineWidth = 3;

onMounted(()=>{
    initKnowledge()
    initLog()
    initLineChart()
})
//状态颜色映射
function getColor(status) {
    if(status == "Absolutely_Correct")
        return "#99BC85";
    if(status == "Partially_Correct")
        return "#F9F7C9";
    return "#F19292"; 
}

function addHighlight(index) {
    const dots = d3.selectAll(".kl")

    const rects = d3.selectAll(".log")

    const dotSvg = d3.select("#knowledge")
    const svg = d3.select("#log")
    //滤镜
    const filter = dotSvg.append("defs")
    .append("filter")
    .attr("id", "blur")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

    filter.append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 3);

    // dots.filter((d, i) => i !== index)
    // .attr("filter", "url(#blur)");
    

    rects.filter((d, i) => d.xx !== index)
    .attr("filter", "url(#blur)")
    .attr("opacity", 0.5);
    

    //突出显示
    svg.append("defs")
    .append("filter")
    .attr("id", "dropShadow")
    .attr("height", "130%")
    .attr("width", "130%")
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");

    // rects.filter((d, i) => d.xx === index)
    // .style("transform", "translateZ(20px)")
    // .style("transform-style", "preserve-3d");

    //折线图
    const lines = d3.selectAll(".brokenLine");
    lines.filter((d, i) => i === index)
    .attr("stroke-width", newLineWidth)

    lines.filter((d, i) => d.xx !== index)
    .attr("opacity", 0.5);
}

function removeHighlight(index) {
    const dots = d3.selectAll(".kl")

    const rects = d3.selectAll(".log")

    const dotSvg = d3.select("#knowledge")
    const svg = d3.select("#log")

    dots.attr("filter", null)
    rects.attr("filter", null)

    //折线图
    const lines = d3.selectAll(".brokenLine");
    lines.filter((d, i) => i === index)
    .attr("stroke-width", lineWidth)

    lines.filter((d, i) => d.xx !== index)
    .attr("opacity", 1);
}

function initKnowledge() {
    const r = (cellHeight-intervalY)/2
    const radius = 2
    const margin = { top: 0, right: 10, bottom: 20, left: 10 }
    const dotSvg = d3.select("#knowledge")

    const kdot = dotSvg.selectAll("g")
        .data(knowledge)
        .join("g")
        .attr("class", "kl")
        .attr("transform", function(d, i) {
            return `translate(${margin.left}, ${i * cellHeight + margin.top + r})`
        })
        .append("circle")
            .attr("r", r)
            .attr("fill", d => getKnowledgeColor.getKnowledgeColor(d))
        .on("click", handleClick)
    
   

    function handleClick(event, d) {

        const xy = d3.pointer(event, dotSvg.node());
        const yv = xy[1]
        const index = Math.floor((yv-margin.top)/ cellHeight);

        console.log(index)

        if(selectedKnowledge == index) {
            removeHighlight(index);    //参数
            selectedKnowledge = -1;
            return;
        }

        if(selectedKnowledge != -1) {
            removeHighlight(selectedKnowledge)
        }
        addHighlight(index)
        selectedKnowledge = index;
    }
}
function initLineChart() {
    // const start_x = cellWidth * logData.length + 50
    const width = lineRef.value.clientWidth;
    // const width = cellHeight * knowledge.length + 40;
    const height = cellHeight * knowledge.length ;
    const axis_color = "#b2bbbe"

    const margin = { top: 10, right: 10, bottom: 20, left: 30 }
    // const lineSvg = d3
    //       .select("#logview")
    //       .append("svg")
    //       .attr("viewBox", [0, 0, width, height])
    //       .attr("width", width)
    //       .attr("height", height)
    //       .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;")
    //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    const svg = d3.select("#line")
    const lineG = svg.append("g").attr("class", "line").attr("transform", `translate(${ margin.left}, ${margin.top})`)

    var x = d3.scaleLinear().range([0, width-margin.left-margin.right]).nice();
    var y = d3.scaleLinear().range([height-margin.top-margin.bottom, 0]).nice();

    var xAxis = d3.axisBottom(x).ticks(5).tickSizeOuter(0);
    var yAxis = d3.axisLeft(y).ticks(5).tickSizeOuter(0);

    // 添加x轴
    lineG.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height-margin.top-margin.bottom})`)
      .call(xAxis);

    // 添加y轴
    lineG.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    //坐标轴样式
    function changeAxisStyle() {
        // 设置 x 轴线的颜色和宽度
        d3.select(".x.axis path")
        .style("stroke", axis_color)
        .style("stroke-width", "1px");

        // 设置 y 轴线的颜色和宽度  
        d3.select(".y.axis path")
        .style("stroke", axis_color)
        .style("stroke-width", "1px");

        // 设置 x 轴刻度线的颜色和长度
        d3.selectAll(".x.axis .tick line")
        .style("stroke", axis_color)
        .style("stroke-length", "2px");

        // 设置 y 轴刻度线的颜色和长度
        d3.selectAll(".y.axis .tick line")
        .style("stroke", axis_color)
        .style("stroke-length", "2px");

        // 设置 x 轴刻度文字的字体、大小和颜色
        d3.selectAll(".x.axis .tick text")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("fill", axis_color);

        // 设置 y 轴刻度文字的样式
        d3.selectAll(".y.axis .tick text")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("fill", axis_color);
    }
    
    // 数据绑定
    var line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveCardinal);

    // 添加多条线
    var paths = lineG.selectAll(".brokenLine")
      .data(lineData)
      .enter()
      .append("path")
      .attr("class", "brokenLine")
      .attr("fill", "none")
      .attr("stroke", (d, i) => getKnowledgeColor.getKnowledgeColor(knowledge[i])) // 使用不同颜色
      .attr("stroke-width", lineWidth)
      .attr("d", line);

     // 更新函数
     function updateChart(newDataset) {
      // 更新比例尺的域
      x.domain([0, newDataset[0].length - 1]);
      y.domain([0, d3.max(newDataset.flat())]);

      // 更新轴
      lineG.select(".x.axis")
        .transition()
        .duration(500)
        .call(xAxis);

      lineG.select(".y.axis")
        .transition()
        .duration(500)
        .call(yAxis);

      // 更新线条
      paths.data(newDataset)
        .transition()
        .duration(500)
        .attr("d", line);
    
        changeAxisStyle();
    }

    updateChart(lineData)
}

function initLog() {
    const logData = data.data
    // const width = containerRef.value.clientWidth;
    const width = cellWidth * logData.length + 10;
    const height = cellHeight * knowledge.length + 5;

    const margin = {left: 0, right: 5, top: 0.5, bottom: 0.5}

    const radius = 2

    const gray = "#F1F1F1"


    //处理数据
    var n = 8, m = logData.length;
    var table = new Array(n);
    for(var i = 0; i < n; i++) {
        table[i] = new Array();
    }

    for(var j = 0; j < m; j ++) {

        var k_index = knowledge.indexOf(logData[j].knowledge)
        for(var i = 0; i < n; i ++) 
            if(i == k_index)
                table[i][j] = {"xx": i, "yy": j, "log": logData[j]}
            else
                table[i][j] = {"xx": i, "yy": j, "log": null}
    }
    table = table.flat()
    // console.log(table)

    // const svg = d3
    //       .select("#logview")
    //       .append("svg")
    //       .attr("viewBox", [0, 0, width+height, height])
    //       .attr("width", width+height)
    //       .attr("height", height)
    //       .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    const svg = d3.select("#log")

    svg.attr("width", width)

    const log = svg.selectAll(".log")
        .data(table)
        .join("g")
        .attr("class", "log")
        .attr("transform", function(d) {
            // console.log("d"+d)
                return `translate(${d.yy * cellWidth + margin.left}, ${d.xx * cellHeight + margin.top})`
        })
        .append("rect")
            .attr("rx", radius) // 设置x方向的圆角半径
            .attr("ry", radius) 
            .attr("width", cellWidth - intervalX)
            .attr("height", cellHeight - intervalY)
            .attr("fill", d => d.log ? getColor(d.log.status): gray)

}
</script>

<style scoped>
.container {
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 3fr 1fr; /* 两列平均分配空间 */
}

::-webkit-scrollbar	{ 
    scrollbar-width: thin; 
    scrollbar-color: red green;
}
svg{
    box-sizing: border-box;
}
/* .logContainer {
    height: fit-content;
    width: 100%;
    overflow: auto;
} */
</style>