<template>
<!--    <div id="relationView" class="container" ref="relationRef">-->
<!--        <svg id="content"></svg>-->
<!--    </div>-->
  <div id="cluster-view" class="container" ref="clusterRef"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';
import axios from "axios";
import {useStore} from "vuex";
import {clusterColorList} from "@/utils/getColor.js";
const store = useStore()

import _ from 'lodash'

const relationRef = ref(), clusterRef = ref()
const bubbleSize = 2
const clusterCount = 3

var dataset = [
    { x: 69, y: 45, knowledge: 5 },{ x: 30, y: 37, knowledge: 10 },
    { x: 43, y: 10, knowledge: 23 },{ x: 54, y: 48, knowledge: 41 },
    { x: 18, y: 18, knowledge: 41 },{ x: 88, y: 21, knowledge: 32 },
    { x: 45, y: 48, knowledge: 12 },{ x: 14, y: 32, knowledge: 9 },
    { x: 78, y: 18, knowledge: 16 },{ x: 13, y: 45, knowledge: 32 }
];

let data = [{
  index:0,
  title:13,
  correctness:0.98,
  master:0.6
}, {
  index:1,
  title:34,
  correctness:0.94,
  master:0.8
}, {
  index:2,
  title:23,
  correctness:0.78,
  master:0.9
}]

onMounted(()=>{
  // axios.get('/api/getStudyModeScatter').then(res=>{
  //   initChart(res.data)
  // })
  initClusterBarChart(data)
})

function initChart(data) {
  console.log(data)
  let that = this
    const width = relationRef.value.clientWidth;
    const height = 300;
    const margin = {left: 20, right:15, top:10, bottom:20}

    const element = document.getElementById('relationView');
    console.log(element.style.height); // 获取元素的 color 属性

    const bubbleColor='#C0C0C0'
    const maxX = d3.max(data, d=>d.position[0]), minX = d3.min(data, d=>d.position[0])
    const maxY = d3.max(data, d=>d.position[1]), minY = d3.min(data, d=>d.position[1])

    const svg = d3.select("#content")
        .attr('width', width)
        .attr('height', height)

  const contourGroup = svg.append('g')
      .attr('class', 'contour-group')

    //添加x轴和y轴
    const xScale = d3.scaleLinear()
        .domain([minX, maxX])
        .range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear()
        .domain([minY, maxY])
        .range([height - margin.bottom, margin.top]);

  const contours = d3.contourDensity()
      .x((d) => xScale(d.position[0]))
      .y(d => yScale(d.position[1]))
      .size([width, height])
      .thresholds(30)(data)

  const colorScale = d3.scaleSequential(['white', '#588dd5'])
      .domain([
        d3.min(contours, (d) => d.value) * 0.9,
        d3.max(contours, (d) => d.value) * 1.1
      ])

  contourGroup.append("g")
      .attr('class', 'contour-group')
      .attr("fill", "none")
      .attr("stroke", "none")
      .attr("stroke-linejoin", "round")
      .selectAll('path')
      .data(contours)
      .join("path")
      .attr("fill", (d) => colorScale(d.value))
      .attr("d", d3.geoPath());

    const bubble = svg.selectAll('.bubble')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'bubble')
        .attr('cx', function(d) {
            return xScale(d.position[0]);
        })
        .attr('cy', function(d) {
            return yScale(d.position[1]);
        })
        .attr('r', bubbleSize)
        .attr('fill', (d, item)=> clusterColorList[d.label])
        .attr('opacity', .5)
        .on('click', (_, item)=>{
          store.commit('addId', item.id)
          // console.log(_, item)
        })
  let zoom = d3.zoom()
      .scaleExtent([0.1, 10])
      .on("zoom", zoomed)
  svg.call(zoom)

  function zoomed(event) {
    console.log(event)
    const zoomDelta = 1 / event.transform.k
    svg.selectAll('.zoom:not(.special)').attr("transform", event.transform)
    const specialElem = d3.selectAll('.special-rect')
    specialElem.attr('stroke-width', 2 * zoomDelta)
        .attr('x', function (d) {
          return xScale(d['x']) - bubbleSize * 0.5 * zoomDelta
        })
        .attr('y', function (d) {
          return yScale(d['y']) - bubbleSize * 0.5 * zoomDelta
        })
        .attr('width', that.size.squareWidth * zoomDelta)
        .attr('height', that.size.squareWidth * zoomDelta)
        .attr('rx', 5 * zoomDelta)
        .attr('ry', 5 * zoomDelta)
  }
}

function initClusterBarChart(data) {
  const width = clusterRef.value.clientWidth,
      height = clusterRef.value.clientHeight

  const svg = d3.select('#cluster-view')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

  const indexScale = d3.scaleLinear([0, data.length], [0, width]),
      titleScale = d3.scaleLinear([0, d3.max(data, d=>d.title)], [0, width/3]),
      xScale = d3.scaleLinear([0,1], [0, width/2]),
      yScale = d3.scaleLinear([0, _.size(data[0])-1], [0, height])

  svg.append('g')
      .attr('id', 'title-group')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, i)=>indexScale(i))
      .attr('y', yScale(0))
      .attr('height', height/2)
      .attr('width', d=>titleScale(d.title))
      .attr('fill', 'black')
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
    box-sizing: border-box;
}

</style>