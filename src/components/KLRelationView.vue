<template>
    <div id="relationView" class="container" style="width: 200px;" ref="relationRef">
        <svg id="content" style="height:100%; width:200px ;box-sizing: border-box;"></svg>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';
const relationRef = ref()
var dataset = [
    { x: 69, y: 45, knowledge: 5 },{ x: 30, y: 37, knowledge: 10 },
    { x: 43, y: 10, knowledge: 23 },{ x: 54, y: 48, knowledge: 41 },
    { x: 18, y: 18, knowledge: 41 },{ x: 88, y: 21, knowledge: 32 },
    { x: 45, y: 48, knowledge: 12 },{ x: 14, y: 32, knowledge: 9 },
    { x: 78, y: 18, knowledge: 16 },{ x: 13, y: 45, knowledge: 32 }
];

onMounted(()=>{
    init();
})

function init() {
    const width = relationRef.value.clientWidth;
    const height = relationRef.value.clientHeight - 20;
    const margin = {left: 20, right:15, top:10, bottom:20}

    const element = document.getElementById('relationView');
    console.log(element.style.height); // 获取元素的 color 属性

    const bubbleColor='#C0C0C0'

    console.log("width"+width)
    console.log("height"+height)
    const maxX = 100;
    const maxY = 50;

    // const svg = d3
    //       .select("#relationView")
    //       .append("svg")
    //       .attr("viewBox", [0, 0, width, height])
    //       .attr("width", width)
    //       .attr("height", height)
    //       .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;")

    const svg = d3.select("#content")

    //添加x轴和y轴
    var xScale = d3.scaleLinear()
        .domain([0, maxX])
        .range([margin.left, width - margin.right]);
    var yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin.bottom, margin.top]);
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height-margin.bottom})`)
      .call(xAxis);


    //添加y轴
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    //气泡
    var bubble = svg.selectAll('.bubble')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', 'bubble')
        .attr('cx', function(d) {
            return xScale(d.x);
        })
        .attr('cy', function(d) {
            return yScale(d.y);
        })
        .attr('r', function(d) {
            return d.knowledge/2;
        })
        .attr('fill', bubbleColor)
        .attr('opacity', .5);
}
</script>

<style scoped>
.container{
    height: 100%;
    padding:0;
    margin: 0;
    border: 0;
}
svg {
    /* background-color: #f0f0f0; */
    box-sizing: border-box;
    /* 其它样式 */
}

</style>