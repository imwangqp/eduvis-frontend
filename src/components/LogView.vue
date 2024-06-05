<template>
    <div class="container">
        <div id="logview" ref="containerRef"> </div>
  </div>

</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, ref, watch } from "vue";
import getKnowledgeColor from '../utils/index'; 

const lineData = [
      [10, 20, 30, 40, 50],
      [30, 40, 10, 20, 50],
      [20, 10, 30, 50, 40]
];

const logData = [
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "r8S3g"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Error2", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
    {"status": "Error1", "score": 0, "knowledge": "y9W5d"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
    {"status": "Error1", "score": 0, "knowledge": "y9W5d"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
    {"status": "Error1", "score": 0, "knowledge": "y9W5d"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "t5V9e"},
    {"status": "Error1", "score": 0, "knowledge": "m3D1v"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "s8Y2f"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Absolutely_Correct", "score": 5, "knowledge": "k4W1c"},
    {"status": "Error1", "score": 0, "knowledge": "g7R2j"},
    {"status": "Partially_Correct", "score": 3, "knowledge": "r8S3g"},
    {"status": "Error3", "score": 0, "knowledge": "b3C9s"},
]
const knowledge = ["r8S3g", "t5V9e", "m3D1v", "s8Y2f", "k4W1c", "g7R2j", "b3C9s", "y9W5d"]

const containerRef = ref()

const intervalX = 1;
const intervalY = 3;
const cellWidth = 16 + intervalX;
const cellHeight = 16 + intervalY;

onMounted(()=>{
    initLog()
    initLineChart()
})

function initLineChart() {
    const start_x = cellWidth * logData.length + 50
    const width = cellHeight * knowledge.length + 40;
    const height = cellHeight * knowledge.length ;
    const axis_color = "#b2bbbe"

    const margin = { top: 10, right: 70, bottom: 20, left: 5 }
    // const lineSvg = d3
    //       .select("#logview")
    //       .append("svg")
    //       .attr("viewBox", [0, 0, width, height])
    //       .attr("width", width)
    //       .attr("height", height)
    //       .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;")
    //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    const svg = d3.select("svg")
    const lineG = svg.append("g").attr("class", "line").attr("transform", `translate(${start_x + margin.left}, ${margin.top})`)

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
      .y(d => y(d));

    // 添加多条线
    var paths = lineG.selectAll(".line")
      .data(lineData)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", (d, i) => d3.schemeCategory10[i]) // 使用不同颜色
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
    
    // const width = containerRef.value.clientWidth;
    const width = cellWidth * logData.length + 30;
    const height = cellHeight * knowledge.length + 5;
    const kdot_left = 10
    const log_left = kdot_left + cellWidth
    const margin_top = 0.5
    const r = (cellHeight-intervalY)/2
    const radius = 2

    const gray = "#F1F1F1"

    // const gray = getKnowledgeColor.getKnowledgeColor("t5V9e")
    console.log(gray)
    
    // console.log("width"+width+"height"+height)

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

    //状态颜色映射
    function getColor(status) {
        if(status == "Absolutely_Correct")
            return "#99BC85";
        if(status == "Partially_Correct")
            return "#F9F7C9";
        return "#F19292"; 
    }

    const svg = d3
          .select("#logview")
          .append("svg")
          .attr("viewBox", [0, 0, width+height, height])
          .attr("width", width+height)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    const kdot = svg.selectAll("g")
        .data(knowledge)
        .join("g")
        .attr("class", "kl")
        .attr("transform", function(d, i) {
            return `translate(${kdot_left}, ${i * cellHeight + margin_top + r})`
        })
        .append("circle")
            .attr("r", r)
            .attr("fill", d => getKnowledgeColor.getKnowledgeColor(d))


    const log = svg.selectAll(".log")
        .data(table)
        .join("g")
        .attr("class", "log")
        .attr("transform", function(d) {
            // console.log("d"+d)
                return `translate(${d.yy * cellWidth + log_left}, ${d.xx * cellHeight + margin_top})`
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
.axis path,   /* 坐标轴路径设置 */
.axis line {    /* 设置 坐标轴的线条 */
  fill: none;   /* 设置坐标轴宽度 */
  stroke: #929292;  /* 坐标轴颜色 */
  shape-rendering: crispEdges;  /* 将形状渲染为清晰的边缘 */
}
</style>