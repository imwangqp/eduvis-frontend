<template>
    <div class="outerContainer" style="max-height: 100%;">
        <div class="card" v-for="(item, index) in cards" :key="index" :style="getCardStyle(index)">
            <div class="header">
                <div class="title">学号: {{ item }}</div>
                <div>
                    <el-button-group class="button">
                        <el-button size="small" round> 
                            <el-icon>
                                <Upload />
                            </el-icon>
                        </el-button>
                        <el-button @click="moveUp(index)" size="small" round>
                            <el-icon>
                                <Top />
                            </el-icon>
                        </el-button>
                        <el-button size="small" round>
                            <el-icon>
                                <Download />
                            </el-icon>
                        </el-button>
                        <el-button @click="moveDown(index)" size="small" round >
                            <el-icon>
                                <Bottom />
                            </el-icon>
                        </el-button>
                    </el-button-group>
                </div>

            </div>

            <div id="logview" class="container" > 
                <div> 
                    <svg :id="`knowledge-${index}`" ></svg>
                </div>

                <div id="logContainer" class="overflow-x-auto" >
                    <svg :id="`log-${index}`" style="min-width:100%;"></svg>
                </div>

                <div>
                    <svg :id="`line-${index}`" style="width: 100%;" :ref="(el) => setLineRef(el, index)"></svg>
                </div>
            
            </div>
        </div>

        <div class="tooltip">
            <!-- <span class="tooltipText"> {{ content }} </span> -->
        </div>
    </div>
    
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, reactive, ref, watch } from "vue";
import getKnowledgeColor from '../utils/index'; 
import data from '../assets/log.json'

const lineData = [
    [
      [10, 20, 30, 40, 50],
      [30, 40, 10, 20, 50],
      [20, 10, 30, 50, 40],
      [15, 20, 27, 32, 35],
      [10, 20, 30, 40, 45],
      [0, 5, 15, 20, 40],
      [0, 10, 25, 30, 45],
      [0, 15, 20, 35, 50]
    ],
    [
      [10, 20, 30, 40, 50],
      [10, 20, 30, 40, 50],
      [10, 20, 30, 40, 50],
      [15, 20, 27, 32, 35],
      [10, 20, 30, 40, 45],
      [0, 5, 15, 20, 40],
      [0, 10, 25, 30, 45],
      [0, 15, 20, 35, 50]
    ],
];

var cards = reactive(["8b6d1125760bd3939b6e", "8b6d1125760bd3939b6f"]);

var selectedKnowledge = -1;

const knowledge = ["r8S3g", "t5V9e", "m3D1v", "s8Y2f", "k4W1c", "g7R2j", "b3C9s", "y9W5d"]

const lineRef = ref([])
const intervalX = 1;
const intervalY = 2;
const cellWidth = 14 + intervalX;
const cellHeight = 14 + intervalY;

const highlightColor = "yellow"
const highlightWidth = 2

const lineWidth = 1;
const newLineWidth = 3;

var content = ref()


onMounted(()=>{
    cards.forEach((item, index) => {
        initKnowledge(index)
        initLog(index)
        initLineChart(index)
    })
    
})

function setLineRef(el, index) {
    if(el) {
        lineRef[index] = el
    }
}

function getCardStyle(index) {
    let top = 0;
    for (let i = 0; i < index; i++) {
        top += cards[i].offsetHeight +8; // 16 是卡片之间的间距
    }
    return {
        top: `${top}px`,
    };
}

function moveUp(index) {
    console.log("moveup"+index)
    if (index > 0) {
        // 交换当前卡片与上一个卡片的位置
        [cards[index], cards[index - 1]] = [cards[index - 1], cards[index]];
        initLineChart(index)
        initLineChart(index-1)
        initLog(index)
        initLog(index-1)
    }
}

function moveDown(index) {
    console.log("movedown"+index)
    if (index < cards.length - 1) {
        // 交换当前卡片与下一个卡片的位置
        [cards[index], cards[index + 1]] = [cards[index + 1], cards[index]];
        console.log("card"+cards[index])
    }
}


//状态颜色映射
function getColor(status) {
    if(status == "Absolutely_Correct")
        return "#99BC85";
    if(status == "Partially_Correct")
        return "#F9F7C9";
    return "#F19292"; 
}

function addHighlight(num, index) {
    // const dotSvg = d3.select(`#knowledge-${index}`)
    const svg = d3.select(`#log-${index}`)

    const rects = svg.selectAll(".log")
    //滤镜
    const filter = svg.append("defs")
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
    

    rects.filter((d, i) => d.xx !== num)
    .attr("filter", "url(#blur)")
    .attr("opacity", 0.5);
    

    //突出显示
    // const box = d3.selectAll("rect")
    // .filter(function() {
    //     return d3.select(this).style("opacity") == "0";
    // });
    // const box = d3.select("body").selectAll("rect:empty");
    // const box = d3.selectAll(".box")
    // box.filter((d, i) => i === index).attr("opacity", "1")
    const shadowFilter = svg.append("filter")
    .attr("id", "shadowFilter")
    .attr("x", "-10%")
    .attr("y", "-10%")
    .attr("width", "120%")
    .attr("height", "120%");

    shadowFilter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 1)
    .attr("result", "blur");

    shadowFilter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 1)
    .attr("dy", 1)
    .attr("result", "offsetBlur");

    shadowFilter.append("femerge")
    .append("femergenode")
    .attr("in", "offsetBlur")
    .append("femergenode")
    .attr("in", "SourceGraphic");

    // rects.filter((d, i) => d.xx === num).style("filter", "drop-shadow(1px 1px 1px #aaa)")


    //折线图

    const lineSvg = d3.select(`#line-${index}`)
    const lines = lineSvg.selectAll(".brokenLine");
    lines.filter((d, i) => i === num)
    .attr("stroke-width", newLineWidth)

    lines.filter((d, i) => d.xx !== num)
    .attr("opacity", 0.5);
}

function removeHighlight(num, index) {
    console.log("index"+index)
    // const dotSvg = d3.select(`#knowledge-${index}`)
    const svg = d3.select(`#log-${index}`)
    const rects = svg.selectAll(".log")

    rects.attr("filter", null)
    rects.filter((d, i) => d.xx !== num)
    .attr("opacity", 1);

    rects.filter((d, i) => d.xx === num)
    .style("filter", null)

    //折线图
    const lineSvg = d3.select(`#line-${index}`)
    const lines = lineSvg.selectAll(".brokenLine");
    lines.filter((d, i) => i === num)
    .attr("stroke-width", lineWidth)

    lines.filter((d, i) => i !== num)
    .attr("opacity", 1);
}

function initKnowledge(index) {
    const r = (cellHeight-intervalY)/2
    const radius = 2
    const margin = { top: 0, right: 10, bottom: 10, left: 10 }
    const dotSvg = d3.select(`#knowledge-${index}`)

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
        console.log(cellHeight)
        const num = Math.floor((yv-margin.top)/ cellHeight);

        console.log(num)

        if(selectedKnowledge == num) {
            removeHighlight(num, index);    //参数
            selectedKnowledge = -1;
            return;
        }

        if(selectedKnowledge != -1) {
            removeHighlight(selectedKnowledge, index)
        }
        addHighlight(num, index)
        selectedKnowledge = num;
    }
}
function initLineChart(index) {
    // const start_x = cellWidth * logData.length + 50
    console.log("lineRef"+lineRef[index])
    const width = lineRef[index].clientWidth;
    // const width = cellHeight * knowledge.length + 40;
    const height = cellHeight * knowledge.length ;
    const axis_color = "#b2bbbe"

    const margin = { top: 10, right: 10, bottom: 10, left: 30 }
    // const lineSvg = d3
    //       .select("#logview")
    //       .append("svg")
    //       .attr("viewBox", [0, 0, width, height])
    //       .attr("width", width)
    //       .attr("height", height)
    //       .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;")
    //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    const svg = d3.select(`#line-${index}`)
    //清空svg
    svg.selectAll('*').remove()

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
    // lineG.append("g")
    //   .attr("class", "y axis")
    //   .call(yAxis);

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
      .data(lineData[index])
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

    updateChart(lineData[index])
}

function initLog(index) {
    const logData = data.data
    // const viewWidth = containerRef.value.clientWidth;
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

    const svg = d3.select(`#log-${index}`)
    svg.selectAll('*').remove()

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
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

    const box = svg.selectAll(".box")
        .data(knowledge)
        .join("g")
        .attr("class", "box")
        .attr("transform", function(d, i) {
            return `translate(${margin.left}, ${i * cellHeight + margin.top})`
        })
        .append("rect")
            .attr("rx", radius) // 设置x方向的圆角半径
            .attr("ry", radius)
            .attr("width", cellWidth * logData.length - intervalX)
            .attr("height", cellHeight - intervalY)
            // .attr("stroke-width", "1px")
            .attr("fill", "none")
            .attr("stroke", d => getKnowledgeColor.getKnowledgeColor(d))
            .attr("opacity", "0")

    // const tooltip = d3.select("body")
    //     .append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0.9);

    const tooltip = d3.select(".tooltip")
        .style("opacity", 0)

    function handleMouseOver(event, d) {
        if(d.log == null)
            return;

        tooltip.transition()
            .duration(200)
            .style("opacity", 0.8);

        console.log(event.pageX)
        console.log(d3.pointer(event)[1])
        tooltip.html(`${d.log.status}: ${d.log.score}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY) + "px");
    }

    function handleMouseOut() {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

}
</script>

<style scoped>
.outerContainer {
    height: fit-content;
    overflow-y: scroll;
    scroll-behavior: smooth;
    box-sizing: border-box;
}
.container {
box-sizing: border-box;
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
.tooltip {
  position: absolute;
  text-align: center;
  width: fit-content;
  height: 30;
  padding: 2px;
  font: 12px sans-serif;
  background: rgb(121, 121, 121);
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
.header{
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom-style: solid;
    border-bottom-color: rgba(207, 207, 207, 0.343);
    border-bottom-width: 1.5px;
    margin-bottom: 5px;

}
.title{
    text-align: left;
    font-size: 12px;
}
.button{
    float: right;
    margin-bottom: 5px;
}
.el-button{
    height: 20px;
}
.subcomponent{
    box-sizing: border-box;
    @apply bg-white rounded-lg border-slate-100 border-0 p-0 m-0;
  }
</style>