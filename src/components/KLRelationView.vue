<template>
  <div id="relationView" class="container relative" ref="relationRef">
    <svg id="content"></svg>
  </div>
  <!--  <div id="cluster-view" class="container" ref="clusterRef"></div>-->
</template>

<script setup>
import {onMounted, ref} from 'vue';
import * as d3 from 'd3';
import axios from "axios";
import {useStore} from "vuex";
import {clusterColorList} from "@/utils/getColor.js";

const store = useStore()

import _ from 'lodash'

const relationRef = ref(), clusterRef = ref()
const bubbleSize = 2
const clusterCount = 3
const size = {
  tooltipViewHeight: 100,
  tooltipViewWidth: 200
}

var dataset = [
  {x: 69, y: 45, knowledge: 5}, {x: 30, y: 37, knowledge: 10},
  {x: 43, y: 10, knowledge: 23}, {x: 54, y: 48, knowledge: 41},
  {x: 18, y: 18, knowledge: 41}, {x: 88, y: 21, knowledge: 32},
  {x: 45, y: 48, knowledge: 12}, {x: 14, y: 32, knowledge: 9},
  {x: 78, y: 18, knowledge: 16}, {x: 13, y: 45, knowledge: 32}
];

let data = [{
  index: 0,
  title: 13,
  correctness: 0.98,
  master: 0.6
}, {
  index: 1,
  title: 34,
  correctness: 0.94,
  master: 0.8
}, {
  index: 2,
  title: 23,
  correctness: 0.78,
  master: 0.9
}]

onMounted(() => {
  axios.get('/api/getStudyModeScatter').then(res => {
    initChart(res.data)
  })
  initClusterBarChart(data)
})

function initTooltip(id, masterData, reviewData) {
  d3.select('#tooltip-master').selectAll('*').remove()
  d3.select('#tooltip-review').selectAll('*').remove()
  const masterSvg = d3.select('#tooltip-master')
      .append('svg')
      .attr('width', size.tooltipViewWidth)
      .attr('height', size.tooltipViewHeight)

  
}

function initChart(data) {
  console.log(data)
  let tooltip = d3.select('#relationView')
      .append('div')
      .attr('class', 'tool-tip')

  let that = this
  const width = relationRef.value.clientWidth;
  const height = 300;
  const margin = {left: 20, right: 15, top: 10, bottom: 20}

  const maxX = d3.max(data, d => d.position[0]), minX = d3.min(data, d => d.position[0])
  const maxY = d3.max(data, d => d.position[1]), minY = d3.min(data, d => d.position[1])

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
      .attr('cx', function (d) {
        return xScale(d.position[0]);
      })
      .attr('cy', function (d) {
        return yScale(d.position[1]);
      })
      .attr('r', bubbleSize)
      .attr('id', d => `bubble-${d.id}`)
      .attr('fill', (d, item) => clusterColorList[d.label])
      // .attr('opacity', .5)
      .on('click', (d, item) => {
        tooltip.style('left', d.offsetX + 5 + 'px')
            .style('top', d.offsetY + 5 + 'px')
            .style('display', 'inline-block')
            .html(`
                    <div>
                    123
                        <div id="tooltip-master"></div>
                        <div id="tooltip-review"></div>
                    </div>
                  `)
        initTooltip(item.id)
      })
      .on('mouseover', d => {
        d3.select('#' + d['target']['id'])
            .attr('r', bubbleSize * 2)
        // console.log(d['target']['id'])
      })
      .on('mouseout', d => {
        tooltip.style('display', 'none')
        d3.select('#' + d['target']['id'])
            .attr('r', bubbleSize)
      })
  let zoom = d3.zoom()
      .scaleExtent([0.1, 10])
      .on("zoom", zoomed)
  svg.call(zoom)

  function zoomed(event) {
    console.log(event)
    // const zoomDelta = 1 / event.transform.k
    // svg.selectAll('.zoom:not(.special)').attr("transform", event.transform)
    // const specialElem = d3.selectAll('.special-rect')
    // specialElem.attr('stroke-width', 2 * zoomDelta)
    //     .attr('x', function (d) {
    //       return xScale(d['x']) - bubbleSize * 0.5 * zoomDelta
    //     })
    //     .attr('y', function (d) {
    //       return yScale(d['y']) - bubbleSize * 0.5 * zoomDelta
    //     })
    //     .attr('width', that.size.squareWidth * zoomDelta)
    //     .attr('height', that.size.squareWidth * zoomDelta)
    //     .attr('rx', 5 * zoomDelta)
    //     .attr('ry', 5 * zoomDelta)
  }
}

function initClusterBarChart(data) {
  const width = clusterRef.value.clientWidth,
      height = clusterRef.value.clientHeight

  const svg = d3.select('#cluster-view')
      .append('svg')
      .attr('width', width)
      .attr('height', height)


}
</script>

<style scoped>
.container {
  height: 100%;
  padding: 0;
  margin: 0;
  border: 0;
}

svg {
  box-sizing: border-box;
}
</style>

<style>
.tool-tip {
  @apply bg-[#ffffff5a];
  padding: 5px;
  border-radius: 1px;
  position: absolute;
  width: 200px;
  height: auto;
  z-index: 10;
}
</style>